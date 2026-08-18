import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY } from "@/lib/legal";
import { withLocalePrefix } from "@/lib/i18n/locale";
import { getRequestLocale } from "@/lib/i18n/server";
import { getLegalMessages } from "@/messages/legal";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const m = getLegalMessages(locale).terms;
  return { title: m.metaTitle, description: m.metaDescription };
}

export default async function TermosPage() {
  const locale = await getRequestLocale();
  const L = getLegalMessages(locale);
  const m = L.terms;

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
            <h2 className="legal-card__title">{m.idTitle}</h2>
            <div className="legal-card__content">
              <p
                dangerouslySetInnerHTML={{
                  __html: m.idHtml(COMPANY.legalName, COMPANY.vatNumber, COMPANY.address),
                }}
              />
            </div>
          </article>

          <article className="legal-card">
            <h2 className="legal-card__title">{m.bookingTitle}</h2>
            <div className="legal-card__content">
              <ul className="legal-list">
                {m.bookingItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </article>

          <article className="legal-card">
            <h2 className="legal-card__title">{m.cancelTitle}</h2>
            <div className="legal-card__content">
              <p>{m.cancelP}</p>
            </div>
          </article>

          <article className="legal-card">
            <h2 className="legal-card__title">{m.liabilityTitle}</h2>
            <div className="legal-card__content">
              <p>{m.liabilityP}</p>
            </div>
          </article>

          <article className="legal-card">
            <h2 className="legal-card__title">{m.contactTitle}</h2>
            <div className="legal-card__content">
              <p>
                {m.contactPrefix}{" "}
                <a className="font-semibold underline" href={`mailto:${COMPANY.privacyEmail}`}>
                  {COMPANY.privacyEmail}
                </a>
                {COMPANY.phone ? ` · ${COMPANY.phone}` : null}
              </p>
            </div>
          </article>

          <article className="legal-card">
            <h2 className="legal-card__title">{m.relatedTitle}</h2>
            <div className="legal-card__content">
              <div className="legal-actions">
                <Link
                  className="legal-btn legal-btn--primary"
                  href={withLocalePrefix("/privacidade", locale)}
                >
                  {m.linkPrivacy}
                </Link>
                <Link
                  className="legal-btn legal-btn--ghost"
                  href={withLocalePrefix("/cookies", locale)}
                >
                  {m.linkCookies}
                </Link>
              </div>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
