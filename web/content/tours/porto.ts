import type { TourDefinitionInput } from "./finalize-tour";

/**
 * Porto — tour privado dia inteiro a partir de Lisboa.
 * Preço único €750 / grupo (até 8). Duração estimada 12–14 h.
 */
export const portoTour = {
  slug: "porto",
  maxGuests: 8,
  minGuests: 1,
  durationHours: 12,
  privateTour: true,
  hotelPickup: true,
  groupTotalsCents: {
    1: 75000,
    2: 75000,
    3: 75000,
    4: 75000,
    5: 75000,
    6: 75000,
    7: 75000,
    8: 75000,
  },
  priceDisplay: "group",
  heroImage: "/assets/images/destinations/hero-porto.jpg",
  /** Ordem = itinerário editorial. */
  stopImages: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Estaci%C3%B3n_de_tren_S%C3%A3o_Bento%2C_Oporto%2C_Portugal%2C_2019-06-02%2C_DD_05.jpg/3840px-Estaci%C3%B3n_de_tren_S%C3%A3o_Bento%2C_Oporto%2C_Portugal%2C_2019-06-02%2C_DD_05.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Catedral_de_Oporto%2C_Portugal%2C_2012-05-09%2C_DD_03.JPG/3840px-Catedral_de_Oporto%2C_Portugal%2C_2012-05-09%2C_DD_03.JPG",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Igreja_e_Torre_dos_Cl%C3%A9rigos.jpg/3840px-Igreja_e_Torre_dos_Cl%C3%A9rigos.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Cais_da_Ribeira%2C_Oporto%2C_Portugal%2C_2012-05-09%2C_DD_08.JPG/3840px-Cais_da_Ribeira%2C_Oporto%2C_Portugal%2C_2012-05-09%2C_DD_08.JPG",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Ponte_de_Dom_Lu%C3%ADs_I_and_Ribeira%2C_Porto_%2854795128175%29.jpg/3840px-Ponte_de_Dom_Lu%C3%ADs_I_and_Ribeira%2C_Porto_%2854795128175%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/1_Mercado_do_Bolh%C3%A3o.jpg/3840px-1_Mercado_do_Bolh%C3%A3o.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Interior_view_of_Livraria_Lello_01.jpg/3840px-Interior_view_of_Livraria_Lello_01.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Cave_Porto_Sandeman.jpg/3840px-Cave_Porto_Sandeman.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Vista_de_Vila_Nova_de_Gaia_desde_Jardim_do_Morro%2C_Portugal%2C_2012-05-09%2C_DD_05.JPG/3840px-Vista_de_Vila_Nova_de_Gaia_desde_Jardim_do_Morro%2C_Portugal%2C_2012-05-09%2C_DD_05.JPG",
  ],
  stopMapsUrls: [
    "https://www.google.com/maps/search/?api=1&query=Esta%C3%A7%C3%A3o+de+S%C3%A3o+Bento%2C+Porto",
    "https://www.google.com/maps/search/?api=1&query=S%C3%A9+do+Porto",
    "https://www.google.com/maps/search/?api=1&query=Torre+dos+Cl%C3%A9rigos%2C+Porto",
    "https://www.google.com/maps/search/?api=1&query=Ribeira%2C+Porto",
    "https://www.google.com/maps/search/?api=1&query=Ponte+Dom+Lu%C3%ADs+I%2C+Porto",
    "https://www.google.com/maps/search/?api=1&query=Mercado+do+Bolh%C3%A3o%2C+Porto",
    "https://www.google.com/maps/search/?api=1&query=Livraria+Lello%2C+Porto",
    "https://www.google.com/maps/search/?api=1&query=Caves+de+Vinho+do+Porto%2C+Vila+Nova+de+Gaia",
    "https://www.google.com/maps/search/?api=1&query=Jardim+do+Morro%2C+Vila+Nova+de+Gaia",
  ],
  videoYoutubeId: "7chyxBvCYd8",
  gallery: [
    {
      src: "/assets/images/galeria-porto/img1.webp",
      alt: { pt: "Porto — vista 1", en: "Porto — view 1" },
    },
    {
      src: "/assets/images/galeria-porto/img2.webp",
      alt: { pt: "Porto — vista 2", en: "Porto — view 2" },
    },
    {
      src: "/assets/images/galeria-porto/img3.webp",
      alt: { pt: "Porto — vista 3", en: "Porto — view 3" },
    },
  ],
  content: {
    pt: {
      title: "Porto – Tour Privado | Dia Inteiro",
      subtitle:
        "De Lisboa ao Porto na Mercedes-Benz Vito Select — até 8 passageiros, preço único por grupo. História, miradouros, Ribeira e caves de Vinho do Porto.",
      experienceText:
        "Descubra o Porto através dos olhos de um guia local. Uma viagem privada de Lisboa ao Porto: monumentos emblemáticos, ruas encantadoras, miradouros e as caves de Vila Nova de Gaia.\n\nUma experiência pessoal. Uma perspetiva local. Memórias inesquecíveis.",
      aboutHtml: [
        "Desfrute de uma excursão privada de dia inteiro, com partida de Lisboa, no conforto da nossa <strong>Mercedes-Benz Vito Select</strong>. Explore uma das cidades históricas mais bonitas de Portugal — monumentos, ruas tradicionais, arquitetura, paisagens ribeirinhas, miradouros e as famosas caves de Vinho do Porto.",
        "O itinerário inclui pausa para almoço (restaurante à escolha, não incluído) e pode ser ajustado às vossas preferências. <strong>Opção de pernoita no Porto</strong> sob consulta — mais tempo na cidade e regresso a Lisboa no dia seguinte.",
      ],
      highlightTitle: "O Porto sobre o Douro",
      highlightText:
        "Ribeira, Ponte D. Luís I e as caves de Gaia. O norte de Portugal entre granito, azulejo e rio — num dia só vosso.",
      itineraryLead: "Principais pontos de interesse — ritmo flexível, com tempo para fotografar.",
      itineraryNote:
        "Visitas à Livraria Lello e às caves de Vinho do Porto sujeitas a reserva antecipada e disponibilidade. Duração estimada: 12–14 horas (trânsito e visitas).",
      itinerary: [
        {
          badge: "São Bento",
          title: "Estação de São Bento",
          descriptionHtml:
            "A famosa estação ferroviária e os seus <strong>painéis de azulejos</strong> azuis e brancos — momentos da história portuguesa em cerâmica.",
        },
        {
          badge: "Sé",
          title: "Sé do Porto",
          descriptionHtml:
            "Um dos monumentos históricos mais importantes da cidade e as <strong>ruas medievais</strong> que a rodeiam.",
        },
        {
          badge: "Clérigos",
          title: "Torre dos Clérigos",
          descriptionHtml:
            "Símbolo emblemático do Porto — arquitetura característica e presença histórica no skyline da cidade.",
        },
        {
          badge: "Ribeira",
          title: "Ribeira",
          descriptionHtml:
            "Zona ribeirinha pitoresca: ruas tradicionais, restaurantes e vistas sobre o <strong>rio Douro</strong>.",
        },
        {
          badge: "Ponte",
          title: "Ponte D. Luís I",
          descriptionHtml:
            "Uma das pontes mais icónicas de Portugal — vistas espetaculares sobre o Douro e as duas margens.",
        },
        {
          badge: "Bolhão",
          title: "Mercado do Bolhão",
          descriptionHtml:
            "Mercado tradicional do Porto: produtos frescos, gastronomia portuguesa e ambiente autêntico.",
        },
        {
          badge: "Lello",
          title: "Livraria Lello",
          descriptionHtml:
            "Uma das livrarias históricas mais famosas do mundo — arquitetura e escadaria icónica.<br><em>Entrada com bilhete e reserva antecipada (não incluído; sujeita a disponibilidade)</em>",
        },
        {
          badge: "Caves",
          title: "Caves de Vinho do Porto — Vila Nova de Gaia",
          descriptionHtml:
            "Património e tradição do Vinho do Porto: história, produção e envelhecimento, com possibilidade de visita guiada e prova.<br><em>Visitas e provas sob reserva — não incluídas no preço</em>",
        },
        {
          badge: "Morro",
          title: "Jardim do Morro — Miradouro Panorâmico",
          descriptionHtml:
            "Uma das mais belas vistas sobre o Porto, a Ribeira, o Douro e a Ponte D. Luís I — ideal para fotografias.",
        },
      ],
      included: [
        "Transporte privado ida e volta Lisboa ↔ Porto",
        "Mercedes-Benz Vito Select (até 8 passageiros)",
        "Tour privado e acompanhamento de motorista/guia",
        "Paragens nos principais monumentos e miradouros",
        "Itinerário personalizado e paragens para fotografias",
        "Combustível e portagens incluídos",
      ],
      notIncluded: [
        "Bilhetes de entrada em monumentos e atrações",
        "Entrada na Livraria Lello",
        "Visitas às caves de Vinho do Porto e provas",
        "Almoço, bebidas e despesas pessoais",
        "Outras atividades pagas",
        "Pernoita no Porto (opcional — sob consulta)",
      ],
      whyChooseHtml:
        "Porque o Porto merece ser vivido sem pressa — com um guia local, van executiva e um roteiro à vossa medida.<br>Uma experiência pessoal. Uma perspetiva local. Memórias inesquecíveis.",
      stopsLabel: "9 pontos de interesse",
      pickupHeading: "Opções de recolha",
      pickupItems: [
        {
          title: "Lisboa",
          detail: "Partida do hotel ou ponto de encontro em Lisboa — Pickup incluído no preço",
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
          title: "Pernoita no Porto",
          detail:
            "Opção de ficar uma noite e regressar no dia seguinte — alojamento e regresso sob consulta",
          highlight: true,
        },
      ],
    },
    en: {
      title: "Porto – Private City Tour | Full Day",
      subtitle:
        "From Lisbon to Porto in the Mercedes-Benz Vito Select — up to 8 passengers, one fixed group price. History, viewpoints, Ribeira and Port wine cellars.",
      experienceText:
        "Discover Porto through the eyes of a local guide. A private journey from Lisbon to Porto: iconic landmarks, charming streets, spectacular viewpoints and the cellars of Vila Nova de Gaia.\n\nA personal experience. A local perspective. Unforgettable memories.",
      aboutHtml: [
        "Enjoy a private full-day excursion from Lisbon in the comfort of our <strong>Mercedes-Benz Vito Select</strong>. Explore one of Portugal’s most beautiful historic cities — landmarks, traditional streets, architecture, riverside scenery, panoramic viewpoints and the famous Port wine cellars.",
        "The itinerary includes a lunch break (restaurant of your choice, not included) and can be tailored to your preferences. <strong>Optional overnight stay in Porto</strong> on request — more time in the city and return to Lisbon the next day.",
      ],
      highlightTitle: "Porto over the Douro",
      highlightText:
        "Ribeira, Dom Luís I Bridge and the Gaia cellars. Northern Portugal between granite, tile and river — a day that is only yours.",
      itineraryLead: "Main points of interest — flexible pace, with time for photos.",
      itineraryNote:
        "Livraria Lello and Port wine cellar visits are subject to advance booking and availability. Estimated duration: 12–14 hours (traffic and selected visits).",
      itinerary: [
        {
          badge: "São Bento",
          title: "São Bento Railway Station",
          descriptionHtml:
            "The famous station and its impressive <strong>blue-and-white azulejo</strong> panels depicting key moments in Portuguese history.",
        },
        {
          badge: "Sé",
          title: "Porto Cathedral – Sé do Porto",
          descriptionHtml:
            "One of the city’s most important historic monuments and the <strong>medieval streets</strong> around it.",
        },
        {
          badge: "Clérigos",
          title: "Clérigos Tower",
          descriptionHtml:
            "One of Porto’s most iconic landmarks — distinctive architecture and a defining place in the city skyline.",
        },
        {
          badge: "Ribeira",
          title: "Ribeira District",
          descriptionHtml:
            "The picturesque riverside district: traditional streets, restaurants and beautiful views over the <strong>Douro River</strong>.",
        },
        {
          badge: "Bridge",
          title: "Dom Luís I Bridge",
          descriptionHtml:
            "One of Portugal’s most iconic bridges — spectacular views over the Douro and both sides of the city.",
        },
        {
          badge: "Bolhão",
          title: "Bolhão Market",
          descriptionHtml:
            "One of Porto’s most traditional markets — fresh produce, Portuguese gastronomy and authentic atmosphere.",
        },
        {
          badge: "Lello",
          title: "Livraria Lello",
          descriptionHtml:
            "One of the world’s most famous historic bookshops — remarkable architecture and an iconic staircase.<br><em>Ticket and advance booking required (not included; subject to availability)</em>",
        },
        {
          badge: "Cellars",
          title: "Port Wine Cellars – Vila Nova de Gaia",
          descriptionHtml:
            "Port wine heritage and tradition: history, production and ageing, with the option of a guided cellar visit and tasting.<br><em>Visits and tastings on reservation — not included in the price</em>",
        },
        {
          badge: "Morro",
          title: "Jardim do Morro – Panoramic Viewpoint",
          descriptionHtml:
            "One of the most beautiful panoramic views over Porto, Ribeira, the Douro and Dom Luís I Bridge — perfect for photographs.",
        },
      ],
      included: [
        "Private round-trip transportation Lisbon ↔ Porto",
        "Mercedes-Benz Vito Select (up to 8 passengers)",
        "Private city tour with driver/guide",
        "Stops at main landmarks and panoramic viewpoints",
        "Personalised itinerary and photo stops",
        "Fuel and motorway tolls included",
      ],
      notIncluded: [
        "Entrance tickets to monuments and attractions",
        "Livraria Lello admission",
        "Port wine cellar visits and wine tastings",
        "Lunch, drinks and personal expenses",
        "Other paid activities",
        "Overnight stay in Porto (optional — on request)",
      ],
      whyChooseHtml:
        "Because Porto deserves to be lived without rush — with a local guide, an executive van and an itinerary made for you.<br>A personal experience. A local perspective. Unforgettable memories.",
      stopsLabel: "9 points of interest",
      pickupHeading: "Pickup options",
      pickupItems: [
        {
          title: "Lisbon",
          detail: "Departure from a Lisbon hotel or meeting point — Pickup included in the price",
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
          title: "Overnight in Porto",
          detail:
            "Option to stay one night and return the next day — accommodation and return on request",
          highlight: true,
        },
      ],
    },
  },
  seo: {
    pt: {
      title: "Tour Privado Porto a partir de Lisboa | €750 / grupo",
      description:
        "Tour privado Lisboa–Porto na Mercedes-Benz Vito Select. Até 8 passageiros. €750 por grupo. Ribeira, Clérigos, caves e miradouros. Recolha no hotel.",
    },
    en: {
      title: "Private Porto Day Trip from Lisbon | €750 / Group",
      description:
        "Private full-day Porto tour from Lisbon in a Mercedes-Benz Vito Select. Up to 8 guests. €750 per group. Ribeira, cellars and viewpoints. Hotel pickup.",
    },
  },
} as const satisfies TourDefinitionInput;
