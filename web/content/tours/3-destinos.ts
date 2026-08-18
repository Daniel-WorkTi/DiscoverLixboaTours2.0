import type { TourDefinition } from "./types";

/**
 * Fátima, Nazaré & Óbidos (3-destinos) — totais de grupo convertidos da tabela híbrida 2026.
 * 1: €280; 2–8: pp × n → totais 28000…68000.
 */
export const tresDestinosTour = {
  slug: "3-destinos",
  maxGuests: 8,
  minGuests: 1,
  durationHours: 8,
  privateTour: true,
  hotelPickup: true,
  groupTotalsCents: {
    1: 28000,
    2: 28000,
    3: 34500,
    4: 42000,
    5: 50000,
    6: 57000,
    7: 66500,
    8: 68000,
  },
  priceDisplay: "person",
  heroImage: "/assets/images/galeria-tour3destinations/img2.webp",
  videoYoutubeId: "WOlJMWA8YmQ",
  gallery: [
    {
      src: "/assets/images/galeria-tour3destinations/img1.webp",
      alt: {
        pt: "Tour 3 Destinos — imagem 1",
        en: "3 Destinations Tour — image 1",
      },
    },
    {
      src: "/assets/images/galeria-tour3destinations/img2.webp",
      alt: {
        pt: "Tour 3 Destinos — imagem 2",
        en: "3 Destinations Tour — image 2",
      },
    },
    {
      src: "/assets/images/galeria-tour3destinations/img3.webp",
      alt: {
        pt: "Tour 3 Destinos — imagem 3",
        en: "3 Destinations Tour — image 3",
      },
    },
    {
      src: "/assets/images/galeria-tour3destinations/img4.webp",
      alt: {
        pt: "Tour 3 Destinos — imagem 4",
        en: "3 Destinations Tour — image 4",
      },
    },
    {
      src: "/assets/images/galeria-tour3destinations/img5.webp",
      alt: {
        pt: "Tour 3 Destinos — imagem 5",
        en: "3 Destinations Tour — image 5",
      },
    },
    {
      src: "/assets/images/galeria-tour3destinations/img6.webp",
      alt: {
        pt: "Tour 3 Destinos — imagem 6",
        en: "3 Destinations Tour — image 6",
      },
    },
  ],
  content: {
    pt: {
      title: "Tour 3 Destinos — Fátima, Nazaré & Óbidos",
      subtitle:
        "Descubra três dos locais mais icónicos de Portugal: o Santuário de Fátima, Nazaré com o seu farol e museu do surf, e a vila medieval de Óbidos, num tour privado que combina espiritualidade, natureza e tradição",
      aboutHtml: [
        "Embarque numa jornada única por três dos destinos mais emblemáticos de Portugal. <strong>Visite o Santuário de Fátima, descubra o Farol e museu do surf em Nazaré e explore as muralhas e ruas medievais da vila histórica de Óbidos.</strong>",
        "Com o nosso guia local experiente e o icónico UMM Alter II 4x4, terá acesso a perspetivas únicas, histórias locais autênticas e momentos inesquecíveis. Cada paragem é cuidadosamente planeada para maximizar a sua experiência, com muito tempo para explorar, fotografar e absorver a atmosfera única de cada local.",
      ],
      itinerary: [
        {
          badge: "Fátima",
          title: "Santuário de Fátima",
          descriptionHtml:
            "Visite um dos santuários marianos mais importantes do mundo. Conheça a história das aparições de 1917, explore a Basílica da Santíssima Trindade e sinta a paz espiritual do lugar. Tempo livre para reflexão e compras de artigos religiosos.",
        },
        {
          badge: "Nazaré",
          title: "Nazaré: Ondas gigantes & Miradouros",
          descriptionHtml:
            "Visite o Farol e o museu do surf de Nazaré, admire o Canhão da Nazaré e desfrute das vistas únicas das ondas gigantes do Atlântico.",
        },
        {
          badge: "Óbidos",
          title: "Visita à Vila Medieval de Óbidos",
          descriptionHtml:
            "Explore as muralhas e ruas de Óbidos, visite o castelo e descubra a história e o património desta vila medieval bem preservada.",
        },
        {
          badge: "Almoço",
          title: "Degustação da Gastronomia Local",
          descriptionHtml:
            "Almoço num restaurante local, não turístico, onde irá saborear a comida tradicional portuguesa. <strong>(Não incluído no preço total do tour)</strong>",
        },
      ],
      included: [
        "Guia local experiente",
        "Transporte em UMM Alter II",
        "Seguro de viagem",
        "Paradas fotográficas",
        "Recomendações locais",
      ],
      notIncluded: [
        "Refeições (opcionais)",
        "Ingressos para monumentos",
      ],
      stopsLabel: "3 locais icónicos",
      pickupHeading: "Opções de recolha",
      pickupItems: [
        {
          title: "Sintra",
          detail: "Largo Vasco da Gama 7, 2710-423 — Sem custo adicional",
        },
        {
          title: "Estação Portela Sintra",
          detail: "Local tranquilo — Sem custo adicional",
        },
        {
          title: "Lisboa / Aeroporto / Hotel",
          detail:
            "Disponível com custo adicional (valor a combinar após a reserva)",
          highlight: true,
        },
      ],
    },
    en: {
      title: "3 Destinations Tour — Fátima, Nazaré & Óbidos",
      subtitle:
        "Discover three of Portugal's most iconic locations: the Sanctuary of Fátima, Nazaré with its lighthouse and surf museum, and the medieval village of Óbidos, on a private tour that combines spirituality, nature and tradition",
      aboutHtml: [
        "Embark on a unique journey through three of Portugal's most emblematic destinations. <strong>Visit the Sanctuary of Fátima, discover the Lighthouse and surf museum in Nazaré and explore the medieval walls and streets of the historic village of Óbidos.</strong>",
        "With our experienced local guide and the iconic UMM Alter II 4x4, you'll have access to unique perspectives, authentic local stories and unforgettable moments. Each stop is carefully planned to maximize your experience, with plenty of time to explore, photograph and absorb the unique atmosphere of each location.",
      ],
      itinerary: [
        {
          badge: "Fátima",
          title: "Sanctuary of Fátima",
          descriptionHtml:
            "Visit one of the most important Marian sanctuaries in the world. Learn about the history of the 1917 apparitions, explore the Basilica of the Holy Trinity and feel the spiritual peace of the place. Free time for reflection and shopping for religious items.",
        },
        {
          badge: "Nazaré",
          title: "Nazaré: Giant Waves & Viewpoints",
          descriptionHtml:
            "Visit the Nazaré Lighthouse and surf museum, admire the Nazaré Canyon and enjoy the unique views of the giant Atlantic waves.",
        },
        {
          badge: "Óbidos",
          title: "Visit to the Medieval Village of Óbidos",
          descriptionHtml:
            "Explore the walls and streets of Óbidos, visit the castle and discover the history and heritage of this well-preserved medieval village.",
        },
        {
          badge: "Lunch",
          title: "Local Gastronomy Tasting",
          descriptionHtml:
            "Lunch at a local, non-touristy restaurant where you will taste traditional Portuguese food. <strong>(Not included in the total tour price)</strong>",
        },
      ],
      included: [
        "Experienced local guide",
        "Transport in UMM Alter II",
        "Travel insurance",
        "Photographic stops",
        "Local recommendations",
      ],
      notIncluded: [
        "Meals (optional)",
        "Monument entrance tickets",
      ],
      stopsLabel: "3 iconic locations",
      pickupHeading: "Pickup options",
      pickupItems: [
        {
          title: "Sintra",
          detail: "Largo Vasco da Gama 7, 2710-423 — No extra cost",
        },
        {
          title: "Portela Sintra Station",
          detail: "Quiet meeting point — No extra cost",
        },
        {
          title: "Lisbon / Airport / Hotel",
          detail: "Available with an extra fee (arranged after booking)",
          highlight: true,
        },
      ],
    },
  },
  seo: {
    pt: {
      title:
        "Tour 3 Destinos — Fátima, Nazaré & Óbidos | DiscoverLixboaTours",
      description:
        "Tour privado por Fátima, Nazaré e Óbidos. Até 8 passageiros. A partir de €85 por pessoa. Espiritualidade, natureza e tradição.",
    },
    en: {
      title:
        "3 Destinations Tour — Fátima, Nazaré & Óbidos | DiscoverLixboaTours",
      description:
        "Private Fátima, Nazaré and Óbidos tour. Up to 8 guests. From €85 per person. Spirituality, nature and tradition.",
    },
  },
} as const satisfies TourDefinition;
