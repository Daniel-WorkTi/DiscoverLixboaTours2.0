"use client";

import { createContext, useContext, useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "./types";
import { localeFromPathname } from "@/lib/i18n/locale";
import { getMessages, type Messages } from "@/messages";

const Ctx = createContext<{ locale: Locale; m: Messages } | null>(null);

export function LocaleProvider({
  locale: serverLocale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const pathname = usePathname() || "/";
  const [locale, setLocale] = useState<Locale>(serverLocale);

  // Com rewrite /en → /, o Flight RSC por vezes chega como PT enquanto a barra
  // do browser já está em /en. A URL do browser é a fonte de verdade no cliente.
  useLayoutEffect(() => {
    const fromUrl = localeFromPathname(window.location.pathname);
    setLocale(fromUrl);
  }, [pathname, serverLocale]);

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
