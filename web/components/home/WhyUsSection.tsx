"use client";

import Image from "next/image";
import { useLocale, useMessages } from "@/lib/i18n/LocaleProvider";
import { withLocalePrefix } from "@/lib/i18n/locale";
import { whatsappSiteUrl } from "@/lib/whatsapp";

function WhyUsIcon({ src }: { src: string }) {
  return (
    <div className="why-us-card__icon why-us-card__icon--light" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="why-us-card__icon-img" />
    </div>
  );
}

export function WhyUsSection() {
  const locale = useLocale();
  const m = useMessages();
  const w = m.home.whyUs;
  const wa = whatsappSiteUrl();

  return (
    <section className="why-us-section" id="tours">
      <div className="why-us-container">
        <div className="why-us-header">
          <span className="why-us-badge">{w.badge}</span>
          <h2 className="why-us-title">{w.title}</h2>
          <p className="why-us-lead">{w.lead}</p>
        </div>

        <div className="why-us-bento">
          <div className="why-us-top">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="why-us-card why-us-card--featured"
            >
              <Image
                src="/assets/images/tourspersonalizado.jpg"
                alt=""
                fill
                sizes="460px"
                className="why-us-card__img"
                priority={false}
              />
              <div className="why-us-card__overlay" aria-hidden />
              <WhyUsIcon src="/assets/map-svgrepo-com.svg" />
              <div className="why-us-card__content why-us-card__content--light">
                <h3>{w.featured.title}</h3>
                <p>{w.featured.desc}</p>
              </div>
            </a>

            <div className="why-us-stack">
              <a
                href={withLocalePrefix("/tours/sintra-cascais", locale)}
                className="why-us-card why-us-card--photo why-us-card--plain"
              >
                <Image
                  src="/assets/images/jeepsection.webp"
                  alt=""
                  fill
                  sizes="794px"
                  className="why-us-card__img"
                />
                <div className="why-us-card__overlay" aria-hidden />
                <WhyUsIcon src="/assets/jeepsvg.svg" />
                <div className="why-us-card__content why-us-card__content--light">
                  <h3>{w.jeep.title}</h3>
                  <p>{w.jeep.desc}</p>
                </div>
              </a>

              <a
                href={withLocalePrefix("/tours/alentejo", locale)}
                className="why-us-card why-us-card--photo why-us-card--plain"
              >
                <Image
                  src="/assets/images/wineexperience.jpg"
                  alt=""
                  fill
                  sizes="794px"
                  className="why-us-card__img"
                />
                <div className="why-us-card__overlay" aria-hidden />
                <WhyUsIcon src="/assets/wine-glass-svgrepo-com.svg" />
                <div className="why-us-card__content why-us-card__content--light">
                  <h3>{w.wine.title}</h3>
                  <p>{w.wine.desc}</p>
                </div>
              </a>
            </div>
          </div>

          <div className="why-us-bottom">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="why-us-card why-us-card--media"
            >
              <Image
                src="/assets/images/tourcasal.jpg"
                alt=""
                fill
                sizes="794px"
                className="why-us-card__img"
              />
              <div className="why-us-card__overlay" aria-hidden />
              <WhyUsIcon src="/assets/couple-portrait-with-frame-svgrepo-com.svg" />
              <div className="why-us-card__content why-us-card__content--light">
                <h3>{w.romantic.title}</h3>
                <p>{w.romantic.desc}</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
