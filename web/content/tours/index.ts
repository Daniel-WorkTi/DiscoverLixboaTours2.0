import { alentejoTour } from "./alentejo";
import { algarveTour } from "./algarve";
import { arraabidaTour } from "./arraabida";
import { aveiroTour } from "./aveiro";
import { fatimaTomarTour } from "./fatima-tomar";
import { lisboaTour } from "./lisboa";
import { monsantoTour } from "./monsanto";
import { portoTour } from "./porto";
import { sintraCascaisTour } from "./sintra-cascais";
import { tresDestinosTour } from "./3-destinos";
import type { TourDefinition } from "./types";

/**
 * Tours migrados para App Router (SSR por locale).
 */
export const migratedTours = {
  lisboa: lisboaTour,
  "sintra-cascais": sintraCascaisTour,
  "fatima-tomar": fatimaTomarTour,
  monsanto: monsantoTour,
  porto: portoTour,
  algarve: algarveTour,
  arraabida: arraabidaTour,
  aveiro: aveiroTour,
  alentejo: alentejoTour,
  "3-destinos": tresDestinosTour,
} as const satisfies Record<string, TourDefinition>;

export type MigratedTourSlug = keyof typeof migratedTours;

export const MIGRATED_TOUR_SLUGS = Object.keys(
  migratedTours,
) as MigratedTourSlug[];

export function isMigratedTourSlug(slug: string): slug is MigratedTourSlug {
  return slug in migratedTours;
}

export function getMigratedTour(slug: string): TourDefinition | null {
  if (!isMigratedTourSlug(slug)) return null;
  return migratedTours[slug];
}

export function listMigratedTours(): TourDefinition[] {
  return MIGRATED_TOUR_SLUGS.map((s) => migratedTours[s]);
}

export type { TourDefinition, TourContent, TourItineraryItem } from "./types";
export {
  getFromPriceCents,
  getGroupTotalCents,
  getCardFromPrice,
} from "./types";
