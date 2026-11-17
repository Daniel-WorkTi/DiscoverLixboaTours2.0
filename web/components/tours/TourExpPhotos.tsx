"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

type Props = {
  photos: string[];
  /** Alt text aligned with photos (falls back to empty if shorter). */
  alts?: string[];
  regionLabel: string;
};

const AUTO_MS = 4200;
const SLOT_COUNT = 3;

export function TourExpPhotos({ photos, alts = [], regionLabel }: Props) {
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);

  const pageCount = Math.max(1, Math.ceil(photos.length / SLOT_COUNT));

  const go = useCallback(
    (dir: -1 | 1) => {
      setPage((current) => (current + dir + pageCount) % pageCount);
    },
    [pageCount],
  );

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (pageCount <= 1 || paused || reduce) return;
    const id = window.setInterval(() => go(1), AUTO_MS);
    return () => window.clearInterval(id);
  }, [go, pageCount, paused]);

  const slots = useMemo(() => {
    if (!photos.length) return [];
    const start = (page * SLOT_COUNT) % photos.length;
    return Array.from({ length: Math.min(SLOT_COUNT, photos.length) }, (_, i) => {
      const index = (start + i) % photos.length;
      return { src: photos[index], alt: alts[index] ?? "", index };
    });
  }, [alts, page, photos]);

  if (!photos.length) return null;

  const [featured, secondary, tertiary] = slots;

  return (
    <div
      className="tour-exp__photos-wrap"
      role="region"
      aria-label={regionLabel}
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="tour-exp__mosaic" role="group">
        {featured ? (
          <div className="tour-exp__photo tour-exp__photo--feature" key={`f-${featured.index}-${page}`}>
            <Image
              src={featured.src}
              alt={featured.alt}
              fill
              sizes="(max-width: 900px) 100vw, 28vw"
              className="tour-exp__img"
              quality={90}
              priority={page === 0}
              unoptimized={featured.src.startsWith("http")}
            />
          </div>
        ) : null}

        <div className="tour-exp__mosaic-side">
          {secondary ? (
            <div className="tour-exp__photo tour-exp__photo--side" key={`s-${secondary.index}-${page}`}>
              <Image
                src={secondary.src}
                alt={secondary.alt}
                fill
                sizes="(max-width: 900px) 50vw, 18vw"
                className="tour-exp__img"
                quality={88}
                unoptimized={secondary.src.startsWith("http")}
              />
            </div>
          ) : null}
          {tertiary ? (
            <div className="tour-exp__photo tour-exp__photo--side" key={`t-${tertiary.index}-${page}`}>
              <Image
                src={tertiary.src}
                alt={tertiary.alt}
                fill
                sizes="(max-width: 900px) 50vw, 18vw"
                className="tour-exp__img"
                quality={88}
                unoptimized={tertiary.src.startsWith("http")}
              />
            </div>
          ) : null}
        </div>
      </div>

      {pageCount > 1 ? (
        <div className="tour-exp__dots" role="tablist" aria-label={regionLabel}>
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === page}
              aria-label={`${i + 1} / ${pageCount}`}
              className={`tour-exp__dot${i === page ? " is-active" : ""}`}
              onClick={() => setPage(i)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
