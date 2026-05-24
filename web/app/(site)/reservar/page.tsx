import type { Metadata } from "next";
import Link from "next/link";
import { BookingForm } from "@/components/reservar/BookingForm";

export const metadata: Metadata = {
  title: "Reservar | Discover Portugal Tours",
  description:
    "Escolha o tour, a data e a quantidade de pessoas. Pagamento seguro via Stripe Checkout.",
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
        <Link href="/" className="reservar-back">
          <span data-translate="reservar_back">← Voltar ao site</span>
        </Link>
        <h1 data-translate="reservar_h1">Reserva o teu tour</h1>
        <p className="reservar-lead" data-translate="reservar_lead">
          Escolhe destino, data e viajantes (até 8 passageiros). No passo seguinte confirmas os
          dados e segues para o pagamento seguro.
        </p>
        <BookingForm key={tourFromUrl ?? "_"} initialTourId={tourFromUrl} />
      </div>
    </main>
  );
}
