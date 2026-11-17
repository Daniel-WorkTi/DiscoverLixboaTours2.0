import type { Locale } from "@/lib/i18n/types";
import { intlLocale } from "@/lib/i18n/locale";

export function formatCurrencyCents(
  cents: number,
  locale: Locale,
): string {
  return new Intl.NumberFormat(intlLocale(locale), {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function formatNumber(
  value: number,
  locale: Locale,
): string {
  return new Intl.NumberFormat(intlLocale(locale)).format(value);
}

export function formatGuests(count: number, locale: Locale): string {
  if (locale === "en") {
    return count === 1 ? "1 guest" : `${count} guests`;
  }
  if (locale === "es") {
    return count === 1 ? "1 persona" : `${count} personas`;
  }
  return count === 1 ? "1 pessoa" : `${count} pessoas`;
}

export function formatDurationHours(hours: number, locale: Locale): string {
  if (locale === "en") {
    return hours === 1 ? "1 hour" : `${hours} hours`;
  }
  if (locale === "es") {
    return hours === 1 ? "1 hora" : `${hours} horas`;
  }
  return hours === 1 ? "1 hora" : `${hours} horas`;
}
