import type { Metadata } from "next";
import Link from "next/link";
import { ObrigadoThankYouClient } from "@/components/obrigado/ObrigadoThankYouClient";
import {
  firstNameForGreeting,
  getCustomerNameFromCheckoutSession,
} from "@/lib/obrigado-customer-name";
import { getBookingDetailsFromCheckoutSession } from "@/lib/obrigado-booking-details";
import { whatsappUrlAfterBooking } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Reserva confirmada | Discover Lixboa Tours",
  description:
    "Obrigado pela tua reserva. Confirma connosco os detalhes do tour por WhatsApp.",
};

type Props = { searchParams: Promise<{ session_id?: string }> };

export default async function ObrigadoPage({ searchParams }: Props) {
  const { session_id: sessionId } = await searchParams;
  const rawName = await getCustomerNameFromCheckoutSession(sessionId);
  const customerFirstName = rawName ? firstNameForGreeting(rawName) : null;
  const waHref = whatsappUrlAfterBooking(sessionId);
  const bookingDetails = await getBookingDetailsFromCheckoutSession(sessionId);

  return (
    <main className="reservar-main obrigado-main">
      <div className="reservar-shell">
        <Link href="/" className="reservar-back">
          <span data-translate="reservar_back">← Voltar ao site</span>
        </Link>

        <ObrigadoThankYouClient
          sessionId={sessionId}
          waHref={waHref}
          customerFirstName={customerFirstName}
          bookingDetails={bookingDetails}
        />
      </div>
    </main>
  );
}
