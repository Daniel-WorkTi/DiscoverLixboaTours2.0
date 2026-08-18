/**
 * Preços de booking/checkout — apenas via content/tours (fonte única).
 * Totais em cêntimos EUR.
 */

import { MAX_TOUR_PASSENGERS } from "@/lib/vehicle-capacity";
import { pricingRuleFromMigratedSlug } from "@/lib/tour-pricing-from-content";
import { getMigratedTour } from "@/content/tours";

export type PricingRule =
  | { kind: "per_person"; centsPerPerson: number }
  | { kind: "per_group"; centsTotal: number };

export type PriceEstimate =
  | {
      kind: "per_person";
      centsPerPerson: number;
      totalCents: number;
      label: string;
    }
  | {
      kind: "per_group";
      totalCents: number;
      label: string;
    }
  | null;

function parseGuestQty(qty: number): number | null {
  const q = Math.floor(Number(qty));
  if (!Number.isFinite(q) || q < 1 || q > MAX_TOUR_PASSENGERS) return null;
  return q;
}

function guestLabel(q: number): string {
  return q === 1 ? "1 pessoa" : `${q} pessoas`;
}

/**
 * Máximo de passageiros com preço comercial definido.
 * Capacidade física do van = MAX_TOUR_PASSENGERS (8) em todos os tours.
 */
export function getMaxBookablePassengers(_tourId: string): number {
  return MAX_TOUR_PASSENGERS;
}

/** Mínimo comercialmente reservável (vindo do tour migrado). */
export function getMinBookablePassengers(tourId: string): number {
  const tour = getMigratedTour(tourId);
  return tour?.minGuests ?? 1;
}

/** Tour com regra de preço no content. */
export function tourHasDynamicPricingTable(tourId: string): boolean {
  return getPricingRuleFromTable(tourId, getMinBookablePassengers(tourId)) !== null;
}

/** Regra para o Stripe Checkout (sem labels). */
export function getPricingRuleFromTable(
  tourId: string,
  qty: number,
): PricingRule | null {
  const q = parseGuestQty(qty);
  if (q === null) return null;
  return pricingRuleFromMigratedSlug(tourId, q);
}

/**
 * Estimativa para o formulário de reserva.
 * - Billing/total: sempre groupTotalsCents do content.
 * - UI “€/pessoa”: Math.round(total / q) quando priceDisplay === "person".
 */
export function estimateFromTable(tourId: string, quantity: number): PriceEstimate {
  const q = parseGuestQty(quantity);
  if (q === null) return null;
  const rule = getPricingRuleFromTable(tourId, q);
  if (!rule || rule.kind !== "per_group") return null;

  const tour = getMigratedTour(tourId);
  const label = guestLabel(q);

  if (tour?.priceDisplay === "person" && q > 1) {
    return {
      kind: "per_person",
      centsPerPerson: Math.round(rule.centsTotal / q),
      totalCents: rule.centsTotal,
      label,
    };
  }

  return {
    kind: "per_group",
    totalCents: rule.centsTotal,
    label,
  };
}
