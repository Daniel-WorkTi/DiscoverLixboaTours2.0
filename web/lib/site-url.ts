/**
 * URL pública do site (success/cancel do Stripe Checkout).
 * Na Vercel, `VERCEL_URL` costuma estar definido; podes forçar com
 * `NEXT_PUBLIC_SITE_URL=https://teu-dominio.com` (Project → Settings → Environment Variables).
 */
export function getSiteBaseUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }

  const urlFromEnv = process.env.URL?.trim();
  if (urlFromEnv && /^https?:\/\//i.test(urlFromEnv)) {
    return urlFromEnv.replace(/\/$/, "");
  }

  const deployPrime = process.env.DEPLOY_PRIME_URL?.trim();
  if (deployPrime && /^https?:\/\//i.test(deployPrime)) {
    return deployPrime.replace(/\/$/, "");
  }

  return "http://localhost:3000";
}
