import type { TourDefinition } from "./types";

/**
 * Sintra & Cascais — tour privado, totais por grupo (fonte comercial 2026).
 * Pricing: 1–2 €250 … 8 €540 (totais).
 */
export const sintraCascaisTour = {
  slug: "sintra-cascais",
  maxGuests: 8,
  minGuests: 1,
  durationHours: 8,
  privateTour: true,
  hotelPickup: true,
  groupTotalsCents: {
    1: 25000,
    2: 25000,
    3: 30000,
    4: 34000,
    5: 39000,
    6: 44000,
    7: 49000,
    8: 54000,
  },
  priceDisplay: "group",
  heroImage: "/assets/images/SINTRA/herobg.jpg",
  /**
   * Fotos reais de cada paragem (Wikimedia Commons).
   * 3840 px de largura quando o original é maior; Azenhas fica no original (2816 px).
   * O Wikimedia não gera miniaturas de 2048 px — o patamar seguinte é 3840 px.
   */
  stopImages: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Palais_national_Pena_Sintra_111.jpg/3840px-Palais_national_Pena_Sintra_111.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Castelo_dos_Mouros%2C_Sintra%2C_Portugal%2C_2019-05-25%2C_DD_85.jpg/3840px-Castelo_dos_Mouros%2C_Sintra%2C_Portugal%2C_2019-05-25%2C_DD_85.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Quinta_da_Regaleira%2C_Sintra%2C_Portugal%2C_2022-07-25%2C_DD_16.jpg/3840px-Quinta_da_Regaleira%2C_Sintra%2C_Portugal%2C_2022-07-25%2C_DD_16.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/The_beautiful_Palace_of_Monserrate_near_Sintra_%2827752301440%29.jpg/3840px-The_beautiful_Palace_of_Monserrate_near_Sintra_%2827752301440%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/a/ac/Azenhas_do_Mar.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Monument_of_Cabo_da_Roca%2C_Portugal%2C_20250606_1513_0230.jpg/3840px-Monument_of_Cabo_da_Roca%2C_Portugal%2C_20250606_1513_0230.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Boca_do_Inferno_%2822357700018%29.jpg/3840px-Boca_do_Inferno_%2822357700018%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Marina_de_Cascais_%28Portugal%29.jpg/3840px-Marina_de_Cascais_%28Portugal%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Palacio_Nacional%2C_Sintra%2C_Portugal%2C_2022-07-25%2C_DD_19.jpg/3840px-Palacio_Nacional%2C_Sintra%2C_Portugal%2C_2022-07-25%2C_DD_19.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Guincho_June_2013-1.jpg/3840px-Guincho_June_2013-1.jpg",
  ],
  stopMapsUrls: [
    "https://www.google.com/maps/search/?api=1&query=Pal%C3%A1cio+Nacional+da+Pena%2C+Sintra",
    "https://www.google.com/maps/search/?api=1&query=Castelo+dos+Mouros%2C+Sintra",
    "https://www.google.com/maps/search/?api=1&query=Quinta+da+Regaleira%2C+Sintra",
    "https://www.google.com/maps/search/?api=1&query=Pal%C3%A1cio+de+Monserrate%2C+Sintra",
    "https://www.google.com/maps/search/?api=1&query=Azenhas+do+Mar%2C+Sintra",
    "https://www.google.com/maps/search/?api=1&query=Cabo+da+Roca%2C+Sintra",
    "https://www.google.com/maps/search/?api=1&query=Boca+do+Inferno%2C+Cascais",
    "https://www.google.com/maps/search/?api=1&query=Cascais+Marina%2C+Cascais",
  ],
  videoYoutubeId: "Hpp4McD2Bmw",
  gallery: [
    {
      src: "/assets/images/galeria-sintra/img1.webp",
      alt: { pt: "Sintra — vista 1", en: "Sintra — view 1" },
    },
    {
      src: "/assets/images/galeria-sintra/img2.webp",
      alt: { pt: "Sintra — vista 2", en: "Sintra — view 2" },
    },
    {
      src: "/assets/images/galeria-sintra/img3.webp",
      alt: { pt: "Sintra — vista 3", en: "Sintra — view 3" },
    },
    {
      src: "/assets/images/galeria-sintra/img4.webp",
      alt: { pt: "Sintra — vista 4", en: "Sintra — view 4" },
    },
    {
      src: "/assets/images/galeria-sintra/img5.webp",
      alt: { pt: "Sintra — vista 5", en: "Sintra — view 5" },
    },
  ],
  content: {
    pt: {
      title: "Tour Sintra & Cascais - Palácios e Praias Secretas",
      subtitle:
        "Descubra a magia de Sintra e Cascais, desde palácios de contos de fadas até praias secretas da Riviera Portuguesa, num tour privado que combina história, natureza e tradição",
      aboutHtml: [
        "Venha descobrir esta vila mística e encantadora - <strong>Sintra</strong>! Há 5 belos palácios e 1 Castelo (Palácio da Pena, Palácio da Regaleira, Castelo dos Mouros, Palácio de Monserrate, Palácio Nacional de Sintra e Palácio de Seteais). Veremos paisagens num jeep militar conversível ao som de boa música portuguesa, saborearemos a renomada culinária portuguesa e provaremos os doces tradicionais - os famosos <strong>travesseiros</strong> e <strong>queijadas de Sintra</strong>.",
        "Após visitar os Palácios, continuaremos nossa jornada ao longo das magníficas praias da nossa costa, começando em Sintra e terminando em Cascais. Durante o nosso tour falarei sobre a <strong>história de Sintra</strong>, faremos paragens para tirar fotos (como sou um guia local e moro aqui, conheço os spots mais incríveis para fotos!), tudo isso ao som de boa música, muita alegria, boas vibrações e conversa. Ah, e você pode escolher a música ou eu também posso escolher - é você quem decide! A ideia é sempre ter um <strong>dia incrível</strong>!",
        "<strong>A Praia Secreta – Onde Só os Locais Sabem Chegar...</strong>",
        "Prepare-se para algo verdadeiramente especial — um paraíso escondido, conhecido apenas por quem vive por aqui.",
        "Escondida além das estradas comuns, esta praia secreta só é acessível através de um caminho off-road cheio de emoção, diversão e aventura.",
        "Enquanto seguimos pelo caminho de terra, sentirá a adrenalina a aumentar — a música, o vento e aquela boa curiosidade sobre o que vos espera no final.",
        "E então… a cena é revelada. Uma vista de tirar o fôlego aparece diante dos seus olhos: falésias douradas, falésias impressionantes e um mar azul cristalino que se estende até onde a vista alcança. Selvagem. Intocado. Pura magia.",
        "A localização exata? Isso fica em segredo. Porque há lugares que devem permanecer misteriosos… Mas uma coisa é certa — será um momento que nunca esquecerá.",
      ],
      highlightTitle: "A Praia Secreta",
      highlightText:
        "Um refúgio escondido entre falésias e mar, acessível por caminhos off-road que poucos conhecem.",
      itinerary: [
        {
          badge: "Pena",
          title: "Palácio Nacional da Pena",
          descriptionHtml:
            "Jóia sagrada que coroa as montanhas de Sintra. O parque circundante desperta emoções de mistério e descoberta. O seu guia contará a história fascinante deste palácio colorido e romântico. <strong>Entrada: €20/pessoa (não incluída). Opção de visitar apenas os jardins: €10/pessoa</strong>",
        },
        {
          badge: "Mouros",
          title: "Castelo dos Mouros",
          descriptionHtml:
            "Vista privilegiada sobre a Costa Atlântica e as montanhas de Sintra. Castelo milenar de fundação muçulmana (habitado pelos Mouros até 1147). Posição estratégica fundamental na defesa de Lisboa. <strong>Entrada: €12/pessoa (não incluída)</strong>",
        },
        {
          badge: "Regaleira",
          title: "Quinta da Regaleira",
          descriptionHtml:
            "Arquitetura romântica e mistérios esotéricos. Poço Iniciático, jardins labirínticos e simbolismo maçónico. Obra-prima de António Augusto Carvalho Monteiro e Luigi Manini. <strong>Entrada: €20/pessoa (não incluída)</strong>",
        },
        {
          badge: "Monserrate",
          title: "Palácio de Monserrate",
          descriptionHtml:
            "Visita ao palácio ou paragem no miradouro para fotos panorâmicas. Arquitetura indo-árabe exótica em jardins botânicos espetaculares. <strong>Entrada não incluída (opcional)</strong>",
        },
        {
          badge: "Azenhas",
          title: "Praia das Azenhas do Mar",
          descriptionHtml:
            "Talvez a praia mais bonita de Sintra! Muito semelhante a Santorini na Grécia devido às casas brancas na encosta. Vistas espetaculares e oportunidade para fotos incríveis.",
        },
        {
          badge: "Cabo da Roca",
          title: "Cabo da Roca",
          descriptionHtml:
            "O ponto mais ocidental do continente europeu! <em>\"Onde a terra acaba e o mar começa\"</em> (Camões). Vistas dramáticas sobre o Atlântico e certificado de visita disponível.",
        },
        {
          badge: "Boca do Inferno",
          title: "Boca do Inferno",
          descriptionHtml:
            "Vistas deslumbrantes sobre o oceano onde o pôr do sol é mais bonito! Local característico pela sua enorme fenda e pescadores locais. A força da natureza em ação.",
        },
        {
          badge: "Cascais",
          title: "Cascais - Ponto Final",
          descriptionHtml:
            "Vila piscatória portuguesa famosa pelas suas belas praias, peixe fresco e restaurantes de frutos do mar. Marina moderna internacionalmente reconhecida. Zona de bares, hotéis e vida noturna.",
        },
      ],
      included: [
        "Jeep UMM Alter II conversível",
        "Seguro obrigatório (lei portuguesa)",
        "Degustação de doces tradicionais de Sintra",
        "Degustação de Vinho do Porto Reserva",
        "Guia local experiente (nascido em Sintra)",
        "Música ambiente personalizada",
        "Pick-up e Drop-off flexíveis",
        "Paragens fotográficas nos melhores spots",
      ],
      notIncluded: [
        "Despesas pessoais",
        "Entrada no Palácio da Pena (€20/pessoa)",
        "Entrada na Quinta da Regaleira (€20/pessoa)",
        "Entrada no Castelo dos Mouros (€12/pessoa)",
        "Entrada no Palácio de Monserrate (opcional)",
        "Refeições (recomendações incluídas)",
      ],
      stopsLabel: "8 paradas incríveis",
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
            "Pickup disponível com custo adicional sob consulta (valor a confirmar após a reserva)",
          highlight: true,
        },
        {
          title: "Drop-off em hotel em Lisboa",
          detail:
            "Regresso ao hotel em Lisboa no final do tour — custo adicional sob consulta",
          highlight: true,
        },
      ],
    },
    en: {
      title: "Sintra & Cascais Tour - Palaces and Secret Beaches",
      subtitle:
        "Discover the magic of Sintra and Cascais, from fairytale palaces to secret beaches of the Portuguese Riviera, on a private tour that combines history, nature and tradition",
      aboutHtml: [
        "Come and discover this mystical and enchanting village - <strong>Sintra</strong>! There are 5 beautiful palaces and 1 Castle (Palácio da Pena, Palácio da Regaleira, Castelo dos Mouros, Palácio de Monserrate, Palácio Nacional de Sintra and Palácio de Seteais). We'll see landscapes in an open-top military jeep to the sound of good Portuguese music, savor the renowned Portuguese cuisine, and taste the traditional sweets - the famous <strong>travesseiros</strong> and <strong>queijadas de Sintra</strong>.",
        "After visiting the Palaces, we'll continue our journey along the magnificent beaches on our coast, starting in Sintra and ending in Cascais. During our tour I'll talk about the <strong>history of Sintra</strong>, we'll stop to take photos (since I'm a local guide and live here, I know the most incredible spots for photos!), all this to the sound of good music, lots of joy, good vibes and conversation. Oh, and you can choose the music or I can choose too - it's up to you! The idea is always to have an <strong>amazing day</strong>!",
        "<strong>The Secret Beach – Where Only Locals Know How to Get...</strong>",
        "Get ready for something truly special — a hidden paradise, known only to those who live around here.",
        "Hidden beyond the common roads, this secret beach is only accessible through an off-road path full of excitement, fun and adventure.",
        "As we follow the dirt path, you'll feel the adrenaline building — the music, the wind, and that good curiosity about what awaits you at the end.",
        "And then… the scene is revealed. A breathtaking view appears before your eyes: golden cliffs, impressive cliffs, and a crystal blue sea that stretches as far as the eye can see. Wild. Untouched. Pure magic.",
        "The exact location? That stays a secret. Because there are places that must remain mysterious… But one thing is certain — it will be a moment you will never forget.",
      ],
      highlightTitle: "The Secret Beach",
      highlightText:
        "A hidden refuge between cliffs and sea, reached by off-road paths few people know.",
      itinerary: [
        {
          badge: "Pena",
          title: "Pena National Palace",
          descriptionHtml:
            "Sacred jewel that crowns the Sintra mountains. The surrounding park awakens emotions of mystery and discovery. Your guide will tell the fascinating history of this colorful and romantic palace. <strong>Entry: €20/person (not included). Option to visit gardens only: €10/person</strong>",
        },
        {
          badge: "Moors",
          title: "Moorish Castle",
          descriptionHtml:
            "Privileged view over the Atlantic Coast and Sintra mountains. Millennium castle of Muslim foundation (inhabited by the Moors until 1147). Fundamental strategic position in defending Lisbon. <strong>Entry: €12/person (not included)</strong>",
        },
        {
          badge: "Regaleira",
          title: "Quinta da Regaleira",
          descriptionHtml:
            "Romantic architecture and esoteric mysteries. Initiatic Well, labyrinthine gardens and Masonic symbolism. Masterpiece by António Augusto Carvalho Monteiro and Luigi Manini. <strong>Entry: €20/person (not included)</strong>",
        },
        {
          badge: "Monserrate",
          title: "Monserrate Palace",
          descriptionHtml:
            "Palace visit or viewpoint stop for panoramic photos. Exotic Indo-Arabic architecture in spectacular botanical gardens. <strong>Entry not included (optional)</strong>",
        },
        {
          badge: "Azenhas",
          title: "Azenhas do Mar Beach",
          descriptionHtml:
            "Perhaps the most beautiful beach in Sintra! Very similar to Santorini in Greece due to the white houses on the slope. Spectacular views and opportunity for amazing photos.",
        },
        {
          badge: "Cabo da Roca",
          title: "Cabo da Roca",
          descriptionHtml:
            "The westernmost point of the European continent! <em>\"Where land ends and sea begins\"</em> (Camões). Dramatic views over the Atlantic and visit certificate available.",
        },
        {
          badge: "Boca do Inferno",
          title: "Boca do Inferno",
          descriptionHtml:
            "Stunning views over the ocean where the sunset is most beautiful! Characteristic location for its huge gap and local fishermen. Nature's force in action.",
        },
        {
          badge: "Cascais",
          title: "Cascais — Final Stop",
          descriptionHtml:
            "Portuguese fishing village famous for its beautiful beaches, fresh fish and seafood restaurants. Modern internationally renowned marina. Area of bars, hotels and nightlife.",
        },
      ],
      included: [
        "Open-top UMM Alter II jeep",
        "Mandatory insurance (Portuguese law)",
        "Tasting of traditional Sintra sweets",
        "Porto Reserve Liqueur Wine tasting",
        "Experienced local guide (born in Sintra)",
        "Personalized background music",
        "Flexible Pick-up and Drop-off",
        "Photographic stops at the best spots",
      ],
      notIncluded: [
        "Personal expenses",
        "Palácio da Pena entry (€20/person)",
        "Quinta da Regaleira entry (€20/person)",
        "Castelo dos Mouros entry (€12/person)",
        "Palácio de Monserrate entry (optional)",
        "Meals (recommendations included)",
      ],
      stopsLabel: "8 incredible stops",
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
          detail:
            "Pickup available with an extra fee on request (confirmed after booking)",
          highlight: true,
        },
        {
          title: "Drop-off at a Lisbon hotel",
          detail:
            "Return to a Lisbon hotel at the end of the tour — extra fee on request",
          highlight: true,
        },
      ],
    },
  },
  seo: {
    pt: {
      title: "Tour Privado Sintra & Cascais | DiscoverLixboaTours",
      description:
        "Tour privado por Sintra e Cascais com guia local. Até 8 passageiros. A partir de €250 por grupo. Recolha flexível.",
    },
    en: {
      title: "Private Sintra Day Trip from Lisbon | Cascais & Cabo da Roca",
      description:
        "Private Sintra & Cascais day trip with an English-speaking local driver-guide. Pena Palace, Regaleira, Cabo da Roca. Free pickup in Sintra; Lisbon hotel pickup on request. From €250/group, up to 8 guests.",
    },
  },
} as const satisfies TourDefinition;
