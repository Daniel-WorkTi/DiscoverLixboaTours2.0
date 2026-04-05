"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Re-aplica o idioma guardado em localStorage após navegação client-side (Next.js App Router),
 * para que todos os `data-translate` voltem a ser atualizados.
 */
function applyStoredLanguage(): void {
  if (typeof window === "undefined") return;
  const lang = (localStorage.getItem("language") || "pt") as "pt" | "en";
  const w = window as Window & {
    setLanguage?: (l: string) => void;
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
  const pathname = usePathname();

  useEffect(() => {
    applyStoredLanguage();
  }, [pathname]);

  return null;
}
