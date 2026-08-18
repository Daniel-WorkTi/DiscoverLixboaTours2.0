import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";
import { getRequestLocale } from "@/lib/i18n/server";
import { getMessages } from "@/messages";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const m = getMessages(locale);
  return {
    title:
      locale === "en"
        ? "DiscoverLixboaTours | Private Tours in Portugal"
        : "DiscoverLixboaTours | Tours Privados em Portugal",
    description: m.home.hero.subtitle1,
  };
}

export default function Page() {
  return <HomePage />;
}
