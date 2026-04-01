"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { toursBooking } from "@/lib/tours-booking";

const MAX_TRAVELERS = 7;
const MAX_NAME_LEN = 120;
const MAX_PHONE_DIGITS = 15;
const MAX_NOTES_LEN = 500;

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

type PriceEstimate =
  | {
      kind: "per_person";
      centsPerPerson: number;
      totalCents: number;
      label: string;
    }
  | {
      kind: "per_group";
      totalCents: number;
      label: string;
    }
  | null;

function formatEurFromCents(cents: number): string {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

function estimateFromTable(tourId: string, quantity: number): PriceEstimate {
  const q = Math.max(1, Math.min(MAX_TRAVELERS, quantity));

  if (tourId === "sintra-cascais") {
    if (q === 1)
      return {
        kind: "per_person",
        centsPerPerson: 7500,
        totalCents: 7500 * q,
        label: "1 pessoa",
      };
    if (q === 2)
      return {
        kind: "per_person",
        centsPerPerson: 6000,
        totalCents: 6000 * q,
        label: "2 pessoas",
      };
    if (q >= 3 && q <= 4)
      return {
        kind: "per_person",
        centsPerPerson: 5500,
        totalCents: 5500 * q,
        label: "3–4 pessoas",
      };
    return {
      kind: "per_person",
      centsPerPerson: 5000,
      totalCents: 5000 * q,
      label: "5–7 pessoas",
    };
  }

  if (tourId === "3-destinos") {
    if (q === 1)
      return {
        kind: "per_person",
        centsPerPerson: 10000,
        totalCents: 10000 * q,
        label: "1 pessoa",
      };
    if (q === 2)
      return {
        kind: "per_person",
        centsPerPerson: 7000,
        totalCents: 7000 * q,
        label: "2 pessoas",
      };
    if (q >= 3 && q <= 5)
      return {
        kind: "per_person",
        centsPerPerson: 6500,
        totalCents: 6500 * q,
        label: "3–5 pessoas",
      };
    return {
      kind: "per_person",
      centsPerPerson: 6000,
      totalCents: 6000 * q,
      label: "6–7 pessoas",
    };
  }

  if (tourId === "lisboa") {
    if (q === 1)
      return {
        kind: "per_person",
        centsPerPerson: 9000,
        totalCents: 9000 * q,
        label: "1 pessoa",
      };
    if (q === 2)
      return {
        kind: "per_person",
        centsPerPerson: 6000,
        totalCents: 6000 * q,
        label: "2 pessoas",
      };
    if (q === 3)
      return {
        kind: "per_person",
        centsPerPerson: 5500,
        totalCents: 5500 * q,
        label: "3 pessoas",
      };
    if (q >= 4 && q <= 5)
      return {
        kind: "per_person",
        centsPerPerson: 5000,
        totalCents: 5000 * q,
        label: "4–5 pessoas",
      };
    return {
      kind: "per_person",
      centsPerPerson: 4500,
      totalCents: 4500 * q,
      label: "6–7 pessoas",
    };
  }

  if (tourId === "arraabida") {
    if (q === 1)
      return {
        kind: "per_person",
        centsPerPerson: 13000,
        totalCents: 13000 * q,
        label: "1 pessoa",
      };
    if (q === 2)
      return {
        kind: "per_person",
        centsPerPerson: 6500,
        totalCents: 6500 * q,
        label: "2 pessoas",
      };
    if (q >= 3 && q <= 5)
      return {
        kind: "per_person",
        centsPerPerson: 6000,
        totalCents: 6000 * q,
        label: "3–5 pessoas",
      };
    return {
      kind: "per_person",
      centsPerPerson: 5500,
      totalCents: 5500 * q,
      label: "6–7 pessoas",
    };
  }

  if (tourId === "algarve") {
    const cents = q <= 3 ? 60000 : 70000;
    return { kind: "per_group", totalCents: cents, label: q <= 3 ? "até 3 pessoas" : "até 7 pessoas" };
  }

  if (tourId === "porto") {
    const cents = q <= 3 ? 80000 : 90000;
    return { kind: "per_group", totalCents: cents, label: q <= 3 ? "até 3 pessoas" : "até 7 pessoas" };
  }

  return null;
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

function formatPtLong(ymd: string): string {
  const d = parseYMD(ymd);
  if (!d) return "";
  return d.toLocaleDateString("pt-PT", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatPtShort(ymd: string): string {
  const d = parseYMD(ymd);
  if (!d) return "";
  return d.toLocaleDateString("pt-PT", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

type BookingFormProps = {
  initialTourId?: string;
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
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  const tourLabel = toursBooking.find((t) => t.id === tourId)?.label ?? "";
  const estimate = useMemo(() => estimateFromTable(tourId, quantity), [tourId, quantity]);

  const monthLabel = useMemo(() => {
    return new Date(viewYear, viewMonth, 1).toLocaleDateString("pt-PT", {
      month: "long",
      year: "numeric",
    });
  }, [viewYear, viewMonth]);

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
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const nat = digitsOnly(phoneNational, MAX_PHONE_DIGITS);
    const phone =
      nat.length > 0 ? `${phoneDial} ${nat}` : "";
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tourId,
          quantity,
          preferredDate,
          customerName: customerName.trim().slice(0, MAX_NAME_LEN),
          email: email.trim().slice(0, 254),
          phone,
          notes: notes.slice(0, MAX_NOTES_LEN),
        }),
      });
      const rawText = await res.text();
      let data: { url?: string; error?: string; code?: string };
      try {
        data = rawText
          ? (JSON.parse(rawText) as { url?: string; error?: string; code?: string })
          : {};
      } catch {
        setError("Resposta inválida do servidor. Tenta novamente.");
        return;
      }
      if (!res.ok) {
        if (typeof console !== "undefined" && console.error) {
          console.error("[checkout]", res.status, data.code ?? "", data.error ?? "");
        }
        setError(data.error ?? "Não foi possível iniciar o pagamento.");
        return;
      }
      if (data.url) {
        window.location.assign(data.url);
        return;
      }
      setError("Resposta inválida do servidor.");
    } catch {
      setError("Erro de rede. Tenta novamente.");
    } finally {
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
                Destino
              </h2>
              <p className="br-modal-sub">Escolhe o teu tour</p>
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
                <span className="br-tour-option__label">{t.label}</span>
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
                Reserva o teu tour
              </h2>
              <p className="br-modal-sub">{tourLabel}</p>
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
            <div>
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
                <div className="br-travelers-label">Viajantes</div>
                <div className="br-travelers-sub">
                  Escolhe quantas pessoas vão no tour (máx. {MAX_TRAVELERS})
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
                  disabled={quantity >= MAX_TRAVELERS}
                  onClick={() => setQuantity((q) => Math.min(MAX_TRAVELERS, q + 1))}
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
                          <div className="br-total__label">Por pessoa</div>
                          <div className="br-total__value">
                            {formatEurFromCents(estimate.centsPerPerson)}
                          </div>
                        </div>
                        <div className="br-total__cell br-total__cell--right">
                          <div className="br-total__label">Total</div>
                          <div className="br-total__value">
                            {formatEurFromCents(estimate.totalCents)}
                          </div>
                        </div>
                      </div>
                      <div className="br-total__sub">
                        {estimate.label} · Valor final confirmado no checkout.
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="br-total__row">
                        <span className="br-total__label">Total do grupo</span>
                        <span className="br-total__value">
                          {formatEurFromCents(estimate.totalCents)}
                        </span>
                      </div>
                      <div className="br-total__sub">
                        {estimate.label} · Valor final confirmado no checkout.
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className="br-total__row">
                    <span className="br-total__label">Total</span>
                    <span className="br-total__value">Calculado no checkout</span>
                  </div>
                </>
              )}
            </div>

            <form onSubmit={handleSubmit} className="br-fields">
              <div>
                <p className="br-section-title">Os teus dados</p>
                <div className="br-row2">
                  <label className="br-label">
                    Nome completo
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
                    Telefone (opcional)
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
                  Email
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
                  Notas (opcional)
                  <textarea
                    className="br-input br-textarea"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value.slice(0, MAX_NOTES_LEN))}
                    placeholder="Pickup, alergias…"
                    maxLength={MAX_NOTES_LEN}
                  />
                  <span className="br-char-hint">
                    {notes.length}/{MAX_NOTES_LEN}
                  </span>
                </label>
              </div>

              {error ? <p className="br-error">{error}</p> : null}

              <button
                type="submit"
                className="br-submit"
                disabled={loading || !preferredDate}
              >
                {loading
                  ? "A redirecionar para o pagamento…"
                  : "Continuar para pagamento seguro"}
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
            <span className="br-card-label">Destino</span>
            <button
              type="button"
              className="br-pick-btn"
              onClick={() => setTourPickerOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={tourPickerOpen}
              aria-label="Escolher destino do tour"
            >
              <div className="br-pick-btn__text">
                <span className="br-pick-btn__value">{tourLabel}</span>
              </div>
              <span className="br-pick-btn__chev" aria-hidden>
                ›
              </span>
            </button>
          </div>

          <div className="br-card br-card--grow">
            <span className="br-card-label">Data</span>
            <button
              type="button"
              className="br-pick-btn"
              onClick={() => setModalOpen(true)}
            >
              <div className="br-pick-btn__text">
                <span
                  className={
                    preferredDate
                      ? "br-pick-btn__value"
                      : "br-pick-btn__value br-pick-btn__value--muted"
                  }
                >
                  {preferredDate ? formatPtShort(preferredDate) : "Toca para escolher"}
                </span>
              </div>
              <span className="br-pick-btn__chev" aria-hidden>
                ›
              </span>
            </button>
          </div>

          <div className="br-card br-card--grow">
            <span className="br-card-label">Viajantes</span>
            <button
              type="button"
              className="br-pick-btn"
              onClick={() => setModalOpen(true)}
            >
              <div className="br-pick-btn__text">
                <span className="br-pick-btn__value">
                  {quantity} {quantity === 1 ? "pessoa" : "pessoas"}
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
              {preferredDate ? "Rever e pagar" : "Escolher data e reservar"}
            </button>
          </div>
          </div>
        </div>
      </div>

      <p className="br-hint">
        {preferredDate ? (
          <>
            <strong>{formatPtLong(preferredDate)}</strong>
            {" · "}
            {quantity} {quantity === 1 ? "pessoa" : "pessoas"} · {tourLabel}
          </>
        ) : (
          <>
            Abre o calendário no botão laranja, escolhe até 7 pessoas e conclui os teus dados para
            ires ao pagamento seguro.
          </>
        )}
      </p>

      {tourPicker}
      {modal}
    </div>
  );
}
