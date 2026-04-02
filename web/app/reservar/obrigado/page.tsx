import type { Metadata } from "next";
import Link from "next/link";
import { ObrigadoThankYouClient } from "@/components/obrigado/ObrigadoThankYouClient";
import { HomeInteractions } from "@/components/HomeInteractions";
import { SiteClientEffects } from "@/components/SiteClientEffects";
import { SiteHeader } from "@/components/SiteHeader";
import {
  firstNameForGreeting,
  getCustomerNameFromCheckoutSession,
} from "@/lib/obrigado-customer-name";
import { getBookingDetailsFromCheckoutSession } from "@/lib/obrigado-booking-details";
import { whatsappUrlAfterBooking } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Booking confirmed | Discover Lixboa Tours",
  description:
    "Thank you for your booking. Message us on WhatsApp to confirm the tour details.",
};

type Props = { searchParams: Promise<{ session_id?: string }> };

export default async function ObrigadoPage({ searchParams }: Props) {
  const { session_id: sessionId } = await searchParams;
  const rawName = await getCustomerNameFromCheckoutSession(sessionId);
  const customerFirstName = rawName ? firstNameForGreeting(rawName) : null;
  const waHref = whatsappUrlAfterBooking(sessionId);
  const bookingDetails = await getBookingDetailsFromCheckoutSession(sessionId);

  return (
    <>
      <SiteClientEffects />
      <HomeInteractions />
      <SiteHeader variant="site" />

      <main className="reservar-main obrigado-main">
        <div className="reservar-shell">
          <Link href="/" className="reservar-back">
            ← Back to site
          </Link>

          <ObrigadoThankYouClient
            sessionId={sessionId}
            waHref={waHref}
            customerFirstName={customerFirstName}
            bookingDetails={bookingDetails}
          />
        </div>
      </main>
    </>
  );
}
