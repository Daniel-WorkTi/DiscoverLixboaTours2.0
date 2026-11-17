import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";
import { withLocalePrefix } from "@/lib/i18n/locale";
import { getRequestLocale } from "@/lib/i18n/server";
import {
  organizationJsonLd,
  SEO_HOME,
  SITE_ORIGIN,
  socialMetadata,
  websiteJsonLd,
} from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const copy = SEO_HOME[locale];
  const canonical = SITE_ORIGIN + withLocalePrefix("/", locale);
  return {
    title: { absolute: copy.title },
    description: copy.description,
    alternates: {
      canonical,
      languages: {
        "pt-PT": `${SITE_ORIGIN}/`,
        en: `${SITE_ORIGIN}/en`,
        es: `${SITE_ORIGIN}/es`,
        "x-default": `${SITE_ORIGIN}/en`,
      },
    },
    ...socialMetadata({
      title: copy.title,
      description: copy.description,
      url: canonical,
      locale,
    }),
  };
}

export default function Page() {
  const org = organizationJsonLd();
  const site = websiteJsonLd();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([org, site]) }}
      />
      <HomePage />
    </>
  );
}
