"use client";

import { usePathname } from "next/navigation";
import { HomeInteractions } from "@/components/HomeInteractions";
import { SiteClientEffects } from "@/components/SiteClientEffects";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getSiteNavVariant } from "@/lib/site-nav";

type Props = {
  children: React.ReactNode;
};

/**
 * Cabeçalho + rodapé do site (HTML original) em todas as páginas públicas.
 * Variante de âncoras (# vs /#) derivada automaticamente da rota.
 */
export function SiteChrome({ children }: Props) {
  const pathname = usePathname();
  const variant = getSiteNavVariant(pathname);

  return (
    <>
      <SiteClientEffects />
      <HomeInteractions />
      <SiteHeader variant={variant} />
      {children}
      <SiteFooter variant={variant} />
    </>
  );
}
