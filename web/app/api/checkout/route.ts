import { NextResponse } from "next/server";
import Stripe from "stripe";
import {
  getStripePriceMapParseError,
  getTourStripeMapping,
  resolveStripePriceId,
} from "@/lib/stripe-prices";
import { getStripe } from "@/lib/stripe-server";
import { getSiteBaseUrl } from "@/lib/site-url";
import { getPricingRuleFromTable } from "@/lib/tour-pricing-table";
import { toursBooking } from "@/lib/tours-booking";

/** Stripe limita cada valor de metadata (evita falhas silenciosas / rejeição). */
function metaSlice(s: string, max = 500): string {
  if (s.length <= max) return s;
  return `${s.slice(0, max - 1)}…`;
}

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => {
      reject(new Error(`${label}: timeout ao comunicar com o Stripe (${ms / 1000}s).`));
    }, ms);
    promise.then(
      (v) => {
        clearTimeout(t);
        resolve(v);
      },
      (e) => {
        clearTimeout(t);
        reject(e);
      },
    );
  });
}

export const runtime = "nodejs";

/** Tempo máximo (serverless) para criar a sessão Stripe — evita função pendente. */
export const maxDuration = 60;

type Body = {
  tourId?: string;
  quantity?: number;
  preferredDate?: string;
  customerName?: string;
  email?: string;
  phone?: string;
  notes?: string;
};

export async function POST(req: Request) {
  let stripe: Stripe;
  try {
    stripe = getStripe();
  } catch (e) {
    console.error(
      "[checkout] Stripe não inicializou (confirma STRIPE_SECRET_KEY na Vercel ou .env.local):",
      e,
    );
    return NextResponse.json(
      {
        error:
          "O pagamento não está disponível de momento. Tenta mais tarde ou contacta-nos.",
      },
      { status: 500 },
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json(
      { error: "JSON inválido.", code: "INVALID_JSON" },
      { status: 400 },
    );
  }

  const tourId = String(body.tourId ?? "").trim();
  const quantity = Math.min(
    7,
    Math.max(1, Number(body.quantity) || 1),
  );
  const preferredDate = String(body.preferredDate ?? "").trim();
  const customerName = String(body.customerName ?? "")
    .trim()
    .slice(0, 120);
  const email = String(body.email ?? "").trim().toLowerCase().slice(0, 254);
  const phone = String(body.phone ?? "").trim().slice(0, 48);
  const notes = String(body.notes ?? "").trim().slice(0, 500);

  const tourLabel =
    toursBooking.find((t) => t.id === tourId)?.label ?? tourId;

  if (!tourId || !toursBooking.some((t) => t.id === tourId)) {
    return NextResponse.json(
      { error: "Tour inválido.", code: "INVALID_TOUR" },
      { status: 400 },
    );
  }

  if (!preferredDate) {
    return NextResponse.json(
      {
        error: "Indica a data preferida para o tour.",
        code: "MISSING_DATE",
      },
      { status: 400 },
    );
  }

  if (customerName.length < 2) {
    return NextResponse.json(
      { error: "Indica o teu nome completo.", code: "INVALID_NAME" },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Email inválido.", code: "INVALID_EMAIL" },
      { status: 400 },
    );
  }

  // 1) Primeiro tenta tabela fixa (desconto por quantidade)
  const tableRule = getPricingRuleFromTable(tourId, quantity);

  // 2) Se não houver tabela, cai para STRIPE_PRICE_MAP (modo antigo)
  let fallbackPriceId: string | undefined;
  if (!tableRule) {
    const mapParseErr = getStripePriceMapParseError();
    if (process.env.STRIPE_PRICE_MAP?.trim() && mapParseErr) {
      return NextResponse.json(
        {
          error:
            "STRIPE_PRICE_MAP não é JSON válido (uma linha, aspas duplas). Corrige o valor no servidor.",
          code: "STRIPE_PRICE_MAP_INVALID",
        },
        { status: 400 },
      );
    }

    if (!getTourStripeMapping(tourId)) {
      return NextResponse.json(
        {
          error:
            "Pagamento ainda não configurado para este destino. Contacta-nos ou tenta mais tarde.",
          code: "STRIPE_TOUR_NOT_CONFIGURED",
        },
        { status: 400 },
      );
    }

    try {
      fallbackPriceId = await withTimeout(
        resolveStripePriceId(stripe, tourId, quantity),
        18_000,
        "Stripe (resolver preço)",
      );
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Timeout ao resolver preço.";
      console.error("[checkout]", e);
      return NextResponse.json(
        {
          error: msg,
          code: "STRIPE_PRICE_RESOLVE_TIMEOUT",
        },
        { status: 504 },
      );
    }
    if (!fallbackPriceId) {
      return NextResponse.json(
        {
          error:
            "Não foi possível preparar o pagamento (Stripe). Confirma STRIPE_PRICE_MAP e se os IDs são do mesmo modo (teste/live) da chave secreta.",
          code: "STRIPE_PRICE_RESOLVE_FAILED",
        },
        { status: 400 },
      );
    }
  }

  const base = getSiteBaseUrl();

  try {
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = tableRule
      ? tableRule.kind === "per_person"
        ? [
            {
              price_data: {
                currency: "eur",
                product_data: {
                  name: `${tourLabel} — Tour privado`,
                },
                unit_amount: tableRule.centsPerPerson,
              },
              quantity,
            },
          ]
        : [
            {
              price_data: {
                currency: "eur",
                product_data: {
                  name: `${tourLabel} — Grupo privado`,
                },
                unit_amount: tableRule.centsTotal,
              },
              quantity: 1,
            },
          ]
      : [
          {
            price: fallbackPriceId!,
            quantity,
          },
        ];

    const session = await withTimeout(
      stripe.checkout.sessions.create({
        mode: "payment",
        line_items: lineItems,
        success_url: `${base}/reservar/obrigado?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${base}/reservar?cancelado=1`,
        customer_email: email,
        metadata: {
          tour_id: metaSlice(tourId, 120),
          tour_label: metaSlice(tourLabel),
          preferred_date: metaSlice(preferredDate),
          quantity: String(quantity),
          pricing_source: tableRule ? "table" : "stripe_price_map",
          pricing_kind: tableRule ? tableRule.kind : "stripe_price",
          customer_name: metaSlice(customerName),
          phone: metaSlice(phone || ""),
          notes: metaSlice(notes || ""),
        },
        custom_text: {
          submit: {
            message:
              "Após o pagamento, a confirmação pode incluir recibo da Stripe (conforme as tuas definições). A data do tour confirma-se connosco.",
          },
        },
      }),
      22_000,
      "Stripe Checkout",
    );

    if (!session.url) {
      return NextResponse.json(
        { error: "Não foi possível criar o checkout." },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (e) {
    let message = e instanceof Error ? e.message : "Erro Stripe.";
    let stripeCode: string | undefined;
    if (e instanceof Stripe.errors.StripeError) {
      message = e.message || message;
      stripeCode = e.code;
      if (e.code) console.error("[checkout] stripe code:", e.code);
    }
    console.error("[checkout]", e);
    return NextResponse.json(
      {
        error: message,
        code: "CHECKOUT_FAILED",
        ...(stripeCode ? { stripeCode } : {}),
      },
      { status: 500 },
    );
  }
}
