import { headers } from "next/headers";
import {
  isAppLocale,
  type AppLocale,
} from "@/lib/i18n/locale";
import type { Locale } from "@/lib/i18n/types";

export const LOCALE_HEADER = "x-dl-locale";

/** Lê o locale definido pelo middleware (URL /en → en). */
export async function getRequestLocale(): Promise<Locale> {
  const h = await headers();
  const raw = h.get(LOCALE_HEADER);
  if (isAppLocale(raw)) return raw;
  return "pt";
}

export type { Locale, AppLocale };
