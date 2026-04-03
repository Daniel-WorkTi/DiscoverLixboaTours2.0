import type { Metadata } from "next";
import { ExecutivePage } from "@/components/executive/ExecutivePage";
import { HomeInteractions } from "@/components/HomeInteractions";
import { SiteClientEffects } from "@/components/SiteClientEffects";
import "../styles/executive.css";

export const metadata: Metadata = {
  title: "DiscoverLixboaTours | Private Tours & Concierge — Executive",
  description:
    "The Gold Standard of Private Travel in Portugal. Mercedes-Benz Vito 116 CDI Select 2023, signature tours, executive transfers e concierge. CEO Miguel Moreira — WhatsApp +351 934 483 351.",
};

export default function ExecutiveRoute() {
  return (
    <>
      <SiteClientEffects />
      <HomeInteractions />
      <ExecutivePage />
    </>
  );
}
