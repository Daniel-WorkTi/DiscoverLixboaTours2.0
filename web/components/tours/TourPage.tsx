import Image from "next/image";
import Link from "next/link";
import type { TourDefinition } from "@/content/tours/types";
import { getFromPriceCents } from "@/content/tours/types";
import { formatCurrencyCents } from "@/lib/i18n/format";
import type { Locale } from "@/lib/i18n/types";
import { withLocalePrefix } from "@/lib/i18n/locale";
import { getMessages } from "@/messages";
import { BRAND_NAME } from "@/lib/brand";
import { COMPANY } from "@/lib/legal";

type Props = {
  tour: TourDefinition;
  locale: Locale;
};

export function TourPage({ tour, locale }: Props) {
  const t = getMessages(locale);
  const c = tour.content[locale];
  const fromCents = getFromPriceCents(tour);
  const fromEuros = Math.round(fromCents / 100);
  const showPerson = tour.priceDisplay === "person";
  const priceNumber = showPerson
    ? Math.round(fromCents / Math.max(tour.minGuests, 1) / 100)
    : fromEuros;
  const priceUnit = showPerson
    ? locale === "en"
      ? "per person"
      : "por pessoa"
    : t.tour.perPrivateGroup;
  const priceHint = showPerson
    ? locale === "en"
      ? `From €${priceNumber} per person (group totals from €${fromEuros}).`
      : `A partir de €${priceNumber} por pessoa (totais de grupo a partir de €${fromEuros}).`
    : t.tour.groupFromHint(fromEuros);
  const bookHref = withLocalePrefix(`/reservar?tour=${tour.slug}`, locale);
  const homeHref = withLocalePrefix("/", locale);
  const destinationsHref = withLocalePrefix("/#servicos", locale);

  return (
    <div className="tour-page-root">
      <section className="destino-hero">
        <div className="destino-hero-image">
          <Image
            src={tour.heroImage}
            alt={c.title}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
          <div className="destino-hero-overlay" />
        </div>
        <div className="destino-hero-content">
          <div className="destino-hero-text">
            <nav className="destino-breadcrumb" aria-label="Breadcrumb">
              <Link href={homeHref}>{t.nav.home}</Link>
              <span>/</span>
              <Link href={destinationsHref}>{t.tour.breadcrumbDestinations}</Link>
              <span>/</span>
              <span>{c.title}</span>
            </nav>
            <h1 className="destino-hero-title">{c.title}</h1>
            <p className="destino-hero-subtitle">{c.subtitle}</p>
            <div className="destino-hero-info">
              <div className="info-item">
                <span>{t.tour.fullDayApprox(tour.durationHours)}</span>
              </div>
              <div className="info-item">
                <span>{t.tour.maxGuests(tour.maxGuests)}</span>
              </div>
              {c.stopsLabel ? (
                <div className="info-item">
                  <span>{c.stopsLabel}</span>
                </div>
              ) : null}
              {tour.privateTour ? (
                <div className="info-item">
                  <span>{t.tour.privateTour}</span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="tour-info-section">
        <div className="container">
          {/* Sobre + booking lado a lado; resto a largura total (sem coluna vazia no PC) */}
          <div className="tour-info-grid tour-info-grid--intro">
            <div className="tour-main-content">
              <div className="info-card">
                <h2 className="info-card-title">{t.tour.about}</h2>
                {c.aboutHtml.map((html, i) => (
                  <p
                    key={i}
                    className="info-card-text"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                ))}
              </div>
            </div>

            <aside className="tour-sidebar">
              <div className="booking-card">
                <div className="price-section">
                  <span className="price-label">{c.title}</span>
                  <div className="price-amount">
                    <span className="currency">€</span>
                    <span className="price">{priceNumber}</span>
                    <span className="price-unit">
                      {" "}
                      {priceUnit}
                    </span>
                  </div>
                  <p className="package-hint" style={{ marginTop: "0.75rem" }}>
                    {priceHint}
                  </p>
                </div>

                <div className="booking-features">
                  <div className="feature">
                    <CheckIcon />
                    <span>{t.tour.freeCancellation}</span>
                  </div>
                  <div className="feature">
                    <CheckIcon />
                    <span>{t.tour.instantConfirmation}</span>
                  </div>
                  <div className="feature">
                    <CheckIcon />
                    <span>{t.tour.securePayment}</span>
                  </div>
                </div>

                <Link href={bookHref} className="btn-reservar">
                  <span>{t.tour.checkAvailability}</span>
                </Link>

                <div className="info-box" style={{ marginTop: "1.25rem" }}>
                  <h3>{t.tour.needHelp}</h3>
                  <p>{t.tour.needHelpText}</p>
                  <a href={`tel:${COMPANY.phone ?? ""}`} className="contact-link">
                    {COMPANY.phone}
                  </a>
                </div>
              </div>
            </aside>
          </div>

          <div className="tour-main-content tour-main-content--full">
            <div className="info-card">
              <h2 className="info-card-title">{t.tour.itinerary}</h2>
              <p className="tour-note">{t.tour.itineraryNote}</p>
              <div className="itinerary-list">
                {c.itinerary.map((item) => (
                  <div className="itinerary-item" key={item.badge + item.title}>
                    <div className="itinerary-time">
                      <span className="time-badge">{item.badge}</span>
                    </div>
                    <div className="itinerary-content">
                      <h3>{item.title}</h3>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: item.descriptionHtml,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="info-card">
              <h2 className="info-card-title">{t.tour.included}</h2>
              <div className="included-grid">
                {c.included.map((line) => (
                  <div className="included-item included" key={line}>
                    <CheckIcon />
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="info-card">
              <h2 className="info-card-title">{t.tour.notIncluded}</h2>
              <div className="included-grid">
                {c.notIncluded.map((line) => (
                  <div className="included-item not-included" key={line}>
                    <XIcon />
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </div>

            {c.whyChooseHtml ? (
              <div className="info-card info-card-highlight">
                <h2 className="info-card-title">{t.tour.whyChoose}</h2>
                <p
                  className="info-card-text"
                  dangerouslySetInnerHTML={{ __html: c.whyChooseHtml }}
                />
              </div>
            ) : null}

            {c.pickupItems?.length ? (
              <div className="info-card">
                <h2 className="info-card-title">{t.tour.pickup}</h2>
                {c.pickupHeading ? (
                  <h3 className="pickup-heading">{c.pickupHeading}</h3>
                ) : null}
                <ul className="pickup-list">
                  {c.pickupItems.map((p) => (
                    <li
                      key={p.title}
                      className={
                        p.highlight
                          ? "pickup-item pickup-item--highlight"
                          : "pickup-item"
                      }
                    >
                      <div>
                        <strong className="pickup-title">{p.title}</strong>
                        <div className="pickup-label">{p.detail}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {(tour.videoYoutubeId || tour.gallery.length > 0) && (
              <div className="info-card">
                {tour.videoYoutubeId ? (
                  <>
                    <h2 className="info-card-title">{t.tour.video}</h2>
                    <div className="tour-video-embed">
                      <div className="tour-video-embed-inner">
                        <iframe
                          src={`https://www.youtube.com/embed/${tour.videoYoutubeId}?controls=0&modestbranding=1&rel=0&iv_load_policy=3&playsinline=1&color=white`}
                          title={`${c.title} — video`}
                          loading="lazy"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          referrerPolicy="strict-origin-when-cross-origin"
                        />
                      </div>
                    </div>
                  </>
                ) : null}
                {tour.gallery.length > 0 ? (
                  <>
                    <h3 className="tour-aveiro-gallery-heading">
                      {t.tour.gallery}
                    </h3>
                    <div className="tour-gallery tour-gallery--below-video">
                      {tour.gallery.map((g) => (
                        <div className="gallery-item" key={g.src}>
                          <Image
                            src={g.src}
                            alt={g.alt[locale]}
                            fill
                            sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                            className="tour-gallery__img"
                          />
                        </div>
                      ))}
                    </div>
                  </>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </section>

      <p className="sr-only">
        {BRAND_NAME} — {formatCurrencyCents(fromCents, locale)}{" "}
        {t.tour.perPrivateGroup}
      </p>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
