"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type TourStopSlide = {
  title: string;
  image: string;
};

type Props = {
  stops: TourStopSlide[];
  prevLabel: string;
  nextLabel: string;
  regionLabel: string;
};

const AUTO_MS = 3200;

export function TourStopsCarousel({
  stops,
  prevLabel,
  nextLabel,
  regionLabel,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [fits, setFits] = useState(false);

  const scrollByCard = useCallback((dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".tour-stop-card");
    const gap = Number.parseFloat(getComputedStyle(el).columnGap) || 0;
    const step = card ? card.offsetWidth + gap : Math.round(el.clientWidth * 0.55);
    const max = Math.max(el.scrollWidth - el.clientWidth, 0);
    if (max < 2) return;

    const current = el.scrollLeft;
    let next = current + dir * step;

    if (dir === 1 && current >= max - 2) next = 0;
    else if (dir === -1 && current <= 2) next = max;
    else next = Math.min(max, Math.max(0, next));

    const previousSnap = el.style.scrollSnapType;
    el.style.scrollSnapType = "none";
    el.scrollTo({ left: next, behavior: "smooth" });

    let settled = false;
    const restore = () => {
      if (settled) return;
      settled = true;
      el.style.scrollSnapType = previousSnap;
    };
    el.addEventListener("scrollend", restore, { once: true });
    window.setTimeout(restore, 900);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const measure = () => {
      setFits(el.scrollWidth <= el.clientWidth + 2);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [stops.length]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (fits || stops.length <= 1 || paused || reduce) return;
    const id = window.setInterval(() => {
      scrollByCard(1);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [fits, paused, scrollByCard, stops.length]);

  return (
    <div
      className={
        fits ? "tour-stops-carousel tour-stops-carousel--fit" : "tour-stops-carousel"
      }
      role="region"
      aria-roledescription="carrossel"
      aria-label={regionLabel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className="tour-stops-carousel__viewport">
        <button
          type="button"
          className="tour-stops-carousel__nav tour-stops-carousel__nav--prev"
          onClick={() => scrollByCard(-1)}
          aria-label={prevLabel}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          className="tour-stops-carousel__nav tour-stops-carousel__nav--next"
          onClick={() => scrollByCard(1)}
          aria-label={nextLabel}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div
          className="tour-stops-rail"
          role="list"
          ref={trackRef}
          onPointerDown={() => setPaused(true)}
          onPointerUp={() => setPaused(false)}
        >
          {stops.map((item, index) => (
            <article className="tour-stop-card" role="listitem" key={`${item.title}-${index}`}>
              <div className="tour-stop-card__media">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 700px) 68vw, 480px"
                  quality={90}
                  className="tour-stop-card__img"
                />
                <span className="tour-stop-card__num">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3>{item.title.replace(/ - .*$/, "")}</h3>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
