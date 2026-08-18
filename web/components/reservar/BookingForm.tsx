"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  estimateFromTable,
  getMaxBookablePassengers,
  getMinBookablePassengers,
} from "@/lib/tour-pricing-table";
import { toursBooking } from "@/lib/tours-booking";
import { useLocale, useMessages } from "@/lib/i18n/LocaleProvider";
import type { Messages } from "@/messages";

const MAX_NAME_LEN = 120;
const MAX_PHONE_DIGITS = 15;
const MAX_NOTES_LEN = 500;

/** Se o servidor / Stripe não responder, o fetch não deve ficar “a carregar” para sempre. */
const CHECKOUT_FETCH_TIMEOUT_MS = 55_000;

/** Badge “Preço de grupo” só para tours comercialmente flat/grupo (não Aveiro/Monsanto exact-total). */
const GROUP_PRICE_TOUR_IDS = new Set([
  "sintra-cascais",
  "algarve",
  "porto",
  "lisboa",
  "fatima-tomar",
]);

/** Indicativo só com bandeira + código (sem nome do país por extenso). */
const PHONE_DIAL_OPTIONS = [
  { flag: "🇵🇹", dial: "+351" },
  { flag: "🇪🇸", dial: "+34" },
  { flag: "🇫🇷", dial: "+33" },
  { flag: "🇬🇧", dial: "+44" },
  { flag: "🇩🇪", dial: "+49" },
  { flag: "🇮🇹", dial: "+39" },
  { flag: "🇨🇭", dial: "+41" },
  { flag: "🇳🇱", dial: "+31" },
  { flag: "🇧🇪", dial: "+32" },
  { flag: "🇧🇷", dial: "+55" },
  { flag: "🇺🇸", dial: "+1" },
] as const;

function digitsOnly(s: string, max: number): string {
  return s.replace(/\D/g, "").slice(0, max);
}

function formatEurFromCents(cents: number): string {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    /** Evita 0,50 € aparecer como "1 €" (arredondamento com 0 casas). */
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

function defaultTourId(): string {
  return toursBooking[0]?.id ?? "";
}

function toYMD(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function startOfToday(): Date {
  const n = new Date();
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}

function parseYMD(s: string): Date | null {
  const p = s.split("-").map(Number);
  if (p.length !== 3 || !p[0] || !p[1] || !p[2]) return null;
  return new Date(p[0], p[1] - 1, p[2]);
}

function formatDateLong(ymd: string, locale: string): string {
  const d = parseYMD(ymd);
  if (!d) return "";
  return d.toLocaleDateString(locale, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatDateShort(ymd: string, locale: string): string {
  const d = parseYMD(ymd);
  if (!d) return "";
  return d.toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

type BookingFormProps = {
  initialTourId?: string;
};

type BookingErrKey =
  | "errPickDate"
  | "errInvalidResponse"
  | "errCheckoutDefault"
  | "errNoUrl"
  | "errTimeout"
  | "errNetwork";

type BookingFormError =
  | { kind: "i18n"; key: BookingErrKey }
  | { kind: "server"; message: string };

type TourMsgKey = keyof Messages["booking"]["tours"];

const TOUR_MSG_KEYS: Record<string, TourMsgKey> = {
  "sintra-cascais": "sintraCascais",
  "3-destinos": "threeDestinos",
  monsanto: "monsanto",
  "fatima-tomar": "fatimaTomar",
  lisboa: "lisboa",
  porto: "porto",
  arraabida: "arraabida",
  aveiro: "aveiro",
  alentejo: "alentejo",
  algarve: "algarve",
};

export function BookingForm({ initialTourId }: BookingFormProps) {
  const m = useMessages();
  const locale = useLocale();
  const titleId = useId();
  const tourPickerTitleId = useId();
  const [tourId, setTourId] = useState(() => {
    if (initialTourId && toursBooking.some((t) => t.id === initialTourId)) {
      return initialTourId;
    }
    return defaultTourId();
  });
  const [preferredDate, setPreferredDate] = useState("");
  const [quantity, setQuantity] = useState(() => {
    const id =
      initialTourId && toursBooking.some((t) => t.id === initialTourId)
        ? initialTourId
        : defaultTourId();
    return getMinBookablePassengers(id);
  });
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneDial, setPhoneDial] = useState("+351");
  const [phoneNational, setPhoneNational] = useState("");
  const [pickup, setPickup] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  /** Evita dois pedidos em paralelo (duplo clique antes do re-render com loading=true). */
  const checkoutInFlight = useRef(false);
  const [error, setError] = useState<BookingFormError | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [tourPickerOpen, setTourPickerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const today = useMemo(() => startOfToday(), []);

  const [viewYear, setViewYear] = useState(() => today.getFullYear());
  const [viewMonth, setViewMonth] = useState(() => today.getMonth());

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    if (preferredDate) {
      const p = preferredDate.split("-").map(Number);
      setViewYear(p[0]);
      setViewMonth(p[1] - 1);
    } else {
      setViewYear(today.getFullYear());
      setViewMonth(today.getMonth());
    }
  }, [modalOpen, preferredDate, today]);

  useEffect(() => {
    const locked = modalOpen || tourPickerOpen;
    document.body.style.overflow = locked ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (tourPickerOpen) setTourPickerOpen(false);
      else if (modalOpen) setModalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [modalOpen, tourPickerOpen]);

  const tourLabelFallback = toursBooking.find((t) => t.id === tourId)?.label ?? "";
  const tourMsgKey = TOUR_MSG_KEYS[tourId];
  const tourLabel = (tourMsgKey ? m.booking.tours[tourMsgKey] : null) ?? tourLabelFallback;
  function labelForTour(id: string): string {
    const key = TOUR_MSG_KEYS[id];
    return (key ? m.booking.tours[key] : null) ?? toursBooking.find((t) => t.id === id)?.label ?? id;
  }
  const maxTravelers = useMemo(() => getMaxBookablePassengers(tourId), [tourId]);
  const minTravelers = useMemo(() => getMinBookablePassengers(tourId), [tourId]);
  const estimate = useMemo(() => estimateFromTable(tourId, quantity), [tourId, quantity]);

  useEffect(() => {
    setQuantity((q) => Math.min(maxTravelers, Math.max(minTravelers, q)));
  }, [maxTravelers, minTravelers]);

  const dateLocale = locale === "en" ? "en-GB" : "pt-PT";

  const monthLabel = useMemo(() => {
    return new Date(viewYear, viewMonth, 1).toLocaleDateString(dateLocale, {
      month: "long",
      year: "numeric",
    });
  }, [viewYear, viewMonth, dateLocale]);

  const calendarCells = useMemo(() => {
    const first = new Date(viewYear, viewMonth, 1);
    const last = new Date(viewYear, viewMonth + 1, 0);
    const daysInMonth = last.getDate();
    const offset = (first.getDay() + 6) % 7;
    const cells: (number | null)[] = Array(offset).fill(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [viewYear, viewMonth]);

  const canPrevMonth = useMemo(() => {
    const cur = new Date(viewYear, viewMonth, 1);
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    return cur > start;
  }, [viewYear, viewMonth, today]);

  const canNextMonth = useMemo(() => {
    const cur = new Date(viewYear, viewMonth, 1);
    const max = new Date(today.getFullYear(), today.getMonth() + 12, 1);
    return cur < max;
  }, [viewYear, viewMonth, today]);

  function goPrevMonth() {
    if (!canPrevMonth) return;
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  }

  function goNextMonth() {
    if (!canNextMonth) return;
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  }

  function selectDay(day: number) {
    const cell = new Date(viewYear, viewMonth, day);
    if (cell < today) return;
    setPreferredDate(toYMD(cell));
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!preferredDate) {
      setError({ kind: "i18n", key: "errPickDate" });
      document.getElementById("br-booking-cal")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }
    if (checkoutInFlight.current) return;
    checkoutInFlight.current = true;
    setError(null);
    setLoading(true);
    const nat = digitsOnly(phoneNational, MAX_PHONE_DIGITS);
    const phone =
      nat.length > 0 ? `${phoneDial} ${nat}` : "";
    const pickupClean = pickup.trim().slice(0, 140);
    const notesClean = notes.trim().slice(0, MAX_NOTES_LEN);
    const combinedNotes = [
      pickupClean ? `Pickup / Ponto de encontro: ${pickupClean}` : null,
      notesClean ? `Preferências: ${notesClean}` : null,
    ]
      .filter(Boolean)
      .join("\n")
      .slice(0, MAX_NOTES_LEN);

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => {
      controller.abort();
    }, CHECKOUT_FETCH_TIMEOUT_MS);

    const apiCheckout =
      typeof window !== "undefined"
        ? new URL("/api/checkout", window.location.origin).href
        : "/api/checkout";

    try {
      const res = await fetch(apiCheckout, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        cache: "no-store",
        body: JSON.stringify({
          tourId,
          quantity,
          preferredDate,
          customerName: customerName.trim().slice(0, MAX_NAME_LEN),
          email: email.trim().slice(0, 254),
          phone,
          notes: combinedNotes,
        }),
      });
      const rawText = await res.text();
      let data: {
        url?: string;
        error?: string;
        code?: string;
        stripeCode?: string;
      };
      try {
        data = rawText
          ? (JSON.parse(rawText) as {
              url?: string;
              error?: string;
              code?: string;
              stripeCode?: string;
            })
          : {};
      } catch {
        setError({ kind: "i18n", key: "errInvalidResponse" });
        return;
      }
      if (!res.ok) {
        if (typeof console !== "undefined" && console.error) {
          console.error(
            "[checkout]",
            res.status,
            data.code ?? "",
            data.stripeCode ?? "",
            data.error ?? "",
          );
        }
        if (typeof data.error === "string" && data.error.trim()) {
          setError({ kind: "server", message: data.error.trim() });
        } else {
          setError({ kind: "i18n", key: "errCheckoutDefault" });
        }
        return;
      }
      const checkoutUrl = typeof data.url === "string" ? data.url.trim() : "";
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
        return;
      }
      if (typeof data.error === "string" && data.error.trim()) {
        setError({ kind: "server", message: data.error.trim() });
      } else {
        setError({ kind: "i18n", key: "errNoUrl" });
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        setError({ kind: "i18n", key: "errTimeout" });
      } else {
        setError({ kind: "i18n", key: "errNetwork" });
      }
    } finally {
      window.clearTimeout(timeoutId);
      checkoutInFlight.current = false;
      setLoading(false);
    }
  }

  const tourPicker =
    tourPickerOpen &&
    mounted &&
    createPortal(
      <div
        className="br-backdrop br-backdrop--tour"
        role="presentation"
        onClick={() => setTourPickerOpen(false)}
      >
        <div
          className="br-modal br-modal--tour"
          role="dialog"
          aria-modal="true"
          aria-labelledby={tourPickerTitleId}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="br-modal-header">
            <div>
              <h2 id={tourPickerTitleId} className="br-modal-title">
                {m.booking.modalDestino}
              </h2>
              <p className="br-modal-sub">
                {m.booking.modalChoose}
              </p>
            </div>
            <button
              type="button"
              className="br-close"
              aria-label="Fechar"
              onClick={() => setTourPickerOpen(false)}
            >
              ×
            </button>
          </div>
          <div className="br-tour-picker-body">
            {toursBooking.map((t) => (
              <button
                key={t.id}
                type="button"
                className={
                  t.id === tourId ? "br-tour-option is-selected" : "br-tour-option"
                }
                onClick={() => {
                  setTourId(t.id);
                  setTourPickerOpen(false);
                }}
              >
                <span className="br-tour-option__meta">
                  <span className="br-tour-option__label">
                    {labelForTour(t.id)}
                  </span>
                  {GROUP_PRICE_TOUR_IDS.has(t.id) ? (
                    <span className="br-tour-option__badge">
                      {m.common.priceGroupBadge}
                    </span>
                  ) : null}
                </span>
                {t.id === tourId ? (
                  <span className="br-tour-option__check" aria-hidden>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </div>
      </div>,
      document.body,
    );

  const modal = modalOpen && mounted && (
    createPortal(
      <div
        className="br-backdrop"
        role="presentation"
        onClick={() => setModalOpen(false)}
      >
        <div
          className="br-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="br-modal-header">
            <div>
              <h2 id={titleId} className="br-modal-title">
                {m.booking.modalTitle}
              </h2>
              <p className="br-modal-sub">
                {tourLabel}
              </p>
            </div>
            <button
              type="button"
              className="br-close"
              aria-label="Fechar"
              onClick={() => setModalOpen(false)}
            >
              ×
            </button>
          </div>

          <div className="br-modal-body">
            <div id="br-booking-cal">
              <p className="br-section-title">{m.booking.sectionDate}</p>
              <div className="br-cal-nav">
                <button
                  type="button"
                  onClick={goPrevMonth}
                  disabled={!canPrevMonth}
                  aria-label="Mês anterior"
                >
                  ‹
                </button>
                <span className="br-cal-month">{monthLabel}</span>
                <button
                  type="button"
                  onClick={goNextMonth}
                  disabled={!canNextMonth}
                  aria-label="Mês seguinte"
                >
                  ›
                </button>
              </div>
              <div className="br-cal-weekdays">
                {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((w) => (
                  <span key={w}>{w}</span>
                ))}
              </div>
              <div className="br-cal-grid">
                {calendarCells.map((day, i) => {
                  if (day === null) {
                    return <div key={`e-${i}`} className="br-cal-day outside" />;
                  }
                  const cellDate = new Date(viewYear, viewMonth, day);
                  const ymd = toYMD(cellDate);
                  const disabled = cellDate < today;
                  const selected = preferredDate === ymd;
                  const isToday = toYMD(cellDate) === toYMD(today);
                  return (
                    <button
                      key={ymd}
                      type="button"
                      className={[
                        "br-cal-day",
                        disabled ? "muted" : "",
                        selected ? "selected" : "",
                        isToday ? "today" : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      disabled={disabled}
                      onClick={() => selectDay(day)}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="br-travelers">
              <div>
                <div className="br-travelers-label">
                  {m.booking.travelers}
                </div>
                <div className="br-travelers-sub">
                  {m.booking.travelersHint}
                </div>
              </div>
              <div className="br-stepper" aria-label="Quantidade de pessoas">
                <button
                  type="button"
                  disabled={quantity <= minTravelers}
                  onClick={() => setQuantity((q) => Math.max(minTravelers, q - 1))}
                  aria-label="Menos uma pessoa"
                >
                  −
                </button>
                <span>{quantity}</span>
                <button
                  type="button"
                  disabled={quantity >= maxTravelers}
                  onClick={() => setQuantity((q) => Math.min(maxTravelers, q + 1))}
                  aria-label="Mais uma pessoa"
                >
                  +
                </button>
              </div>
            </div>

            <div className="br-total" aria-label="Total estimado">
              {estimate ? (
                <>
                  {estimate.kind === "per_person" ? (
                    <>
                      <div className="br-total__grid">
                        <div className="br-total__cell">
                          <div className="br-total__label">
                            {m.booking.perPerson}
                          </div>
                          <div className="br-total__value">
                            {formatEurFromCents(estimate.centsPerPerson)}
                          </div>
                        </div>
                        <div className="br-total__cell br-total__cell--right">
                          <div className="br-total__label">
                            {m.booking.total}
                          </div>
                          <div className="br-total__value">
                            {formatEurFromCents(estimate.totalCents)}
                          </div>
                        </div>
                      </div>
                      <div className="br-total__sub">
                        {m.booking.checkoutNote}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="br-total__badge">
                        {m.common.priceGroupBadge}
                      </div>
                      <div className="br-total__row">
                        <span className="br-total__label">
                          {m.booking.totalGroup}
                        </span>
                        <span className="br-total__value">
                          {formatEurFromCents(estimate.totalCents)}
                        </span>
                      </div>
                      <div className="br-total__sub">
                        {m.booking.checkoutNote}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className="br-total__row">
                    <span className="br-total__label">
                      {m.booking.total}
                    </span>
                    <span className="br-total__value">
                      {m.booking.totalTbd}
                    </span>
                  </div>
                </>
              )}
            </div>

            <form onSubmit={handleSubmit} className="br-fields">
              <div>
                <p className="br-section-title">
                  {m.booking.yourDetails}
                </p>
                <div className="br-row2">
                  <label className="br-label">
                    <span>{m.booking.fullName}</span>
                    <input
                      className="br-input"
                      value={customerName}
                      onChange={(e) =>
                        setCustomerName(e.target.value.slice(0, MAX_NAME_LEN))
                      }
                      autoComplete="name"
                      required
                      minLength={2}
                      maxLength={MAX_NAME_LEN}
                    />
                  </label>
                  <label className="br-label">
                    <span>{m.booking.phoneOpt}</span>
                    <div className="br-phone-row">
                      <select
                        className="br-input br-dial-select"
                        value={phoneDial}
                        onChange={(e) => setPhoneDial(e.target.value)}
                        aria-label="Indicativo"
                      >
                        {PHONE_DIAL_OPTIONS.map((o) => (
                          <option key={o.dial} value={o.dial}>
                            {o.flag} {o.dial}
                          </option>
                        ))}
                      </select>
                      <input
                        className="br-input br-phone-national"
                        type="tel"
                        inputMode="numeric"
                        value={phoneNational}
                        onChange={(e) =>
                          setPhoneNational(
                            digitsOnly(e.target.value, MAX_PHONE_DIGITS),
                          )
                        }
                        autoComplete="tel-national"
                        placeholder="912 345 678"
                        maxLength={MAX_PHONE_DIGITS}
                      />
                    </div>
                  </label>
                </div>
                <label className="br-label" style={{ marginTop: "0.65rem" }}>
                  <span>{m.booking.email}</span>
                  <input
                    className="br-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.slice(0, 254))}
                    autoComplete="email"
                    required
                    maxLength={254}
                  />
                </label>
                <label className="br-label" style={{ marginTop: "0.65rem" }}>
                  <span>{m.booking.pickup}</span>
                  <input
                    className="br-input"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value.slice(0, 140))}
                    placeholder={m.booking.pickupPh}
                    required
                    minLength={2}
                    maxLength={140}
                    autoComplete="street-address"
                  />
                </label>
                <label className="br-label" style={{ marginTop: "0.65rem" }}>
                  <span>{m.booking.notes}</span>
                  <textarea
                    className="br-input br-textarea"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value.slice(0, MAX_NOTES_LEN))}
                    placeholder={m.booking.notesPh}
                    maxLength={MAX_NOTES_LEN}
                  />
                  <span className="br-char-hint">
                    {notes.length}/{MAX_NOTES_LEN}
                  </span>
                </label>
              </div>

              {error ? (
                <p className="br-error">
                  {error.kind === "server" ? (
                    error.message
                  ) : (
                    <span>
                      {m.booking[error.key]}
                    </span>
                  )}
                </p>
              ) : null}

              <button
                type="submit"
                className="br-submit"
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? (
                  <span>
                    {m.booking.submitLoading}
                  </span>
                ) : (
                  <span>{m.booking.submit}</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>,
      document.body,
    )
  );

  return (
    <div className="br-wrap">
      <div className="br-sheet">
        <div className="br-layout">
          <div className="br-row-pick">
          <div
            className="br-card br-card--grow br-card--destino"
            role="region"
            aria-label="Destino do tour"
          >
            <span className="br-card-label">
              {m.booking.cardDestino}
            </span>
            <button
              type="button"
              className="br-pick-btn"
              onClick={() => setTourPickerOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={tourPickerOpen}
              aria-label={m.booking.ariaPickDestino}
            >
              <div className="br-pick-btn__text">
                <span className="br-pick-btn__value">
                  {tourLabel}
                </span>
              </div>
              <span className="br-pick-btn__chev" aria-hidden>
                ›
              </span>
            </button>
          </div>

          <div className="br-card br-card--grow">
            <span className="br-card-label">
              {m.booking.cardData}
            </span>
            <button
              type="button"
              className="br-pick-btn"
              onClick={() => setModalOpen(true)}
            >
              <div className="br-pick-btn__text">
                {preferredDate ? (
                  <span className="br-pick-btn__value">
                    {formatDateShort(preferredDate, dateLocale)}
                  </span>
                ) : (
                  <span
                    className="br-pick-btn__value br-pick-btn__value--muted"
                  >
                    {m.booking.pickDate}
                  </span>
                )}
              </div>
              <span className="br-pick-btn__chev" aria-hidden>
                ›
              </span>
            </button>
          </div>

          <div className="br-card br-card--grow">
            <span className="br-card-label">
              {m.booking.cardViajantes}
            </span>
            <button
              type="button"
              className="br-pick-btn"
              onClick={() => setModalOpen(true)}
            >
              <div className="br-pick-btn__text">
                <span className="br-pick-btn__value">
                  {quantity}{" "}
                  <span
                  >
                    <span>
                      {quantity === 1 ? m.booking.guestOne : m.booking.guestMany}
                    </span>
                  </span>
                </span>
              </div>
              <span className="br-pick-btn__chev" aria-hidden>
                ›
              </span>
            </button>
          </div>

          <div className="br-card br-card--cta">
            <button
              type="button"
              className="br-cta"
              onClick={() => setModalOpen(true)}
            >
              {preferredDate ? (
                <span>{m.booking.ctaReview}</span>
              ) : (
                <span>{m.booking.ctaChoose}</span>
              )}
            </button>
          </div>
          </div>
        </div>
      </div>

      <p className="br-hint">
        {preferredDate ? (
          <>
            <strong>{formatDateLong(preferredDate, dateLocale)}</strong>
            {" · "}
            {quantity}{" "}
            <span
            >
              {quantity === 1 ? m.booking.guestOne : m.booking.guestMany}
            </span>
            {" · "}
            <span>{tourLabel}</span>
          </>
        ) : (
          <span>
            {m.booking.hintLong}
          </span>
        )}
      </p>

      {tourPicker}
      {modal}
    </div>
  );
}
