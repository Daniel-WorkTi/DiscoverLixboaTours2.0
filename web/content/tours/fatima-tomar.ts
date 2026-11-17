import type { TourDefinitionInput } from "./finalize-tour";

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
  heroImage: "/assets/images/TOMAR/hero-fatima-tomar.jpg",
  /**
   * Ordem = itinerário: Santuário → Capelinha → Tempo livre → Centro Tomar → Convento.
   * Restantes alimentam a grelha Experiência (sem repetir Fátima September 2021-3/4).
   */
  stopImages: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/F%C3%A1tima_September_2021-5.jpg/3840px-F%C3%A1tima_September_2021-5.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/b/b1/Capelinha_das_Apari%C3%A7%C3%B5es%2C_2011.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Santu%C3%A1rio_de_F%C3%A1tima_%2836885881530%29.jpg/3840px-Santu%C3%A1rio_de_F%C3%A1tima_%2836885881530%29.jpg",
    "/assets/images/TOMAR/centro-historico-tomar.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Convento_de_Cristo_-_South_Facade.jpg/3840px-Convento_de_Cristo_-_South_Facade.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Tomar_-_Church_Joao_Baptista.jpg/3840px-Tomar_-_Church_Joao_Baptista.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Tomar_-_Rio_Nabao.jpg/3840px-Tomar_-_Rio_Nabao.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Aqueduto_do_Convento_de_Cristo_ou_Aqueduto_de_Peg%C3%B5es_looking_east.jpg/3840px-Aqueduto_do_Convento_de_Cristo_ou_Aqueduto_de_Peg%C3%B5es_looking_east.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Tomar_Convento_de_Cristo_Charola_750.jpg/3840px-Tomar_Convento_de_Cristo_Charola_750.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Tomar_Pra%C3%A7a_da_Rep%C3%BAblica_868.jpg/3840px-Tomar_Pra%C3%A7a_da_Rep%C3%BAblica_868.jpg",
  ],
  stopMapsUrls: [
    "https://www.google.com/maps/search/?api=1&query=Santu%C3%A1rio+de+F%C3%A1tima%2C+F%C3%A1tima",
    "https://www.google.com/maps/search/?api=1&query=Capelinha+das+Apari%C3%A7%C3%B5es%2C+F%C3%A1tima",
    "",
    "https://www.google.com/maps/search/?api=1&query=Centro+Hist%C3%B3rico+de+Tomar",
    "https://www.google.com/maps/search/?api=1&query=Convento+de+Cristo%2C+Tomar",
  ],
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
      experienceText:
        "Fátima pede silêncio; Tomar pede curiosidade. Num só dia privado, vais do Santuário ao Convento de Cristo — património UNESCO — com tempo para sentir, não só para passar.\n\nTransporte confortável, guia atento e ritmo vosso: ideal para quem quer fé, história e uma viagem que fica na memória.",
      aboutHtml: [
        "Visite <strong>Fátima</strong>, um dos maiores centros de peregrinação do mundo, e descubra <strong>Tomar</strong>, cidade histórica ligada aos Cavaleiros Templários e ao impressionante <strong>Convento de Cristo</strong> (Património Mundial UNESCO).",
        "É uma <strong>experiência privada</strong> pensada para o teu ritmo: tempo para reflexão em Fátima e para explorar o centro histórico de Tomar ao detalhe.",
        "<strong>Transporte na Mercedes-Benz Vito 116 CDI Select</strong>, <strong>motorista/guia profissional</strong> e <strong>pick-up e drop-off no hotel</strong> — o itinerário pode ser ajustado ao teu interesse.",
      ],
      highlightTitle: "Fátima e Tomar",
      highlightText:
        "O santuário e o Convento de Cristo em 4K. Do silêncio da Cova da Iria à obra manuelina de Tomar, dois lugares num só dia.",
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
        "Mercedes-Benz Vito 116 CDI Select",
        "Motorista/guia profissional",
        "Pick-up e drop-off no hotel",
      ],
      notIncluded: ["Entradas em monumentos", "Refeições"],
      whyChooseHtml:
        "Experiência privada, com possibilidade de ajustar o itinerário conforme o interesse do cliente (mais tempo em Fátima ou Tomar).<br>Dois ícones de Portugal num único dia — espiritualidade e património templário UNESCO, com a DiscoverLixboaTours.",
      stopsLabel: "Fátima & Tomar",
      pickupHeading: "Opções de recolha",
      pickupItems: [
        {
          title: "Lisboa",
          detail: "Hotel, alojamento ou ponto de encontro em Lisboa — Pickup incluído no preço",
        },
        {
          title: "Sintra",
          detail: "Recolha em Sintra — Pickup incluído no preço",
        },
        {
          title: "Cascais",
          detail: "Recolha em Cascais — Pickup incluído no preço",
        },
        {
          title: "Outras localizações",
          detail: "Disponível sob consulta (valor a combinar após a reserva)",
          highlight: true,
        },
      ],
    },
    en: {
      title: "Fátima & Tomar Private Tour",
      subtitle:
        "Explore two of Portugal’s most iconic places on a unique private experience.",
      experienceText:
        "Fátima asks for silence; Tomar asks for curiosity. In one private day, go from the Sanctuary to the Convent of Christ — UNESCO heritage — with time to feel, not just pass through.\n\nComfortable transport, an attentive guide and your own pace: ideal if you want faith, history and a trip that stays with you.",
      aboutHtml: [
        "Visit <strong>Fátima</strong>, one of the world’s great pilgrimage centres, and discover <strong>Tomar</strong>, a historic city linked to the Knights Templar and the stunning <strong>Convent of Christ</strong> (UNESCO World Heritage).",
        "A <strong>private experience</strong> at your pace: time for reflection in Fátima and to explore Tomar’s old town in depth.",
        "<strong>Mercedes-Benz Vito 116 CDI Select</strong>, a <strong>professional driver/guide</strong> and <strong>hotel pick-up and drop-off</strong> — the itinerary can be adjusted to your interests.",
      ],
      highlightTitle: "Fátima and Tomar",
      highlightText:
        "The sanctuary and the Convent of Christ in 4K. From the quiet of Cova da Iria to Tomar's Manueline masterpiece, two places in one day.",
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
        "Mercedes-Benz Vito 116 CDI Select",
        "Professional driver/guide",
        "Hotel pick-up and drop-off",
      ],
      notIncluded: ["Monument entrance fees", "Meals"],
      whyChooseHtml:
        "Private experience; the itinerary can be adjusted to your interests (more time in Fátima or Tomar).<br>Two Portuguese icons in one day — spirituality and Templar UNESCO heritage, with DiscoverLixboaTours.",
      stopsLabel: "Fátima & Tomar",
      pickupHeading: "Pickup options",
      pickupItems: [
        {
          title: "Lisbon",
          detail: "Hotel, accommodation or meeting point in Lisbon — Pickup included in the price",
        },
        {
          title: "Sintra",
          detail: "Pickup in Sintra — Pickup included in the price",
        },
        {
          title: "Cascais",
          detail: "Pickup in Cascais — Pickup included in the price",
        },
        {
          title: "Other locations",
          detail: "Available on request (arranged after booking)",
          highlight: true,
        },
      ],
    },
  },
  seo: {
    pt: {
      title: "Tour Privado Fátima & Tomar | DiscoverLixboaTours",
      description:
        "Tour privado Fátima e Tomar com guia. Até 8 passageiros. A partir de €310 por grupo. Recolha no hotel.",
    },
    en: {
      title: "Private Fátima & Tomar Day Trip from Lisbon",
      description:
        "Private pilgrimage and history day trip from Lisbon to Fátima Sanctuary and Tomar (Knights Templar). English-speaking guide, hotel pickup. From €310/group, up to 8 guests.",
    },
  },
} as const satisfies TourDefinitionInput;
