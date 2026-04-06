import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, isCookieValueAuthenticated } from "@/lib/admin-auth";
import {
  createBookingCalendarEvent,
  isGoogleCalendarConfigured,
} from "@/lib/google-calendar";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function ymd(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * Cria um evento no Google Calendar igual a uma reserva paga, mas sem passar pelo Stripe.
 * Só para validar calendário + lista do admin (sessão autenticada).
 */
export async function POST() {
  const jar = await cookies();
  const v = jar.get(ADMIN_COOKIE_NAME)?.value || "";
  if (!isCookieValueAuthenticated(v)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  if (!isGoogleCalendarConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Google Calendar não configurado." },
      { status: 400 },
    );
  }

  const testDate = new Date();
  testDate.setDate(testDate.getDate() + 14);
  const preferredDate = ymd(testDate);
  const stripeSessionId = `cs_test_manual_${Date.now()}`;

  try {
    await createBookingCalendarEvent({
      tourLabel: "Tour 3 Destinos (DEMO)",
      customerName: "Cliente Demonstração",
      email: "cliente.demo@discoverlixboatours.com",
      phone: "+351 912 345 678",
      notes:
        "DEMO: reserva criada pelo painel admin (sem pagamento Stripe) para demonstração do fluxo.",
      quantity: 2,
      preferredDate,
      stripeSessionId,
      totalCents: 28000,
      currency: "eur",
    });
    return NextResponse.json({ ok: true, preferredDate, stripeSessionId });
  } catch (e) {
    console.error("[admin/bookings/test]", e);
    return NextResponse.json(
      { ok: false, error: "Não foi possível criar o evento de teste." },
      { status: 500 },
    );
  }
}
