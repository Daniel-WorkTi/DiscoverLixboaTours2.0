import type { Locale } from "@/lib/i18n/types";

export type LegalMessages = {
  back: string;
  lastUpdated: string;
  processorsIntro: string;
  processors: {
    stripe: string;
    googleCalendar: string;
    vercel: string;
  };
  company: {
    operatingCountries: string;
    retentionBookings: string;
  };
  privacy: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    lead: string;
    rows: {
      controller: string;
      vat: string;
      address: string;
      email: string;
      scope: string;
    };
    dataTitle: string;
    dataItems: string[];
    purposesTitle: string;
    purposesP1: string;
    purposesP2: string;
    processorsTitle: string;
    retentionTitle: string;
    rightsTitle: string;
    rightsP: string;
    emailCta: string;
    emailSubject: string;
    linkCookies: string;
    linkSgpd: string;
  };
  cookies: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    lead: string;
    whatTitle: string;
    whatP: string;
    essentialTitle: string;
    essentialItems: string[];
    manageTitle: string;
    manageP1: string;
    manageP2Prefix: string;
    otherTitle: string;
    linkPrivacy: string;
    linkTerms: string;
  };
  terms: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    lead: string;
    idTitle: string;
    /** HTML com <strong> para nome, NIF e morada. */
    idHtml: (legalName: string, vat: string, address: string) => string;
    bookingTitle: string;
    bookingItems: string[];
    cancelTitle: string;
    cancelP: string;
    liabilityTitle: string;
    liabilityP: string;
    contactTitle: string;
    contactPrefix: string;
    relatedTitle: string;
    linkPrivacy: string;
    linkCookies: string;
  };
  sgpd: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    lead: string;
    rightsTitle: string;
    rightsItems: string[];
    howTitle: string;
    howIntro: string;
    howIntroSuffix: string;
    howItems: string[];
    emailCta: string;
    emailSubject: string;
    linkPrivacy: string;
  };
};

const legalPt: LegalMessages = {
  back: "← Voltar ao site",
  lastUpdated: "Última atualização",
  processorsIntro: "Prestadores usados para operar o website e processar pagamentos:",
  processors: {
    stripe: "Pagamentos e prevenção de fraude",
    googleCalendar: "Gestão operacional das reservas e agenda",
    vercel: "Alojamento e entrega do website (hosting/CDN)",
  },
  company: {
    operatingCountries: "Portugal e Espanha",
    retentionBookings:
      "Retenção: seguimos os prazos padrão definidos pela Stripe para dados de pagamento e registos associados. Mantemos apenas o necessário para gestão operacional de reservas e cumprimento de obrigações aplicáveis.",
  },
  privacy: {
    metaTitle: "Política de Privacidade | DiscoverLixboaTours",
    metaDescription:
      "Informação sobre tratamento de dados pessoais, finalidades, base legal, prazos de retenção e direitos dos titulares (SGPD/GDPR).",
    title: "Política de Privacidade",
    lead: "Como tratamos dados pessoais no âmbito das reservas e do apoio ao cliente (SGPD/GDPR).",
    rows: {
      controller: "Responsável pelo tratamento",
      vat: "NIF",
      address: "Morada",
      email: "Email (privacidade)",
      scope: "Âmbito",
    },
    dataTitle: "Que dados recolhemos",
    dataItems: [
      "Nome, email e telefone.",
      "Tour escolhido, nº de pessoas e data preferida.",
      "Notas do cliente (ex.: pickup, preferências, restrições).",
      "Dados técnicos essenciais (cookies essenciais e logs de segurança).",
    ],
    purposesTitle: "Finalidades e bases legais",
    purposesP1:
      "Gestão de reservas, comunicação com o cliente e, quando aplicável, cumprimento de obrigações legais.",
    purposesP2:
      "A base legal pode incluir execução de contrato (reserva), diligências pré-contratuais, obrigação legal e interesse legítimo (segurança/prevenção de fraude).",
    processorsTitle: "Subcontratantes",
    retentionTitle: "Retenção",
    rightsTitle: "Direitos do titular",
    rightsP:
      "Pode exercer direitos de acesso, retificação, apagamento, limitação, oposição e portabilidade (quando aplicável). Para pedidos SGPD, contacte-nos por email.",
    emailCta: "Enviar pedido por email",
    emailSubject: "Pedido SGPD (Privacidade)",
    linkCookies: "Política de Cookies",
    linkSgpd: "Direitos SGPD",
  },
  cookies: {
    metaTitle: "Política de Cookies | DiscoverLixboaTours",
    metaDescription:
      "Informação sobre cookies essenciais, armazenamento local e como gerir preferências no navegador.",
    title: "Política de Cookies",
    lead: "Usamos apenas cookies essenciais para funcionamento e segurança.",
    whatTitle: "O que são cookies?",
    whatP:
      "Cookies são pequenos ficheiros guardados no seu dispositivo que ajudam um website a funcionar corretamente e, nalguns casos, a melhorar a experiência.",
    essentialTitle: "Cookies essenciais",
    essentialItems: [
      "Segurança e prevenção de abuso.",
      "Preferências básicas (ex.: idioma) quando aplicável.",
      "Funcionamento de formulários e navegação.",
    ],
    manageTitle: "Como gerir cookies",
    manageP1:
      "Pode apagar ou bloquear cookies nas definições do seu navegador. Note que bloquear cookies essenciais pode afetar o funcionamento do site.",
    manageP2Prefix: "Para questões, contacte:",
    otherTitle: "Outros documentos",
    linkPrivacy: "Política de Privacidade",
    linkTerms: "Termos e Condições",
  },
  terms: {
    metaTitle: "Termos e Condições | DiscoverLixboaTours",
    metaDescription:
      "Termos de utilização do site, reservas, pagamentos e regras gerais do serviço.",
    title: "Termos e Condições",
    lead: "Termos gerais aplicáveis ao uso do website e às reservas.",
    idTitle: "Identificação",
    idHtml: (legalName, vat, address) =>
      `Este website é operado por <strong>${legalName}</strong>, NIF <strong>${vat}</strong>, com sede em <strong>${address}</strong>.`,
    bookingTitle: "Reservas e pagamentos",
    bookingItems: [
      "As reservas podem depender de disponibilidade.",
      "Os pagamentos são processados por prestador externo (ex.: Stripe).",
      "Detalhes finais (horário/pickup) são confirmados por contacto com o cliente.",
    ],
    cancelTitle: "Cancelamentos e alterações",
    cancelP:
      "As condições podem variar por tour/serviço e serão confirmadas no momento da reserva. Para alterar uma reserva, contacte-nos o quanto antes.",
    liabilityTitle: "Limitação de responsabilidade",
    liabilityP:
      "Não nos responsabilizamos por atrasos decorrentes de fatores externos (trânsito, condições meteorológicas, encerramentos de locais, etc.). Sempre que possível, propomos alternativas equivalentes.",
    contactTitle: "Contactos",
    contactPrefix: "Para questões:",
    relatedTitle: "Documentos relacionados",
    linkPrivacy: "Privacidade (SGPD)",
    linkCookies: "Cookies",
  },
  sgpd: {
    metaTitle: "Direitos SGPD | DiscoverLixboaTours",
    metaDescription:
      "Como exercer direitos SGPD/GDPR (acesso, retificação, apagamento, oposição, portabilidade) e como contactar.",
    title: "Direitos do Titular (SGPD)",
    lead: "Guia simples para exercer os seus direitos e pedir cópia/alteração/eliminação de dados.",
    rightsTitle: "Direitos",
    rightsItems: [
      "Acesso aos dados pessoais",
      "Retificação",
      "Apagamento (quando aplicável)",
      "Limitação do tratamento",
      "Oposição",
      "Portabilidade (quando aplicável)",
      "Retirar consentimento (quando aplicável)",
    ],
    howTitle: "Como pedir",
    howIntro: "Envie um email para",
    howIntroSuffix: "indicando:",
    howItems: [
      "O direito que pretende exercer",
      "O email/telefone usados na reserva (para localizar os dados)",
      "Se possível, a referência do pagamento/reserva",
    ],
    emailCta: "Enviar pedido SGPD",
    emailSubject: "Pedido SGPD",
    linkPrivacy: "Política de Privacidade",
  },
};

const legalEn: LegalMessages = {
  back: "← Back to site",
  lastUpdated: "Last updated",
  processorsIntro: "Providers used to operate the website and process payments:",
  processors: {
    stripe: "Payments and fraud prevention",
    googleCalendar: "Operational booking and calendar management",
    vercel: "Website hosting and delivery (hosting/CDN)",
  },
  company: {
    operatingCountries: "Portugal and Spain",
    retentionBookings:
      "Retention: we follow Stripe’s standard timelines for payment data and related records. We keep only what is needed for operational booking management and applicable legal obligations.",
  },
  privacy: {
    metaTitle: "Privacy Policy | DiscoverLixboaTours",
    metaDescription:
      "How we process personal data, purposes, legal bases, retention and data-subject rights (GDPR).",
    title: "Privacy Policy",
    lead: "How we process personal data for bookings and customer support (GDPR).",
    rows: {
      controller: "Data controller",
      vat: "Tax ID (NIF)",
      address: "Address",
      email: "Privacy email",
      scope: "Scope",
    },
    dataTitle: "What data we collect",
    dataItems: [
      "Name, email and phone.",
      "Chosen tour, number of guests and preferred date.",
      "Customer notes (e.g. pickup, preferences, restrictions).",
      "Essential technical data (essential cookies and security logs).",
    ],
    purposesTitle: "Purposes and legal bases",
    purposesP1:
      "Booking management, customer communication and, where applicable, compliance with legal obligations.",
    purposesP2:
      "Legal bases may include contract performance (booking), pre-contractual steps, legal obligation and legitimate interest (security/fraud prevention).",
    processorsTitle: "Processors",
    retentionTitle: "Retention",
    rightsTitle: "Your rights",
    rightsP:
      "You may exercise rights of access, rectification, erasure, restriction, objection and portability (where applicable). For GDPR requests, contact us by email.",
    emailCta: "Send request by email",
    emailSubject: "GDPR request (Privacy)",
    linkCookies: "Cookie Policy",
    linkSgpd: "GDPR rights",
  },
  cookies: {
    metaTitle: "Cookie Policy | DiscoverLixboaTours",
    metaDescription:
      "Information about essential cookies, local storage and how to manage browser preferences.",
    title: "Cookie Policy",
    lead: "We only use essential cookies for operation and security.",
    whatTitle: "What are cookies?",
    whatP:
      "Cookies are small files stored on your device that help a website work correctly and, in some cases, improve the experience.",
    essentialTitle: "Essential cookies",
    essentialItems: [
      "Security and abuse prevention.",
      "Basic preferences (e.g. language) when applicable.",
      "Forms and navigation functionality.",
    ],
    manageTitle: "How to manage cookies",
    manageP1:
      "You can delete or block cookies in your browser settings. Note that blocking essential cookies may affect how the site works.",
    manageP2Prefix: "For questions, contact:",
    otherTitle: "Related documents",
    linkPrivacy: "Privacy Policy",
    linkTerms: "Terms & Conditions",
  },
  terms: {
    metaTitle: "Terms & Conditions | DiscoverLixboaTours",
    metaDescription:
      "Website terms of use, bookings, payments and general service rules.",
    title: "Terms & Conditions",
    lead: "General terms for website use and bookings.",
    idTitle: "Identification",
    idHtml: (legalName, vat, address) =>
      `This website is operated by <strong>${legalName}</strong>, tax ID <strong>${vat}</strong>, with registered address at <strong>${address}</strong>.`,
    bookingTitle: "Bookings and payments",
    bookingItems: [
      "Bookings may depend on availability.",
      "Payments are processed by an external provider (e.g. Stripe).",
      "Final details (schedule/pickup) are confirmed by contacting the customer.",
    ],
    cancelTitle: "Cancellations and changes",
    cancelP:
      "Conditions may vary by tour/service and will be confirmed at booking time. To change a booking, contact us as soon as possible.",
    liabilityTitle: "Limitation of liability",
    liabilityP:
      "We are not liable for delays caused by external factors (traffic, weather, venue closures, etc.). Whenever possible, we offer equivalent alternatives.",
    contactTitle: "Contact",
    contactPrefix: "For questions:",
    relatedTitle: "Related documents",
    linkPrivacy: "Privacy (GDPR)",
    linkCookies: "Cookies",
  },
  sgpd: {
    metaTitle: "GDPR Rights | DiscoverLixboaTours",
    metaDescription:
      "How to exercise GDPR rights (access, rectification, erasure, objection, portability) and how to contact us.",
    title: "Data Subject Rights (GDPR)",
    lead: "A simple guide to exercise your rights and request a copy/change/deletion of data.",
    rightsTitle: "Rights",
    rightsItems: [
      "Access to personal data",
      "Rectification",
      "Erasure (where applicable)",
      "Restriction of processing",
      "Objection",
      "Portability (where applicable)",
      "Withdraw consent (where applicable)",
    ],
    howTitle: "How to request",
    howIntro: "Send an email to",
    howIntroSuffix: "indicating:",
    howItems: [
      "The right you wish to exercise",
      "The email/phone used in the booking (to locate the data)",
      "If possible, the payment/booking reference",
    ],
    emailCta: "Send GDPR request",
    emailSubject: "GDPR request",
    linkPrivacy: "Privacy Policy",
  },
};

export function getLegalMessages(locale: Locale): LegalMessages {
  return locale === "en" ? legalEn : legalPt;
}
