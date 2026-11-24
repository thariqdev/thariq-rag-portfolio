"use client";

import { useRef } from "react";

// The big name. Each letter is its own box. The letters rise in one by one when the page loads.
// On a mouse, letters near the cursor stretch wider (the font has a width axis), then settle back.
const MIN_WIDTH = 75;
const MAX_WIDTH = 88;
const REACH = 260; // px from the cursor where the stretch fades out

export default function NameWave({ text }: { text: string }) {
  const letters = useRef<(HTMLSpanElement | null)[]>([]);

  function onMove(e: React.PointerEvent) {
    if (e.pointerType !== "mouse") return;
    letters.current.forEach((el) => {
      if (!el) return;
      const box = el.getBoundingClientRect();
      const dist = Math.abs(e.clientX - (box.left + box.width / 2));
      const near = Math.max(0, 1 - dist / REACH);
      el.style.fontVariationSettings = `"wdth" ${(MIN_WIDTH + (MAX_WIDTH - MIN_WIDTH) * near).toFixed(1)}`;
    });
  }

  function onLeave() {
    letters.current.forEach((el) => {
      if (el) el.style.fontVariationSettings = "";
    });
  }

  return (
    <span className="big" onPointerMove={onMove} onPointerLeave={onLeave}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          ref={(el) => {
            letters.current[i] = el;
          }}
          className="fs-letter"
          style={{ "--i": i } as React.CSSProperties}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}
