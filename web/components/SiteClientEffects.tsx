"use client";

import { useEffect } from "react";

export function SiteClientEffects() {
  useEffect(() => {
    const mainHeader = document.querySelector(".main-header");
    let lastScrollTop = 0;
    const scrollThreshold = 100;

    const onScrollHeader = () => {
      if (!mainHeader) return;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > scrollThreshold) {
        if (scrollTop > lastScrollTop) {
          mainHeader.classList.add("hidden");
        } else {
          mainHeader.classList.remove("hidden");
        }
      } else {
        mainHeader.classList.remove("hidden");
      }
      lastScrollTop = scrollTop;
    };

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".header-nav a");

    const updateActiveLink = () => {
      let currentSection = "";
      sections.forEach((section) => {
        const el = section as HTMLElement;
        const sectionTop = el.offsetTop;
        const sectionHeight = el.clientHeight;
        const scrollPosition = window.pageYOffset + 200;
        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          currentSection = section.getAttribute("id") || "";
        }
      });
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSection}`) {
          link.classList.add("active");
        }
      });
    };

    const onAnchorClick = (e: Event) => {
      const anchor = e.currentTarget as HTMLAnchorElement;
      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const header = document.querySelector(".main-header");
        const headerHeight = header ? (header as HTMLElement).offsetHeight : 100;
        const targetPosition =
          (target as HTMLElement).offsetTop - headerHeight - 20;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    };

    window.addEventListener("scroll", onScrollHeader);
    window.addEventListener("scroll", updateActiveLink);
    window.addEventListener("load", updateActiveLink);
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", onAnchorClick);
    });

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    document.querySelectorAll(".feature-item").forEach((el) => {
      observer.observe(el);
    });

    updateActiveLink();

    return () => {
      window.removeEventListener("scroll", onScrollHeader);
      window.removeEventListener("scroll", updateActiveLink);
      window.removeEventListener("load", updateActiveLink);
      document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.removeEventListener("click", onAnchorClick);
      });
    };
  }, []);

  return null;
}
