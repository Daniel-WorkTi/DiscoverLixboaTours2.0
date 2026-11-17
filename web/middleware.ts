import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  isAppLocale,
  LOCALE_COOKIE,
  localeFromPathname,
  stripLocalePrefix,
} from "@/lib/i18n/locale";

const ADMIN_COOKIE_NAME = "dl_admin";
const LOCALE_HEADER = "x-dl-locale";
const PATH_HEADER = "x-dl-path";

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

  // Evita 2ª passagem após rewrite /en|/es → / (senão o locale volta a PT).
  const already = req.headers.get(LOCALE_HEADER);
  if (isAppLocale(already)) {
    return NextResponse.next();
  }

  const locale = localeFromPathname(pathname);
  const barePath = stripLocalePrefix(pathname);
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set(LOCALE_HEADER, locale);
  requestHeaders.set(PATH_HEADER, barePath);

  // /en/... e /es/... → rewrite interno para path PT
  if (locale === "en" || locale === "es") {
    const url = req.nextUrl.clone();
    url.pathname = barePath;
    const res = NextResponse.rewrite(url, {
      request: { headers: requestHeaders },
    });
    res.cookies.set(LOCALE_COOKIE, locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return res;
  }

  const res = NextResponse.next({
    request: { headers: requestHeaders },
  });
  res.cookies.set(LOCALE_COOKIE, "pt", {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return res;
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/((?!_next/static|_next/image|favicon.ico|assets|.*\\..*).*)",
  ],
};
