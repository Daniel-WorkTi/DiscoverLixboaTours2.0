/** Locale canónico do site. */
export type Locale = "pt" | "en" | "es";

export const LOCALES: readonly Locale[] = ["pt", "en", "es"] as const;
export const DEFAULT_LOCALE: Locale = "pt";

/** Atributo HTML lang. */
export function htmlLang(locale: Locale): string {
  if (locale === "en") return "en";
  if (locale === "es") return "es";
  return "pt-PT";
}

export { LOCALE_COOKIE, type AppLocale, documentLang, intlLocale } from "./locale";
export {
  stripLocalePrefix,
  withLocalePrefix,
  localeFromPathname,
  isAppLocale,
} from "./locale";
