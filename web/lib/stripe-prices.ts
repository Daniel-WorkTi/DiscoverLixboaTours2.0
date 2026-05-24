/**
 * STRIPE_PRICE_MAP (Vercel ou .env.local): JSON tourId → `price_...` OU `prod_...`.
 * - price_: usado diretamente no Checkout.
 * - prod_: o servidor obtém o preço predefinido do produto (default_price) ou o 1.º preço ativo.
 */

import type Stripe from "stripe";
import { MAX_TOUR_PASSENGERS } from "@/lib/vehicle-capacity";

type PriceLikeId = `price_${string}` | `prod_${string}`;

/** Pode ser um id Stripe simples, ou um mapa de faixas por quantidade. */
type TourStripeMapping =
  | PriceLikeId
  | Record<string, PriceLikeId>;

let cached: Record<string, TourStripeMapping> | null = null;
let lastParseError: string | null = null;

/** Aspas “curvas”, BOM e valor guardado como string JSON dupla no painel de env. */
function normalizeStripePriceMapRaw(raw: string): string {
  let s = raw.trim().replace(/[\u200b-\u200d\ufeff]/g, "");
  if (s.charCodeAt(0) === 0xfeff) s = s.slice(1);
  s = s.replace(/[\u201c\u201d\u2018\u2019]/g, '"');
  if (s.length >= 2 && s.startsWith('"') && s.endsWith('"')) {
    try {
      const inner = JSON.parse(s) as unknown;
      if (typeof inner === "string") return inner.trim();
    } catch {
      /* manter s */
    }
  }
  return s;
}

/**
 * Erros comuns ao colar no env: falta `{`/`}`, vírgula a mais, quebras de linha.
 */
function repairStripePriceMapJson(s: string): string {
  let t = s.replace(/\r\n|\r|\n/g, "").trim();
  t = t.replace(/,\s*([}])/g, "$1");
  if (!t.startsWith("{")) {
    if (/^[\w-]+"\s*:\s*"(?:price_|prod_)/i.test(t)) {
      t = `{${t}`;
    }
  }
  if (!t.endsWith("}")) {
    t = t.replace(/,\s*$/, "");
    if (!t.endsWith("}")) t = `${t}}`;
  }
  return t;
}

function tryParseMapJson(s: string): Record<string, TourStripeMapping> | null {
  const attempts = [s, repairStripePriceMapJson(s)];
  const seen = new Set<string>();
  for (const attempt of attempts) {
    const key = attempt;
    if (seen.has(key)) continue;
    seen.add(key);
    try {
      const parsed = JSON.parse(attempt) as Record<string, TourStripeMapping>;
      if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) {
        return parsed;
      }
    } catch {
      /* próximo */
    }
  }
  return null;
}

function loadMap(): Record<string, TourStripeMapping> {
  if (cached) return cached;
  const raw = process.env.STRIPE_PRICE_MAP?.trim();
  if (!raw) {
    lastParseError = null;
    cached = {};
    return cached;
  }
  const normalized = normalizeStripePriceMapRaw(raw);
  const parsed = tryParseMapJson(normalized);
  if (parsed) {
    lastParseError = null;
    cached = parsed;
  } else {
    lastParseError = "JSON inválido após normalização";
    console.error(
      "[stripe-prices] STRIPE_PRICE_MAP não é JSON válido. Início:",
      normalized.slice(0, 160),
    );
    cached = {};
  }
  return cached;
}

/** Se o valor em env existe mas o JSON falhou ao dar parse (vês isto nos logs da Vercel). */
export function getStripePriceMapParseError(): string | null {
  loadMap();
  return lastParseError;
}

function isPriceLikeId(v: unknown): v is PriceLikeId {
  return (
    typeof v === "string" &&
    (v.startsWith("price_") || v.startsWith("prod_"))
  );
}

/** Valor bruto no mapa, se existir e for válido. */
export function getTourStripeMapping(
  tourId: string,
): TourStripeMapping | undefined {
  const v = loadMap()[tourId];
  if (!v) return undefined;
  if (isPriceLikeId(v)) return v;
  if (typeof v === "object" && v !== null && !Array.isArray(v)) {
    const obj = v as Record<string, unknown>;
    // valida se parece um mapa de tiers
    const entries = Object.entries(obj);
    if (entries.length === 0) return undefined;
    if (entries.every(([, val]) => isPriceLikeId(val))) {
      return obj as Record<string, PriceLikeId>;
    }
  }
  return undefined;
}

/** @deprecated usar getTourStripeMapping */
export function getStripePriceId(tourId: string): string | undefined {
  const v = getTourStripeMapping(tourId);
  return typeof v === "string" && v.startsWith("price_") ? v : undefined;
}

export function isConfiguredTour(tourId: string): boolean {
  return getTourStripeMapping(tourId) !== undefined;
}

type Tier = { min: number; max: number; id: PriceLikeId };

function parseTierKey(key: string): { min: number; max: number } | null {
  const k = key.trim();
  // "3" (exato)
  if (/^\d+$/.test(k)) {
    const n = Number(k);
    return n > 0 ? { min: n, max: n } : null;
  }
  // "3-5"
  const m = k.match(/^(\d+)\s*-\s*(\d+)$/);
  if (m) {
    const a = Number(m[1]);
    const b = Number(m[2]);
    if (a > 0 && b > 0 && a <= b) return { min: a, max: b };
    return null;
  }
  // "5+"
  const p = k.match(/^(\d+)\s*\+$/);
  if (p) {
    const a = Number(p[1]);
    if (a > 0) return { min: a, max: Number.POSITIVE_INFINITY };
  }
  return null;
}

function pickTierId(
  tiers: Record<string, PriceLikeId>,
  quantity: number,
): PriceLikeId | undefined {
  const parsed: Tier[] = [];
  for (const [k, id] of Object.entries(tiers)) {
    const r = parseTierKey(k);
    if (!r) continue;
    parsed.push({ ...r, id });
  }
  // tenta match mais específico primeiro (faixas pequenas)
  parsed.sort((a, b) => (a.max - a.min) - (b.max - b.min));
  return parsed.find((t) => quantity >= t.min && quantity <= t.max)?.id;
}

async function resolveToPriceId(
  stripe: Stripe,
  raw: PriceLikeId,
  tourIdForLogs: string,
): Promise<string | undefined> {
  if (raw.startsWith("price_")) return raw;
  if (!raw.startsWith("prod_")) return undefined;

  try {
    const product = await stripe.products.retrieve(raw, {
      expand: ["default_price"],
    });
    const dp = product.default_price;
    if (typeof dp === "string") return dp;
    if (dp && typeof dp === "object" && "id" in dp) {
      const priceObj = dp as Stripe.Price;
      if (priceObj.type === "one_time") return priceObj.id;
      console.error(
        "[stripe-prices] default_price do produto não é pagamento único (one-time):",
        raw,
        "→ usa um price_... de one-time no STRIPE_PRICE_MAP ou corrige o produto no Stripe.",
      );
    }
    const prices = await stripe.prices.list({
      product: raw,
      active: true,
      limit: 20,
    });
    const oneTime = prices.data.find((p) => p.type === "one_time");
    if (oneTime?.id) return oneTime.id;
    if (prices.data.length > 0) {
      console.error(
        "[stripe-prices] Produto tem preços ativos mas nenhum é one-time (Checkout atual exige pagamento único):",
        raw,
        tourIdForLogs,
      );
    } else {
      console.error(
        "[stripe-prices] Produto sem preços ativos listados:",
        raw,
        tourIdForLogs,
      );
    }
    return undefined;
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error(
      "[stripe-prices] Erro ao resolver produto/preço (test/live e conta Stripe têm de coincidir):",
      { tourId: tourIdForLogs, productId: raw, message: msg },
    );
    return undefined;
  }
}

/** Resolve prod_ → price_ para Checkout (mode payment). */
export async function resolveStripePriceId(
  stripe: Stripe,
  tourId: string,
  quantity?: number,
): Promise<string | undefined> {
  const raw = getTourStripeMapping(tourId);
  if (!raw) return undefined;
  if (typeof raw === "string") {
    return await resolveToPriceId(stripe, raw, tourId);
  }
  const q = Math.max(1, Math.min(MAX_TOUR_PASSENGERS, Number(quantity) || 1));
  const picked = pickTierId(raw, q);
  if (!picked) {
    console.error(
      "[stripe-prices] Nenhuma faixa corresponde à quantidade; confirma STRIPE_PRICE_MAP:",
      { tourId, quantity: q, keys: Object.keys(raw).slice(0, 12) },
    );
    return undefined;
  }
  return await resolveToPriceId(stripe, picked, tourId);
}
