"use client";

import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

function isSafeAdminNextPath(v: string): boolean {
  return v === "/admin/reservas" || v === "/admin" || v.startsWith("/admin/");
}

type LoginFormProps = {
  /** Destino após login (validado no servidor). */
  redirectAfterLogin: string;
};

export function LoginForm({ redirectAfterLogin }: LoginFormProps) {
  const next = redirectAfterLogin;
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setErr(data.error || "Login failed.");
        return;
      }
      window.location.href = isSafeAdminNextPath(next) ? next : "/admin/reservas";
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Network error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <div className="space-y-2">
        <Label htmlFor="admin-pass">Palavra-passe</Label>
        <Input
          id="admin-pass"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          placeholder="••••••••"
          required
          className="h-14 rounded-2xl px-4 text-[17px]"
        />
      </div>

      {err ? (
        <Alert variant="destructive">
          <AlertTitle>Não foi possível entrar</AlertTitle>
          <AlertDescription>{err}</AlertDescription>
        </Alert>
      ) : null}

      <Button type="submit" className="w-full" size="lg" disabled={loading}>
        {loading ? "A entrar…" : "Entrar"}
      </Button>

      <Separator />

      <p className="text-center text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">
        Em produção, define{" "}
        <code className="rounded-md bg-black/[0.06] px-1 py-0.5 font-mono text-[11px] text-black/80">
          ADMIN_PASSWORD
        </code>{" "}
        e{" "}
        <code className="rounded-md bg-black/[0.06] px-1 py-0.5 font-mono text-[11px] text-black/80">
          ADMIN_AUTH_SECRET
        </code>{" "}
        nas variáveis do host (ex.: Vercel).
      </p>
    </form>
  );
}

