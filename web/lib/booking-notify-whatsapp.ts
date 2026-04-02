import type { BookingCalendarPayload } from "@/lib/google-calendar";

export type BookingWhatsAppPayload = BookingCalendarPayload;

function digitsOnly(s: string): string {
  return s.replace(/\D/g, "");
}

export function isBookingWhatsAppConfigured(): boolean {
  return Boolean(
    process.env.WHATSAPP_ACCESS_TOKEN?.trim() &&
      process.env.WHATSAPP_PHONE_NUMBER_ID?.trim() &&
      process.env.BOOKING_NOTIFY_WHATSAPP_TO?.trim(),
  );
}

function formatMoney(totalCents?: number, currency?: string): string | null {
  if (typeof totalCents !== "number" || !Number.isFinite(totalCents)) return null;
  const cur = (currency || "EUR").toUpperCase();
  try {
    return new Intl.NumberFormat("pt-PT", { style: "currency", currency: cur }).format(
      totalCents / 100,
    );
  } catch {
    return `${(totalCents / 100).toFixed(2)} ${cur}`;
  }
}

function buildMessage(p: BookingWhatsAppPayload): string {
  const total = formatMoney(p.totalCents, p.currency);
  const lines = [
    "✅ Nova reserva paga (Stripe)",
    "",
    `Tour: ${p.tourLabel}`,
    `Data: ${p.preferredDate}`,
    `Pessoas: ${p.quantity}`,
    total ? `Total: ${total}` : null,
    "",
    `Nome: ${p.customerName}`,
    `Email: ${p.email || "—"}`,
    `Telefone: ${p.phone || "—"}`,
    p.notes ? `Notas: ${p.notes}` : null,
    "",
    `Stripe session: ${p.stripeSessionId}`,
  ].filter(Boolean) as string[];
  return lines.join("\n");
}

/**
 * Sends a WhatsApp message via WhatsApp Cloud API.
 * Requires:
 * - WHATSAPP_ACCESS_TOKEN
 * - WHATSAPP_PHONE_NUMBER_ID (sender)
 * - BOOKING_NOTIFY_WHATSAPP_TO (recipient, E.164 digits, e.g. 3519xxxxxxx)
 */
export async function sendOwnerBookingWhatsApp(
  p: BookingWhatsAppPayload,
): Promise<void> {
  if (!isBookingWhatsAppConfigured()) return;
  const token = process.env.WHATSAPP_ACCESS_TOKEN!.trim();
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID!.trim();
  const to = digitsOnly(process.env.BOOKING_NOTIFY_WHATSAPP_TO!);
  if (!to) throw new Error("BOOKING_NOTIFY_WHATSAPP_TO inválido.");

  const url = `https://graph.facebook.com/v22.0/${phoneNumberId}/messages`;
  const body = {
    messaging_product: "whatsapp",
    to,
    type: "text",
    text: { body: buildMessage(p) },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`WhatsApp API failed (${res.status}): ${errText.slice(0, 500)}`);
  }
}

