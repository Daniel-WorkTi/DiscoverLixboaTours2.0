/** Default WhatsApp number (E.164 without +) for wa.me links on the site. */
export const WHATSAPP_E164 = "351934483853";

/** wa.me link after booking, with a prefilled message. */
export function whatsappUrlAfterBooking(sessionId?: string | null): string {
  const parts = [
    "Hi! I've just completed a booking payment on the Discover Lixboa Tours website.",
    sessionId ? `Stripe reference: ${sessionId}` : null,
    "Can we confirm the tour details?",
  ].filter(Boolean) as string[];
  return `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(parts.join(" "))}`;
}
