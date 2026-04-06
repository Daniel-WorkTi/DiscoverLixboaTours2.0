"use client";

import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    <form className="space-y-14" onSubmit={onSubmit}>
      <div className="space-y-3">
        <Label htmlFor="admin-pass">Palavra-passe</Label>
        <Input
          id="admin-pass"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          placeholder="••••••••"
          required
          className="h-14 rounded-2xl pr-5 text-[17px]"
          style={{ textIndent: 10 }}
        />
      </div>

      {err ? (
        <Alert variant="destructive">
          <AlertTitle>Não foi possível entrar</AlertTitle>
          <AlertDescription>{err}</AlertDescription>
        </Alert>
      ) : null}

      <div className="h-6" aria-hidden="true" />

      <Button type="submit" className="w-full" size="lg" disabled={loading}>
        {loading ? "A entrar…" : "Entrar"}
      </Button>
    </form>
  );
}

