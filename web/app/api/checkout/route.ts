import { NextResponse } from "next/server";
import Stripe from "stripe";
import {
  getStripePriceMapParseError,
  getTourStripeMapping,
  resolveStripePriceId,
} from "@/lib/stripe-prices";
import { getStripe } from "@/lib/stripe-server";
import { getSiteBaseUrl } from "@/lib/site-url";
import {
  getMaxBookablePassengers,
  getPricingRuleFromTable,
  tourHasDynamicPricingTable,
} from "@/lib/tour-pricing-table";
import { validateCheckoutPayload } from "@/lib/checkout-payload-validation";
import {
  isGoogleCalendarConfigured,
  isBookingDateAvailable,
  MAX_BOOKINGS_PER_DAY,
} from "@/lib/google-calendar";

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

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "JSON inválido.", code: "INVALID_JSON" },
      { status: 400 },
    );
  }

  const validated = validateCheckoutPayload(body);
  if (!validated.ok) {
    return NextResponse.json(validated.failure.body, {
      status: validated.failure.status,
    });
  }

  const {
    tourId,
    quantity,
    preferredDate,
    customerName,
    email,
    phone,
    notes,
    tourLabel,
  } = validated.data;

  // Capacity guard: do not allow more than N paid bookings per date.
  // We use the Google Calendar as the source of truth in production.
  if (isGoogleCalendarConfigured() && /^\d{4}-\d{2}-\d{2}$/.test(preferredDate)) {
    try {
      const ok = await isBookingDateAvailable(preferredDate);
      if (!ok) {
        return NextResponse.json(
          {
            error: `This date is fully booked. Please choose another day (max ${MAX_BOOKINGS_PER_DAY} bookings per date).`,
            code: "DATE_FULLY_BOOKED",
          },
          { status: 409 },
        );
      }
    } catch (e) {
      // If Calendar check fails, do not block checkout (avoid false negatives).
      console.error("[checkout] calendar capacity check failed:", e);
    }
  }

  // 1) Primeiro tenta tabela fixa (desconto por quantidade)
  const tableRule = getPricingRuleFromTable(tourId, quantity);

  // Tours com tabela dinâmica: quantidade sem regra NÃO cai para Stripe legado
  if (!tableRule && tourHasDynamicPricingTable(tourId)) {
    const maxBookable = getMaxBookablePassengers(tourId);
    return NextResponse.json(
      {
        error:
          tourId === "lisboa"
            ? `Lisboa aceita no máximo ${maxBookable} pessoas por reserva. O preço para 8 pessoas ainda não está disponível.`
            : `Esta quantidade não está disponível para este tour (máx. ${maxBookable} pessoas).`,
        code: "UNSUPPORTED_QUANTITY",
      },
      { status: 400 },
    );
  }

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
