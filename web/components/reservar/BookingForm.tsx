"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import {
  estimateFromTable,
  getMaxBookablePassengers,
  getMinBookablePassengers,
} from "@/lib/tour-pricing-table";
import { toursBooking } from "@/lib/tours-booking";
import {
  defaultPickupZone,
  formatTransportNotes,
  isSintraCascaisTour,
  pickupZonesForTour,
  resolveTransportPolicy,
  type TransportSummaryKey,
  type TransportZone,
} from "@/lib/transport-rules";
import { getMigratedTour } from "@/content/tours";
import { PaymentBadges } from "@/components/reservar/PaymentBadges";
import { PickupField } from "@/components/reservar/PickupField";
import { useLocale, useMessages } from "@/lib/i18n/LocaleProvider";
import { withLocalePrefix } from "@/lib/i18n/locale";
import {
  canChooseVehicle as tourAllowsVehicleChoice,
  isJeepTour,
  type BookingVehicle,
} from "@/lib/vehicle-capacity";
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

/** Linha curta de locais no cartão do tour (checkout). */
const TOUR_PLACE_LINE: Record<string, string> = {
  "sintra-cascais": "Sintra · Cascais · Azenhas do Mar",
  lisboa: "Lisboa · Belém · Alfama",
  "fatima-tomar": "Fátima · Tomar · Batalha",
  "3-destinos": "Fátima · Nazaré · Óbidos",
  porto: "Porto · Gaia · Douro",
  arraabida: "Arrábida · Setúbal · Sesimbra",
  aveiro: "Aveiro · Costa Nova",
  alentejo: "Alentejo · Évora · Vinhos",
  algarve: "Algarve · Lagos · Sagres",
  monsanto: "Monsanto · Centro de Portugal",
};

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
  const [pickupZone, setPickupZone] = useState<TransportZone>(() => {
    const id =
      initialTourId && toursBooking.some((t) => t.id === initialTourId)
        ? initialTourId
        : defaultTourId();
    return defaultPickupZone(id);
  });
  const [dropOffLisbonHotel, setDropOffLisbonHotel] = useState(false);
  const [vehicleChoice, setVehicleChoice] = useState<BookingVehicle>("jeep");
  const [pickupTime, setPickupTime] = useState("");
  const [notes, setNotes] = useState("");
  const [notesOpen, setNotesOpen] = useState(false);
  const [pickupResolved, setPickupResolved] = useState(false);
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
  const canChooseVehicle = tourAllowsVehicleChoice(tourId);
  const resolvedVehicle: BookingVehicle = canChooseVehicle
    ? vehicleChoice
    : isJeepTour(tourId)
      ? "jeep"
      : "van";
  const vehicleLabel =
    resolvedVehicle === "jeep" ? m.booking.vehicleJeep : m.booking.vehicleVan;
  const tourDef = getMigratedTour(tourId);
  const tourHero = tourDef?.heroImage ?? null;
  const tourHighlights = useMemo(() => {
    if (TOUR_PLACE_LINE[tourId]) return TOUR_PLACE_LINE[tourId];
    const content = tourDef?.content[locale];
    const badges = (content?.itinerary ?? [])
      .map((stop) => stop.badge?.trim())
      .filter((b): b is string => Boolean(b));
    return [...new Set(badges)].slice(0, 3).join(" · ");
  }, [tourDef, locale, tourId]);
  const maxTravelers = useMemo(
    () => getMaxBookablePassengers(tourId, resolvedVehicle),
    [tourId, resolvedVehicle],
  );
  const capacityLabel = m.booking.vehicleCapacity.replace(
    "{n}",
    String(maxTravelers),
  );
  const vehicleBadge = `${vehicleLabel} (${capacityLabel})`;
  function labelForTour(id: string): string {
    const key = TOUR_MSG_KEYS[id];
    return (key ? m.booking.tours[key] : null) ?? toursBooking.find((t) => t.id === id)?.label ?? id;
  }
  const minTravelers = useMemo(() => getMinBookablePassengers(tourId), [tourId]);
  const estimate = useMemo(() => estimateFromTable(tourId, quantity), [tourId, quantity]);
  const totalLabel = estimate ? formatEurFromCents(estimate.totalCents) : null;
  const sintraTour = isSintraCascaisTour(tourId);
  /** Zona efetiva: no Sintra usa o chip; nos outros tours a recolha é sempre incluída. */
  const effectivePickupZone: TransportZone = sintraTour
    ? pickupZone
    : defaultPickupZone(tourId);
  const transportPolicy = useMemo(
    () =>
      resolveTransportPolicy(tourId, {
        pickupZone: effectivePickupZone,
        dropOffLisbonHotel: sintraTour ? dropOffLisbonHotel : false,
      }),
    [tourId, effectivePickupZone, dropOffLisbonHotel, sintraTour],
  );

  useEffect(() => {
    setQuantity((q) => Math.min(maxTravelers, Math.max(minTravelers, q)));
  }, [maxTravelers, minTravelers]);

  useEffect(() => {
    const allowed = pickupZonesForTour(tourId);
    if (!allowed.includes(pickupZone)) {
      setPickupZone(defaultPickupZone(tourId));
    }
    if (!isSintraCascaisTour(tourId)) {
      setDropOffLisbonHotel(false);
    }
    if (tourAllowsVehicleChoice(tourId)) {
      setVehicleChoice((v) => v);
    } else if (isJeepTour(tourId)) {
      setVehicleChoice("jeep");
    } else {
      setVehicleChoice("van");
    }
  }, [tourId, pickupZone]);

  useEffect(() => {
    setPickup("");
    setPickupResolved(false);
    setPickupZone(defaultPickupZone(tourId));
  }, [tourId]);

  function transportSummaryLabel(key: TransportSummaryKey): string {
    return m.booking[key];
  }

  function pickupStatusCopy(): { text: string; tone: "ok" | "quote" | "muted" } {
    if (pickup.trim().length < 2 && !dropOffLisbonHotel) {
      return { text: "", tone: "muted" };
    }
    if (transportPolicy.summaryKey === "pickupIncluded") {
      return { text: m.booking.pickupIncluded, tone: "ok" };
    }
    if (transportPolicy.summaryKey === "pickupFree") {
      return { text: m.booking.pickupFree, tone: "ok" };
    }
    if (transportPolicy.summaryKey === "pickupOnRequest") {
      return { text: m.booking.pickupOnRequest, tone: "quote" };
    }
    if (transportPolicy.summaryKey === "dropOffOnRequest") {
      return { text: m.booking.dropOffOnRequest, tone: "quote" };
    }
    return { text: m.booking.pickupOutside, tone: "quote" };
  }

  const pickupStatus = pickupStatusCopy();
  const summaryPickupLabel =
    transportPolicy.summaryKey === "pickupIncluded"
      ? m.booking.pickupIncluded
      : transportPolicy.summaryKey === "pickupFree"
        ? m.booking.pickupFree
        : transportSummaryLabel(transportPolicy.summaryKey);

  const dateLocale =
    locale === "en" ? "en-GB" : locale === "es" ? "es-ES" : "pt-PT";

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
    const zoneForCheckout = sintraTour ? pickupZone : defaultPickupZone(tourId);
    const transportLines = formatTransportNotes(
      tourId,
      {
        pickupZone: zoneForCheckout,
        dropOffLisbonHotel: sintraTour ? dropOffLisbonHotel : false,
      },
      locale,
    );
    const vehicleNote =
      locale === "en"
        ? `Vehicle: ${resolvedVehicle === "jeep" ? "Open-top UMM Alter II jeep" : "Mercedes-Benz Vito 116 CDI Select van"}`
        : locale === "es"
          ? `Vehículo: ${resolvedVehicle === "jeep" ? "Jeep UMM Alter II descapotable" : "Van Mercedes-Benz Vito 116 CDI Select"}`
          : `Veículo: ${resolvedVehicle === "jeep" ? "Jeep UMM Alter II conversível" : "Van Mercedes-Benz Vito 116 CDI Select"}`;
    const combinedNotes = [
      vehicleNote,
      ...transportLines,
      pickupClean
        ? `${
            locale === "en"
              ? "Pickup / meeting point"
              : locale === "es"
                ? "Recogida / punto de encuentro"
                : "Pickup / ponto de encontro"
          }: ${pickupClean}`
        : null,
      timeClean
        ? `${
            locale === "en"
              ? "Pickup time"
              : locale === "es"
                ? "Horario de recogida"
                : "Horário de pickup"
          }: ${timeClean}`
        : null,
      notesClean
        ? `${
            locale === "en"
              ? "Preferences"
              : locale === "es"
                ? "Preferencias"
                : "Preferências"
          }: ${notesClean}`
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
          pickupZone: zoneForCheckout,
          dropOffLisbonHotel: sintraTour ? dropOffLisbonHotel : false,
          vehicle: resolvedVehicle,
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
            <div className="br-tour-card">
              <div className="br-tour-card__top">
                {tourHero ? (
                  <Image
                    className="br-tour-card__img"
                    src={tourHero}
                    alt=""
                    width={112}
                    height={96}
                  />
                ) : (
                  <div className="br-tour-card__img br-tour-card__img--empty" aria-hidden />
                )}
                <div className="br-tour-card__body">
                  {tourLocked ? (
                    <p className="br-tour-card__title">{tourLabel}</p>
                  ) : (
                    <button
                      type="button"
                      className="br-tour-card__pick"
                      onClick={() => setTourPickerOpen(true)}
                      aria-haspopup="dialog"
                      aria-expanded={tourPickerOpen}
                      aria-label={m.booking.ariaPickDestino}
                    >
                      <span className="br-tour-card__title">{tourLabel}</span>
                      <span className="br-tour-card__chev" aria-hidden>
                        ›
                      </span>
                    </button>
                  )}
                  <p className="br-tour-card__type">{m.booking.privateTourDay}</p>
                  {tourHighlights ? (
                    <p className="br-tour-card__places">
                      <span className="br-tour-card__pin" aria-hidden>
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none">
                          <path
                            d="M12 21s6.5-4.8 6.5-10a6.5 6.5 0 1 0-13 0c0 5.2 6.5 10 6.5 10Z"
                            stroke="currentColor"
                            strokeWidth="1.7"
                          />
                          <circle cx="12" cy="11" r="2.1" stroke="currentColor" strokeWidth="1.7" />
                        </svg>
                      </span>
                      {tourHighlights}
                    </p>
                  ) : null}
                  {!canChooseVehicle ? (
                    <span className="br-vehicle-badge">{vehicleBadge}</span>
                  ) : null}
                </div>
              </div>

              {canChooseVehicle ? (
                <div className="br-vehicle-pick">
                  <p className="br-vehicle-pick__title">{m.booking.vehicleChoice}</p>
                  <div
                    className="br-vehicle-pick__row"
                    role="radiogroup"
                    aria-label={m.booking.vehicleChoice}
                  >
                    <label
                      className={`br-vehicle-card${resolvedVehicle === "jeep" ? " is-active" : ""}`}
                    >
                      <input
                        type="radio"
                        name="br-vehicle"
                        value="jeep"
                        checked={vehicleChoice === "jeep"}
                        onChange={() => setVehicleChoice("jeep")}
                      />
                      <span className="br-vehicle-card__icon" aria-hidden>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                          <path
                            d="M4 14.5h16l-1.2-4.2A2 2 0 0 0 16.9 9H7.1a2 2 0 0 0-1.9 1.3L4 14.5Z"
                            stroke="currentColor"
                            strokeWidth="1.6"
                          />
                          <path
                            d="M6.2 17.2a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6ZM17.8 17.2a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6Z"
                            stroke="currentColor"
                            strokeWidth="1.6"
                          />
                          <path d="M4 14.5h16" stroke="currentColor" strokeWidth="1.6" />
                        </svg>
                      </span>
                      <span className="br-vehicle-card__text">
                        <span className="br-vehicle-card__name">{m.booking.vehicleJeepName}</span>
                        <span className="br-vehicle-card__desc">{m.booking.vehicleJeepDesc}</span>
                      </span>
                      <span className="br-vehicle-card__radio" aria-hidden />
                    </label>
                    <label
                      className={`br-vehicle-card${resolvedVehicle === "van" ? " is-active" : ""}`}
                    >
                      <input
                        type="radio"
                        name="br-vehicle"
                        value="van"
                        checked={vehicleChoice === "van"}
                        onChange={() => setVehicleChoice("van")}
                      />
                      <span className="br-vehicle-card__icon" aria-hidden>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                          <path
                            d="M3.5 15.5h17V11l-1.4-3.6A2 2 0 0 0 17.2 6H8.3a2 2 0 0 0-1.8 1.1L5 11v4.5Z"
                            stroke="currentColor"
                            strokeWidth="1.6"
                          />
                          <path
                            d="M6.2 17.5a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6ZM17.8 17.5a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6Z"
                            stroke="currentColor"
                            strokeWidth="1.6"
                          />
                          <path d="M3.5 12.2h17" stroke="currentColor" strokeWidth="1.6" />
                        </svg>
                      </span>
                      <span className="br-vehicle-card__text">
                        <span className="br-vehicle-card__name">{m.booking.vehicleVanName}</span>
                        <span className="br-vehicle-card__desc">{m.booking.vehicleVanDesc}</span>
                      </span>
                      <span className="br-vehicle-card__radio" aria-hidden />
                    </label>
                  </div>
                </div>
              ) : null}
            </div>
          </section>

          <section
            className="br-panel br-panel--cal"
            id="br-booking-cal"
            aria-label={m.booking.cardData}
          >
            <div className="br-panel__head">
              <span className="br-panel__head-icon" aria-hidden>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                  <rect
                    x="3.5"
                    y="5"
                    width="17"
                    height="15"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <path d="M8 3.5V7M16 3.5V7M3.5 10h17" stroke="currentColor" strokeWidth="1.7" />
                </svg>
              </span>
              <span className="br-card-label">{m.booking.cardData}</span>
            </div>
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
                  setPickupResolved(false);
                  // Texto livre: no Sintra assume Sintra (grátis) até haver sugestão geográfica.
                  if (sintraTour) setPickupZone("sintra");
                  else setPickupZone(defaultPickupZone(tourId));
                  if (error?.kind === "i18n" && error.key === "errPickup") setError(null);
                }}
                onPlaceSelect={(place) => {
                  setPickupResolved(true);
                  if (isSintraCascaisTour(tourId)) {
                    if (place.zone === "lisboa") setPickupZone("lisboa");
                    else if (place.zone === "cascais") setPickupZone("cascais");
                    else setPickupZone("sintra");
                  } else {
                    setPickupZone(defaultPickupZone(tourId));
                  }
                }}
                placeholder={m.booking.pickupPh}
                lang={locale === "en" ? "en" : locale === "es" ? "es" : "pt"}
                invalid={
                  error?.kind === "i18n" && error.key === "errPickup" && pickup.trim().length < 2
                }
                labels={m.booking}
              />
              {sintraTour ? (
                <p className="br-field-note br-pickup-lisbon-note">{m.booking.pickupLisbonFeeNote}</p>
              ) : null}
              {pickupStatus.text ? (
                <p
                  className={`br-pickup-status br-pickup-status--${pickupStatus.tone}`}
                  role="status"
                >
                  {pickupStatus.tone === "ok" ? (
                    <span className="br-pickup-status__icon" aria-hidden>
                      ✓
                    </span>
                  ) : null}
                  <span>
                    {pickupStatus.text}
                    {pickupStatus.tone === "quote" ? (
                      <>
                        {" "}
                        <span className="br-pickup-status__hint">
                          {m.booking.pickupOnRequestHint}
                        </span>
                      </>
                    ) : null}
                  </span>
                </p>
              ) : null}
              {sintraTour ? (
                <label className="br-check">
                  <input
                    type="checkbox"
                    checked={dropOffLisbonHotel}
                    onChange={(e) => setDropOffLisbonHotel(e.target.checked)}
                  />
                  <span>
                    <strong>{m.booking.dropOffLisbon}</strong>
                    <span className="br-field-note">{m.booking.dropOffLisbonHint}</span>
                  </span>
                </label>
              ) : null}
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
                  aria-invalid={
                    error?.kind === "i18n" && error.key === "errPickup" && !pickupTime
                  }
                  aria-describedby="br-pickup-time-note"
                  aria-label={
                    pickupTime ? m.booking.pickupTime : m.booking.pickupTimePlaceholder
                  }
                />
                <span className="br-field-note" id="br-pickup-time-note">
                  {m.booking.pickupTimeNote}
                </span>
              </label>
              {!notesOpen && !notes ? (
                <button
                  type="button"
                  className="br-notes-toggle"
                  onClick={() => setNotesOpen(true)}
                >
                  {m.booking.addNotes}
                </button>
              ) : (
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
              )}
            </div>
          </section>

          <section className="br-panel" aria-label={m.booking.yourDetails}>
            <span className="br-card-label">{m.booking.yourDetails}</span>
            <div className="br-fields">
              <div className="br-fields__row">
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
              </div>
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

          <div
            className="br-summary"
            aria-live="polite"
            aria-atomic="true"
            aria-label={m.booking.summaryTitle}
          >
            <p className="br-summary__title">{m.booking.summaryTitle}</p>
            <dl className="br-summary__meta">
              <div>
                <dt>{m.booking.summaryTour}</dt>
                <dd>{tourLabel}</dd>
              </div>
              <div>
                <dt>{m.booking.summaryDate}</dt>
                <dd className={preferredDate ? undefined : "is-empty"}>
                  {preferredDate
                    ? formatDateShort(preferredDate, dateLocale)
                    : m.booking.summaryDateEmpty}
                </dd>
              </div>
              <div>
                <dt>{m.booking.summaryGuests}</dt>
                <dd>{quantity}</dd>
              </div>
              <div>
                <dt>{m.booking.summaryTransport}</dt>
                <dd>{vehicleBadge}</dd>
              </div>
              <div>
                <dt>{m.booking.summaryPickup}</dt>
                <dd
                  className={
                    pickup.trim().length < 2 && !dropOffLisbonHotel
                      ? "is-empty"
                      : transportPolicy.requiresQuote
                        ? "is-quote"
                        : "is-included"
                  }
                >
                  {pickup.trim().length >= 2 || dropOffLisbonHotel
                    ? summaryPickupLabel
                    : m.booking.summaryTimeEmpty}
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
            {transportPolicy.requiresQuote ? (
              <p className="br-summary__quote">{m.booking.transportQuoteNote}</p>
            ) : null}
          </div>

          <div className="br-book__checkout">
            <button type="submit" className="br-submit" disabled={loading} aria-busy={loading}>
              <span className="br-submit__icon" aria-hidden>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                  <rect
                    x="5"
                    y="11"
                    width="14"
                    height="10"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M8 11V8a4 4 0 0 1 8 0v3"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
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
              </Link>
              .
            </p>
          </div>
        </div>
      </form>
      {tourLocked ? null : tourPicker}
    </div>
  );
}
