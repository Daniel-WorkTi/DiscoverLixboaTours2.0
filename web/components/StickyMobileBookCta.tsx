"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useMessages } from "@/lib/i18n/LocaleProvider";
import { stripLocalePrefix, withLocalePrefix } from "@/lib/i18n/locale";

/**
 * CTA fixo no mobile (fora de /reservar e /admin).
 * Usa o locale da URL para não partir o fluxo EN.
 */
export function StickyMobileBookCta() {
  const pathname = usePathname() || "/";
  const locale = useLocale();
  const m = useMessages();
  const bare = stripLocalePrefix(pathname);
  if (bare.startsWith("/reservar") || bare.startsWith("/admin")) return null;

  const href = withLocalePrefix("/reservar", locale);

  return (
    <div className="sticky-mobile-book" role="complementary" aria-label="Reservar">
      <Link href={href} className="sticky-mobile-book__btn">
        <span>{m.nav.book}</span>
      </Link>
    </div>
  );
}
