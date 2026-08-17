import Image from "next/image";
import { HomePageRest } from "./HomePageRest";
import { DestinationsGrid } from "./DestinationsGrid";
import { whatsappSiteUrl } from "@/lib/whatsapp";

const destinations = [
  {
    href: "/tours/sintra-cascais",
    img: "/assets/images/destinations/roteiro-sintra-e-cascais.webp",
    alt: "Sintra & Cascais",
    nameKey: "destination_sintra_name",
    placesKey: "destination_sintra_places",
    places: "Palácios & Praias Secretas",
    label: "Ver detalhes do tour Sintra e Cascais",
    priceFrom: "€250",
    priceUnit: "group" as const,
    cardMeta: "Private Tour · ~8 Hours · Up to 8 Guests",
  },
  {
    href: "/tours/3-destinos",
    img: "/assets/images/galeria-tour3destinations/img2.webp",
    alt: "Tour 3 Destinos",
    nameKey: "destination_3destinos_name",
    placesKey: "destination_3destinos_places",
    places: "Fátima • Nazaré • Óbidos",
    label: "Ver detalhes do tour 3 Destinos",
    priceFrom: "€85",
    priceUnit: "person" as const,
    cardMeta: "Private Tour · ~8 Hours · Up to 8 Guests",
  },
  {
    href: "/tours/fatima-tomar",
    img: "/assets/images/TOMAR/BANNER.png",
    alt: "Fátima & Tomar Private Tour",
    nameKey: "destination_fatima_tomar_name",
    placesKey: "destination_fatima_tomar_places",
    places: "Peregrinação & património UNESCO",
    label: "Ver detalhes do tour Fátima e Tomar",
    priceFrom: "€310",
    priceUnit: "group" as const,
    cardMeta: "Private Tour · 9–10 Hours · Up to 8 Guests",
  },
  {
    href: "/tours/monsanto",
    img: "/assets/images/Monsanto/monsanto1.webp",
    alt: "Monsanto & Centro de Portugal",
    nameKey: "destination_monsanto_name",
    placesKey: "destination_monsanto_places",
    places: "Portugal Autêntico · Hidden Gems",
    label: "Ver tour Monsanto e Centro de Portugal",
    priceFrom: "€113",
    priceUnit: "person" as const,
    cardMeta: "Private Full-Day · Up to 8 Guests",
  },
  {
    href: "/tours/lisboa",
    img: "/assets/images/destinations/lisboa.webp",
    alt: "Lisboa",
    nameKey: "destination_lisboa_name",
    placesKey: "destination_lisboa_places",
    places: "Capital Vibrante",
    label: "Ver detalhes do tour Lisboa",
    priceFrom: "€250",
    priceUnit: "group" as const,
    cardMeta: "Private Tour · ~8 Hours · Up to 8 Guests",
  },
  {
    href: "/tours/porto",
    img: "/assets/images/destinations/porto.webp",
    alt: "Porto",
    nameKey: "destination_porto_name",
    placesKey: "destination_porto_places",
    places: "Um Dia de Património, História & Vinho",
    label: "Ver detalhes do tour Porto",
    priceFrom: "€700",
    priceUnit: "group" as const,
    cardMeta: "Private Tour · Full Day · Up to 8 Guests",
  },
  {
    href: "/tours/arraabida",
    img: "/assets/images/arrabida-galeria/imgi_1_0718_credit-paulo-ribeiro_660x371.webp",
    alt: "Arrábida, Setúbal & Sesimbra",
    nameKey: "destination_arrabida_name",
    placesKey: "destination_arrabida_places",
    places: "Natureza, História e Vistas Incríveis",
    label: "Ver detalhes do tour Arrábida, Setúbal e Sesimbra",
    priceFrom: "€75",
    priceUnit: "person" as const,
    cardMeta: "Private Tour · ~8 Hours · Up to 8 Guests",
  },
  {
    href: "/tours/aveiro",
    img: "/assets/images/AVEIRO/Banner.webp",
    alt: "Aveiro & Costa Nova",
    nameKey: "destination_aveiro_name",
    placesKey: "destination_aveiro_places",
    places: "Canais, moliceiros e casas às riscas",
    label: "Ver detalhes do tour Aveiro e Costa Nova",
    priceFrom: "€100",
    priceUnit: "person" as const,
    cardMeta: "Private Tour · 8–9 Hours · Up to 8 Guests",
  },
  {
    href: "/tours/alentejo",
    img: "/assets/images/alentejo-galeria/estremoz.webp",
    alt: "Premium Alentejo Wine, Food & Culture Experience",
    nameKey: "destination_alentejo_name",
    placesKey: "destination_alentejo_places",
    places: "Premium · Património, vinha & mesa alentejana",
    label: "Ver Premium Alentejo Wine, Food & Culture Experience",
    priceFrom: "€145",
    priceUnit: "person" as const,
    cardMeta: "Private Tour · Full Day · Up to 8 Guests",
  },
  {
    href: "/tours/algarve",
    img: "/assets/images/destinations/algarve.webp",
    alt: "Algarve",
    nameKey: "destination_algarve_name",
    placesKey: "destination_algarve_places",
    places: "Costa do Sol",
    label: "Ver detalhes do tour Algarve",
    priceFrom: "€600",
    priceUnit: "group" as const,
    cardMeta: "Private Tour · Full Day · Up to 8 Guests",
  },
];

const instagramPhotos = [1, 2, 3, 4, 5, 6].map(
  (n) => `/assets/images/instagram/foto0${n}.webp`,
);

const testimonials = [
  { key: "testimonial1", author: "Lorenzo M" },
  { key: "testimonial2", author: "FarAway12287983537" },
  { key: "testimonial3", author: "Carmen C" },
  { key: "testimonial4", author: "Pol D" },
  { key: "testimonial5", author: "Mario P" },
  { key: "testimonial6", author: "Hannah J" },
];

const faqItems = [
  "faq_q1",
  "faq_q2",
  "faq_q3",
  "faq_q4",
  "faq_q5",
  "faq_q6",
  "faq_q7",
] as const;

export function HomePage() {
  const assetVersion = process.env.NEXT_PUBLIC_ASSET_VERSION?.trim() || "1";

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
              <span data-translate="hero_badge">Tours Exclusivos em Portugal</span>
            </div>

            <h1 className="hero-title">
              <span className="title-line" data-translate="hero_title_line1">
                Transforme Portugal
              </span>
              <span
                className="title-line highlight"
                data-translate="hero_title_line2"
              >
                No Seu Parque de Aventuras
              </span>
            </h1>

            <p className="hero-subtitle">
              <span data-translate="hero_subtitle1">
                Experiência incomparável para viagens únicas. Estamos aqui para
                levá-lo em suas
              </span>{" "}
              <strong data-translate="hero_subtitle2">
                viagens dos sonhos por Portugal.
              </strong>
            </p>

            <div className="hero-cta">
              <a href="#servicos" className="btn-primary">
                <span data-translate="hero_cta">Explorar Tours</span>
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
            {[
              {
                icon: (
                  <>
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                  </>
                ),
                num: "+6",
                t: "widget_tours",
                h: "Pacotes de Tour",
              },
              {
                icon: (
                  <>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </>
                ),
                num: "+30",
                t: "widget_destinations",
                h: "Diferentes Destinos",
              },
              {
                icon: (
                  <>
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88 16.24,7.76" />
                  </>
                ),
                num: "+3",
                t: "widget_guides",
                h: "Guias de Tour",
              },
              {
                icon: (
                  <>
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9,22 9,12 15,12 15,22" />
                  </>
                ),
                num: "+100",
                t: "widget_trips",
                h: "Viagens Completas",
              },
            ].map((w, i) => (
              <div className="widget" key={i}>
                <div className="widget-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    {w.icon}
                  </svg>
                </div>
                <div className="widget-content">
                  <div className="widget-number">{w.num}</div>
                  <h3 data-translate={w.t}>{w.h}</h3>
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
            <span className="about-subtitle" data-translate="about_subtitle">
              Sobre Nós
            </span>
            <h2 className="about-title" data-translate="about_title">
              Explore Portugal com um toque local!
            </h2>
            <p className="about-description" data-translate="about_description1">
              Com base em Sintra, a DiscoverLixboaTours oferece tours autênticos
              de palácios, montanhas e praias em Sintra e Cascais, além de Lisboa,
              Nazaré, Fátima, Óbidos, Porto e Algarve.
            </p>
            <p className="about-description" data-translate="about_description2">
              Guiados por Mike, nascido e criado em Sintra, cada tour combina
              aventura, cultura e histórias locais em um jeep conversível vintage
              ou van confortável.
            </p>
            <p className="about-description" data-translate="about_description3">
              Sustentável e apaixonado por mostrar o verdadeiro Portugal — cada
              tour é uma experiência única e inesquecível!
            </p>
            <a
              href={whatsappSiteUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-about"
              data-translate="learn_more"
            >
              Saiba Mais
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
                    <h2 className="ticker-text" data-translate="ticker_text">
                      Tours Autênticos em Portugal com DiscoverLixboatours
                    </h2>
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
            <span
              className="destinations-subtitle"
              data-translate="destinations_subtitle"
            >
              Locais Mais Visitados
            </span>
            <h2 className="destinations-title" data-translate="destinations_title">
              Escolha Seus Destinos
            </h2>
          </div>

          <DestinationsGrid destinations={destinations} />
        </div>
      </section>

      <HomePageRest instagramPhotos={instagramPhotos} testimonials={testimonials} faqItems={faqItems} />
    </>
  );
}
