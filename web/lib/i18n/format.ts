import type { Locale } from "@/lib/i18n/types";

export function formatCurrencyEur(
  amountEuros: number,
  locale: Locale,
  opts?: { maximumFractionDigits?: number },
): string {
  return new Intl.NumberFormat(locale === "en" ? "en-GB" : "pt-PT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: opts?.maximumFractionDigits ?? 0,
  }).format(amountEuros);
}

export function formatCurrencyCents(
  cents: number,
  locale: Locale,
  opts?: { maximumFractionDigits?: number },
): string {
  return formatCurrencyEur(cents / 100, locale, opts);
}

export function formatGuests(count: number, locale: Locale): string {
  if (locale === "en") {
    return count === 1 ? "1 Guest" : `${count} Guests`;
  }
  return count === 1 ? "1 passageiro" : `${count} passageiros`;
}

export function formatDurationHours(hours: number, locale: Locale): string {
  if (locale === "en") {
    return hours === 1 ? "1 Hour" : `${hours} Hours`;
  }
  return hours === 1 ? "1 hora" : `${hours} horas`;
}

export function centsToEuros(cents: number): number {
  return Math.round(cents) / 100;
}
