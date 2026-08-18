import type { Locale } from "@/lib/i18n/types";

export type TourItineraryItem = {
  /** Badge curto no timeline (ex.: Belém) — pode ser igual em ambos os idiomas. */
  badge: string;
  title: string;
  /** HTML permitido (br, strong, em) — conteúdo editorial controlado. */
  descriptionHtml: string;
};

export type TourContent = {
  /** H1 comercial */
  title: string;
  subtitle: string;
  aboutHtml: string[];
  itinerary: TourItineraryItem[];
  included: string[];
  notIncluded: string[];
  whyChooseHtml?: string;
  stopsLabel?: string;
  pickupHeading?: string;
  pickupItems?: {
    title: string;
    detail: string;
    highlight?: boolean;
  }[];
};

export type TourSeo = {
  title: string;
  description: string;
};

/**
 * Definição canónica de um tour.
 * Preços e capacidade são dados operacionais (não strings traduzidas).
 */
export type TourDefinition = {
  slug: string;
  maxGuests: number;
  minGuests: number;
  durationHours: number;
  privateTour: boolean;
  hotelPickup: boolean;
  /**
   * Totais do grupo em cêntimos EUR por nº de passageiros.
   * Fonte única para UI + Stripe (via adapter).
   */
  groupTotalsCents: Partial<Record<number, number>>;
  /** Como mostrar o “a partir de” na home / cards. */
  priceDisplay: "group" | "person";
  heroImage: string;
  gallery: { src: string; alt: Record<Locale, string> }[];
  videoYoutubeId?: string;
  content: Record<Locale, TourContent>;
  seo: Record<Locale, TourSeo>;
};

/** Menor total de grupo definido (para “A partir de”). */
export function getFromPriceCents(tour: TourDefinition): number {
  const values = Object.values(tour.groupTotalsCents).filter(
    (v): v is number => typeof v === "number" && v > 0,
  );
  if (!values.length) return 0;
  return Math.min(...values);
}

export function getGroupTotalCents(
  tour: TourDefinition,
  guests: number,
): number | null {
  const q = Math.floor(guests);
  if (q < tour.minGuests || q > tour.maxGuests) return null;
  const exact = tour.groupTotalsCents[q];
  if (typeof exact === "number") return exact;
  return null;
}
