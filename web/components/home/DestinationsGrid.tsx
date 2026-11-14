"use client";

import Image from "next/image";
import { useId, useMemo, useRef, useState } from "react";
import { useLocale, useMessages } from "@/lib/i18n/LocaleProvider";
import { withLocalePrefix } from "@/lib/i18n/locale";

export type DestinationCard = {
  href: string;
  img: string;
  alt: string;
  name: string;
  places: string;
  label: string;
  priceFrom: string;
  /** Unidade do preço mostrado no card da home. */
  priceUnit: "group" | "person";
  durationHours: number;
  /** Placeholder até avaliações reais. */
  ratingScore: string;
  ratingCount: number;
};

type Props = {
  destinations: readonly DestinationCard[];
};

export function DestinationsGrid({ destinations }: Props) {
  const locale = useLocale();
  const m = useMessages();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [expanded, setExpanded] = useState(false);
  const INITIAL_VISIBLE = 9;
  const inputId = useId();
  const listId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return destinations;
    return destinations.filter((d) => {
      const hay = `${d.name} ${d.places}`.toLowerCase();
      return hay.includes(s);
    });
  }, [destinations, q]);

  const suggestions = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return destinations.slice(0, 6);
    const scored = destinations
      .map((d) => {
        const hay = `${d.name} ${d.places}`.toLowerCase();
        const idx = hay.indexOf(s);
        return { d, idx };
      })
      .filter((x) => x.idx !== -1)
      .sort((a, b) => a.idx - b.idx)
      .slice(0, 6)
      .map((x) => x.d);
    return scored;
  }, [destinations, q]);

  function clear() {
    setQ("");
    setOpen(false);
    setActiveIndex(-1);
    inputRef.current?.focus();
  }

  function applySuggestion(text: string) {
    setQ(text);
    setOpen(false);
    setActiveIndex(-1);
    inputRef.current?.focus();
  }

  return (
    <div className="destinations-grid-wrap">
      <div className="destinations-search">
        <div className="destinations-search__field">
          <input
            ref={inputRef}
            id={inputId}
            className="destinations-search__input"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setOpen(true);
            }}
            placeholder={m.destinations.searchPlaceholder}
            inputMode="search"
            autoComplete="off"
            spellCheck={false}
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={open}
            aria-controls={listId}
            aria-activedescendant={
              open && activeIndex >= 0 ? `${listId}-opt-${activeIndex}` : undefined
            }
            aria-label={m.destinations.searchPlaceholder}
            onFocus={() => setOpen(true)}
            onBlur={(e) => {
              if (e.relatedTarget && (e.relatedTarget as HTMLElement).dataset.role === "search-option") {
                return;
              }
              setOpen(false);
              setActiveIndex(-1);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setOpen(false);
                setActiveIndex(-1);
                return;
              }
              if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
                setOpen(true);
                return;
              }
              if (!open) return;
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActiveIndex((i) => Math.max(i - 1, 0));
              } else if (e.key === "Enter") {
                if (activeIndex >= 0 && suggestions[activeIndex]) {
                  e.preventDefault();
                  applySuggestion(suggestions[activeIndex].name);
                }
              }
            }}
          />
          {q.trim() ? (
            <button
              type="button"
              className="destinations-search__clear"
              onClick={clear}
            >
              <span>{m.destinations.searchClear}</span>
            </button>
          ) : null}
          <span className="destinations-search__icon" aria-hidden>
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </div>

        <div className="destinations-search__meta" aria-live="polite">
          <span className="destinations-search__count">
            {filtered.length} <span>{m.destinations.searchResults}</span>
          </span>
        </div>

        {open ? (
          <div className="destinations-search__panel" role="presentation">
            <div id={listId} className="destinations-search__list" role="listbox" aria-label="Sugestões">
              {suggestions.length ? (
                suggestions.map((d, i) => (
                  <button
                    key={d.href}
                    type="button"
                    data-role="search-option"
                    className={`destinations-search__option ${i === activeIndex ? "is-active" : ""}`}
                    id={`${listId}-opt-${i}`}
                    role="option"
                    aria-selected={i === activeIndex}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => applySuggestion(d.name)}
                  >
                    <span className="destinations-search__option-title">{d.name}</span>
                    <span className="destinations-search__option-sub">{d.places}</span>
                  </button>
                ))
              ) : (
                <div className="destinations-search__empty">
                  <span>{m.destinations.searchNoResults}</span>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>

      <div className="destinations-grid" role="list">
        {(q.trim() || expanded
          ? filtered
          : filtered.slice(0, INITIAL_VISIBLE)
        ).map((d) => {
          const href = withLocalePrefix(d.href, locale);
          const unitLabel =
            d.priceUnit === "group"
              ? m.common.priceGroupUnit.replace(/^\/\s*/, "")
              : m.common.priceUnit.replace(/^\/\s*/, "");

          return (
            <article className="destination-card" key={d.href} role="listitem">
              <a href={href} className="destination-image-link" aria-label={d.name}>
                <div className="destination-image">
                  <Image
                    src={d.img}
                    alt={d.alt}
                    width={640}
                    height={420}
                    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  />
                </div>
              </a>

              <div className="destination-body">
                <h3 className="destination-name">
                  <a href={href}>{d.name}</a>
                </h3>

                <p className="destination-rating">
                  <span className="destination-rating__stars" aria-hidden>
                    {[0, 1, 2].map((i) => (
                      <svg key={i} className="destination-rating__star" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M12 2.5l2.9 6.1 6.7.7-5 4.6 1.4 6.6L12 17.8 5.9 20.5 7.3 14 2.4 9.3l6.7-.7L12 2.5z"
                        />
                      </svg>
                    ))}
                  </span>
                  <span className="destination-rating__score">{d.ratingScore}</span>
                  <span className="destination-rating__reviews">
                    {m.destinations.ratingReviews(d.ratingCount)}
                  </span>
                </p>

                <div className="destination-footer">
                  <p className="destination-price">
                    <span className="destination-price__amount">{d.priceFrom}</span>
                    <span className="destination-price__meta">
                      {" "}
                      / {m.destinations.durationLabel(d.durationHours)} · {unitLabel}
                    </span>
                  </p>
                  <a href={href} className="destination-book">
                    {m.nav.book}
                    <span aria-hidden>→</span>
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {!q.trim() && filtered.length > INITIAL_VISIBLE ? (
        <div className="destinations-more">
          <button
            type="button"
            className="destinations-more__btn"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
          >
            {expanded ? m.destinations.showLess : m.destinations.showMore}
          </button>
        </div>
      ) : null}
    </div>
  );
}
