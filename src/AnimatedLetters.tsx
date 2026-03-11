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

  // Typewriter mode: reveal one character per frame for smooth animation
  useEffect(() => {
    if (!typewriter || !trigger) return;

    let rafId: number;
    let count = 0;
    let lastTime = 0;
    let started = false;

    const animate = (timestamp: number) => {
      if (!started) {
        lastTime = timestamp + startDelay;
        started = true;
      }
      if (timestamp < lastTime) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      if (timestamp - lastTime >= letterDelay) {
        count = Math.min(count + 1, text.length);
        setVisibleCount(count);
        lastTime = timestamp;
      }
      if (count < text.length) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [typewriter, trigger, text.length, letterDelay, startDelay]);

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
        {text.slice(0, visibleCount)}
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
