import type { TourDefinition } from "./types";

/**
 * Fátima & Tomar — tour privado, totais por grupo (fonte comercial 2026).
 * Pricing: 1–2 €310 · 3–4 €400 · 5–6 €490 · 7–8 €590 (totais).
 */
export const fatimaTomarTour = {
  slug: "fatima-tomar",
  maxGuests: 8,
  minGuests: 1,
  durationHours: 8,
  privateTour: true,
  hotelPickup: true,
  groupTotalsCents: {
    1: 31000,
    2: 31000,
    3: 40000,
    4: 40000,
    5: 49000,
    6: 49000,
    7: 59000,
    8: 59000,
  },
  priceDisplay: "group",
  heroImage: "/assets/images/TOMAR/BANNER.png",
  videoYoutubeId: "-QMOm4_Qv3k",
  gallery: [
    {
      src: "/assets/images/TOMAR/ChatGPT%20Image%20Apr%201%2C%202026%2C%2010_26_11%20PM.png",
      alt: {
        pt: "Fátima & Tomar — imagem 1",
        en: "Fátima & Tomar — image 1",
      },
    },
    {
      src: "/assets/images/TOMAR/ChatGPT%20Image%20Apr%201%2C%202026%2C%2010_26_25%20PM.png",
      alt: {
        pt: "Fátima & Tomar — imagem 2",
        en: "Fátima & Tomar — image 2",
      },
    },
    {
      src: "/assets/images/TOMAR/ChatGPT%20Image%20Apr%201%2C%202026%2C%2010_26_29%20PM.png",
      alt: {
        pt: "Fátima & Tomar — imagem 3",
        en: "Fátima & Tomar — image 3",
      },
    },
    {
      src: "/assets/images/TOMAR/ChatGPT%20Image%20Apr%201%2C%202026%2C%2010_26_33%20PM.png",
      alt: {
        pt: "Fátima & Tomar — imagem 4",
        en: "Fátima & Tomar — image 4",
      },
    },
  ],
  content: {
    pt: {
      title: "Tour Privado Fátima & Tomar",
      subtitle:
        "Explore dois dos locais mais emblemáticos de Portugal numa experiência privada única.",
      aboutHtml: [
        "Visite <strong>Fátima</strong>, um dos maiores centros de peregrinação do mundo, e descubra <strong>Tomar</strong>, cidade histórica ligada aos Cavaleiros Templários e ao impressionante <strong>Convento de Cristo</strong> (Património Mundial UNESCO).",
        "É uma <strong>experiência privada</strong> pensada para o teu ritmo: tempo para reflexão em Fátima e para explorar o centro histórico de Tomar ao detalhe.",
        "<strong>Transporte confortável</strong>, <strong>motorista/guia profissional</strong> e <strong>pick-up e drop-off no hotel</strong> — o itinerário pode ser ajustado ao teu interesse.",
      ],
      itinerary: [
        {
          badge: "Fátima",
          title: "Santuário de Fátima",
          descriptionHtml:
            "Um dos maiores santuários marianos do mundo — espaço de visita e contemplação.",
        },
        {
          badge: "Fátima",
          title: "Capelinha das Aparições",
          descriptionHtml:
            "Local histórico ligado às aparições de 1917.",
        },
        {
          badge: "Fátima",
          title: "Tempo livre",
          descriptionHtml: "Tempo para visita e reflexão ao teu ritmo.",
        },
        {
          badge: "Tomar",
          title: "Centro histórico de Tomar",
          descriptionHtml:
            "Ruas medievais e ambiente templário numa das cidades mais charmosas do centro de Portugal.",
        },
        {
          badge: "Tomar",
          title: "Convento de Cristo (UNESCO)",
          descriptionHtml:
            "Obra-prima manuelina e fortaleza templária — visita ao exterior e contexto histórico (entradas não incluídas).",
        },
      ],
      included: [
        "Transporte privado confortável",
        "Motorista/guia profissional",
        "Pick-up e drop-off no hotel",
      ],
      notIncluded: ["Entradas em monumentos", "Refeições"],
      whyChooseHtml:
        "Experiência privada, com possibilidade de ajustar o itinerário conforme o interesse do cliente (mais tempo em Fátima ou Tomar).<br>Dois ícones de Portugal num único dia — espiritualidade e património templário UNESCO, com a DiscoverLixboaTours.",
      stopsLabel: "Fátima & Tomar",
    },
    en: {
      title: "Fátima & Tomar Private Tour",
      subtitle:
        "Explore two of Portugal’s most iconic places on a unique private experience.",
      aboutHtml: [
        "Visit <strong>Fátima</strong>, one of the world’s great pilgrimage centres, and discover <strong>Tomar</strong>, a historic city linked to the Knights Templar and the stunning <strong>Convent of Christ</strong> (UNESCO World Heritage).",
        "A <strong>private experience</strong> at your pace: time for reflection in Fátima and to explore Tomar’s old town in depth.",
        "<strong>Comfortable transport</strong>, a <strong>professional driver/guide</strong> and <strong>hotel pick-up and drop-off</strong> — the itinerary can be adjusted to your interests.",
      ],
      itinerary: [
        {
          badge: "Fátima",
          title: "Sanctuary of Fátima",
          descriptionHtml:
            "One of the largest Marian shrines in the world — space for visiting and contemplation.",
        },
        {
          badge: "Fátima",
          title: "Chapel of the Apparitions",
          descriptionHtml:
            "Historic site linked to the 1917 apparitions.",
        },
        {
          badge: "Fátima",
          title: "Free time",
          descriptionHtml: "Time to visit and reflect at your own pace.",
        },
        {
          badge: "Tomar",
          title: "Historic centre of Tomar",
          descriptionHtml:
            "Medieval streets and Templar atmosphere in one of central Portugal’s most charming towns.",
        },
        {
          badge: "Tomar",
          title: "Convent of Christ (UNESCO)",
          descriptionHtml:
            "Manueline masterpiece and Templar fortress — exterior visit and historical context (entrance fees not included).",
        },
      ],
      included: [
        "Comfortable private transport",
        "Professional driver/guide",
        "Hotel pick-up and drop-off",
      ],
      notIncluded: ["Monument entrance fees", "Meals"],
      whyChooseHtml:
        "Private experience; the itinerary can be adjusted to your interests (more time in Fátima or Tomar).<br>Two Portuguese icons in one day — spirituality and Templar UNESCO heritage, with DiscoverLixboaTours.",
      stopsLabel: "Fátima & Tomar",
    },
  },
  seo: {
    pt: {
      title: "Tour Privado Fátima & Tomar | DiscoverLixboaTours",
      description:
        "Tour privado Fátima e Tomar com guia. Até 8 passageiros. A partir de €310 por grupo. Recolha no hotel.",
    },
    en: {
      title: "Private Fátima & Tomar Tour | DiscoverLixboaTours",
      description:
        "Private Fátima and Tomar tour with a guide. Up to 8 guests. From €310 per group. Hotel pickup available.",
    },
  },
} as const satisfies TourDefinition;
