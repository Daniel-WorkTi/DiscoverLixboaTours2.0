"use client";

import { createContext, useContext } from "react";
import type { Locale } from "./types";
import { getMessages, type Messages } from "@/messages";

const Ctx = createContext<{ locale: Locale; m: Messages } | null>(null);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const m = getMessages(locale);
  return <Ctx.Provider value={{ locale, m }}>{children}</Ctx.Provider>;
}

/** Locale da página (URL). Fallback pt fora do provider (ex.: admin). */
export function useLocale(): Locale {
  const v = useContext(Ctx);
  return v?.locale ?? "pt";
}

/** Mensagens tipadas da página. Fallback pt fora do provider. */
export function useMessages(): Messages {
  const v = useContext(Ctx);
  return v?.m ?? getMessages("pt");
}
