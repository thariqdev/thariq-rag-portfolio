import SiteHeader from "../components/SiteHeader";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import SiteFooter from "../components/SiteFooter";
import MobileTabBar from "../components/MobileTabBar";

// The page is just the sections in order. Each section file holds a phone layout and a desktop layout.
export default function Home() {
  return (
    <>
      <SiteHeader />
      {/* pb-24 on phones keeps the content clear of the tab bar and the chat button */}
      <main id="top" className="w-full bg-surface pb-24 pt-16 md:pb-0 md:pt-20">
        <Hero />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <SiteFooter />
      <MobileTabBar />
    </>
  );
}
