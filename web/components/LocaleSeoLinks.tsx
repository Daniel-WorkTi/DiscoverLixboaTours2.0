import { BRAND_SITE_URL } from "@/lib/brand";
import { stripLocalePrefix, localeFromPathname } from "@/lib/i18n/locale";

function origin(): string {
  return BRAND_SITE_URL.replace(/\/$/, "");
}

function absolute(path: string): string {
  if (path === "/") return `${origin()}/`;
  return `${origin()}${path}`;
}

type Props = {
  /** Pathname do browser (pode incluir /en ou /es). */
  pathname: string;
};

/**
 * hreflang + canonical para a página atual.
 * PT = path sem prefixo; EN = /en; ES = /es; x-default = EN.
 */
export function LocaleSeoLinks({ pathname }: Props) {
  const bare = stripLocalePrefix(pathname) || "/";
  const ptHref = absolute(bare);
  const enHref = absolute(bare === "/" ? "/en" : `/en${bare}`);
  const esHref = absolute(bare === "/" ? "/es" : `/es${bare}`);
  const locale = localeFromPathname(pathname);
  const canonical =
    locale === "en" ? enHref : locale === "es" ? esHref : ptHref;

  return (
    <>
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="pt-PT" href={ptHref} />
      <link rel="alternate" hrefLang="en" href={enHref} />
      <link rel="alternate" hrefLang="es" href={esHref} />
      <link rel="alternate" hrefLang="x-default" href={enHref} />
    </>
  );
}
