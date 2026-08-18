import type { Metadata } from "next";
import Link from "next/link";
import { ObrigadoThankYouClient } from "@/components/obrigado/ObrigadoThankYouClient";
import {
  firstNameForGreeting,
  getCustomerNameFromCheckoutSession,
} from "@/lib/obrigado-customer-name";
import { getBookingDetailsFromCheckoutSession } from "@/lib/obrigado-booking-details";
import { getRequestLocale } from "@/lib/i18n/server";
import { withLocalePrefix } from "@/lib/i18n/locale";
import { getMessages } from "@/messages";
import { whatsappUrlAfterBooking } from "@/lib/whatsapp";

type Props = { searchParams: Promise<{ session_id?: string }> };

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const m = getMessages(locale);
  return {
    title:
      locale === "en"
        ? "Booking confirmed | Discover Lixboa Tours"
        : "Reserva confirmada | Discover Lixboa Tours",
    description: m.obrigado.leadBody,
  };
}

export default async function ObrigadoPage({ searchParams }: Props) {
  const { session_id: sessionId } = await searchParams;
  const locale = await getRequestLocale();
  const m = getMessages(locale);
  const rawName = await getCustomerNameFromCheckoutSession(sessionId);
  const customerFirstName = rawName ? firstNameForGreeting(rawName) : null;
  const waHref = whatsappUrlAfterBooking(sessionId);
  const bookingDetails = await getBookingDetailsFromCheckoutSession(sessionId);

  return (
    <main className="reservar-main obrigado-main">
      <div className="reservar-shell">
        <Link href={withLocalePrefix("/", locale)} className="reservar-back">
          <span>{m.booking.back}</span>
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
