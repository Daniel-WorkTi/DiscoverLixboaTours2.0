import { stripLocalePrefix, type AppLocale } from "@/lib/i18n/locale";

export type SiteNavVariant = "home" | "site";

/** Na home usa âncoras `#secção`; noutras páginas usa `/#secção` (ou `/en#…`). */
export function getSiteNavVariant(pathname: string): SiteNavVariant {
  const bare = stripLocalePrefix(pathname);
  return bare === "/" ? "home" : "site";
}

export function getSiteNavBase(
  variant: SiteNavVariant,
  locale: AppLocale = "pt",
): "" | "/" | "/en" | "/es" {
  if (variant === "home") return "";
  if (locale === "en") return "/en";
  if (locale === "es") return "/es";
  return "/";
}
