"use client";

import { useEffect, useState } from "react";

// The page sections in order. These ids are on the wrappers in page.tsx and the section components.
const SECTION_IDS = ["top", "work", "skills", "contact"] as const;
export type SectionId = (typeof SECTION_IDS)[number];

// Returns the section that is on screen now, so the nav can highlight it as you scroll.
// A section counts once its top edge has passed a line just below the header.
export function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>("top");

  useEffect(() => {
    const LINE = 120; // px from the top of the screen (the header is 64 to 80px tall)

    const update = () => {
      let current: SectionId = "top";
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= LINE) current = id;
      }
      // Contact is the last section and cannot scroll up to the line, so at the bottom it wins.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = "contact";
      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return active;
}
