"use client";

import { useState } from "react";
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
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="space-y-2">
        <Label htmlFor="admin-pass">Password</Label>
        <Input
          id="admin-pass"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          placeholder="••••••••"
          required
        />
      </div>

      {err ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
          {err}
        </p>
      ) : null}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Signing in…" : "Sign in"}
      </Button>

      <p className="text-xs text-black/50">
        Tip: set <code className="rounded bg-black/5 px-1 py-0.5">ADMIN_PASSWORD</code> and{" "}
        <code className="rounded bg-black/5 px-1 py-0.5">ADMIN_AUTH_SECRET</code> in your deploy.
      </p>
    </form>
  );
}

