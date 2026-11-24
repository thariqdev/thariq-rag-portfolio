import SiteHeader from "../components/SiteHeader";
import Hero from "../components/Hero";
import About from "../components/About";
import Record from "../components/Record";
import Projects from "../components/Projects";
import Proof from "../components/Proof";
import Skills from "../components/Skills";
import Education from "../components/Education";
import Contact from "../components/Contact";
import SiteFooter from "../components/SiteFooter";
import MobileTabBar from "../components/MobileTabBar";
import Motion from "../components/Motion";
import Ticker from "../components/Ticker";

// The page is the sections in order. The "fs" class on main scopes the focus style in factsheet.css.
export default function Home() {
  return (
    <>
      <Motion />
      <SiteHeader />
      {/* pb-16 on phones keeps the content clear of the tab bar */}
      <main id="top" className="fs w-full bg-surface pb-16 md:pb-0">
        <Hero />
        <Ticker />
        <About />
        <Record />
        <Projects />
        <Proof />
        <Skills />
        <Education />
        <Contact />
      </main>
      <SiteFooter />
      <MobileTabBar />
    </>
  );
}
