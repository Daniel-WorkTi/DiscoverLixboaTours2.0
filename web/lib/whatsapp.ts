/** WhatsApp number in E.164 without the + prefix. Optional: NEXT_PUBLIC_WHATSAPP_E164 on Vercel. */
export const WHATSAPP_E164 =
  (typeof process !== "undefined" &&
    process.env.NEXT_PUBLIC_WHATSAPP_E164?.replace(/\D/g, "")) ||
  "351934483853";

/** wa.me link after booking, with a prefilled message. */
export function whatsappUrlAfterBooking(sessionId?: string | null): string {
  const parts = [
    "Hi! I've just completed a booking payment on the Discover Lixboa Tours website.",
    sessionId ? `Stripe reference: ${sessionId}` : null,
    "Can we confirm the tour details?",
  ].filter(Boolean) as string[];
  return `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(parts.join(" "))}`;
}
