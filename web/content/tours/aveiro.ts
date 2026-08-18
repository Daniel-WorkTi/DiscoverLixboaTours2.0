import type { TourDefinition } from "./types";

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
  heroImage: "/assets/images/AVEIRO/Banner.webp",
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
      aboutHtml: [
        "Descubra <strong>Aveiro</strong>, conhecida como a “Veneza de Portugal”, com os seus <strong>canais pitorescos</strong> e <strong>barcos tradicionais (moliceiros)</strong>. Este tour privado combina charme, cultura e paisagens únicas.",
        "Inclui uma visita à icónica <strong>Costa Nova</strong>, famosa pelas <strong>casas às riscas</strong> coloridas, e tempo para explorar ao teu ritmo.",
        "<strong>Tour privado e totalmente personalizável</strong>, adaptado ao ritmo e às preferências do cliente.",
      ],
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
        "Veículo privado",
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
      title: "Aveiro & Costa Nova Private Tour",
      subtitle:
        "Discover Aveiro, Portugal’s “Venice”, with picturesque canals and moliceiro boats, and iconic Costa Nova with its colourful striped houses — on a tailor-made private tour.",
      aboutHtml: [
        "Discover <strong>Aveiro</strong>, known as Portugal’s “Venice”, with its <strong>picturesque canals</strong> and <strong>traditional moliceiro boats</strong>. This private tour blends charm, culture and unique landscapes.",
        "Includes a visit to iconic <strong>Costa Nova</strong>, famous for its colourful <strong>striped houses</strong>, and time to explore at your own pace.",
        "<strong>Fully private and customizable</strong> — adapted to your pace and preferences.",
      ],
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
        "Private vehicle",
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
      title: "Tour Aveiro & Costa Nova | DiscoverLixboaTours",
      description:
        "Tour privado por Aveiro e Costa Nova. Até 8 passageiros (mín. 2). A partir de €100 por pessoa. Canais, moliceiros e casas às riscas.",
    },
    en: {
      title: "Aveiro & Costa Nova Private Tour | DiscoverLixboaTours",
      description:
        "Private Aveiro and Costa Nova tour. Up to 8 guests (min. 2). From €100 per person. Canals, moliceiros and striped houses.",
    },
  },
} as const satisfies TourDefinition;
