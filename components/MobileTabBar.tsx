import Icon from "./Icon";

// Bottom tab bar, phones only. The design had Notes and About tabs, but this page has no such
// sections, so those two tabs jump to Skills and Contact instead.
const TABS = [
  { icon: "auto_stories", label: "Index", href: "#top", active: true },
  { icon: "terminal", label: "Works", href: "#work", active: false },
  { icon: "history_edu", label: "Skills", href: "#skills", active: false },
  { icon: "badge", label: "Contact", href: "#contact", active: false },
];

export default function MobileTabBar() {
  return (
    <nav className="fixed bottom-0 z-50 w-full bg-surface/90 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(27,26,23,0.04)] backdrop-blur-xl md:hidden">
      <div className="mx-auto flex h-16 max-w-md items-center justify-around px-margin">
        {TABS.map((tab) => (
          <a
            key={tab.label}
            href={tab.href}
            className={`flex min-h-[44px] min-w-[56px] flex-col items-center justify-center gap-0.5 transition-colors ${
              tab.active ? "text-primary" : "text-secondary hover:text-on-surface"
            }`}
          >
            <Icon name={tab.icon} className="text-[20px]" />
            <span className="font-label text-label-sm">{tab.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
