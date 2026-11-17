import type { TourDefinition } from "./types";

/**
 * Monsanto & Centro de Portugal — totais por grupo; display por pessoa (fonte comercial 2026).
 * Pricing: 2 €600 … 8 €900 (totais); mín. 2 convidados.
 */
export const monsantoTour = {
  slug: "monsanto",
  maxGuests: 8,
  minGuests: 2,
  durationHours: 8,
  privateTour: true,
  hotelPickup: true,
  groupTotalsCents: {
    2: 60000,
    3: 65000,
    4: 70000,
    5: 75000,
    6: 80000,
    7: 85000,
    8: 90000,
  },
  priceDisplay: "person",
  heroImage: "/assets/images/Monsanto/monsanto1.webp",
  /** Ordem = itinerário: Aldeia → Castelo → Interior → Restaurante → Ritmo. */
  stopImages: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Monsanto_April_2015-2a.jpg/3840px-Monsanto_April_2015-2a.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/f/fa/Castelo_de_Monsanto.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Granite_boulder_formations_near_the_Monsanto_Castle_at_sunrise%2C_Aldeia_de_Monsanto%2C_Portugal_%282%29_julesvernex2-3.jpg/3840px-Granite_boulder_formations_near_the_Monsanto_Castle_at_sunrise%2C_Aldeia_de_Monsanto%2C_Portugal_%282%29_julesvernex2-3.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/9/91/Aldeia_velha_de_Monsanto_-_Casa_entre_as_pedras.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/e/e1/Aldeia_de_Monsanto.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Monsanto_April_2015-1a.jpg/3840px-Monsanto_April_2015-1a.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Monsanto_April_2015-3a.jpg/3840px-Monsanto_April_2015-3a.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Stairway_Monsanto_Castle_April_2015-1.jpg/3840px-Stairway_Monsanto_Castle_April_2015-1.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/4/49/Monsanto_e_Idanha-a-Velha_-_Aldeia_Velha_de_Monsanto_-_20210417152804.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Monsanto_Portugal.jpg/3840px-Monsanto_Portugal.jpg",
  ],
  stopMapsUrls: [
    "https://www.google.com/maps/search/?api=1&query=Monsanto%2C+Idanha-a-Nova%2C+Portugal",
    "https://www.google.com/maps/search/?api=1&query=Castelo+de+Monsanto%2C+Idanha-a-Nova",
    "https://www.google.com/maps/search/?api=1&query=Aldeia+de+Monsanto%2C+Portugal",
    "https://www.google.com/maps/search/?api=1&query=Restaurantes+Monsanto%2C+Idanha-a-Nova",
    "",
  ],
  videoYoutubeId: "44MNaDCyR4A",
  gallery: [
    {
      src: "/assets/images/Monsanto/monsanto.webp",
      alt: {
        pt: "Monsanto — aldeia de pedra",
        en: "Monsanto — stone village",
      },
    },
    {
      src: "/assets/images/Monsanto/monsanto1.webp",
      alt: {
        pt: "Monsanto & Centro de Portugal — imagem 1",
        en: "Monsanto & Central Portugal — image 1",
      },
    },
    {
      src: "/assets/images/Monsanto/monsanto2.webp",
      alt: {
        pt: "Monsanto & Centro de Portugal — imagem 2",
        en: "Monsanto & Central Portugal — image 2",
      },
    },
    {
      src: "/assets/images/Monsanto/monsanto3.png",
      alt: {
        pt: "Monsanto & Centro de Portugal — imagem 3",
        en: "Monsanto & Central Portugal — image 3",
      },
    },
    {
      src: "/assets/images/Monsanto/monsanto4.webp",
      alt: {
        pt: "Monsanto & Centro de Portugal — imagem 4",
        en: "Monsanto & Central Portugal — image 4",
      },
    },
  ],
  content: {
    pt: {
      title: "Tour Privado Monsanto & Centro de Portugal",
      subtitle:
        "Um dia por Monsanto e pelo coração de Portugal — com Miguel, guia local e fundador da DiscoverLixboaTours.",
      aboutHtml: [
        "<strong>Monsanto</strong> — a “aldeia mais portuguesa de Portugal” — com casas entre <strong>enormes rochas de granito</strong>, ruas medievais e um cenário único. Esta aldeia foi também <strong>palco da série House of the Dragon</strong>, o que a torna ainda mais especial.",
        "O dia inclui ainda uma viagem por <strong>zonas menos turísticas</strong>: paisagens rurais autênticas, pequenas aldeias e um <strong>Portugal genuíno e pouco explorado</strong>.",
        "<strong>Tour privado e personalizado</strong>, na <strong>Mercedes-Benz Vito 116 CDI Select</strong>, com <strong>horários flexíveis</strong> — ideal para quem procura um “lugar secreto” e fotos memoráveis.",
      ],
      highlightTitle: "Monsanto, a aldeia de pedra",
      highlightText:
        "Casas entre penedos graníticos, filmadas em 4K. A aldeia mais portuguesa de Portugal, no alto da serra.",
      itinerary: [
        {
          badge: "Monsanto",
          title: "A aldeia mais portuguesa",
          descriptionHtml:
            "Passeio pelas ruas estreitas entre rochas gigantes, ambiente medieval autêntico e cenário da série <em>House of the Dragon</em>.",
        },
        {
          badge: "Castelo",
          title: "Castelo de Monsanto & miradouros",
          descriptionHtml:
            "Visita ao castelo com vistas deslumbrantes e spots únicos para fotografia.",
        },
        {
          badge: "Interior",
          title: "Portugal autêntico",
          descriptionHtml:
            "Paisagens rurais, pequenas aldeias tradicionais e um território genuíno, longe dos roteiros óbvios.",
        },
        {
          badge: "Almoço",
          title: "Restaurante local",
          descriptionHtml:
            "Recomendação de almoço em restaurante local (não turístico): comida tradicional e ambiente verdadeiro — <strong>valor à parte</strong>.",
        },
        {
          badge: "Privado",
          title: "O teu ritmo",
          descriptionHtml:
            "Mercedes-Benz Vito 116 CDI Select, horários flexíveis e rota ajustada ao que mais queres explorar.",
        },
      ],
      included: [
        "Mercedes-Benz Vito 116 CDI Select",
        "Motorista/guia local",
        "Pick-up e drop-off no hotel",
        "Experiência privada de dia completo",
      ],
      notIncluded: [
        "Entradas em monumentos (ex.: castelo, se aplicável)",
        "Refeições e despesas pessoais",
      ],
      whyChooseHtml:
        "Destino único e diferente, sensação de “lugar secreto”, ligação a uma série de renome e excelente para fotos — um dia memorável fora dos circuitos óbvios, com a DiscoverLixboaTours.",
      stopsLabel: "Monsanto & Centro de Portugal",
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
      title: "Private Tour Monsanto & Central Portugal",
      subtitle:
        "A full day in Monsanto and the heart of Portugal — with Miguel, local guide and founder of DiscoverLixboaTours.",
      aboutHtml: [
        "<strong>Monsanto</strong> — “the most Portuguese village in Portugal” — with houses tucked among <strong>huge granite boulders</strong>, medieval lanes and a unique setting. The village was also a <strong>filming location for House of the Dragon</strong>, which makes it even more special.",
        "The day also takes you through <strong>less touristy areas</strong>: authentic rural landscapes, small villages and a <strong>genuine, off-the-beaten-path Portugal</strong>.",
        "<strong>Private, tailor-made tour</strong> in the <strong>Mercedes-Benz Vito 116 CDI Select</strong> with <strong>flexible timing</strong> — perfect for a “secret place” feel and memorable photos.",
      ],
      highlightTitle: "Monsanto, the stone village",
      highlightText:
        "Houses set among granite boulders, filmed in 4K. Portugal's most Portuguese village, high in the hills.",
      itinerary: [
        {
          badge: "Monsanto",
          title: "The most Portuguese village",
          descriptionHtml:
            "Walk narrow streets between giant rocks, soak up the medieval mood and see the <em>House of the Dragon</em> backdrop.",
        },
        {
          badge: "Castle",
          title: "Monsanto Castle & viewpoints",
          descriptionHtml:
            "Visit the castle for sweeping views and unique photo spots.",
        },
        {
          badge: "Interior",
          title: "Authentic Portugal",
          descriptionHtml:
            "Rural scenery, traditional hamlets and a genuine interior far from crowded routes.",
        },
        {
          badge: "Lunch",
          title: "Local restaurant",
          descriptionHtml:
            "Lunch suggestion at a non-touristy local spot: traditional food and a real atmosphere — <strong>paid separately</strong>.",
        },
        {
          badge: "Private",
          title: "Your pace",
          descriptionHtml:
            "Mercedes-Benz Vito 116 CDI Select, flexible schedule and a route adapted to what you want to explore most.",
        },
      ],
      included: [
        "Mercedes-Benz Vito 116 CDI Select",
        "Local driver/guide",
        "Hotel pick-up & drop-off",
        "Full-day private experience",
      ],
      notIncluded: [
        "Monument entrance fees (e.g. castle, if applicable)",
        "Meals and personal expenses",
      ],
      whyChooseHtml:
        "A unique, off-radar destination with a “secret place” feel, a tie-in to a major TV series and great photo opportunities — a memorable day away from the obvious circuits, with DiscoverLixboaTours.",
      stopsLabel: "Monsanto & Central Portugal",
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
      title: "Tour Privado Monsanto | DiscoverLixboaTours",
      description:
        "Tour privado Monsanto e Centro de Portugal. Até 8 passageiros (mín. 2). A partir de €300 por pessoa. Recolha no hotel.",
    },
    en: {
      title: "Private Monsanto Tour from Lisbon | Central Portugal",
      description:
        "Private day trip from Lisbon to Monsanto — one of Portugal’s most unique stone villages. English-speaking local guide, hotel pickup. From €300/person (min. 2).",
    },
  },
} as const satisfies TourDefinition;
