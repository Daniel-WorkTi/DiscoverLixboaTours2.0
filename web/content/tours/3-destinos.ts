import type { TourDefinition } from "./types";

/**
 * Fátima, Nazaré & Óbidos (3-destinos) — van privada completa.
 * Mike: €250 pela van (até 7); capacidade global → 8 sem novo tier (mesmo total).
 * Confirmar com Mike se o 8.º deve ter preço diferente.
 */
export const tresDestinosTour = {
  slug: "3-destinos",
  maxGuests: 8,
  minGuests: 1,
  durationHours: 8,
  privateTour: true,
  hotelPickup: true,
  groupTotalsCents: {
    1: 25000,
    2: 25000,
    3: 25000,
    4: 25000,
    5: 25000,
    6: 25000,
    7: 25000,
    8: 25000,
  },
  priceDisplay: "group" as const,
  heroImage: "/assets/images/heronazaresection.jpg",
  /** Ordem = itinerário: Fátima → Nazaré → Óbidos → Almoço. */
  stopImages: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/F%C3%A1tima_September_2021-5.jpg/3840px-F%C3%A1tima_September_2021-5.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/2025-12-21_Nazar%C3%A9%2C_Praia_do_Norte_in_December_3.jpg/3840px-2025-12-21_Nazar%C3%A9%2C_Praia_do_Norte_in_December_3.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Castillo_de_%C3%93bidos%2C_%C3%93bidos%2C_Portugal%2C_2021-09-09%2C_DD_33.jpg/3840px-Castillo_de_%C3%93bidos%2C_%C3%93bidos%2C_Portugal%2C_2021-09-09%2C_DD_33.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/1/12/Portugal2019OktoberObidos017_%2849036665528%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/b/b1/Capelinha_das_Apari%C3%A7%C3%B5es%2C_2011.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/f/fa/Farol_da_Nazar%C3%A9.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Nazar%C3%A9_.Portugal_%2853451390098%29.jpg/3840px-Nazar%C3%A9_.Portugal_%2853451390098%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Santu%C3%A1rio_de_F%C3%A1tima_%2836885881530%29.jpg/3840px-Santu%C3%A1rio_de_F%C3%A1tima_%2836885881530%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/20190529_Spain_and_Portugal_El_Camino_Pilgrimage_1095_%2848002594858%29.jpg/3840px-20190529_Spain_and_Portugal_El_Camino_Pilgrimage_1095_%2848002594858%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/20190530_Spain_and_Portugal_El_Camino_Pilgrimage_0218_%2848002496321%29.jpg/3840px-20190530_Spain_and_Portugal_El_Camino_Pilgrimage_0218_%2848002496321%29.jpg",
  ],
  stopMapsUrls: [
    "https://www.google.com/maps/search/?api=1&query=Santu%C3%A1rio+de+F%C3%A1tima%2C+F%C3%A1tima",
    "https://www.google.com/maps/search/?api=1&query=Praia+do+Norte%2C+Nazar%C3%A9",
    "https://www.google.com/maps/search/?api=1&query=%C3%93bidos%2C+Portugal",
    "https://www.google.com/maps/search/?api=1&query=%C3%93bidos%2C+Portugal",
  ],
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
      highlightTitle: "Fátima, Nazaré e Óbidos",
      highlightText:
        "Três lugares num dia: a fé de Fátima, as ondas da Nazaré e a vila muralhada de Óbidos, filmados em 4K.",
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
          title: "Hotel em Lisboa",
          detail: "Pick-up e drop-off no hotel em Lisboa — Sem custo adicional",
        },
        {
          title: "Aeroporto de Lisboa",
          detail: "Recolha no aeroporto — Sem custo adicional",
        },
        {
          title: "Outras localizações",
          detail: "Disponível com custo adicional (valor a combinar após a reserva)",
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
      highlightTitle: "Fátima, Nazaré and Óbidos",
      highlightText:
        "Three places in one day: the faith of Fátima, Nazaré's waves and the walled village of Óbidos, filmed in 4K.",
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
          title: "Lisbon hotel",
          detail: "Hotel pick-up and drop-off in Lisbon — No extra cost",
        },
        {
          title: "Lisbon Airport",
          detail: "Airport pickup — No extra cost",
        },
        {
          title: "Other locations",
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
        "Tour privado por Fátima, Nazaré e Óbidos. Até 8 passageiros. A partir de €250 por grupo privado. Espiritualidade, natureza e tradição.",
    },
    en: {
      title:
        "3 Destinations Tour — Fátima, Nazaré & Óbidos | DiscoverLixboaTours",
      description:
        "Private Fátima, Nazaré and Óbidos tour. Up to 8 guests. From €250 per private group. Spirituality, nature and tradition.",
    },
  },
} as const satisfies TourDefinition;
