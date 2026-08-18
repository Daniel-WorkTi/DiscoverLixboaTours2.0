"use client";

import { usePathname } from "next/navigation";
import { LocaleSeoLinks } from "@/components/LocaleSeoLinks";

/** Injeta canonical/hreflang com base no pathname do browser (inclui /en). */
export function LocaleSeo() {
  const pathname = usePathname() || "/";
  return <LocaleSeoLinks pathname={pathname} />;
}
