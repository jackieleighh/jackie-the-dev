import React from "react";
import "./App.css";
import ResponsiveNavbar from "./ResponsiveNavbar";
import ProjectCard from "./ProjectCard";
import FancyButton from "./FancyButton";

function App() {
  return (
    <div className="App">
      <ResponsiveNavbar />
      <div className="main-page">
        {/* Hero */}
        <div id="home" className="section">
          <h1>Hi, I'm Jackie.</h1>
          <p>freelance web & mobile developer</p>
        </div>

        {/* About */}
        <div id="about" className="section">
          <div className="section-header">about me</div>
          <p>
            Hi, I'm Jackie. I build things for the internet and your pocket. I'm
            on a mission to make the digital world a little prettier, one app at
            a time. TypeScript, React, and Flutter are my go-to's, but I'm
            always down to pick up something new.
          </p>
          <p>
            Landing pages, full-stack platforms, cross-platform mobile apps —
            you name it, I'm into it. I nerd out over the little things like fun
            animations, layouts that look good on every screen, and code that
            doesn't make future-me cry.
          </p>
          <p>Got something cool in mind? Let's build it.</p>
        </div>

        {/* Projects */}
        <div id="projects" className="section">
          <div className="section-header">my work</div>
          <div className="section-row">
            <ProjectCard
              name="TOTMS"
              description="A music festival companion app that keeps you connected to the lineup, schedule, and everything you need for the best festival experience."
              tags={["React", "Flutter", "Firebase"]}
              link="https://totms-app.web.app/"
            />
            <ProjectCard
              name="Heather with the Weather"
              description="Your sassy weather app that delivers forecasts with personality. Built for iOS and Android with a fun UI and reliable weather data."
              tags={["Flutter", "Android", "iOS"]}
              link="https://apps.apple.com/sa/app/heather-with-the-weather/id6759031148"
            />
          </div>
        </div>

        {/* Contact */}
        <div id="contact" className="section">
          <div className="section-header">get in touch</div>
          <div className="section-row">
            <FancyButton
              id="email-btn"
              buttonText="email"
              color="#ff4d6d"
              width={200}
              height={50}
              fontSize={16}
              borderWidth={3}
              onClick={() => window.open("mailto:jackieleighh@gmail.com")}
            />
            <FancyButton
              id="github-btn"
              buttonText="github"
              color="#ff4d6d"
              width={200}
              height={50}
              fontSize={16}
              borderWidth={3}
              onClick={() =>
                window.open("https://github.com/jackieleighh", "_blank")
              }
            />
            <FancyButton
              id="instagram-btn"
              buttonText="instagram"
              color="#ff4d6d"
              width={200}
              height={50}
              fontSize={16}
              borderWidth={3}
              onClick={() =>
                window.open("https://www.instagram.com/jack_inabox", "_blank")
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
