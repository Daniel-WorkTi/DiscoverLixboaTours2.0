"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SLIDES = [
  "/assets/images/hero1.jpg",
  "/assets/images/hero2.jpg",
  "/assets/images/hero3.jpg",
  "/assets/images/hero4.jpg",
] as const;

const INTERVAL_MS = 4000;

export function HeroBackgroundSlideshow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="hero-media" aria-hidden>
      {SLIDES.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          priority={index === 0}
          sizes="100vw"
          quality={92}
          className={`hero-slide${index === active ? " is-active" : ""}`}
          style={{
            objectFit: "cover",
            opacity: index === active ? 1 : 0,
            transition: "opacity 1.1s ease",
          }}
        />
      ))}
      <div className="hero-media-veil" />
    </div>
  );
}
