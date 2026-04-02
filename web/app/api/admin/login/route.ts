import { NextResponse } from "next/server";
import {
  adminSessionValue,
  ADMIN_COOKIE_NAME,
  isAdminAuthConfigured,
  verifyAdminPassword,
} from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Admin auth not configured." },
      { status: 500 },
    );
  }

  const body = (await req.json().catch(() => null)) as null | { password?: string };
  const pass = String(body?.password || "");
  if (!verifyAdminPassword(pass)) {
    return NextResponse.json({ ok: false, error: "Invalid password." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, adminSessionValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return res;
}

