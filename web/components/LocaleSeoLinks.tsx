import { BRAND_SITE_URL } from "@/lib/brand";
import { stripLocalePrefix } from "@/lib/i18n/locale";

function origin(): string {
  return BRAND_SITE_URL.replace(/\/$/, "");
}

function absolute(path: string): string {
  if (path === "/") return `${origin()}/`;
  return `${origin()}${path}`;
}

type Props = {
  /** Pathname do browser (pode incluir /en). */
  pathname: string;
};

/**
 * hreflang + canonical para a página atual.
 * PT = path sem prefixo; EN = /en + path; x-default = EN (público internacional).
 */
export function LocaleSeoLinks({ pathname }: Props) {
  const bare = stripLocalePrefix(pathname) || "/";
  const ptHref = absolute(bare);
  const enHref = absolute(bare === "/" ? "/en" : `/en${bare}`);
  const isEn = pathname === "/en" || pathname.startsWith("/en/");
  const canonical = isEn ? enHref : ptHref;

  return (
    <>
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="pt-PT" href={ptHref} />
      <link rel="alternate" hrefLang="en" href={enHref} />
      <link rel="alternate" hrefLang="x-default" href={enHref} />
    </>
  );
}
