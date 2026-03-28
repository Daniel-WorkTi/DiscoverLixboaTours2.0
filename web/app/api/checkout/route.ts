import { NextResponse } from "next/server";
import Stripe from "stripe";
import { resolveStripePriceId } from "@/lib/stripe-prices";
import { getSiteBaseUrl } from "@/lib/site-url";
import { toursBooking } from "@/lib/tours-booking";

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key?.startsWith("sk_")) {
    throw new Error("STRIPE_SECRET_KEY em falta ou inválida.");
  }
  return new Stripe(key, {
    apiVersion: "2026-03-25.dahlia",
  });
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
  } catch {
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
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const tourId = String(body.tourId ?? "").trim();
  const quantity = Math.min(
    7,
    Math.max(1, Number(body.quantity) || 1),
  );
  const preferredDate = String(body.preferredDate ?? "").trim();
  const customerName = String(body.customerName ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const phone = String(body.phone ?? "").trim().slice(0, 40);
  const notes = String(body.notes ?? "").trim().slice(0, 500);

  const tourLabel =
    toursBooking.find((t) => t.id === tourId)?.label ?? tourId;

  if (!tourId || !toursBooking.some((t) => t.id === tourId)) {
    return NextResponse.json({ error: "Tour inválido." }, { status: 400 });
  }

  if (!preferredDate) {
    return NextResponse.json(
      { error: "Indica a data preferida para o tour." },
      { status: 400 },
    );
  }

  if (customerName.length < 2) {
    return NextResponse.json(
      { error: "Indica o teu nome completo." },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email inválido." }, { status: 400 });
  }

  const priceId = await resolveStripePriceId(stripe, tourId);
  if (!priceId) {
    return NextResponse.json(
      {
        error:
          "Não foi possível preparar o pagamento para este tour. Contacta-nos ou tenta outro destino.",
      },
      { status: 400 },
    );
  }

  const base = getSiteBaseUrl();

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: priceId,
          quantity,
        },
      ],
      success_url: `${base}/reservar/obrigado?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/reservar?cancelado=1`,
      customer_email: email,
      metadata: {
        tour_id: tourId,
        tour_label: tourLabel,
        preferred_date: preferredDate,
        quantity: String(quantity),
        customer_name: customerName,
        phone: phone || "",
        notes: notes || "",
      },
      custom_text: {
        submit: {
          message:
            "Após o pagamento recebes confirmação por email. A data combinada será confirmada connosco.",
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
