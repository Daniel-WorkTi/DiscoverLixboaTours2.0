"use client";

import Link from "next/link";
import { useLocale, useMessages } from "@/lib/i18n/LocaleProvider";
import { withLocalePrefix } from "@/lib/i18n/locale";

export function ReservarBackLink() {
  const locale = useLocale();
  const m = useMessages();
  return (
    <Link href={withLocalePrefix("/", locale)} className="reservar-back">
      <span>{m.booking.back}</span>
    </Link>
  );
}
