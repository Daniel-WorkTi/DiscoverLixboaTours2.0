/** Locale canónico do site. */
export type Locale = "pt" | "en";

export const LOCALES: readonly Locale[] = ["pt", "en"] as const;
export const DEFAULT_LOCALE: Locale = "pt";

/** Atributo HTML lang. */
export function htmlLang(locale: Locale): string {
  return locale === "en" ? "en" : "pt-PT";
}

export { LOCALE_COOKIE, type AppLocale } from "./locale";
export {
  stripLocalePrefix,
  withLocalePrefix,
  localeFromPathname,
  isAppLocale,
} from "./locale";
