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
    contact: string;
    followUs: string;
    rights: string;
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
  };
  common: {
    languagePt: string;
    languageEn: string;
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
    contact: "Contacto",
    followUs: "Siga-nos",
    rights: "Todos os direitos reservados.",
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
  },
  common: {
    languagePt: "Português",
    languageEn: "English",
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
    contact: "Contact",
    followUs: "Follow Us",
    rights: "All rights reserved.",
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
  },
  common: {
    languagePt: "Português",
    languageEn: "English",
  },
};

export function getMessages(locale: Locale): Messages {
  return locale === "en" ? messagesEn : messagesPt;
}
