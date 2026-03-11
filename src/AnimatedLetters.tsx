import React, { useEffect, useRef, useState } from "react";

interface AnimatedLettersProps {
  text: string;
  startDelay?: number;
  letterDelay?: number;
  trigger?: boolean;
  className?: string;
  onComplete?: () => void;
  typewriter?: boolean;
  showCursor?: boolean;
}

function AnimatedLetters({
  text,
  startDelay = 0,
  letterDelay = 50,
  trigger = true,
  className,
  onComplete,
  typewriter = false,
  showCursor = false,
}: AnimatedLettersProps) {
  const calledRef = useRef(false);
  const [visibleCount, setVisibleCount] = useState(0);

  // Typewriter mode: reveal characters one by one via state
  useEffect(() => {
    if (!typewriter || !trigger) return;
    if (visibleCount >= text.length) return;

    const delay = visibleCount === 0 ? startDelay + letterDelay : letterDelay;
    const timer = setTimeout(() => setVisibleCount((v) => v + 1), delay);
    return () => clearTimeout(timer);
  }, [typewriter, trigger, visibleCount, text.length, letterDelay, startDelay]);

  // onComplete callback
  useEffect(() => {
    if (calledRef.current || !onComplete) return;

    if (typewriter) {
      if (visibleCount >= text.length) {
        calledRef.current = true;
        onComplete();
      }
    } else if (trigger) {
      calledRef.current = true;
      const totalDuration = startDelay + text.length * letterDelay * 0.75;
      const timer = setTimeout(onComplete, totalDuration);
      return () => clearTimeout(timer);
    }
  }, [typewriter, trigger, onComplete, startDelay, text.length, letterDelay, visibleCount]);

  // Typewriter rendering
  if (typewriter) {
    return (
      <span className={className}>
        {text.slice(0, visibleCount).split("").map((char, i) => (
          <span key={i} style={{ display: "inline" }}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
        {showCursor && trigger && <span className="hero-cursor" />}
      </span>
    );
  }

  // Default slide-in rendering
  return (
    <span className={className}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className={`animated-letter${trigger ? " animated-letter--visible" : ""}`}
          style={{
            transitionDelay: `${index * letterDelay + startDelay}ms`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export default AnimatedLetters;
