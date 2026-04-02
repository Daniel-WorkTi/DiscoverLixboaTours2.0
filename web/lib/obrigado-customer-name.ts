import { getStripe } from "@/lib/stripe-server";
import { isValidStripeCheckoutSessionId } from "@/lib/stripe-checkout-session-id";

/** First name for the “Thank you, Ana!” heading */
export function firstNameForGreeting(fullName: string): string {
  const t = fullName.trim();
  if (!t) return "";
  const [first] = t.split(/\s+/);
  return first ?? t;
}

/**
 * Customer name after Checkout (form metadata or Stripe customer details).
 */
export async function getCustomerNameFromCheckoutSession(
  sessionId: string | undefined | null,
): Promise<string | null> {
  const id = sessionId?.trim();
  if (!id || !isValidStripeCheckoutSessionId(id)) return null;

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(id);
    const fromMeta = session.metadata?.customer_name?.trim();
    if (fromMeta) return fromMeta;
    const fromDetails = session.customer_details?.name?.trim();
    if (fromDetails) return fromDetails;
    return null;
  } catch (e) {
    console.error("[obrigado] could not read customer name from session:", e);
    return null;
  }
}
