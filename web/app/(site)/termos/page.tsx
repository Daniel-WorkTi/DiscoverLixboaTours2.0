import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY } from "@/lib/legal";
export const metadata: Metadata = {
  title: "Termos e Condições | DiscoverLixboaTours",
  description:
    "Termos de utilização do site, reservas, pagamentos e regras gerais do serviço.",
};

export default function TermosPage() {
  return (
    <main className="reservar-main">
        <div className="reservar-shell">
          <Link href="/" className="reservar-back">
            ← Voltar ao site
          </Link>

          <h1>Termos e Condições</h1>
          <p className="reservar-lead">Termos gerais aplicáveis ao uso do website e às reservas.</p>

          <section className="legal-stack">
            <article className="legal-card">
              <h2 className="legal-card__title">Identificação</h2>
              <div className="legal-card__content">
                <p>
                  Este website é operado por <strong>{COMPANY.legalName}</strong>, NIF{" "}
                  <strong>{COMPANY.vatNumber}</strong>, com sede em <strong>{COMPANY.address}</strong>.
                </p>
              </div>
            </article>

            <article className="legal-card">
              <h2 className="legal-card__title">Reservas e pagamentos</h2>
              <div className="legal-card__content">
                <ul className="legal-list">
                  <li>As reservas podem depender de disponibilidade.</li>
                  <li>Os pagamentos são processados por prestador externo (ex.: Stripe).</li>
                  <li>Detalhes finais (horário/pickup) são confirmados por contacto com o cliente.</li>
                </ul>
              </div>
            </article>

            <article className="legal-card">
              <h2 className="legal-card__title">Cancelamentos e alterações</h2>
              <div className="legal-card__content">
                <p>
                  As condições podem variar por tour/serviço e serão confirmadas no momento da reserva.
                  Para alterar uma reserva, contacte-nos o quanto antes.
                </p>
              </div>
            </article>

            <article className="legal-card">
              <h2 className="legal-card__title">Limitação de responsabilidade</h2>
              <div className="legal-card__content">
                <p>
                  Não nos responsabilizamos por atrasos decorrentes de fatores externos (trânsito,
                  condições meteorológicas, encerramentos de locais, etc.). Sempre que possível,
                  propomos alternativas equivalentes.
                </p>
              </div>
            </article>

            <article className="legal-card">
              <h2 className="legal-card__title">Contactos</h2>
              <div className="legal-card__content">
                <p>
                  Para questões:{" "}
                  <a className="font-semibold underline" href={`mailto:${COMPANY.privacyEmail}`}>
                    {COMPANY.privacyEmail}
                  </a>
                  {COMPANY.phone ? ` · ${COMPANY.phone}` : null}
                </p>
              </div>
            </article>

            <article className="legal-card">
              <h2 className="legal-card__title">Documentos relacionados</h2>
              <div className="legal-card__content">
                <div className="legal-actions">
                  <Link className="legal-btn legal-btn--primary" href="/privacidade">
                    Privacidade (SGPD)
                  </Link>
                  <Link className="legal-btn legal-btn--ghost" href="/cookies">
                    Cookies
                  </Link>
                </div>
              </div>
            </article>
          </section>
        </div>
    </main>
  );
}
