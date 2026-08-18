"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { localeFromPathname } from "@/lib/i18n/locale";

/**
 * Re-aplica o idioma após navegação App Router.
 * Prioridade: prefixo /en na URL → localStorage → pt.
 */
function applyLanguageForPath(pathname: string): void {
  if (typeof window === "undefined") return;
  const fromPath = localeFromPathname(pathname);
  const stored = (localStorage.getItem("language") || "").toLowerCase();
  const lang =
    fromPath === "en"
      ? "en"
      : stored === "en" || stored === "pt"
        ? stored
        : "pt";

  const w = window as Window & {
    setLanguage?: (l: string, opts?: { navigate?: boolean }) => void;
  };
  if (typeof w.setLanguage === "function") {
    w.setLanguage(lang);
    return;
  }
  let tries = 0;
  const id = window.setInterval(() => {
    tries += 1;
    if (typeof w.setLanguage === "function") {
      w.setLanguage(lang);
      window.clearInterval(id);
    } else if (tries > 40) {
      window.clearInterval(id);
    }
  }, 50);
}

export function TranslateBridge() {
  const pathname = usePathname() || "/";

  useEffect(() => {
    applyLanguageForPath(pathname);
  }, [pathname]);

  return null;
}
