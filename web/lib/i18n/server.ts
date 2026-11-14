import { cookies, headers } from "next/headers";
import {
  isAppLocale,
  LOCALE_COOKIE,
  type AppLocale,
} from "@/lib/i18n/locale";
import type { Locale } from "@/lib/i18n/types";

export const LOCALE_HEADER = "x-dl-locale";
export const LOCALE_PATH_HEADER = "x-dl-path";

/** Lê o locale definido pelo middleware (URL /en → en). */
export async function getRequestLocale(): Promise<Locale> {
  const h = await headers();
  const fromHeader = h.get(LOCALE_HEADER);
  if (isAppLocale(fromHeader)) return fromHeader;

  // Fallback: cookie (útil se o header se perder em algum caminho).
  const c = await cookies();
  const fromCookie = c.get(LOCALE_COOKIE)?.value;
  if (isAppLocale(fromCookie)) return fromCookie;

  return "pt";
}

export type { Locale, AppLocale };
