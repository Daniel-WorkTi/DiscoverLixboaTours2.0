import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY } from "@/lib/legal";
import { HomeInteractions } from "@/components/HomeInteractions";
import { SiteClientEffects } from "@/components/SiteClientEffects";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Direitos SGPD | DiscoverLixboaTours",
  description:
    "Como exercer direitos SGPD/GDPR (acesso, retificação, apagamento, oposição, portabilidade) e como contactar.",
};

export default function SgpdPage() {
  return (
    <>
      <SiteClientEffects />
      <HomeInteractions />
      <SiteHeader variant="site" />

      <main className="reservar-main">
        <div className="reservar-shell">
          <Link href="/" className="reservar-back">
            ← Voltar ao site
          </Link>

          <h1>Direitos do Titular (SGPD)</h1>
          <p className="reservar-lead">
            Guia simples para exercer os seus direitos e pedir cópia/alteração/eliminação de dados.
          </p>

          <section className="legal-stack">
            <article className="legal-card">
              <h2 className="legal-card__title">Direitos</h2>
              <div className="legal-card__content">
                <ul className="legal-list">
                  <li>Acesso aos dados pessoais</li>
                  <li>Retificação</li>
                  <li>Apagamento (quando aplicável)</li>
                  <li>Limitação do tratamento</li>
                  <li>Oposição</li>
                  <li>Portabilidade (quando aplicável)</li>
                  <li>Retirar consentimento (quando aplicável)</li>
                </ul>
              </div>
            </article>

            <article className="legal-card">
              <h2 className="legal-card__title">Como pedir</h2>
              <div className="legal-card__content">
                <p>
                  Envie um email para <strong>{COMPANY.privacyEmail}</strong> indicando:
                </p>
                <ul className="legal-list">
                  <li>O direito que pretende exercer</li>
                  <li>O email/telefone usados na reserva (para localizar os dados)</li>
                  <li>Se possível, a referência do pagamento/reserva</li>
                </ul>
                <div className="legal-actions">
                  <a
                    className="legal-btn legal-btn--primary"
                    href={`mailto:${COMPANY.privacyEmail}?subject=${encodeURIComponent("Pedido SGPD")}`}
                  >
                    Enviar pedido SGPD
                  </a>
                  <Link className="legal-btn legal-btn--ghost" href="/privacidade">
                    Política de Privacidade
                  </Link>
                </div>
              </div>
            </article>
          </section>
        </div>
      </main>

      <SiteFooter variant="site" />
    </>
  );
}
