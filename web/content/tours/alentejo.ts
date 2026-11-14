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
  heroImage: "/assets/images/alentejo-galeria/hero-alentejo.jpg",
  /** Ordem = itinerário: Évora → Estremoz → Arraiolos → Fotos. */
  stopImages: [
    "https://upload.wikimedia.org/wikipedia/commons/e/ef/Templo_de_Diana_%28%C3%89vora%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/7/73/Castelo_de_Estremoz%2C_Estremoz_02.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/6/61/Centro_Interpretativo_do_Tapete_de_Arraiolos%2C_Arraiolos_09.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Paisagem_montanhosa_no_Alentejo.jpg/3840px-Paisagem_montanhosa_no_Alentejo.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Catedral_de_%C3%89vora_-_Portugal_%2851508010468%29.jpg/3840px-Catedral_de_%C3%89vora_-_Portugal_%2851508010468%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/%C3%89vora_-_Capela_dos_Ossos.jpg/3840px-%C3%89vora_-_Capela_dos_Ossos.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/8/84/Aqueduto_da_Agua_de_Prata_-_Apr_2011.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/0/09/Castelo_de_Arraiolos.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Alentejo_Fields_%2840105854702%29.jpg/3840px-Alentejo_Fields_%2840105854702%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Alentejo_Countryside_%2810250605076%29.jpg/3840px-Alentejo_Countryside_%2810250605076%29.jpg",
  ],
  stopMapsUrls: [
    "https://www.google.com/maps/search/?api=1&query=Templo+Romano+de+%C3%89vora%2C+%C3%89vora",
    "https://www.google.com/maps/search/?api=1&query=Estremoz%2C+Portugal",
    "https://www.google.com/maps/search/?api=1&query=Arraiolos%2C+Portugal",
    "https://www.google.com/maps/search/?api=1&query=%C3%89vora%2C+Portugal",
  ],
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
      src: "/assets/images/alentejo.webp",
      alt: { pt: "Alentejo — paisagem", en: "Alentejo — landscape" },
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
      highlightTitle: "O Alentejo em aberto",
      highlightText:
        "Évora, Estremoz e a planície alentejana em 4K. Templo, castelos e uma luz larga sobre o sul interior.",
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
      title: "Premium Alentejo Wine, Food & Culture Experience",
      subtitle:
        "Wine & Food Experience in Alentejo: a premium journey of heritage, vineyard and table — Évora, Estremoz and Arraiolos with local storytelling and tasting pace, not a tourist rush.",
      aboutHtml: [
        "A journey through Alentejo, Portugal's most authentic region, where time seems to have stopped. We start in <strong>Évora</strong> with the <strong>Temple of Diana</strong>, the <strong>Cathedral</strong> and the famous <strong>Chapel of Bones</strong>.",
        "In <strong>Estremoz</strong>, we discover a charming medieval village and taste the famous <strong>Alentejo wines</strong>. We end in <strong>Arraiolos</strong>, famous for its traditional handcrafted <strong>tapestries</strong>.",
        "Travel in comfort in our private air-conditioned van, with an experienced guide who will take you through the best-kept secrets of this unique region, where history, culture and tradition meet.",
      ],
      highlightTitle: "The open Alentejo",
      highlightText:
        "Évora, Estremoz and the Alentejo plain in 4K. A temple, castles and wide light over the inland south.",
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
