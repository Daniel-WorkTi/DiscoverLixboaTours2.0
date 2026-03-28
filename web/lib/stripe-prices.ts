/**
 * STRIPE_PRICE_MAP em .env.local: JSON tourId → `price_...` OU `prod_...`.
 * - price_: usado diretamente no Checkout.
 * - prod_: o servidor obtém o preço predefinido do produto (default_price) ou o 1.º preço ativo.
 */

import type Stripe from "stripe";

let cached: Record<string, string> | null = null;

function loadMap(): Record<string, string> {
  if (cached) return cached;
  const raw = process.env.STRIPE_PRICE_MAP?.trim();
  if (!raw) {
    cached = {};
    return cached;
  }
  try {
    const parsed = JSON.parse(raw) as Record<string, string>;
    cached = typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    cached = {};
  }
  return cached;
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
      return (dp as Stripe.Price).id;
    }
    const prices = await stripe.prices.list({
      product: raw,
      active: true,
      limit: 10,
    });
    const oneTime = prices.data.find((p) => p.type === "one_time");
    return oneTime?.id ?? prices.data[0]?.id;
  } catch {
    return undefined;
  }
}
