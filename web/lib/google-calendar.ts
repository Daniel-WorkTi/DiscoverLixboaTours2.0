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
  totalCents?: number;
  currency?: string;
};

export const MAX_BOOKINGS_PER_DAY = 7;

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
  const total =
    typeof p.totalCents === "number" && Number.isFinite(p.totalCents)
      ? `${(p.totalCents / 100).toFixed(2)} ${String(p.currency || "EUR").toUpperCase()}`
      : null;
  const lines = [
    `Reserva paga via Stripe.`,
    `Tour: ${p.tourLabel}`,
    `Pessoas: ${p.quantity}`,
    `Cliente: ${p.customerName}`,
    `Email: ${p.email || "—"}`,
    `Telefone: ${p.phone || "—"}`,
    total ? `Total: ${total}` : null,
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

function getCalendarClient() {
  if (!isGoogleCalendarConfigured()) {
    throw new Error("Google Calendar não configurado (env).");
  }

  const key = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY!.replace(/\\n/g, "\n");
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!.trim();
  const calendarId = process.env.GOOGLE_CALENDAR_ID!.trim();

  const auth = new google.auth.JWT({
    email: clientEmail,
    key,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  const calendar = google.calendar({ version: "v3", auth });
  return { calendar, calendarId };
}

function isStripePaidBookingEvent(ev: {
  status?: string | null;
  start?: { date?: string | null } | null;
  extendedProperties?: { private?: Record<string, string | undefined> | null } | null;
}): boolean {
  if (ev.status === "cancelled") return false;
  const priv = ev.extendedProperties?.private ?? undefined;
  return priv?.booking_kind === "stripe_paid";
}

/**
 * Returns true if an event already exists for this Stripe session id.
 * Used for idempotency (Stripe may retry webhooks).
 */
export async function hasCalendarEventForStripeSession(
  stripeSessionId: string,
): Promise<boolean> {
  const id = stripeSessionId.trim();
  if (!id) return false;
  const { calendar, calendarId } = getCalendarClient();
  const res = await calendar.events.list({
    calendarId,
    maxResults: 5,
    privateExtendedProperty: [`stripe_session_id=${id}`],
  });
  const items = res.data.items ?? [];
  return items.some((ev) => (ev.status ?? "") !== "cancelled");
}

/**
 * Counts how many paid bookings exist for the given day (YYYY-MM-DD).
 * This is used to enforce a max number of bookings per date.
 */
export async function countPaidBookingsOnDate(ymd: string): Promise<number> {
  const day = ymd.trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) return 0;
  const { calendar, calendarId } = getCalendarClient();

  const timeMin = `${day}T00:00:00Z`;
  const timeMax = `${addOneDayYmd(day)}T00:00:00Z`;

  const res = await calendar.events.list({
    calendarId,
    timeMin,
    timeMax,
    singleEvents: true,
    showDeleted: false,
    maxResults: 2500,
    orderBy: "startTime",
  });
  const items = res.data.items ?? [];
  return items.filter((ev) => ev.start?.date === day && isStripePaidBookingEvent(ev)).length;
}

export async function isBookingDateAvailable(ymd: string): Promise<boolean> {
  const n = await countPaidBookingsOnDate(ymd);
  return n < MAX_BOOKINGS_PER_DAY;
}

export async function createBookingCalendarEvent(
  p: BookingCalendarPayload,
): Promise<void> {
  const { calendar, calendarId } = getCalendarClient();
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
          booking_kind: "stripe_paid",
          stripe_session_id: p.stripeSessionId,
          booking_date: p.preferredDate,
          booking_tour: p.tourLabel,
          booking_customer: p.customerName,
          booking_email: p.email,
          booking_phone: p.phone,
          booking_quantity: String(p.quantity),
          ...(typeof p.totalCents === "number" && Number.isFinite(p.totalCents)
            ? { booking_total_cents: String(Math.round(p.totalCents)) }
            : {}),
          ...(p.currency ? { booking_currency: String(p.currency).toLowerCase() } : {}),
        },
      },
    },
  });
}
