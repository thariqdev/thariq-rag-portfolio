import Icon from "./Icon";

// Classes are copied from design/code.html (desktop) and design/code-res.html (phone).
// Every skill below is listed in corpus/cv.md ("Skills: Frontend", "Skills: Backend and Databases",
// "Skills: Tools and Domain"). Rows only join cv.md skills with "&"; none are added.
const DESKTOP_CARDS = [
  {
    icon: "terminal",
    title: "Frontend",
    sub: "Interfaces & State",
    rows: ["React.js & Next.js", "JavaScript & TypeScript", "Redux Toolkit", "Bootstrap"],
  },
  {
    icon: "database",
    title: "Backend & Databases",
    sub: "APIs & Data",
    rows: ["Python & FastAPI", "REST APIs & JWT authentication", "SQLAlchemy & PostgreSQL", "Node.js & Express.js", "Database design"],
  },
  {
    icon: "account_balance",
    title: "Tools & Domain",
    sub: "Workflow & Fintech",
    rows: [
      "Git & GitHub",
      "Postman & Swagger (OpenAPI)",
      "Agile practices",
      "Fintech & wealth management",
      "Mutual funds & investment platforms",
      "KYC workflows",
    ],
  },
];

const PHONE_GROUPS = [
  { icon: "terminal", title: "Frontend", items: ["React.js", "Next.js", "JavaScript", "TypeScript", "Redux Toolkit", "Bootstrap"] },
  {
    icon: "schema",
    title: "Backend & Databases",
    items: ["Python", "FastAPI", "REST APIs", "SQLAlchemy", "JWT authentication", "Node.js", "Express.js", "PostgreSQL", "Database design"],
  },
  {
    icon: "account_balance",
    title: "Tools & Domain",
    items: ["Git", "GitHub", "Postman", "Swagger (OpenAPI)", "Agile practices", "Fintech", "Wealth management", "Mutual funds", "Investment platforms", "KYC workflows"],
  },
];

export default function Skills() {
  return (
    // One anchor for both layouts, so the "Skills" links always have a visible target.
    <div id="skills" className="scroll-mt-20">
      {/* ================= PHONE: Index / 02 (design/code-res.html) ================= */}
      <section className="flex flex-col gap-space-md px-margin py-space-md md:hidden">
        <div className="flex items-baseline justify-between">
          <div className="flex items-center gap-2">
            <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase">Index / 02</span>
            <span className="w-8 h-px bg-outline-variant"></span>
          </div>
          <span className="font-label-sm text-label-sm text-secondary">Skills</span>
        </div>
        <div className="flex flex-col gap-3">
          {PHONE_GROUPS.map((group) => (
            <div key={group.title} className="p-4 rounded-xl bg-surface-container-low shadow-sm flex flex-col gap-2.5">
              <div className="flex items-center gap-2">
                <Icon name={group.icon} className="text-primary text-[18px]" />
                <span className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider font-medium">{group.title}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span key={item} className="px-2.5 py-1 rounded-lg bg-surface text-on-surface font-label-sm text-label-sm">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= DESKTOP: three skill cards (design/code.html) ================= */}
      <section className="hidden md:block max-w-7xl mx-auto px-margin md:px-margin-md lg:px-margin-lg py-16 w-full">
        <div className="mb-10 flex flex-col gap-2">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">Skills &amp; Domain Knowledge</span>
          <h2 className="font-display text-headline-lg text-on-surface">What Thariq works with.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DESKTOP_CARDS.map((card) => (
            <div key={card.title} className="p-8 rounded-2xl bg-surface-container-low shadow-sm flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                  <Icon name={card.icon} className="text-[20px]" />
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">{card.title}</h3>
                  <span className="font-label-sm text-label-sm text-secondary uppercase">{card.sub}</span>
                </div>
              </div>
              <div className="space-y-3 font-body-sm text-body-sm">
                {card.rows.map((row) => (
                  <div key={row} className="p-3 rounded-lg bg-surface-container-lowest flex items-center justify-between">
                    <span className="font-medium text-on-surface">{row}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
