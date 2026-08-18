import type { Metadata } from "next";
import { BookingForm } from "@/components/reservar/BookingForm";
import { ReservarBackLink } from "@/components/reservar/ReservarBackLink";
import { getRequestLocale } from "@/lib/i18n/server";
import { getMessages } from "@/messages";

type PageProps = {
  searchParams: Promise<{ tour?: string | string[] }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const m = getMessages(locale);
  return {
    title: `${m.booking.title} | DiscoverLixboaTours`,
    description: m.booking.lead,
  };
}

export default async function ReservarPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const raw = sp.tour;
  const tourFromUrl =
    typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : undefined;
  const locale = await getRequestLocale();
  const m = getMessages(locale);

  return (
    <main className="reservar-main">
      <div className="reservar-shell">
        <ReservarBackLink />
        <h1>{m.booking.title}</h1>
        <p className="reservar-lead">{m.booking.lead}</p>
        <BookingForm key={tourFromUrl ?? "_"} initialTourId={tourFromUrl} />
      </div>
    </main>
  );
}
