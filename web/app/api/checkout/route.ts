import { NextResponse } from "next/server";
import Stripe from "stripe";
import {
  getStripePriceMapParseError,
  getTourStripeMapping,
  resolveStripePriceId,
} from "@/lib/stripe-prices";
import { getStripe } from "@/lib/stripe-server";
import { getSiteBaseUrl } from "@/lib/site-url";
import { toursBooking } from "@/lib/tours-booking";

export const runtime = "nodejs";

type PricingRule =
  | { kind: "per_person"; centsPerPerson: number }
  | { kind: "per_group"; centsTotal: number };

function ruleFromTable(tourId: string, qty: number): PricingRule | null {
  const q = Math.max(1, Math.min(7, qty));

  // Sintra & Cascais
  if (tourId === "sintra-cascais") {
    // Preço base (1 pessoa)
    if (q === 1) return { kind: "per_person", centsPerPerson: 7500 };
    // Desconto por quantidade
    if (q === 2) return { kind: "per_person", centsPerPerson: 6000 };
    if (q >= 3 && q <= 4) return { kind: "per_person", centsPerPerson: 5500 };
    if (q >= 5 && q <= 7) return { kind: "per_person", centsPerPerson: 5000 };
    return null;
  }

  // Nazaré / Tour 3 Destinos
  if (tourId === "3-destinos") {
    if (q === 1) return { kind: "per_person", centsPerPerson: 10000 };
    if (q === 2) return { kind: "per_person", centsPerPerson: 7000 };
    if (q >= 3 && q <= 5) return { kind: "per_person", centsPerPerson: 6500 };
    if (q >= 6 && q <= 7) return { kind: "per_person", centsPerPerson: 6000 };
    return null;
  }

  // Lisboa (tabela tinha "100–110" e "90–"; usamos regra determinística)
  if (tourId === "lisboa") {
    if (q === 1) return { kind: "per_person", centsPerPerson: 9000 };
    if (q === 2) return { kind: "per_person", centsPerPerson: 6000 };
    if (q === 3) return { kind: "per_person", centsPerPerson: 5500 };
    if (q >= 4 && q <= 5) return { kind: "per_person", centsPerPerson: 5000 };
    if (q >= 6 && q <= 7) return { kind: "per_person", centsPerPerson: 4500 };
    return null;
  }

  // Arrábida • Setúbal • Sesimbra
  if (tourId === "arraabida") {
    if (q === 1) return { kind: "per_person", centsPerPerson: 13000 };
    if (q === 2) return { kind: "per_person", centsPerPerson: 6500 };
    if (q >= 3 && q <= 5) return { kind: "per_person", centsPerPerson: 6000 };
    if (q >= 6 && q <= 7) return { kind: "per_person", centsPerPerson: 5500 };
    return null;
  }

  // Algarve (preço por grupo)
  if (tourId === "algarve") {
    if (q <= 3) return { kind: "per_group", centsTotal: 60000 };
    if (q <= 7) return { kind: "per_group", centsTotal: 70000 };
    return null;
  }

  // Porto (preço por grupo)
  if (tourId === "porto") {
    if (q <= 3) return { kind: "per_group", centsTotal: 80000 };
    if (q <= 7) return { kind: "per_group", centsTotal: 90000 };
    return null;
  }

  // Alentejo (preço fixo por grupo; desconto para 5–7 vs 1–4)
  if (tourId === "alentejo") {
    if (q >= 1 && q <= 4) return { kind: "per_group", centsTotal: 40000 };
    if (q >= 5 && q <= 7) return { kind: "per_group", centsTotal: 54000 };
    return null;
  }

  return null;
}

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
      "[checkout] Stripe não inicializou (confirma STRIPE_SECRET_KEY na Vercel):",
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
  const tableRule = ruleFromTable(tourId, quantity);

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

    fallbackPriceId = await resolveStripePriceId(stripe, tourId, quantity);
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

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${base}/reservar/obrigado?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/reservar?cancelado=1`,
      customer_email: email,
      metadata: {
        tour_id: tourId,
        tour_label: tourLabel,
        preferred_date: preferredDate,
        quantity: String(quantity),
        pricing_source: tableRule ? "table" : "stripe_price_map",
        pricing_kind: tableRule ? tableRule.kind : "stripe_price",
        customer_name: customerName,
        phone: phone || "",
        notes: notes || "",
      },
      custom_text: {
        submit: {
          message:
            "Após o pagamento, a confirmação pode incluir recibo da Stripe (conforme as tuas definições). A data do tour confirma-se connosco.",
        },
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Não foi possível criar o checkout." },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Erro Stripe.";
    console.error("[checkout]", e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
