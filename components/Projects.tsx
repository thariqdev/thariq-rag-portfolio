import Icon from "./Icon";

// Classes are copied from design/code.html (desktop) and design/code-res.html (phone).
// Text is replaced only where the design says something that is not in /corpus.
// Facts come from corpus/project-fundsapp.md, corpus/project-careerai.md and corpus/faq.md.
const GITHUB_CAREER_AI = "https://github.com/thariqdev/career-ai";

const FUNDS_TAGS = ["FastAPI", "Python", "PostgreSQL", "React", "Next.js", "JWT"];
const CAREER_TAGS_DESKTOP = ["Next.js", "FastAPI", "PostgreSQL", "SQLAlchemy", "Tailwind CSS"];
const CAREER_TAGS_PHONE = ["Next.js", "FastAPI", "PostgreSQL", "RAG", "TypeScript"];

// Desktop chip (design: px-2.5 py-1 rounded bg-surface-container ...)
function Chip({ children }: { children: React.ReactNode }) {
  return <span className="px-2.5 py-1 rounded bg-surface-container text-on-surface font-label-sm text-label-sm">{children}</span>;
}

// Phone chip (design: px-2 py-1 rounded bg-surface ...)
function PhoneChip({ children }: { children: React.ReactNode }) {
  return <span className="px-2 py-1 rounded bg-surface font-label-sm text-label-sm text-secondary">{children}</span>;
}

export default function Projects() {
  return (
    // One anchor for both layouts, so the "Work" links always have a visible target.
    <div id="work" className="scroll-mt-20">
      {/* ================= PHONE: Folio / 01 (design/code-res.html) ================= */}
      <section className="flex flex-col gap-space-md px-margin py-space-md md:hidden">
        <div className="flex items-baseline justify-between">
          <div className="flex items-center gap-2">
            <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase">Folio / 01</span>
            <span className="w-8 h-px bg-outline-variant"></span>
          </div>
          <span className="font-label-sm text-label-sm text-secondary">Selected Works</span>
        </div>

        <div className="flex flex-col gap-space-md">
          {/* Project 1: FundsApp */}
          <article className="flex flex-col rounded-2xl bg-surface-container-low shadow-sm p-space-md overflow-hidden relative">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm">Fintech</span>
                <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm flex items-center gap-1">
                  <Icon name="lock" className="text-[13px]" />
                  Employer Work
                </span>
              </div>
              <span className="font-label-sm text-label-sm text-secondary">Evoqins Pvt Ltd</span>
            </div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-medium tracking-tight mb-2">FundsApp</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-4">
              A mutual fund investment platform. Users sign up, complete KYC, get a risk profile, and then invest, including through SIPs.
            </p>
            {/* Metrics grid */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="p-3 rounded-xl bg-surface flex flex-col">
                <span className="font-headline-sm text-headline-sm text-primary font-normal">15+</span>
                <span className="font-label-sm text-label-sm text-secondary mt-0.5">REST APIs Built &amp; Used</span>
              </div>
              <div className="p-3 rounded-xl bg-surface flex flex-col">
                <span className="font-headline-sm text-headline-sm text-on-surface font-normal">JWT</span>
                <span className="font-label-sm text-label-sm text-secondary mt-0.5">Auth + MPIN Security</span>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-surface-container mb-4">
              <div className="font-label-sm text-label-sm text-secondary mb-1.5 uppercase tracking-wide">Thariq&apos;s Role</div>
              <p className="font-body-sm text-body-sm text-on-surface">
                Software Engineer at Evoqins Pvt Ltd. Most of his work was frontend, using React and Next.js. He also contributed to the Python backend.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {FUNDS_TAGS.map((t) => <PhoneChip key={t}>{t}</PhoneChip>)}
            </div>
          </article>

          {/* Project 2: Career AI */}
          <article className="flex flex-col rounded-2xl bg-surface-container-low shadow-sm p-space-md overflow-hidden relative">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm font-medium">Open Source</span>
                <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-tertiary font-label-sm text-label-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                  RAG Assistant
                </span>
              </div>
              {/* py-4 with -my-4 makes the tap area 46px tall without moving anything */}
              <a className="flex items-center gap-0.5 py-4 -my-4 font-label-sm text-label-sm text-primary hover:underline" href={GITHUB_CAREER_AI} rel="noopener noreferrer" target="_blank">
                <span>github.com</span>
                <Icon name="arrow_outward" className="text-[14px]" />
              </a>
            </div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-medium tracking-tight mb-2">Career AI</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-4">
              A full stack web app built by Thariq. It helps with job search: skills, job matching, interview prep and application tracking.
            </p>
            {/* Retrieval box */}
            <div className="p-3.5 rounded-xl bg-surface-container mb-4 flex flex-col gap-2">
              <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                <span className="font-label-sm text-label-sm text-primary font-medium flex items-center gap-1 whitespace-nowrap">
                  <Icon name="database" className="text-[15px]" />
                  Hybrid Retrieval
                </span>
                <span className="font-label-sm text-label-sm text-secondary whitespace-nowrap">BM25 + Embeddings</span>
              </div>
              <div className="p-2.5 rounded-lg bg-surface font-label-sm text-label-sm text-on-surface font-mono flex flex-col gap-1">
                <div className="text-secondary break-words">&gt; compare: job description vs. user skills</div>
                <div className="text-on-surface-variant">&quot;Lists the gaps between them.&quot;</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {CAREER_TAGS_PHONE.map((t) => <PhoneChip key={t}>{t}</PhoneChip>)}
            </div>
          </article>
        </div>
      </section>

      {/* ================= DESKTOP (design/code.html) ================= */}
      {/* Section divider */}
      <div className="hidden md:block max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg w-full">
        <div className="h-px bg-surface-container-highest w-full flex items-center justify-between">
          <span className="font-label-sm text-label-sm uppercase tracking-widest bg-surface px-4 text-secondary">Selected Engineering Work · 01 — 02</span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest bg-surface px-4 text-secondary">Employer Work · Open Source</span>
        </div>
      </div>

      <section className="hidden md:block max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg py-20 w-full space-y-24">
        {/* Project 01: FundsApp */}
        <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left editorial sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-4 lg:sticky lg:top-28">
            <div className="flex items-center gap-2">
              <span className="font-label-md text-label-md text-primary font-semibold uppercase tracking-widest">Project 01</span>
              <span className="w-2 h-2 rounded-full bg-surface-container-highest"></span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-secondary-container text-on-secondary-fixed text-label-sm uppercase font-label-sm">
                <Icon name="lock" className="text-[13px]" />
                Employer Work
              </span>
            </div>
            <h2 className="font-display text-display text-on-surface leading-tight">FundsApp</h2>
            <p className="font-headline-sm text-headline-sm italic text-secondary">Mutual Fund Investment Platform</p>
            <p className="font-body-md text-body-md text-on-surface leading-relaxed pt-2">
              A fintech and wealth-management application. Users sign up, complete KYC, get a risk profile, and then invest, including through SIPs. Thariq worked on it as a Software Engineer at Evoqins Pvt Ltd.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Engineering Disciplines</span>
              <div className="flex flex-wrap gap-1.5">
                {FUNDS_TAGS.map((t) => <Chip key={t}>{t}</Chip>)}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-surface-container-low text-secondary flex items-center gap-3 mt-2">
              <Icon name="verified" className="text-[18px]" />
              <span className="font-label-sm text-label-sm">Employer work at Evoqins Pvt Ltd. There is no public link.</span>
            </div>
          </div>

          {/* Right deep dive */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="p-8 rounded-2xl bg-surface-container-low shadow-sm flex flex-col gap-6">
              <div className="flex items-center justify-between pb-4 border-b border-surface-container-highest">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">FundsApp · User Journey</span>
                <span className="font-label-sm text-label-sm text-tertiary font-medium">Evoqins Pvt Ltd</span>
              </div>

              {/* Flow diagram (same shapes as the design; labels are the real user journey) */}
              <div className="w-full bg-surface-container-lowest rounded-xl p-6 shadow-sm overflow-x-auto">
                <svg className="w-full min-w-[560px] h-44 text-on-surface" fill="none" viewBox="0 0 680 180" role="img" aria-label="Sign up, then KYC, then risk profile, then invest">
                  <rect className="fill-surface-container-low stroke-surface-container-highest" height="70" rx="8" strokeWidth="1.5" width="120" x="20" y="55" />
                  <text className="fill-on-surface font-label-sm text-[11px] font-semibold" textAnchor="middle" x="80" y="86">SIGN UP</text>
                  <text className="fill-secondary font-label-sm text-[10px]" textAnchor="middle" x="80" y="104">Partner · Customer</text>

                  <path className="text-outline-variant" d="M140 90 H200" stroke="currentColor" strokeDasharray="4 4" strokeWidth="1.5" />
                  <polygon className="text-outline" fill="currentColor" points="200,90 193,86 193,94" />

                  <rect className="fill-surface-container-low stroke-surface-container-highest" height="70" rx="8" strokeWidth="1.5" width="136" x="202" y="55" />
                  <text className="fill-on-surface font-label-sm text-[11px] font-semibold" textAnchor="middle" x="270" y="86">KYC</text>
                  <text className="fill-secondary font-label-sm text-[10px]" textAnchor="middle" x="270" y="104">Know Your Customer</text>

                  <path className="text-primary-container" d="M338 90 H398" stroke="currentColor" strokeWidth="1.5" />
                  <polygon className="text-primary-container" fill="currentColor" points="398,90 391,86 391,94" />

                  <rect className="fill-surface-container-high stroke-outline" height="90" rx="8" strokeWidth="1.5" width="140" x="400" y="45" />
                  <text className="fill-primary font-label-sm text-[11px] font-semibold" textAnchor="middle" x="470" y="86">RISK PROFILE</text>
                  <text className="fill-on-surface font-label-sm text-[10px]" textAnchor="middle" x="470" y="104">Before Investing</text>

                  <path className="text-tertiary" d="M540 90 H600" stroke="currentColor" strokeWidth="1.5" />
                  <polygon className="text-tertiary" fill="currentColor" points="600,90 593,86 593,94" />

                  <rect className="fill-surface-container-low stroke-surface-container-highest" height="70" rx="8" strokeWidth="1.5" width="70" x="602" y="55" />
                  <text className="fill-on-surface font-label-sm text-[10px] font-semibold" textAnchor="middle" x="637" y="88">INVEST</text>
                  <text className="fill-tertiary font-label-sm text-[9px]" textAnchor="middle" x="637" y="104">Incl. SIPs</text>
                </svg>
              </div>

              {/* Feature cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-surface-container-lowest flex flex-col gap-2">
                  <span className="font-headline-md text-headline-md text-primary">15+</span>
                  <span className="font-label-sm text-label-sm uppercase text-secondary font-semibold">REST APIs</span>
                  <p className="font-body-sm text-body-sm text-secondary">Thariq built and worked with 15+ REST APIs on FundsApp.</p>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-lowest flex flex-col gap-2">
                  <span className="font-headline-md text-headline-md text-primary">JWT</span>
                  <span className="font-label-sm text-label-sm uppercase text-secondary font-semibold">Security</span>
                  <p className="font-body-sm text-body-sm text-secondary">Authentication is JWT-based. FundsApp also has MPIN-based security workflows.</p>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-lowest flex flex-col gap-2">
                  <span className="font-headline-md text-headline-md text-primary">SIP</span>
                  <span className="font-label-sm text-label-sm uppercase text-secondary font-semibold">Systematic Investment Plan</span>
                  <p className="font-body-sm text-body-sm text-secondary">A fixed amount invested at regular intervals.</p>
                </div>
              </div>
            </div>

            {/* Pull quote (a real line from faq.md) */}
            <div className="p-6 rounded-2xl bg-surface-container flex items-start gap-4">
              <Icon name="format_quote" className="text-primary-container text-[28px] shrink-0" />
              <div className="flex flex-col gap-1">
                <p className="font-headline-sm text-headline-sm italic text-on-surface">
                  “Thariq is strongest in frontend, especially React and Next.js.”
                </p>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary mt-1">— From faq.md</span>
              </div>
            </div>
          </div>
        </article>

        {/* Project 02: Career AI */}
        <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-12">
          {/* Left editorial sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-4 lg:sticky lg:top-28">
            <div className="flex items-center gap-2">
              <span className="font-label-md text-label-md text-primary font-semibold uppercase tracking-widest">Project 02</span>
              <span className="w-2 h-2 rounded-full bg-surface-container-highest"></span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-tertiary-container/20 text-on-tertiary-container text-label-sm uppercase font-label-sm">
                <Icon name="public" className="text-[13px]" />
                Open Source
              </span>
            </div>
            <h2 className="font-display text-display text-on-surface leading-tight">Career AI</h2>
            <p className="font-headline-sm text-headline-sm italic text-secondary">Proof-Based Job Search Assistant</p>
            <p className="font-body-md text-body-md text-on-surface leading-relaxed pt-2">
              A full stack web app built by Thariq. It helps with job search: skills, job matching, interview prep and application tracking. A skill is only verified when there is evidence for it.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Core Technologies</span>
              <div className="flex flex-wrap gap-1.5">
                {CAREER_TAGS_DESKTOP.map((t) => <Chip key={t}>{t}</Chip>)}
              </div>
            </div>
            <div className="pt-3">
              <a
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-inverse-surface text-inverse-on-surface hover:bg-on-surface transition-colors shadow-sm"
                href={GITHUB_CAREER_AI}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Icon name="terminal" className="text-[18px]" />
                <span className="font-label-md text-label-md uppercase tracking-wider">github.com/thariqdev/career-ai</span>
                <Icon name="arrow_outward" className="text-[14px]" />
              </a>
            </div>
          </div>

          {/* Right: what the app does */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="p-8 rounded-2xl bg-surface-container-low shadow-sm flex flex-col gap-6">
              <div className="flex items-center justify-between pb-3 border-b border-surface-container-highest">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">RAG Assistant</span>
                <span className="font-label-sm text-label-sm text-primary font-medium">Hybrid Retrieval: BM25 + Embeddings</span>
              </div>

              <div className="p-6 rounded-xl bg-surface-container-lowest flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">What It Does</span>
                  <div className="p-3.5 rounded-lg bg-surface-container-low font-label-sm text-label-sm text-on-surface flex items-center justify-between">
                    <span>Skills · job matching · interview prep · application tracking</span>
                    <Icon name="search" className="text-primary text-[18px]" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-surface-container border-l-2 border-primary-container flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm text-primary font-semibold">[project-careerai.md]</span>
                      <span className="font-label-sm text-label-sm text-tertiary">Skills</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-secondary">Each skill has a status: VERIFIED, PARTIAL, PROVISIONAL or NOT_VERIFIED.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-surface-container border-l-2 border-tertiary flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm text-tertiary font-semibold">[project-careerai.md]</span>
                      <span className="font-label-sm text-label-sm text-tertiary">Matching</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-secondary">Compares a job description with the user&apos;s skills and lists the gaps between them.</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-high flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Icon name="verified" className="text-tertiary text-[18px]" />
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-semibold">RAG Assistant</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface">It uses hybrid retrieval: BM25 keyword search plus embeddings. It also has read-only SQL tools.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-surface-container-lowest">
                  <span className="font-label-sm text-label-sm uppercase text-secondary">Optional AI Models</span>
                  <p className="font-body-sm text-body-sm text-on-surface mt-1">Extraction can use a local Ollama model or Claude. The AI models are optional.</p>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-lowest">
                  <span className="font-label-sm text-label-sm uppercase text-secondary">Tests &amp; Hosting</span>
                  <p className="font-body-sm text-body-sm text-on-surface mt-1">Tests use pytest. CI runs on GitHub Actions. Hosted on Vercel, Render and Neon.</p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
