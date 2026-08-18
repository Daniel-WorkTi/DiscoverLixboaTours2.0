import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY } from "@/lib/legal";
import { withLocalePrefix } from "@/lib/i18n/locale";
import { getRequestLocale } from "@/lib/i18n/server";
import { getLegalMessages } from "@/messages/legal";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const m = getLegalMessages(locale).sgpd;
  return { title: m.metaTitle, description: m.metaDescription };
}

export default async function SgpdPage() {
  const locale = await getRequestLocale();
  const L = getLegalMessages(locale);
  const m = L.sgpd;

  return (
    <main className="reservar-main">
      <div className="reservar-shell">
        <Link href={withLocalePrefix("/", locale)} className="reservar-back">
          {L.back}
        </Link>

        <h1>{m.title}</h1>
        <p className="reservar-lead">{m.lead}</p>

        <section className="legal-stack">
          <article className="legal-card">
            <h2 className="legal-card__title">{m.rightsTitle}</h2>
            <div className="legal-card__content">
              <ul className="legal-list">
                {m.rightsItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </article>

          <article className="legal-card">
            <h2 className="legal-card__title">{m.howTitle}</h2>
            <div className="legal-card__content">
              <p>
                {m.howIntro} <strong>{COMPANY.privacyEmail}</strong> {m.howIntroSuffix}
              </p>
              <ul className="legal-list">
                {m.howItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="legal-actions">
                <a
                  className="legal-btn legal-btn--primary"
                  href={`mailto:${COMPANY.privacyEmail}?subject=${encodeURIComponent(m.emailSubject)}`}
                >
                  {m.emailCta}
                </a>
                <Link
                  className="legal-btn legal-btn--ghost"
                  href={withLocalePrefix("/privacidade", locale)}
                >
                  {m.linkPrivacy}
                </Link>
              </div>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
