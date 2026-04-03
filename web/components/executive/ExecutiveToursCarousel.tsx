"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export type ExecutiveTourBanner = {
  key: string;
  titlePt: string;
  linePt: string;
  src: string;
  alt: string;
};

type Props = {
  slides: readonly ExecutiveTourBanner[];
};

const AUTO_MS = 6500;

export function ExecutiveToursCarousel({ slides }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const len = slides.length;
  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => (i + dir + len) % len);
    },
    [len],
  );

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (len <= 1 || paused || reduce) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % len);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [len, paused]);

  const current = slides[index];

  return (
    <div
      className="exec-tour-carousel"
      role="region"
      aria-roledescription="carrossel"
      aria-label="Passeios em destaque"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          go(-1);
        }
        if (e.key === "ArrowRight") {
          e.preventDefault();
          go(1);
        }
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="exec-tour-carousel__viewport">
        <div
          className="exec-tour-carousel__track"
          style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
        >
          {slides.map((slide, i) => (
            <div
              key={slide.key}
              className="exec-tour-carousel__slide"
              aria-hidden={i !== index}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="(max-width: 639px) 100vw, min(94vw, 90rem)"
                className="object-cover object-center"
                priority={i === 0}
              />
              <div className="exec-tour-carousel__caption">
                <h3 className="exec-tour-carousel__title">{slide.titlePt}</h3>
                <p className="exec-tour-carousel__line">{slide.linePt}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="exec-tour-carousel__nav exec-tour-carousel__nav--prev"
          onClick={() => go(-1)}
          aria-label="Slide anterior"
        >
          <ChevronLeft className="h-7 w-7" strokeWidth={2} aria-hidden />
        </button>
        <button
          type="button"
          className="exec-tour-carousel__nav exec-tour-carousel__nav--next"
          onClick={() => go(1)}
          aria-label="Seguinte slide"
        >
          <ChevronRight className="h-7 w-7" strokeWidth={2} aria-hidden />
        </button>
      </div>

      <div className="exec-tour-carousel__dots" role="tablist" aria-label="Seleção de passeio">
        {slides.map((slide, i) => (
          <button
            key={slide.key}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`${slide.titlePt} — slide ${i + 1} de ${len}`}
            className={`exec-tour-carousel__dot ${i === index ? "exec-tour-carousel__dot--active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>

      <p className="exec-tour-carousel__live" aria-live="polite">
        {current.titlePt}. {current.linePt}
      </p>
    </div>
  );
}
