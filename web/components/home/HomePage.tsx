"use client";

import Image from "next/image";
import { getCardFromPrice, getMigratedTour } from "@/content/tours";
import { useMessages } from "@/lib/i18n/LocaleProvider";
import { whatsappSiteUrl } from "@/lib/whatsapp";
import { DestinationsGrid, type DestinationCard } from "./DestinationsGrid";
import { HomePageRest } from "./HomePageRest";

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
  const assetVersion = process.env.NEXT_PUBLIC_ASSET_VERSION?.trim() || "1";
  const items = m.destinations.items;

  const destinations: DestinationCard[] = DESTINATION_BASE.map((d) => {
    const item = items[d.itemKey];
    const tour = getMigratedTour(d.slug);
    const from = tour
      ? getCardFromPrice(tour)
      : { eurosLabel: "€—", unit: "group" as const };
    return {
      href: d.href,
      img: d.img,
      alt: item.name,
      name: item.name,
      places: item.places,
      label: item.name,
      priceFrom: from.eurosLabel,
      priceUnit: from.unit,
    };
  });

  const widgets = [
    {
      icon: (
        <>
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        </>
      ),
      num: "+6",
      label: m.home.widgets.tours,
    },
    {
      icon: (
        <>
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </>
      ),
      num: "+30",
      label: m.home.widgets.destinations,
    },
    {
      icon: (
        <>
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88 16.24,7.76" />
        </>
      ),
      num: "+3",
      label: m.home.widgets.guides,
    },
    {
      icon: (
        <>
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9,22 9,12 15,12 15,22" />
        </>
      ),
      num: "+100",
      label: m.home.widgets.trips,
    },
  ];

  return (
    <>
      <section className="hero" id="home">
        <div className="hero-shapes">
          <div className="shape shape-wave" />
          <div className="shape shape-mountain" />
          <div className="shape shape-circle-1" />
          <div className="shape shape-circle-2" />
          <div className="shape shape-path" />
        </div>

        <svg width="0" height="0" style={{ position: "absolute" }}>
          <defs>
            <linearGradient
              id="badgeGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" style={{ stopColor: "#FF6600", stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: "#00B4D8", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#FF6600", stopOpacity: 1 }} />
            </linearGradient>
          </defs>
        </svg>

        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{m.home.hero.badge}</span>
            </div>

            <h1 className="hero-title">
              <span className="title-line">{m.home.hero.titleLine1}</span>
              <span className="title-line highlight">{m.home.hero.titleLine2}</span>
            </h1>

            <p className="hero-subtitle">{m.home.hero.subtitle1}</p>

            <div className="hero-cta">
              <a href="#servicos" className="btn-primary">
                <span>{m.home.hero.cta}</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a href="#instagram" className="btn-secondary hero-cta-secondary">
                {m.home.hero.ctaSecondary}
              </a>
            </div>
          </div>

          <div className="hero-image">
            <Image
              src={`/assets/images/hero/car%20(2).webp?v=${assetVersion}`}
              alt="Jeep Discover Portugal"
              width={800}
              height={600}
              priority
            />
          </div>
        </div>
      </section>

      <section id="sobre" className="about-section">
        <div className="about-shapes">
          <div className="shape-1" />
          <div className="shape-2" />
          <div className="shape-3" />
        </div>

        <div className="about-container">
          <div className="about-widgets">
            {widgets.map((w, i) => (
              <div className="widget" key={i}>
                <div className="widget-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    {w.icon}
                  </svg>
                </div>
                <div className="widget-content">
                  <div className="widget-number">{w.num}</div>
                  <h3>{w.label}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="about-image">
            <Image
              src="/assets/images/sobre/img-sobre.webp"
              alt="Sobre Nós - DiscoverLixboaTours Portugal"
              width={600}
              height={700}
            />
          </div>

          <div className="about-content">
            <span className="about-subtitle">{m.home.about.subtitle}</span>
            <h2 className="about-title">{m.home.about.title}</h2>
            <p className="about-description">{m.home.about.description1}</p>
            <p className="about-description">{m.home.about.description2}</p>
            <p className="about-description">{m.home.about.description3}</p>
            <a
              href={whatsappSiteUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-about"
            >
              {m.home.about.learnMore}
            </a>
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
