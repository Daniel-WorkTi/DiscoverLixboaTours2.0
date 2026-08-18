"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  localeFromPathname,
  withLocalePrefix,
  stripLocalePrefix,
  LOCALE_COOKIE,
  type AppLocale,
} from "@/lib/i18n/locale";

function persistPreference(locale: AppLocale) {
  try {
    localStorage.setItem("language", locale);
    document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=31536000;SameSite=Lax`;
  } catch {
    /* ignore */
  }
  document.documentElement.lang = locale === "en" ? "en" : "pt-PT";
  document.documentElement.setAttribute("data-lang", locale);
}

/**
 * Troca de idioma preservando a página atual (URL = fonte de verdade).
 */
export function LanguageSwitcher() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const current = localeFromPathname(pathname);

  function go(next: AppLocale) {
    if (next === current) return;
    persistPreference(next);
    const bare = stripLocalePrefix(pathname);
    const target = withLocalePrefix(bare, next);
    router.push(target);
  }

  return (
    <div className="language-selector">
      <button
        type="button"
        className={`language-flag flag-pt${current === "pt" ? " active" : ""}`}
        data-lang="pt"
        title="Português"
        aria-label="Português"
        aria-pressed={current === "pt"}
        onClick={() => go("pt")}
      />
      <button
        type="button"
        className={`language-flag flag-en${current === "en" ? " active" : ""}`}
        data-lang="en"
        title="English"
        aria-label="English"
        aria-pressed={current === "en"}
        onClick={() => go("en")}
      />
    </div>
  );
}
