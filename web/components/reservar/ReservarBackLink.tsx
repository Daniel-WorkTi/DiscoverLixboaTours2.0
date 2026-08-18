"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeFromPathname, withLocalePrefix } from "@/lib/i18n/locale";

export function ReservarBackLink() {
  const locale = localeFromPathname(usePathname() || "/");
  return (
    <Link href={withLocalePrefix("/", locale)} className="reservar-back">
      <span data-translate="reservar_back">← Voltar ao site</span>
    </Link>
  );
}
