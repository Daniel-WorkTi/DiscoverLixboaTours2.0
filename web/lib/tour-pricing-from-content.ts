import { getMigratedTour } from "@/content/tours";
import type { TourDefinition } from "@/content/tours/types";
import type { PricingRule } from "@/lib/tour-pricing-table";

/**
 * Resolve preço a partir da definição migrada do tour (cêntimos).
 * Devolve null se o slug ainda não estiver migrado ou qty inválida.
 */
export function pricingRuleFromTourDefinition(
  tour: TourDefinition,
  qty: number,
): PricingRule | null {
  const q = Math.floor(Number(qty));
  if (!Number.isFinite(q) || q < tour.minGuests || q > tour.maxGuests) {
    return null;
  }
  const cents = tour.groupTotalsCents[q];
  if (typeof cents !== "number") return null;
  return { kind: "per_group", centsTotal: cents };
}

export function pricingRuleFromMigratedSlug(
  tourId: string,
  qty: number,
): PricingRule | null {
  const tour = getMigratedTour(tourId);
  if (!tour) return null;
  return pricingRuleFromTourDefinition(tour, qty);
}
