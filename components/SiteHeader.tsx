"use client";

import Icon from "./Icon";
import { useActiveSection } from "./useActiveSection";

const NAV = [
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

// Top bar. Phone: "MT." plus an "Available" pill. Desktop: full name, availability pill and links.
export default function SiteHeader() {
  const active = useActiveSection();

  return (
    <header className="fixed top-0 z-50 w-full bg-surface/85 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-margin md:h-20 md:px-margin-md lg:px-margin-lg">
        <div className="flex items-center gap-space-md">
          <a
            href="#top"
            className="inline-flex min-h-11 items-center whitespace-nowrap font-headline text-headline-md font-medium italic tracking-tight text-on-surface transition-colors hover:text-primary md:not-italic"
          >
            <span className="md:hidden">MT.</span>
            <span className="hidden md:inline">B. Mohammed Thariq</span>
          </a>
          {/* Shown from 1024px up. On tablets the header is too tight, and the hero shows the same "available now" pill. */}
          <div className="hidden items-center gap-2 whitespace-nowrap rounded-full bg-surface-container-low px-3 py-1 shadow-[inset_0_0_0_1px_rgba(230,224,214,0.7)] lg:inline-flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-tertiary-container opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-tertiary" />
            </span>
            <span className="font-label text-label-sm uppercase tracking-wider text-secondary">Dubai · available now</span>
          </div>
        </div>

        <div className="flex items-center gap-space-lg">
          {/* The link for the section you are looking at gets the coral underline (as the design's "Work" does) */}
          <nav aria-label="Page sections" className="hidden items-center gap-space-lg font-label text-label-md uppercase tracking-wider md:flex">
            {NAV.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                aria-current={active === link.id ? "location" : undefined}
                className={`py-1 transition-colors ${
                  active === link.id
                    ? "font-medium text-on-surface underline decoration-primary-container decoration-2 underline-offset-8"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-1 rounded-full bg-surface-container px-2.5 py-1 md:hidden">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tertiary" />
            <span className="font-label text-label-sm text-on-surface-variant">Available</span>
          </div>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
            <Icon name="person" className="text-[18px] text-on-primary" />
          </div>
        </div>
      </div>
    </header>
  );
}
