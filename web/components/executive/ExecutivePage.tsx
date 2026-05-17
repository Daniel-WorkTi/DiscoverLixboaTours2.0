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

const WA_PHONE = "351934483351";
const WA_HREF = `https://api.whatsapp.com/send/?phone=${WA_PHONE}&text=${encodeURIComponent(
  "Olá! Gostaria de informações sobre Private Tours & Concierge — DiscoverLixboaTours.",
)}`;
const SITE_HREF = "https://www.discoverlixboatours.com/";
const ASSET_VERSION = process.env.NEXT_PUBLIC_ASSET_VERSION?.trim() || "1";
/** Aumentar quando substituir PNGs da galeria executive (cache do browser / otimizador). */
const EXEC_SHOWCASE_IMG_V = process.env.NEXT_PUBLIC_EXEC_SHOWCASE_IMG_V?.trim() || "3";
/**
 * Cache-bust da imagem Mobilidade (`famili.png` ou NEXT_PUBLIC_EXEC_TRANSFERS_VISUAL).
 * Ao trocar o ficheiro mantendo o nome, incrementa em .env: NEXT_PUBLIC_EXEC_TRANSFERS_IMG_V
 */
const EXEC_TRANSFERS_IMG_V =
  process.env.NEXT_PUBLIC_EXEC_TRANSFERS_IMG_V?.trim() || "3";
/**
 * Cache-bust do visual CTA (`Man01.png` ou NEXT_PUBLIC_EXEC_CTA_IMAGE).
 * Ao substituir o ficheiro mantendo o nome, incrementa em .env: NEXT_PUBLIC_EXEC_CTA_IMG_V
 */
const EXEC_CTA_IMG_V = process.env.NEXT_PUBLIC_EXEC_CTA_IMG_V?.trim() || "3";
const EXECUTIVE_HERO_IMAGE = "/assets/images/executive/banner.webp";
/** Hero mobile: abaixo do breakpoint `md` do Tailwind (768px). No desktop mantém-se `EXECUTIVE_HERO_IMAGE`. */
const EXECUTIVE_HERO_IMAGE_MOBILE =
  process.env.NEXT_PUBLIC_EXEC_HERO_MOBILE_IMAGE?.trim() ||
  "/assets/images/executive/mobile-img/hero.png";
/**
 * Cache-bust do hero mobile (`mobile-img/hero.png`).
 * Ao substituir o ficheiro mantendo o nome, incrementa em .env: NEXT_PUBLIC_EXEC_HERO_MOBILE_V
 */
const EXEC_HERO_MOBILE_V = process.env.NEXT_PUBLIC_EXEC_HERO_MOBILE_V?.trim() || "1";
/** Substitua por PNG/WebP com recorte (fundo transparente) — ex.: `public/assets/images/executive/story-cutout.webp` */
const EXECUTIVE_STORY_IMAGE = "/assets/images/executive/car.png";
/** Secção «história»: em viewports estreitos (max 899px) usa banner em `mobile-img/`; no desktop mantém `EXECUTIVE_STORY_IMAGE`. */
const EXECUTIVE_STORY_IMAGE_MOBILE =
  process.env.NEXT_PUBLIC_EXEC_STORY_MOBILE_IMAGE?.trim() ||
  "/assets/images/executive/mobile-img/banner.png";
/**
 * Cache-bust da imagem da história no mobile (`mobile-img/banner.png`).
 * Ao substituir o ficheiro mantendo o nome, incrementa em .env: NEXT_PUBLIC_EXEC_STORY_MOBILE_V
 */
const EXEC_STORY_MOBILE_V = process.env.NEXT_PUBLIC_EXEC_STORY_MOBILE_V?.trim() || "1";
/** Visual central da secção Mobilidade (PNG sem fundo). Predefinição: `famili.png` em `public/assets/images/executive/`. */
const EXECUTIVE_TRANSFERS_VISUAL =
  process.env.NEXT_PUBLIC_EXEC_TRANSFERS_VISUAL?.trim() || "/assets/images/executive/famili.png";
/** Imagem CTA reserva (Mike / guia). Predefinição: `Man01.png` em `public/assets/images/executive/`. */
const EXECUTIVE_CTA_ATTENDANT =
  process.env.NEXT_PUBLIC_EXEC_CTA_IMAGE?.trim() || "/assets/images/executive/Man01.png";

const STORY_STATS = [
  { num: "500+", label: "Jornadas premium" },
  { num: "8", label: "Lugares · 7 passageiros + condutor" },
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

/** Imagens em `public/assets/images/Carrossel/` — `?v=` evita cache ao substituir ficheiros. */
const EXEC_TOUR_BANNERS = [
  {
    key: "sintra-cascais",
    titlePt: "Sintra & Cascais",
    linePt: "O Refúgio Real",
    titleKey: "exec_car_sintra_title",
    lineKey: "exec_car_sintra_line",
    src: `/assets/images/Carrossel/sintra.jpg?v=${ASSET_VERSION}`,
    alt: "Sintra e Cascais — palácios e costa",
  },
  {
    key: "fatima-obidos",
    titlePt: "Fátima & Óbidos",
    linePt: "Caminhos da Tradição",
    titleKey: "exec_car_fatima_title",
    lineKey: "exec_car_fatima_line",
    src: `/assets/images/Carrossel/obidos.jpg?v=${ASSET_VERSION}`,
    alt: "Roteiro Fátima, Nazaré e Óbidos — espiritualidade e vilas históricas",
  },
  {
    key: "azeitao-arrabida",
    titlePt: "Azeitão & Arrábida",
    linePt: "Degustação premium à beira do Atlântico",
    titleKey: "exec_car_arrabida_title",
    lineKey: "exec_car_arrabida_line",
    src: `/assets/images/Carrossel/arrabida.jpg?v=${ASSET_VERSION}`,
    alt: "Serra da Arrábida e Costa Azul",
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
    v: "8 lugares — 7 passageiros + condutor",
    hint: "Famílias, grupos e equipas em viagem de negócios",
  },
  {
    Icon: Car,
    k: "Veículo",
    v: "Vito 116 CDI Select · modelo recente",
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
          <p className="exec-badge" data-translate="exec_badge">
            Concierge · Corporate · Family
          </p>
          <h1 data-translate="exec_hero_h1">O padrão ouro de viagem privada em Portugal</h1>
          <p className="exec-hero__value">
            <span className="exec-hero__value-pt" data-translate="exec_hero_value">
              Experiência · Sofisticação · Exclusividade
            </span>
          </p>
          <div className="exec-hero__ctas">
            <Link href="/reservar" className="exec-btn-light">
              <span data-translate="exec_hero_cta">Reserve a sua experiência</span>
            </Link>
            <a href={WA_HREF} className="exec-btn-ghost" target="_blank" rel="noopener noreferrer" data-translate="exec_hero_wa">
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
              <MapPin
                className="exec-story__pin"
                strokeWidth={2}
                aria-hidden
              />
              <h2 id="exec-story-heading" className="exec-story__title">
                <span
                  className="exec-story__title-line exec-story__title-line--accent"
                  data-translate="exec_story_title_a"
                >
                  As nossas histórias
                </span>
                <span
                  className="exec-story__title-line exec-story__title-line--ink"
                  data-translate="exec_story_title_b"
                >
                  com viajantes exigentes
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
                <p data-translate="exec_story_p1" data-html>
                  Na <strong>DiscoverLixboaTours</strong> unimos hospitalidade de alto nível com
                  transporte de luxo. Na nossa{" "}
                  <strong>Mercedes-Benz Vito 116 CDI Select</strong> (modelo recente), cada
                  quilómetro é vivido com conforto, discrição e atenção ao detalhe.
                </p>
                <p data-translate="exec_story_p2" data-html>
                  Lounge móvel com oito lugares — sete passageiros e condutor —, estofos premium,
                  luz natural e mimos à medida — para atravessar Portugal de norte a sul com a
                  tranquilidade de quem viaja em privado.
                </p>
              </div>
              <dl className="exec-story__stats">
                {STORY_STATS.map((s, i) => (
                  <div key={s.label} className="exec-story__stat">
                    <dt className="exec-story__stat-num">{s.num}</dt>
                    <dd
                      className="exec-story__stat-label"
                      data-translate={`exec_stat_${i + 1}`}
                    >
                      {s.label}
                    </dd>
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
                  <span data-translate="exec_wa_schedule_short">Agendar no WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="experiencia" className="exec-section">
          <div className="exec-section--surface exec-abordo">
            <div className="exec-abordo__leaf" aria-hidden />
            <div className="exec-section__head exec-section__head--left exec-abordo__head">
              <span className="exec-kicker" data-translate="exec_abordo_kicker">
                A bordo
              </span>
              <h2 data-translate="exec_abordo_h2">Hospitalidade premium, quilómetro a quilómetro</h2>
              <p className="exec-abordo__lead" data-translate="exec_abordo_lead" data-html>
                <strong>Turismo privado</strong> e <strong>mobilidade executiva</strong> em Portugal
                — cada detalhe pensado para quem viaja em descoberta ou em negócio, com discrição e
                liberdade de roteiro.
              </p>
              <div className="exec-abordo__chips" role="list" aria-label="Âmbito do serviço">
                <span
                  className="exec-abordo__chip exec-abordo__chip--tours"
                  role="listitem"
                  data-translate="exec_chip_tours"
                >
                  Tours &amp; experiências
                </span>
                <span
                  className="exec-abordo__chip exec-abordo__chip--corporate"
                  role="listitem"
                  data-translate="exec_chip_corporate"
                >
                  Corporate &amp; eventos
                </span>
                <span
                  className="exec-abordo__chip exec-abordo__chip--territory"
                  role="listitem"
                  data-translate="exec_chip_territory"
                >
                  Portugal inteiro
                </span>
              </div>
            </div>

            <div className="exec-abordo__specs-wrap">
              <div
                className="exec-spec-grid exec-spec-grid--experiencia exec-spec-grid--cards"
                aria-label="Destaques do veículo e da experiência"
              >
                {SPECS.map(({ Icon, k, v, hint }, i) => {
                  const n = i + 1;
                  return (
                  <div key={k} className="exec-spec-tile exec-spec-tile--icon">
                    <div className="exec-spec-tile__icon-wrap" aria-hidden>
                      <Icon className="exec-spec-tile__icon" strokeWidth={1.75} />
                    </div>
                    <span className="exec-spec-tile__k" data-translate={`exec_spec_${n}_k`}>{k}</span>
                    <span className="exec-spec-tile__v" data-translate={`exec_spec_${n}_v`}>{v}</span>
                    <span className="exec-spec-tile__hint" data-translate={`exec_spec_${n}_hint`}>{hint}</span>
                  </div>
                  );
                })}
              </div>
            </div>

            <div className="exec-showcase" aria-label="Galeria">
              <div className="exec-showcase__mosaic-block">
                <div className="exec-showcase__cell exec-showcase__cell--head">
                  <div className="exec-section__head exec-section__head--left exec-showcase__head">
                    <span className="exec-kicker" data-translate="exec_showcase_kicker">
                      Destaques
                    </span>
                    <h2 data-translate="exec_showcase_h2">Galeria</h2>
                    <p className="text-[var(--exec-muted)]" data-translate="exec_showcase_lead">
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
            </div>
          </div>
        </section>

        <section id="passeios" className="exec-section exec-section--stripe">
          <div className="exec-section__head exec-section__head--left">
            <span className="exec-kicker" data-translate="exec_passeios_kicker">
              Itinerários
            </span>
            <h2 data-translate="exec_passeios_h2">Passeios de autor</h2>
            <p className="text-[var(--exec-muted)]" data-translate="exec_passeios_lead">
              Roteiros à medida — cultura, história e paisagens.
            </p>
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
              <span data-translate="exec_wa_schedule">Agendar Executive no WhatsApp</span>
            </a>
          </div>
        </section>

        <section id="transfers" className="exec-section">
          <div className="exec-section__head exec-section__head--left">
            <span className="exec-kicker" data-translate="exec_transfer_kicker">
              Mobilidade
            </span>
            <h2 data-translate="exec_transfer_h2">Transfers, shuttle e eventos VIP</h2>
            <p className="text-[var(--exec-muted)]" data-translate="exec_transfer_lead">
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
                  <h3 data-translate="exec_tf_shuttle_title">{TRANSFER_SHUTTLE.title}</h3>
                  <p data-translate="exec_tf_shuttle_text">{TRANSFER_SHUTTLE.text}</p>
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
                <h3 data-translate="exec_tf_airport_title">{TRANSFER_AIRPORT.title}</h3>
                <p data-translate="exec_tf_airport_text">{TRANSFER_AIRPORT.text}</p>
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
                <h3 data-translate="exec_tf_vip_title">{TRANSFER_VIP.title}</h3>
                <p data-translate="exec_tf_vip_text">{TRANSFER_VIP.text}</p>
              </div>
              </div>
            </div>
          </div>

          <div className="exec-transfer-foot">
            <p data-translate="exec_transfer_foot">
              Transfers personalizados e serviços VIP em todo o país. Guia privado e serviço premium
              — atento e discreto.
            </p>
            <div className="exec-section__actions">
              <a
                href={WA_HREF}
                className="exec-btn-light"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 inline h-5 w-5" aria-hidden />
                <span data-translate="exec_wa_schedule_short">Agendar no WhatsApp</span>
              </a>
            </div>
          </div>
        </section>

        <section id="reserva" className="exec-cta" aria-label="Reserva e contacto">
          <div className="exec-cta__box">
            <div className="exec-cta__content">
              <h2 data-translate="exec_cta_h2">Reserve a sua experiência</h2>
              <p className="exec-cta__subtitle" data-translate="exec_cta_subtitle">
                Private Tours &amp; Concierge em Portugal
              </p>

              <dl className="exec-contact-grid">
                <div className="exec-contact-item">
                  <dt data-translate="exec_cta_dt_ceo">CEO</dt>
                  <dd>Miguel Moreira</dd>
                </div>
                <div className="exec-contact-item">
                  <dt data-translate="exec_cta_dt_whatsapp">WhatsApp</dt>
                  <dd>
                    <a href={WA_HREF} target="_blank" rel="noopener noreferrer">
                      +351 934 483 351
                    </a>
                  </dd>
                </div>
                <div className="exec-contact-item">
                  <dt data-translate="exec_cta_dt_website">Website</dt>
                  <dd>
                    <a href={SITE_HREF} target="_blank" rel="noopener noreferrer">
                      discoverlixboatours.com
                    </a>
                  </dd>
                </div>
              </dl>

              <div className="exec-cta__actions">
                <Link href="/reservar" className="exec-btn-light">
                  <span data-translate="exec_cta_reservar">Reservar online</span>
                </Link>
                <a
                  className="exec-btn-light"
                  href={WA_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-translate="exec_cta_wa_btn"
                >
                  <MessageCircle className="mr-2 inline h-5 w-5" aria-hidden />
                  WhatsApp
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
