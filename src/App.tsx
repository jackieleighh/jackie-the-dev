import React, { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";
import ResponsiveNavbar from "./ResponsiveNavbar";
import ProjectCard from "./ProjectCard";
import FancyButton from "./FancyButton";
import AnimatedLetters from "./AnimatedLetters";
import AnimatedBody from "./AnimatedBody";
import MouseGlow from "./MouseGlow";

function ScrollSection({
  id,
  children,
  header,
  bodyLines,
  trigger = false,
  onComplete,
  staggerItems,
}: {
  id: string;
  children?: React.ReactNode;
  header: string;
  bodyLines?: string[];
  trigger?: boolean;
  onComplete?: () => void;
  staggerItems?: React.ReactNode[];
}) {
  const [inView, setInView] = useState(false);
  const [headerDone, setHeaderDone] = useState(false);
  const [bodyDone, setBodyDone] = useState(false);
  const [itemsRevealed, setItemsRevealed] = useState<number>(0);
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

  const active = trigger && inView;

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
      <div className="section-header">
        <AnimatedLetters
          text={header}
          trigger={active}
          letterDelay={35}
          onComplete={onHeaderComplete}
        />
      </div>
      {bodyLines ? (
        <AnimatedBody
          paragraphs={bodyLines}
          trigger={headerDone}
          letterDelay={10}
          onComplete={onBodyComplete}
        />
      ) : staggerItems ? (
        <div className="section-row">
          {staggerItems.map((item, i) => (
            <div
              key={i}
              className={`stagger-item${i < itemsRevealed ? " stagger-item--visible" : ""}`}
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
      <ResponsiveNavbar />
      <MouseGlow />
      <div className="main-page">
        {/* Hero */}
        <div id="home" className="section">
          <h1>
            <AnimatedLetters
              text="Hi."
              trigger={heroReady}
              letterDelay={70}
              onComplete={onLine1Complete}
            />
            <br />
            <AnimatedLetters
              text="I'm Jackie."
              trigger={line1Done}
              letterDelay={70}
              onComplete={onLine2Complete}
            />
          </h1>
          <p>
            <AnimatedLetters
              text="web & mobile dev"
              trigger={line2Done}
              letterDelay={30}
              onComplete={onTaglineComplete}
            />
          </p>
        </div>

        {/* About */}
        <ScrollSection
          id="about"
          header="about me"
          trigger={introComplete}
          onComplete={onAboutComplete}
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
          staggerItems={[
            <ProjectCard
              name="TOTMS"
              description="Your festival buddy — schedules, maps, storm alerts (hope not). Everything you need, right in your pocket."
              tags={["React", "Flutter", "Firebase"]}
              link="https://totms-app.web.app/"
            />,
            <ProjectCard
              name="Heather with the Weather"
              description="She tells you what to wear, if you should leave the house, and the vibe of the day. And she's pretty :)"
              tags={["Flutter", "Android", "iOS"]}
              link="https://apps.apple.com/sa/app/heather-with-the-weather/id6759031148"
            />,
          ]}
        />

        {/* Contact */}
        <ScrollSection
          id="contact"
          header="get in touch"
          trigger={projectsDone}
          staggerItems={[
            <FancyButton
              id="email-btn"
              buttonText="email"
              color="#ff6bcc"
              width={160}
              height={40}
              fontSize={16}
              borderWidth={1.5}
              onClick={() => window.open("mailto:jackieleighh@gmail.com")}
            />,
            <FancyButton
              id="github-btn"
              buttonText="github"
              color="#ff6bcc"
              width={160}
              height={40}
              fontSize={16}
              borderWidth={1.5}
              onClick={() =>
                window.open("https://github.com/jackieleighh", "_blank")
              }
            />,
            <FancyButton
              id="instagram-btn"
              buttonText="instagram"
              color="#ff6bcc"
              width={160}
              height={40}
              fontSize={16}
              borderWidth={1.5}
              onClick={() =>
                window.open("https://www.instagram.com/jack_inabox", "_blank")
              }
            />,
          ]}
        />
      </div>
    </div>
  );
}

export default App;
