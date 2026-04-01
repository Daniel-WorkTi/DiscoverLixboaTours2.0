import type { Metadata } from "next";
import Link from "next/link";
import { ObrigadoThankYouClient } from "@/components/obrigado/ObrigadoThankYouClient";
import { HomeInteractions } from "@/components/HomeInteractions";
import { SiteClientEffects } from "@/components/SiteClientEffects";
import { SiteHeader } from "@/components/SiteHeader";
import { whatsappUrlAfterBooking } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Reserva confirmada | Discover Lixboa Tours",
  description: "Obrigado pela tua reserva. Fala connosco no WhatsApp para alinhar o tour.",
};

type Props = { searchParams: Promise<{ session_id?: string }> };

export default async function ObrigadoPage({ searchParams }: Props) {
  const { session_id: sessionId } = await searchParams;
  const waHref = whatsappUrlAfterBooking(sessionId);

  return (
    <>
      <SiteClientEffects />
      <HomeInteractions />
      <SiteHeader variant="site" />

      <main className="reservar-main obrigado-main">
        <div className="reservar-shell">
          <Link href="/" className="reservar-back">
            ← Voltar ao site
          </Link>

          <ObrigadoThankYouClient sessionId={sessionId} waHref={waHref} />
        </div>
      </main>
    </>
  );
}
