import { NextResponse } from "next/server";
import Stripe from "stripe";
import {
  sendOwnerBookingNotification,
  isBookingEmailConfigured,
} from "@/lib/booking-notify-email";
import {
  createBookingCalendarEvent,
  isGoogleCalendarConfigured,
  hasCalendarEventForStripeSession,
} from "@/lib/google-calendar";
import { getStripe } from "@/lib/stripe-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Webhook Stripe: após pagamento concluído, cria evento no Google Calendar.
 * Configura em Stripe Dashboard → Developers → Webhooks → endpoint URL + signing secret.
 */
export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  if (!webhookSecret) {
    console.error("[stripe-webhook] STRIPE_WEBHOOK_SECRET em falta");
    return NextResponse.json(
      { error: "Webhook não configurado." },
      { status: 500 },
    );
  }

  let stripe: Stripe;
  try {
    stripe = getStripe();
  } catch {
    return NextResponse.json({ error: "Stripe não configurado." }, { status: 500 });
  }

  const rawBody = await req.text();
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Assinatura em falta." }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (e) {
    console.error("[stripe-webhook] Verificação de assinatura falhou:", e);
    return NextResponse.json({ error: "Assinatura inválida." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.mode !== "payment") {
      return NextResponse.json({ received: true });
    }

    const md = session.metadata ?? {};
    const preferredDate = md.preferred_date?.trim() ?? "";
    const tourLabel = md.tour_label?.trim() || "Tour";
    const customerName = md.customer_name?.trim() || "";
    const quantity = Math.min(
      7,
      Math.max(1, parseInt(md.quantity || "1", 10) || 1),
    );
    const phone = (md.phone || "").trim();
    const notes = (md.notes || "").trim();

    const email =
      (session.customer_email || session.customer_details?.email || "")
        .trim()
        .toLowerCase() || "";

    if (!/^\d{4}-\d{2}-\d{2}$/.test(preferredDate)) {
      console.warn(
        "[stripe-webhook] preferred_date inválido ou em falta, session=",
        session.id,
      );
      return NextResponse.json({ received: true });
    }

    const notifyPayload = {
      tourLabel,
      customerName: customerName || "Cliente",
      email,
      phone,
      notes,
      quantity,
      preferredDate,
      stripeSessionId: session.id,
      totalCents: typeof session.amount_total === "number" ? session.amount_total : undefined,
      currency: typeof session.currency === "string" ? session.currency : undefined,
    };

    if (isGoogleCalendarConfigured()) {
      try {
        const exists = await hasCalendarEventForStripeSession(session.id);
        if (!exists) {
        await createBookingCalendarEvent(notifyPayload);
        }
      } catch (e) {
        console.error("[stripe-webhook] Erro ao criar evento no Google Calendar:", e);
        return NextResponse.json(
          { received: false, error: "calendar_insert_failed" },
          { status: 500 },
        );
      }
    } else {
      console.warn(
        "[stripe-webhook] Google Calendar não configurado; sem evento no calendário.",
      );
    }

    if (isBookingEmailConfigured()) {
      try {
        await sendOwnerBookingNotification(notifyPayload);
      } catch (e) {
        console.error("[stripe-webhook] Erro ao enviar email de notificação:", e);
      }
    }
  }

  return NextResponse.json({ received: true });
}
