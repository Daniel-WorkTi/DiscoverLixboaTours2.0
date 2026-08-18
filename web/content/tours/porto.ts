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
  heroImage: "/assets/images/destinations/porto.webp",
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
        "Transporte confortável",
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
      title: "Private Porto Day Tour",
      subtitle:
        "Discover Porto on a private full-day experience from Lisbon — exclusively for your group. Unique wines, historic architecture and authentic northern character",
      aboutHtml: [
        "Explore Porto, Portugal's second largest city and birthplace of the famous Port Wine. This historic city is a true open-air museum, with its historic center classified as a UNESCO World Heritage Site. From the medieval streets of Ribeira to the modern wine cellars in Vila Nova de Gaia, Porto offers a unique and unforgettable experience.",
        "With our experienced guide, you'll discover not only the most famous tourist attractions, but also local secrets, fascinating stories and the best places to taste authentic Porto cuisine. Get ready to fall in love with the contagious energy of this city that breathes history and tradition.",
      ],
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
        "Comfortable transport",
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
      title: "Tour Privado pelo Porto | DiscoverLixboaTours",
      description:
        "Tour privado pelo Porto a partir de Lisboa. Até 8 passageiros. A partir de €700 por grupo. Degustação de vinho do Porto.",
    },
    en: {
      title: "Private Porto Day Tour | DiscoverLixboaTours",
      description:
        "Private Porto tour from Lisbon. Up to 8 guests. From €700 per group. Port wine tasting included.",
    },
  },
} as const satisfies TourDefinition;
