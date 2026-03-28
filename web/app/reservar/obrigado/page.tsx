import type { Metadata } from "next";
import Link from "next/link";
import { HomeInteractions } from "@/components/HomeInteractions";
import { SiteClientEffects } from "@/components/SiteClientEffects";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Pagamento concluído | Discover Portugal Tours",
  description: "Obrigado pela tua reserva.",
};

type Props = { searchParams: Promise<{ session_id?: string }> };

export default async function ObrigadoPage({ searchParams }: Props) {
  const { session_id: sessionId } = await searchParams;

  return (
    <>
      <SiteClientEffects />
      <HomeInteractions />
      <SiteHeader variant="site" />

      <main className="reservar-main obrigado-main">
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <h1
            style={{
              fontFamily: "var(--font-outfit), Outfit, sans-serif",
              color: "#333",
              marginBottom: "0.75rem",
            }}
          >
            Obrigado!
          </h1>
          <p style={{ color: "#555", lineHeight: 1.6, marginBottom: "1.5rem" }}>
            O pagamento foi processado pela Stripe. Receberás um email de confirmação. A data do
            tour será confirmada connosco (usamos a data que indicaste no formulário).
          </p>
          {sessionId ? (
            <p style={{ fontSize: "0.9rem", color: "#888", marginBottom: "1.5rem" }}>
              Referência: <code style={{ color: "#FF6600" }}>{sessionId}</code>
            </p>
          ) : null}
          <Link
            href="/"
            style={{
              display: "inline-block",
              color: "#fff",
              background: "linear-gradient(#fff2, #0001), #FF6600",
              padding: "0.85rem 1.75rem",
              borderRadius: 50,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Voltar ao início
          </Link>
        </div>
      </main>
    </>
  );
}
