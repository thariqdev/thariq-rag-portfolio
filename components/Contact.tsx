import Icon from "./Icon";

// Classes are copied from design/code.html (desktop) and design/code-res.html (phone).
// Contact details come from corpus/cv.md. There is no phone number and no address.
const EMAIL = "thariqmohammed0310@gmail.com";
const GITHUB_URL = "https://github.com/thariqdev";
const LINKEDIN_URL = "https://linkedin.com/in/mohammed-thariq-b11b673b2";

// Brand marks used on the phone rows (paths from the design)
const GITHUB_PATH =
  "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z";
const LINKEDIN_PATH =
  "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z";

export default function Contact() {
  return (
    // One anchor for both layouts, so the "Contact" links always have a visible target.
    <div id="contact" className="scroll-mt-20">
      {/* ================= PHONE: Dispatch / 03 (design/code-res.html) ================= */}
      <section className="flex flex-col gap-space-md px-margin py-space-md mb-8 md:hidden">
        <div className="flex items-baseline justify-between">
          <div className="flex items-center gap-2">
            <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase">Dispatch / 03</span>
            <span className="w-8 h-px bg-outline-variant"></span>
          </div>
          <span className="font-label-sm text-label-sm text-secondary">Direct Channels</span>
        </div>
        <div className="p-space-md rounded-2xl bg-surface-container flex flex-col gap-4 shadow-sm">
          <div className="flex flex-col gap-1">
            <span className="font-headline-sm text-headline-sm text-on-surface font-normal">Get in touch</span>
            <p className="font-body-sm text-body-sm text-secondary">Based in Dubai, UAE. Available to join immediately.</p>
          </div>
          <div className="flex flex-col gap-2.5 pt-1">
            {/* Email */}
            <a className="flex items-center justify-between p-3 rounded-xl bg-surface active:scale-[0.99] transition-all" href={`mailto:${EMAIL}`}>
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon name="alternate_email" className="text-primary text-[20px]" />
                <span className="font-body-sm text-body-sm text-on-surface font-medium truncate">{EMAIL}</span>
              </div>
              <Icon name="arrow_forward" className="text-secondary text-[18px]" />
            </a>
            {/* GitHub */}
            <a className="flex items-center justify-between p-3 rounded-xl bg-surface active:scale-[0.99] transition-all" href={GITHUB_URL} rel="noopener noreferrer" target="_blank">
              <div className="flex items-center gap-2.5 min-w-0">
                <svg className="w-5 h-5 fill-current text-on-surface shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                  <path d={GITHUB_PATH} />
                </svg>
                <span className="font-body-sm text-body-sm text-on-surface font-medium truncate">github.com/thariqdev</span>
              </div>
              <Icon name="arrow_forward" className="text-secondary text-[18px]" />
            </a>
            {/* LinkedIn */}
            <a className="flex items-center justify-between p-3 rounded-xl bg-surface active:scale-[0.99] transition-all" href={LINKEDIN_URL} rel="noopener noreferrer" target="_blank">
              <div className="flex items-center gap-2.5 min-w-0">
                <svg className="w-5 h-5 fill-[#0A66C2] shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                  <path d={LINKEDIN_PATH} />
                </svg>
                <span className="font-body-sm text-body-sm text-on-surface font-medium truncate">linkedin.com/in/mohammed-thariq-b11b673b2</span>
              </div>
              <Icon name="arrow_forward" className="text-secondary text-[18px]" />
            </a>
          </div>
        </div>
      </section>

      {/* ================= DESKTOP: editorial contact card (design/code.html) ================= */}
      <section className="hidden md:block max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg py-16 w-full">
        <div className="p-10 md:p-14 rounded-3xl bg-surface-container-low shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="inline-flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">Direct Communication</span>
            </div>
            <h2 className="font-display text-display text-on-surface leading-tight">Let&apos;s talk.</h2>
            <p className="font-body-lg text-body-lg text-secondary max-w-xl">Based in Dubai, UAE. Available to join immediately.</p>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-3 font-label-md text-label-md">
            <a className="p-4 rounded-xl bg-surface-container-lowest hover:bg-surface-container-highest transition-colors flex items-center justify-between group shadow-sm" href={`mailto:${EMAIL}`}>
              <div className="flex items-center gap-3">
                <Icon name="alternate_email" className="text-primary text-[20px]" />
                <span className="text-on-surface font-medium truncate">{EMAIL}</span>
              </div>
              <Icon name="arrow_forward" className="text-secondary group-hover:translate-x-1 transition-transform text-[18px]" />
            </a>
            <a className="p-4 rounded-xl bg-surface-container-lowest hover:bg-surface-container-highest transition-colors flex items-center justify-between group shadow-sm" href={GITHUB_URL} rel="noopener noreferrer" target="_blank">
              <div className="flex items-center gap-3">
                <Icon name="code" className="text-on-surface text-[20px]" />
                <span className="text-on-surface font-medium">github.com/thariqdev</span>
              </div>
              <Icon name="arrow_outward" className="text-secondary group-hover:translate-x-1 transition-transform text-[18px]" />
            </a>
            <a className="p-4 rounded-xl bg-surface-container-lowest hover:bg-surface-container-highest transition-colors flex items-center justify-between group shadow-sm" href={LINKEDIN_URL} rel="noopener noreferrer" target="_blank">
              <div className="flex items-center gap-3">
                <Icon name="share" className="text-[#0A66C2] text-[20px]" />
                <span className="text-on-surface font-medium truncate">linkedin.com/in/mohammed-thariq-b11b673b2</span>
              </div>
              <Icon name="arrow_outward" className="text-secondary group-hover:translate-x-1 transition-transform text-[18px]" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
