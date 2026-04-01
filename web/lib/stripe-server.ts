import Stripe from "stripe";

/** Alinhado com `stripe` npm (types/apiVersion.d.ts). */
const API_VERSION = "2026-03-25.dahlia" as const;

/** Aspas ou espaços ao colar a chave na Vercel são uma causa frequente de falha. */
function normalizeStripeSecret(raw: string | undefined): string | undefined {
  if (raw == null) return undefined;
  let s = raw.trim();
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    s = s.slice(1, -1).trim();
  }
  return s || undefined;
}

export function getStripe(): Stripe {
  const key = normalizeStripeSecret(process.env.STRIPE_SECRET_KEY);
  if (!key?.startsWith("sk_")) {
    const raw = process.env.STRIPE_SECRET_KEY;
    const detail =
      raw === undefined
        ? "variável não definida (Vercel → Environment Variables do projeto, ou .env.local em dev)"
        : raw.trim() === ""
          ? "valor vazio"
          : "valor não começa por sk_ — remove aspas à volta no painel do host";
    console.error("[stripe]", detail);
    throw new Error("STRIPE_SECRET_KEY em falta ou inválida.");
  }
  return new Stripe(key, {
    apiVersion: API_VERSION,
    /** Evita pedidos à API Stripe a ficarem pendentes sem limite (serverless). */
    timeout: 25000,
    maxNetworkRetries: 1,
  });
}
