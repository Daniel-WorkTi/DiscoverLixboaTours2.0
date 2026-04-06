export type LegalCompanyInfo = {
  legalName: string;
  vatNumber: string;
  address: string;
  country: string;
  operatingCountries: string;
  publicSiteUrl: string;
  privacyEmail: string;
  phone?: string;
  retentionBookings: string;
};

/**
 * Preenche estes dados com a informação legal oficial da empresa.
 * As páginas SGPD usam este objeto como “fonte única”.
 */
export const COMPANY: LegalCompanyInfo = {
  legalName: "Miguel Moreira Carvalhão",
  vatNumber: "210539828",
  address: "Rua dos Ourives, nº 24, Linhó, 2710-333 Sintra",
  country: "Portugal",
  operatingCountries: "Portugal e Espanha",
  publicSiteUrl: "https://www.discoverlixboatours.com/",
  privacyEmail: "Discoverlixboatours@gmail.com",
  phone: "+351 934 483 853",
  retentionBookings:
    "Retenção: seguimos os prazos padrão definidos pela Stripe para dados de pagamento e registos associados. Mantemos apenas o necessário para gestão operacional de reservas e cumprimento de obrigações aplicáveis.",
};

export const DATA_PROCESSORS = [
  {
    name: "Stripe",
    purpose: "Pagamentos e prevenção de fraude",
  },
  {
    name: "Google Calendar",
    purpose: "Gestão operacional das reservas e agenda",
  },
  {
    name: "Vercel",
    purpose: "Alojamento e entrega do website (hosting/CDN)",
  },
] as const;

