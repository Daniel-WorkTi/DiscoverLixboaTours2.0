import type { Metadata } from "next";
import { ExecutivePage } from "@/components/executive/ExecutivePage";
import { SiteClientEffects } from "@/components/SiteClientEffects";
import "../styles/executive.css";

export const metadata: Metadata = {
  title: "Executive | Discover Portugal Tours",
  description:
    "Tours executivos em Portugal — privacidade, guias locais e itinerários sob medida. Reserva e contacto via WhatsApp.",
};

export default function ExecutiveRoute() {
  return (
    <>
      <SiteClientEffects />
      <ExecutivePage />
    </>
  );
}
