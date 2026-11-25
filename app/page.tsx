import SiteHeader from "../components/SiteHeader";
import Hero from "../components/Hero";
import Ticker from "../components/Ticker";
import Orbit from "../components/Orbit";
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

// The page is just the sections in order. Motion runs the scroll animations and the progress bar.
// The "fs" class on main scopes the section styles in folio.css.
export default function Home() {
  return (
    <>
      <Motion />
      <SiteHeader />
      {/* pb-24 on phones keeps the content clear of the tab bar and the chat button */}
      <main id="top" className="fs w-full bg-surface pb-24 pt-16 md:pb-0 md:pt-20">
        <Hero />
        <Ticker />
        <Orbit />
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
