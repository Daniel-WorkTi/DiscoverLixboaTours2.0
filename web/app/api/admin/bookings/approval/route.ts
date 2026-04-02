import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, isCookieValueAuthenticated } from "@/lib/admin-auth";
import { isGoogleCalendarConfigured, setBookingApprovalStatus } from "@/lib/google-calendar";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const jar = await cookies();
  const v = jar.get(ADMIN_COOKIE_NAME)?.value || "";
  if (!isCookieValueAuthenticated(v)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  if (!isGoogleCalendarConfigured()) {
    return NextResponse.json({ ok: false, error: "Calendar not configured." }, { status: 500 });
  }

  const body = (await req.json().catch(() => null)) as null | {
    eventId?: string;
    status?: string;
  };

  const eventId = String(body?.eventId || "").trim();
  const status = body?.status;
  if (!eventId || (status !== "accepted" && status !== "rejected")) {
    return NextResponse.json(
      { ok: false, error: "eventId e status (accepted|rejected) são obrigatórios." },
      { status: 400 },
    );
  }

  try {
    await setBookingApprovalStatus(eventId, status);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[admin/bookings/approval]", e);
    const msg = e instanceof Error ? e.message : "Falha ao atualizar.";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
