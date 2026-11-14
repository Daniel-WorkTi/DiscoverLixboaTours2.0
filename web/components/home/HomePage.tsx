"use client";

import Image from "next/image";
import Link from "next/link";
import { getCardFromPrice, getMigratedTour } from "@/content/tours";
import { useLocale, useMessages } from "@/lib/i18n/LocaleProvider";
import { withLocalePrefix } from "@/lib/i18n/locale";
import { whatsappSiteUrl } from "@/lib/whatsapp";
import { getTourRating } from "@/lib/tour-ratings";
import { DestinationsGrid, type DestinationCard } from "./DestinationsGrid";
import { HeroBackgroundSlideshow } from "./HeroBackgroundSlideshow";
import { HeroServicesTicker } from "./HeroServicesTicker";
import { HomePageRest } from "./HomePageRest";

const HERO_TICKER_SLUGS = [
  "sintra-cascais",
  "lisboa",
  "porto",
  "algarve",
] as const;

/** Região no título do carrossel (estilo Travixa: “Cidade, Loc”) */
const HERO_TICKER_REGION: Record<
  (typeof HERO_TICKER_SLUGS)[number],
  { pt: string; en: string }
> = {
  "sintra-cascais": { pt: "Centro", en: "Centre" },
  lisboa: { pt: "Centro", en: "Centre" },
  porto: { pt: "Norte", en: "North" },
  algarve: { pt: "Sul", en: "South" },
};

/** Subtítulo em 2 linhas no carrossel (não altera a grelha de destinos) */
const HERO_TICKER_PLACES: Record<
  (typeof HERO_TICKER_SLUGS)[number],
  { pt: string; en: string }
> = {
  "sintra-cascais": {
    pt: "Palácios icónicos e praias secretas na costa",
    en: "Iconic palaces and secret beaches on the coast",
  },
  lisboa: {
    pt: "Capital vibrante com miradouros e história",
    en: "Vibrant capital with viewpoints and history",
  },
  porto: {
    pt: "Património, história e vinho no Norte",
    en: "Heritage, history and wine in the North",
  },
  algarve: {
    pt: "Costa do Sol, falésias e praias do Sul",
    en: "Sun coast, cliffs and beaches of the South",
  },
};

const DESTINATION_BASE = [
  {
    slug: "sintra-cascais" as const,
    href: "/tours/sintra-cascais",
    img: "/assets/images/destinations/roteiro-sintra-e-cascais.webp",
    itemKey: "sintra" as const,
  },
  {
    slug: "3-destinos" as const,
    href: "/tours/3-destinos",
    img: "/assets/images/galeria-tour3destinations/img2.webp",
    itemKey: "threeDestinos" as const,
  },
  {
    slug: "fatima-tomar" as const,
    href: "/tours/fatima-tomar",
    img: "/assets/images/TOMAR/BANNER.png",
    itemKey: "fatimaTomar" as const,
  },
  {
    slug: "monsanto" as const,
    href: "/tours/monsanto",
    img: "/assets/images/Monsanto/monsanto1.webp",
    itemKey: "monsanto" as const,
  },
  {
    slug: "lisboa" as const,
    href: "/tours/lisboa",
    img: "/assets/images/destinations/lisboa.webp",
    itemKey: "lisboa" as const,
  },
  {
    slug: "porto" as const,
    href: "/tours/porto",
    img: "/assets/images/destinations/porto.webp",
    itemKey: "porto" as const,
  },
  {
    slug: "arraabida" as const,
    href: "/tours/arraabida",
    img: "/assets/images/arrabida-galeria/imgi_1_0718_credit-paulo-ribeiro_660x371.webp",
    itemKey: "arrabida" as const,
  },
  {
    slug: "aveiro" as const,
    href: "/tours/aveiro",
    img: "/assets/images/AVEIRO/Banner.webp",
    itemKey: "aveiro" as const,
  },
  {
    slug: "alentejo" as const,
    href: "/tours/alentejo",
    img: "/assets/images/alentejo-galeria/estremoz.webp",
    itemKey: "alentejo" as const,
  },
  {
    slug: "algarve" as const,
    href: "/tours/algarve",
    img: "/assets/images/destinations/algarve.webp",
    itemKey: "algarve" as const,
  },
] as const;

const TESTIMONIAL_AUTHORS = [
  "Lorenzo M",
  "FarAway12287983537",
  "Carmen C",
  "Pol D",
  "Mario P",
  "Hannah J",
] as const;

const instagramPhotos = [1, 2, 3, 4, 5, 6].map(
  (n) => `/assets/images/instagram/foto0${n}.webp`,
);

export function HomePage() {
  const m = useMessages();
  const locale = useLocale();
  const items = m.destinations.items;
  const bookHref = withLocalePrefix("/reservar", locale);

  const destinations: DestinationCard[] = DESTINATION_BASE.map((d) => {
    const item = items[d.itemKey];
    const tour = getMigratedTour(d.slug);
    const from = tour
      ? getCardFromPrice(tour)
      : { eurosLabel: "€—", unit: "group" as const };
    const rating = getTourRating(d.slug);
    return {
      href: d.href,
      img: d.img,
      alt: item.name,
      name: item.name,
      places: item.places,
      label: item.name,
      priceFrom: from.eurosLabel,
      priceUnit: from.unit,
      durationHours: tour?.durationHours ?? 8,
      ratingScore: rating.score,
      ratingCount: rating.reviews,
    };
  });

  const tickerItems = HERO_TICKER_SLUGS.map((slug) => {
    const base = DESTINATION_BASE.find((d) => d.slug === slug)!;
    const item = items[base.itemKey];
    const tour = getMigratedTour(slug);
    const from = tour
      ? getCardFromPrice(tour)
      : { eurosLabel: "€—", unit: "group" as const };
    const lang = locale === "en" ? "en" : "pt";
    const region = HERO_TICKER_REGION[slug][lang];
    return {
      href: base.href,
      img: base.img,
      name: `${item.name}, ${region}`,
      places: HERO_TICKER_PLACES[slug][lang],
      priceFrom: from.eurosLabel,
      priceUnitLabel:
        from.unit === "person" ? m.common.priceUnit.replace("/ ", "") : m.common.priceGroupUnit.replace("/ ", ""),
    };
  });

  const todayLabel = locale === "en" ? "Today" : "Hoje";

  const aboutStats = [
    { num: "+100", label: m.home.widgets.trips },
    { num: "+30", label: m.home.widgets.destinations },
    { num: "+10", label: m.home.widgets.years },
  ];

  return (
    <>
      <section className="hero" id="home">
        <HeroBackgroundSlideshow />

        <div className="hero-main">
          <div className="hero-inner">
            <p className="hero-badge">{m.home.hero.badge}</p>
            <h1 className="hero-title">
              {m.home.hero.titleLine1}{" "}
              <span className="hero-title-accent">{m.home.hero.titleLine2}</span>
            </h1>
            <div className="hero-cta">
              <Link href={bookHref} className="btn-hero-primary">
                {m.nav.book}
              </Link>
              <a href="#servicos" className="btn-hero-secondary">
                {m.home.hero.cta}
              </a>
            </div>
          </div>
        </div>

        <div className="hero-ticker-wrap">
          <HeroServicesTicker
            items={tickerItems}
            locale={locale}
            todayLabel={todayLabel}
          />
        </div>
      </section>

      <section id="sobre" className="about-section">
        <div className="about-decor" aria-hidden>
          <img
            src="/assets/images/svg-bg.svg"
            alt=""
            className="about-decor-palm"
          />
        </div>
        <div className="about-container">
          <div className="about-left">
            <div className="about-copy">
              <span className="about-badge">{m.home.about.subtitle}</span>
              <h2 className="about-title">{m.home.about.title}</h2>
              <p className="about-description">{m.home.about.description1}</p>
              <p className="about-description">{m.home.about.description2}</p>
              <a
                href={whatsappSiteUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-about"
              >
                {m.home.about.learnMore}
              </a>
            </div>

            <div className="about-stats" aria-label="Indicadores">
              {aboutStats.map((stat) => (
                <div className="about-stat" key={stat.label}>
                  <span className="about-stat-num">{stat.num}</span>
                  <span className="about-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="about-image">
            <Image
              src="/assets/images/sobre-pena.jpg"
              alt="Sobre Nós - DiscoverLixboaTours Portugal"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className="about-image-img"
              priority={false}
            />
          </div>
        </div>
      </section>

      <section className="ticker-section">
        <div className="ticker-container">
          <div className="ticker-wrapper">
            <ul className="ticker-list">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <li className="ticker-item" key={i}>
                  {i % 2 === 1 ? (
                    <p className="ticker-text">{m.home.ticker}</p>
                  ) : (
                    <svg
                      className="ticker-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        className="destinations-section"
        id="servicos"
        style={{ paddingTop: 100 }}
      >
        <div className="destinations-container">
          <div className="destinations-header">
            <span className="destinations-subtitle">{m.home.destinations.subtitle}</span>
            <h2 className="destinations-title">{m.home.destinations.title}</h2>
          </div>

          <DestinationsGrid destinations={destinations} />
        </div>
      </section>

      <HomePageRest
        instagramPhotos={instagramPhotos}
        testimonialAuthors={TESTIMONIAL_AUTHORS}
      />
    </>
  );
}
