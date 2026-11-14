"use client";

import Image from "next/image";
import Link from "next/link";
import { withLocalePrefix, type AppLocale } from "@/lib/i18n/locale";

export type HeroTickerItem = {
  href: string;
  img: string;
  name: string;
  places: string;
  priceFrom: string;
  priceUnitLabel: string;
};

type HeroServicesTickerProps = {
  items: HeroTickerItem[];
  locale: AppLocale;
  todayLabel: string;
};

export function HeroServicesTicker({
  items,
  locale,
  todayLabel,
}: HeroServicesTickerProps) {
  const loop = [...items, ...items];

  return (
    <div className="hero-ticker" aria-label="Tours em destaque">
      <ul className="hero-ticker-track">
        {loop.map((item, index) => (
          <li className="hero-ticker-item" key={`${item.href}-${index}`}>
            <Link
              href={withLocalePrefix(item.href, locale)}
              className="hero-ticker-card"
            >
              <div className="hero-ticker-image">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 132px, 208px"
                  className="hero-ticker-img"
                />
              </div>
              <div className="hero-ticker-content">
                <div className="hero-ticker-copy">
                  <p className="hero-ticker-title">{item.name}</p>
                  <p className="hero-ticker-desc">{item.places}</p>
                </div>
                <div className="hero-ticker-price">
                  <span className="hero-ticker-price-main">{item.priceFrom}</span>
                  <span className="hero-ticker-price-slash" aria-hidden>
                    /
                  </span>
                  <span className="hero-ticker-price-unit">
                    {item.priceUnitLabel}
                  </span>
                  <span className="hero-ticker-price-today">{todayLabel}</span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
