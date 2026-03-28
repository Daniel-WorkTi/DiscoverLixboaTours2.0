"use client";

import { useEffect } from "react";

export function HomeInteractions() {
  useEffect(() => {
    const slider = document.querySelector(
      ".destinations-slider",
    ) as HTMLElement | null;
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    const cards = document.querySelectorAll(".destination-card");

    let currentIndex = 0;
    let cardsPerView = 3;

    const updateSlider = () => {
      if (!slider || cards.length === 0) return;
      const cardWidth = (cards[0] as HTMLElement).offsetWidth;
      const gap = 32;
      const offset = -(currentIndex * (cardWidth + gap));
      slider.style.transform = `translateX(${offset}px)`;
      if (prevBtn)
        (prevBtn as HTMLButtonElement).disabled = currentIndex === 0;
      if (nextBtn)
        (nextBtn as HTMLButtonElement).disabled =
          currentIndex >= cards.length - cardsPerView;
    };

    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        cardsPerView = 1;
      } else if (width <= 1024) {
        cardsPerView = 2;
      } else {
        cardsPerView = 3;
      }
      updateSlider();
    };

    const onPrev = () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    };

    const onNext = () => {
      if (currentIndex < cards.length - cardsPerView) {
        currentIndex++;
        updateSlider();
      }
    };

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateCardsPerView();
      }, 250);
    };

    prevBtn?.addEventListener("click", onPrev);
    nextBtn?.addEventListener("click", onNext);
    window.addEventListener("resize", onResize);
    updateCardsPerView();

    const faqItems = document.querySelectorAll(".faq-item");
    const faqHandlers: Array<{ el: Element; fn: () => void }> = [];
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question");
      if (!question) return;
      const fn = () => {
        const isActive = item.classList.contains("active");
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) otherItem.classList.remove("active");
        });
        if (isActive) item.classList.remove("active");
        else item.classList.add("active");
      };
      question.addEventListener("click", fn);
      faqHandlers.push({ el: question, fn });
    });

    const menuToggle = document.querySelector(".mobile-menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-menu a");

    const onToggle = () => {
      menuToggle?.classList.toggle("active");
      mobileMenu?.classList.toggle("active");
      document.body.style.overflow = mobileMenu?.classList.contains("active")
        ? "hidden"
        : "";
    };

    const closeMenu = () => {
      menuToggle?.classList.remove("active");
      mobileMenu?.classList.remove("active");
      document.body.style.overflow = "";
    };

    menuToggle?.addEventListener("click", onToggle);
    mobileLinks.forEach((link) => link.addEventListener("click", closeMenu));

    return () => {
      prevBtn?.removeEventListener("click", onPrev);
      nextBtn?.removeEventListener("click", onNext);
      window.removeEventListener("resize", onResize);
      faqHandlers.forEach(({ el, fn }) =>
        el.removeEventListener("click", fn),
      );
      menuToggle?.removeEventListener("click", onToggle);
      mobileLinks.forEach((link) =>
        link.removeEventListener("click", closeMenu),
      );
    };
  }, []);

  return null;
}
