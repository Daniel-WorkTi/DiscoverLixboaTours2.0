import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";
import { BRAND_SITE_URL } from "@/lib/brand";
import { withLocalePrefix } from "@/lib/i18n/locale";
import { getRequestLocale } from "@/lib/i18n/server";
import { getMessages } from "@/messages";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const m = getMessages(locale);
  const origin = BRAND_SITE_URL.replace(/\/$/, "");
  const canonical = origin + withLocalePrefix("/", locale);
  return {
    title:
      locale === "en"
        ? "DiscoverLixboaTours | Private Tours in Portugal"
        : "DiscoverLixboaTours | Tours Privados em Portugal",
    description: m.home.hero.subtitle1,
    alternates: {
      canonical,
      languages: {
        "pt-PT": `${origin}/`,
        en: `${origin}/en`,
        "x-default": `${origin}/en`,
      },
    },
  };
}

export default function Page() {
  return <HomePage />;
}
