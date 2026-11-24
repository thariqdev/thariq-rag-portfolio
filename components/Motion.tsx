"use client";

import { useEffect, useRef } from "react";

// Runs all the scroll motion for the page. Two jobs:
// 1. A thin orange bar at the top that fills as you scroll.
// 2. Every element marked data-reveal gets the class "fs-in" when it scrolls into view. The CSS does the animating.
// The page stays fully visible until this runs, so nothing is hidden if JavaScript fails.
export default function Motion() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    // Progress bar
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      bar.current?.style.setProperty("--p", String(p));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (reduce) {
      return () => window.removeEventListener("scroll", onScroll);
    }

    // Anything already on screen counts as seen, so it never flickers hidden first.
    items.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) el.classList.add("fs-in");
    });
    document.documentElement.classList.add("fs-armed");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("fs-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );
    items.forEach((el) => {
      if (!el.classList.contains("fs-in")) io.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
      document.documentElement.classList.remove("fs-armed");
    };
  }, []);

  return <div ref={bar} className="fs-progress" aria-hidden="true" />;
}
