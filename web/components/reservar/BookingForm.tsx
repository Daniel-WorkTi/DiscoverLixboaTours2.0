"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { estimateFromTable, getMaxBookablePassengers } from "@/lib/tour-pricing-table";
import { toursBooking } from "@/lib/tours-booking";

const MAX_NAME_LEN = 120;
const MAX_PHONE_DIGITS = 15;
const MAX_NOTES_LEN = 500;

/** Se o servidor / Stripe não responder, o fetch não deve ficar “a carregar” para sempre. */
const CHECKOUT_FETCH_TIMEOUT_MS = 55_000;

const GROUP_PRICE_TOUR_IDS = new Set([
  "sintra-cascais",
  "algarve",
  "porto",
  "monsanto",
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

type BookingFormError =
  | { kind: "i18n"; key: string }
  | { kind: "server"; message: string };

/** PT default copy — mirror `booking_err_*` in translate.js */
const BOOKING_ERR_PT: Record<string, string> = {
  booking_err_pick_date:
    "Escolhe um dia no calendário em cima («Data do tour») antes de continuar para o pagamento.",
  booking_err_invalid_response: "Resposta inválida do servidor. Tenta novamente.",
  booking_err_checkout_default: "Não foi possível iniciar o pagamento.",
  booking_err_no_url:
    "Resposta inválida: não há URL de pagamento. Confirma STRIPE_SECRET_KEY e os logs do servidor.",
  booking_err_timeout:
    "O servidor demorou demasiado a responder (timeout). Verifica a ligação, se a chave Stripe está na Vercel (Environment Variables) e tenta de novo.",
  booking_err_network: "Erro de rede. Tenta novamente.",
};

export function BookingForm({ initialTourId }: BookingFormProps) {
  const titleId = useId();
  const tourPickerTitleId = useId();
  const [tourId, setTourId] = useState(() => {
    if (initialTourId && toursBooking.some((t) => t.id === initialTourId)) {
      return initialTourId;
    }
    return defaultTourId();
  });
  const [preferredDate, setPreferredDate] = useState("");
  const [quantity, setQuantity] = useState(1);
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
  const [uiLang, setUiLang] = useState<"pt" | "en">("pt");

  const today = useMemo(() => startOfToday(), []);

  const [viewYear, setViewYear] = useState(() => today.getFullYear());
  const [viewMonth, setViewMonth] = useState(() => today.getMonth());

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const read = () => {
      const l = localStorage.getItem("language") || "pt";
      setUiLang(l === "en" ? "en" : "pt");
    };
    read();
    const onLang = () => read();
    window.addEventListener("discoverlangchange", onLang);
    return () => window.removeEventListener("discoverlangchange", onLang);
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

  const tourLabel = toursBooking.find((t) => t.id === tourId)?.label ?? "";
  const tourLabelKey = `tour_booking_${tourId.replace(/-/g, "_")}`;
  const maxTravelers = useMemo(() => getMaxBookablePassengers(tourId), [tourId]);
  const estimate = useMemo(() => estimateFromTable(tourId, quantity), [tourId, quantity]);

  useEffect(() => {
    setQuantity((q) => Math.min(q, maxTravelers));
  }, [maxTravelers]);

  const dateLocale = uiLang === "en" ? "en-GB" : "pt-PT";

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
      setError({ kind: "i18n", key: "booking_err_pick_date" });
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
        setError({ kind: "i18n", key: "booking_err_invalid_response" });
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
          setError({ kind: "i18n", key: "booking_err_checkout_default" });
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
        setError({ kind: "i18n", key: "booking_err_no_url" });
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        setError({ kind: "i18n", key: "booking_err_timeout" });
      } else {
        setError({ kind: "i18n", key: "booking_err_network" });
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
              <h2 id={tourPickerTitleId} className="br-modal-title" data-translate="booking_modal_destino">
                Destino
              </h2>
              <p className="br-modal-sub" data-translate="booking_modal_choose">
                Escolhe o teu tour
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
                  <span
                    className="br-tour-option__label"
                    data-translate={`tour_booking_${t.id.replace(/-/g, "_")}`}
                  >
                    {t.label}
                  </span>
                  {GROUP_PRICE_TOUR_IDS.has(t.id) ? (
                    <span className="br-tour-option__badge" data-translate="price_group_badge">
                      Preço de grupo
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
              <h2 id={titleId} className="br-modal-title" data-translate="booking_modal_title">
                Reserva o teu tour
              </h2>
              <p className="br-modal-sub" data-translate={tourLabelKey}>
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
              <p className="br-section-title">Data do tour</p>
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
                <div className="br-travelers-label" data-translate="booking_travelers">
                  Viajantes
                </div>
                <div className="br-travelers-sub" data-translate="booking_travelers_hint">
                  Escolhe quantas pessoas vão no tour (máx. {maxTravelers})
                </div>
              </div>
              <div className="br-stepper" aria-label="Quantidade de pessoas">
                <button
                  type="button"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
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
                          <div className="br-total__label" data-translate="booking_per_person">
                            Por pessoa
                          </div>
                          <div className="br-total__value">
                            {formatEurFromCents(estimate.centsPerPerson)}
                          </div>
                        </div>
                        <div className="br-total__cell br-total__cell--right">
                          <div className="br-total__label" data-translate="booking_total">
                            Total
                          </div>
                          <div className="br-total__value">
                            {formatEurFromCents(estimate.totalCents)}
                          </div>
                        </div>
                      </div>
                      <div className="br-total__sub" data-translate="booking_checkout_note">
                        Valor final confirmado no checkout.
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="br-total__badge" data-translate="price_group_badge">
                        Preço de grupo
                      </div>
                      <div className="br-total__row">
                        <span className="br-total__label" data-translate="booking_total_group">
                          Total do grupo
                        </span>
                        <span className="br-total__value">
                          {formatEurFromCents(estimate.totalCents)}
                        </span>
                      </div>
                      <div className="br-total__sub" data-translate="booking_checkout_note">
                        Valor final confirmado no checkout.
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className="br-total__row">
                    <span className="br-total__label" data-translate="booking_total">
                      Total
                    </span>
                    <span className="br-total__value" data-translate="booking_total_tbd">
                      Calculado no checkout
                    </span>
                  </div>
                </>
              )}
            </div>

            <form onSubmit={handleSubmit} className="br-fields">
              <div>
                <p className="br-section-title" data-translate="booking_your_details">
                  Os teus dados
                </p>
                <div className="br-row2">
                  <label className="br-label">
                    <span data-translate="booking_full_name">Nome completo</span>
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
                    <span data-translate="booking_phone_opt">Telefone (opcional)</span>
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
                  <span data-translate="booking_email">Email</span>
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
                  <span data-translate="booking_pickup">Pickup / ponto de encontro</span>
                  <input
                    className="br-input"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value.slice(0, 140))}
                    placeholder="Hotel, morada ou ponto de encontro"
                    data-translate-placeholder="booking_pickup_ph"
                    required
                    minLength={2}
                    maxLength={140}
                    autoComplete="street-address"
                  />
                </label>
                <label className="br-label" style={{ marginTop: "0.65rem" }}>
                  <span data-translate="booking_notes">Notas (opcional)</span>
                  <textarea
                    className="br-input br-textarea"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value.slice(0, MAX_NOTES_LEN))}
                    placeholder="Horário preferido, idioma (PT/EN), crianças, etc."
                    data-translate-placeholder="booking_notes_ph"
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
                    <span data-translate={error.key}>
                      {BOOKING_ERR_PT[error.key] ?? error.key}
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
                  <span data-translate="booking_submit_loading">
                    A redirecionar para o pagamento…
                  </span>
                ) : (
                  <span data-translate="booking_submit">Continuar para pagamento seguro</span>
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
            <span className="br-card-label" data-translate="booking_card_destino">
              Destino
            </span>
            <button
              type="button"
              className="br-pick-btn"
              onClick={() => setTourPickerOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={tourPickerOpen}
              aria-label="Escolher destino do tour"
            >
              <div className="br-pick-btn__text">
                <span className="br-pick-btn__value" data-translate={tourLabelKey}>
                  {tourLabel}
                </span>
              </div>
              <span className="br-pick-btn__chev" aria-hidden>
                ›
              </span>
            </button>
          </div>

          <div className="br-card br-card--grow">
            <span className="br-card-label" data-translate="booking_card_data">
              Data
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
                    data-translate="booking_pick_date"
                  >
                    Toca para escolher
                  </span>
                )}
              </div>
              <span className="br-pick-btn__chev" aria-hidden>
                ›
              </span>
            </button>
          </div>

          <div className="br-card br-card--grow">
            <span className="br-card-label" data-translate="booking_card_viajantes">
              Viajantes
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
                    data-translate={
                      quantity === 1 ? "booking_person_singular" : "booking_person_plural"
                    }
                  >
                    {quantity === 1 ? "pessoa" : "pessoas"}
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
                <span data-translate="booking_cta_review">Rever e pagar</span>
              ) : (
                <span data-translate="booking_cta_choose">Escolher data e reservar</span>
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
              data-translate={
                quantity === 1 ? "booking_person_singular" : "booking_person_plural"
              }
            >
              {quantity === 1 ? "pessoa" : "pessoas"}
            </span>
            {" · "}
            <span data-translate={tourLabelKey}>{tourLabel}</span>
          </>
        ) : (
          <span data-translate="booking_hint_long">
            Abre o calendário no botão laranja, escolhe até 8 passageiros e conclui os teus dados para
            ires ao pagamento seguro.
          </span>
        )}
      </p>

      {tourPicker}
      {modal}
    </div>
  );
}
