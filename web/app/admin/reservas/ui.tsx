"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Row = {
  stripeSessionId: string;
  preferredDate: string;
  tourLabel: string;
  customerName: string;
  email: string;
  phone: string;
  quantity: number;
  totalCents?: number;
  currency?: string;
  createdAt?: string;
};

function formatMoney(totalCents?: number, currency?: string): string {
  if (typeof totalCents !== "number" || !Number.isFinite(totalCents)) return "—";
  const cur = (currency || "eur").toUpperCase();
  try {
    return new Intl.NumberFormat("en-GB", { style: "currency", currency: cur }).format(totalCents / 100);
  } catch {
    return `${(totalCents / 100).toFixed(2)} ${cur}`;
  }
}

export function BookingsClient() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [filter, setFilter] = useState("");
  const seen = useRef<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => {
      const hay = `${r.preferredDate} ${r.tourLabel} ${r.customerName} ${r.email} ${r.phone} ${r.stripeSessionId}`.toLowerCase();
      return hay.includes(q);
    });
  }, [rows, filter]);

  async function refresh(showToasts: boolean) {
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/bookings/recent", { cache: "no-store" });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; rows?: Row[]; error?: string };
      if (!res.ok || !data.ok) {
        setErr(data.error || `Request failed (${res.status}).`);
        return;
      }
      const next = data.rows || [];
      setRows(next);

      if (showToasts) {
        for (const r of next) {
          const key = r.stripeSessionId;
          if (seen.current.has(key)) continue;
          if (seen.current.size > 0) {
            // lightweight browser notification if allowed
            if ("Notification" in window && Notification.permission === "granted") {
              new Notification("New booking", {
                body: `${r.preferredDate} · ${r.tourLabel} · ${r.customerName} · ${r.quantity} · ${formatMoney(r.totalCents, r.currency)}`,
              });
            }
          }
          seen.current.add(key);
        }
      } else {
        for (const r of next) seen.current.add(r.stripeSessionId);
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Network error.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh(false);
    const t = window.setInterval(() => refresh(true), 10_000);
    return () => window.clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function enableNotifications() {
    if (!("Notification" in window)) return;
    if (Notification.permission === "granted") return;
    await Notification.requestPermission();
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch lg:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center">
          <Input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Pesquisar por nome, data, tour, email…"
            className="min-h-11 flex-1"
          />
          <Button variant="outline" onClick={() => setFilter("")} disabled={!filter} className="shrink-0">
            Limpar
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="secondary" onClick={enableNotifications} className="min-h-11">
            Notificações
          </Button>
          <Button onClick={() => refresh(true)} disabled={loading} className="min-h-11">
            {loading ? "A atualizar…" : "Atualizar"}
          </Button>
        </div>
      </div>

      {err ? (
        <div className="rounded-[14px] border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800">
          {err}
        </div>
      ) : null}

      <div className="grid gap-4">
        {filtered.length === 0 ? (
          <div className="rounded-[16px] border border-[#eee] bg-[#fafafa] p-8 text-center text-sm text-[#666]">
            Ainda não há reservas listadas.
          </div>
        ) : (
          filtered.map((r) => (
            <div
              key={r.stripeSessionId}
              className={cn(
                "rounded-[16px] border border-[#eee] bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)] sm:p-5",
                "transition-shadow hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)]",
              )}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <div className="font-[family-name:var(--font-outfit)] text-base font-extrabold text-[#333]">
                  {r.preferredDate} · {r.tourLabel}
                </div>
                <div className="text-base font-extrabold text-[#ff6600]">
                  {formatMoney(r.totalCents, r.currency)}
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2 text-sm text-[#555]">
                <span className="rounded-full bg-[#f5f5f5] px-3 py-1.5">
                  <strong className="text-[#333]">{r.customerName}</strong>
                </span>
                <span className="rounded-full bg-[#f5f5f5] px-3 py-1.5">{r.quantity} pessoas</span>
                <span className="rounded-full bg-[#f5f5f5] px-3 py-1.5">{r.email || "—"}</span>
                <span className="rounded-full bg-[#f5f5f5] px-3 py-1.5">{r.phone || "—"}</span>
              </div>

              <div className="mt-3 text-xs leading-relaxed text-[#999] break-all">
                Stripe: {r.stripeSessionId}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

