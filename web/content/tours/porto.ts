import type { TourDefinition } from "./types";

/**
 * Porto — tour privado, totais por grupo (fonte comercial 2026).
 * Pricing: 1–4 €700, 5–6 €750, 7–8 €800 (totais).
 */
export const portoTour = {
  slug: "porto",
  maxGuests: 8,
  minGuests: 1,
  durationHours: 8,
  privateTour: true,
  hotelPickup: true,
  groupTotalsCents: {
    1: 70000,
    2: 70000,
    3: 70000,
    4: 70000,
    5: 75000,
    6: 75000,
    7: 80000,
    8: 80000,
  },
  priceDisplay: "group",
  heroImage: "/assets/images/destinations/hero-porto.jpg",
  /** Ordem = itinerário: Lello/centro → Ribeira/ponte → Caves → Foz. */
  stopImages: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Interior_view_of_Livraria_Lello_01.jpg/3840px-Interior_view_of_Livraria_Lello_01.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Ponte_de_Dom_Lu%C3%ADs_I_and_Ribeira%2C_Porto_%2854795128175%29.jpg/3840px-Ponte_de_Dom_Lu%C3%ADs_I_and_Ribeira%2C_Porto_%2854795128175%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Cave_Porto_Sandeman.jpg/3840px-Cave_Porto_Sandeman.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Foz_do_Douro_%2826347207321%29.jpg/3840px-Foz_do_Douro_%2826347207321%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Igreja_e_Torre_dos_Cl%C3%A9rigos.jpg/3840px-Igreja_e_Torre_dos_Cl%C3%A9rigos.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Estaci%C3%B3n_de_tren_S%C3%A3o_Bento%2C_Oporto%2C_Portugal%2C_2019-06-02%2C_DD_05.jpg/3840px-Estaci%C3%B3n_de_tren_S%C3%A3o_Bento%2C_Oporto%2C_Portugal%2C_2019-06-02%2C_DD_05.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Cais_da_Ribeira%2C_Oporto%2C_Portugal%2C_2012-05-09%2C_DD_08.JPG/3840px-Cais_da_Ribeira%2C_Oporto%2C_Portugal%2C_2012-05-09%2C_DD_08.JPG",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Catedral_de_Oporto%2C_Portugal%2C_2012-05-09%2C_DD_03.JPG/3840px-Catedral_de_Oporto%2C_Portugal%2C_2012-05-09%2C_DD_03.JPG",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Ayuntamiento_de_Oporto%2C_Portugal%2C_2012-05-09%2C_DD_10.JPG/3840px-Ayuntamiento_de_Oporto%2C_Portugal%2C_2012-05-09%2C_DD_10.JPG",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Cais_da_Ribeira%2C_Oporto%2C_Portugal%2C_2012-05-09%2C_DD_03.JPG/3840px-Cais_da_Ribeira%2C_Oporto%2C_Portugal%2C_2012-05-09%2C_DD_03.JPG",
  ],
  stopMapsUrls: [
    "https://www.google.com/maps/search/?api=1&query=Livraria+Lello%2C+Porto",
    "https://www.google.com/maps/search/?api=1&query=Ribeira%2C+Porto",
    "https://www.google.com/maps/search/?api=1&query=Caves+de+Vinho+do+Porto%2C+Vila+Nova+de+Gaia",
    "https://www.google.com/maps/search/?api=1&query=Foz+do+Douro%2C+Porto",
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
      title: "Tour Privado pelo Porto",
      subtitle:
        "Descubra o Porto num dia privado a partir de Lisboa — exclusivamente para o teu grupo. Vinhos únicos, arquitetura histórica e caráter autêntico do norte",
      aboutHtml: [
        "Explore o Porto, a segunda maior cidade de Portugal e berço do famoso Vinho do Porto. Esta cidade histórica é um verdadeiro museu ao ar livre, com o seu centro histórico classificado como Património Mundial da UNESCO. Das ruas medievais da Ribeira às modernas caves de vinho em Vila Nova de Gaia, o Porto oferece uma experiência única e inesquecível.",
        "Com o nosso guia experiente, descobrirá não apenas as atrações turísticas mais famosas, mas também segredos locais, histórias fascinantes e os melhores locais para saborear a autêntica culinária portuense. Prepare-se para se apaixonar pela energia contagiante desta cidade que respira história e tradição.",
      ],
      highlightTitle: "O Porto sobre o Douro",
      highlightText:
        "A Ribeira, a Ponte Dom Luís I e as caves de Gaia filmadas em 4K. O norte de Portugal visto do ar, entre granito, azulejo e rio.",
      itinerary: [
        {
          badge: "Centro",
          title: "Centro Histórico e Livraria Lello",
          descriptionHtml:
            "Inicie pela famosa Livraria Lello, considerada uma das mais belas do mundo e inspiração para Harry Potter. Visite a Torre dos Clérigos para vistas panorâmicas de 360°, explore a Estação de São Bento com seus azulejos magníficos e passeie pela elegante Avenida dos Aliados.",
        },
        {
          badge: "Ribeira",
          title: "Ribeira e Ponte Dom Luís I",
          descriptionHtml:
            "Desça até a pitoresca Ribeira, Património Mundial da UNESCO, com suas casas coloridas à beira do Douro. Atravesse a icônica Ponte Dom Luís I (obra de Gustave Eiffel) e desfrute de um almoço tradicional com vista para o rio. Tempo livre para explorar e fotografar.",
        },
        {
          badge: "Caves",
          title: "Caves do Vinho do Porto",
          descriptionHtml:
            "Visite as famosas caves de vinho do Porto em Vila Nova de Gaia. Aprenda sobre a produção secular do vinho do Porto, explore os túneis subterrâneos e desfrute de uma degustação de vinhos premium com vista privilegiada para o Porto.",
        },
        {
          badge: "Foz",
          title: "Foz do Douro e Pôr do Sol",
          descriptionHtml:
            "Finalize o dia na Foz do Douro, onde o rio encontra o Atlântico. Passeie pelo calçadão, visite o Farol de Felgueiras e aproveite um dos pores do sol mais bonitos de Portugal. Recomendações de onde jantar com vista para o mar.",
        },
      ],
      included: [
        "Guia local especializado",
        "Mercedes-Benz Vito 116 CDI Select",
        "Degustação de vinho do Porto",
        "Seguro de viagem",
        "Guia gastronómico local",
      ],
      notIncluded: [
        "Refeições principais",
        "Bilhete da Livraria Lello",
      ],
      stopsLabel: "6+ atrações turísticas",
      pickupHeading: "Opções de recolha",
      pickupItems: [
        {
          title: "Hotel em Lisboa",
          detail: "Partida do seu hotel em Lisboa — Sem custo adicional",
        },
        {
          title: "Aeroporto de Lisboa",
          detail: "Recolha no aeroporto — Sem custo adicional",
        },
        {
          title: "Hotel no Porto",
          detail: "Recolha no Porto disponível — custo adicional a combinar",
          highlight: true,
        },
      ],

    },
    en: {
      title: "Private Porto Day Tour",
      subtitle:
        "Discover Porto on a private full-day experience from Lisbon — exclusively for your group. Unique wines, historic architecture and authentic northern character",
      aboutHtml: [
        "Explore Porto, Portugal's second largest city and birthplace of the famous Port Wine. This historic city is a true open-air museum, with its historic center classified as a UNESCO World Heritage Site. From the medieval streets of Ribeira to the modern wine cellars in Vila Nova de Gaia, Porto offers a unique and unforgettable experience.",
        "With our experienced guide, you'll discover not only the most famous tourist attractions, but also local secrets, fascinating stories and the best places to taste authentic Porto cuisine. Get ready to fall in love with the contagious energy of this city that breathes history and tradition.",
      ],
      highlightTitle: "Porto over the Douro",
      highlightText:
        "Ribeira, the Dom Luís I Bridge and the Gaia cellars filmed in 4K. Northern Portugal from the air, between granite, tile and river.",
      itinerary: [
        {
          badge: "Centre",
          title: "Historic Center and Lello Bookstore",
          descriptionHtml:
            "Start at the famous Lello Bookstore, considered one of the most beautiful in the world and inspiration for Harry Potter. Visit the Clerigos Tower for 360° panoramic views, explore São Bento Station with its magnificent tiles and stroll along the elegant Avenida dos Aliados.",
        },
        {
          badge: "Ribeira",
          title: "Ribeira and Dom Luís I Bridge",
          descriptionHtml:
            "Descend to the picturesque Ribeira, UNESCO World Heritage Site, with its colorful houses on the banks of the Douro. Cross the iconic Dom Luís I Bridge (work by Gustave Eiffel) and enjoy a traditional lunch overlooking the river. Free time to explore and photograph.",
        },
        {
          badge: "Cellars",
          title: "Port Wine Cellars",
          descriptionHtml:
            "Visit the famous Port wine cellars in Vila Nova de Gaia. Learn about the centuries-old production of Port wine, explore the underground tunnels and enjoy a premium wine tasting with privileged views of Porto.",
        },
        {
          badge: "Foz",
          title: "Foz do Douro and Sunset",
          descriptionHtml:
            "End the day at Foz do Douro, where the river meets the Atlantic. Walk along the promenade, visit Felgueiras Lighthouse and enjoy one of the most beautiful sunsets in Portugal. Recommendations for where to dine with ocean views.",
        },
      ],
      included: [
        "Specialized local guide",
        "Mercedes-Benz Vito 116 CDI Select",
        "Port wine tasting",
        "Travel insurance",
        "Local gastronomic guide",
      ],
      notIncluded: [
        "Main meals",
        "Lello Bookstore ticket",
      ],
      stopsLabel: "6+ tourist attractions",
      pickupHeading: "Pickup options",
      pickupItems: [
        {
          title: "Lisbon hotel",
          detail: "Departure from your Lisbon hotel — No extra cost",
        },
        {
          title: "Lisbon Airport",
          detail: "Airport pickup — No extra cost",
        },
        {
          title: "Porto hotel",
          detail: "Porto pickup available — extra fee on request",
          highlight: true,
        },
      ],

    },
  },
  seo: {
    pt: {
      title: "Tour Privado pelo Porto | DiscoverLixboaTours",
      description:
        "Tour privado pelo Porto a partir de Lisboa. Até 8 passageiros. A partir de €700 por grupo. Degustação de vinho do Porto.",
    },
    en: {
      title: "Private Porto Day Trip from Lisbon | Wine Tasting",
      description:
        "Private full-day Porto tour from Lisbon with local driver-guide. Ribeira, historic center and Port wine tasting. Hotel pickup. From €700/group, up to 8 guests.",
    },
  },
} as const satisfies TourDefinition;
