import type { TourDefinitionInput } from "./finalize-tour";

/**
 * Aveiro & Costa Nova — totais por grupo; display por pessoa (fonte comercial 2026).
 * Pricing: 2 €500 … 8 €800 (totais); mín. 2 convidados.
 */
export const aveiroTour = {
  slug: "aveiro",
  maxGuests: 8,
  minGuests: 2,
  durationHours: 9,
  privateTour: true,
  hotelPickup: true,
  groupTotalsCents: {
    2: 50000,
    3: 55000,
    4: 60000,
    5: 65000,
    6: 70000,
    7: 75000,
    8: 80000,
  },
  priceDisplay: "person",
  heroImage: "/assets/images/AVEIRO/hero-aveiro.jpg",
  /** Ordem = itinerário: Centro → Canais/moliceiros → Salinas → Costa Nova → Tempo livre. */
  stopImages: [
    "https://upload.wikimedia.org/wikipedia/commons/b/b8/Rua_da_Pra%C3%A7a_do_Peixe_-_Aveiro_-_Portugal.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/20200203_Moliceiro_5440.jpg/3840px-20200203_Moliceiro_5440.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/2025-08-03_Salinas_de_Aveiro.jpg/3840px-2025-08-03_Salinas_de_Aveiro.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Palheiros_da_Costa_Nova_-_Portugal_%2816367348673%29.jpg/3840px-Palheiros_da_Costa_Nova_-_Portugal_%2816367348673%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Canal_in_Aveiro_17.jpg/3840px-Canal_in_Aveiro_17.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Canal_in_Aveiro_12.jpg/3840px-Canal_in_Aveiro_12.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/20200203_Moliceiro_5441.jpg/3840px-20200203_Moliceiro_5441.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/20200203_Aveiro_5401_%2849655231976%29.jpg/3840px-20200203_Aveiro_5401_%2849655231976%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/1/14/Costa_Nova_do_Prado.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/b/b0/Palheiros_da_Costa_Nova.jpg",
  ],
  stopMapsUrls: [
    "https://www.google.com/maps/search/?api=1&query=Centro+de+Aveiro%2C+Portugal",
    "https://www.google.com/maps/search/?api=1&query=Canais+de+Aveiro%2C+Portugal",
    "https://www.google.com/maps/search/?api=1&query=Salinas+de+Aveiro%2C+Portugal",
    "https://www.google.com/maps/search/?api=1&query=Costa+Nova%2C+Aveiro",
    "",
  ],
  videoYoutubeId: "4obWb9N3l1s",
  gallery: [
    {
      src: "/assets/images/AVEIRO/IMG!.webp",
      alt: {
        pt: "Aveiro & Costa Nova — imagem 1",
        en: "Aveiro & Costa Nova — image 1",
      },
    },
    {
      src: "/assets/images/AVEIRO/IMG2.webp",
      alt: {
        pt: "Aveiro & Costa Nova — imagem 2",
        en: "Aveiro & Costa Nova — image 2",
      },
    },
    {
      src: "/assets/images/AVEIRO/IMG3.webp",
      alt: {
        pt: "Aveiro & Costa Nova — imagem 3",
        en: "Aveiro & Costa Nova — image 3",
      },
    },
    {
      src: "/assets/images/AVEIRO/IMG4.webp",
      alt: {
        pt: "Aveiro & Costa Nova — imagem 4",
        en: "Aveiro & Costa Nova — image 4",
      },
    },
  ],
  content: {
    pt: {
      title: "Tour Aveiro & Costa Nova",
      subtitle:
        "Descubra Aveiro, a “Veneza de Portugal”, com canais pitorescos e moliceiros, e a icónica Costa Nova com as suas casas coloridas — num tour privado à medida.",
      experienceText:
        "Aveiro parece postal: canais, moliceiros e a Costa Nova às riscas. Neste tour privado, tens tempo para passear, provar e fotografar sem o stress do autocarro cheio.\n\nUm dia leve, colorido e à vossa medida — a Veneza de Portugal, sem filas e com guia local.",
      aboutHtml: [
        "Descubra <strong>Aveiro</strong>, conhecida como a “Veneza de Portugal”, com os seus <strong>canais pitorescos</strong> e <strong>barcos tradicionais (moliceiros)</strong>. Este tour privado combina charme, cultura e paisagens únicas.",
        "Inclui uma visita à icónica <strong>Costa Nova</strong>, famosa pelas <strong>casas às riscas</strong> coloridas, e tempo para explorar ao teu ritmo.",
        "<strong>Tour privado e totalmente personalizável</strong>, adaptado ao ritmo e às preferências do cliente.",
      ],
      highlightTitle: "Aveiro e a Costa Nova",
      highlightText:
        "Canais, moliceiros e os palheiros coloridos da Costa Nova. A Veneza de Portugal em 4K, da ria ao Atlântico.",
      itinerary: [
        {
          badge: "Centro",
          title: "Centro de Aveiro",
          descriptionHtml:
            "Passeio pelo centro histórico e ambiente acolhedor da cidade.",
        },
        {
          badge: "Canais",
          title: "Canais e moliceiros",
          descriptionHtml:
            "Conheça os canais e os barcos tradicionais — símbolos de Aveiro.",
        },
        {
          badge: "Salinas",
          title: "Salinas de Aveiro",
          descriptionHtml: "Paisagens únicas ligadas ao sal e à Ria.",
        },
        {
          badge: "Costa Nova",
          title: "Costa Nova",
          descriptionHtml:
            "As famosas casas coloridas às riscas junto à praia.",
        },
        {
          badge: "Livre",
          title: "Tempo livre",
          descriptionHtml:
            "Para explorar, fotografar e desfrutar sem pressas.",
        },
      ],
      included: [
        "Mercedes-Benz Vito 116 CDI Select",
        "Guia local",
        "Pick-up e drop-off no hotel",
        "Experiência de dia completo",
      ],
      notIncluded: [
        "Passeio de moliceiro (opcional)",
        "Refeições",
      ],
      whyChooseHtml:
        "Um dia completo pela Ria de Aveiro e pela Costa Nova, com flexibilidade total num formato privado — ideal para quem procura autenticidade e fotos memoráveis.",
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
      title: "Aveiro & Costa Nova Private Tour",
      subtitle:
        "Discover Aveiro, Portugal’s “Venice”, with picturesque canals and moliceiro boats, and iconic Costa Nova with its colourful striped houses — on a tailor-made private tour.",
      experienceText:
        "Aveiro looks like a postcard: canals, moliceiros and striped Costa Nova. On this private tour, you get time to stroll, taste and shoot — without the packed-bus stress.\n\nA light, colourful day made for your group — Portugal’s Venice, with a local guide and no rush.",
      aboutHtml: [
        "Discover <strong>Aveiro</strong>, known as Portugal’s “Venice”, with its <strong>picturesque canals</strong> and <strong>traditional moliceiro boats</strong>. This private tour blends charm, culture and unique landscapes.",
        "Includes a visit to iconic <strong>Costa Nova</strong>, famous for its colourful <strong>striped houses</strong>, and time to explore at your own pace.",
        "<strong>Fully private and customizable</strong> — adapted to your pace and preferences.",
      ],
      highlightTitle: "Aveiro and Costa Nova",
      highlightText:
        "Canals, moliceiro boats and the colourful Costa Nova houses. Portugal's Venice in 4K, from the lagoon to the Atlantic.",
      itinerary: [
        {
          badge: "Centre",
          title: "Aveiro city centre",
          descriptionHtml:
            "Stroll through the historic centre and welcoming atmosphere.",
        },
        {
          badge: "Canals",
          title: "Canals & moliceiros",
          descriptionHtml:
            "See the canals and traditional boats — symbols of Aveiro.",
        },
        {
          badge: "Salt pans",
          title: "Aveiro salt pans",
          descriptionHtml:
            "Unique landscapes linked to salt and the Ria.",
        },
        {
          badge: "Costa Nova",
          title: "Costa Nova",
          descriptionHtml:
            "The famous colourful striped houses by the beach.",
        },
        {
          badge: "Free time",
          title: "Free time",
          descriptionHtml:
            "To explore, take photos and enjoy without rushing.",
        },
      ],
      included: [
        "Mercedes-Benz Vito 116 CDI Select",
        "Local guide",
        "Hotel pick-up & drop-off",
        "Full-day experience",
      ],
      notIncluded: [
        "Moliceiro boat ride (optional)",
        "Meals",
      ],
      whyChooseHtml:
        "A full day around the Ria de Aveiro and Costa Nova with total flexibility in a private format — perfect for authenticity and memorable photos.",
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
      title: "Tour Aveiro & Costa Nova | DiscoverLixboaTours",
      description:
        "Tour privado por Aveiro e Costa Nova. Até 8 passageiros (mín. 2). A partir de €100 por pessoa. Canais, moliceiros e casas às riscas.",
    },
    en: {
      title: "Private Aveiro & Costa Nova Day Trip from Lisbon",
      description:
        "Private Aveiro day trip from Lisbon — canals, moliceiro boats and Costa Nova striped houses. English-speaking driver-guide, hotel pickup. From €100/person (min. 2).",
    },
  },
} as const satisfies TourDefinitionInput;
