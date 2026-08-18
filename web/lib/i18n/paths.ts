import {
  localeFromPathname,
  stripLocalePrefix,
  withLocalePrefix,
  type AppLocale,
} from "@/lib/i18n/locale";

/** Href interno com prefixo /en quando aplicável. */
export function localeHref(pathname: string, locale: AppLocale): string {
  return withLocalePrefix(pathname, locale);
}

export function localeFromClientPath(pathname: string | null): AppLocale {
  return localeFromPathname(pathname || "/");
}

export function barePath(pathname: string | null): string {
  return stripLocalePrefix(pathname || "/");
}
