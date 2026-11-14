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

/** Pathname com prefixo de locale (PT = sem prefixo). Aceita query string e hash. */
export function withLocalePrefix(pathname: string, locale: AppLocale): string {
  const hashIndex = pathname.indexOf("#");
  const withoutHash = hashIndex >= 0 ? pathname.slice(0, hashIndex) : pathname;
  const hash = hashIndex >= 0 ? pathname.slice(hashIndex) : "";
  const qi = withoutHash.indexOf("?");
  const pathOnly = qi >= 0 ? withoutHash.slice(0, qi) : withoutHash;
  const qs = qi >= 0 ? withoutHash.slice(qi) : "";
  const bare = stripLocalePrefix(pathOnly) || "/";
  if (locale === "pt") return `${bare}${qs}${hash}`;
  if (bare === "/") return `/en${qs}${hash}`;
  return `/en${bare}${qs}${hash}`;
}

export function localeFromPathname(pathname: string): AppLocale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "pt";
}
