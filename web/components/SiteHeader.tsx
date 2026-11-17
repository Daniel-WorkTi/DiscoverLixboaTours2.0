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

function navHref(base: "" | "/" | "/en" | "/es", hash: string): string {
  return `${base}#${hash}`;
}

function languageShort(locale: AppLocale): string {
  if (locale === "en") return "EN";
  if (locale === "es") return "ES";
  return "PT";
}

function headerAria(locale: AppLocale): string {
  if (locale === "en") return "Site header";
  if (locale === "es") return "Cabecera del sitio";
  return "Cabeçalho do site";
}

function mainNavAria(locale: AppLocale): string {
  if (locale === "en") return "Main navigation";
  if (locale === "es") return "Navegación principal";
  return "Navegação principal";
}

function mobileToggleAria(locale: AppLocale): string {
  if (locale === "en") return "Open mobile menu";
  if (locale === "es") return "Abrir menú móvil";
  return "Abrir menu móvel";
}

function mobileNavAria(locale: AppLocale): string {
  if (locale === "en") return "Mobile navigation";
  if (locale === "es") return "Navegación móvil";
  return "Navegação móvel";
}

function LanguageSwitcherFallback({ locale }: { locale: AppLocale }) {
  return (
    <div className="language-selector" aria-hidden>
      <button type="button" className="language-selector__trigger" disabled>
        <span>{languageShort(locale)}</span>
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
    <header className="main-header" aria-label={headerAria(locale)}>
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
          aria-label={mainNavAria(locale)}
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
          aria-label={mobileToggleAria(locale)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className="header-border" aria-hidden />

      <nav
        className="mobile-menu"
        aria-label={mobileNavAria(locale)}
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
