"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeFromPathname, stripLocalePrefix, withLocalePrefix } from "@/lib/i18n/locale";

/**
 * CTA fixo no mobile (fora de /reservar e /admin).
 * Usa o locale da URL para não partir o fluxo EN.
 */
export function StickyMobileBookCta() {
  const pathname = usePathname() || "/";
  const bare = stripLocalePrefix(pathname);
  if (bare.startsWith("/reservar") || bare.startsWith("/admin")) return null;

  const locale = localeFromPathname(pathname);
  const href = withLocalePrefix("/reservar", locale);

  return (
    <div className="sticky-mobile-book" role="complementary" aria-label="Reservar">
      <Link href={href} className="sticky-mobile-book__btn">
        <span data-translate="book_now">Reservar Agora</span>
      </Link>
    </div>
  );
}
