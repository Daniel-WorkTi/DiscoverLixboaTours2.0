import type { TourDefinition } from "./types";

/**
 * Lisboa — tour privado, totais por grupo (fonte comercial 2026).
 * Pricing: 1–2 €250 … 8 €550 (totais).
 */
export const lisboaTour = {
  slug: "lisboa",
  maxGuests: 8,
  minGuests: 1,
  durationHours: 8,
  privateTour: true,
  hotelPickup: true,
  groupTotalsCents: {
    1: 25000,
    2: 25000,
    3: 30000,
    4: 35000,
    5: 40000,
    6: 45000,
    7: 50000,
    8: 55000,
  },
  priceDisplay: "group",
  heroImage: "/assets/images/destinations/lisboa.webp",
  videoYoutubeId: "hWRmyqrq2MM",
  gallery: [
    {
      src: "/assets/images/galeria-lisboa/img1.webp",
      alt: { pt: "Lisboa — vista 1", en: "Lisbon — view 1" },
    },
    {
      src: "/assets/images/galeria-lisboa/img2.webp",
      alt: { pt: "Lisboa — vista 2", en: "Lisbon — view 2" },
    },
    {
      src: "/assets/images/galeria-lisboa/img3.webp",
      alt: { pt: "Lisboa — vista 3", en: "Lisbon — view 3" },
    },
    {
      src: "/assets/images/galeria-lisboa/img4.webp",
      alt: { pt: "Lisboa — vista 4", en: "Lisbon — view 4" },
    },
  ],
  content: {
    pt: {
      title: "Tour Privado por Lisboa",
      subtitle:
        "Descubra a magia de Lisboa, a capital portuguesa banhada pelo sol, num tour privado que combina história milenar, vistas deslumbrantes e caráter lisboeta autêntico.",
      aboutHtml: [
        "Desde miradouros panorâmicos, bairros históricos e cantos secretos que só os locais conhecem, este dia é uma jornada pela história, cultura e emoções genuínas.",
        "Viaja com estilo na nossa van confortável e climatizada, com boa música, boa energia e um guia local apaixonado, pronto para te mostrar o melhor de Lisboa — desde o seu passado real até à sua vibe moderna e cosmopolita.",
      ],
      itinerary: [
        {
          badge: "Belém",
          title: "Belém – Onde começou a Era dos Descobrimentos",
          descriptionHtml:
            "<strong>Mosteiro dos Jerónimos</strong><br><strong>Torre de Belém</strong><br><strong>Padrão dos Descobrimentos</strong><br><strong>Prova dos famosos Pastéis de Belém</strong>",
        },
        {
          badge: "Alfama",
          title: "Alfama – A alma de Lisboa",
          descriptionHtml:
            "Ruas estreitas, sons de fado e miradouros deslumbrantes<br><strong>Visita à Sé Catedral de Lisboa</strong>",
        },
        {
          badge: "Miradouros",
          title: "Miradouros – A Cidade das Sete Colinas",
          descriptionHtml:
            "São Pedro de Alcântara ou Senhora do Monte — vistas inesquecíveis!",
        },
        {
          badge: "Castelo",
          title: "Castelo de São Jorge + Miradouro de Santa Luzia",
          descriptionHtml:
            "Visita ao icónico Castelo de São Jorge com vistas panorâmicas da cidade<br>Paragem no Miradouro de Santa Luzia, um dos mais emblemáticos de Lisboa<br><em>Bilhetes não incluídos</em>",
        },
        {
          badge: "Cristo Rei",
          title: "Cristo Rei",
          descriptionHtml:
            "Paragem no majestoso Cristo Rei, símbolo icónico de Lisboa e Portugal<br>Admira a vista panorâmica sobre Lisboa e o Rio Tejo, perfeita para fotos inesquecíveis<br>Momento de contemplação e beleza, ideal para sentir a grandiosidade da cidade",
        },
        {
          badge: "Almoço",
          title: "Almoço num Restaurante Tradicional Português",
          descriptionHtml:
            "Refeição autêntica, com pratos típicos portugueses<br>Restaurante decorado de forma característica e castiça, frequentado por famílias locais<br>Uma experiência genuína da gastronomia lisboeta, longe das armadilhas turísticas",
        },
      ],
      included: [
        "Transporte privado em carrinha confortável e climatizada",
        "Guia / motorista local profissional",
        "Pick-up e drop-off no seu hotel em Lisboa",
        "Wi-Fi e água engarrafada a bordo",
        "Música, boa disposição e histórias personalizadas sobre a cidade",
      ],
      notIncluded: [
        "Refeições ou bebidas não mencionadas",
        "Bilhetes de entrada no Castelo de São Jorge",
        "Entradas em outros monumentos (opcionais)",
        "Despesas pessoais e gratificações",
      ],
      whyChooseHtml:
        "Porque Lisboa não é apenas uma cidade — é um sentimento.<br>E com a DiscoverLixboaTours, vai vivê-la da forma mais autêntica, descontraída e exclusiva possível.",
      stopsLabel: "7+ locais históricos",
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
      title: "Private Lisbon Tour",
      subtitle:
        "Discover the magic of Lisbon, Portugal's sun-kissed capital, on a private tour that combines millennial history, stunning views and authentic Lisbon character.",
      aboutHtml: [
        "From panoramic viewpoints, historic neighbourhoods and secret corners that only locals know, this day is a journey through history, culture and genuine emotions.",
        "Travel in style in our comfortable air-conditioned van, with good music, good energy and a passionate local guide, ready to show you the best of Lisbon — from its royal past to its modern cosmopolitan vibe.",
      ],
      itinerary: [
        {
          badge: "Belém",
          title: "Belém – Where the Age of Discoveries Began",
          descriptionHtml:
            "<strong>Jerónimos Monastery</strong><br><strong>Belém Tower</strong><br><strong>Monument to the Discoveries</strong><br><strong>Taste the famous Pastéis de Belém</strong>",
        },
        {
          badge: "Alfama",
          title: "Alfama – The soul of Lisbon",
          descriptionHtml:
            "Narrow streets, fado sounds and stunning viewpoints<br><strong>Visit to Lisbon Cathedral</strong>",
        },
        {
          badge: "Viewpoints",
          title: "Viewpoints – The City of Seven Hills",
          descriptionHtml:
            "São Pedro de Alcântara or Senhora do Monte — unforgettable views!",
        },
        {
          badge: "Castle",
          title: "São Jorge Castle + Santa Luzia Viewpoint",
          descriptionHtml:
            "Visit to the iconic São Jorge Castle with panoramic views of the city<br>Stop at Santa Luzia Viewpoint, one of Lisbon's most emblematic<br><em>Tickets not included</em>",
        },
        {
          badge: "Christ the King",
          title: "Christ the King",
          descriptionHtml:
            "Stop at the majestic Christ the King, iconic symbol of Lisbon and Portugal<br>Admire the panoramic view over Lisbon and the Tagus River, perfect for unforgettable photos<br>Moment of contemplation and beauty, ideal for feeling the grandeur of the city",
        },
        {
          badge: "Lunch",
          title: "Lunch at a Traditional Portuguese Restaurant",
          descriptionHtml:
            "Authentic meal with typical Portuguese dishes<br>Characterful restaurant frequented by local families<br>A genuine Lisbon food experience, away from tourist traps",
        },
      ],
      included: [
        "Private transport in a comfortable air-conditioned van",
        "Professional local guide / driver",
        "Hotel pick-up and drop-off in Lisbon",
        "Wi-Fi and bottled water on board",
        "Music, good vibes and personalised stories about the city",
      ],
      notIncluded: [
        "Meals or drinks not mentioned",
        "São Jorge Castle entrance tickets",
        "Other monument tickets (optional)",
        "Personal expenses and gratuities",
      ],
      whyChooseHtml:
        "Because Lisbon is not just a city — it is a feeling.<br>And with DiscoverLixboaTours, you will experience it in the most authentic, relaxed and exclusive way possible.",
      stopsLabel: "7+ historical sites",
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
      title: "Tour Privado por Lisboa | DiscoverLixboaTours",
      description:
        "Tour privado por Lisboa com guia local. Até 8 passageiros. A partir de €250 por grupo. Recolha no hotel.",
    },
    en: {
      title: "Private Lisbon Tour | DiscoverLixboaTours",
      description:
        "Private Lisbon tour with a local guide. Up to 8 guests. From €250 per group. Hotel pickup available.",
    },
  },
} as const satisfies TourDefinition;
