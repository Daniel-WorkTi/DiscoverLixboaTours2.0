/** Locale do site (cookie + path /en). */
export const LOCALE_COOKIE = "dl_lang";
export type AppLocale = "pt" | "en";

export function isAppLocale(v: unknown): v is AppLocale {
  return v === "pt" || v === "en";
}

/** Remove o prefixo /en da pathname. */
export function stripLocalePrefix(pathname: string): string {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) {
    const rest = pathname.slice(3);
    return rest.startsWith("/") ? rest : `/${rest}`;
  }
  return pathname;
}

/** Pathname com prefixo de locale (PT = sem prefixo). */
export function withLocalePrefix(pathname: string, locale: AppLocale): string {
  const bare = stripLocalePrefix(pathname) || "/";
  if (locale === "pt") return bare;
  if (bare === "/") return "/en";
  return `/en${bare}`;
}

export function localeFromPathname(pathname: string): AppLocale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "pt";
}
