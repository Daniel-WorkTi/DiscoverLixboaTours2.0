"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Messages } from "@/messages";

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  lang: "pt" | "en";
  invalid?: boolean;
  labels: Pick<
    Messages["booking"],
    "pickupLocate" | "pickupSearching" | "pickupNoMatch" | "pickupLocateDenied" | "pickupSuggest"
  >;
};

export function PickupField({ label, value, onChange, placeholder, lang, invalid, labels }: Props) {
  const inputId = useId();
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [places, setPlaces] = useState<string[]>([]);
  const [active, setActive] = useState(0);
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const [locating, setLocating] = useState(false);
  const [locateError, setLocateError] = useState(false);
  const picked = useRef(false);

  useEffect(() => {
    if (picked.current) return;
    const q = value.trim();
    if (q.length < 3) {
      setPlaces([]);
      setSearched(false);
      setSearching(false);
      return;
    }
    const ctrl = new AbortController();
    const t = window.setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(
          `/api/places?q=${encodeURIComponent(q)}&lang=${lang}`,
          { signal: ctrl.signal },
        );
        const data = (await res.json()) as { places?: string[] };
        if (ctrl.signal.aborted) return;
        setPlaces(Array.isArray(data.places) ? data.places : []);
        setActive(0);
        setSearched(true);
        setOpen(true);
      } catch {
        if (!ctrl.signal.aborted) {
          setPlaces([]);
          setSearched(true);
        }
      } finally {
        if (!ctrl.signal.aborted) setSearching(false);
      }
    }, 280);
    return () => {
      ctrl.abort();
      window.clearTimeout(t);
    };
  }, [value, lang]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function choose(place: string) {
    picked.current = true;
    onChange(place.slice(0, 140));
    setOpen(false);
    setPlaces([]);
    setLocateError(false);
  }

  function locate() {
    setLocateError(false);
    if (!navigator.geolocation) {
      setLocateError(true);
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(
            `/api/places?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&lang=${lang}`,
          );
          const data = (await res.json()) as { places?: string[] };
          const first = data.places?.[0];
          if (first) choose(first);
          else setLocateError(true);
        } catch {
          setLocateError(true);
        } finally {
          setLocating(false);
        }
      },
      () => {
        setLocating(false);
        setLocateError(true);
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60_000 },
    );
  }

  const showList = open && (searching || places.length > 0 || searched);
  const status = searching
    ? labels.pickupSearching
    : places.length === 0 && searched
      ? labels.pickupNoMatch
      : null;

  return (
    <div className="br-label br-place" ref={rootRef}>
      <label htmlFor={inputId}>{label}</label>
      <div className="br-place__field">
      <div className="br-place__control">
      <input
        id={inputId}
        className="br-input"
        role="combobox"
        aria-expanded={showList}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={places[active] ? `${listId}-${active}` : undefined}
        value={value}
        placeholder={placeholder}
        minLength={2}
        maxLength={140}
        autoComplete="off"
        aria-invalid={invalid || undefined}
        onChange={(e) => {
          picked.current = false;
          setLocateError(false);
          onChange(e.target.value.slice(0, 140));
        }}
        onFocus={() => {
          if (places.length > 0) setOpen(true);
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setOpen(false);
            return;
          }
          if (!showList || places.length === 0) return;
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((i) => (i + 1) % places.length);
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((i) => (i - 1 + places.length) % places.length);
          } else if (e.key === "Enter" && open) {
            e.preventDefault();
            const place = places[active];
            if (place) choose(place);
          }
        }}
      />
      <button
        type="button"
        className="br-place__locate"
        onClick={locate}
        disabled={locating}
        aria-label={labels.pickupLocate}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="7.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M12 2.6v2.4M12 19v2.4M2.6 12h2.4M19 12h2.4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>
      </div>
      {showList ? (
        <ul className="br-place__list" id={listId} role="listbox" aria-label={labels.pickupSuggest}>
          {status ? (
            <li className="br-place__status" role="presentation">
              {status}
            </li>
          ) : null}
          {places.map((place, i) => (
            <li key={place} role="presentation">
              <button
                type="button"
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === active}
                className="br-place__opt"
                onMouseEnter={() => setActive(i)}
                onClick={() => choose(place)}
              >
                {place}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      </div>
      {locateError ? <span className="br-place__fail">{labels.pickupLocateDenied}</span> : null}
    </div>
  );
}
