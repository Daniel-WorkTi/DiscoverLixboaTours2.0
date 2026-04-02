/**
 * Presentation data for /reservar/obrigado (testable without React).
 */

export type SecurityBadge = {
  id: string;
  label: string;
  sub: string;
};

/** Trust badges (Stripe + HTTPS) — stable copy for tests and future i18n. */
export const OBRIGADO_SECURITY_BADGES: readonly SecurityBadge[] = [
  {
    id: "stripe",
    label: "Stripe",
    sub: "Secure payment (PCI DSS)",
  },
  {
    id: "https",
    label: "HTTPS",
    sub: "Encrypted connection",
  },
  {
    id: "checkout",
    label: "Checkout",
    sub: "Card details handled by Stripe",
  },
] as const;

/**
 * Stripe session references are long; show a truncated form on the “ticket”.
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
