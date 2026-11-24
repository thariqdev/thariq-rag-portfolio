"use client";

import { useEffect, useRef, useState } from "react";

// A number that counts up from zero when it scrolls into view. "27/27" is passed as parts [27, 27].
// The server renders the final number, so the page is correct even if this never runs.
export default function Counter({ parts, suffix = "" }: { parts: number[]; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const key = parts.join("/");
  const [values, setValues] = useState(parts);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = key.split("/").map(Number);
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const k = Math.min(1, (now - start) / 1400);
          const eased = 1 - Math.pow(1 - k, 3);
          setValues(targets.map((t) => Math.round(t * eased)));
          if (k < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [key]);

  return (
    <span ref={ref}>
      {values.join("/")}
      {suffix}
    </span>
  );
}
