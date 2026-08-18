import Image from "next/image";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { withLocalePrefix, type AppLocale } from "@/lib/i18n/locale";
import { getMessages } from "@/messages";
import { getSiteNavBase, type SiteNavVariant } from "@/lib/site-nav";

type SiteHeaderProps = {
  variant?: SiteNavVariant;
  locale?: AppLocale;
};

function navHref(base: "" | "/" | "/en", hash: string): string {
  return `${base}#${hash}`;
}

export function SiteHeader({
  variant = "home",
  locale = "pt",
}: SiteHeaderProps) {
  const base = getSiteNavBase(variant, locale);
  const m = getMessages(locale);
  const bookHref = withLocalePrefix("/reservar", locale);
  const executiveHref = withLocalePrefix("/executive", locale);

  const navItems = [
    { key: "home", label: m.nav.home, hash: "home" as const },
    { key: "about", label: m.nav.about, hash: "sobre" as const },
    { key: "services", label: m.nav.services, hash: "servicos" as const },
    { key: "executive", label: m.nav.executive, href: executiveHref },
    { key: "contact", label: m.nav.contact, hash: "instagram" as const },
  ] as const;

  return (
    <header className="main-header" aria-label="Cabeçalho do site">
      <div className="header-content">
        <div className="header-logo">
          <Link href={withLocalePrefix("/", locale)}>
            <Image
              src="/assets/images/hero/logo.png.webp"
              alt="DiscoverLixboaTours Logo"
              width={200}
              height={80}
              className="logo-image"
              priority
            />
          </Link>
        </div>

        <nav className="header-nav" aria-label="Navegação principal">
          {navItems.map((item) =>
            "href" in item ? (
              <a key={item.key} href={item.href}>
                {item.label}
              </a>
            ) : (
              <a key={item.key} href={navHref(base, item.hash)}>
                {item.label}
              </a>
            ),
          )}
        </nav>

        <Link href={bookHref} className="header-cta">
          <span>{m.nav.book}</span>
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

        <LanguageSwitcher />

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
        {navItems.map((item) =>
          "href" in item ? (
            <a key={item.key} href={item.href}>
              {item.label}
            </a>
          ) : (
            <a key={item.key} href={navHref(base, item.hash)}>
              {item.label}
            </a>
          ),
        )}
        <div className="language-selector-mobile">
          <LanguageSwitcher />
        </div>
        <Link href={bookHref} className="mobile-cta">
          <span>{m.nav.book}</span>
        </Link>
      </nav>
    </header>
  );
}
