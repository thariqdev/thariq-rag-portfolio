"use client";

import { useEffect, useId, useRef } from "react";
import "./echo.css";

// Echo, the chat mascot. A small robot drawn as SVG, so it stays sharp at any size and needs no image file.
//
// mood:
//   idle       waiting, floats and blinks now and then
//   listening  the input box has focus: eyes get wider
//   typing     the visitor is typing: leans in
//   thinking   the answer is loading: flat eyes, halo, three dots
//   happy      an answer arrived: hop, smile, sparkles
//   sad        "not in my documents" or an error: eyebrows down
//
// look: where the eyes point, from -1 to 1 on each axis. Leave it out and the eyes follow the mouse.
// It also blinks by itself, and blinks when the visitor clicks or presses a key.
export type EchoMood = "idle" | "listening" | "typing" | "thinking" | "happy" | "sad";

type Props = {
  mood?: EchoMood;
  variant?: "head" | "peek"; // head = round avatar. peek = head, shoulders and hands (pops up over the chat)
  size?: number; // width in px
  look?: { x: number; y: number } | null;
  className?: string;
};

const CORAL = "#ff5a36";
const CORAL_DEEP = "#d63f1d";
const CORAL_SOFT = "#ff7a59";

export default function Echo({ mood = "idle", variant = "head", size = 40, look = null, className = "" }: Props) {
  const root = useRef<SVGSVGElement>(null);
  const uid = useId().replace(/:/g, "");
  const peek = variant === "peek";

  // Blinking: now and then at random, and when the visitor clicks or presses a key.
  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timers = new Set<ReturnType<typeof setTimeout>>();
    const later = (fn: () => void, ms: number) => {
      const t = setTimeout(() => {
        timers.delete(t);
        fn();
      }, ms);
      timers.add(t);
    };
    const blink = () => {
      if (document.hidden) return;
      el.classList.add("is-blink");
      later(() => el.classList.remove("is-blink"), 140);
    };
    const loop = () =>
      later(() => {
        blink();
        if (Math.random() < 0.2) later(blink, 280); // sometimes a double blink
        loop();
      }, 2200 + Math.random() * 3200);
    let last = 0;
    const react = () => {
      const now = performance.now();
      if (now - last < 650) return;
      last = now;
      blink();
    };
    loop();
    document.addEventListener("pointerdown", react);
    document.addEventListener("keydown", react);
    return () => {
      timers.forEach(clearTimeout);
      document.removeEventListener("pointerdown", react);
      document.removeEventListener("keydown", react);
    };
  }, []);

  // Eyes: either the "look" you pass in, or they follow the mouse. They move through two CSS variables, so React does not re-render.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const aim = (x: number, y: number) => {
      el.style.setProperty("--gx", `${(Math.max(-1, Math.min(1, x)) * 4).toFixed(2)}px`);
      el.style.setProperty("--gy", `${(Math.max(-1, Math.min(1, y)) * 3).toFixed(2)}px`);
    };
    if (look) {
      aim(look.x, look.y);
      return;
    }
    aim(0, 0);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        aim((e.clientX - (r.left + r.width / 2)) / 260, (e.clientY - (r.top + r.height / 2)) / 260);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [look]);

  // One eye. Each look is its own shape and CSS shows the one that fits the mood.
  const eye = (cx: number, mirror: boolean) => (
    <g transform={`translate(${cx} 61)${mirror ? " scale(-1 1)" : ""}`}>
      <g className="eo-g">
        <ellipse rx="11" ry="13" fill={CORAL} opacity="0.2" />
        <ellipse rx="6.6" ry="8.6" fill={CORAL} />
        <circle cx="-2.2" cy="-3.2" r="1.9" fill="#fff" opacity="0.9" />
      </g>
      <path className="eh" d="M-7.5 3.5 Q0 -7.5 7.5 3.5" stroke={CORAL_SOFT} strokeWidth="3.6" fill="none" strokeLinecap="round" />
      <rect className="et" x="-7.5" y="-1.9" width="15" height="3.8" rx="1.9" fill={CORAL} />
      <path className="es-brow" d="M-9 -8 L7 -13" stroke={CORAL_SOFT} strokeWidth="3" strokeLinecap="round" />
    </g>
  );

  return (
    <svg
      ref={root}
      className={`echo echo-m-${mood} ${className}`}
      width={size}
      height={size * (peek ? 1.17 : 0.9)}
      viewBox={peek ? "0 0 120 140" : "0 0 120 108"}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${uid}h`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#ebe4d9" />
        </linearGradient>
        <linearGradient id={`${uid}s`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b2825" />
          <stop offset="1" stopColor="#161412" />
        </linearGradient>
      </defs>

      {/* Shoulders and hands (only the big version). The chat card covers the bottom, so Echo looks like it leans on the edge. */}
      {peek && (
        <g className="echo-body">
          <rect x="50" y="98" width="20" height="14" rx="5" fill="#cfc6b8" />
          <path d="M16 140 Q16 108 60 108 Q104 108 104 140Z" fill="#31302d" />
          <path d="M60 119 l2.6 5.4 5.4 2.6 -5.4 2.6 -2.6 5.4 -2.6 -5.4 -5.4 -2.6 5.4 -2.6z" fill={CORAL} />
          <circle cx="22" cy="126" r="9" fill="#fff" stroke="#d9d1c5" strokeWidth="2" />
          <g className="echo-wave">
            <circle cx="98" cy="126" r="9" fill="#fff" stroke="#d9d1c5" strokeWidth="2" />
          </g>
        </g>
      )}

      <g className="echo-float">
        <g className="echo-head">
          {/* headphone band, behind the head */}
          <path d="M15 52 Q60 -6 105 52" stroke="#2b2825" strokeWidth="5" fill="none" strokeLinecap="round" />
          {/* antenna */}
          <line x1="60" y1="24" x2="60" y2="12" stroke="#cfc6b8" strokeWidth="3" strokeLinecap="round" />
          <circle className="echo-bulb" cx="60" cy="9" r="5" fill={CORAL} />
          {/* ear cups */}
          <circle cx="12" cy="62" r="11" fill={CORAL} />
          <circle cx="12" cy="62" r="5.2" fill={CORAL_DEEP} />
          <circle cx="108" cy="62" r="11" fill={CORAL} />
          <circle cx="108" cy="62" r="5.2" fill={CORAL_DEEP} />
          {/* head and screen */}
          <rect x="14" y="24" width="92" height="78" rx="36" fill={`url(#${uid}h)`} stroke="#d9d1c5" strokeWidth="2" />
          <rect x="25" y="39" width="70" height="49" rx="22" fill={`url(#${uid}s)`} />
          {/* a small shine on the screen */}
          <path d="M33 47 Q40 42 50 42" stroke="#fff" strokeOpacity="0.18" strokeWidth="2.6" strokeLinecap="round" fill="none" />

          <g className="echo-eyes">
            {eye(46, false)}
            {eye(74, true)}
          </g>

          {/* cheeks and mouth */}
          <ellipse className="cheek" cx="35" cy="76" rx="5" ry="3" fill={CORAL} />
          <ellipse className="cheek" cx="85" cy="76" rx="5" ry="3" fill={CORAL} />
          <path className="mouth m-smile" d="M52 76 Q60 82 68 76" stroke={CORAL_SOFT} strokeWidth="2.6" fill="none" strokeLinecap="round" />
          <path className="mouth m-grin" d="M50 75 Q60 90 70 75 Z" fill={CORAL_SOFT} />
          <path className="mouth m-flat" d="M54 78 L66 78" stroke={CORAL_SOFT} strokeWidth="2.6" fill="none" strokeLinecap="round" />
          <path className="mouth m-frown" d="M52 81 Q60 74 68 81" stroke={CORAL_SOFT} strokeWidth="2.6" fill="none" strokeLinecap="round" />

          {/* thinking: a halo over the head and three dots */}
          <g className="echo-think">
            <ellipse className="echo-halo" cx="60" cy="19" rx="30" ry="5.5" stroke={CORAL} strokeOpacity="0.6" strokeWidth="2" strokeDasharray="5 6" fill="none" />
            <g fill={CORAL}>
              <circle className="echo-dot" cx="94" cy="22" r="2.6" />
              <circle className="echo-dot" cx="102" cy="14" r="3.1" />
              <circle className="echo-dot" cx="111" cy="5" r="3.6" />
            </g>
          </g>

          {/* happy: two small sparkles */}
          <g className="echo-spark" fill={CORAL_SOFT}>
            <g transform="translate(101 20)">
              <path className="echo-star" d="M0 -8 Q0 0 8 0 Q0 0 0 8 Q0 0 -8 0 Q0 0 0 -8Z" />
            </g>
            <g transform="translate(17 26) scale(.75)">
              <path className="echo-star" d="M0 -8 Q0 0 8 0 Q0 0 0 8 Q0 0 -8 0 Q0 0 0 -8Z" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
