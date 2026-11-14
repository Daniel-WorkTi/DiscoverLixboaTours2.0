import { Suspense } from "react";
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

function LanguageSwitcherFallback({ locale }: { locale: AppLocale }) {
  return (
    <div className="language-selector" aria-hidden>
      <button type="button" className="language-selector__trigger" disabled>
        <span>{locale === "en" ? "EN" : "PT"}</span>
      </button>
    </div>
  );
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
    { key: "services", label: m.nav.services, hash: "servicos" as const },
    { key: "executive", label: m.nav.executive, href: executiveHref },
  ] as const;

  return (
    <header className="main-header" aria-label={locale === "en" ? "Site header" : "Cabeçalho do site"}>
      <div className="header-content">
        <div className="header-logo">
          <Link href={withLocalePrefix("/", locale)} className="header-logo-link">
            {/* SVG direto — sem Next/Image para não comprimir */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/images/newlogosvg.svg"
              alt=""
              width={52}
              height={52}
              className="logo-mark"
            />
            <span className="logo-wordmark">DiscoverLixboaTours</span>
          </Link>
        </div>

        <nav
          className="header-nav"
          aria-label={locale === "en" ? "Main navigation" : "Navegação principal"}
        >
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

        <div className="header-actions">
          <Suspense fallback={<LanguageSwitcherFallback locale={locale} />}>
            <LanguageSwitcher />
          </Suspense>
          <Link href={bookHref} className="header-cta">
            <span>{m.nav.book}</span>
          </Link>
        </div>

        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label={locale === "en" ? "Open mobile menu" : "Abrir menu móvel"}
        >
          <span />
          <span />
        </button>
      </div>

      <div className="header-border" aria-hidden />

      <nav
        className="mobile-menu"
        aria-label={locale === "en" ? "Mobile navigation" : "Navegação móvel"}
      >
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
          <Suspense fallback={<LanguageSwitcherFallback locale={locale} />}>
            <LanguageSwitcher />
          </Suspense>
        </div>
        <Link href={bookHref} className="mobile-cta">
          <span>{m.nav.book}</span>
        </Link>
      </nav>
    </header>
  );
}
