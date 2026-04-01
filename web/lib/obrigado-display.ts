/**
 * Dados de apresentação da página /reservar/obrigado (testável sem React).
 */

export type SecurityBadge = {
  id: string;
  label: string;
  sub: string;
};

/** Badges de confiança (Stripe + HTTPS) — textos estáveis para testes e i18n futuro. */
export const OBRIGADO_SECURITY_BADGES: readonly SecurityBadge[] = [
  {
    id: "stripe",
    label: "Stripe",
    sub: "Pagamento seguro (PCI DSS)",
  },
  {
    id: "https",
    label: "HTTPS",
    sub: "Ligação encriptada",
  },
  {
    id: "checkout",
    label: "Checkout",
    sub: "Dados do cartão na Stripe",
  },
] as const;

/**
 * Referências de sessão Stripe são longas; mostrar truncada no “bilhete”.
 */
export function formatCheckoutSessionRefForDisplay(
  id: string | undefined | null,
): string {
  if (id == null) return "";
  const s = String(id).trim();
  if (s.length === 0) return "";
  if (s.length <= 40) return s;
  return `${s.slice(0, 20)}…${s.slice(-14)}`;
}
