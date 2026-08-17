import { BRAND_EMAIL, BRAND_SITE_URL } from "@/lib/brand";

export type LegalCompanyInfo = {
  legalName: string;
  vatNumber: string;
  address: string;
  country: string;
  operatingCountries: string;
  publicSiteUrl: string;
  /** Email que recebe avisos de novas reservas pagas (Resend). */
  bookingNotifyEmail: string;
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
  publicSiteUrl: BRAND_SITE_URL,
  bookingNotifyEmail: BRAND_EMAIL,
  privacyEmail: BRAND_EMAIL,
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

