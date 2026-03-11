import React, { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";
import ProjectCard from "./ProjectCard";
import ContactCard from "./ContactCard";
import AnimatedLetters from "./AnimatedLetters";
import AnimatedBody from "./AnimatedBody";
import MouseGlow from "./MouseGlow";
import BackgroundBlobs from "./BackgroundBlobs";
import ScrollProgress from "./ScrollProgress";
import Sprinkles from "./Sprinkles";
import ResponsiveNavbar from "./ResponsiveNavbar";

function ScrollSection({
  id,
  children,
  header,
  bodyLines,
  trigger = false,
  onComplete,
  staggerItems,
  staggerClass = "stagger-card",
  immediate = false,
}: {
  id: string;
  children?: React.ReactNode;
  header: string;
  bodyLines?: string[];
  trigger?: boolean;
  onComplete?: () => void;
  staggerItems?: React.ReactNode[];
  staggerClass?: string;
  immediate?: boolean;
}) {
  const [inView, setInView] = useState(false);
  const [headerDone, setHeaderDone] = useState(false);
  const [bodyDone, setBodyDone] = useState(false);
  const [itemsRevealed, setItemsRevealed] = useState<number>(0);
  const [parallaxY, setParallaxY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);
  const onHeaderComplete = useCallback(() => setHeaderDone(true), []);
  const onBodyComplete = useCallback(() => setBodyDone(true), []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const offset = rect.top * -0.08;
      setParallaxY(offset);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const active = immediate ? trigger : trigger && inView;

  // Stagger items one by one after header completes
  useEffect(() => {
    if (!staggerItems || !headerDone || itemsRevealed >= staggerItems.length) return;
    const timer = setTimeout(() => {
      setItemsRevealed((n) => n + 1);
    }, 200);
    return () => clearTimeout(timer);
  }, [headerDone, itemsRevealed, staggerItems]);

  useEffect(() => {
    if (completedRef.current || !onComplete) return;
    if (bodyLines) {
      if (bodyDone) {
        completedRef.current = true;
        onComplete();
      }
    } else if (staggerItems) {
      if (itemsRevealed >= staggerItems.length) {
        completedRef.current = true;
        onComplete();
      }
    } else if (headerDone) {
      completedRef.current = true;
      onComplete();
    }
  }, [bodyDone, headerDone, bodyLines, staggerItems, itemsRevealed, onComplete]);

  return (
    <div id={id} className="section" ref={sectionRef}>
      <div className="section-header" style={{ transform: `translateY(${parallaxY}px)` }}>
        <AnimatedLetters
          text={header}
          trigger={active}
          letterDelay={35}
          onComplete={onHeaderComplete}
          typewriter
        />
      </div>
      {bodyLines ? (
        <AnimatedBody
          paragraphs={bodyLines}
          trigger={headerDone}
          onComplete={onBodyComplete}
        />
      ) : staggerItems ? (
        <div className="section-row">
          {staggerItems.map((item, i) => (
            <div
              key={i}
              className={`${staggerClass}${i < itemsRevealed ? ` ${staggerClass}--visible` : ""}`}
            >
              {item}
            </div>
          ))}
        </div>
      ) : (
        <div
          className={`scroll-reveal-block${active && headerDone ? " scroll-reveal-block--visible" : ""}`}
        >
          {children}
        </div>
      )}
    </div>
  );
}

function App() {
  const [heroReady, setHeroReady] = useState(false);
  const [line1Done, setLine1Done] = useState(false);
  const [line2Done, setLine2Done] = useState(false);
  const [taglineDone, setTaglineDone] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [aboutDone, setAboutDone] = useState(false);
  const [projectsDone, setProjectsDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (taglineDone) {
      const timer = setTimeout(() => setIntroComplete(true), 100);
      return () => clearTimeout(timer);
    }
  }, [taglineDone]);

  const onLine1Complete = useCallback(() => setLine1Done(true), []);
  const onLine2Complete = useCallback(() => setLine2Done(true), []);
  const onTaglineComplete = useCallback(() => setTaglineDone(true), []);
  const onAboutComplete = useCallback(() => setAboutDone(true), []);
  const onProjectsComplete = useCallback(() => setProjectsDone(true), []);

  return (
    <div className={`App${introComplete ? " intro-complete" : ""}`}>
      <ResponsiveNavbar visible={introComplete} />
      <ScrollProgress />
      <MouseGlow />
      <Sprinkles />
      <div className="main-page">
        {/* Hero */}
        <div id="home" className="section">
          <BackgroundBlobs />
          <h1>
            <AnimatedLetters
              text="Hi."
              trigger={heroReady}
              letterDelay={70}
              onComplete={onLine1Complete}
              typewriter
              showCursor={!line1Done}
            />
            <br />
            <AnimatedLetters
              text="I'm Jackie."
              trigger={line1Done}
              letterDelay={70}
              onComplete={onLine2Complete}
              typewriter
              showCursor={line1Done && !line2Done}
            />
          </h1>
          <p>
            <AnimatedLetters
              text="web & mobile dev"
              trigger={line2Done}
              letterDelay={30}
              onComplete={onTaglineComplete}
              typewriter
              showCursor={line2Done}
            />
          </p>
        </div>

        {/* About */}
        <ScrollSection
          id="about"
          header="about me"
          trigger={introComplete}
          onComplete={onAboutComplete}
          immediate
          bodyLines={[
            "I make things for your browser and your pocket. TypeScript, React, Flutter — give me a problem and I'll make it pretty. Big fan of weird animations, tiny details, and code that doesn't haunt me later.",
            "Got something fun in mind? Let's build it.",
          ]}
        />

        {/* Projects */}
        <ScrollSection
          id="projects"
          header="my work"
          trigger={aboutDone}
          onComplete={onProjectsComplete}
          staggerClass="stagger-card"
          staggerItems={[
            <ProjectCard
              name="Heather with the Weather"
              description="She tells you what to wear, if you should leave the house, and the vibe of the day. And she's pretty :)"
              tags={["Flutter", "Android", "iOS"]}
              link="https://apps.apple.com/sa/app/heather-with-the-weather/id6759031148"
            />,
            <ProjectCard
              name="TOTMS"
              description="Your festival buddy — schedules, maps, storm alerts (hope not). Everything you need, right in your pocket."
              tags={["React", "Flutter", "Firebase"]}
              link="https://totms-app.web.app/"
            />,
          ]}
        />

        {/* Contact */}
        <ScrollSection
          id="contact"
          header="get in touch"
          trigger={projectsDone}
          staggerClass="stagger-button"
          staggerItems={[
            <ContactCard
              label="email"
              href="mailto:jackieleighh@gmail.com"
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 4l-10 8L2 4" />
                </svg>
              }
            />,
            <ContactCard
              label="github"
              href="https://github.com/jackieleighh"
              external
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              }
            />,
            <ContactCard
              label="instagram"
              href="https://www.instagram.com/jack_inabox"
              external
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              }
            />,
          ]}
        />
      </div>
    </div>
  );
}

export default App;
