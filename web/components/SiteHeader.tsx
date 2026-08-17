import Image from "next/image";
import Link from "next/link";
import { getSiteNavBase, type SiteNavVariant } from "@/lib/site-nav";

type SiteHeaderProps = {
  /** Omitir para derivar na rota via SiteChrome; útil em testes. */
  variant?: SiteNavVariant;
};

const NAV_ITEMS = [
  { key: "menu_home", label: "Início", hash: "home" },
  { key: "menu_about", label: "Sobre", hash: "sobre" },
  { key: "menu_services", label: "Serviços", hash: "servicos" },
  { key: "menu_executive", label: "Executive", href: "/executive" },
  { key: "menu_contact", label: "Contacto", hash: "instagram" },
] as const;

function navHref(base: "" | "/", hash: string): string {
  return `${base}#${hash}`;
}

export function SiteHeader({ variant = "home" }: SiteHeaderProps) {
  const base = getSiteNavBase(variant);

  return (
    <header className="main-header" aria-label="Cabeçalho do site">
      <div className="header-content">
        <div className="header-logo">
          <Link href="/">
            <Image
              src="/assets/images/hero/logo.png.webp"
              alt="Discover Portugal Logo"
              width={200}
              height={80}
              className="logo-image"
              priority
            />
          </Link>
        </div>

        <nav className="header-nav" aria-label="Navegação principal">
          {NAV_ITEMS.map((item) =>
            "href" in item ? (
              <a key={item.key} href={item.href} data-translate={item.key}>
                {item.label}
              </a>
            ) : (
              <a
                key={item.key}
                href={navHref(base, item.hash)}
                data-translate={item.key}
              >
                {item.label}
              </a>
            ),
          )}
        </nav>

        <Link href="/reservar" className="header-cta">
          <span data-translate="book_now">Reservar Agora</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
            <line x1="8" y1="2" x2="8" y2="18" />
            <line x1="16" y1="6" x2="16" y2="22" />
          </svg>
        </Link>

        <div className="language-selector">
          <div className="language-flag flag-pt" data-lang="pt" title="Português" />
          <div className="language-flag flag-en" data-lang="en" title="English" />
        </div>

        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label="Abrir menu móvel"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav className="mobile-menu" aria-label="Navegação móvel">
        {NAV_ITEMS.map((item) =>
          "href" in item ? (
            <a key={item.key} href={item.href} data-translate={item.key}>
              {item.label}
            </a>
          ) : (
            <a key={item.key} href={navHref(base, item.hash)} data-translate={item.key}>
              {item.label}
            </a>
          ),
        )}
        <div className="language-selector-mobile">
          <div className="language-flag flag-pt" data-lang="pt" title="Português" />
          <div className="language-flag flag-en" data-lang="en" title="English" />
        </div>
        <Link href="/reservar" className="mobile-cta">
          <span data-translate="book_now">Reservar Agora</span>
        </Link>
      </nav>
    </header>
  );
}
