"use client";

import Clock from "./Clock";
import { useActiveSection } from "./useActiveSection";

const NAV = [
  { id: "record", label: "Record" },
  { id: "work", label: "Projects" },
  { id: "proof", label: "Numbers" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

// Sticky top strip. The link for the section on screen gets the orange underline. On phones the bottom tab bar does the navigating.
export default function SiteHeader() {
  const active = useActiveSection();
  return (
    <header className="fs-strip">
      <div className="fs-wrap">
        <a href="#top" className="fs-id">
          <i />
          THARIQ / FULL STACK
        </a>
        <nav aria-label="Page sections" className="fs-nav">
          {NAV.map((l) => (
            <a key={l.id} href={`#${l.id}`} aria-current={active === l.id ? "location" : undefined}>
              {l.label}
            </a>
          ))}
        </nav>
        <span className="fs-avail">
          <Clock />
          <span className="fs-avail-text">
            <i />
            Available now
          </span>
        </span>
      </div>
    </header>
  );
}
