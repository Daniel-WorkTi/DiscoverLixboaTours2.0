/**
 * Notificação por email ao dono da reserva (Resend API).
 * Variáveis: RESEND_API_KEY, BOOKING_NOTIFY_EMAIL (e opcionalmente RESEND_FROM_EMAIL).
 */

export type BookingNotifyPayload = {
  tourLabel: string;
  customerName: string;
  email: string;
  phone: string;
  notes: string;
  quantity: number;
  preferredDate: string;
  stripeSessionId: string;
};

export function isBookingEmailConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY?.trim() && process.env.BOOKING_NOTIFY_EMAIL?.trim(),
  );
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildPlainText(p: BookingNotifyPayload): string {
  return [
    "Nova reserva paga (Stripe)",
    "",
    `Tour: ${p.tourLabel}`,
    `Data preferida: ${p.preferredDate}`,
    `Pessoas: ${p.quantity}`,
    "",
    `Nome: ${p.customerName}`,
    `Email: ${p.email}`,
    `Telefone: ${p.phone || "—"}`,
    p.notes ? `Notas: ${p.notes}` : "",
    "",
    `Sessão Stripe: ${p.stripeSessionId}`,
  ]
    .filter(Boolean)
    .join("\n");
}

function buildHtml(p: BookingNotifyPayload): string {
  const rows: [string, string][] = [
    ["Tour", escapeHtml(p.tourLabel)],
    ["Data preferida", escapeHtml(p.preferredDate)],
    ["Pessoas", String(p.quantity)],
    ["Nome", escapeHtml(p.customerName)],
    ["Email", escapeHtml(p.email)],
    ["Telefone", escapeHtml(p.phone || "—")],
    ["Notas", p.notes ? escapeHtml(p.notes) : "—"],
    ["Stripe session", escapeHtml(p.stripeSessionId)],
  ];
  const tableRows = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #eee;font-weight:600;color:#555;">${escapeHtml(k)}</td><td style="padding:8px 12px;border:1px solid #eee;">${v}</td></tr>`,
    )
    .join("");
  return `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;line-height:1.5;color:#333;">
<p style="font-size:16px;font-weight:700;color:#ff6600;">Nova reserva paga</p>
<table style="border-collapse:collapse;max-width:560px;">${tableRows}</table>
</body></html>`;
}

/** Regista erro nos logs se Resend falhar. */
export async function sendOwnerBookingNotification(
  p: BookingNotifyPayload,
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.BOOKING_NOTIFY_EMAIL?.trim();
  if (!apiKey || !to) return;

  const from =
    process.env.RESEND_FROM_EMAIL?.trim() ||
    "Discover Lixboa Tours <onboarding@resend.dev>";

  const subject = `Nova reserva: ${p.tourLabel} — ${p.preferredDate}`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text: buildPlainText(p),
      html: buildHtml(p),
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    console.error(
      "[booking-email] Resend falhou:",
      res.status,
      errText.slice(0, 500),
    );
  }
}
