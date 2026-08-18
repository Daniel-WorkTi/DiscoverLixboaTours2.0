import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY } from "@/lib/legal";
import { withLocalePrefix } from "@/lib/i18n/locale";
import { getRequestLocale } from "@/lib/i18n/server";
import { getLegalMessages } from "@/messages/legal";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const m = getLegalMessages(locale).privacy;
  return { title: m.metaTitle, description: m.metaDescription };
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="legal-row">
      <div className="legal-row__k">{k}</div>
      <div className="legal-row__v">{v}</div>
    </div>
  );
}

export default async function PrivacidadePage() {
  const locale = await getRequestLocale();
  const L = getLegalMessages(locale);
  const m = L.privacy;
  const processors = [
    { name: "Stripe", purpose: L.processors.stripe },
    { name: "Google Calendar", purpose: L.processors.googleCalendar },
    { name: "Vercel", purpose: L.processors.vercel },
  ];

  return (
    <main className="reservar-main">
      <div className="reservar-shell">
        <Link href={withLocalePrefix("/", locale)} className="reservar-back">
          {L.back}
        </Link>

        <h1>{m.title}</h1>
        <p className="reservar-lead">{m.lead}</p>

        <section className="legal-grid-info">
          <Row k={m.rows.controller} v={COMPANY.legalName} />
          <Row k={m.rows.vat} v={COMPANY.vatNumber} />
          <Row k={m.rows.address} v={COMPANY.address} />
          <Row k={m.rows.email} v={COMPANY.privacyEmail} />
          <Row k={m.rows.scope} v={L.company.operatingCountries} />
        </section>

        <section className="legal-stack">
          <article className="legal-card">
            <h2 className="legal-card__title">{m.dataTitle}</h2>
            <div className="legal-card__content">
              <ul className="legal-list">
                {m.dataItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </article>

          <article className="legal-card">
            <h2 className="legal-card__title">{m.purposesTitle}</h2>
            <div className="legal-card__content">
              <p>{m.purposesP1}</p>
              <p>{m.purposesP2}</p>
            </div>
          </article>

          <article className="legal-card">
            <h2 className="legal-card__title">{m.processorsTitle}</h2>
            <div className="legal-card__content">
              <p>{L.processorsIntro}</p>
              <ul className="legal-processor-list">
                {processors.map((p) => (
                  <li key={p.name}>
                    <strong>{p.name}</strong>
                    <span className="muted"> — {p.purpose}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <article className="legal-card">
            <h2 className="legal-card__title">{m.retentionTitle}</h2>
            <div className="legal-card__content">
              <p>{L.company.retentionBookings}</p>
            </div>
          </article>

          <article className="legal-card">
            <h2 className="legal-card__title">{m.rightsTitle}</h2>
            <div className="legal-card__content">
              <p>{m.rightsP}</p>
              <div className="legal-actions">
                <a
                  className="legal-btn legal-btn--primary"
                  href={`mailto:${COMPANY.privacyEmail}?subject=${encodeURIComponent(m.emailSubject)}`}
                >
                  {m.emailCta}
                </a>
                <Link
                  className="legal-btn legal-btn--ghost"
                  href={withLocalePrefix("/cookies", locale)}
                >
                  {m.linkCookies}
                </Link>
                <Link
                  className="legal-btn legal-btn--ghost"
                  href={withLocalePrefix("/sgpd", locale)}
                >
                  {m.linkSgpd}
                </Link>
              </div>
              <p className="legal-meta">
                {L.lastUpdated}: {new Date().toISOString().slice(0, 10)}
              </p>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
