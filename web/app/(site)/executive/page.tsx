import type { Metadata } from "next";
import { ExecutivePage } from "@/components/executive/ExecutivePage";
import "@/app/styles/executive.css";

export const metadata: Metadata = {
  title: "DiscoverLixboaTours | Private Tours & Concierge — Executive",
  description:
    "The Gold Standard of Private Travel in Portugal. Mercedes-Benz Vito 116 CDI Select (recent model), 8 seats — 7 passengers + driver. Signature tours, executive transfers e concierge. CEO Miguel Moreira — WhatsApp +351 934 483 351.",
};

export default function ExecutiveRoute() {
  return <ExecutivePage />;
}
