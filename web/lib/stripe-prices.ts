/**
 * STRIPE_PRICE_MAP em .env.local: JSON tourId → `price_...` OU `prod_...`.
 * - price_: usado diretamente no Checkout.
 * - prod_: o servidor obtém o preço predefinido do produto (default_price) ou o 1.º preço ativo.
 */

import type Stripe from "stripe";

let cached: Record<string, string> | null = null;
let lastParseError: string | null = null;

/** Aspas “curvas”, BOM e valor guardado como string JSON dupla na Netlify. */
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
 * Erros comuns ao colar na Netlify: falta `{`/`}`, vírgula a mais, quebras de linha.
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

function tryParseMapJson(s: string): Record<string, string> | null {
  const attempts = [s, repairStripePriceMapJson(s)];
  const seen = new Set<string>();
  for (const attempt of attempts) {
    const key = attempt;
    if (seen.has(key)) continue;
    seen.add(key);
    try {
      const parsed = JSON.parse(attempt) as Record<string, string>;
      if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) {
        return parsed;
      }
    } catch {
      /* próximo */
    }
  }
  return null;
}

function loadMap(): Record<string, string> {
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

/** Se o valor em env existe mas o JSON falhou ao dar parse (vês isto nos logs Netlify). */
export function getStripePriceMapParseError(): string | null {
  loadMap();
  return lastParseError;
}

/** Valor bruto no mapa (price_ ou prod_), se existir e for válido. */
export function getTourStripeMapping(tourId: string): string | undefined {
  const id = loadMap()[tourId]?.trim();
  if (typeof id !== "string" || !id) return undefined;
  if (id.startsWith("price_") || id.startsWith("prod_")) return id;
  return undefined;
}

/** @deprecated usar getTourStripeMapping */
export function getStripePriceId(tourId: string): string | undefined {
  const v = getTourStripeMapping(tourId);
  return v?.startsWith("price_") ? v : undefined;
}

export function isConfiguredTour(tourId: string): boolean {
  return getTourStripeMapping(tourId) !== undefined;
}

/** Resolve prod_ → price_ para Checkout (mode payment). */
export async function resolveStripePriceId(
  stripe: Stripe,
  tourId: string,
): Promise<string | undefined> {
  const raw = getTourStripeMapping(tourId);
  if (!raw) return undefined;
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
        tourId,
      );
    } else {
      console.error(
        "[stripe-prices] Produto sem preços ativos listados:",
        raw,
        tourId,
      );
    }
    return undefined;
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error(
      "[stripe-prices] Erro ao resolver produto/preço (test/live e conta Stripe têm de coincidir):",
      { tourId, productId: raw, message: msg },
    );
    return undefined;
  }
}
