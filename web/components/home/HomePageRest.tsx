"use client";

import Image from "next/image";
import { Fragment } from "react";
import { useMessages } from "@/lib/i18n/LocaleProvider";
import { whatsappSiteUrl } from "@/lib/whatsapp";
import { ExploreVideoSection } from "./ExploreVideoSection";
import { WhyUsSection } from "./WhyUsSection";

type Props = {
  instagramPhotos: string[];
  testimonialAuthors: readonly string[];
};

export function HomePageRest({ instagramPhotos, testimonialAuthors }: Props) {
  const m = useMessages();
  const hp = m.home;

  return (
    <>
      <WhyUsSection />

      <section className="instagram-section" id="instagram">
        <div className="instagram-container">
          <div className="instagram-header">
            <div className="instagram-profile">
              {/* SVG direto — sem Next/Image para não comprimir */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/images/newlogosvg.svg"
                alt="DiscoverLixboaTours Logo"
                width={80}
                height={80}
                className="profile-pic"
              />
              <div className="profile-info">
                <h3>@discoverlixboatours</h3>
                <p>{hp.instagram.description}</p>
              </div>
            </div>
            <a
              href="https://www.instagram.com/discoverlixboatours/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-instagram"
            >
              <span>{hp.instagram.follow}</span>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>

          <div className="instagram-grid">
            {instagramPhotos.map((src, i) => (
              <div className="instagram-post" key={src}>
                <Image src={src} alt={`Post Instagram ${i + 1}`} width={400} height={400} />
                <div className="post-overlay">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="transporte-section">
        <svg className="map-routes" viewBox="0 0 1400 800" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path
            d="M 300,100 Q 350,200 320,300 T 340,500 L 360,650"
            stroke="rgba(255, 102, 0, 0.2)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="10,5"
          />
          <path
            d="M 200,400 Q 400,350 600,300"
            stroke="rgba(0, 180, 216, 0.2)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="10,5"
          />
          <path
            d="M 180,380 L 220,420 L 200,450"
            stroke="rgba(255, 102, 0, 0.25)"
            strokeWidth="1.5"
            fill="none"
          />
          <circle cx="300" cy="100" r="4" fill="rgba(255, 102, 0, 0.35)" />
          <circle cx="340" cy="500" r="4" fill="rgba(255, 102, 0, 0.35)" />
          <circle cx="200" cy="400" r="4" fill="rgba(0, 180, 216, 0.35)" />
          <circle cx="600" cy="300" r="4" fill="rgba(0, 180, 216, 0.35)" />
          <path
            d="M 1100,200 Q 1150,300 1120,400"
            stroke="rgba(255, 102, 0, 0.15)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="10,5"
          />
          <path
            d="M 1050,500 Q 1150,550 1100,650"
            stroke="rgba(0, 180, 216, 0.15)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="8,4"
          />
        </svg>

        <div className="transporte-container">
          <div className="transporte-header">
            <span className="transporte-subtitle">{hp.transporte.subtitle}</span>
            <h2 className="transporte-title">{hp.transporte.title}</h2>
            <p className="transporte-description">{hp.transporte.description}</p>
          </div>

          <div className="transporte-content">
            <div className="transporte-features-left">
              <div className="feature-item">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                    <path d="M12 2v3" />
                  </svg>
                </div>
                <div className="feature-content">
                  <h3>{hp.transporte.features.portuguese.title}</h3>
                  <p>{hp.transporte.features.portuguese.desc}</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                </div>
                <div className="feature-content">
                  <h3>{hp.transporte.features.convertible.title}</h3>
                  <p>{hp.transporte.features.convertible.desc}</p>
                </div>
              </div>
            </div>

            <div className="transporte-image">
              <Image
                src="/assets/images/automovel.png"
                alt="UMM Alter II Descapotável"
                width={600}
                height={400}
              />
            </div>

            <div className="transporte-features-right">
              <div className="feature-item">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                    <path d="M8 12h8" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <div className="feature-content">
                  <h3>{hp.transporte.features.diesel.title}</h3>
                  <p>{hp.transporte.features.diesel.desc}</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 20h18L13 4l-4 7-3-3-3 12z" />
                    <path d="M10 11l3-3 8 12" />
                    <circle cx="18" cy="8" r="2" />
                  </svg>
                </div>
                <div className="feature-content">
                  <h3>{hp.transporte.features.fourByFour.title}</h3>
                  <p>{hp.transporte.features.fourByFour.desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ExploreVideoSection />

      <section className="quote-carousel-section">
        <div className="quote-carousel-container">
          <div className="quote-strip quote-strip-1">
            <div className="quote-content">
              {[1, 2, 3].map((i) => (
                <Fragment key={i}>
                  <svg className="quote-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <p className="quote-text">{hp.quotes.laranja}</p>
                </Fragment>
              ))}
            </div>
          </div>
          <div className="quote-strip quote-strip-2">
            <div className="quote-content">
              {[1, 2, 3].map((i) => (
                <Fragment key={i}>
                  <svg className="quote-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                  <p className="quote-text">{hp.quotes.azul}</p>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="testimonials-container">
          <div className="testimonials-header">
            <span className="testimonials-subtitle">{hp.testimonials.subtitle}</span>
            <h2 className="testimonials-title">{hp.testimonials.title}</h2>
            <p className="testimonials-description">{hp.testimonials.description}</p>
          </div>

          <div className="testimonials-grid">
            {hp.testimonials.items.map((text, i) => (
              <div className="testimonial-card" key={i}>
                <div className="testimonial-stars" aria-label="5 de 5 estrelas">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <StarIcon key={s} />
                  ))}
                </div>
                <svg className="testimonial-quote" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M10.5 7.5H7.8C6.26 7.5 5 8.76 5 10.3v4.4c0 1.54 1.26 2.8 2.8 2.8h2.2c.55 0 1-.45 1-1v-2.2c0-.55-.45-1-1-1H9.5v-1.2c0-1.1.9-2 2-2h.1c.55 0 1-.45 1-1V8.5c0-.55-.45-1-1-1zm8 0H15.8c-1.54 0-2.8 1.26-2.8 2.8v4.4c0 1.54 1.26 2.8 2.8 2.8h2.2c.55 0 1-.45 1-1v-2.2c0-.55-.45-1-1-1H17.5v-1.2c0-1.1.9-2 2-2h.1c.55 0 1-.45 1-1V8.5c0-.55-.45-1-1-1z"
                    fill="currentColor"
                  />
                </svg>
                <p className="testimonial-text">{text}</p>
                <div className="testimonial-author">
                  <div className="author-info">
                    <h4 className="author-name">
                      {testimonialAuthors[i] ?? testimonialAuthors[0]}
                    </h4>
                    <p className="author-location">
                      <span className="testimonial-source">TripAdvisor</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="tripadvisor-button-container">
            <a
              href="https://www.tripadvisor.pt/Attraction_Review-g189164-d27174985-Reviews-or10-Magic_Mike-Sintra_Sintra_Municipality_Lisbon_District_Central_Portugal.html"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tripadvisor"
            >
              <Image
                src="https://images.seeklogo.com/logo-png/22/1/tripadvisor-logo-png_seeklogo-222085.png"
                alt="TripAdvisor Logo"
                className="tripadvisor-icon"
                width={32}
                height={32}
                unoptimized
              />
              <span>{hp.testimonials.tripadvisorBtn}</span>
              <svg viewBox="0 0 24 24" fill="currentColor" className="tripadvisor-arrow">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <section className="faq-section" id="faq">
        <div className="faq-container">
          <div className="faq-header">
            <span className="faq-subtitle">{hp.faq.subtitle}</span>
            <h2 className="faq-title">{hp.faq.title}</h2>
            <p className="faq-description">{hp.faq.description}</p>
          </div>

          <div className="faq-list">
            {hp.faq.items.map((item) => (
              <div className="faq-item" key={item.q}>
                <button type="button" className="faq-question">
                  <span>{item.q}</span>
                  <svg className="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div className="faq-answer">
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <a
        href={whatsappSiteUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>
    </>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}
