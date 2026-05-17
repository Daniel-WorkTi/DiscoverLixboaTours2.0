export type SiteNavVariant = "home" | "site";

/** Na home usa âncoras `#secção`; noutras páginas usa `/#secção`. */
export function getSiteNavVariant(pathname: string): SiteNavVariant {
  return pathname === "/" ? "home" : "site";
}

export function getSiteNavBase(variant: SiteNavVariant): "" | "/" {
  return variant === "home" ? "" : "/";
}
