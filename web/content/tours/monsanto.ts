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
  videoYoutubeId: "44MNaDCyR4A",
  gallery: [
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
        "<strong>Tour privado e personalizado</strong>, em <strong>carrinha confortável</strong>, com <strong>horários flexíveis</strong> — ideal para quem procura um “lugar secreto” e fotos memoráveis.",
      ],
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
            "Carrinha confortável, horários flexíveis e rota ajustada ao que mais queres explorar.",
        },
      ],
      included: [
        "Veículo privado Mercedes",
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
    },
    en: {
      title: "Private Tour Monsanto & Central Portugal",
      subtitle:
        "A full day in Monsanto and the heart of Portugal — with Miguel, local guide and founder of DiscoverLixboaTours.",
      aboutHtml: [
        "<strong>Monsanto</strong> — “the most Portuguese village in Portugal” — with houses tucked among <strong>huge granite boulders</strong>, medieval lanes and a unique setting. The village was also a <strong>filming location for House of the Dragon</strong>, which makes it even more special.",
        "The day also takes you through <strong>less touristy areas</strong>: authentic rural landscapes, small villages and a <strong>genuine, off-the-beaten-path Portugal</strong>.",
        "<strong>Private, tailor-made tour</strong> in a <strong>comfortable van</strong> with <strong>flexible timing</strong> — perfect for a “secret place” feel and memorable photos.",
      ],
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
            "Comfortable van, flexible schedule and a route adapted to what you want to explore most.",
        },
      ],
      included: [
        "Private Mercedes vehicle",
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
    },
  },
  seo: {
    pt: {
      title: "Tour Privado Monsanto | DiscoverLixboaTours",
      description:
        "Tour privado Monsanto e Centro de Portugal. Até 8 passageiros (mín. 2). A partir de €300 por pessoa. Recolha no hotel.",
    },
    en: {
      title: "Private Monsanto Tour | DiscoverLixboaTours",
      description:
        "Private Monsanto and Central Portugal tour. Up to 8 guests (min. 2). From €300 per person. Hotel pickup available.",
    },
  },
} as const satisfies TourDefinition;
