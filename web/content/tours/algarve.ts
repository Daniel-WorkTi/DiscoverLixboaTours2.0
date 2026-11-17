import type { TourDefinition } from "./types";

/**
 * Algarve — tour privado, totais por grupo (fonte comercial 2026).
 * Pricing: 1–3 €600, 4 €640, 5 €680, 6 €720, 7 €760, 8 €800 (totais).
 */
export const algarveTour = {
  slug: "algarve",
  maxGuests: 8,
  minGuests: 1,
  durationHours: 12,
  privateTour: true,
  hotelPickup: true,
  groupTotalsCents: {
    1: 60000,
    2: 60000,
    3: 60000,
    4: 64000,
    5: 68000,
    6: 72000,
    7: 76000,
    8: 80000,
  },
  priceDisplay: "group",
  heroImage: "/assets/images/destinations/algarve.webp",
  /** Ordem = itinerário: Marinha → Benagil → Almoço Lagoa → Lagos/Piedade. */
  stopImages: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Praia_da_Marinha-Algarve-Portugal.jpg/3840px-Praia_da_Marinha-Algarve-Portugal.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/02-05-2017_Algar_de_Benagil_%284%29.JPG/3840px-02-05-2017_Algar_de_Benagil_%284%29.JPG",
    "https://upload.wikimedia.org/wikipedia/commons/3/39/Carvoeiro.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Ponta_da_Piedade%2C_Lagos_%2820083809934%29.jpg/3840px-Ponta_da_Piedade%2C_Lagos_%2820083809934%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Arco_Natural_da_Praia_da_Marinha.jpg/3840px-Arco_Natural_da_Praia_da_Marinha.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Algar_Seco_october_2024.jpg/3840px-Algar_Seco_october_2024.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Algarve_Ponta_da_Piedade_Von_Oben.jpg/3840px-Algarve_Ponta_da_Piedade_Von_Oben.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Praia_Dona_Ana.jpg/3840px-Praia_Dona_Ana.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Algarve_K%C3%BCste_Lagos.jpg/3840px-Algarve_K%C3%BCste_Lagos.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Cidade_e_concelho_de_Lagos%2C_Portugal_MG_8985_%2815273718392%29.jpg/3840px-Cidade_e_concelho_de_Lagos%2C_Portugal_MG_8985_%2815273718392%29.jpg",
  ],
  stopMapsUrls: [
    "https://www.google.com/maps/search/?api=1&query=Praia+da+Marinha%2C+Lagoa%2C+Algarve",
    "https://www.google.com/maps/search/?api=1&query=Gruta+de+Benagil%2C+Lagoa%2C+Algarve",
    "https://www.google.com/maps/search/?api=1&query=Lagoa%2C+Algarve%2C+Portugal",
    "https://www.google.com/maps/search/?api=1&query=Ponta+da+Piedade%2C+Lagos%2C+Algarve",
  ],
  videoYoutubeId: "-GcMIReDJVs",
  gallery: [
    {
      src: "/assets/images/galeria-algarve/img1.webp",
      alt: {
        pt: "Praia da Marinha — Algarve",
        en: "Marinha Beach — Algarve",
      },
    },
    {
      src: "/assets/images/galeria-algarve/img2.webp",
      alt: {
        pt: "Gruta de Benagil — Algarve",
        en: "Benagil Cave — Algarve",
      },
    },
    {
      src: "/assets/images/galeria-algarve/img3.webp",
      alt: {
        pt: "Vila de Carvoeiro — Algarve",
        en: "Carvoeiro village — Algarve",
      },
    },
    {
      src: "/assets/images/destinations/algarve.webp",
      alt: {
        pt: "Costa do Sol — Algarve",
        en: "Costa do Sol — Algarve",
      },
    },
  ],
  content: {
    pt: {
      title: "Tour Privado pelo Algarve",
      subtitle:
        "Experiência privada exclusiva para o teu grupo — até 8 convidados. Descubra as praias mais bonitas de Portugal, grutas espetaculares e falésias impressionantes numa viagem inesquecível pela Costa do Sol",
      aboutHtml: [
        "Descubra o melhor do Algarve — praias de postal, grutas mundialmente famosas e falésias que desafiam a imaginação. Um dia relaxado, mas cheio de aventura e paisagens inesquecíveis!",
        "Vamos explorar a Costa do Sol em conforto total, com paragens nos melhores spots para fotos, tempo para relaxar nas praias mais bonitas de Portugal e descobrir os segredos que só os locais conhecem. Tudo isto ao som de boa música e com um guia local que conhece cada canto especial desta região única.",
      ],
      highlightTitle: "A costa do Algarve",
      highlightText:
        "Praia da Marinha, Benagil e a Ponta da Piedade em 4K. Falésias douradas e água clara no sul de Portugal.",
      itinerary: [
        {
          badge: "Marinha",
          title: "Praia da Marinha",
          descriptionHtml:
            "Eleita uma das praias mais bonitas do mundo. Tempo para fotos e caminhada pelas falésias.",
        },
        {
          badge: "Benagil",
          title: "Gruta de Benagil",
          descriptionHtml:
            "Passeio de barco para visitar a mítica Gruta de Benagil<br><strong>(Bilhetes não incluídos — compra no local ou antecipadamente)</strong>",
        },
        {
          badge: "Lagoa",
          title: "Almoço em Lagoa",
          descriptionHtml:
            "Tempo livre para almoço num restaurante local <strong>(não incluído)</strong>",
        },
        {
          badge: "Lagos",
          title: "Lagos e Ponta da Piedade",
          descriptionHtml:
            "Explore o centro histórico de Lagos e visite as impressionantes falésias e miradouros da Ponta da Piedade.",
        },
      ],
      included: [
        "Mercedes-Benz Vito 116 CDI Select",
        "Guia profissional local",
        "Música ambiente personalizada",
        "Paragens fotográficas nos melhores spots",
        "Seguro de passageiros (obrigatório por lei)",
      ],
      notIncluded: [
        "Passeio de barco em Benagil (opcional – aprox. €30–40)",
        "Refeições e despesas pessoais",
      ],
      stopsLabel: "Algarve",
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
      title: "Private Algarve Day Tour",
      subtitle:
        "Exclusive private experience for your group — up to 8 guests. Discover Portugal's most beautiful beaches, spectacular caves and impressive cliffs on an unforgettable journey along the Costa do Sol",
      aboutHtml: [
        "Discover the best of the Algarve — postcard beaches, world-famous caves and cliffs that challenge the imagination. A relaxed day, but full of adventure and unforgettable landscapes!",
        "We'll explore the Costa do Sol in total comfort, with stops at the best photo spots, time to relax on Portugal's most beautiful beaches and discover secrets that only locals know. All this to the sound of good music and with a local guide who knows every special corner of this unique region.",
      ],
      highlightTitle: "The Algarve coast",
      highlightText:
        "Marinha Beach, Benagil and Ponta da Piedade in 4K. Golden cliffs and clear water in the south of Portugal.",
      itinerary: [
        {
          badge: "Marinha",
          title: "Marinha Beach",
          descriptionHtml:
            "Voted one of the most beautiful beaches in the world. Time for photos and walking along the cliffs.",
        },
        {
          badge: "Benagil",
          title: "Benagil Cave",
          descriptionHtml:
            "Boat tour to visit the mythical Benagil Cave<br><strong>(Tickets not included — purchase on site or in advance)</strong>",
        },
        {
          badge: "Lagoa",
          title: "Lunch in Lagoa",
          descriptionHtml:
            "Free time for lunch at a local restaurant <strong>(not included)</strong>",
        },
        {
          badge: "Lagos",
          title: "Lagos and Ponta da Piedade",
          descriptionHtml:
            "Explore the historic center of Lagos and visit the impressive cliffs and viewpoints of Ponta da Piedade.",
        },
      ],
      included: [
        "Mercedes-Benz Vito 116 CDI Select",
        "Professional local guide",
        "Personalized ambient music",
        "Photographic stops at the best spots",
        "Passenger insurance (mandatory by law)",
      ],
      notIncluded: [
        "Benagil boat tour (optional – approx. €30–40)",
        "Meals and personal expenses",
      ],
      stopsLabel: "Algarve",
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
      title: "Tour Privado pelo Algarve | DiscoverLixboaTours",
      description:
        "Tour privado pelo Algarve com guia local. Até 8 passageiros. A partir de €600 por grupo. Praia da Marinha, Benagil e Lagos.",
    },
    en: {
      title: "Private Algarve Day Trip from Lisbon | Benagil & Lagos",
      description:
        "Private Algarve day trip from Lisbon: Marinha Beach, Benagil Cave and Lagos. English-speaking local driver-guide, hotel pickup. From €600/group, up to 8 guests.",
    },
  },
} as const satisfies TourDefinition;
