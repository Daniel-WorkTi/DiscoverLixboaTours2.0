import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe-server";
import { isValidStripeCheckoutSessionId } from "@/lib/stripe-checkout-session-id";

export const runtime = "nodejs";

export const maxDuration = 30;

async function receiptUrlFromPaymentIntent(
  stripe: Stripe,
  pi: Stripe.PaymentIntent,
): Promise<string | null> {
  const lc = pi.latest_charge;
  if (typeof lc === "object" && lc !== null && "receipt_url" in lc) {
    return (lc as Stripe.Charge).receipt_url ?? null;
  }
  if (typeof lc === "string") {
    const ch = await stripe.charges.retrieve(lc);
    return ch.receipt_url ?? null;
  }
  return null;
}

async function resolveReceiptUrl(
  stripe: Stripe,
  sessionId: string,
): Promise<string | null> {
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["payment_intent.latest_charge"],
  });

  const pi = session.payment_intent;
  if (typeof pi === "string") {
    const piFull = await stripe.paymentIntents.retrieve(pi, {
      expand: ["latest_charge"],
    });
    return receiptUrlFromPaymentIntent(stripe, piFull);
  }
  if (pi && typeof pi === "object") {
    const direct = await receiptUrlFromPaymentIntent(stripe, pi);
    if (direct) return direct;
    if ("id" in pi && typeof pi.id === "string") {
      const piFull = await stripe.paymentIntents.retrieve(pi.id, {
        expand: ["latest_charge"],
      });
      return receiptUrlFromPaymentIntent(stripe, piFull);
    }
  }
  return null;
}

/**
 * GET /api/checkout/receipt?session_id=cs_...
 * Redirects to the receipt hosted by Stripe (PDF / official page).
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id")?.trim() ?? "";

  if (!sessionId || !isValidStripeCheckoutSessionId(sessionId)) {
    return NextResponse.json(
      { error: "Invalid or missing session_id." },
      { status: 400 },
    );
  }

  let stripe: ReturnType<typeof getStripe>;
  try {
    stripe = getStripe();
  } catch {
    return NextResponse.json(
      { error: "Payment service unavailable." },
      { status: 500 },
    );
  }

  try {
    const receiptUrl = await resolveReceiptUrl(stripe, sessionId);
    if (!receiptUrl) {
      return NextResponse.json(
        {
          error:
            "Receipt not yet available for this session (test mode, zero amount, or still processing). Try again in a moment or check the email associated with your payment.",
        },
        { status: 404 },
      );
    }
    return NextResponse.redirect(receiptUrl, 302);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Error retrieving receipt.";
    console.error("[checkout/receipt]", e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
