"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  ChevronRight,
  Copy,
  Mail,
  MessageCircle,
  Phone,
  RefreshCw,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { BookingApprovalStatus } from "@/lib/booking-approval";
import { cn } from "@/lib/utils";
import { whatsappUrlForCustomerPhone } from "@/lib/whatsapp";

type Row = {
  eventId: string;
  stripeSessionId: string;
  preferredDate: string;
  tourLabel: string;
  customerName: string;
  email: string;
  phone: string;
  notes: string;
  quantity: number;
  totalCents?: number;
  currency?: string;
  createdAt?: string;
  approvalStatus: BookingApprovalStatus;
};

type FilterTab = "all" | BookingApprovalStatus;

function formatMoney(totalCents?: number, currency?: string): string {
  if (typeof totalCents !== "number" || !Number.isFinite(totalCents)) return "—";
  const cur = (currency || "eur").toUpperCase();
  try {
    return new Intl.NumberFormat("pt-PT", { style: "currency", currency: cur }).format(
      totalCents / 100,
    );
  } catch {
    return `${(totalCents / 100).toFixed(2)} ${cur}`;
  }
}

function formatDateLong(ymd: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd.trim());
  if (!m) return ymd;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  if (Number.isNaN(d.getTime())) return ymd;
  return d.toLocaleDateString("pt-PT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function mailtoHref(r: Row): string {
  const sub = encodeURIComponent(`Reserva — ${r.tourLabel} (${r.preferredDate})`);
  const body = encodeURIComponent(
    `Olá ${r.customerName},\n\n` +
      `Referência Stripe: ${r.stripeSessionId}\n` +
      `Tour: ${r.tourLabel}\n` +
      `Data: ${r.preferredDate}\n` +
      `Pessoas: ${r.quantity}\n\n`,
  );
  return `mailto:${r.email}?subject=${sub}&body=${body}`;
}

function telHref(phone: string): string | null {
  const d = phone.replace(/\D/g, "");
  if (!d) return null;
  if (d.startsWith("351")) return `tel:+${d}`;
  if (d.length === 9) return `tel:+351${d}`;
  return `tel:+${d}`;
}

function safeCopy(text: string) {
  if (!text) return;
  void navigator.clipboard?.writeText(text);
}

const FILTER_LABELS: Record<FilterTab, string> = {
  pending: "Por confirmar",
  accepted: "Aceites",
  rejected: "Recusadas",
  all: "Todas",
};

function StatusPill({ status }: { status: BookingApprovalStatus }) {
  return (
    <span
      className={cn(
        "booking-pill",
        status === "pending" && "booking-pill--pending",
        status === "accepted" && "booking-pill--accepted",
        status === "rejected" && "booking-pill--rejected",
      )}
    >
      {status === "pending" && "Por confirmar"}
      {status === "accepted" && "Aceite"}
      {status === "rejected" && "Recusada"}
    </span>
  );
}

export function BookingsClient() {
  const [rows, setRows] = useState<Row[]>([]);
  const [filter, setFilter] = useState<FilterTab>("pending");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [actingId, setActingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [testBusy, setTestBusy] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerRow, setDrawerRow] = useState<Row | null>(null);
  const seen = useRef<Set<string>>(new Set());

  const refresh = useCallback(async () => {
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/bookings/recent", { cache: "no-store" });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        rows?: Row[];
        error?: string;
      };
      if (!res.ok || !data.ok) {
        setErr(data.error || `Pedido falhou (${res.status}).`);
        return;
      }
      const next = data.rows || [];
      setRows(next);
      setDrawerRow((prev) => {
        if (!prev) return prev;
        const updated = next.find((r) => r.eventId === prev.eventId);
        return updated ?? prev;
      });
      for (const r of next) seen.current.add(r.stripeSessionId);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Erro de rede.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
    const t = window.setInterval(() => void refresh(), 10_000);
    return () => window.clearInterval(t);
  }, [refresh]);

  const stats = useMemo(() => {
    let p = 0;
    let a = 0;
    let r = 0;
    for (const row of rows) {
      if (row.approvalStatus === "pending") p += 1;
      else if (row.approvalStatus === "accepted") a += 1;
      else r += 1;
    }
    return { p, a, r, total: rows.length };
  }, [rows]);

  const filtered = useMemo(() => {
    let list = rows;
    if (filter !== "all") list = list.filter((x) => x.approvalStatus === filter);
    const q = search.trim().toLowerCase();
    if (!q) return list;
    return list.filter((r) => {
      const hay =
        `${r.preferredDate} ${r.tourLabel} ${r.customerName} ${r.email} ${r.phone} ${r.stripeSessionId} ${r.notes}`.toLowerCase();
      return hay.includes(q);
    });
  }, [rows, filter, search]);

  async function setApproval(eventId: string, status: "accepted" | "rejected") {
    setActingId(eventId);
    setErr(null);
    try {
      const res = await fetch("/api/admin/bookings/approval", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, status }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setErr(data.error || "Não foi possível atualizar o estado.");
        return;
      }
      const patch = (row: Row) =>
        row.eventId === eventId ? { ...row, approvalStatus: status } : row;
      setRows((prev) => prev.map(patch));
      setDrawerRow((prev) => (prev ? patch(prev) : prev));
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Erro de rede.");
    } finally {
      setActingId(null);
    }
  }

  async function createTestBooking() {
    setTestBusy(true);
    setErr(null);
    try {
      const res = await fetch("/api/admin/bookings/test", { method: "POST" });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setErr(data.error || "Não foi possível criar a reserva de teste.");
        return;
      }
      await refresh();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Erro de rede.");
    } finally {
      setTestBusy(false);
    }
  }

  function copyStripe(id: string) {
    safeCopy(id);
    setCopiedId(id);
    window.setTimeout(() => setCopiedId(null), 2000);
  }

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    window.setTimeout(() => setDrawerRow(null), 160);
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen, closeDrawer]);

  const drawerWa = useMemo(() => {
    if (!drawerRow) return null;
    return whatsappUrlForCustomerPhone(drawerRow.phone, {
      customerName: drawerRow.customerName,
      tourLabel: drawerRow.tourLabel,
      preferredDate: drawerRow.preferredDate,
    });
  }, [drawerRow]);

  return (
    <div className="admin-dash bookings-wrap">
      <section aria-label="Resumo" className="bookings-stats">
        <div className="bookings-stat bookings-stat--pending">
          <div className="bookings-stat__k">Por confirmar</div>
          <div className="bookings-stat__v">{stats.p}</div>
        </div>
        <div className="bookings-stat bookings-stat--accepted">
          <div className="bookings-stat__k">Aceites</div>
          <div className="bookings-stat__v">{stats.a}</div>
        </div>
        <div className="bookings-stat bookings-stat--rejected">
          <div className="bookings-stat__k">Recusadas</div>
          <div className="bookings-stat__v">{stats.r}</div>
        </div>
        <div className="bookings-stat">
          <div className="bookings-stat__k">Total</div>
          <div className="bookings-stat__v">{stats.total}</div>
        </div>
      </section>

      <section aria-label="Filtrar e pesquisar" className="bookings-controls">
        <div className="bookings-filters" role="tablist" aria-label="Estado da reserva">
          {(["pending", "accepted", "rejected", "all"] as const).map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={cn("bookings-filter", filter === f && "is-active")}
            >
              {FILTER_LABELS[f]}
            </button>
          ))}
        </div>

        <div className="bookings-toolbar">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar por nome, tour, data ou email…"
            className="bookings-search placeholder:text-neutral-400"
            aria-label="Pesquisar reservas"
          />
          <Button
            type="button"
            size="lg"
            className="bookings-refresh-btn"
            onClick={() => void refresh()}
            disabled={loading}
          >
            <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
            {loading ? "A atualizar…" : "Atualizar"}
          </Button>
        </div>
      </section>

      {err ? (
        <div className="bookings-alert" role="alert">
          {err}
        </div>
      ) : null}

      <div className="bookings-list">
        {filtered.length === 0 ? (
          <div className="bookings-empty">
            <p className="bookings-empty__title">
              {rows.length === 0
                ? "Ainda não há reservas"
                : "Nenhuma reserva neste filtro"}
            </p>
            <p className="bookings-empty__text">
              {rows.length === 0
                ? "Quando um cliente pagar no Stripe, a reserva aparece aqui para confirmar ou recusar."
                : "Experimente outro separador ou limpe a pesquisa."}
            </p>
            <div className="bookings-empty__actions">
              <Button type="button" variant="outline" onClick={() => void refresh()} disabled={loading}>
                Atualizar lista
              </Button>
              {rows.length === 0 ? (
                <button
                  type="button"
                  className="bookings-empty__link"
                  onClick={() => void createTestBooking()}
                  disabled={testBusy || loading}
                >
                  {testBusy ? "A criar teste…" : "Criar reserva de teste no calendário"}
                </button>
              ) : null}
            </div>
          </div>
        ) : (
          filtered.map((r) => {
            const pending = r.approvalStatus === "pending";
            const busy = actingId === r.eventId;

            return (
              <article key={r.eventId} className="booking-card">
                <div className="booking-card__head">
                  <div className="booking-card__meta">
                    <StatusPill status={r.approvalStatus} />
                    <span className="booking-price">{formatMoney(r.totalCents, r.currency)}</span>
                  </div>
                  <h2 className="booking-title">{r.tourLabel}</h2>
                  <p className="booking-sub">
                    <span className="booking-sub__name">{r.customerName}</span>
                    <span className="booking-sub__dot" aria-hidden="true">
                      ·
                    </span>
                    <span>{formatDateLong(r.preferredDate)}</span>
                    <span className="booking-sub__dot" aria-hidden="true">
                      ·
                    </span>
                    <span>
                      {r.quantity} {r.quantity === 1 ? "pessoa" : "pessoas"}
                    </span>
                  </p>
                </div>

                {pending ? (
                  <div className="booking-approve">
                    <Button
                      type="button"
                      className="booking-btn-accept"
                      disabled={busy}
                      onClick={() => void setApproval(r.eventId, "accepted")}
                    >
                      <Check className="h-5 w-5 shrink-0" />
                      Aceitar viagem
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="booking-btn-reject"
                      disabled={busy}
                      onClick={() => void setApproval(r.eventId, "rejected")}
                    >
                      <X className="h-5 w-5 shrink-0" />
                      Recusar
                    </Button>
                  </div>
                ) : (
                  <p className="booking-resolved">
                    Estado:{" "}
                    <strong>{r.approvalStatus === "accepted" ? "viagem aceite" : "viagem recusada"}</strong>
                  </p>
                )}

                <button
                  type="button"
                  className="booking-details-btn"
                  onClick={() => {
                    setDrawerRow(r);
                    setDrawerOpen(true);
                  }}
                >
                  Ver contacto e detalhes
                  <ChevronRight className="h-5 w-5 opacity-60" aria-hidden="true" />
                </button>
              </article>
            );
          })
        )}
      </div>

      {drawerRow ? (
        <div
          className={cn(
            "booking-drawer-backdrop",
            drawerOpen ? "is-visible" : "is-hidden",
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Detalhes da reserva"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeDrawer();
          }}
        >
          <div className={cn("booking-drawer", drawerOpen && "is-open")}>
            <div className="booking-drawer__head">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusPill status={drawerRow.approvalStatus} />
                  <span className="booking-price">{formatMoney(drawerRow.totalCents, drawerRow.currency)}</span>
                </div>
                <h3 className="booking-drawer__title">{drawerRow.tourLabel}</h3>
                <p className="booking-drawer__sub">
                  {formatDateLong(drawerRow.preferredDate)} · {drawerRow.quantity}{" "}
                  {drawerRow.quantity === 1 ? "pessoa" : "pessoas"}
                </p>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                className="booking-drawer__close"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="booking-drawer__body">
              <div className="booking-drawer-grid">
                <div className="booking-drawer-box">
                  <h4 className="booking-drawer-box__label">Cliente</h4>
                  <p className="booking-drawer-box__value">{drawerRow.customerName || "—"}</p>
                  <dl className="booking-drawer-dl">
                    <div>
                      <dt>Email</dt>
                      <dd>
                        <span>{drawerRow.email || "—"}</span>
                        {drawerRow.email ? (
                          <button type="button" onClick={() => safeCopy(drawerRow.email)}>
                            Copiar
                          </button>
                        ) : null}
                      </dd>
                    </div>
                    <div>
                      <dt>Telefone</dt>
                      <dd>
                        <span>{drawerRow.phone || "—"}</span>
                        {drawerRow.phone ? (
                          <button type="button" onClick={() => safeCopy(drawerRow.phone)}>
                            Copiar
                          </button>
                        ) : null}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="booking-drawer-box">
                  <h4 className="booking-drawer-box__label">Referência</h4>
                  <dl className="booking-drawer-dl">
                    <div>
                      <dt>Stripe</dt>
                      <dd>
                        <code>{drawerRow.stripeSessionId}</code>
                        <button type="button" onClick={() => copyStripe(drawerRow.stripeSessionId)}>
                          {copiedId === drawerRow.stripeSessionId ? "Copiado" : "Copiar"}
                        </button>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              {drawerRow.notes ? (
                <div className="booking-drawer-notes">
                  <h4 className="booking-drawer-box__label">Notas do cliente</h4>
                  <p>{drawerRow.notes}</p>
                </div>
              ) : null}

              <div className="booking-drawer-contact">
                {drawerRow.email ? (
                  <a href={mailtoHref(drawerRow)} className="booking-contact-btn booking-contact-btn--email">
                    <Mail className="h-4 w-4" />
                    Email
                  </a>
                ) : null}
                {drawerWa ? (
                  <a
                    href={drawerWa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="booking-contact-btn booking-contact-btn--wa"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                ) : null}
                {telHref(drawerRow.phone) ? (
                  <a
                    href={telHref(drawerRow.phone) as string}
                    className="booking-contact-btn booking-contact-btn--phone"
                  >
                    <Phone className="h-4 w-4" />
                    Ligar
                  </a>
                ) : null}
              </div>
            </div>

            {drawerRow.approvalStatus === "pending" ? (
              <div className="booking-drawer__foot">
                <Button
                  type="button"
                  className="booking-btn-accept"
                  disabled={actingId === drawerRow.eventId}
                  onClick={() => void setApproval(drawerRow.eventId, "accepted")}
                >
                  <Check className="h-5 w-5 shrink-0" />
                  Aceitar viagem
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="booking-btn-reject"
                  disabled={actingId === drawerRow.eventId}
                  onClick={() => void setApproval(drawerRow.eventId, "rejected")}
                >
                  <X className="h-5 w-5 shrink-0" />
                  Recusar
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
