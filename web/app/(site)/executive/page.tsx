import type { Metadata } from "next";
import { ExecutivePage } from "@/components/executive/ExecutivePage";
import { getRequestLocale } from "@/lib/i18n/server";
import { getMessages } from "@/messages";
import "@/app/styles/executive.css";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const m = getMessages(locale);
  return {
    title:
      locale === "en"
        ? "DiscoverLixboaTours | Private Tours & Concierge — Executive"
        : "DiscoverLixboaTours | Tours Privados & Concierge — Executive",
    description: `${m.executive.heroH1}. ${m.executive.heroValue}`,
  };
}

export default function ExecutiveRoute() {
  return <ExecutivePage />;
}
