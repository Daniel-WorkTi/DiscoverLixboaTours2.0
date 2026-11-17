import type { Locale } from "@/lib/i18n/types";
import { localizeDeepEnToEs, localizeEnToEs } from "@/lib/i18n/localize-en-es";
import type { TourContent, TourDefinition, TourSeo } from "./types";

/** Input dos ficheiros de tour (ES opcional — preenchido a partir do EN). */
export type TourDefinitionInput = Omit<TourDefinition, "content" | "seo" | "gallery"> & {
  gallery: {
    src: string;
    alt: { pt: string; en: string; es?: string };
  }[];
  content: { pt: TourContent; en: TourContent; es?: TourContent };
  seo: { pt: TourSeo; en: TourSeo; es?: TourSeo };
};

export function finalizeTour(tour: TourDefinitionInput): TourDefinition {
  const contentEs: TourContent =
    tour.content.es ?? localizeDeepEnToEs(tour.content.en);
  const seoEs: TourSeo = tour.seo.es ?? localizeDeepEnToEs(tour.seo.en);

  return {
    ...tour,
    gallery: tour.gallery.map((item) => ({
      src: item.src,
      alt: {
        pt: item.alt.pt,
        en: item.alt.en,
        es: item.alt.es ?? localizeEnToEs(item.alt.en),
      } satisfies Record<Locale, string>,
    })),
    content: {
      pt: tour.content.pt,
      en: tour.content.en,
      es: contentEs,
    },
    seo: {
      pt: tour.seo.pt,
      en: tour.seo.en,
      es: seoEs,
    },
  };
}
