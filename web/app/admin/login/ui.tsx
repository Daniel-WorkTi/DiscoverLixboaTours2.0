"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function isSafeAdminNextPath(v: string): boolean {
  return v === "/admin/reservas" || v === "/admin" || v.startsWith("/admin/");
}

function loginErrorMessage(raw: string | undefined): string {
  const msg = (raw || "").trim();
  if (!msg) return "Não foi possível entrar. Tente novamente.";
  if (msg.includes("AUTH_NOT_CONFIGURED") || /not configured/i.test(msg)) {
    return "O login do admin ainda não está configurado no servidor. Defina ADMIN_PASSWORD e ADMIN_AUTH_SECRET nas variáveis de ambiente (ex.: Vercel) e faça um novo deploy.";
  }
  if (/invalid password/i.test(msg)) {
    return "Palavra-passe incorreta. Tente novamente.";
  }
  if (/network/i.test(msg)) {
    return "Erro de ligação. Verifique a internet e tente outra vez.";
  }
  return msg;
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
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        code?: string;
      };
      if (!res.ok || !data.ok) {
        setErr(loginErrorMessage(data.error || data.code));
        return;
      }
      window.location.href = isSafeAdminNextPath(next) ? next : "/admin/reservas";
    } catch (e2) {
      setErr(loginErrorMessage(e2 instanceof Error ? e2.message : "Network error"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="admin-login-form" onSubmit={onSubmit}>
      <div className="admin-login-field">
        <Label htmlFor="admin-pass">Palavra-passe</Label>
        <Input
          id="admin-pass"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          placeholder="••••••••"
          required
          className="admin-login-input"
          aria-invalid={err ? true : undefined}
          aria-describedby={err ? "admin-login-error" : undefined}
        />
      </div>

      {err ? (
        <div id="admin-login-error" className="admin-login-alert" role="alert">
          <p className="admin-login-alert__title">Não foi possível entrar</p>
          <p className="admin-login-alert__text">{err}</p>
        </div>
      ) : null}

      <Button type="submit" className="admin-login-submit w-full" size="lg" disabled={loading}>
        {loading ? "A entrar…" : "Entrar"}
      </Button>
    </form>
  );
}
