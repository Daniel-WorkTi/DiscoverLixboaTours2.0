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
): "" | "/" | "/en" {
  if (variant === "home") return "";
  return locale === "en" ? "/en" : "/";
}
