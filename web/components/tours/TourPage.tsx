import Image from "next/image";
import Link from "next/link";
import type { TourDefinition } from "@/content/tours/types";
import { getCardFromPrice, getFromPriceCents } from "@/content/tours/types";
import { formatCurrencyCents } from "@/lib/i18n/format";
import type { Locale } from "@/lib/i18n/types";
import { withLocalePrefix } from "@/lib/i18n/locale";
import { getMessages } from "@/messages";
import { BRAND_NAME } from "@/lib/brand";
import {
  FEATURED_REVIEWS,
  GOOGLE_BUSINESS_RATING,
  GOOGLE_REVIEWS_URL,
  getTourRating,
} from "@/lib/tour-ratings";
import { TourStopsCarousel } from "@/components/tours/TourStopsCarousel";
import { TourHighlightVideo } from "@/components/tours/TourHighlightVideo";
import { TourExpPhotos } from "@/components/tours/TourExpPhotos";

type Props = {
  tour: TourDefinition;
  locale: Locale;
};

/** Evita double-encoding (%2C → %252C) e thumbs 3840px que disparam 429 no Wikimedia. */
function normalizeTourImageUrl(src: string) {
  if (!src.startsWith("http")) return src;
  try {
    const url = new URL(src);
    url.pathname = decodeURIComponent(url.pathname).replace(
      /\/\d{3,4}px-/g,
      "/1280px-",
    );
    return url.href;
  } catch {
    return src;
  }
}

export function TourPage({ tour, locale }: Props) {
  const t = getMessages(locale);
  const c = tour.content[locale];
  const fromCents = getFromPriceCents(tour);
  const cardPrice = getCardFromPrice(tour);
  const priceNumber = Math.round(cardPrice.cents / 100);
  const showPerson = cardPrice.unit === "person";
  const bookHref = withLocalePrefix(`/reservar?tour=${tour.slug}`, locale);
  const homeHref = withLocalePrefix("/", locale);
  const destinationsHref = withLocalePrefix("/#servicos", locale);
  const rating = getTourRating(tour.slug);
  const guestRange =
    tour.minGuests === tour.maxGuests
      ? String(tour.maxGuests)
      : `${tour.minGuests}–${tour.maxGuests}`;

  const uniqueImageKey = (src: string) =>
    src
      .split("?")[0]
      .replace(/-(800|1400)\.(webp|jpe?g|png)$/i, ".$2")
      .toLowerCase();

  const pickUniqueImages = (candidates: readonly string[], count: number) => {
    const seen = new Set<string>();
    const out: string[] = [];
    for (const src of candidates) {
      if (!src) continue;
      const key = uniqueImageKey(src);
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(src);
      if (out.length >= count) break;
    }
    return out;
  };

  const normalizedStopImages = (tour.stopImages ?? []).map(normalizeTourImageUrl);

  // stopImages normalizados + unoptimized no mosaic (evita 429 do /_next/image).
  const experiencePhotos = pickUniqueImages(
    [...normalizedStopImages, ...tour.gallery.map((g) => g.src), tour.heroImage],
    9,
  );

  const itineraryImages = (() => {
    const used = new Set<string>();
    const pool = [
      ...normalizedStopImages,
      ...tour.gallery.map((g) => g.src),
      tour.heroImage,
    ];
    return c.itinerary.map((_, index) => {
      const preferred = normalizedStopImages[index];
      if (preferred) {
        const key = uniqueImageKey(preferred);
        if (!used.has(key)) {
          used.add(key);
          return preferred;
        }
      }
      for (const src of pool) {
        if (!src) continue;
        const key = uniqueImageKey(src);
        if (used.has(key)) continue;
        used.add(key);
        return src;
      }
      return tour.heroImage;
    });
  })();

  const experienceParas = (() => {
    const custom = c.experienceText?.trim();
    if (custom) {
      return custom
        .split(/\n\n+/)
        .map((part) => part.trim())
        .filter(Boolean);
    }
    // Fallback: só os 2 primeiros blocos do about (nunca o texto inteiro).
    if (c.aboutHtml.length) return c.aboutHtml.slice(0, 2);
    return c.subtitle ? [c.subtitle] : [];
  })();

  const itineraryLead =
    c.itineraryLead?.trim() ||
    c.stopsLabel?.trim() ||
    t.tour.itineraryLeadDefault;

  const itineraryNote =
    c.itineraryNote?.trim() || t.tour.itineraryNoteDefault;

  const bookMeta = showPerson
    ? t.tour.bookMetaPerson(guestRange)
    : t.tour.bookMetaGroup(guestRange);

  const pickupTitle = c.pickupHeading ?? t.tour.pickupTitle;

  const mapsUrl = tour.stopMapsUrls?.find((u) => Boolean(u?.trim()));
  const highlightHref = mapsUrl || "#itinerario";
  const highlightIsExternal = Boolean(mapsUrl);
  const photoAlts = experiencePhotos.map((src, i) => {
    const stopTitle = c.itinerary[i]?.title;
    if (stopTitle) return stopTitle;
    const galleryAlt = tour.gallery.find((g) => g.src === src)?.alt[locale];
    return galleryAlt || c.title;
  });

  return (
    <div className="tour-page-root">
      <section className="destino-hero">
        <div className="destino-hero-image">
          <Image
            src={tour.heroImage}
            alt={c.title}
            fill
            priority
            quality={92}
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
            <div className="destino-hero-actions">
              <Link href={bookHref} className="destino-hero-cta">
                {t.tour.checkAvailability} <span aria-hidden>→</span>
              </Link>
              <a href="#experiencia" className="destino-hero-cta destino-hero-cta--ghost">
                {t.tour.experienceLink}
              </a>
            </div>
          </div>
        </div>

        <div
          className="destino-hero-highlights"
          aria-label={t.tour.highlightsLabel}
        >
          <div className="destino-hero-highlight">
            <span className="destino-hero-highlight__icon" aria-hidden>
              <ClockIcon />
            </span>
            <span className="destino-hero-highlight__copy">
              <strong>
                {tour.durationHours} {t.tour.hoursUnit}
              </strong>
              <span>{t.tour.hoursSub}</span>
            </span>
          </div>
          <div className="destino-hero-highlight">
            <span className="destino-hero-highlight__icon" aria-hidden>
              <UsersIcon />
            </span>
            <span className="destino-hero-highlight__copy">
              <strong>
                {tour.maxGuests} {t.tour.guestsUnit}
              </strong>
              <span>{t.tour.guestsSub}</span>
            </span>
          </div>
          <div className="destino-hero-highlight">
            <span className="destino-hero-highlight__icon" aria-hidden>
              <MapPinIcon />
            </span>
            <span className="destino-hero-highlight__copy">
              <strong>
                {c.itinerary.length} {t.tour.stopsUnit}
              </strong>
              <span>{t.tour.stopsSub}</span>
            </span>
          </div>
          {tour.privateTour ? (
            <div className="destino-hero-highlight">
              <span className="destino-hero-highlight__icon" aria-hidden>
                <LockIcon />
              </span>
              <span className="destino-hero-highlight__copy">
                <strong>{t.tour.privateUnit}</strong>
                <span>{t.tour.privateSub}</span>
              </span>
            </div>
          ) : null}
        </div>
      </section>

      <div className="tour-editorial">
        <section className="tour-book-section" id="reservar">
          <div className="tour-editorial__inner">
            <div className="tour-book-bar">
              <div className="tour-book-bar__price">
                <span className="tour-book-bar__label">{t.tour.bookLabel}</span>
                <span className="tour-book-bar__from">{t.tour.fromLabel}</span>
                <strong>€{priceNumber}</strong>
                <span className="tour-book-bar__meta">{bookMeta}</span>
              </div>
              <ul className="tour-book-bar__perks">
                <li>
                  <CalendarIcon />
                  <span>{t.tour.freeCancellation}</span>
                </li>
                <li>
                  <BoltIcon />
                  <span>{t.tour.instantConfirmation}</span>
                </li>
                <li>
                  <LockIcon />
                  <span>{t.tour.securePayment}</span>
                </li>
              </ul>
              <Link href={bookHref} className="tour-book-bar__cta">
                {t.tour.checkAvailability} <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="tour-exp" id="experiencia">
          <div className="tour-editorial__inner tour-exp__grid">
            <div className="tour-exp__copy">
              {tour.privateTour ? (
                <span className="tour-eyebrow tour-exp__eyebrow">{t.tour.privateTour}</span>
              ) : null}
              <h2>{t.tour.experienceTitle}</h2>
              {experienceParas.length ? (
                <div className="tour-exp__about">
                  {experienceParas.map((html, index) => (
                    <p
                      key={`exp-${index}-${html.slice(0, 32)}`}
                      dangerouslySetInnerHTML={{ __html: html }}
                    />
                  ))}
                </div>
              ) : null}
              <a href="#itinerario" className="tour-text-link">
                {t.tour.experienceLink} <span aria-hidden>→</span>
              </a>
            </div>
            <TourExpPhotos
              photos={experiencePhotos}
              alts={photoAlts}
              regionLabel={t.tour.experienceTitle}
            />
          </div>
        </section>

        <section className="tour-itinerary-section" id="itinerario">
          <div className="tour-editorial__inner">
            <div className="tour-section-head">
              <div>
                <h2>{t.tour.itineraryTitle}</h2>
                <p className="tour-section-lead">{itineraryLead}</p>
              </div>
              <a href="#itinerario-detalhe" className="tour-text-link">
                {t.tour.itineraryLink} <span aria-hidden>→</span>
              </a>
            </div>

            <TourStopsCarousel
              regionLabel={t.tour.itineraryTitle}
              prevLabel={t.tour.prevStops}
              nextLabel={t.tour.nextStops}
              stops={c.itinerary.map((item, index) => ({
                title: item.title,
                image: itineraryImages[index] ?? tour.heroImage,
              }))}
            />

            <details className="tour-itinerary-details" id="itinerario-detalhe">
              <summary>{t.tour.itineraryLink}</summary>
              <p className="tour-itinerary-note">{itineraryNote}</p>
              <ol className="tour-itinerary-detail-list">
                {c.itinerary.map((item, index) => (
                  <li key={`detail-${item.badge}-${item.title}`}>
                    <span className="tour-itinerary-detail-list__num">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3>{item.title}</h3>
                      <p dangerouslySetInnerHTML={{ __html: item.descriptionHtml }} />
                    </div>
                  </li>
                ))}
              </ol>
            </details>
          </div>
        </section>

        <section className="tour-include-section" id="incluido">
          <div className="tour-editorial__inner">
            <div className="tour-include-panel">
              <div className="tour-include-col">
                <div className="tour-include-col__head">
                  <CheckIcon />
                  <h2>{t.tour.included}</h2>
                </div>
                <ul className="tour-include-list tour-include-list--yes">
                  {c.included.map((line) => (
                    <li key={line}>
                      <CheckIcon />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="tour-include-col">
                <div className="tour-include-col__head">
                  <XIcon />
                  <h2>{t.tour.notIncluded}</h2>
                </div>
                <ul className="tour-include-list tour-include-list--no">
                  {c.notIncluded.map((line) => (
                    <li key={line}>
                      <XIcon />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="tour-trust-section" id="avaliacoes" aria-label={t.tour.trustLabel}>
          <div className="tour-editorial__inner tour-trust">
            <div className="tour-trust__header">
              <div className="tour-trust__score">
                <strong>{GOOGLE_BUSINESS_RATING.score}</strong>
                <div
                  className="tour-trust__stars"
                  aria-label={t.tour.starsOf(
                    GOOGLE_BUSINESS_RATING.score,
                    GOOGLE_BUSINESS_RATING.scoreOutOf,
                  )}
                >
                  {Array.from({ length: 5 }, (_, i) => (
                    <StarIcon
                      key={i}
                      filled={i < Math.round(Number(GOOGLE_BUSINESS_RATING.score))}
                    />
                  ))}
                </div>
                <span>{t.tour.trustLabel}</span>
              </div>
              <div className="tour-trust__header-meta">
                <p className="tour-trust__meta">{t.tour.trustReviews(rating.reviews)}</p>
                <span className="tour-trust__source">{t.tour.trustSource}</span>
                <a
                  href={GOOGLE_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tour-trust__google-btn"
                >
                  <GoogleIcon />
                  <span>{t.tour.trustCta}</span>
                  <span aria-hidden>→</span>
                </a>
              </div>
            </div>

            <div className="tour-trust__reviews">
              {FEATURED_REVIEWS.map((review) => (
                <article key={review.author} className="tour-trust-card">
                  <div
                    className="tour-trust-card__stars"
                    aria-label={t.tour.starsOf(String(review.stars), 5)}
                  >
                    {Array.from({ length: 5 }, (_, i) => (
                      <StarIcon key={i} filled={i < review.stars} />
                    ))}
                  </div>
                  <p className="tour-trust-card__text">{review.text[locale]}</p>
                  <footer className="tour-trust-card__author">
                    <strong>{review.author}</strong>
                    <span>Google</span>
                  </footer>
                </article>
              ))}
            </div>

            {c.whyChooseHtml ? (
              <div className="tour-trust__why">
                <h2>{t.tour.whyChoose}</h2>
                <p dangerouslySetInnerHTML={{ __html: c.whyChooseHtml }} />
              </div>
            ) : null}
          </div>
        </section>

        <section className="tour-highlight-section" id="destaque">
          <div className="tour-editorial__inner tour-highlight__grid">
            <div className="tour-highlight__media">
              {tour.videoYoutubeId ? (
                <TourHighlightVideo
                  videoId={tour.videoYoutubeId}
                  label={t.tour.video}
                  coverStartSeconds={5}
                />
              ) : (
                <div className="tour-highlight__video">
                  <Image
                    src={tour.gallery[3]?.src ?? tour.heroImage}
                    alt={tour.gallery[3]?.alt[locale] ?? c.highlightTitle}
                    fill
                    sizes="(max-width: 900px) 100vw, 55vw"
                    className="tour-highlight__img"
                  />
                </div>
              )}
            </div>
            <div className="tour-highlight__copy">
              <span className="tour-eyebrow">{t.tour.highlightEyebrow}</span>
              <h2>{c.highlightTitle}</h2>
              <p>{c.highlightText}</p>
              <a
                href={highlightHref}
                className="tour-text-link"
                {...(highlightIsExternal
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {highlightIsExternal
                  ? t.tour.highlightMapLink
                  : t.tour.highlightItineraryLink}{" "}
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </section>

        {c.pickupItems?.length ? (
          <section className="tour-pickup-section" id="partida">
            <div className="tour-editorial__inner">
              <h2 className="tour-pickup-title">{pickupTitle}</h2>
              <div className="tour-pickup-grid">
                {c.pickupItems.map((p) => (
                  <article
                    key={p.title}
                    className={
                      p.highlight
                        ? "tour-pickup-card tour-pickup-card--paid"
                        : "tour-pickup-card"
                    }
                  >
                    <span className="tour-pickup-card__icon" aria-hidden>
                      <MapPinIcon />
                    </span>
                    <h3>{p.title}</h3>
                    <p>{p.detail.replace(/\s*—\s*.*$/, "")}</p>
                    <span className="tour-pickup-card__badge">
                      {p.highlight ? t.tour.paidBadge : t.tour.freeBadge}
                    </span>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </div>

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

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
      <circle cx="9.5" cy="7" r="3" />
      <path d="M20 21v-2a3.5 3.5 0 0 0-2.5-3.3" />
      <path d="M16 4.1a3 3 0 0 1 0 5.8" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M8 3.5v3M16 3.5v3M3.5 10h17" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M13 2 4 14h7l-1 8 10-12h-7l1-8z" />
    </svg>
  );
}

function StarIcon({ filled = true }: { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={filled ? "is-filled" : "is-empty"}>
      <path
        d="M12 2.6l2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 16.5 6.6 19.4l1-6.1L3.2 9l6.1-.9L12 2.6z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}
