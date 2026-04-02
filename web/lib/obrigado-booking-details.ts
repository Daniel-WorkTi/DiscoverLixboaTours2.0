import { getStripe } from "@/lib/stripe-server";
import { isValidStripeCheckoutSessionId } from "@/lib/stripe-checkout-session-id";

export type ObrigadoBookingDetails = {
  tourLabel?: string | null;
  preferredDate?: string | null; // YYYY-MM-DD
  quantity?: number | null;
  customerName?: string | null;
  email?: string | null;
  phone?: string | null;
  notes?: string | null;
};

function asTrimmedString(v: unknown, max = 500): string | null {
  const s = typeof v === "string" ? v.trim() : String(v ?? "").trim();
  if (!s) return null;
  return s.length <= max ? s : `${s.slice(0, max - 1)}…`;
}

function asNullableInt(v: unknown): number | null {
  const n = typeof v === "number" ? v : Number(String(v ?? ""));
  if (!Number.isFinite(n)) return null;
  const i = Math.trunc(n);
  return i > 0 ? i : null;
}

export function formatPreferredDateEnLong(ymd: string | null | undefined): string {
  const s = String(ymd ?? "").trim();
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return "";
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  if (!y || mo < 1 || mo > 12 || d < 1 || d > 31) return "";
  const dt = new Date(y, mo - 1, d);
  if (Number.isNaN(dt.getTime())) return "";
  return dt.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function detailsFromSession(session: {
  metadata?: Record<string, unknown> | null;
  customer_details?: { name?: string | null; email?: string | null; phone?: string | null } | null;
  customer_email?: string | null;
}): ObrigadoBookingDetails {
  const meta = session.metadata ?? {};
  const customerName =
    asTrimmedString(meta.customer_name, 120) ??
    asTrimmedString(session.customer_details?.name, 120);
  const email =
    asTrimmedString(meta.email, 254) ??
    asTrimmedString(session.customer_details?.email, 254) ??
    asTrimmedString(session.customer_email, 254);

  return {
    tourLabel: asTrimmedString(meta.tour_label, 200),
    preferredDate: asTrimmedString(meta.preferred_date, 32),
    quantity: asNullableInt(meta.quantity),
    customerName,
    email,
    phone: asTrimmedString(meta.phone, 48) ?? asTrimmedString(session.customer_details?.phone, 48),
    notes: asTrimmedString(meta.notes, 500),
  };
}

/**
 * Fetches booking details from Stripe Checkout Session metadata.
 * Returns null when session_id is missing/invalid or Stripe is unavailable.
 */
export async function getBookingDetailsFromCheckoutSession(
  sessionId: string | undefined | null,
): Promise<ObrigadoBookingDetails | null> {
  const id = sessionId?.trim();
  if (!id || !isValidStripeCheckoutSessionId(id)) return null;
  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(id);
    return detailsFromSession(session);
  } catch (e) {
    console.error("[obrigado] could not read booking details from session:", e);
    return null;
  }
}

