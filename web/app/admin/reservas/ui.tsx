"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
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

  function copyStripe(id: string) {
    void navigator.clipboard.writeText(id);
    setCopiedId(id);
    window.setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <div className="admin-dash space-y-8">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-2xl border border-amber-200/80 bg-amber-50/90 px-4 py-4 text-center shadow-sm">
          <div className="text-[0.72rem] font-semibold uppercase tracking-wide text-amber-800/90">
            Por tratar
          </div>
          <div className="mt-1 text-3xl font-semibold tabular-nums text-amber-950">{stats.p}</div>
        </div>
        <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/90 px-4 py-4 text-center shadow-sm">
          <div className="text-[0.72rem] font-semibold uppercase tracking-wide text-emerald-900/80">
            Aceites
          </div>
          <div className="mt-1 text-3xl font-semibold tabular-nums text-emerald-950">{stats.a}</div>
        </div>
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-4 text-center shadow-sm">
          <div className="text-[0.72rem] font-semibold uppercase tracking-wide text-neutral-600">
            Recusadas
          </div>
          <div className="mt-1 text-3xl font-semibold tabular-nums text-neutral-900">{stats.r}</div>
        </div>
        <div className="rounded-2xl border border-black/8 bg-white px-4 py-4 text-center shadow-sm">
          <div className="text-[0.72rem] font-semibold uppercase tracking-wide text-neutral-500">
            Total
          </div>
          <div className="mt-1 text-3xl font-semibold tabular-nums text-[#1d1d1f]">{stats.total}</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {(["pending", "accepted", "rejected", "all"] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              "min-h-11 rounded-full px-5 text-[15px] font-semibold transition-all",
              filter === f
                ? "bg-[#1d1d1f] text-white shadow-md"
                : "bg-white text-[#555] shadow-sm ring-1 ring-black/8 hover:bg-neutral-50",
            )}
          >
            {FILTER_LABELS[f]}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Pesquisar nome, tour, data, email, telefone…"
          className="h-14 min-h-14 flex-1 rounded-2xl border border-black/10 bg-white px-5 text-[17px] shadow-sm placeholder:text-neutral-400"
        />
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="secondary"
            className="h-12 min-h-12 rounded-full px-5 text-[15px]"
            onClick={enableNotifications}
          >
            Notificações
          </Button>
          <Button
            type="button"
            className="h-12 min-h-12 rounded-full px-5 text-[15px]"
            onClick={() => refresh(true)}
            disabled={loading}
          >
            <RefreshCw className={cn("mr-2 h-4 w-4", loading && "animate-spin")} />
            {loading ? "A atualizar…" : "Atualizar"}
          </Button>
        </div>
      </div>

      {err ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-[15px] font-medium text-red-900">
          {err}
        </div>
      ) : null}

      <div className="space-y-5">
        {filtered.length === 0 ? (
          <div className="rounded-[22px] border border-dashed border-black/12 bg-white/80 px-8 py-16 text-center">
            <p className="text-[17px] font-medium text-[#555]">Nenhuma reserva neste filtro.</p>
            <p className="mt-2 text-[15px] text-neutral-500">
              Altera o separador ou limpa a pesquisa.
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
                className="overflow-hidden rounded-[22px] border border-black/[0.08] bg-white shadow-[0_8px_40px_rgba(0,0,0,0.06)]"
              >
                <div className="flex flex-col gap-5 p-5 sm:p-7">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-3 py-1 text-[12px] font-bold uppercase tracking-wide",
                            r.approvalStatus === "pending" &&
                              "bg-amber-100 text-amber-900 ring-1 ring-amber-200/80",
                            r.approvalStatus === "accepted" &&
                              "bg-emerald-100 text-emerald-900 ring-1 ring-emerald-200/80",
                            r.approvalStatus === "rejected" &&
                              "bg-neutral-200/80 text-neutral-800 ring-1 ring-neutral-300/80",
                          )}
                        >
                          {r.approvalStatus === "pending" && "Por confirmar"}
                          {r.approvalStatus === "accepted" && "Aceite"}
                          {r.approvalStatus === "rejected" && "Recusada"}
                        </span>
                        <span className="text-[15px] font-semibold text-[#ff6600]">
                          {formatMoney(r.totalCents, r.currency)}
                        </span>
                      </div>
                      <h3 className="font-[family-name:var(--font-outfit)] text-[1.35rem] font-bold leading-tight tracking-tight text-[#1d1d1f] sm:text-[1.5rem]">
                        {r.tourLabel}
                      </h3>
                      <p className="text-[15px] leading-relaxed text-[#555]">
                        <span className="font-semibold text-[#1d1d1f]">{r.customerName}</span>
                        {" · "}
                        {formatDateLong(r.preferredDate)}
                        {" · "}
                        {r.quantity} {r.quantity === 1 ? "pessoa" : "pessoas"}
                      </p>
                    </div>
                  </div>

                  {r.notes ? (
                    <div className="rounded-2xl bg-neutral-50 px-4 py-3 text-[15px] leading-relaxed text-[#444] ring-1 ring-black/5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                        Notas do cliente
                      </span>
                      <p className="mt-1">{r.notes}</p>
                    </div>
                  ) : null}

                  <div className="flex flex-wrap gap-2 text-[15px]">
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
                    <div className="flex flex-col gap-3 border-t border-black/[0.06] pt-5 sm:flex-row">
                      <Button
                        type="button"
                        className="h-12 min-h-12 flex-1 rounded-2xl text-[16px] font-semibold sm:max-w-xs"
                        disabled={busy}
                        onClick={() => setApproval(r.eventId, "accepted")}
                      >
                        <Check className="mr-2 h-5 w-5" />
                        Aceitar viagem
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="h-12 min-h-12 flex-1 rounded-2xl border-red-200 text-[16px] font-semibold text-red-700 hover:bg-red-50 sm:max-w-xs"
                        disabled={busy}
                        onClick={() => setApproval(r.eventId, "rejected")}
                      >
                        <X className="mr-2 h-5 w-5" />
                        Recusar
                      </Button>
                    </div>
                  ) : (
                    <p className="border-t border-black/[0.06] pt-4 text-[14px] text-neutral-500">
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
    </div>
  );
}
