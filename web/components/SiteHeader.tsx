import Image from "next/image";
import Link from "next/link";

type SiteHeaderProps = {
  /** Na home usa âncoras `#secção`; noutras páginas usa `/#secção` para ir ao início. */
  variant?: "home" | "site";
};

export function SiteHeader({ variant = "home" }: SiteHeaderProps) {
  const base = variant === "home" ? "" : "/";

  return (
    <header className="main-header" aria-label="Cabeçalho principal">
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
          <a href={`${base}#home`} data-translate="menu_home">
            Início
          </a>
          <a href={`${base}#sobre`} data-translate="menu_about">
            Sobre
          </a>
          <a href={`${base}#servicos`} data-translate="menu_services">
            Serviços
          </a>
          <Link href="/executive">
            <span data-translate="menu_executive">Executive</span>
          </Link>
          <a href={`${base}#instagram`} data-translate="menu_contact">
            Contato
          </a>
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
          >
            <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
            <line x1="8" y1="2" x2="8" y2="18" />
            <line x1="16" y1="6" x2="16" y2="22" />
          </svg>
        </Link>
        <div className="language-selector">
          <div
            className="language-flag flag-pt"
            data-lang="pt"
            title="Português"
          />
          <div
            className="language-flag flag-en"
            data-lang="en"
            title="English"
          />
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
        <a href={`${base}#home`} data-translate="menu_home">
          Início
        </a>
        <a href={`${base}#sobre`} data-translate="menu_about">
          Sobre
        </a>
        <a href={`${base}#servicos`} data-translate="menu_services">
          Serviços
        </a>
        <Link href="/executive">
          <span data-translate="menu_executive">Executive</span>
        </Link>
        <a href={`${base}#instagram`} data-translate="menu_contact">
          Contato
        </a>
        <div className="language-selector-mobile">
          <div
            className="language-flag flag-pt"
            data-lang="pt"
            title="Português"
          />
          <div
            className="language-flag flag-en"
            data-lang="en"
            title="English"
          />
        </div>
        <Link href="/reservar" className="mobile-cta">
          <span data-translate="book_now">Reservar Agora</span>
        </Link>
      </nav>
    </header>
  );
}
