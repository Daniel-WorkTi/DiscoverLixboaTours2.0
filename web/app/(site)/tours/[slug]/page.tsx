import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getMigratedTour,
  isMigratedTourSlug,
  MIGRATED_TOUR_SLUGS,
} from "@/content/tours";
import { TourPage } from "@/components/tours/TourPage";
import { getRequestLocale } from "@/lib/i18n/server";
import { htmlLang } from "@/lib/i18n/types";
import { withLocalePrefix } from "@/lib/i18n/locale";
import { BRAND_SITE_URL } from "@/lib/brand";
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

  return (
    <>
      <span className="sr-only" lang={htmlLang(locale)}>
        {tour.seo[locale].title}
      </span>
      <TourPage tour={tour} locale={locale} />
    </>
  );
}
