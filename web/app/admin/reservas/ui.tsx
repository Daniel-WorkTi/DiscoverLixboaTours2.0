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

function clip(s: string, max = 44): string {
  const t = (s || "").trim();
  if (!t) return "—";
  return t.length > max ? `${t.slice(0, max - 1)}…` : t;
}

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
  pending: "Pendentes",
  accepted: "Aceites",
  rejected: "Recusadas",
  all: "Todas",
};

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

  const refresh = useCallback(async (showToasts: boolean) => {
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

      if (showToasts && "Notification" in window && Notification.permission === "granted") {
        for (const r of next) {
          if (seen.current.has(r.stripeSessionId)) continue;
          if (seen.current.size > 0) {
            new Notification("Nova reserva", {
              body: `${r.tourLabel} · ${r.customerName} · ${formatDateLong(r.preferredDate)}`,
            });
          }
          seen.current.add(r.stripeSessionId);
        }
      } else {
        for (const r of next) seen.current.add(r.stripeSessionId);
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Erro de rede.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh(false);
    const t = window.setInterval(() => refresh(true), 10_000);
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
      setRows((prev) =>
        prev.map((row) => (row.eventId === eventId ? { ...row, approvalStatus: status } : row)),
      );
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Erro de rede.");
    } finally {
      setActingId(null);
    }
  }

  async function enableNotifications() {
    if (!("Notification" in window)) return;
    if (Notification.permission === "granted") return;
    await Notification.requestPermission();
  }

  async function createTestBooking() {
    setTestBusy(true);
    setErr(null);
    try {
      const res = await fetch("/api/admin/bookings/test", { method: "POST" });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        preferredDate?: string;
      };
      if (!res.ok || !data.ok) {
        setErr(data.error || "Não foi possível criar a reserva de teste.");
        return;
      }
      await refresh(true);
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
          <div className="bookings-stat__k">Por tratar</div>
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

      <section aria-label="Filtrar lista" className="bookings-filters">
        {(["pending", "accepted", "rejected", "all"] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              "bookings-filter",
              filter === f && "is-active",
            )}
          >
            {FILTER_LABELS[f]}
          </button>
        ))}
      </section>

      <section aria-label="Pesquisa e ações" className="bookings-toolbar">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Pesquisar nome, tour, data, email, telefone…"
          className="bookings-search placeholder:text-neutral-400 focus-visible:ring-2"
        />
        <div className="bookings-actions">
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="rounded-full border-dashed px-6 text-[15px] whitespace-nowrap"
            onClick={() => void createTestBooking()}
            disabled={loading || testBusy}
            title="Cria uma entrada no calendário como reserva, sem Stripe — para testar o painel."
          >
            {testBusy ? "A criar demo…" : "Cliente demo"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="lg"
            className="rounded-full px-6 text-[15px] whitespace-nowrap"
            onClick={enableNotifications}
          >
            Notificações
          </Button>
          <Button
            type="button"
            size="lg"
            className="rounded-full px-6 text-[15px] whitespace-nowrap"
            onClick={() => refresh(true)}
            disabled={loading}
          >
            <RefreshCw className={cn("mr-2 h-4 w-4", loading && "animate-spin")} />
            {loading ? "A atualizar…" : "Atualizar"}
          </Button>
        </div>
      </section>

      {err ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-[15px] font-medium leading-relaxed text-red-900">
          {err}
        </div>
      ) : null}

      <div className="bookings-list">
        {filtered.length === 0 ? (
          <div className="rounded-[20px] border border-dashed border-black/15 bg-neutral-50/80 px-6 py-20 text-center sm:px-10 sm:py-24">
            <p className="text-base font-medium text-[#444] sm:text-[1.05rem]">
              Nenhuma reserva neste filtro.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-neutral-500 sm:text-[0.95rem]">
              Altera o separador em cima ou limpa a pesquisa.
            </p>
          </div>
        ) : (
          filtered.map((r) => {
            const wa = whatsappUrlForCustomerPhone(r.phone, {
              customerName: r.customerName,
              tourLabel: r.tourLabel,
              preferredDate: r.preferredDate,
            });
            const phoneDial = telHref(r.phone);
            const pending = r.approvalStatus === "pending";
            const busy = actingId === r.eventId;

            return (
              <article
                key={r.eventId}
                className="booking-card"
              >
                <div className="booking-card__inner">
                  <div className="booking-top">
                    <div className="booking-badges">
                      <span
                        className={cn(
                          "booking-pill",
                          r.approvalStatus === "pending" && "booking-pill--pending",
                          r.approvalStatus === "accepted" && "booking-pill--accepted",
                          r.approvalStatus === "rejected" && "booking-pill--rejected",
                        )}
                      >
                        {r.approvalStatus === "pending" && "Por confirmar"}
                        {r.approvalStatus === "accepted" && "Aceite"}
                        {r.approvalStatus === "rejected" && "Recusada"}
                      </span>
                      <span className="booking-price">{formatMoney(r.totalCents, r.currency)}</span>
                    </div>

                    <h3 className="booking-title">{r.tourLabel}</h3>

                    <p className="booking-sub">
                      <span className="font-semibold text-[#1d1d1f]">{r.customerName}</span>
                      {" · "}
                      {formatDateLong(r.preferredDate)}
                      {" · "}
                      {r.quantity} {r.quantity === 1 ? "pessoa" : "pessoas"}
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setDrawerRow(r);
                        setDrawerOpen(true);
                      }}
                      className="group inline-flex min-h-11 items-center justify-between gap-3 rounded-2xl border border-black/10 bg-white px-4 py-2.5 text-[15px] font-semibold text-[#1d1d1f] shadow-sm hover:bg-neutral-50"
                      aria-label={`Abrir detalhes de ${r.customerName}`}
                    >
                      <span className="truncate">Detalhes</span>
                      <ChevronRight className="h-5 w-5 opacity-70 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>

                  {r.notes ? (
                    <div className="booking-notes">
                      <div className="booking-notes__k">Notas do cliente</div>
                      <p className="mt-2">{r.notes}</p>
                    </div>
                  ) : null}

                  <div className="booking-actions text-sm sm:text-[15px]">
                    {r.email ? (
                      <a
                        href={mailtoHref(r)}
                        className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#1d1d1f] px-5 py-2.5 font-semibold text-white no-underline transition-opacity hover:opacity-90"
                      >
                        <Mail className="h-4 w-4 shrink-0" />
                        Email
                      </a>
                    ) : null}
                    {wa ? (
                      <a
                        href={wa}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 font-semibold text-white no-underline shadow-sm hover:brightness-95"
                      >
                        <MessageCircle className="h-4 w-4 shrink-0" />
                        WhatsApp
                      </a>
                    ) : (
                      <span className="inline-flex min-h-11 items-center rounded-full bg-neutral-100 px-4 py-2 text-[14px] text-neutral-500">
                        Sem telemóvel no formulário
                      </span>
                    )}
                    {phoneDial ? (
                      <a
                        href={phoneDial}
                        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-2.5 font-semibold text-[#1d1d1f] no-underline hover:bg-neutral-50"
                      >
                        <Phone className="h-4 w-4" />
                        Ligar
                      </a>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => copyStripe(r.stripeSessionId)}
                      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-2.5 text-[15px] font-semibold text-[#1d1d1f] hover:bg-neutral-50"
                    >
                      <Copy className="h-4 w-4" />
                      {copiedId === r.stripeSessionId ? "Copiado" : "Stripe"}
                    </button>
                  </div>

                  {pending ? (
                    <div className="booking-approve">
                      <Button
                        type="button"
                        className="h-12 min-h-12 rounded-2xl text-[16px] font-semibold"
                        disabled={busy}
                        onClick={() => setApproval(r.eventId, "accepted")}
                      >
                        <Check className="mr-2 h-5 w-5" />
                        Aceitar viagem
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="h-12 min-h-12 rounded-2xl border-red-200 text-[16px] font-semibold text-red-700 hover:bg-red-50"
                        disabled={busy}
                        onClick={() => setApproval(r.eventId, "rejected")}
                      >
                        <X className="mr-2 h-5 w-5" />
                        Recusar
                      </Button>
                    </div>
                  ) : (
                    <p className="border-t border-black/6 pt-4 text-[14px] text-neutral-500">
                      Estado:{" "}
                      <strong className="text-[#1d1d1f]">
                        {r.approvalStatus === "accepted" ? "Aceite" : "Recusada"}
                      </strong>
                      . Podes alterar contactando o cliente pelos botões acima.
                    </p>
                  )}
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* Drawer (detalhes) */}
      {drawerRow ? (
        <div
          className={cn(
            "booking-drawer-backdrop transition-opacity",
            drawerOpen ? "opacity-100" : "pointer-events-none opacity-0",
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Detalhes da reserva"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeDrawer();
          }}
        >
          <div
            className={cn(
              "booking-drawer",
              drawerOpen && "is-open",
            )}
          >
            <div className="booking-drawer__head">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "booking-pill",
                      drawerRow.approvalStatus === "pending" && "booking-pill--pending",
                      drawerRow.approvalStatus === "accepted" && "booking-pill--accepted",
                      drawerRow.approvalStatus === "rejected" && "booking-pill--rejected",
                    )}
                  >
                    {drawerRow.approvalStatus === "pending" && "Por confirmar"}
                    {drawerRow.approvalStatus === "accepted" && "Aceite"}
                    {drawerRow.approvalStatus === "rejected" && "Recusada"}
                  </span>
                  <span className="booking-price">
                    {formatMoney(drawerRow.totalCents, drawerRow.currency)}
                  </span>
                </div>
                <h3 className="mt-3 booking-title">{drawerRow.tourLabel}</h3>
                <p className="mt-1 text-sm text-neutral-600">
                  {formatDateLong(drawerRow.preferredDate)} · {drawerRow.quantity}{" "}
                  {drawerRow.quantity === 1 ? "pessoa" : "pessoas"}
                </p>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-lg font-semibold text-neutral-700 hover:bg-neutral-50"
                aria-label="Fechar"
              >
                ×
              </button>
            </div>

            <div className="booking-drawer__body">
              <div className="booking-drawer-grid">
                <div className="booking-drawer-box">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                    Cliente
                  </div>
                  <div className="mt-2 text-[15px] font-semibold text-[#1d1d1f]">
                    {drawerRow.customerName || "—"}
                  </div>
                  <div className="mt-2 space-y-1 text-[14px] text-neutral-700">
                    <div className="flex items-center justify-between gap-3">
                      <span className="truncate">{drawerRow.email || "—"}</span>
                      {drawerRow.email ? (
                        <button
                          type="button"
                          onClick={() => safeCopy(drawerRow.email)}
                          className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5 text-[13px] font-semibold hover:bg-neutral-50"
                        >
                          <Copy className="h-4 w-4" />
                          Copiar
                        </button>
                      ) : null}
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="truncate">{drawerRow.phone || "—"}</span>
                      {drawerRow.phone ? (
                        <button
                          type="button"
                          onClick={() => safeCopy(drawerRow.phone)}
                          className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5 text-[13px] font-semibold hover:bg-neutral-50"
                        >
                          <Copy className="h-4 w-4" />
                          Copiar
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="booking-drawer-box">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                    Referências
                  </div>
                  <div className="mt-2 space-y-2 text-[14px] text-neutral-700">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-neutral-500">Stripe</div>
                        <div className="break-all font-mono text-[13px] text-neutral-800">
                          {drawerRow.stripeSessionId}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyStripe(drawerRow.stripeSessionId)}
                        className="inline-flex h-9 items-center gap-2 rounded-full border border-black/10 bg-white px-3 text-[13px] font-semibold hover:bg-neutral-50"
                      >
                        <Copy className="h-4 w-4" />
                        {copiedId === drawerRow.stripeSessionId ? "Copiado" : "Copiar"}
                      </button>
                    </div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-neutral-500">Calendar event</div>
                        <div className="break-all font-mono text-[13px] text-neutral-800">
                          {drawerRow.eventId}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => safeCopy(drawerRow.eventId)}
                        className="inline-flex h-9 items-center gap-2 rounded-full border border-black/10 bg-white px-3 text-[13px] font-semibold hover:bg-neutral-50"
                      >
                        <Copy className="h-4 w-4" />
                        Copiar
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {drawerRow.notes ? (
                <div className="booking-drawer-notes">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                    Notas do cliente
                  </div>
                  <p className="mt-2 whitespace-pre-wrap text-[14px] leading-relaxed text-neutral-800">
                    {drawerRow.notes}
                  </p>
                </div>
              ) : null}

              <div className="booking-drawer-footer">
                {drawerRow.email ? (
                  <a
                    href={mailtoHref(drawerRow)}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-[#1d1d1f] px-5 py-2.5 font-semibold text-white no-underline hover:opacity-90 sm:w-auto"
                  >
                    <Mail className="h-4 w-4" />
                    Email
                  </a>
                ) : null}
                {drawerWa ? (
                  <a
                    href={drawerWa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-5 py-2.5 font-semibold text-white no-underline hover:brightness-95 sm:w-auto"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                ) : null}
                {telHref(drawerRow.phone) ? (
                  <a
                    href={telHref(drawerRow.phone) as string}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white px-5 py-2.5 font-semibold text-[#1d1d1f] no-underline hover:bg-neutral-50 sm:w-auto"
                  >
                    <Phone className="h-4 w-4" />
                    Ligar
                  </a>
                ) : null}
              </div>

              {drawerRow.approvalStatus === "pending" ? (
                <div className="mt-5 booking-approve">
                  <Button
                    type="button"
                    className="h-12 min-h-12 rounded-2xl text-[16px] font-semibold"
                    disabled={actingId === drawerRow.eventId}
                    onClick={() => void setApproval(drawerRow.eventId, "accepted")}
                  >
                    <Check className="mr-2 h-5 w-5" />
                    Aceitar viagem
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 min-h-12 rounded-2xl border-red-200 text-[16px] font-semibold text-red-700 hover:bg-red-50"
                    disabled={actingId === drawerRow.eventId}
                    onClick={() => void setApproval(drawerRow.eventId, "rejected")}
                  >
                    <X className="mr-2 h-5 w-5" />
                    Recusar
                  </Button>
                </div>
              ) : (
                <p className="mt-5 text-[14px] text-neutral-500">
                  Estado atual:{" "}
                  <strong className="text-[#1d1d1f]">
                    {drawerRow.approvalStatus === "accepted" ? "Aceite" : "Recusada"}
                  </strong>
                  .
                </p>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
