import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY } from "@/lib/legal";
export const metadata: Metadata = {
  title: "Política de Cookies | DiscoverLixboaTours",
  description:
    "Informação sobre cookies essenciais, armazenamento local e como gerir preferências no navegador.",
};

export default function CookiesPage() {
  return (
    <main className="reservar-main">
        <div className="reservar-shell">
          <Link href="/" className="reservar-back">
            ← Voltar ao site
          </Link>

          <h1>Política de Cookies</h1>
          <p className="reservar-lead">
            Usamos apenas cookies essenciais para funcionamento e segurança.
          </p>

          <section className="legal-stack">
            <article className="legal-card">
              <h2 className="legal-card__title">O que são cookies?</h2>
              <div className="legal-card__content">
                <p>
                  Cookies são pequenos ficheiros guardados no seu dispositivo que ajudam um website a
                  funcionar corretamente e, nalguns casos, a melhorar a experiência.
                </p>
              </div>
            </article>

            <article className="legal-card">
              <h2 className="legal-card__title">Cookies essenciais</h2>
              <div className="legal-card__content">
                <ul className="legal-list">
                  <li>Segurança e prevenção de abuso.</li>
                  <li>Preferências básicas (ex.: idioma) quando aplicável.</li>
                  <li>Funcionamento de formulários e navegação.</li>
                </ul>
              </div>
            </article>

            <article className="legal-card">
              <h2 className="legal-card__title">Como gerir cookies</h2>
              <div className="legal-card__content">
                <p>
                  Pode apagar ou bloquear cookies nas definições do seu navegador. Note que bloquear
                  cookies essenciais pode afetar o funcionamento do site.
                </p>
                <p>
                  Para questões, contacte:{" "}
                  <a className="font-semibold text-[#333] underline" href={`mailto:${COMPANY.privacyEmail}`}>
                    {COMPANY.privacyEmail}
                  </a>
                  .
                </p>
              </div>
            </article>

            <article className="legal-card">
              <h2 className="legal-card__title">Outros documentos</h2>
              <div className="legal-card__content">
                <div className="legal-actions">
                  <Link className="legal-btn legal-btn--primary" href="/privacidade">
                    Política de Privacidade
                  </Link>
                  <Link className="legal-btn legal-btn--ghost" href="/termos">
                    Termos e Condições
                  </Link>
                </div>
              </div>
            </article>
          </section>
        </div>
    </main>
  );
}
