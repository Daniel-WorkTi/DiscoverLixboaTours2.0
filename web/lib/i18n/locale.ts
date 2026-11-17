/** Locale do site (cookie + path /en | /es). */
export const LOCALE_COOKIE = "dl_lang";
export type AppLocale = "pt" | "en" | "es";

const PREFIXED_LOCALES = ["en", "es"] as const;

export function isAppLocale(v: unknown): v is AppLocale {
  return v === "pt" || v === "en" || v === "es";
}

function stripOnePrefix(pathname: string, prefix: string): string | null {
  if (pathname === `/${prefix}`) return "/";
  if (pathname.startsWith(`/${prefix}/`)) {
    const rest = pathname.slice(prefix.length + 1);
    return rest.startsWith("/") ? rest : `/${rest}`;
  }
  return null;
}

/** Remove o prefixo /en ou /es da pathname. */
export function stripLocalePrefix(pathname: string): string {
  for (const prefix of PREFIXED_LOCALES) {
    const bare = stripOnePrefix(pathname, prefix);
    if (bare != null) return bare;
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
  const prefix = `/${locale}`;
  if (bare === "/") return `${prefix}${qs}${hash}`;
  return `${prefix}${bare}${qs}${hash}`;
}

export function localeFromPathname(pathname: string): AppLocale {
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  if (pathname === "/es" || pathname.startsWith("/es/")) return "es";
  return "pt";
}

/** BCP 47 / Intl tag. */
export function intlLocale(locale: AppLocale): string {
  if (locale === "en") return "en-GB";
  if (locale === "es") return "es-ES";
  return "pt-PT";
}

/** Atributo HTML lang. */
export function documentLang(locale: AppLocale): string {
  if (locale === "en") return "en";
  if (locale === "es") return "es";
  return "pt-PT";
}
