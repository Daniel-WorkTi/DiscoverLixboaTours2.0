"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import {
  estimateFromTable,
  getMaxBookablePassengers,
  getMinBookablePassengers,
} from "@/lib/tour-pricing-table";
import { toursBooking } from "@/lib/tours-booking";
import { PaymentBadges } from "@/components/reservar/PaymentBadges";
import { PickupField } from "@/components/reservar/PickupField";
import { useLocale, useMessages } from "@/lib/i18n/LocaleProvider";
import { withLocalePrefix } from "@/lib/i18n/locale";
import type { Messages } from "@/messages";

const MAX_NAME_LEN = 120;
const MAX_PHONE_DIGITS = 15;
const MAX_NOTES_LEN = 500;

/** Se o servidor / Stripe não responder, o fetch não deve ficar “a carregar” para sempre. */
const CHECKOUT_FETCH_TIMEOUT_MS = 55_000;

/** Jeep só nestes três. Os outros tours vão na van Mercedes. */
const JEEP_TOUR_IDS = new Set(["lisboa", "sintra-cascais", "arraabida"]);

/** Badge “Preço de grupo” só para tours comercialmente flat/grupo (não Aveiro/Monsanto exact-total). */
const GROUP_PRICE_TOUR_IDS = new Set([
  "sintra-cascais",
  "algarve",
  "porto",
  "lisboa",
  "fatima-tomar",
]);

/** Indicativo só com o número, sem bandeira. */
const PHONE_DIAL_OPTIONS = [
  "+351",
  "+34",
  "+33",
  "+44",
  "+49",
  "+39",
  "+41",
  "+31",
  "+32",
  "+55",
  "+1",
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
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

type BookingFormProps = {
  initialTourId?: string;
};

type BookingErrKey =
  | "errPickDate"
  | "errPickup"
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
  const [pickupTime, setPickupTime] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  /** Evita dois pedidos em paralelo (duplo clique antes do re-render com loading=true). */
  const checkoutInFlight = useRef(false);
  const [error, setError] = useState<BookingFormError | null>(null);
  const [tourPickerOpen, setTourPickerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const today = useMemo(() => startOfToday(), []);

  const [viewYear, setViewYear] = useState(() => today.getFullYear());
  const [viewMonth, setViewMonth] = useState(() => today.getMonth());

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = tourPickerOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && tourPickerOpen) setTourPickerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [tourPickerOpen]);

  const tourLocked =
    Boolean(initialTourId) && toursBooking.some((t) => t.id === initialTourId);
  const tourLabelFallback = toursBooking.find((t) => t.id === tourId)?.label ?? "";
  const tourMsgKey = TOUR_MSG_KEYS[tourId];
  const tourLabel = (tourMsgKey ? m.booking.tours[tourMsgKey] : null) ?? tourLabelFallback;
  const vehicleLabel = JEEP_TOUR_IDS.has(tourId) ? m.booking.vehicleJeep : m.booking.vehicleVan;
  function labelForTour(id: string): string {
    const key = TOUR_MSG_KEYS[id];
    return (key ? m.booking.tours[key] : null) ?? toursBooking.find((t) => t.id === id)?.label ?? id;
  }
  const maxTravelers = useMemo(() => getMaxBookablePassengers(tourId), [tourId]);
  const minTravelers = useMemo(() => getMinBookablePassengers(tourId), [tourId]);
  const estimate = useMemo(() => estimateFromTable(tourId, quantity), [tourId, quantity]);
  const totalLabel = estimate ? formatEurFromCents(estimate.totalCents) : null;

  useEffect(() => {
    setQuantity((q) => Math.min(maxTravelers, Math.max(minTravelers, q)));
  }, [maxTravelers, minTravelers]);

  const dateLocale = locale === "en" ? "en-GB" : "pt-PT";

  const monthLabel = useMemo(() => {
    const raw = new Date(viewYear, viewMonth, 1).toLocaleDateString(dateLocale, {
      month: "long",
      year: "numeric",
    });
    return raw.charAt(0).toUpperCase() + raw.slice(1);
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
    if (pickup.trim().length < 2 || !pickupTime) {
      setError({ kind: "i18n", key: "errPickup" });
      document.getElementById("br-trip-details")?.scrollIntoView({
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
    const timeClean = pickupTime.trim();
    const notesClean = notes.trim().slice(0, MAX_NOTES_LEN);
    const combinedNotes = [
      pickupClean
        ? `${locale === "en" ? "Pickup / meeting point" : "Pickup / ponto de encontro"}: ${pickupClean}`
        : null,
      timeClean
        ? `${locale === "en" ? "Pickup time" : "Horário de pickup"}: ${timeClean}`
        : null,
      notesClean
        ? `${locale === "en" ? "Preferences" : "Preferências"}: ${notesClean}`
        : null,
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
              aria-label={m.booking.close}
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

  return (
    <div className="br-wrap">
      <form className="br-book" onSubmit={handleSubmit}>
        <div className="br-book__main">
          <section className="br-panel br-panel--tour" aria-label={m.booking.tourDestination}>
            <span className="br-card-label">{m.booking.cardDestino}</span>
            {tourLocked ? (
              <p className="br-tour-fixed">{tourLabel}</p>
            ) : (
              <button
                type="button"
                className="br-pick-btn"
                onClick={() => setTourPickerOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={tourPickerOpen}
                aria-label={m.booking.ariaPickDestino}
              >
                <div className="br-pick-btn__text">
                  <span className="br-pick-btn__value">{tourLabel}</span>
                </div>
                <span className="br-pick-btn__chev" aria-hidden>
                  ›
                </span>
              </button>
            )}
            <p className="br-vehicle">{vehicleLabel}</p>
          </section>

          <section className="br-panel br-panel--cal" id="br-booking-cal" aria-label={m.booking.cardData}>
            <span className="br-card-label">{m.booking.cardData}</span>
            <div className="br-cal-nav">
              <button
                type="button"
                onClick={goPrevMonth}
                disabled={!canPrevMonth}
                aria-label={m.booking.prevMonth}
              >
                ‹
              </button>
              <span className="br-cal-month">{monthLabel}</span>
              <button
                type="button"
                onClick={goNextMonth}
                disabled={!canNextMonth}
                aria-label={m.booking.nextMonth}
              >
                ›
              </button>
            </div>
            <div className="br-cal-weekdays">
              {m.booking.weekdays.map((w) => (
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
                const isToday = ymd === toYMD(today);
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
            {preferredDate ? (
              <p className="br-cal-picked">
                <strong>{formatDateLong(preferredDate, dateLocale)}</strong>
              </p>
            ) : null}

            <div className="br-qty" aria-label={m.booking.travelers}>
              <div className="br-qty__row">
                <span className="br-qty__people">
                  {quantity === 1 ? m.booking.guestOne : m.booking.guestMany}
                </span>
                <div className="br-qty__end">
                  <div className="br-stepper" aria-label={m.booking.guestsStepper}>
                    <button
                      type="button"
                      disabled={quantity <= minTravelers}
                      onClick={() => setQuantity((q) => Math.max(minTravelers, q - 1))}
                      aria-label={m.booking.lessGuest}
                    >
                      −
                    </button>
                    <span>{quantity}</span>
                    <button
                      type="button"
                      disabled={quantity >= maxTravelers}
                      onClick={() => setQuantity((q) => Math.min(maxTravelers, q + 1))}
                      aria-label={m.booking.moreGuest}
                    >
                      +
                    </button>
                  </div>
                  <strong className="br-qty__price">{totalLabel ?? m.booking.totalTbd}</strong>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="br-book__side">
          <section className="br-panel" id="br-trip-details" aria-label={m.booking.tripTitle}>
            <span className="br-card-label">{m.booking.tripTitle}</span>
            <div className="br-fields">
              <PickupField
                label={m.booking.pickup}
                value={pickup}
                onChange={(next) => {
                  setPickup(next);
                  if (error?.kind === "i18n" && error.key === "errPickup") setError(null);
                }}
                placeholder={m.booking.pickupPh}
                lang={locale === "en" ? "en" : "pt"}
                invalid={error?.kind === "i18n" && error.key === "errPickup" && pickup.trim().length < 2}
                labels={m.booking}
              />
              <label className="br-label">
                <span>{m.booking.pickupTime}</span>
                <input
                  className="br-input br-time-input"
                  type="time"
                  value={pickupTime}
                  onChange={(e) => {
                    setPickupTime(e.target.value);
                    if (error?.kind === "i18n" && error.key === "errPickup") setError(null);
                  }}
                  step={900}
                  aria-invalid={error?.kind === "i18n" && error.key === "errPickup" && !pickupTime}
                  aria-describedby="br-pickup-time-note"
                />
                <span className="br-field-note" id="br-pickup-time-note">
                  {m.booking.pickupTimeNote}
                </span>
              </label>
              <label className="br-label">
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
          </section>

          <section className="br-panel" aria-label={m.booking.yourDetails}>
            <span className="br-card-label">{m.booking.yourDetails}</span>
            <div className="br-fields">
              <label className="br-label">
                <span>{m.booking.fullName}</span>
                <input
                  className="br-input"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value.slice(0, MAX_NAME_LEN))}
                  autoComplete="name"
                  required
                  minLength={2}
                  maxLength={MAX_NAME_LEN}
                />
              </label>
              <label className="br-label">
                <span>{m.booking.email}</span>
                <input
                  className="br-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.slice(0, 254))}
                  autoComplete="email"
                  placeholder={m.booking.emailPh}
                  required
                  maxLength={254}
                />
              </label>
              <label className="br-label">
                <span>{m.booking.phoneOpt}</span>
                <div className="br-phone-row">
                  <select
                    className="br-input br-dial-select"
                    value={phoneDial}
                    onChange={(e) => setPhoneDial(e.target.value)}
                    aria-label={m.booking.dialCode}
                  >
                    {PHONE_DIAL_OPTIONS.map((dial) => (
                      <option key={dial} value={dial}>
                        {dial}
                      </option>
                    ))}
                  </select>
                  <input
                    className="br-input br-phone-national"
                    type="tel"
                    inputMode="numeric"
                    value={phoneNational}
                    onChange={(e) =>
                      setPhoneNational(digitsOnly(e.target.value, MAX_PHONE_DIGITS))
                    }
                    autoComplete="tel-national"
                    placeholder="912 345 678"
                    maxLength={MAX_PHONE_DIGITS}
                  />
                </div>
              </label>
            </div>
          </section>

          {error ? (
            <p className="br-error" id="br-form-error" role="alert">
              {error.kind === "server" ? error.message : m.booking[error.key]}
            </p>
          ) : null}
        </div>

        <div className="br-book__pay">
          <div
            className="br-summary"
            aria-live="polite"
            aria-atomic="true"
            aria-label={m.booking.summaryTitle}
          >
            <p className="br-summary__title">{m.booking.summaryTitle}</p>
            <div>
              <p className="br-summary__eyebrow">{m.booking.summaryTour}</p>
              <p className="br-summary__tour">{tourLabel}</p>
              <p className="br-summary__vehicle">{vehicleLabel}</p>
            </div>
            <dl className="br-summary__meta">
              <div>
                <dt>{m.booking.summaryDate}</dt>
                <dd className={preferredDate ? undefined : "is-empty"}>
                  {preferredDate ? formatDateShort(preferredDate, dateLocale) : m.booking.summaryDateEmpty}
                </dd>
              </div>
              <div>
                <dt>{m.booking.summaryGuests}</dt>
                <dd>{quantity}</dd>
              </div>
              <div>
                <dt>{m.booking.summaryTime}</dt>
                <dd className={pickupTime ? undefined : "is-empty"}>
                  {pickupTime || m.booking.summaryTimeEmpty}
                </dd>
              </div>
            </dl>
            <div className="br-summary__total">
              <span>{m.booking.totalGroup}</span>
              <strong key={`${tourId}-${quantity}-${totalLabel ?? "tbd"}`}>
                {totalLabel ?? m.booking.totalTbd}
              </strong>
            </div>
            {estimate?.kind === "per_person" ? (
              <p className="br-summary__pp">
                {formatEurFromCents(estimate.centsPerPerson)} {m.booking.perPerson.toLowerCase()}
              </p>
            ) : null}
          </div>

          <div className="br-book__checkout">
          <button type="submit" className="br-submit" disabled={loading} aria-busy={loading}>
            {loading ? m.booking.submitLoading : m.booking.submit}
          </button>
          <PaymentBadges
            portugalLabel={m.booking.payPortugal}
            internationalLabel={m.booking.payInternational}
          />
          <p className="br-legal">
            {m.booking.legalBefore}{" "}
            <Link href={withLocalePrefix("/termos", locale)}>{m.booking.termsLink}</Link>{" "}
            {m.booking.legalMid}{" "}
            <Link href={`${withLocalePrefix("/termos", locale)}#cancelamento`}>
              {m.booking.cancelLink}
            </Link>.
          </p>
          </div>
        </div>
      </form>
      {tourLocked ? null : tourPicker}
    </div>
  );
}
