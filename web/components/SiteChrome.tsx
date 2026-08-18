"use client";

import { usePathname } from "next/navigation";
import { HomeInteractions } from "@/components/HomeInteractions";
import { LocaleSeo } from "@/components/LocaleSeo";
import { SiteClientEffects } from "@/components/SiteClientEffects";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { StickyMobileBookCta } from "@/components/StickyMobileBookCta";
import { localeFromPathname } from "@/lib/i18n/locale";
import { getSiteNavVariant } from "@/lib/site-nav";

type Props = {
  children: React.ReactNode;
};

/**
 * Cabeçalho + rodapé do site (HTML original) em todas as páginas públicas.
 * Variante de âncoras (# vs /#) derivada automaticamente da rota.
 */
export function SiteChrome({ children }: Props) {
  const pathname = usePathname() || "/";
  const variant = getSiteNavVariant(pathname);
  const locale = localeFromPathname(pathname);

  return (
    <>
      <LocaleSeo />
      <SiteClientEffects />
      <HomeInteractions />
      <SiteHeader variant={variant} locale={locale} />
      {children}
      <SiteFooter variant={variant} locale={locale} />
      <StickyMobileBookCta />
    </>
  );
}
