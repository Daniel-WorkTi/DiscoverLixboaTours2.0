import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  LOCALE_COOKIE,
  localeFromPathname,
  stripLocalePrefix,
} from "@/lib/i18n/locale";

const ADMIN_COOKIE_NAME = "dl_admin";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Admin auth (unchanged)
  if (pathname.startsWith("/admin")) {
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

  // Skip static assets / Next internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const locale = localeFromPathname(pathname);
  const barePath = stripLocalePrefix(pathname);
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-dl-locale", locale);
  requestHeaders.set("x-dl-path", barePath);

  // /en/... → rewrite interno para path PT (URLs indexadas PT intactas; /en é alias EN)
  if (locale === "en") {
    const url = req.nextUrl.clone();
    url.pathname = barePath;
    const res = NextResponse.rewrite(url, {
      request: { headers: requestHeaders },
    });
    res.cookies.set(LOCALE_COOKIE, "en", {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return res;
  }

  const res = NextResponse.next({
    request: { headers: requestHeaders },
  });
  // Não forçar PT se o user já escolheu EN sem /en (bandeira) — só define se ausente
  if (!req.cookies.get(LOCALE_COOKIE)?.value) {
    res.cookies.set(LOCALE_COOKIE, "pt", {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }
  return res;
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/((?!_next/static|_next/image|favicon.ico|assets|.*\\..*).*)",
  ],
};
