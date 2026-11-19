import type { TourDefinitionInput } from "./finalize-tour";

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
  /** Ordem = itinerário: Belém → Alfama → Miradouros → Castelo → Cristo Rei → Almoço. */
  stopImages: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Torre_de_Bel%C3%A9m_por_Rodrigo_Tetsuo_Argenton_%282%29.jpg/3840px-Torre_de_Bel%C3%A9m_por_Rodrigo_Tetsuo_Argenton_%282%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Alfama_0002.jpg/3840px-Alfama_0002.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Miradouro_da_Senhora_do_Monte_-_Lisboa_-_Portugal_%285284675897%29.jpg/3840px-Miradouro_da_Senhora_do_Monte_-_Lisboa_-_Portugal_%285284675897%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Castelo_de_S%C3%A3o_Jorge%2C_Lisboa_116.jpg/3840px-Castelo_de_S%C3%A3o_Jorge%2C_Lisboa_116.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Statue_of_Sacred_Heart_of_Jesus_Christ%2C_Almada%2C_Portugal%2C_20250604_1922_9473.jpg/3840px-Statue_of_Sacred_Heart_of_Jesus_Christ%2C_Almada%2C_Portugal%2C_20250604_1922_9473.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/a/ab/Pra%C3%A7a_do_Com%C3%A9rcio.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Gothic_Grandeur_at_the_Entrance_to_Jer%C3%B3nimos_Monastery_in_Lisbon_%2854692352495%29.jpg/3840px-Gothic_Grandeur_at_the_Entrance_to_Jer%C3%B3nimos_Monastery_in_Lisbon_%2854692352495%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/f/fd/Padr%C3%A3o_dos_Descobrimentos.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/5/5f/Elevador_de_Santa_Justa.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/1/14/S%C3%A9_de_Lisboa.jpg",
  ],
  stopMapsUrls: [
    "https://www.google.com/maps/search/?api=1&query=Mosteiro+dos+Jer%C3%B3nimos%2C+Bel%C3%A9m%2C+Lisboa",
    "https://www.google.com/maps/search/?api=1&query=Alfama%2C+Lisboa",
    "https://www.google.com/maps/search/?api=1&query=Miradouro+da+Senhora+do+Monte%2C+Lisboa",
    "https://www.google.com/maps/search/?api=1&query=Castelo+de+S%C3%A3o+Jorge%2C+Lisboa",
    "https://www.google.com/maps/search/?api=1&query=Cristo+Rei%2C+Almada",
    "https://www.google.com/maps/search/?api=1&query=Restaurantes+t%C3%ADpicos%2C+Alfama%2C+Lisboa",
  ],
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
      experienceText:
        "Lisboa revela-se aos poucos: miradouros, Alfama, Belém e cantos que o autocarro turístico nunca pára. Neste dia privado, a cidade é só vossa — sem pressa, com história e vibe lisboeta de verdade.\n\nNo jeep conversível, com música e um guia apaixonado, vais do Tejo às sete colinas com tempo para fotografar, saborear e apaixonar-te pela capital.",
      aboutHtml: [
        "Desde miradouros panorâmicos, bairros históricos e cantos secretos que só os locais conhecem, este dia é uma jornada pela história, cultura e emoções genuínas.",
        "Viaja no nosso jeep UMM Alter II conversível, com boa música, boa energia e um guia local apaixonado, pronto para te mostrar o melhor de Lisboa — desde o seu passado real até à sua vibe moderna e cosmopolita.",
      ],
      highlightTitle: "Lisboa vista de cima",
      highlightText:
        "Belém, Alfama e o Tejo num só olhar. Um voo em 4K sobre a cidade das sete colinas, dos miradouros ao Castelo de São Jorge.",
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
        "Jeep UMM Alter II (até 7) ou van Mercedes-Benz Vito (até 8) — à escolha",
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
          title: "Lisboa",
          detail: "Pick-up e drop-off no hotel em Lisboa — Pickup incluído no preço",
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
      title: "Private Lisbon Tour",
      subtitle:
        "Discover the magic of Lisbon, Portugal's sun-kissed capital, on a private tour that combines millennial history, stunning views and authentic Lisbon character.",
      experienceText:
        "Lisbon opens slowly: viewpoints, Alfama, Belém and corners the tour bus never stops at. On this private day, the city is yours — unhurried, with real stories and true Lisbon vibe.\n\nIn the convertible jeep, with music and a passionate guide, you’ll go from the Tagus to the seven hills with time to shoot, taste and fall for the capital.",
      aboutHtml: [
        "From panoramic viewpoints, historic neighbourhoods and secret corners that only locals know, this day is a journey through history, culture and genuine emotions.",
        "Ride in our open-top UMM Alter II jeep, with good music, good energy and a passionate local guide, ready to show you the best of Lisbon — from its royal past to its modern cosmopolitan vibe.",
      ],
      highlightTitle: "Lisbon from above",
      highlightText:
        "Belém, Alfama and the Tagus in one view. A 4K flight over the city of seven hills, from the viewpoints to São Jorge Castle.",
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
        "UMM Alter II jeep (up to 7) or Mercedes-Benz Vito van (up to 8) — your choice",
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
          title: "Lisbon",
          detail: "Hotel pick-up and drop-off in Lisbon — Pickup included in the price",
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
      title: "Tour Privado por Lisboa | DiscoverLixboaTours",
      description:
        "Tour privado por Lisboa com guia local. Até 8 passageiros. A partir de €250 por grupo. Recolha no hotel.",
    },
    en: {
      title: "Private Lisbon City Tour with Local Driver-Guide",
      description:
        "Private Lisbon sightseeing tour with an English-speaking local guide and private vehicle. Belém, Alfama, viewpoints and more. Hotel pickup. From €250/group, up to 8 guests.",
    },
  },
} as const satisfies TourDefinitionInput;
