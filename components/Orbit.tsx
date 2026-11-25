"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Icon from "./Icon";

// Eight cards that circle the portrait as you scroll. Every line comes from the CV.
const CARDS = [
  { icon: "psychology", title: "Career AI", line: "RAG assistant, 900+ tests", to: "proj-career-ai" },
  { icon: "account_balance", title: "FundsApp", line: "15+ REST APIs, KYC and SIPs", to: "proj-fundsapp" },
  { icon: "monitoring", title: "Rayi", line: "Wealth management dashboards", to: "proj-rayi" },
  { icon: "insights", title: "Rudo", line: "Mutual fund UI with Strapi CMS", to: "proj-rudo" },
  { icon: "code", title: "React and Next.js", line: "Dashboards and admin screens", to: "skills" },
  { icon: "dns", title: "Python and FastAPI", line: "SQLAlchemy and PostgreSQL", to: "skills" },
  { icon: "manage_search", title: "RAG", line: "Hybrid search, checked answers", to: "proj-talk-to-thariq" },
  { icon: "payments", title: "Fintech", line: "Onboarding, KYC, investments", to: "work" },
];

// Portrait size (width / height of public/portrait.png)
const PORTRAIT = { w: 420, h: 701 };

export default function Orbit() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const sec = section.current;
    const st = stage.current;
    if (!sec || !st) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let progress = reduce ? 0.12 : 0; // 0 at the top of the section, 1 at the bottom
    let frame = 0;

    // Puts every card on the ring. The ring is a circle seen from slightly above.
    // Cards at the front are big and solid, cards at the back are small and faded. The portrait hides the ones behind it.
    function paint() {
      frame = 0;
      const radius = Math.min(st!.clientWidth * (st!.clientWidth < 700 ? 0.34 : 0.34), 470);
      const spin = 0.35 + progress * Math.PI * 2 * 0.9;
      // Phones show 6 cards (the last two are hidden by CSS), so the spacing uses only the visible ones.
      const shown = cards.current.filter((el): el is HTMLDivElement => !!el && el.offsetParent !== null);
      const step = (Math.PI * 2) / shown.length;
      shown.forEach((el, i) => {
        const a = spin + i * step;
        const depth = (Math.cos(a) + 1) / 2; // 1 = front, 0 = back
        const x = Math.sin(a) * radius;
        const z = Math.cos(a) * radius * 0.9 + 80; // +80 keeps side cards in front of the portrait plane when they turn
        const y = Math.cos(a) * radius * 0.1 + Math.sin(a * 2 + i) * 5;
        const yaw = Math.sin(a) * 24; // cards turn a little as they swing, so text never mirrors
        // No scale() here: the 3D perspective already makes front cards bigger, and extra scaling made the text soft.
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateY(${yaw.toFixed(1)}deg)`;
        el.style.opacity = (0.55 + 0.45 * depth).toFixed(2);
        // Only cards in the front half can be clicked, the back ones sit behind the portrait.
        el.style.pointerEvents = depth > 0.45 ? "auto" : "none";
      });
      st!.classList.add("is-ready");
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    function onScroll() {
      const rect = sec!.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      schedule();
    }

    // Small tilt that follows the mouse (mouse only, off for reduced motion)
    function onPointer(e: PointerEvent) {
      if (e.pointerType !== "mouse") return;
      const r = st!.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      st!.style.setProperty("--ry", `${(nx * 7).toFixed(2)}deg`);
      st!.style.setProperty("--rx", `${(-ny * 4).toFixed(2)}deg`);
    }

    paint();
    if (!reduce) {
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      st.addEventListener("pointermove", onPointer);
    }
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", schedule);
      st.removeEventListener("pointermove", onPointer);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Click a card: glide to its project (or the skills block) and flash it so you see where you landed.
  function go(id: string) {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    target.classList.remove("fs-flash");
    void target.offsetWidth;
    target.classList.add("fs-flash");
    window.setTimeout(() => target.classList.remove("fs-flash"), 2200);
  }

  return (
    <section ref={section} className="fs-orbit" aria-labelledby="orbit-title">
      <div ref={stage} className="fs-orbit-stage">
        <div className="fs-orbit-head">
          <span className="fs-no">The stack, all around</span>
          <h2 id="orbit-title" className="fs-orbit-title">
            One engineer.
            <br />
            <em>The whole stack.</em>
          </h2>
        </div>
        <p className="fs-orbit-hint fs-label">Scroll to spin ↓</p>

        <div className="fs-orbit-disc" aria-hidden="true" />
        <div className="fs-orbit-scene">
          <div className="fs-orbit-ring" aria-hidden="true" />
          <div className="fs-orbit-portrait">
            <Image src="/portrait.png" alt="B Mohammed Thariq" width={PORTRAIT.w} height={PORTRAIT.h} sizes="(max-width: 900px) 40vw, 380px" priority={false} />
          </div>
          {CARDS.map((c, i) => (
            <div
              key={c.title}
              ref={(el) => {
                cards.current[i] = el;
              }}
              className={`fs-orbit-card${i >= 6 ? " fs-orbit-extra" : ""}`}
            >
              <button type="button" className="fs-orbit-btn" onClick={() => go(c.to)} aria-label={`${c.title}: ${c.line}. Go to details`}>
                <span className="fs-orbit-icon" aria-hidden="true">
                  <Icon name={c.icon} className="text-[18px]" />
                </span>
                <span className="fs-orbit-text">
                  <b>{c.title}</b>
                  <small>{c.line}</small>
                </span>
                <span className="fs-orbit-go" aria-hidden="true">↗</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
