import type { Locale } from "@/lib/i18n/types";

export type Messages = {
  nav: {
    home: string;
    about: string;
    services: string;
    executive: string;
    contact: string;
    book: string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    home: string;
    about: string;
    destinations: string;
    tours: string;
    contact: string;
    followUs: string;
    rights: string;
    address: string;
    email: string;
    bookLink: string;
    executiveLink: string;
    terms: string;
    privacy: string;
    cookies: string;
    sgpd: string;
    dev: string;
  };
  tour: {
    about: string;
    itinerary: string;
    itineraryNote: string;
    included: string;
    notIncluded: string;
    gallery: string;
    video: string;
    map: string;
    mapCaption: string;
    whyChoose: string;
    pickup: string;
    checkAvailability: string;
    privateTour: string;
    fromGroup: string;
    perPrivateGroup: string;
    freeCancellation: string;
    instantConfirmation: string;
    securePayment: string;
    needHelp: string;
    needHelpText: string;
    breadcrumbDestinations: string;
    fullDayApprox: (hours: number) => string;
    maxGuests: (n: number) => string;
    groupFromHint: (euros: number) => string;
  };
  booking: {
    title: string;
    lead: string;
    back: string;
    modalDestino: string;
    modalChoose: string;
    modalTitle: string;
    sectionDate: string;
    travelers: string;
    travelersHint: string;
    perPerson: string;
    total: string;
    totalGroup: string;
    checkoutNote: string;
    totalTbd: string;
    yourDetails: string;
    fullName: string;
    phoneOpt: string;
    email: string;
    pickup: string;
    pickupPh: string;
    notes: string;
    notesPh: string;
    submitLoading: string;
    submit: string;
    cardDestino: string;
    cardData: string;
    cardViajantes: string;
    ariaPickDestino: string;
    pickDate: string;
    ctaReview: string;
    ctaChoose: string;
    guestOne: string;
    guestMany: string;
    personSingular: string;
    personPlural: string;
    hintLong: string;
    checkAvailability: string;
    errPickDate: string;
    errInvalidResponse: string;
    errCheckoutDefault: string;
    errNoUrl: string;
    errTimeout: string;
    errNetwork: string;
    tours: {
      sintraCascais: string;
      threeDestinos: string;
      monsanto: string;
      fatimaTomar: string;
      lisboa: string;
      porto: string;
      arraabida: string;
      aveiro: string;
      alentejo: string;
      algarve: string;
    };
  };
  common: {
    languagePt: string;
    languageEn: string;
    priceLabel: string;
    priceGroupBadge: string;
    priceUnit: string;
    priceGroupUnit: string;
  };
  home: {
    hero: {
      badge: string;
      titleLine1: string;
      titleLine2: string;
      subtitle1: string;
      subtitle2: string;
      cta: string;
      ctaSecondary: string;
    };
    about: {
      subtitle: string;
      title: string;
      description1: string;
      description2: string;
      description3: string;
      learnMore: string;
    };
    widgets: {
      tours: string;
      destinations: string;
      guides: string;
      trips: string;
    };
    ticker: string;
    quotes: {
      laranja: string;
      azul: string;
    };
    destinations: {
      subtitle: string;
      title: string;
    };
    personalized: {
      subtitle: string;
      title: string;
      description1: string;
      description2: string;
      createMyTour: string;
      badge: string;
    };
    pillars: {
      subtitle: string;
      title: string;
      lead: string;
      jeep: { title: string; desc: string; cta: string };
      wine: { badge: string; title: string; desc: string; cta: string };
      romantic: { title: string; desc: string; cta: string };
    };
    instagram: {
      follow: string;
      description: string;
    };
    transporte: {
      subtitle: string;
      title: string;
      description: string;
      features: {
        portuguese: { title: string; desc: string };
        convertible: { title: string; desc: string };
        diesel: { title: string; desc: string };
        fourByFour: { title: string; desc: string };
      };
    };
    testimonials: {
      subtitle: string;
      title: string;
      description: string;
      tripadvisorBtn: string;
      items: [string, string, string, string, string, string];
    };
    faq: {
      subtitle: string;
      title: string;
      description: string;
      items: Array<{ q: string; a: string }>;
    };
  };
  executive: {
    badge: string;
    heroH1: string;
    heroValue: string;
    heroCta: string;
    heroWa: string;
    storyTitleA: string;
    storyTitleB: string;
    /** HTML permitido (strong). */
    storyP1: string;
    storyP2: string;
    waSchedule: string;
    waScheduleShort: string;
    stats: [string, string, string];
    abordoKicker: string;
    abordoH2: string;
    abordoLead: string;
    chipTours: string;
    chipCorporate: string;
    chipTerritory: string;
    specs: Array<{ k: string; v: string; hint: string }>;
    showcaseKicker: string;
    showcaseH2: string;
    showcaseLead: string;
    passeiosKicker: string;
    passeiosH2: string;
    passeiosLead: string;
    cards: {
      sintra: { title: string; line: string };
      fatima: { title: string; line: string };
      arrabida: { title: string; line: string };
    };
    transferKicker: string;
    transferH2: string;
    transferLead: string;
    tfAirport: { title: string; text: string };
    tfShuttle: { title: string; text: string };
    tfVip: { title: string; text: string };
    transferFoot: string;
    ctaH2: string;
    ctaSubtitle: string;
    ctaDtCeo: string;
    ctaDtWhatsapp: string;
    ctaDtWebsite: string;
    ctaReservar: string;
    ctaWaBtn: string;
  };
  obrigado: {
    eyebrow: string;
    titlePaid: string;
    greetingPrefix: string;
    greetingSuffix: string;
    subtitle: string;
    leadAfterName: string;
    leadBody: string;
    detailsTitle: string;
    dtName: string;
    dtEmail: string;
    dtPhone: string;
    dtTour: string;
    dtDate: string;
    dtPeople: string;
    dtNotes: string;
    refLabel: string;
    /** HTML permitido (strong). */
    receiptIntro: string;
    exportLoading: string;
    export: string;
    whatsapp: string;
    home: string;
    secureTitle: string;
    badgeStripeLabel: string;
    badgeStripeSub: string;
    badgeHttpsLabel: string;
    badgeHttpsSub: string;
    badgeCheckoutLabel: string;
    badgeCheckoutSub: string;
    receiptErrLink: string;
    receiptErrUnavailable: string;
    receiptErrNetwork: string;
  };
  destinations: {
    subtitle: string;
    title: string;
    searchPlaceholder: string;
    searchClear: string;
    searchResults: string;
    searchNoResults: string;
    /** Opcional — nomes/places podem continuar como props. */
    items: {
      sintra: { name: string; places: string };
      threeDestinos: { name: string; places: string };
      monsanto: { name: string; places: string };
      fatimaTomar: { name: string; places: string };
      lisboa: { name: string; places: string };
      porto: { name: string; places: string };
      arrabida: { name: string; places: string };
      aveiro: { name: string; places: string };
      alentejo: { name: string; places: string };
      algarve: { name: string; places: string };
    };
  };
};

export const messagesPt: Messages = {
  nav: {
    home: "Início",
    about: "Sobre",
    services: "Serviços",
    executive: "Executive",
    contact: "Contacto",
    book: "Reservar Agora",
  },
  footer: {
    tagline: "Tours Autênticos em Portugal com Veículos Históricos Portugueses",
    quickLinks: "Links Rápidos",
    home: "Início",
    about: "Sobre Nós",
    destinations: "Destinos",
    tours: "Tours Personalizados",
    contact: "Contacto",
    followUs: "Siga-nos",
    rights: "Todos os direitos reservados.",
    address: "Rua dos Ourives, n° 24 Linho 2710-333",
    email: "websitediscoverlixboatours@gmail.com",
    bookLink: "Reservar com quantidade",
    executiveLink: "Executive & Concierge",
    terms: "Termos de Uso",
    privacy: "Política de Privacidade",
    cookies: "Cookies",
    sgpd: "Direitos SGPD",
    dev: "Desenvolvido por",
  },
  tour: {
    about: "Sobre este tour",
    itinerary: "Itinerário sugerido",
    itineraryNote: "(Personalizável – adaptamos o passeio ao seu ritmo e interesses)",
    included: "O que está incluído",
    notIncluded: "Não incluído",
    gallery: "Galeria",
    video: "Vídeo do tour",
    map: "Mapa do percurso",
    mapCaption: "Visualize todo o percurso do tour",
    whyChoose: "Porquê escolher este tour",
    pickup: "Pontos de partida e chegada",
    checkAvailability: "Ver disponibilidade",
    privateTour: "Tour privado",
    fromGroup: "A partir de",
    perPrivateGroup: "por grupo privado",
    freeCancellation: "Cancelamento gratuito até 24h antes",
    instantConfirmation: "Confirmação imediata",
    securePayment: "Pagamento seguro",
    needHelp: "Precisa de ajuda?",
    needHelpText: "A nossa equipa está disponível para responder às suas perguntas.",
    breadcrumbDestinations: "Destinos",
    fullDayApprox: (hours) => `Dia completo · Aprox. ${hours} horas`,
    maxGuests: (n) => `Máx. ${n} passageiros`,
    groupFromHint: (euros) =>
      `Preço por grupo privado. Para 1–2 passageiros o total é €${euros}.`,
  },
  booking: {
    title: "Reserve o seu tour privado",
    lead: "Escolha o destino, a data e o número de passageiros.",
    back: "← Voltar ao site",
    modalDestino: "Destino",
    modalChoose: "Escolhe o teu tour",
    modalTitle: "Reserve o seu tour privado",
    sectionDate: "Data do tour",
    travelers: "Passageiros",
    travelersHint: "Escolhe quantas pessoas vão no tour (máx. 8 passageiros)",
    perPerson: "Por pessoa",
    total: "Total",
    totalGroup: "Total do grupo",
    checkoutNote: "Valor final confirmado no checkout.",
    totalTbd: "Calculado no checkout",
    yourDetails: "Os teus dados",
    fullName: "Nome completo",
    phoneOpt: "Telefone (opcional)",
    email: "Email",
    pickup: "Pickup / ponto de encontro",
    pickupPh: "Hotel, morada ou ponto de encontro",
    notes: "Preferências (opcional)",
    notesPh: "Horário preferido, idioma (PT/EN), crianças, etc.",
    submitLoading: "A redirecionar para o pagamento…",
    submit: "Continuar para pagamento seguro",
    cardDestino: "Destino",
    cardData: "Data",
    cardViajantes: "Passageiros",
    ariaPickDestino: "Escolher destino do tour",
    pickDate: "Toca para escolher",
    ctaReview: "Rever e pagar",
    ctaChoose: "Escolher data e reservar",
    guestOne: "passageiro",
    guestMany: "passageiros",
    personSingular: "passageiro",
    personPlural: "passageiros",
    hintLong:
      "Abre o calendário no botão laranja, escolhe até 8 passageiros e conclui os teus dados para ires ao pagamento seguro.",
    checkAvailability: "Verificar Disponibilidade",
    errPickDate:
      "Escolhe um dia no calendário em cima («Data do tour») antes de continuar para o pagamento.",
    errInvalidResponse: "Resposta inválida do servidor. Tenta novamente.",
    errCheckoutDefault: "Não foi possível iniciar o pagamento.",
    errNoUrl:
      "Resposta inválida: não há URL de pagamento. Confirma STRIPE_SECRET_KEY e os logs do servidor.",
    errTimeout:
      "O servidor demorou demasiado a responder (timeout). Verifica a ligação, se a chave Stripe está na Vercel (Environment Variables) e tenta de novo.",
    errNetwork: "Erro de rede. Tenta novamente.",
    tours: {
      sintraCascais: "Sintra & Cascais",
      threeDestinos: "Tour 3 Destinos (Fátima, Nazaré, Óbidos)",
      monsanto: "Monsanto & Centro de Portugal",
      fatimaTomar: "Fátima & Tomar Private Tour",
      lisboa: "Lisboa",
      porto: "Porto",
      arraabida: "Arrábida, Setúbal & Sesimbra",
      aveiro: "Aveiro & Costa Nova",
      alentejo: "Premium Alentejo Wine, Food & Culture Experience",
      algarve: "Algarve",
    },
  },
  common: {
    languagePt: "Português",
    languageEn: "English",
    priceLabel: "A partir de",
    priceGroupBadge: "Preço de grupo",
    priceUnit: "/ pessoa",
    priceGroupUnit: "/ grupo",
  },
  home: {
    hero: {
      badge: "Tours Exclusivos em Portugal",
      titleLine1: "Descubra Portugal",
      titleLine2: "como um local.",
      subtitle1:
        "Tours privados por Sintra, Lisboa e todo o país, com guia local, itinerários personalizados e total liberdade para viajar ao seu ritmo.",
      subtitle2: "",
      cta: "Explorar tours",
      ctaSecondary: "Falar connosco",
    },
    about: {
      subtitle: "Sobre Nós",
      title: "Explore Portugal com um toque local!",
      description1:
        "Com base em Sintra, a DiscoverLixboaTours oferece tours autênticos de palácios, montanhas e praias em Sintra e Cascais, além de Lisboa, Nazaré, Fátima, Óbidos, Porto e Algarve.",
      description2:
        "Guiados por Mike, nascido e criado em Sintra, cada tour combina aventura, cultura e histórias locais em um jeep conversível vintage ou van confortável.",
      description3:
        "Sustentável e apaixonado por mostrar o verdadeiro Portugal — cada tour é uma experiência única e inesquecível!",
      learnMore: "Saiba Mais",
    },
    widgets: {
      tours: "Pacotes de Tour",
      destinations: "Diferentes Destinos",
      guides: "Guias de Tour",
      trips: "Viagens Completas",
    },
    ticker: "Tours Autênticos em Portugal com DiscoverLixboaTours",
    quotes: {
      laranja: "Experiências Autênticas • Guias Locais • Momentos Inesquecíveis",
      azul: "Portugal de Norte a Sul • Tours Personalizados • Aventuras Exclusivas",
    },
    destinations: {
      subtitle: "Locais Mais Visitados",
      title: "Escolha Seus Destinos",
    },
    personalized: {
      subtitle: "Storytelling & medida",
      title: "Tours personalizados — inclusive a dois",
      description1:
        "Criamos experiências sob medida para o teu grupo ou para um momento a dois: ritmo slow, rotas alternativas e detalhes que transformam o dia (flores, mesa reservada, surpresas). Do jeep em trilhos pouco óbvios a roteiros culturais profundos, cada roteiro conta uma história contigo no centro.",
      description2:
        "Com guia local e veículos icónicos ou confortáveis, o foco é autenticidade e privacidade. Fala connosco no WhatsApp e desenhamos o teu Portugal ideal — casal, família ou grupo de amigos.",
      createMyTour: "Criar Meu Tour",
      badge: "TOURS PERSONALIZADOS",
    },
    pillars: {
      subtitle: "Experiências signature",
      title: "Jeep, Wine & momentos a dois",
      lead:
        "Posicionamento claro: aventura fora dos roteiros óbvios, gastronomia premium no Alentejo e privacidade para casais — com storytelling de guia local.",
      jeep: {
        title: "Jeep Off-road Experience",
        desc: "Acesso a caminhos e miradouros fora do circuito turístico habitual — UMM 4x4 conversível, ritmo seu e narrativa local que diferencia da concorrência.",
        cta: "Explorar Sintra & Cascais",
      },
      wine: {
        badge: "Premium",
        title: "Wine & Food Experience",
        desc: "O teu Alentejo como experiência de vinha e mesa: património UNESCO, provas e sabores regionais — packaging premium e roteiro contado ao pormenor.",
        cta: "Ver Food & Wine Tour",
      },
      romantic: {
        title: "Romantic / Couples Tour",
        desc: "Experiências privadas para dois: tempo, discreção e personalização (surpresas, ritmo slow, mesas especiais). Falamos contigo e desenhamos o dia.",
        cta: "Personalizar com o guia",
      },
    },
    instagram: {
      follow: "Seguir",
      description: "Siga-nos no Instagram para mais aventuras!",
    },
    transporte: {
      subtitle: "Jeep & território",
      title: "UMM Alter II Conversível",
      description:
        "O UMM Alter II 2.5 Diesel é o nosso cartão de visita: 4x4 conversível português que nos leva a estradas secundárias, miradouros e trilhos longe dos circuitos massificados — mais silêncio, mais paisagem, mais diferença face ao óbvio.",
      features: {
        portuguese: {
          title: "100% Português",
          desc: "Fabricado em Portugal pela UMM desde 1977",
        },
        convertible: {
          title: "Conversível",
          desc: "Experiência ao ar livre com vistas panorâmicas",
        },
        diesel: {
          title: "Motor Diesel 2.5",
          desc: "Potência e confiabilidade com motor Peugeot",
        },
        fourByFour: {
          title: "Tração Integral 4x4",
          desc: "Off-road seguro para explorar zonas menos turísticas e ganhar ângulos que autocarros não alcançam",
        },
      },
    },
    testimonials: {
      subtitle: "Depoimentos",
      title: "O que os nossos clientes dizem",
      description: "Avaliações reais de viajantes no TripAdvisor",
      tripadvisorBtn: "Ver mais avaliações no TripAdvisor",
      items: [
        "100% recomendado! Mike é um ótimo guia que nos fez aproveitar ao máximo essa experiência. As explicações foram muito claras e ele cuidou de nós do início ao fim.",
        "Diversão garantida! Mike foi o melhor! Tornou a experiência dos meus filhos super divertida. Levou-nos a lugares que nunca imaginei visitar, foi paciente, simpático, educado e ótimo fotógrafo. Recomendo muito!",
        "Tour lindo e adaptável às nossas necessidades. Mike foi simpático e profissional, levou-nos a lugares incríveis e com paisagens de tirar o fôlego. Altamente recomendado!",
        "Espetacular Magic Mike! Mostrou-nos as maravilhas de Sintra com simpatia, diversão e inteligência. Uma experiência única e inesquecível. O melhor guia local!",
        "Mike é um guia super alegre! No seu carro aberto único, levou-nos a vários lugares e ainda proporcionou muita diversão. Fez-nos sentir como locais e deu-nos ótimas dicas de visita, compras e restaurantes. Experiência 5 estrelas!",
        "Tivemos um tempo incrível com o Mike! Além das vistas deslumbrantes, ele tornou o passeio emocionante e divertido. Faria o tour com ele novamente, com certeza!",
      ],
    },
    faq: {
      subtitle: "Perguntas Frequentes",
      title: "Dúvidas sobre nossos Tours?",
      description: "Encontre respostas às perguntas mais comuns sobre a DiscoverLixboaTours",
      items: [
        {
          q: "Que destinos vocês cobrem em Portugal?",
          a: "Operamos em todo o território nacional! Nossa base é em Sintra, mas oferecemos tours personalizados para todos os destinos de Portugal: Sintra e seus Palácios, Lisboa, praias da Costa de Cascais (a chamada Riviera Portuguesa), Porto, Arrábida, Setúbal & Sesimbra, Alentejo (Évora, Estremoz & Arraiolos), Algarve, Fátima, Nazaré, Óbidos e muito mais. Conhecemos cada região profundamente e criamos experiências autênticas em qualquer parte do país.",
        },
        {
          q: "O que torna o UMM Alter II especial para tours?",
          a: "O UMM Alter II é um veículo 4x4 português autêntico, fabricado pela União Metalo-Mecânica desde 1977. Com tração integral e capacidade off-road, ele nos permite acessar trilhas e locais únicos que veículos comuns não conseguem alcançar, proporcionando uma experiência verdadeiramente exclusiva.",
        },
        {
          q: "Quantas pessoas cabem no veículo?",
          a: "Nosso UMM Alter II comporta confortavelmente grupos pequenos de até 8 pessoas, garantindo uma experiência personalizada e íntima. Tours privados para casais ou famílias também estão disponíveis.",
        },
        {
          q: "Os tours são personalizáveis?",
          a: "Sim! Oferecemos tours completamente personalizados de acordo com seus interesses. Seja história, natureza, gastronomia ou fotografia, criamos roteiros exclusivos para você explorar Portugal do seu jeito.",
        },
        {
          q: "Preciso de experiência off-road?",
          a: "Não! Nosso guia experiente cuida de toda a condução. Você só precisa relaxar, aproveitar a paisagem e se deixar levar pela aventura. A experiência é segura e adequada para todos os níveis.",
        },
        {
          q: "Vocês fazem tours em Sintra e Cascais?",
          a: "Sim! Somos especialistas em Sintra e Cascais. Oferecemos tours completos pelos Palácios de Sintra (Palácio da Pena, Quinta da Regaleira, Castelo dos Mouros) e pelas praias da Costa de Cascais - a chamada Riviera Portuguesa. Também fazemos transferes entre os Palácios de Sintra para sua comodidade. É uma das nossas experiências mais procuradas!",
        },
        {
          q: "Como faço para reservar um tour?",
          a: "Você pode reservar diretamente pelo nosso site clicando nos tours disponíveis e seguindo o processo de pagamento online, ou entre em contato conosco através do WhatsApp (+351 934 483 853), Instagram (@discoverlixboatours) ou Facebook (Discoverlixboatours) para reservas personalizadas. Responderemos rapidamente para ajudar a planejar seu tour perfeito!",
        },
      ],
    },
  },
  executive: {
    badge: "Concierge · Corporate · Family",
    heroH1: "O padrão ouro de viagem privada em Portugal",
    heroValue: "Experiência · Sofisticação · Exclusividade",
    heroCta: "Reserve a sua experiência",
    heroWa: "Falar com o CEO",
    storyTitleA: "As nossas histórias",
    storyTitleB: "com viajantes exigentes",
    storyP1:
      "Na <strong>DiscoverLixboaTours</strong> unimos hospitalidade de alto nível com transporte de luxo. Na nossa <strong>Mercedes-Benz Vito 116 CDI Select</strong> (modelo recente), cada quilómetro é vivido com conforto, discrição e atenção ao detalhe.",
    storyP2:
      "Lounge móvel com lugar para 8 passageiros e condutor (9 no total), estofos premium e serviço personalizado — para viajar por Portugal com conforto e discrição.",
    waSchedule: "Agendar Executive no WhatsApp",
    waScheduleShort: "Agendar no WhatsApp",
    stats: ["Jornadas premium", "Lugares no total", "Destinos em Portugal"],
    abordoKicker: "A bordo",
    abordoH2: "Hospitalidade premium, quilómetro a quilómetro",
    abordoLead:
      "<strong>Turismo privado</strong> e <strong>mobilidade executiva</strong> em Portugal — cada detalhe pensado para quem viaja em descoberta ou em negócio, com discrição e liberdade de roteiro.",
    chipTours: "Tours & experiências",
    chipCorporate: "Corporate & eventos",
    chipTerritory: "Portugal inteiro",
    specs: [
      {
        k: "Capacidade",
        v: "8 passageiros + condutor",
        hint: "9 lugares na Mercedes-Benz Vito",
      },
      {
        k: "Veículo",
        v: "Vito 116 CDI Select · modelo recente",
        hint: "Mercedes-Benz · espaço e elegância em estrada",
      },
      {
        k: "Conforto",
        v: "Lounge móvel · luz natural",
        hint: "Entre palácios e miradouros, viaja com calma",
      },
      {
        k: "Âmbito",
        v: "Todo o território nacional",
        hint: "Tours e transfers — norte a sul, no teu ritmo",
      },
    ],
    showcaseKicker: "Destaques",
    showcaseH2: "Galeria",
    showcaseLead: "Imagens da experiência e dos destinos.",
    passeiosKicker: "Itinerários",
    passeiosH2: "Passeios de autor",
    passeiosLead: "Roteiros à medida — cultura, história e paisagens.",
    cards: {
      sintra: { title: "Sintra & Cascais", line: "O Refúgio Real" },
      fatima: { title: "Fátima & Óbidos", line: "Caminhos da Tradição" },
      arrabida: {
        title: "Azeitão & Arrábida",
        line: "Degustação premium à beira do Atlântico",
      },
    },
    transferKicker: "Mobilidade",
    transferH2: "Transfers, shuttle e eventos VIP",
    transferLead: "Eficiência e elegância em cada deslocação.",
    tfAirport: {
      title: "Transfers aeroporto",
      text: "Lisboa, Porto, Faro e outros destinos.",
    },
    tfShuttle: {
      title: "Shuttle privado",
      text: "Porta a porta para empresas ou lazer.",
    },
    tfVip: {
      title: "Eventos VIP",
      text: "Casamentos, eventos corporativos e galas — transporte de luxo.",
    },
    transferFoot:
      "Transfers personalizados e serviços VIP em todo o país. Guia privado e serviço premium — atento e discreto.",
    ctaH2: "Reserve a sua experiência",
    ctaSubtitle: "Private Tours & Concierge em Portugal",
    ctaDtCeo: "CEO",
    ctaDtWhatsapp: "WhatsApp",
    ctaDtWebsite: "Website",
    ctaReservar: "Reservar online",
    ctaWaBtn: "WhatsApp",
  },
  obrigado: {
    eyebrow: "Bilhete digital",
    titlePaid: "Reserva paga com sucesso",
    greetingPrefix: "Obrigado,",
    greetingSuffix: "!",
    subtitle: "Pagamento confirmado · Discover Lixboa Tours",
    leadAfterName: ", o teu lugar está garantido. ",
    leadBody:
      "Obrigado por escolheres a Discover Lixboa Tours. O pagamento foi processado em segurança. A data que indicaste no formulário é uma preferência — confirmamos contigo os detalhes finais.",
    detailsTitle: "Detalhes da reserva",
    dtName: "Nome",
    dtEmail: "Email",
    dtPhone: "Telefone",
    dtTour: "Tour",
    dtDate: "Data preferida",
    dtPeople: "Pessoas",
    dtNotes: "Notas",
    refLabel: "Referência de pagamento",
    receiptIntro:
      "<strong>Recibo:</strong> exporta o recibo oficial da Stripe (PDF no browser).",
    exportLoading: "A preparar…",
    export: "Exportar recibo",
    whatsapp: "Falar no WhatsApp",
    home: "Voltar ao início",
    secureTitle: "Pagamento seguro",
    badgeStripeLabel: "Stripe",
    badgeStripeSub: "Pagamento seguro (PCI DSS)",
    badgeHttpsLabel: "HTTPS",
    badgeHttpsSub: "Ligação encriptada",
    badgeCheckoutLabel: "Checkout",
    badgeCheckoutSub: "Dados do cartão tratados pela Stripe",
    receiptErrLink: "Não foi possível obter o link do recibo.",
    receiptErrUnavailable: "Recibo indisponível de momento.",
    receiptErrNetwork: "Erro de rede. Tenta novamente.",
  },
  destinations: {
    subtitle: "Locais Mais Visitados",
    title: "Escolha Seus Destinos",
    searchPlaceholder: "Pesquisar tours…",
    searchClear: "Limpar pesquisa",
    searchResults: "resultados",
    searchNoResults: "Sem resultados",
    items: {
      sintra: { name: "Sintra & Cascais", places: "Palácios & Praias Secretas" },
      threeDestinos: {
        name: "Fátima, Nazaré & Óbidos",
        places: "Tour 3 Destinos",
      },
      monsanto: {
        name: "Monsanto",
        places: "Centro de Portugal",
      },
      fatimaTomar: {
        name: "Fátima & Tomar",
        places: "Peregrinação & património UNESCO",
      },
      lisboa: { name: "Lisboa", places: "Capital Vibrante" },
      porto: {
        name: "Porto",
        places: "Património, História & Vinho",
      },
      arrabida: {
        name: "Arrábida",
        places: "Setúbal & Sesimbra",
      },
      aveiro: {
        name: "Aveiro & Costa Nova",
        places: "Canais e moliceiros",
      },
      alentejo: {
        name: "Alentejo",
        places: "Vinho, comida & cultura",
      },
      algarve: { name: "Algarve", places: "Costa do Sol" },
    },
  },
};

export const messagesEn: Messages = {
  nav: {
    home: "Home",
    about: "About",
    services: "Services",
    executive: "Executive",
    contact: "Contact",
    book: "Book Now",
  },
  footer: {
    tagline: "Authentic Tours in Portugal with Historic Portuguese Vehicles",
    quickLinks: "Quick Links",
    home: "Home",
    about: "About Us",
    destinations: "Destinations",
    tours: "Personalized Tours",
    contact: "Contact",
    followUs: "Follow Us",
    rights: "All rights reserved.",
    address: "Rua dos Ourives, n° 24 Linho 2710-333",
    email: "websitediscoverlixboatours@gmail.com",
    bookLink: "Book with party size",
    executiveLink: "Executive & Concierge",
    terms: "Terms of Use",
    privacy: "Privacy Policy",
    cookies: "Cookies",
    sgpd: "GDPR Rights",
    dev: "Developed by",
  },
  tour: {
    about: "About This Tour",
    itinerary: "Suggested Itinerary",
    itineraryNote: "(Customisable – we adapt the day to your pace and interests)",
    included: "What's Included",
    notIncluded: "Not Included",
    gallery: "Gallery",
    video: "Tour video",
    map: "Route map",
    mapCaption: "See the full tour route",
    whyChoose: "Why choose this tour",
    pickup: "Pickup & Drop-off",
    checkAvailability: "Check Availability",
    privateTour: "Private Tour",
    fromGroup: "From",
    perPrivateGroup: "per private group",
    freeCancellation: "Free cancellation up to 24 hours before",
    instantConfirmation: "Instant confirmation",
    securePayment: "Secure payment",
    needHelp: "Need Help?",
    needHelpText: "Our team is available to answer your questions.",
    breadcrumbDestinations: "Destinations",
    fullDayApprox: (hours) => `Full Day · Approx. ${hours} Hours`,
    maxGuests: (n) => `Max. ${n} Guests`,
    groupFromHint: (euros) =>
      `Price is per private group. For 1–2 guests the total is €${euros}.`,
  },
  booking: {
    title: "Book Your Private Tour",
    lead: "Choose your destination, date and number of guests.",
    back: "← Back to the site",
    modalDestino: "Destination",
    modalChoose: "Choose your tour",
    modalTitle: "Book Your Private Tour",
    sectionDate: "Tour date",
    travelers: "Guests",
    travelersHint: "Choose how many people on the tour (max. 8 passengers)",
    perPerson: "Per person",
    total: "Total",
    totalGroup: "Group total",
    checkoutNote: "Final amount confirmed at checkout.",
    totalTbd: "Calculated at checkout",
    yourDetails: "Your details",
    fullName: "Full name",
    phoneOpt: "Phone (optional)",
    email: "Email",
    pickup: "Pick-up / meeting point",
    pickupPh: "Hotel, address, or meeting point",
    notes: "Preferences (optional)",
    notesPh: "Preferred time, language (PT/EN), kids, etc.",
    submitLoading: "Redirecting to payment…",
    submit: "Continue to secure payment",
    cardDestino: "Destination",
    cardData: "Date",
    cardViajantes: "Guests",
    ariaPickDestino: "Choose tour destination",
    pickDate: "Tap to choose",
    ctaReview: "Review & pay",
    ctaChoose: "Choose a Date & Book",
    guestOne: "Guest",
    guestMany: "Guests",
    personSingular: "Guest",
    personPlural: "Guests",
    hintLong:
      "Open the calendar on the orange button, choose up to 8 passengers and complete your details to go to secure payment.",
    checkAvailability: "Check Availability",
    errPickDate:
      'Choose a day in the calendar above ("Tour date") before continuing to payment.',
    errInvalidResponse: "Invalid server response. Please try again.",
    errCheckoutDefault: "Could not start payment.",
    errNoUrl:
      "Invalid response: no payment URL. Check STRIPE_SECRET_KEY and server logs.",
    errTimeout:
      "The server took too long (timeout). Check your connection, Stripe env on Vercel, and try again.",
    errNetwork: "Network error. Please try again.",
    tours: {
      sintraCascais: "Sintra & Cascais",
      threeDestinos: "3-Destination Tour (Fátima, Nazaré, Óbidos)",
      monsanto: "Monsanto & Central Portugal",
      fatimaTomar: "Fátima & Tomar Private Tour",
      lisboa: "Lisbon",
      porto: "Porto",
      arraabida: "Arrábida, Setúbal & Sesimbra",
      aveiro: "Aveiro & Costa Nova",
      alentejo: "Premium Alentejo Wine, Food & Culture Experience",
      algarve: "Algarve",
    },
  },
  common: {
    languagePt: "Português",
    languageEn: "English",
    priceLabel: "Starting from",
    priceGroupBadge: "Group price",
    priceUnit: "/ person",
    priceGroupUnit: "/ group",
  },
  home: {
    hero: {
      badge: "Exclusive Tours in Portugal",
      titleLine1: "Experience Portugal",
      titleLine2: "Like a Local.",
      subtitle1:
        "Private tours across Sintra, Lisbon and beyond, with a local guide, flexible itineraries and your own private vehicle.",
      subtitle2: "",
      cta: "Explore Private Tours",
      ctaSecondary: "Talk to Us",
    },
    about: {
      subtitle: "About Us",
      title: "Explore Portugal with a local touch!",
      description1:
        "Based in Sintra, DiscoverLixboaTours offers authentic tours of palaces, mountains and beaches in Sintra and Cascais, as well as Lisbon, Nazaré, Fátima, Óbidos, Porto and Algarve.",
      description2:
        "Guided by Mike, born and raised in Sintra, each tour combines adventure, culture and local stories in a vintage convertible jeep or comfortable van.",
      description3:
        "Sustainable and passionate about showing the real Portugal — each tour is a unique and unforgettable experience!",
      learnMore: "Learn More",
    },
    widgets: {
      tours: "Tour Packages",
      destinations: "Different Destinations",
      guides: "Tour Guides",
      trips: "Complete Trips",
    },
    ticker: "Authentic Tours in Portugal with DiscoverLixboaTours",
    quotes: {
      laranja: "Authentic Experiences • Local Guides • Unforgettable Moments",
      azul: "Portugal from North to South • Personalized Tours • Exclusive Adventures",
    },
    destinations: {
      subtitle: "Most Visited Places",
      title: "Choose Your Destinations",
    },
    personalized: {
      subtitle: "Storytelling & tailor-made",
      title: "Personalized tours — couples welcome",
      description1:
        "We design experiences for your group or for two: slow pace, alternative routes and details that make the day (flowers, reserved table, surprises). From jeep trails off the beaten path to deep cultural itineraries, every route tells a story with you at the centre.",
      description2:
        "With a local guide and iconic or comfortable vehicles, the focus is authenticity and privacy. Message us on WhatsApp and we sketch your ideal Portugal — couple, family or friends.",
      createMyTour: "Create My Tour",
      badge: "PERSONALIZED TOURS",
    },
    pillars: {
      subtitle: "Signature experiences",
      title: "Jeep, Wine & moments for two",
      lead:
        "Clear positioning: adventure beyond the obvious routes, premium gastronomy in Alentejo and privacy for couples — with real local storytelling.",
      jeep: {
        title: "Jeep Off-road Experience",
        desc: "Paths and viewpoints away from the usual tourist circuit — open-top Portuguese 4x4, your pace and local narrative that sets us apart.",
        cta: "Explore Sintra & Cascais",
      },
      wine: {
        badge: "Premium",
        title: "Wine & Food Experience",
        desc: "Your Alentejo as vineyard-and-table experience: UNESCO heritage, tastings and regional flavours — premium packaging and a guide-led story.",
        cta: "See Food & Wine Tour",
      },
      romantic: {
        title: "Romantic / Couples Tour",
        desc: "Private experiences for two: time, discretion and personalization (surprises, slow pace, special tables). We talk with you and design the day.",
        cta: "Plan with your guide",
      },
    },
    instagram: {
      follow: "Follow",
      description: "Follow us on Instagram for more adventures!",
    },
    transporte: {
      subtitle: "Jeep & territory",
      title: "UMM Alter II Convertible",
      description:
        "The UMM Alter II 2.5 Diesel is our signature: Portuguese open-top 4x4 that takes us to back roads, viewpoints and trails away from mass routes — more silence, more landscape, more difference from the obvious.",
      features: {
        portuguese: {
          title: "100% Portuguese",
          desc: "Manufactured in Portugal by UMM since 1977",
        },
        convertible: {
          title: "Convertible",
          desc: "Outdoor experience with panoramic views",
        },
        diesel: {
          title: "Diesel 2.5 Engine",
          desc: "Power and reliability with Peugeot engine",
        },
        fourByFour: {
          title: "Integral 4x4 Traction",
          desc: "Safe off-road access to less touristy areas and angles coaches simply cannot reach",
        },
      },
    },
    testimonials: {
      subtitle: "Testimonials",
      title: "What Our Clients Say",
      description: "Real feedback from clients who lived unique experiences with us",
      tripadvisorBtn: "See more reviews on TripAdvisor",
      items: [
        "100% recommended! Mike is a great guide who made us make the most of this experience. The explanations were very clear and he took care of us from start to finish.",
        "Fun guaranteed! Mike was the best! He made my children's experience super fun. He took us to places I never imagined visiting, he was patient, friendly, polite and a great photographer. Highly recommend!",
        "Beautiful tour and adaptable to our needs. Mike was friendly and professional, took us to incredible places with breathtaking views. Highly recommended!",
        "Spectacular Magic Mike! Showed us the wonders of Sintra with friendliness, fun and intelligence. A unique and unforgettable experience. The best local guide!",
        "Mike is a super cheerful guide! In his unique open car, he took us to several places and also provided a lot of fun. Made us feel like locals and gave us great tips for visits, shopping and restaurants. 5-star experience!",
        "We had an amazing time with Mike! Besides the stunning views, he made the ride exciting and fun. Would definitely do the tour with him again!",
      ],
    },
    faq: {
      subtitle: "Frequently Asked Questions",
      title: "Questions about our Tours?",
      description: "Find answers to the most common questions about DiscoverLixboaTours",
      items: [
        {
          q: "What destinations do you cover in Portugal?",
          a: "We operate throughout the national territory! Our base is in Sintra, but we offer personalized tours for all destinations in Portugal: Sintra and its Palaces, Lisbon, beaches of the Cascais Coast (the so-called Portuguese Riviera), Porto, Arrábida, Setúbal & Sesimbra, Alentejo (Évora, Estremoz & Arraiolos), Algarve, Fátima, Nazaré, Óbidos and much more. We know each region deeply and create authentic experiences anywhere in the country.",
        },
        {
          q: "What makes the UMM Alter II special for tours?",
          a: "The UMM Alter II is an authentic Portuguese 4x4 vehicle, manufactured by União Metalo-Mecânica since 1977. With integral traction and off-road capability, it allows us to access unique trails and locations that common vehicles cannot reach, providing a truly exclusive experience.",
        },
        {
          q: "How many people fit in the vehicle?",
          a: "Our UMM Alter II comfortably accommodates small groups of up to 8 people, ensuring a personalized and intimate experience. Private tours for couples or families are also available.",
        },
        {
          q: "Are the tours customizable?",
          a: "Yes! We offer completely personalized tours according to your interests. Whether history, nature, gastronomy or photography, we create exclusive itineraries for you to explore Portugal your way.",
        },
        {
          q: "Do I need off-road experience?",
          a: "No! Our experienced guide takes care of all the driving. You just need to relax, enjoy the landscape and let yourself be carried away by the adventure. The experience is safe and suitable for all levels.",
        },
        {
          q: "Do you do tours in Sintra and Cascais?",
          a: "Yes! We are specialists in Sintra and Cascais. We offer complete tours of the Sintra Palaces (Pena Palace, Quinta da Regaleira, Moorish Castle) and the Cascais Coast beaches - the so-called Portuguese Riviera. We also make transfers between Sintra Palaces for your convenience. It's one of our most sought-after experiences!",
        },
        {
          q: "How do I book a tour?",
          a: "You can book directly through our website by clicking on the available tours and following the online payment process, or contact us via WhatsApp (+351 934 483 853), Instagram (@discoverlixboatours) or Facebook (Discoverlixboatours) for personalized bookings. We will respond quickly to help plan your perfect tour!",
        },
      ],
    },
  },
  executive: {
    badge: "Concierge · Corporate · Family",
    heroH1: "The gold standard of private travel in Portugal",
    heroValue: "Experience · Sophistication · Exclusivity",
    heroCta: "Book your experience",
    heroWa: "Speak with the CEO",
    storyTitleA: "Our stories",
    storyTitleB: "with discerning travellers",
    storyP1:
      "At <strong>DiscoverLixboaTours</strong> we combine high-end hospitality with luxury transport. In our <strong>Mercedes-Benz Vito 116 CDI Select</strong> (recent model), every kilometre is lived with comfort, discretion and attention to detail.",
    storyP2:
      "A mobile lounge for 8 passengers plus driver (9 in total), premium upholstery and personalised service — travel across Portugal in comfort and discretion.",
    waSchedule: "Schedule Executive on WhatsApp",
    waScheduleShort: "Schedule on WhatsApp",
    stats: ["Premium journeys", "Total seats", "Destinations in Portugal"],
    abordoKicker: "On board",
    abordoH2: "Premium hospitality, kilometre after kilometre",
    abordoLead:
      "<strong>Private tourism</strong> and <strong>executive mobility</strong> in Portugal — every detail for those travelling for discovery or business, with discretion and route freedom.",
    chipTours: "Tours & experiences",
    chipCorporate: "Corporate & events",
    chipTerritory: "All of Portugal",
    specs: [
      {
        k: "Capacity",
        v: "8 passengers + driver",
        hint: "9 seats in the Mercedes-Benz Vito",
      },
      {
        k: "Vehicle",
        v: "Vito 116 CDI Select · recent model",
        hint: "Mercedes-Benz · space and elegance on the road",
      },
      {
        k: "Comfort",
        v: "Mobile lounge · natural light",
        hint: "Between palaces and viewpoints, travel at ease",
      },
      {
        k: "Coverage",
        v: "Nationwide",
        hint: "Tours and transfers — north to south, at your pace",
      },
    ],
    showcaseKicker: "Highlights",
    showcaseH2: "Gallery",
    showcaseLead: "Images from the experience and destinations.",
    passeiosKicker: "Itineraries",
    passeiosH2: "Signature tours",
    passeiosLead: "Tailor-made routes — culture, history and landscapes.",
    cards: {
      sintra: { title: "Sintra & Cascais", line: "The Royal Retreat" },
      fatima: { title: "Fátima & Óbidos", line: "Paths of tradition" },
      arrabida: {
        title: "Azeitão & Arrábida",
        line: "Premium tasting by the Atlantic",
      },
    },
    transferKicker: "Mobility",
    transferH2: "Airport transfers, shuttle & VIP events",
    transferLead: "Efficiency and elegance on every move.",
    tfAirport: {
      title: "Airport transfers",
      text: "Lisbon, Porto, Faro and other destinations.",
    },
    tfShuttle: {
      title: "Private shuttle",
      text: "Door-to-door for business or leisure.",
    },
    tfVip: {
      title: "VIP events",
      text: "Weddings, corporate events and galas — luxury transport.",
    },
    transferFoot:
      "Bespoke transfers and VIP services nationwide. Private guide and premium service — attentive and discreet.",
    ctaH2: "Book your experience",
    ctaSubtitle: "Private Tours & Concierge in Portugal",
    ctaDtCeo: "CEO",
    ctaDtWhatsapp: "WhatsApp",
    ctaDtWebsite: "Website",
    ctaReservar: "Book online",
    ctaWaBtn: "WhatsApp",
  },
  obrigado: {
    eyebrow: "Digital ticket",
    titlePaid: "Booking paid successfully",
    greetingPrefix: "Thank you,",
    greetingSuffix: "!",
    subtitle: "Payment confirmed · Discover Lixboa Tours",
    leadAfterName: ", your spot is secured. ",
    leadBody:
      "Thank you for choosing Discover Lixboa Tours. Your payment was processed securely. The date you entered on the form is your preference — we’ll confirm the final details with you.",
    detailsTitle: "Booking details",
    dtName: "Name",
    dtEmail: "Email",
    dtPhone: "Phone",
    dtTour: "Tour",
    dtDate: "Preferred date",
    dtPeople: "People",
    dtNotes: "Notes",
    refLabel: "Payment reference",
    receiptIntro:
      "<strong>Receipt:</strong> export Stripe’s official receipt (PDF in your browser).",
    exportLoading: "Preparing…",
    export: "Export receipt",
    whatsapp: "Chat on WhatsApp",
    home: "Back to home",
    secureTitle: "Secure payment",
    badgeStripeLabel: "Stripe",
    badgeStripeSub: "Secure payment (PCI DSS)",
    badgeHttpsLabel: "HTTPS",
    badgeHttpsSub: "Encrypted connection",
    badgeCheckoutLabel: "Checkout",
    badgeCheckoutSub: "Card details handled by Stripe",
    receiptErrLink: "Could not get the receipt link.",
    receiptErrUnavailable: "Receipt unavailable at the moment.",
    receiptErrNetwork: "Network error. Please try again.",
  },
  destinations: {
    subtitle: "Most Visited Places",
    title: "Choose Your Destinations",
    searchPlaceholder: "Search tours…",
    searchClear: "Clear search",
    searchResults: "results",
    searchNoResults: "No results",
    items: {
      sintra: { name: "Sintra & Cascais", places: "Palaces & Secret Beaches" },
      threeDestinos: {
        name: "Fátima, Nazaré & Óbidos",
        places: "3 Destinations Tour",
      },
      monsanto: {
        name: "Monsanto",
        places: "Central Portugal",
      },
      fatimaTomar: {
        name: "Fátima & Tomar",
        places: "Pilgrimage & UNESCO heritage",
      },
      lisboa: { name: "Lisbon", places: "Vibrant Capital" },
      porto: {
        name: "Porto",
        places: "Heritage, History & Wine",
      },
      arrabida: {
        name: "Arrábida",
        places: "Setúbal & Sesimbra",
      },
      aveiro: {
        name: "Aveiro & Costa Nova",
        places: "Canals and moliceiros",
      },
      alentejo: {
        name: "Alentejo",
        places: "Wine, food & culture",
      },
      algarve: { name: "Algarve", places: "Sun Coast" },
    },
  },
};

export function getMessages(locale: Locale): Messages {
  return locale === "en" ? messagesEn : messagesPt;
}
