import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY } from "@/lib/legal";
import { withLocalePrefix } from "@/lib/i18n/locale";
import { getRequestLocale } from "@/lib/i18n/server";
import { getLegalMessages } from "@/messages/legal";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const m = getLegalMessages(locale).cookies;
  return { title: m.metaTitle, description: m.metaDescription };
}

export default async function CookiesPage() {
  const locale = await getRequestLocale();
  const L = getLegalMessages(locale);
  const m = L.cookies;

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
            <h2 className="legal-card__title">{m.whatTitle}</h2>
            <div className="legal-card__content">
              <p>{m.whatP}</p>
            </div>
          </article>

          <article className="legal-card">
            <h2 className="legal-card__title">{m.essentialTitle}</h2>
            <div className="legal-card__content">
              <ul className="legal-list">
                {m.essentialItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </article>

          <article className="legal-card">
            <h2 className="legal-card__title">{m.manageTitle}</h2>
            <div className="legal-card__content">
              <p>{m.manageP1}</p>
              <p>
                {m.manageP2Prefix}{" "}
                <a
                  className="font-semibold text-[#333] underline"
                  href={`mailto:${COMPANY.privacyEmail}`}
                >
                  {COMPANY.privacyEmail}
                </a>
                .
              </p>
            </div>
          </article>

          <article className="legal-card">
            <h2 className="legal-card__title">{m.otherTitle}</h2>
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
                  href={withLocalePrefix("/termos", locale)}
                >
                  {m.linkTerms}
                </Link>
              </div>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
