import type { Metadata } from "next";
import { BookingForm } from "@/components/reservar/BookingForm";
import { ReservarBackLink } from "@/components/reservar/ReservarBackLink";

export const metadata: Metadata = {
  title: "Reservar | DiscoverLixboaTours",
  description:
    "Escolha o tour, a data e o número de passageiros. Pagamento seguro via Stripe Checkout.",
};

type PageProps = {
  searchParams: Promise<{ tour?: string | string[] }>;
};

export default async function ReservarPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const raw = sp.tour;
  const tourFromUrl =
    typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : undefined;

  return (
    <main className="reservar-main">
      <div className="reservar-shell">
        <ReservarBackLink />
        <h1 data-translate="reservar_h1">Reserve o seu tour privado</h1>
        <p className="reservar-lead" data-translate="reservar_lead">
          Escolha o destino, a data e o número de passageiros.
        </p>
        <BookingForm key={tourFromUrl ?? "_"} initialTourId={tourFromUrl} />
      </div>
    </main>
  );
}
