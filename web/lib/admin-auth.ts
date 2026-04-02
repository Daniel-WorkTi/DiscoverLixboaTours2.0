import crypto from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "dl_admin";

function secret(): string {
  return (process.env.ADMIN_AUTH_SECRET || "").trim();
}

function password(): string {
  return (process.env.ADMIN_PASSWORD || "").trim();
}

function hmac(s: string): string {
  return crypto.createHmac("sha256", secret()).update(s).digest("hex");
}

export function isAdminAuthConfigured(): boolean {
  return Boolean(secret() && password());
}

export function verifyAdminPassword(input: string): boolean {
  const p = password();
  if (!p) return false;
  // constant-time compare to reduce timing signal
  const a = Buffer.from(p);
  const b = Buffer.from(String(input || ""));
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function adminSessionValue(): string {
  // we keep a simple signed payload to avoid server storage
  const issued = Date.now();
  const payload = `v1.${issued}`;
  const sig = hmac(payload);
  return `${payload}.${sig}`;
}

export function isCookieValueAuthenticated(cookieValue: string): boolean {
  const s = String(cookieValue || "");
  const parts = s.split(".");
  if (parts.length !== 3) return false;
  const payload = `${parts[0]}.${parts[1]}`;
  const sig = parts[2] || "";
  if (!secret()) return false;
  const expected = hmac(payload);
  // constant-time compare
  const a = Buffer.from(expected);
  const b = Buffer.from(sig);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export async function isAdminRequestAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  const v = jar.get(COOKIE_NAME)?.value || "";
  return isCookieValueAuthenticated(v);
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;

