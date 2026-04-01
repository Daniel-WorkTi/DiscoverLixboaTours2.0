"use client";

import confetti from "canvas-confetti";
import { useEffect, useRef } from "react";

/** Cores da marca (site.css :root) — confetes alinhados ao resto do site. */
const BRAND_COLORS = ["#ff6600", "#00B4D8", "#52B788", "#E76F51", "#F9F9F9"];

export function ObrigadoConfetti() {
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    done.current = true;

    const run = () => {
      confetti({
        particleCount: 130,
        spread: 72,
        origin: { y: 0.58 },
        colors: BRAND_COLORS,
        disableForReducedMotion: true,
      });
      setTimeout(() => {
        confetti({
          particleCount: 70,
          angle: 60,
          spread: 50,
          origin: { x: 0, y: 0.65 },
          colors: BRAND_COLORS,
          disableForReducedMotion: true,
        });
        confetti({
          particleCount: 70,
          angle: 120,
          spread: 50,
          origin: { x: 1, y: 0.65 },
          colors: BRAND_COLORS,
          disableForReducedMotion: true,
        });
      }, 180);
    };

    run();
  }, []);

  return null;
}
