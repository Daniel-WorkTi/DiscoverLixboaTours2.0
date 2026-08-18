"use client";

import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Armchair,
  Car,
  Compass,
  MapPin,
  MessageCircle,
  Plane,
  Sparkles,
  Users,
} from "lucide-react";
import { ExecutiveToursCarousel } from "@/components/executive/ExecutiveToursCarousel";
import { useLocale, useMessages } from "@/lib/i18n/LocaleProvider";
import { withLocalePrefix } from "@/lib/i18n/locale";
import { WHATSAPP_DISPLAY, whatsappSiteUrl } from "@/lib/whatsapp";

const WA_HREF = whatsappSiteUrl();
const SITE_HREF = "https://www.discoverlixboatours.com/";
const ASSET_VERSION = process.env.NEXT_PUBLIC_ASSET_VERSION?.trim() || "1";
const EXEC_SHOWCASE_IMG_V = process.env.NEXT_PUBLIC_EXEC_SHOWCASE_IMG_V?.trim() || "3";
const EXEC_TRANSFERS_IMG_V =
  process.env.NEXT_PUBLIC_EXEC_TRANSFERS_IMG_V?.trim() || "3";
const EXEC_CTA_IMG_V = process.env.NEXT_PUBLIC_EXEC_CTA_IMG_V?.trim() || "3";
const EXECUTIVE_HERO_IMAGE = "/assets/images/executive/banner.webp";
const EXECUTIVE_HERO_IMAGE_MOBILE =
  process.env.NEXT_PUBLIC_EXEC_HERO_MOBILE_IMAGE?.trim() ||
  "/assets/images/executive/mobile-img/hero.png";
const EXEC_HERO_MOBILE_V = process.env.NEXT_PUBLIC_EXEC_HERO_MOBILE_V?.trim() || "1";
const EXECUTIVE_STORY_IMAGE = "/assets/images/executive/car.png";
const EXECUTIVE_STORY_IMAGE_MOBILE =
  process.env.NEXT_PUBLIC_EXEC_STORY_MOBILE_IMAGE?.trim() ||
  "/assets/images/executive/mobile-img/banner.png";
const EXEC_STORY_MOBILE_V = process.env.NEXT_PUBLIC_EXEC_STORY_MOBILE_V?.trim() || "1";
const EXECUTIVE_TRANSFERS_VISUAL =
  process.env.NEXT_PUBLIC_EXEC_TRANSFERS_VISUAL?.trim() || "/assets/images/executive/famili.png";
const EXECUTIVE_CTA_ATTENDANT =
  process.env.NEXT_PUBLIC_EXEC_CTA_IMAGE?.trim() || "/assets/images/executive/Man01.png";

const STORY_STATS_NUMS = ["500+", "9", "20+"] as const;

const SHOWCASE_HORIZONTAL = [
  {
    src: `/assets/images/executive/horiontal1.png?v=${EXEC_SHOWCASE_IMG_V}`,
    alt: "Galeria — panorama 1",
  },
  {
    src: `/assets/images/executive/horizontal2.png?v=${EXEC_SHOWCASE_IMG_V}`,
    alt: "Galeria — panorama 2",
  },
] as const;

const SHOWCASE_VERT_STRIPE = {
  src: `/assets/images/executive/vertical.png?v=${EXEC_SHOWCASE_IMG_V}`,
  alt: "Galeria — imagem vertical",
} as const;

const EXEC_TOUR_BANNERS = [
  {
    key: "sintra" as const,
    src: `/assets/images/Carrossel/sintra.jpg?v=${ASSET_VERSION}`,
    alt: "Sintra e Cascais — palácios e costa",
  },
  {
    key: "fatima" as const,
    src: `/assets/images/Carrossel/obidos.jpg?v=${ASSET_VERSION}`,
    alt: "Roteiro Fátima, Nazaré e Óbidos — espiritualidade e vilas históricas",
  },
  {
    key: "arrabida" as const,
    src: `/assets/images/Carrossel/arrabida.jpg?v=${ASSET_VERSION}`,
    alt: "Serra da Arrábida e Costa Azul",
  },
] as const;

const SPEC_ICONS: LucideIcon[] = [Users, Car, Armchair, Compass];

const TRANSFER_ROUTES = {
  airport: "LIS · OPO · FAO",
  shuttle: "PT — porta a porta",
  vip: "VIP · CORPORATIVO",
} as const;

export function ExecutivePage() {
  const m = useMessages();
  const locale = useLocale();
  const e = m.executive;
  const reservarHref = withLocalePrefix("/reservar", locale);

  return (
    <div className="executive-page">
      <section className="exec-hero" aria-label="Apresentação">
        <div className="exec-hero__media" aria-hidden>
          <Image
            src={`${EXECUTIVE_HERO_IMAGE_MOBILE}${EXECUTIVE_HERO_IMAGE_MOBILE.includes("?") ? "&" : "?"}v=${EXEC_HERO_MOBILE_V}`}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center md:hidden"
          />
          <Image
            src={EXECUTIVE_HERO_IMAGE}
            alt=""
            fill
            priority
            sizes="100vw"
            className="hidden object-cover object-center md:block"
          />
          <div className="exec-hero__scrim" />
        </div>

        <div className="exec-hero__content">
          <p className="exec-badge">{e.badge}</p>
          <h1>{e.heroH1}</h1>
          <p className="exec-hero__value">
            <span className="exec-hero__value-pt">{e.heroValue}</span>
          </p>
          <div className="exec-hero__ctas">
            <Link href={reservarHref} className="exec-btn-light">
              <span>{e.heroCta}</span>
            </Link>
            <a href={WA_HREF} className="exec-btn-ghost" target="_blank" rel="noopener noreferrer">
              {e.heroWa}
            </a>
          </div>
        </div>
      </section>

      <main className="exec-shell exec-main exec-main--plain">
        <section
          id="historia"
          className="exec-section exec-story"
          aria-labelledby="exec-story-heading"
        >
          <div className="exec-story__grid">
            <div className="exec-story__visual hidden min-[900px]:block">
              <div className="exec-story__blob" aria-hidden />
              <div className="exec-story__figure">
                <Image
                  src={`${EXECUTIVE_STORY_IMAGE}?v=${ASSET_VERSION}`}
                  alt="DiscoverLixboaTours — experiência premium em Portugal"
                  fill
                  sizes="(min-width: 900px) 420px, 100vw"
                  className="exec-story__img object-contain object-bottom"
                />
              </div>
            </div>

            <div className="exec-story__content">
              <MapPin className="exec-story__pin" strokeWidth={2} aria-hidden />
              <h2 id="exec-story-heading" className="exec-story__title">
                <span className="exec-story__title-line exec-story__title-line--accent">
                  {e.storyTitleA}
                </span>
                <span className="exec-story__title-line exec-story__title-line--ink">
                  {e.storyTitleB}
                </span>
              </h2>
              <div className="exec-story__banner-mobile">
                <div className="exec-story__banner-mobile__frame">
                  <Image
                    src={`${EXECUTIVE_STORY_IMAGE_MOBILE}${EXECUTIVE_STORY_IMAGE_MOBILE.includes("?") ? "&" : "?"}v=${EXEC_STORY_MOBILE_V}`}
                    alt="DiscoverLixboaTours — experiência premium em Portugal"
                    fill
                    sizes="(max-width: 899px) 92vw, 0px"
                    className="object-cover object-center"
                  />
                </div>
              </div>
              <div className="exec-story__prose">
                <p dangerouslySetInnerHTML={{ __html: e.storyP1 }} />
                <p dangerouslySetInnerHTML={{ __html: e.storyP2 }} />
              </div>
              <dl className="exec-story__stats">
                {STORY_STATS_NUMS.map((num, i) => (
                  <div key={num} className="exec-story__stat">
                    <dt className="exec-story__stat-num">{num}</dt>
                    <dd className="exec-story__stat-label">{e.stats[i]}</dd>
                  </div>
                ))}
              </dl>

              <div className="exec-story__cta">
                <a
                  href={WA_HREF}
                  className="exec-btn-light"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 inline h-5 w-5" aria-hidden />
                  <span>{e.waScheduleShort}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="experiencia" className="exec-section">
          <div className="exec-section--surface exec-abordo">
            <div className="exec-abordo__leaf" aria-hidden />
            <div className="exec-section__head exec-section__head--left exec-abordo__head">
              <span className="exec-kicker">{e.abordoKicker}</span>
              <h2>{e.abordoH2}</h2>
              <p
                className="exec-abordo__lead"
                dangerouslySetInnerHTML={{ __html: e.abordoLead }}
              />
              <div className="exec-abordo__chips" role="list" aria-label="Âmbito do serviço">
                <span className="exec-abordo__chip exec-abordo__chip--tours" role="listitem">
                  {e.chipTours}
                </span>
                <span className="exec-abordo__chip exec-abordo__chip--corporate" role="listitem">
                  {e.chipCorporate}
                </span>
                <span className="exec-abordo__chip exec-abordo__chip--territory" role="listitem">
                  {e.chipTerritory}
                </span>
              </div>
            </div>

            <div className="exec-abordo__specs-wrap">
              <div
                className="exec-spec-grid exec-spec-grid--experiencia exec-spec-grid--cards"
                aria-label="Destaques do veículo e da experiência"
              >
                {e.specs.map((spec, i) => {
                  const Icon = SPEC_ICONS[i] ?? Users;
                  return (
                    <div key={spec.k} className="exec-spec-tile exec-spec-tile--icon">
                      <div className="exec-spec-tile__icon-wrap" aria-hidden>
                        <Icon className="exec-spec-tile__icon" strokeWidth={1.75} />
                      </div>
                      <span className="exec-spec-tile__k">{spec.k}</span>
                      <span className="exec-spec-tile__v">{spec.v}</span>
                      <span className="exec-spec-tile__hint">{spec.hint}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="exec-showcase" aria-label="Galeria">
              <div className="exec-showcase__mosaic-block">
                <div className="exec-showcase__cell exec-showcase__cell--head">
                  <div className="exec-section__head exec-section__head--left exec-showcase__head">
                    <span className="exec-kicker">{e.showcaseKicker}</span>
                    <h2>{e.showcaseH2}</h2>
                    <p className="text-[var(--exec-muted)]">{e.showcaseLead}</p>
                  </div>
                </div>
                {SHOWCASE_HORIZONTAL.map((slide, i) => (
                  <div
                    key={`${slide.src}-horiz-${i}`}
                    className="exec-showcase__cell exec-showcase__cell--horiz"
                  >
                    <div className="exec-showcase__stripe exec-showcase__stripe--horiz">
                      <Image
                        src={slide.src}
                        alt={slide.alt}
                        fill
                        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 58vw, 38vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                ))}
                <div className="exec-showcase__cell exec-showcase__cell--verts">
                  <div className="exec-showcase__vert-rack" aria-label="Destinos em destaque">
                    <div className="exec-showcase__stripe exec-showcase__stripe--vert">
                      <Image
                        src={SHOWCASE_VERT_STRIPE.src}
                        alt={SHOWCASE_VERT_STRIPE.alt}
                        fill
                        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 40vw, 22vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="passeios" className="exec-section exec-section--stripe">
          <div className="exec-section__head exec-section__head--left">
            <span className="exec-kicker">{e.passeiosKicker}</span>
            <h2>{e.passeiosH2}</h2>
            <p className="text-[var(--exec-muted)]">{e.passeiosLead}</p>
          </div>

          <div className="exec-tour-carousel-outer">
            <ExecutiveToursCarousel slides={EXEC_TOUR_BANNERS} />
          </div>

          <div className="exec-section__actions">
            <a
              href={WA_HREF}
              className="exec-btn-light"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="mr-2 inline h-5 w-5" aria-hidden />
              <span>{e.waSchedule}</span>
            </a>
          </div>
        </section>

        <section id="transfers" className="exec-section">
          <div className="exec-section__head exec-section__head--left">
            <span className="exec-kicker">{e.transferKicker}</span>
            <h2>{e.transferH2}</h2>
            <p className="text-[var(--exec-muted)]">{e.transferLead}</p>
          </div>

          <div className="exec-transfer-showcase-outer">
            <div className="exec-transfer-showcase">
              <div className="exec-transfer-showcase__side exec-transfer-showcase__side--left">
                <div className="exec-transfer-tile exec-transfer-tile--left exec-transfer-plate">
                  <div className="exec-transfer-plate__rivets" aria-hidden />
                  <div className="exec-transfer-plate__header">
                    <span className="exec-transfer-plate__route">{TRANSFER_ROUTES.shuttle}</span>
                  </div>
                  <div className="exec-transfer-plate__body">
                    <div className="exec-transfer-tile__icon" aria-hidden>
                      <Car className="h-[1.1rem] w-[1.1rem]" strokeWidth={2} />
                    </div>
                    <h3>{e.tfShuttle.title}</h3>
                    <p>{e.tfShuttle.text}</p>
                  </div>
                </div>
              </div>
              <div className="exec-transfer-showcase__center">
                <div className="exec-transfer-showcase__visual">
                  <Image
                    src={`${EXECUTIVE_TRANSFERS_VISUAL}${EXECUTIVE_TRANSFERS_VISUAL.includes("?") ? "&" : "?"}v=${EXEC_TRANSFERS_IMG_V}`}
                    alt="Mobilidade premium — transfers e serviço privado"
                    fill
                    sizes="(max-width: 899px) 92vw, min(960px, 62vw)"
                    className="object-contain object-center pointer-events-none select-none"
                  />
                </div>
              </div>
              <div className="exec-transfer-tile exec-transfer-tile--right exec-transfer-tile--airport exec-transfer-plate">
                <div className="exec-transfer-plate__rivets" aria-hidden />
                <div className="exec-transfer-plate__header">
                  <span className="exec-transfer-plate__route">{TRANSFER_ROUTES.airport}</span>
                </div>
                <div className="exec-transfer-plate__body">
                  <div className="exec-transfer-tile__icon" aria-hidden>
                    <Plane className="h-[1.1rem] w-[1.1rem]" strokeWidth={2} />
                  </div>
                  <h3>{e.tfAirport.title}</h3>
                  <p>{e.tfAirport.text}</p>
                </div>
              </div>
              <div className="exec-transfer-tile exec-transfer-tile--right exec-transfer-tile--vip exec-transfer-plate">
                <div className="exec-transfer-plate__rivets" aria-hidden />
                <div className="exec-transfer-plate__header">
                  <span className="exec-transfer-plate__route">{TRANSFER_ROUTES.vip}</span>
                </div>
                <div className="exec-transfer-plate__body">
                  <div className="exec-transfer-tile__icon" aria-hidden>
                    <Sparkles className="h-[1.1rem] w-[1.1rem]" strokeWidth={2} />
                  </div>
                  <h3>{e.tfVip.title}</h3>
                  <p>{e.tfVip.text}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="exec-transfer-foot">
            <p>{e.transferFoot}</p>
            <div className="exec-section__actions">
              <a
                href={WA_HREF}
                className="exec-btn-light"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 inline h-5 w-5" aria-hidden />
                <span>{e.waScheduleShort}</span>
              </a>
            </div>
          </div>
        </section>

        <section id="reserva" className="exec-cta" aria-label="Reserva e contacto">
          <div className="exec-cta__box">
            <div className="exec-cta__content">
              <h2>{e.ctaH2}</h2>
              <p className="exec-cta__subtitle">{e.ctaSubtitle}</p>

              <dl className="exec-contact-grid">
                <div className="exec-contact-item">
                  <dt>{e.ctaDtCeo}</dt>
                  <dd>Miguel Moreira</dd>
                </div>
                <div className="exec-contact-item">
                  <dt>{e.ctaDtWhatsapp}</dt>
                  <dd>
                    <a href={WA_HREF} target="_blank" rel="noopener noreferrer">
                      {WHATSAPP_DISPLAY}
                    </a>
                  </dd>
                </div>
                <div className="exec-contact-item">
                  <dt>{e.ctaDtWebsite}</dt>
                  <dd>
                    <a href={SITE_HREF} target="_blank" rel="noopener noreferrer">
                      discoverlixboatours.com
                    </a>
                  </dd>
                </div>
              </dl>

              <div className="exec-cta__actions">
                <Link href={reservarHref} className="exec-btn-light">
                  <span>{e.ctaReservar}</span>
                </Link>
                <a
                  className="exec-btn-light"
                  href={WA_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 inline h-5 w-5" aria-hidden />
                  {e.ctaWaBtn}
                </a>
              </div>
            </div>

            <div className="exec-cta__visual">
              <Image
                src={`${EXECUTIVE_CTA_ATTENDANT}${EXECUTIVE_CTA_ATTENDANT.includes("?") ? "&" : "?"}v=${EXEC_CTA_IMG_V}`}
                alt="Mike — guia turístico DiscoverLixboaTours, reserve connosco"
                fill
                sizes="(max-width: 899px) 100vw, min(480px, 42vw)"
                className="object-cover"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
