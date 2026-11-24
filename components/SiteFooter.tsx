// Based on the footer in design/code.html. The phone design has no footer (it uses the bottom tab bar),
// so this shows on desktop and tablet only.
// Changes from the design: below 1024px the two small lines stack and sit on the right, so the "•" never
// hangs at the end of a line. pb-28 (plus the 56px below the text) leaves room for the fixed chat button
// AND its greeting bubble, so neither covers the footer text at the bottom of the page.
export default function SiteFooter() {
  return (
    <footer className="mt-space-xl hidden w-full bg-surface-container-low pb-28 md:block">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-space-lg px-margin md:flex-row md:items-center md:px-margin-md lg:px-margin-lg py-space-xl">
        <div className="flex flex-col gap-space-xs">
          <span className="font-headline-sm text-headline-sm text-on-surface">B. Mohammed Thariq</span>
          <p className="font-body-sm text-body-sm text-secondary">Full Stack Software Engineer based in Dubai, UAE.</p>
        </div>
        <div className="flex shrink-0 flex-col gap-1 md:items-end lg:flex-row lg:items-center lg:gap-space-md">
          <span className="font-label-sm text-label-sm text-secondary">© B Mohammed Thariq</span>
          <span aria-hidden="true" className="hidden text-secondary lg:inline">•</span>
          <span className="font-label-sm text-label-sm uppercase text-secondary">Typography in Newsreader &amp; Plus Jakarta Sans</span>
        </div>
      </div>
    </footer>
  );
}
