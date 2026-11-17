"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  withLocalePrefix,
  stripLocalePrefix,
  LOCALE_COOKIE,
  type AppLocale,
} from "@/lib/i18n/locale";
import { useLocale } from "@/lib/i18n/LocaleProvider";

const OPTIONS: { locale: AppLocale; short: string; label: string }[] = [
  { locale: "pt", short: "PT", label: "Português" },
  { locale: "en", short: "EN", label: "English" },
];

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
 * Troca de idioma: texto atual + menu simples ao clicar.
 */
export function LanguageSwitcher() {
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();
  const router = useRouter();
  const current = useLocale();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const active = OPTIONS.find((o) => o.locale === current) ?? OPTIONS[0];

  function go(next: AppLocale) {
    setOpen(false);
    if (next === current) return;
    persistPreference(next);
    const urlPath =
      typeof window !== "undefined" ? window.location.pathname : pathname;
    const bare = stripLocalePrefix(urlPath);
    const qs = searchParams?.toString();
    const withQuery = qs ? `${bare}?${qs}` : bare;
    const target = withLocalePrefix(withQuery, next);
    // Soft push + refresh deixa o header em PT com rewrite /en→/.
    // Navegação completa garante middleware + layout no idioma certo.
    if (typeof window !== "undefined") {
      window.location.assign(target);
      return;
    }
    router.push(target);
    router.refresh();
  }

  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      className={`language-selector${open ? " language-selector--open" : ""}`}
      ref={rootRef}
    >
      <button
        type="button"
        className="language-selector__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{active.short}</span>
        <svg viewBox="0 0 12 12" aria-hidden className="language-selector__chevron">
          <path
            d="M3 4.5 L6 7.5 L9 4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open ? (
        <ul
          id={listId}
          className="language-selector__menu"
          role="listbox"
          aria-label={current === "en" ? "Language" : "Idioma"}
        >
          {OPTIONS.map((option) => (
            <li key={option.locale} role="presentation">
              <button
                type="button"
                role="option"
                aria-selected={option.locale === current}
                className={
                  option.locale === current
                    ? "language-selector__option language-selector__option--active"
                    : "language-selector__option"
                }
                onClick={() => go(option.locale)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
