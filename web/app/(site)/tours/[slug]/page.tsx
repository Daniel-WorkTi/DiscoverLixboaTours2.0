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
import { BRAND_NAME, BRAND_SITE_URL } from "@/lib/brand";
import {
  GOOGLE_BUSINESS_RATING,
  getTourRating,
} from "@/lib/tour-ratings";
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
  const origin = BRAND_SITE_URL.replace(/\/$/, "");
  const bare = `/tours/${tour.slug}`;
  const canonical = origin + withLocalePrefix(bare, locale);
  const pt = origin + bare;
  const en = origin + `/en${bare}`;

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical,
      languages: {
        "pt-PT": pt,
        en,
        "x-default": en,
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      locale: locale === "en" ? "en_US" : "pt_PT",
      url: canonical,
      type: "website",
      images: [{ url: tour.heroImage }],
    },
  };
}

export default async function TourSlugPage({ params }: PageProps) {
  const { slug } = await params;
  if (!isMigratedTourSlug(slug)) notFound();

  const tour = getMigratedTour(slug);
  if (!tour) notFound();

  const locale = await getRequestLocale();
  const c = tour.content[locale];
  const origin = BRAND_SITE_URL.replace(/\/$/, "");
  const pageUrl = origin + withLocalePrefix(`/tours/${tour.slug}`, locale);
  const price = getCardFromPrice(tour);
  const rating = getTourRating(tour.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["TouristTrip", "Product"],
    name: c.title,
    description: tour.seo[locale].description,
    image: tour.heroImage.startsWith("http")
      ? tour.heroImage
      : `${origin}${tour.heroImage}`,
    url: pageUrl,
    brand: { "@type": "Brand", name: BRAND_NAME },
    provider: {
      "@type": "TravelAgency",
      name: BRAND_NAME,
      url: origin,
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: GOOGLE_BUSINESS_RATING.score,
        bestRating: GOOGLE_BUSINESS_RATING.scoreOutOf,
        ratingCount: GOOGLE_BUSINESS_RATING.reviews,
      },
    },
    touristType: tour.privateTour ? "Private tour" : "Group tour",
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
