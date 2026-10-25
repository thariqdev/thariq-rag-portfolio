// Classes are copied from the footer in design/code.html. The phone design has no footer (it uses the
// bottom tab bar), so this shows on desktop only. pb-24 is my addition: it keeps the fixed chat
// button from covering the footer text.
export default function SiteFooter() {
  return (
    <footer className="hidden md:block w-full bg-surface-container-low mt-space-xl pb-24">
      <div className="max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg py-space-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-space-lg">
        <div className="flex flex-col gap-space-xs">
          <span className="font-headline-sm text-headline-sm text-on-surface">B. Mohammed Thariq</span>
          <p className="font-body-sm text-body-sm text-secondary">Full Stack Software Engineer based in Dubai, UAE.</p>
        </div>
        <div className="flex flex-wrap items-center gap-space-md">
          <span className="font-label-sm text-label-sm text-secondary">© B Mohammed Thariq</span>
          <span className="text-secondary">•</span>
          <span className="font-label-sm text-label-sm text-secondary uppercase">Typography in Newsreader &amp; Plus Jakarta Sans</span>
        </div>
      </div>
    </footer>
  );
}
