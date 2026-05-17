import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY, DATA_PROCESSORS } from "@/lib/legal";
export const metadata: Metadata = {
  title: "Política de Privacidade | DiscoverLixboaTours",
  description:
    "Informação sobre tratamento de dados pessoais, finalidades, base legal, prazos de retenção e direitos dos titulares (SGPD/GDPR).",
};

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="legal-row">
      <div className="legal-row__k">{k}</div>
      <div className="legal-row__v">{v}</div>
    </div>
  );
}

export default function PrivacidadePage() {
  return (
    <main className="reservar-main">
        <div className="reservar-shell">
          <Link href="/" className="reservar-back">
            ← Voltar ao site
          </Link>

          <h1>Política de Privacidade</h1>
          <p className="reservar-lead">
            Como tratamos dados pessoais no âmbito das reservas e do apoio ao cliente (SGPD/GDPR).
          </p>

          <section className="legal-grid-info">
            <Row k="Responsável pelo tratamento" v={COMPANY.legalName} />
            <Row k="NIF" v={COMPANY.vatNumber} />
            <Row k="Morada" v={COMPANY.address} />
            <Row k="Email (privacidade)" v={COMPANY.privacyEmail} />
            <Row k="Âmbito" v={COMPANY.operatingCountries} />
          </section>

          <section className="legal-stack">
            <article className="legal-card">
              <h2 className="legal-card__title">Que dados recolhemos</h2>
              <div className="legal-card__content">
                <ul className="legal-list">
                  <li>Nome, email e telefone.</li>
                  <li>Tour escolhido, nº de pessoas e data preferida.</li>
                  <li>Notas do cliente (ex.: pickup, preferências, restrições).</li>
                  <li>Dados técnicos essenciais (cookies essenciais e logs de segurança).</li>
                </ul>
              </div>
            </article>

            <article className="legal-card">
              <h2 className="legal-card__title">Finalidades e bases legais</h2>
              <div className="legal-card__content">
                <p>
                  Gestão de reservas, comunicação com o cliente e, quando aplicável, cumprimento de
                  obrigações legais.
                </p>
                <p>
                  A base legal pode incluir execução de contrato (reserva), diligências
                  pré-contratuais, obrigação legal e interesse legítimo (segurança/prevenção de
                  fraude).
                </p>
              </div>
            </article>

            <article className="legal-card">
              <h2 className="legal-card__title">Subcontratantes</h2>
              <div className="legal-card__content">
                <p>Prestadores usados para operar o website e processar pagamentos:</p>
                <ul className="legal-processor-list">
                  {DATA_PROCESSORS.map((p) => (
                    <li key={p.name}>
                      <strong>{p.name}</strong>
                      <span className="muted"> — {p.purpose}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            <article className="legal-card">
              <h2 className="legal-card__title">Retenção</h2>
              <div className="legal-card__content">
                <p>{COMPANY.retentionBookings}</p>
              </div>
            </article>

            <article className="legal-card">
              <h2 className="legal-card__title">Direitos do titular</h2>
              <div className="legal-card__content">
                <p>
                  Pode exercer direitos de acesso, retificação, apagamento, limitação, oposição e
                  portabilidade (quando aplicável). Para pedidos SGPD, contacte-nos por email.
                </p>
                <div className="legal-actions">
                  <a
                    className="legal-btn legal-btn--primary"
                    href={`mailto:${COMPANY.privacyEmail}?subject=${encodeURIComponent("Pedido SGPD (Privacidade)")}`}
                  >
                    Enviar pedido por email
                  </a>
                  <Link className="legal-btn legal-btn--ghost" href="/cookies">
                    Política de Cookies
                  </Link>
                  <Link className="legal-btn legal-btn--ghost" href="/sgpd">
                    Direitos SGPD
                  </Link>
                </div>
                <p className="legal-meta">
                  Última atualização: {new Date().toISOString().slice(0, 10)}
                </p>
              </div>
            </article>
          </section>
        </div>
    </main>
  );
}
