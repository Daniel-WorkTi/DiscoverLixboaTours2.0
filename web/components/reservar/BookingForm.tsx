"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { toursBooking } from "@/lib/tours-booking";

const MAX_TRAVELERS = 7;

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
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
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
    if (!modalOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [modalOpen]);

  const tourLabel = toursBooking.find((t) => t.id === tourId)?.label ?? "";

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
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tourId,
          quantity,
          preferredDate,
          customerName,
          email,
          phone,
          notes,
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
                <div className="br-travelers-sub">Máximo {MAX_TRAVELERS} pessoas por reserva</div>
              </div>
              <div className="br-stepper">
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

            <form onSubmit={handleSubmit} className="br-fields">
              <div>
                <p className="br-section-title">Os teus dados</p>
                <div className="br-row2">
                  <label className="br-label">
                    Nome completo
                    <input
                      className="br-input"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      autoComplete="name"
                      required
                      minLength={2}
                    />
                  </label>
                  <label className="br-label">
                    Telefone
                    <input
                      className="br-input"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      autoComplete="tel"
                      placeholder="+351 …"
                    />
                  </label>
                </div>
                <label className="br-label" style={{ marginTop: "0.65rem" }}>
                  Email
                  <input
                    className="br-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                </label>
                <label className="br-label" style={{ marginTop: "0.65rem" }}>
                  Notas (opcional)
                  <textarea
                    className="br-input br-textarea"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Pickup, alergias…"
                    maxLength={500}
                  />
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
      <div className="br-layout">
        <section className="br-card" aria-label="Destino do tour">
          <span className="br-card-label">Destino</span>
          <select
            className="br-select"
            value={tourId}
            onChange={(e) => setTourId(e.target.value)}
            aria-label="Tour"
          >
            {toursBooking.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </section>

        <div className="br-row-pick">
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

      {modal}
    </div>
  );
}
