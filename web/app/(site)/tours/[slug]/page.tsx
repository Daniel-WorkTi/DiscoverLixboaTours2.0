import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getMigratedTour,
  isMigratedTourSlug,
  MIGRATED_TOUR_SLUGS,
} from "@/content/tours";
import { getCardFromPrice } from "@/content/tours/types";
import { TourPage } from "@/components/tours/TourPage";
import { getRequestLocale } from "@/lib/i18n/server";
import { htmlLang } from "@/lib/i18n/types";
import { withLocalePrefix } from "@/lib/i18n/locale";
import { BRAND_NAME } from "@/lib/brand";
import {
  GOOGLE_BUSINESS_RATING,
  getTourRating,
} from "@/lib/tour-ratings";
import { SITE_ORIGIN, socialMetadata } from "@/lib/seo";
import "@/app/styles/destino-tour.css";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return MIGRATED_TOUR_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = getMigratedTour(slug);
  if (!tour) return {};

  const locale = await getRequestLocale();
  const seo = tour.seo[locale];
  const bare = `/tours/${tour.slug}`;
  const canonical = SITE_ORIGIN + withLocalePrefix(bare, locale);
  const pt = SITE_ORIGIN + bare;
  const en = SITE_ORIGIN + `/en${bare}`;
  const es = SITE_ORIGIN + `/es${bare}`;

  return {
    title: { absolute: seo.title },
    description: seo.description,
    keywords:
      locale === "en"
        ? [
            "private tour Portugal",
            "day trip from Lisbon",
            tour.slug.replace(/-/g, " "),
            "English speaking guide",
            "hotel pickup Lisbon",
          ]
        : locale === "es"
          ? [
              "tour privado Portugal",
              "excursión desde Lisboa",
              tour.slug.replace(/-/g, " "),
              "guía local",
              "recogida hotel Lisboa",
            ]
          : undefined,
    alternates: {
      canonical,
      languages: {
        "pt-PT": pt,
        en,
        es,
        "x-default": en,
      },
    },
    ...socialMetadata({
      title: seo.title,
      description: seo.description,
      url: canonical,
      locale,
      images: [tour.heroImage],
    }),
  };
}

export default async function TourSlugPage({ params }: PageProps) {
  const { slug } = await params;
  if (!isMigratedTourSlug(slug)) notFound();

  const tour = getMigratedTour(slug);
  if (!tour) notFound();

  const locale = await getRequestLocale();
  const c = tour.content[locale];
  const pageUrl =
    SITE_ORIGIN + withLocalePrefix(`/tours/${tour.slug}`, locale);
  const price = getCardFromPrice(tour);
  const rating = getTourRating(tour.slug);
  const heroAbs = tour.heroImage.startsWith("http")
    ? tour.heroImage
    : `${SITE_ORIGIN}${tour.heroImage}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["TouristTrip", "Product", "Service"],
    name: c.title,
    description: tour.seo[locale].description,
    image: heroAbs,
    url: pageUrl,
    inLanguage: locale === "en" ? "en" : locale === "es" ? "es" : "pt-PT",
    brand: { "@type": "Brand", name: BRAND_NAME },
    provider: {
      "@type": "TravelAgency",
      name: BRAND_NAME,
      url: SITE_ORIGIN,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: GOOGLE_BUSINESS_RATING.score,
        bestRating: GOOGLE_BUSINESS_RATING.scoreOutOf,
        ratingCount: GOOGLE_BUSINESS_RATING.reviews,
      },
    },
    touristType: tour.privateTour ? "Private tour" : "Group tour",
    areaServed: {
      "@type": "Country",
      name: "Portugal",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: (price.cents / 100).toFixed(2),
      availability: "https://schema.org/InStock",
      url: pageUrl,
      eligibleQuantity: {
        "@type": "QuantitativeValue",
        minValue: tour.minGuests,
        maxValue: tour.maxGuests,
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: GOOGLE_BUSINESS_RATING.score,
      bestRating: GOOGLE_BUSINESS_RATING.scoreOutOf,
      ratingCount: rating.reviews,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <span className="sr-only" lang={htmlLang(locale)}>
        {tour.seo[locale].title}
      </span>
      <TourPage tour={tour} locale={locale} />
    </>
  );
}
