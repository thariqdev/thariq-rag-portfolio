import Icon from "./Icon";
import OpenChatButton from "./OpenChatButton";

// Classes are copied from design/code.html (desktop) and design/code-res.html (phone).
// Text is replaced only where the design says something that is not in /corpus.

// The real corpus files, in place of the design's made-up file names.
const REGISTRY = [
  { file: "cv.md", icon: "badge" },
  { file: "project-fundsapp.md", icon: "description" },
  { file: "project-careerai.md", icon: "terminal" },
  { file: "faq.md", icon: "help" },
];

// GitHub mark used on the phone button (path from the design)
const GITHUB_PATH =
  "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z";

export default function Hero() {
  return (
    <>
      {/* ================= PHONE hero (design/code-res.html) ================= */}
      <section className="flex flex-col gap-space-md px-margin pt-2 pb-space-lg md:hidden">
        {/* Status beacon pill */}
        <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-surface-container">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary-container opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary-container"></span>
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant font-medium tracking-tight">Dubai · available now</span>
        </div>

        {/* Name and credential */}
        <div className="flex flex-col gap-1">
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-normal tracking-tight">B Mohammed Thariq</h1>
          {/* Below 480px the experience goes on its own line, with no bullet, so nothing breaks mid-phrase */}
          <p className="font-label-md text-label-md text-secondary tracking-wider uppercase">
            Full Stack Software Engineer<span className="hidden min-[480px]:inline"> · </span>
            <span className="max-[479px]:block">3+ years exp</span>
          </p>
        </div>

        {/* Bio with the two coral underlines */}
        <div className="relative">
          <p className="font-body-lg text-body-lg text-on-surface leading-relaxed">
            Building responsive web apps for{" "}
            <span className="relative inline-block whitespace-nowrap font-medium text-on-surface">
              wealth management
              <svg className="absolute left-0 -bottom-1 w-full h-2.5 overflow-visible pointer-events-none text-primary-container" fill="none" preserveAspectRatio="none" viewBox="0 0 160 12" aria-hidden="true">
                <path d="M2 8.5C32 3.5 75 11 158 4.5" opacity="0.88" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6" />
              </svg>
            </span>{" "}
            and fintech platforms with React, Next.js, TypeScript, Python, FastAPI, and PostgreSQL. Based in Dubai and{" "}
            <span className="relative inline-block whitespace-nowrap font-medium text-on-surface">
              available immediately.
              <svg className="absolute left-0 -bottom-1 w-full h-2.5 overflow-visible pointer-events-none text-primary-container" fill="none" preserveAspectRatio="none" viewBox="0 0 150 12" aria-hidden="true">
                <path d="M2 6.5C40 10.5 95 3 148 7.5" opacity="0.75" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" />
              </svg>
            </span>
          </p>
        </div>

        {/* Grounded assistant callout (the design's own text, which is already true) */}
        <div className="flex items-start gap-space-xs p-3.5 rounded-xl bg-surface-container-low shadow-sm">
          <Icon name="verified_user" className="text-primary text-[20px] mt-0.5" />
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            <strong className="font-medium text-on-surface">Verified context only:</strong> Ask my assistant about my work. It only answers from my documents.
          </p>
        </div>

        {/* Action buttons */}
        {/* Below 340px the two buttons stack, so the labels never wrap onto two lines */}
        <div className="flex items-center gap-space-sm pt-1 max-[339px]:flex-col max-[339px]:items-stretch">
          <OpenChatButton
            icon="chat_bubble"
            iconClassName="text-[19px]"
            className="flex-1 max-[339px]:flex-none whitespace-nowrap flex items-center justify-center gap-2 h-12 px-space-md rounded-xl bg-primary-strong text-on-primary font-body-md text-body-md font-medium shadow-sm active:scale-[0.98] transition-all"
          />
          <a
            className="whitespace-nowrap flex items-center justify-center gap-2 h-12 px-space-md rounded-xl bg-surface-container text-on-surface font-body-md text-body-md font-medium active:scale-[0.98] transition-all"
            href="https://github.com/thariqdev"
            rel="noopener noreferrer"
            target="_blank"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d={GITHUB_PATH} />
            </svg>
            <span>GitHub</span>
          </a>
        </div>
      </section>

      {/* ================= DESKTOP hero (design/code.html) ================= */}
      <section className="hidden md:block max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg pt-12 md:pt-20 pb-20 md:pb-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-12 items-start">
          {/* Primary narrative column */}
          <div className="lg:col-span-8 flex flex-col gap-space-lg">
            <div className="flex flex-wrap items-center gap-space-sm">
              <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-surface-container shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary-container opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary"></span>
                </span>
                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Dubai, UAE · available now</span>
              </div>
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider bg-surface-container-low px-3 py-1 rounded-full">3+ Years Experience</span>
            </div>

            <div className="flex flex-col relative">
              <h1 className="font-display text-display tracking-tight text-on-surface">B. Mohammed Thariq</h1>
              <div className="relative inline-block w-fit mt-1">
                <span className="font-headline-lg text-headline-lg italic text-secondary">Full Stack Software Engineer</span>
                {/* Handcrafted warm coral flourish */}
                <svg className="w-full h-3.5 mt-1 overflow-visible text-primary-container" fill="none" preserveAspectRatio="none" viewBox="0 0 540 18" aria-hidden="true">
                  <path d="M3 14C85 4 195 2.5 320 8.5C415 13 480 15 537 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                  <path d="M12 16.5C110 9 240 7 360 11C445 13.5 500 12.5 530 8" opacity="0.6" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" />
                </svg>
              </div>
            </div>

            <p className="font-body-lg text-body-lg text-on-surface max-w-2xl leading-relaxed">
              Building responsive web apps for fintech and wealth management platforms with{" "}
              <strong className="text-on-surface font-semibold">React, Next.js, TypeScript, Python, FastAPI, and PostgreSQL</strong>. Based in Dubai and available to join immediately.
            </p>

            <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-space-md pt-2">
              <OpenChatButton
                icon="forum"
                iconClassName="text-[19px] group-hover:rotate-6 transition-transform"
                labelClassName="font-label-md text-label-md uppercase tracking-wider whitespace-nowrap"
                className="group px-6 py-3.5 rounded-xl bg-primary-strong hover:bg-primary transition-all duration-200 text-on-primary font-medium flex items-center gap-2.5 shadow-md active:scale-[0.98]"
              />
              <a
                className="px-5 py-3.5 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors duration-150 text-on-surface font-medium flex items-center gap-2"
                href="https://github.com/thariqdev"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Icon name="code" className="text-[18px]" />
                <span className="font-label-md text-label-md uppercase tracking-wider">github.com/thariqdev</span>
              </a>
              <div className="inline-flex items-center gap-2 py-2 px-3 rounded-lg bg-surface-container-lowest text-secondary">
                <Icon name="verified_user" className="text-primary-container text-[18px]" />
                <span className="font-label-sm text-label-sm uppercase tracking-wider">Answers From My Documents Only</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface-container-low max-w-xl flex items-start gap-3">
              <Icon name="info" className="text-primary text-[20px] mt-0.5" />
              <p className="font-body-sm text-body-sm text-secondary">
                <strong className="text-on-surface font-medium">Assistant Grounding Notice:</strong> Ask my assistant about my work. It only answers from my documents.
              </p>
            </div>
          </div>

          {/* Secondary meta column */}
          <div className="lg:col-span-4 flex flex-col gap-space-md lg:pl-6">
            <div className="p-6 rounded-2xl bg-surface-container-low shadow-sm flex flex-col gap-4">
              <span className="font-label-sm text-label-sm uppercase text-secondary tracking-widest">Document Registry</span>
              <div className="space-y-3 font-label-sm text-label-sm">
                {REGISTRY.map((row) => (
                  <div key={row.file} className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-lowest">
                    <div className="flex items-center gap-2">
                      <Icon name={row.icon} className="text-secondary text-[16px]" />
                      <span className="text-on-surface">{row.file}</span>
                    </div>
                    <span className="text-tertiary uppercase text-[11px] font-semibold">Indexed</span>
                  </div>
                ))}
              </div>
              <div className="pt-2 flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-secondary">Chunking &amp; Embeddings</span>
                <span className="font-label-sm text-label-sm text-on-surface font-semibold">gemini-embedding-2 · JSON</span>
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-surface-container-highest shadow-sm flex flex-col gap-2">
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Experience</span>
              <p className="font-headline-sm text-headline-sm text-on-surface leading-snug">
                3+ years building admin dashboards, management interfaces and responsive web apps.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
