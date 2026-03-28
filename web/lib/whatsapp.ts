/** Número WhatsApp em E.164 sem prefixo +. Opcional: NEXT_PUBLIC_WHATSAPP_E164 na Vercel. */
export const WHATSAPP_E164 =
  (typeof process !== "undefined" &&
    process.env.NEXT_PUBLIC_WHATSAPP_E164?.replace(/\D/g, "")) ||
  "351934483853";

/** Link wa.me após reserva, com mensagem pré-preenchida. */
export function whatsappUrlAfterBooking(sessionId?: string | null): string {
  const parts = [
    "Olá! Acabei de concluir o pagamento de uma reserva no site Discover Lixboa Tours.",
    sessionId ? `Referência Stripe: ${sessionId}` : null,
    "Podemos confirmar os detalhes do tour?",
  ].filter(Boolean) as string[];
  return `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(parts.join(" "))}`;
}
