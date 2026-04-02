import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// Keep this file Edge-compatible (no Node crypto imports here).
const ADMIN_COOKIE_NAME = "dl_admin";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/admin")) return NextResponse.next();
  if (pathname === "/admin/login") return NextResponse.next();

  const has = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!has) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

