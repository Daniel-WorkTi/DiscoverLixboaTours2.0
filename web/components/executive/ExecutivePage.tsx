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
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

/** ID do vídeo YouTube na galeria (predefinição: iTHiv1ETxQw). */
const EXECUTIVE_YOUTUBE_VIDEO_ID =
  process.env.NEXT_PUBLIC_EXECUTIVE_YOUTUBE_ID?.trim() || "iTHiv1ETxQw";

function executiveYoutubeEmbedSrc(videoId: string): string {
  const u = new URL(`https://www.youtube.com/embed/${encodeURIComponent(videoId)}`);
  u.searchParams.set("modestbranding", "1");
  u.searchParams.set("rel", "0");
  u.searchParams.set("playsinline", "1");
  return u.toString();
}

const WA_PHONE = "351934483351";
const WA_HREF = `https://api.whatsapp.com/send/?phone=${WA_PHONE}&text=${encodeURIComponent(
  "Olá! Gostaria de informações sobre Private Tours & Concierge — DiscoverLixboaTours.",
)}`;
const SITE_HREF = "https://www.discoverlixboatours.com/";
const ASSET_VERSION = process.env.NEXT_PUBLIC_ASSET_VERSION?.trim() || "1";
/** Aumentar quando substituir PNGs da galeria executive (cache do browser / otimizador). */
const EXEC_SHOWCASE_IMG_V = process.env.NEXT_PUBLIC_EXEC_SHOWCASE_IMG_V?.trim() || "2";
/**
 * Cache-bust da imagem Mobilidade (`famili.png` ou NEXT_PUBLIC_EXEC_TRANSFERS_VISUAL).
 * Ao trocar o ficheiro mantendo o nome, incrementa em .env: NEXT_PUBLIC_EXEC_TRANSFERS_IMG_V
 */
const EXEC_TRANSFERS_IMG_V =
  process.env.NEXT_PUBLIC_EXEC_TRANSFERS_IMG_V?.trim() || "2";
const EXECUTIVE_HERO_IMAGE = "/assets/images/executive/banner.webp";
/** Substitua por PNG/WebP com recorte (fundo transparente) — ex.: `public/assets/images/executive/story-cutout.webp` */
const EXECUTIVE_STORY_IMAGE = "/assets/images/executive/car.png";
/** Visual central da secção Mobilidade (PNG sem fundo). Predefinição: `famili.png` em `public/assets/images/executive/`. */
const EXECUTIVE_TRANSFERS_VISUAL =
  process.env.NEXT_PUBLIC_EXEC_TRANSFERS_VISUAL?.trim() || "/assets/images/executive/famili.png";

const STORY_STATS = [
  { num: "500+", label: "Jornadas premium" },
  { num: "7", label: "Lugares no lounge móvel" },
  { num: "20+", label: "Destinos em Portugal" },
] as const;

/** Faixas horizontais da galeria (ficheiros em `public/assets/images/executive/`) */
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

/** Coluna direita: imagem vertical */
const SHOWCASE_VERT_STRIPE = {
  src: `/assets/images/executive/vertical.png?v=${EXEC_SHOWCASE_IMG_V}`,
  alt: "Galeria — imagem vertical",
} as const;

const EXEC_TOUR_BANNERS = [
  {
    key: "sintra-cascais",
    titlePt: "Sintra & Cascais",
    linePt: "O Refúgio Real",
    src: "/assets/images/destinations/roteiro-sintra-e-cascais.webp",
    alt: "Sintra e Cascais — palácios e costa",
  },
  {
    key: "fatima-obidos",
    titlePt: "Fátima & Óbidos",
    linePt: "Caminhos da Tradição",
    src: "/assets/images/destinations/tour-3-destinations.webp",
    alt: "Roteiro Fátima, Nazaré e Óbidos — espiritualidade e vilas históricas",
  },
  {
    key: "azeitao-arrabida",
    titlePt: "Azeitão & Arrábida",
    linePt: "Degustação premium à beira do Atlântico",
    src: "/assets/images/arrabida.webp",
    alt: "Serra da Arrábida e Costa Azul",
  },
  {
    key: "evora",
    titlePt: "Évora",
    linePt: "Uma viagem sensorial pelo Alentejo (UNESCO)",
    src: "/assets/images/alentejo.webp",
    alt: "Alentejo — património e paisagem",
  },
] as const;

const TRANSFER_BLOCKS = [
  {
    icon: Plane,
    title: "Transfers aeroporto",
    text: "Lisboa, Porto, Faro e outros destinos.",
    route: "LIS · OPO · FAO",
  },
  {
    icon: Car,
    title: "Shuttle privado",
    text: "Porta a porta para empresas ou lazer.",
    route: "PT — porta a porta",
  },
  {
    icon: Sparkles,
    title: "Eventos VIP",
    text: "Casamentos, eventos corporativos e galas — transporte de luxo.",
    route: "VIP · CORPORATIVO",
  },
] as const;

const TRANSFER_AIRPORT = TRANSFER_BLOCKS[0];
const TRANSFER_SHUTTLE = TRANSFER_BLOCKS[1];
const TRANSFER_VIP = TRANSFER_BLOCKS[2];

const SPECS: ReadonlyArray<{
  Icon: LucideIcon;
  k: string;
  v: string;
  hint: string;
}> = [
  {
    Icon: Users,
    k: "Capacidade",
    v: "Até 7 passageiros",
    hint: "Famílias, grupos e equipas em viagem de negócios",
  },
  {
    Icon: Car,
    k: "Veículo",
    v: "Vito 116 CDI Select 2023",
    hint: "Mercedes-Benz · espaço e elegância em estrada",
  },
  {
    Icon: Armchair,
    k: "Conforto",
    v: "Lounge móvel · luz natural",
    hint: "Entre palácios e miradouros, viaja com calma",
  },
  {
    Icon: Compass,
    k: "Âmbito",
    v: "Todo o território nacional",
    hint: "Tours e transfers — norte a sul, no teu ritmo",
  },
];

export function ExecutivePage() {
  return (
    <div className="executive-page">
      <SiteHeader variant="site" />

      <section className="exec-hero" aria-label="Apresentação">
        <div className="exec-hero__media" aria-hidden>
          <Image
            src={EXECUTIVE_HERO_IMAGE}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="exec-hero__scrim" />
        </div>

        <div className="exec-hero__content">
          <p className="exec-badge">Private Travel · Portugal</p>
          <h1>The Gold Standard of Private Travel in Portugal</h1>
          <p className="exec-hero__value">
            <span className="exec-hero__value-pt">Experiência. Sofisticação. Exclusividade.</span>
            <span className="exec-hero__value-en">
              Experience · Sophistication · Exclusivity
            </span>
          </p>
          <div className="exec-hero__ctas">
            <Link href="/reservar" className="exec-btn-light">
              Reserve a sua experiência
            </Link>
            <a href={WA_HREF} className="exec-btn-ghost" target="_blank" rel="noopener noreferrer">
              Falar com o CEO
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
            <div className="exec-story__visual">
              <div className="exec-story__blob" aria-hidden />
              <div className="exec-story__figure">
                <Image
                  src={`${EXECUTIVE_STORY_IMAGE}?v=${ASSET_VERSION}`}
                  alt="DiscoverLixboaTours — experiência premium em Portugal"
                  fill
                  sizes="(max-width: 899px) 92vw, 420px"
                  className="exec-story__img object-contain object-bottom"
                />
              </div>
            </div>

            <div className="exec-story__content">
              <MapPin
                className="exec-story__pin"
                strokeWidth={2}
                aria-hidden
              />
              <h2 id="exec-story-heading" className="exec-story__title">
                <span className="exec-story__title-line exec-story__title-line--accent">
                  As nossas histórias
                </span>
                <span className="exec-story__title-line exec-story__title-line--ink">
                  com viajantes exigentes
                </span>
              </h2>
              <div className="exec-story__prose">
                <p>
                  Na <strong>DiscoverLixboaTours</strong> unimos hospitalidade de alto nível com
                  transporte de luxo. Na nossa{" "}
                  <strong>Mercedes-Benz Vito 116 CDI Select 2023</strong>, cada quilómetro é vivido
                  com conforto, discrição e atenção ao detalhe.
                </p>
                <p>
                  Lounge móvel para até sete passageiros, estofos premium, luz natural e mimos à
                  medida — para atravessar Portugal de norte a sul com a tranquilidade de quem viaja
                  em privado.
                </p>
              </div>
              <dl className="exec-story__stats">
                {STORY_STATS.map((s) => (
                  <div key={s.label} className="exec-story__stat">
                    <dt className="exec-story__stat-num">{s.num}</dt>
                    <dd className="exec-story__stat-label">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section id="experiencia" className="exec-section">
          <div className="exec-section--surface exec-abordo">
            <div className="exec-abordo__leaf" aria-hidden />
            <div className="exec-section__head exec-section__head--left exec-abordo__head">
              <span className="exec-kicker">A bordo</span>
              <h2>Hospitalidade premium, quilómetro a quilómetro</h2>
              <p className="exec-abordo__lead">
                <strong>Turismo privado</strong> e <strong>mobilidade executiva</strong> em Portugal
                — cada detalhe pensado para quem viaja em descoberta ou em negócio, com discrição e
                liberdade de roteiro.
              </p>
              <div className="exec-abordo__chips" role="list" aria-label="Âmbito do serviço">
                <span className="exec-abordo__chip exec-abordo__chip--tours" role="listitem">
                  Tours &amp; experiências
                </span>
                <span className="exec-abordo__chip exec-abordo__chip--corporate" role="listitem">
                  Corporate &amp; eventos
                </span>
                <span className="exec-abordo__chip exec-abordo__chip--territory" role="listitem">
                  Portugal inteiro
                </span>
              </div>
            </div>

            <div className="exec-abordo__specs-wrap">
              <div
                className="exec-spec-grid exec-spec-grid--experiencia exec-spec-grid--cards"
                aria-label="Destaques do veículo e da experiência"
              >
                {SPECS.map(({ Icon, k, v, hint }) => (
                  <div key={k} className="exec-spec-tile exec-spec-tile--icon">
                    <div className="exec-spec-tile__icon-wrap" aria-hidden>
                      <Icon className="exec-spec-tile__icon" strokeWidth={1.75} />
                    </div>
                    <span className="exec-spec-tile__k">{k}</span>
                    <span className="exec-spec-tile__v">{v}</span>
                    <span className="exec-spec-tile__hint">{hint}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="exec-showcase" aria-label="Galeria e vídeo">
              <div className="exec-showcase__mosaic-block">
                <div className="exec-showcase__cell exec-showcase__cell--head">
                  <div className="exec-section__head exec-section__head--left exec-showcase__head">
                    <span className="exec-kicker">Destaques</span>
                    <h2>Galeria</h2>
                    <p className="text-[var(--exec-muted)]">
                      Imagens da experiência e dos destinos.
                    </p>
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

              <div className="exec-showcase__video-wrap">
                <div className="exec-showcase__video-frame exec-showcase__video-frame--yt">
                  <iframe
                    src={executiveYoutubeEmbedSrc(EXECUTIVE_YOUTUBE_VIDEO_ID)}
                    title="Vídeo DiscoverLixboaTours"
                    className="exec-showcase__iframe-yt"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="passeios" className="exec-section exec-section--stripe">
          <div className="exec-section__head exec-section__head--left">
            <span className="exec-kicker">Itinerários</span>
            <h2>Passeios de autor</h2>
            <p className="text-[var(--exec-muted)]">
              Roteiros à medida — cultura, história e paisagens.
            </p>
          </div>

          <div className="exec-tour-carousel-outer">
            <ExecutiveToursCarousel slides={EXEC_TOUR_BANNERS} />
          </div>
        </section>

        <section id="transfers" className="exec-section">
          <div className="exec-section__head exec-section__head--left">
            <span className="exec-kicker">Mobilidade</span>
            <h2>Transfers, shuttle e eventos VIP</h2>
            <p className="text-[var(--exec-muted)]">
              Eficiência e elegância em cada deslocação.
            </p>
          </div>

          <div className="exec-transfer-showcase-outer">
            <div className="exec-transfer-showcase">
              <div className="exec-transfer-showcase__side exec-transfer-showcase__side--left">
              <div className="exec-transfer-tile exec-transfer-tile--left exec-transfer-plate">
                <div className="exec-transfer-plate__rivets" aria-hidden />
                <div className="exec-transfer-plate__header">
                  <span className="exec-transfer-plate__route">{TRANSFER_SHUTTLE.route}</span>
                </div>
                <div className="exec-transfer-plate__body">
                  <div className="exec-transfer-tile__icon" aria-hidden>
                    <TRANSFER_SHUTTLE.icon className="h-[1.1rem] w-[1.1rem]" strokeWidth={2} />
                  </div>
                  <h3>{TRANSFER_SHUTTLE.title}</h3>
                  <p>{TRANSFER_SHUTTLE.text}</p>
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
                <span className="exec-transfer-plate__route">{TRANSFER_AIRPORT.route}</span>
              </div>
              <div className="exec-transfer-plate__body">
                <div className="exec-transfer-tile__icon" aria-hidden>
                  <TRANSFER_AIRPORT.icon className="h-[1.1rem] w-[1.1rem]" strokeWidth={2} />
                </div>
                <h3>{TRANSFER_AIRPORT.title}</h3>
                <p>{TRANSFER_AIRPORT.text}</p>
              </div>
              </div>
              <div className="exec-transfer-tile exec-transfer-tile--right exec-transfer-tile--vip exec-transfer-plate">
              <div className="exec-transfer-plate__rivets" aria-hidden />
              <div className="exec-transfer-plate__header">
                <span className="exec-transfer-plate__route">{TRANSFER_VIP.route}</span>
              </div>
              <div className="exec-transfer-plate__body">
                <div className="exec-transfer-tile__icon" aria-hidden>
                  <TRANSFER_VIP.icon className="h-[1.1rem] w-[1.1rem]" strokeWidth={2} />
                </div>
                <h3>{TRANSFER_VIP.title}</h3>
                <p>{TRANSFER_VIP.text}</p>
              </div>
              </div>
            </div>
          </div>

          <div className="exec-transfer-foot">
            <p>
              Transfers personalizados e serviços VIP em todo o país. Guia privado e serviço premium
              — atento e discreto.
            </p>
          </div>
        </section>

        <section id="reserva" className="exec-cta" aria-label="Reserva e contacto">
          <div className="exec-cta__box">
            <div className="exec-cta__accent" aria-hidden />
            <div className="exec-cta__inner">
              <h2>Reserve a sua experiência</h2>
              <p className="exec-cta__subtitle">Private Tours &amp; Concierge em Portugal</p>

              <dl className="exec-contact-grid">
                <div className="exec-contact-item">
                  <dt>CEO</dt>
                  <dd>Miguel Moreira</dd>
                </div>
                <div className="exec-contact-item">
                  <dt>WhatsApp</dt>
                  <dd>
                    <a href={WA_HREF} target="_blank" rel="noopener noreferrer">
                      +351 934 483 351
                    </a>
                  </dd>
                </div>
                <div className="exec-contact-item">
                  <dt>Website</dt>
                  <dd>
                    <a href={SITE_HREF} target="_blank" rel="noopener noreferrer">
                      discoverlixboatours.com
                    </a>
                  </dd>
                </div>
              </dl>

              <div className="exec-cta__actions">
                <Link href="/reservar" className="exec-btn-light text-[#171717]">
                  Reservar online
                </Link>
                <a
                  className="exec-btn-light text-[#171717]"
                  href={WA_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 inline h-5 w-5" aria-hidden />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter variant="site" />
    </div>
  );
}
