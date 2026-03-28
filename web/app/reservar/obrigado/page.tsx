import type { Metadata } from "next";
import Link from "next/link";
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

          <div className="obrigado-card">
            <div className="obrigado-card__icon" aria-hidden>
              ✓
            </div>
            <h1 className="obrigado-card__title">Reserva paga com sucesso</h1>
            <p className="obrigado-card__lead">
              Obrigado por escolheres a Discover Lixboa Tours. O pagamento foi processado de forma
              segura. A data que escolheste no formulário é a tua preferência — confirmamos os
              detalhes finais contigo.
            </p>
            <p className="obrigado-card__note">
              O recibo por email depende das definições da conta Stripe (em testes ou valores a 0€
              pode não ser enviado).
            </p>

            {sessionId ? (
              <p className="obrigado-card__ref">
                <span className="obrigado-card__ref-label">Referência do pagamento</span>
                <code className="obrigado-card__ref-code">{sessionId}</code>
              </p>
            ) : null}

            <div className="obrigado-card__actions">
              <a
                className="obrigado-btn obrigado-btn--whatsapp"
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="obrigado-btn__wa-icon" aria-hidden>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.123 1.035 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </span>
                Falar no WhatsApp
              </a>
              <Link className="obrigado-btn obrigado-btn--home" href="/">
                Voltar ao início
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
