import type { TourDefinition } from "./types";

/**
 * Premium Alentejo — totais de grupo convertidos de per_person × n (fonte comercial 2026).
 * 2×275 … 8×145 → totais; mín. 2; display por pessoa.
 */
export const alentejoTour = {
  slug: "alentejo",
  maxGuests: 8,
  minGuests: 2,
  durationHours: 8,
  privateTour: true,
  hotelPickup: true,
  groupTotalsCents: {
    2: 55000,
    3: 66000,
    4: 78000,
    5: 87500,
    6: 99000,
    7: 108500,
    8: 116000,
  },
  priceDisplay: "person",
  heroImage: "/assets/images/alentejo-galeria/estremoz.webp",
  videoYoutubeId: "Q9rnV-2j2LM",
  gallery: [
    {
      src: "/assets/images/alentejo-galeria/estremoz.webp",
      alt: { pt: "Alentejo — Estremoz", en: "Alentejo — Estremoz" },
    },
    {
      src: "/assets/images/alentejo-galeria/arraiolos_tapetes.webp",
      alt: {
        pt: "Alentejo — tapeçarias de Arraiolos",
        en: "Alentejo — Arraiolos tapestries",
      },
    },
    {
      src: "/assets/images/alentejo-galeria/imgi_4_site_0361_0016-1200-630-20151104161636-800.webp",
      alt: { pt: "Alentejo — Évora", en: "Alentejo — Évora" },
    },
    {
      src: "/assets/images/alentejo-galeria/imgi_6_estremoz-flickrccby-phillipc.webp",
      alt: {
        pt: "Alentejo — paisagem de Estremoz",
        en: "Alentejo — Estremoz landscape",
      },
    },
  ],
  content: {
    pt: {
      title: "Premium Alentejo Wine, Food & Culture Experience",
      subtitle:
        "Wine & Food Experience no Alentejo: uma viagem premium de património, vinha e mesa — Évora, Estremoz e Arraiolos com storytelling local e ritmo de prova, não de correria turística.",
      aboutHtml: [
        "Uma jornada pelo Alentejo, a região mais autêntica de Portugal, onde o tempo parece ter parado. Começamos em <strong>Évora</strong> com o <strong>Templo de Diana</strong>, a <strong>Sé</strong> e a famosa <strong>Capela dos Ossos</strong>.",
        "Em <strong>Estremoz</strong>, descobrimos uma vila medieval encantadora e degustamos os famosos <strong>vinhos alentejanos</strong>. Terminamos em <strong>Arraiolos</strong>, famosa pelas suas <strong>tapeçarias tradicionais</strong> artesanais.",
        "Viaja com conforto na nossa van privada climatizada, com um guia experiente que te levará pelos segredos mais bem guardados desta região única, onde a história, a cultura e a tradição se encontram.",
      ],
      itinerary: [
        {
          badge: "Évora",
          title: "Évora: Templo de Diana, Sé, Capela dos Ossos",
          descriptionHtml:
            "<strong>Templo de Diana</strong> - ruínas romanas únicas<br><strong>Sé Catedral de Évora</strong> - arquitetura gótica<br><strong>Capela dos Ossos</strong> - experiência única e impactante",
        },
        {
          badge: "Estremoz",
          title: "Estremoz: Vila Medieval e Vinhos",
          descriptionHtml:
            "Vila medieval com castelo imponente<br><strong>Degustação de vinhos alentejanos</strong><br><strong>Artesanato local</strong> - cerâmica tradicional",
        },
        {
          badge: "Arraiolos",
          title: "Arraiolos: Tapeçarias Tradicionais",
          descriptionHtml:
            "Vila famosa pelas tapeçarias artesanais<br><strong>Oficina de tapeçarias</strong> - demonstração ao vivo<br><strong>Castelo de Arraiolos</strong> - vistas panorâmicas",
        },
        {
          badge: "Fotos",
          title: "Paragens para Fotos nos Melhores Pontos",
          descriptionHtml:
            "Paisagens alentejanas únicas<br><strong>Oliveiras centenárias</strong><br><strong>Montados de sobro</strong> - ecossistema único",
        },
      ],
      included: [
        "Veículo privado Mercedes",
        "Motorista/guia local",
        "Pick-up e drop-off no hotel",
      ],
      notIncluded: [
        "O almoço não está incluído.",
        "Visita a adega (pago à parte)",
        "Prova de vinhos (pago à parte)",
        "Degustação regional alentejana com produtos locais (pago à parte)",
        "Bebidas e água engarrafada (pago à parte)",
        "Entradas em monumentos",
        "Despesas pessoais e lembranças",
        "Gratificações",
      ],
      whyChooseHtml:
        "Porque o Alentejo é a alma de Portugal.<br>E com a DiscoverLixboaTours, vais descobrir Évora, Estremoz e Arraiolos da forma mais autêntica e exclusiva possível.",
      stopsLabel: "3 cidades históricas",
    },
    en: {
      title: "Premium Alentejo Wine, Food & Culture Experience",
      subtitle:
        "Wine & Food Experience in Alentejo: a premium journey of heritage, vineyard and table — Évora, Estremoz and Arraiolos with local storytelling and tasting pace, not a tourist rush.",
      aboutHtml: [
        "A journey through Alentejo, Portugal's most authentic region, where time seems to have stopped. We start in <strong>Évora</strong> with the <strong>Temple of Diana</strong>, the <strong>Cathedral</strong> and the famous <strong>Chapel of Bones</strong>.",
        "In <strong>Estremoz</strong>, we discover a charming medieval village and taste the famous <strong>Alentejo wines</strong>. We end in <strong>Arraiolos</strong>, famous for its traditional handcrafted <strong>tapestries</strong>.",
        "Travel in comfort in our private air-conditioned van, with an experienced guide who will take you through the best-kept secrets of this unique region, where history, culture and tradition meet.",
      ],
      itinerary: [
        {
          badge: "Évora",
          title: "Évora: Temple of Diana, Cathedral, Chapel of Bones",
          descriptionHtml:
            "<strong>Temple of Diana</strong> - unique Roman ruins<br><strong>Évora Cathedral</strong> - Gothic architecture<br><strong>Chapel of Bones</strong> - unique and impactful experience",
        },
        {
          badge: "Estremoz",
          title: "Estremoz: Medieval Village and Wines",
          descriptionHtml:
            "Medieval village with imposing castle<br><strong>Alentejo wine tasting</strong><br><strong>Local crafts</strong> - traditional pottery",
        },
        {
          badge: "Arraiolos",
          title: "Arraiolos: Traditional Tapestries",
          descriptionHtml:
            "Village famous for handmade tapestries<br><strong>Tapestry workshop</strong> - live demonstration<br><strong>Arraiolos Castle</strong> - panoramic views",
        },
        {
          badge: "Photos",
          title: "Photo Stops at the Best Spots",
          descriptionHtml:
            "Unique Alentejo landscapes<br><strong>Century-old olive trees</strong><br><strong>Cork oak forests</strong> - unique ecosystem",
        },
      ],
      included: [
        "Private Mercedes vehicle",
        "Local driver/guide",
        "Hotel pick-up & drop-off",
      ],
      notIncluded: [
        "Lunch is not included.",
        "Winery visit (paid separately)",
        "Wine tasting (paid separately)",
        "Regional Alentejo tasting with local products (paid separately)",
        "Drinks and bottled water (paid separately)",
        "Monument entrances",
        "Personal expenses and souvenirs",
        "Gratuities",
      ],
      whyChooseHtml:
        "Because Alentejo is the soul of Portugal.<br>And with DiscoverLixboaTours, you'll discover Évora, Estremoz and Arraiolos in the most authentic and exclusive way possible.",
      stopsLabel: "3 historic cities",
    },
  },
  seo: {
    pt: {
      title:
        "Premium Alentejo Wine, Food & Culture | DiscoverLixboaTours",
      description:
        "Experiência premium no Alentejo: Évora, Estremoz e Arraiolos. Até 8 passageiros (mín. 2). A partir de €145 por pessoa.",
    },
    en: {
      title:
        "Premium Alentejo Wine, Food & Culture | DiscoverLixboaTours",
      description:
        "Premium Alentejo experience: Évora, Estremoz and Arraiolos. Up to 8 guests (min. 2). From €145 per person.",
    },
  },
} as const satisfies TourDefinition;
