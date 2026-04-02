/**
 * IDs de sessão Stripe Checkout (cs_…). Usado em API e página obrigado para
 * rejeitar valores forjados antes de chamar a Stripe.
 */
export const STRIPE_CHECKOUT_SESSION_ID_RE = /^cs_[a-zA-Z0-9_]+$/;

export function isValidStripeCheckoutSessionId(id: string): boolean {
  if (id !== id.trim()) return false;
  if (/\s/.test(id)) return false;
  return id.length > 0 && STRIPE_CHECKOUT_SESSION_ID_RE.test(id);
}
