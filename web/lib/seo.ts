import type { Metadata } from "next";
import { BRAND_NAME, BRAND_SITE_URL, BRAND_EMAIL } from "@/lib/brand";
import { COMPANY } from "@/lib/legal";
import { GOOGLE_BUSINESS_RATING, GOOGLE_REVIEWS_URL } from "@/lib/tour-ratings";
import type { Locale } from "@/lib/i18n/types";

/** Origem canónica sem trailing slash. */
export const SITE_ORIGIN = BRAND_SITE_URL.replace(/\/$/, "");

/** OG / Twitter default — marca + tours PT. */
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/assets/images/brand/logo-discover.png`;

export const SEO_HOME = {
  pt: {
    title: "Tours Privados em Portugal | DiscoverLixboaTours",
    description:
      "Tours privados em Sintra, Lisboa, Fátima, Arrábida e mais. Motorista-guia local, recolha no hotel ou aeroporto. Reserve online.",
  },
  en: {
    title: "Private Tours in Portugal from Lisbon | DiscoverLixboaTours",
    description:
      "Book private day trips from Lisbon: Sintra & Cascais, Fátima, Porto, Arrábida and more. English-speaking local driver-guide, hotel or airport pickup. Small groups up to 8.",
  },
  es: {
    title: "Tours Privados en Portugal desde Lisboa | DiscoverLixboaTours",
    description:
      "Reserva excursiones privadas desde Lisboa: Sintra y Cascais, Fátima, Oporto, Arrábida y más. Conductor-guía local, recogida en hotel o aeropuerto. Grupos de hasta 8.",
  },
} as const;

/**
 * Metadata partilhada (Open Graph + Twitter) para páginas de conteúdo.
 */
export function socialMetadata(input: {
  title: string;
  description: string;
  url: string;
  locale: Locale;
  images?: string[];
}): Pick<Metadata, "openGraph" | "twitter"> {
  const images = (input.images?.length ? input.images : [DEFAULT_OG_IMAGE]).map(
    (url) => (url.startsWith("http") ? url : `${SITE_ORIGIN}${url}`),
  );

  return {
    openGraph: {
      title: input.title,
      description: input.description,
      url: input.url,
      siteName: BRAND_NAME,
      locale:
        input.locale === "en"
          ? "en_US"
          : input.locale === "es"
            ? "es_ES"
            : "pt_PT",
      alternateLocale:
        input.locale === "en"
          ? ["pt_PT", "es_ES"]
          : input.locale === "es"
            ? ["pt_PT", "en_US"]
            : ["en_US", "es_ES"],
      type: "website",
      images: images.map((url) => ({ url, alt: BRAND_NAME })),
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images,
    },
  };
}

/** JSON-LD TravelAgency / LocalBusiness — home e páginas chave. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["TravelAgency", "LocalBusiness", "TouristInformationCenter"],
    "@id": `${SITE_ORIGIN}/#organization`,
    name: BRAND_NAME,
    legalName: COMPANY.legalName,
    url: SITE_ORIGIN,
    email: BRAND_EMAIL,
    telephone: COMPANY.phone,
    image: DEFAULT_OG_IMAGE,
    logo: `${SITE_ORIGIN}/assets/images/brand/logo-mark.png`,
    description: SEO_HOME.en.description,
    priceRange: "€€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Credit Card, Debit Card",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua dos Ourives, nº 24, Linhó",
      addressLocality: "Sintra",
      postalCode: "2710-333",
      addressRegion: "Lisboa",
      addressCountry: "PT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 38.8029,
      longitude: -9.3817,
    },
    areaServed: [
      { "@type": "Country", name: "Portugal" },
      { "@type": "City", name: "Lisbon" },
      { "@type": "City", name: "Sintra" },
      { "@type": "City", name: "Cascais" },
      { "@type": "City", name: "Porto" },
    ],
    knowsLanguage: ["en", "pt"],
    availableLanguage: ["English", "Portuguese"],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: GOOGLE_BUSINESS_RATING.score,
      bestRating: GOOGLE_BUSINESS_RATING.scoreOutOf,
      ratingCount: GOOGLE_BUSINESS_RATING.reviews,
    },
    sameAs: [GOOGLE_REVIEWS_URL],
  };
}

/** WebSite + potencial SearchAction implícito via páginas de tours. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_ORIGIN}/#website`,
    name: BRAND_NAME,
    url: SITE_ORIGIN,
    inLanguage: ["en", "pt-PT"],
    publisher: { "@id": `${SITE_ORIGIN}/#organization` },
    potentialAction: {
      "@type": "ReserveAction",
      target: `${SITE_ORIGIN}/en/reservar`,
      name: "Book a private tour",
    },
  };
}
