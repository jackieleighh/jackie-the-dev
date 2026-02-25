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
          <h1>
            Hi. <br />
            I'm Jackie.
          </h1>
          <p>freelance web & mobile developer</p>
        </div>

        {/* About */}
        <div id="about" className="section">
          <div className="section-header">about me</div>
          <p>
            I make things for your browser and your pocket. TypeScript, React,
            Flutter — give me a problem and I'll make it pretty. Big fan of
            weird animations, tiny details, and code that doesn't haunt me
            later.
          </p>
          <p>Got something fun in mind? Let's build it.</p>
        </div>

        {/* Projects */}
        <div id="projects" className="section">
          <div className="section-header">my work</div>
          <div className="section-row">
            <ProjectCard
              name="TOTMS"
              description="Your festival buddy — schedules, maps, storm alerts (hope not). Everything you need, right in your pocket."
              tags={["React", "Flutter", "Firebase"]}
              link="https://totms-app.web.app/"
            />
            <ProjectCard
              name="Heather with the Weather"
              description="She tells you what to wear, if you should leave the house, and the vibe of the day. And she's pretty :)"
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
              color="#ff44c8"
              width={160}
              height={40}
              fontSize={16}
              borderWidth={3}
              onClick={() => window.open("mailto:jackieleighh@gmail.com")}
            />
            <FancyButton
              id="github-btn"
              buttonText="github"
              color="#ff44c8"
              width={160}
              height={40}
              fontSize={16}
              borderWidth={3}
              onClick={() =>
                window.open("https://github.com/jackieleighh", "_blank")
              }
            />
            <FancyButton
              id="instagram-btn"
              buttonText="instagram"
              color="#ff44c8"
              width={160}
              height={40}
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
