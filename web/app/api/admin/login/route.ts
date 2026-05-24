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
      {
        ok: false,
        code: "AUTH_NOT_CONFIGURED",
        error:
          "O login do admin ainda não está configurado no servidor. Defina ADMIN_PASSWORD e ADMIN_AUTH_SECRET nas variáveis de ambiente (ex.: Vercel) e faça um novo deploy.",
      },
      { status: 500 },
    );
  }

  const body = (await req.json().catch(() => null)) as null | { password?: string };
  const pass = String(body?.password || "");
  if (!verifyAdminPassword(pass)) {
    return NextResponse.json(
      { ok: false, code: "INVALID_PASSWORD", error: "Palavra-passe incorreta. Tente novamente." },
      { status: 401 },
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, adminSessionValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return res;
}

