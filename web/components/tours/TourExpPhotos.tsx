"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  photos: string[];
  /** Alt text aligned with photos (falls back to empty if shorter). */
  alts?: string[];
  prevLabel: string;
  nextLabel: string;
  regionLabel: string;
};

const AUTO_MS = 3800;

export function TourExpPhotos({
  photos,
  alts = [],
  prevLabel,
  nextLabel,
  regionLabel,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  const scrollByCard = useCallback((dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".tour-exp__photo");
    const step = card ? card.offsetWidth + 14 : Math.round(el.clientWidth * 0.55);
    const max = Math.max(el.scrollWidth - el.clientWidth, 0);
    let next = el.scrollLeft + dir * step;
    if (dir === 1 && next >= max - 2) next = 0;
    if (dir === -1 && next <= 2) next = max;
    el.scrollTo({ left: next, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (photos.length <= 3 || paused || reduce) return;
    const id = window.setInterval(() => scrollByCard(1), AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, photos.length, scrollByCard]);

  if (!photos.length) return null;

  return (
    <div
      className="tour-exp__photos-wrap"
      role="region"
      aria-label={regionLabel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <button
        type="button"
        className="tour-exp__nav tour-exp__nav--prev"
        onClick={() => scrollByCard(-1)}
        aria-label={prevLabel}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        className="tour-exp__nav tour-exp__nav--next"
        onClick={() => scrollByCard(1)}
        aria-label={nextLabel}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="tour-exp__photos" ref={trackRef} role="list">
        {photos.map((src, i) => (
          <div className="tour-exp__photo" role="listitem" key={`${src}-${i}`}>
            <Image
              src={src}
              alt={alts[i] ?? ""}
              fill
              sizes="(max-width: 700px) 62vw, 280px"
              className="tour-exp__img"
              quality={90}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
