import { NextResponse } from "next/server";
import { google } from "googleapis";
import type { calendar_v3 } from "googleapis";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, isCookieValueAuthenticated } from "@/lib/admin-auth";
import { parseApprovalStatus, type BookingApprovalStatus } from "@/lib/booking-approval";
import { isGoogleCalendarConfigured } from "@/lib/google-calendar";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export type BookingRow = {
  eventId: string;
  stripeSessionId: string;
  preferredDate: string;
  tourLabel: string;
  customerName: string;
  email: string;
  phone: string;
  notes: string;
  quantity: number;
  totalCents?: number;
  currency?: string;
  createdAt?: string;
  approvalStatus: BookingApprovalStatus;
};

function getCalendarClient() {
  if (!isGoogleCalendarConfigured()) throw new Error("Google Calendar not configured.");
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

function parseRowFromEvent(ev: calendar_v3.Schema$Event): BookingRow | null {
  const priv = ev.extendedProperties?.private ?? {};
  if (priv.booking_kind !== "stripe_paid") return null;

  const eventId = String(ev?.id || "").trim();
  const stripeSessionId = String(priv.stripe_session_id || "").trim();
  const preferredDate = String(priv.booking_date || ev?.start?.date || "").trim();
  if (!eventId || !stripeSessionId || !preferredDate) return null;

  const quantity = Math.max(1, Math.min(7, parseInt(String(priv.booking_quantity || "1"), 10) || 1));
  const totalCentsRaw = priv.booking_total_cents != null ? Number(priv.booking_total_cents) : NaN;

  return {
    eventId,
    stripeSessionId,
    preferredDate,
    tourLabel: String(priv.booking_tour || ev?.summary || "Tour").trim(),
    customerName: String(priv.booking_customer || "").trim() || "Cliente",
    email: String(priv.booking_email || "").trim(),
    phone: String(priv.booking_phone || "").trim(),
    notes: String(priv.booking_notes || "").trim(),
    quantity,
    totalCents: Number.isFinite(totalCentsRaw) ? Math.round(totalCentsRaw) : undefined,
    currency: typeof priv.booking_currency === "string" ? priv.booking_currency : undefined,
    createdAt: typeof ev?.created === "string" ? ev.created : undefined,
    approvalStatus: parseApprovalStatus(priv.booking_approval_status),
  };
}

export async function GET() {
  const jar = await cookies();
  const v = jar.get(ADMIN_COOKIE_NAME)?.value || "";
  if (!isCookieValueAuthenticated(v)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { calendar, calendarId } = getCalendarClient();

    const now = new Date();
    const past = new Date(now);
    past.setDate(now.getDate() - 14);
    const future = new Date(now);
    future.setDate(now.getDate() + 120);

    const res = await calendar.events.list({
      calendarId,
      timeMin: past.toISOString(),
      timeMax: future.toISOString(),
      singleEvents: true,
      showDeleted: false,
      maxResults: 250,
      orderBy: "startTime",
      privateExtendedProperty: ["booking_kind=stripe_paid"],
    });

    const items = res.data.items ?? [];
    const rows = items.map(parseRowFromEvent).filter(Boolean) as BookingRow[];
    rows.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));

    return NextResponse.json({ ok: true, rows });
  } catch (e) {
    console.error("[admin/bookings/recent]", e);
    return NextResponse.json({ ok: false, error: "Failed to load bookings." }, { status: 500 });
  }
}

