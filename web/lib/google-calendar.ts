/**
 * Cria eventos de dia inteiro no Google Calendar (API v3) com conta de serviço.
 * O calendário de destino tem de ser partilhado com o email da conta de serviço
 * (permissão "Fazer alterações aos eventos").
 */

import { google } from "googleapis";

export type BookingCalendarPayload = {
  tourLabel: string;
  customerName: string;
  email: string;
  phone: string;
  notes: string;
  quantity: number;
  preferredDate: string;
  stripeSessionId: string;
};

function addOneDayYmd(ymd: string): string {
  const [y, m, d] = ymd.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  dt.setDate(dt.getDate() + 1);
  const yy = dt.getFullYear();
  const mm = String(dt.getMonth() + 1).padStart(2, "0");
  const dd = String(dt.getDate()).padStart(2, "0");
  return `${yy}-${mm}-${dd}`;
}

function buildDescription(p: BookingCalendarPayload): string {
  const lines = [
    `Reserva paga via Stripe.`,
    `Tour: ${p.tourLabel}`,
    `Pessoas: ${p.quantity}`,
    `Cliente: ${p.customerName}`,
    `Email: ${p.email || "—"}`,
    `Telefone: ${p.phone || "—"}`,
    p.notes ? `Notas: ${p.notes}` : null,
    `Stripe Checkout: ${p.stripeSessionId}`,
  ].filter(Boolean) as string[];
  return lines.join("\n");
}

export function isGoogleCalendarConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_CALENDAR_ID?.trim() &&
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim() &&
      process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.trim(),
  );
}

export async function createBookingCalendarEvent(
  p: BookingCalendarPayload,
): Promise<void> {
  if (!isGoogleCalendarConfigured()) {
    throw new Error("Google Calendar não configurado (env).");
  }

  const key = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY!.replace(
    /\\n/g,
    "\n",
  );
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!.trim();
  const calendarId = process.env.GOOGLE_CALENDAR_ID!.trim();

  const auth = new google.auth.JWT({
    email: clientEmail,
    key,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  const calendar = google.calendar({ version: "v3", auth });
  const endDate = addOneDayYmd(p.preferredDate);

  await calendar.events.insert({
    calendarId,
    requestBody: {
      summary: `${p.tourLabel} — ${p.customerName}`,
      description: buildDescription(p),
      start: { date: p.preferredDate },
      end: { date: endDate },
      extendedProperties: {
        private: {
          stripe_session_id: p.stripeSessionId,
        },
      },
    },
  });
}
