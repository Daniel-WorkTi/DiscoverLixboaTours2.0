import type { TourDefinition } from "./types";

/**
 * Arrábida, Setúbal & Sesimbra — totais por grupo (última tabela Mike).
 * 2 €280 … 8 €680; display €/pessoa; mín. 2 convidados.
 */
export const arraabidaTour = {
  slug: "arraabida",
  maxGuests: 8,
  minGuests: 2,
  durationHours: 8,
  privateTour: true,
  hotelPickup: true,
  groupTotalsCents: {
    2: 28000,
    3: 34500,
    4: 42000,
    5: 50000,
    6: 57000,
    7: 66500,
    8: 68000,
  },
  priceDisplay: "person" as const,
  heroImage:
    "/assets/images/arrabida-galeria/imgi_1_0718_credit-paulo-ribeiro_660x371.webp",
  videoYoutubeId: "RSZFe7BNJOc",
  gallery: [
    {
      src: "/assets/images/arrabida-galeria/imgi_1_0718_credit-paulo-ribeiro_660x371.webp",
      alt: { pt: "Arrábida — vista 1", en: "Arrábida — view 1" },
    },
    {
      src: "/assets/images/arrabida-galeria/imgi_2_1446_065hrpt02_credit-rr-tdp_660x371.webp",
      alt: { pt: "Arrábida — vista 2", en: "Arrábida — view 2" },
    },
    {
      src: "/assets/images/arrabida-galeria/imgi_20_hq720.webp",
      alt: { pt: "Arrábida — vista 3", en: "Arrábida — view 3" },
    },
    {
      src: "/assets/images/arrabida-galeria/n4.pra1359d.webp",
      alt: { pt: "Arrábida — vista 4", en: "Arrábida — view 4" },
    },
  ],
  content: {
    pt: {
      title: "Tour Privado Arrábida, Setúbal & Sesimbra",
      subtitle:
        "Descubra a beleza natural da Serra da Arrábida, a autenticidade de Setúbal e o charme de Sesimbra num tour privado que combina natureza, história e vistas deslumbrantes",
      aboutHtml: [
        "Uma jornada completa pela natureza selvagem e pela história autêntica de Portugal. Começamos no majestoso <strong>Cristo Rei</strong> (subida opcional) com vista panorâmica sobre Lisboa e o Rio Tejo, passando pela icónica <strong>Ponte 25 de Abril</strong>.",
        "Exploramos o <strong>Parque Natural da Arrábida e Portinho da Arrábida</strong>, uma serra protegida com vistas espetaculares e uma praia paradisíaca de águas cristalinas.",
        "Em <strong>Setúbal</strong>, desfrutamos de um <strong>almoço típico</strong> com a gastronomia local autêntica. Terminamos com uma <strong>paragem em Sesimbra</strong>, uma vila piscatória com charme único e vistas deslumbrantes sobre o mar.",
        "Viaja com conforto na nossa van privada climatizada, com um guia local experiente que te levará aos locais mais espetaculares e autênticos desta região única de Portugal.",
      ],
      itinerary: [
        {
          badge: "Cristo Rei",
          title: "Cristo Rei (subida opcional)",
          descriptionHtml:
            "Vista panorâmica deslumbrante sobre Lisboa e o Rio Tejo<br><strong>Ponte 25 de Abril</strong><br><em>Entrada opcional (não incluída)</em>",
        },
        {
          badge: "Arrábida",
          title: "Parque Natural da Arrábida e Portinho da Arrábida",
          descriptionHtml:
            "Serra protegida com vistas espetaculares<br><strong>Portinho da Arrábida</strong> - praia paradisíaca de águas cristalinas",
        },
        {
          badge: "Setúbal",
          title: "Almoço típico em Setúbal",
          descriptionHtml:
            "Gastronomia local autêntica<br><strong>Especialidades regionais</strong> - sabores únicos de Setúbal",
        },
        {
          badge: "Sesimbra",
          title: "Paragem em Sesimbra",
          descriptionHtml:
            "Vila piscatória com charme único<br><strong>Vistas deslumbrantes</strong> sobre o mar<br><strong>Momento de relaxamento</strong> final",
        },
      ],
      included: [
        "Van privada com ar-condicionado + guia",
        "Pick-up e drop-off no hotel",
        "Água a bordo",
        "Guia local com histórias e dicas",
        "Música personalizada",
      ],
      notIncluded: [
        "Refeições e bebidas (salvo degustações pontuais)",
        "Entradas (Cristo Rei, Castelo de Sesimbra, etc.)",
        "Despesas pessoais e gratificações",
        "Portagens/estacionamento fora do plano",
      ],
      whyChooseHtml:
        "Porque a natureza portuguesa tem segredos que só os locais conhecem.<br>E com a DiscoverLixboaTours, vais descobrir a Arrábida, Setúbal e Sesimbra da forma mais autêntica e exclusiva possível.",
      stopsLabel: "5+ locais únicos",
    },
    en: {
      title: "Private Arrábida, Setúbal & Sesimbra Tour",
      subtitle:
        "Discover the natural beauty of Serra da Arrábida, the authenticity of Setúbal and the charm of Sesimbra on a private tour that combines nature, history and stunning views",
      aboutHtml: [
        "A complete journey through the wild nature and authentic history of Portugal. We start at the majestic <strong>Christ the King</strong> (optional ascent) with a panoramic view over Lisbon and the Tagus River, passing by the iconic <strong>25th of April Bridge</strong>.",
        "We explore the <strong>Arrábida Natural Park and Portinho da Arrábida</strong>, a protected mountain range with spectacular views and a paradise beach with crystal clear waters.",
        "In <strong>Setúbal</strong>, we enjoy a <strong>typical lunch</strong> with authentic local cuisine. We end with a <strong>stop in Sesimbra</strong>, a fishing village with unique charm and stunning views over the sea.",
        "Travel in comfort in our private air-conditioned van, with an experienced local guide who will take you to the most spectacular and authentic places in this unique region of Portugal.",
      ],
      itinerary: [
        {
          badge: "Christ the King",
          title: "Christ the King (optional ascent)",
          descriptionHtml:
            "Stunning panoramic view over Lisbon and the Tagus River<br><strong>25th of April Bridge</strong><br><em>Optional entry (not included)</em>",
        },
        {
          badge: "Arrábida",
          title: "Arrábida Natural Park and Portinho da Arrábida",
          descriptionHtml:
            "Protected mountain range with spectacular views<br><strong>Portinho da Arrábida</strong> - paradise beach with crystal clear waters",
        },
        {
          badge: "Setúbal",
          title: "Typical lunch in Setúbal",
          descriptionHtml:
            "Authentic local cuisine<br><strong>Regional specialties</strong> - unique flavors of Setúbal",
        },
        {
          badge: "Sesimbra",
          title: "Stop in Sesimbra",
          descriptionHtml:
            "Fishing village with unique charm<br><strong>Stunning views</strong> over the sea<br><strong>Final relaxation</strong> moment",
        },
      ],
      included: [
        "Private air-conditioned van + experienced guide",
        "Hotel pick-up and drop-off",
        "Water on board",
        "Local guide with stories and tips",
        "Personalized music",
      ],
      notIncluded: [
        "Meals and drinks (except occasional tastings)",
        "Entry tickets (Christ the King, Sesimbra Castle, etc.)",
        "Personal expenses and gratuities",
        "Tolls/parking outside the plan",
      ],
      whyChooseHtml:
        "Because Portuguese nature has secrets that only locals know.<br>And with DiscoverLixboaTours, you'll discover Arrábida, Setúbal and Sesimbra in the most authentic and exclusive way possible.",
      stopsLabel: "5+ unique sites",
    },
  },
  seo: {
    pt: {
      title: "Tour Privado Arrábida, Setúbal & Sesimbra | DiscoverLixboaTours",
      description:
        "Tour privado pela Arrábida, Setúbal e Sesimbra. Até 8 passageiros. A partir de €85 por pessoa. Natureza e vistas do Atlântico.",
    },
    en: {
      title:
        "Private Arrábida, Setúbal & Sesimbra Tour | DiscoverLixboaTours",
      description:
        "Private Arrábida, Setúbal and Sesimbra tour. Up to 8 guests. From €85 per person. Nature and Atlantic views.",
    },
  },
} as const satisfies TourDefinition;
