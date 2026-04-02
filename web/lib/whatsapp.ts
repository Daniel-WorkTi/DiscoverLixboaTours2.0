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

/** Extrai dígitos para wa.me (E.164 sem +). */
export function digitsForWhatsApp(raw: string | null | undefined): string | null {
  const d = String(raw ?? "").replace(/\D/g, "");
  if (!d) return null;
  if (d.startsWith("351") && d.length >= 11) return d;
  if (d.length === 9) return `351${d}`;
  return d;
}

/** Abre conversa com o cliente (telefone do formulário). */
export function whatsappUrlForCustomerPhone(
  phoneRaw: string | null | undefined,
  opts?: { customerName?: string; tourLabel?: string; preferredDate?: string },
): string | null {
  const e164 = digitsForWhatsApp(phoneRaw);
  if (!e164) return null;
  const parts = [
    "Olá" + (opts?.customerName ? ` ${opts.customerName.split(/\s+/)[0]}` : "") + "!",
    "Somos da Discover Lixboa Tours.",
    opts?.tourLabel ? `Reserva: ${opts.tourLabel}` : null,
    opts?.preferredDate ? `Data: ${opts.preferredDate}` : null,
    "Podemos confirmar os detalhes da viagem?",
  ].filter(Boolean) as string[];
  return `https://wa.me/${e164}?text=${encodeURIComponent(parts.join(" "))}`;
}
