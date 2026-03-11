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
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [visibleCount, setVisibleCount] = useState(0);

  // Typewriter mode: reveal one character at a fixed interval
  // Uses setInterval instead of requestAnimationFrame so the speed stays
  // consistent even when the element is off-screen (rAF gets throttled).
  useEffect(() => {
    if (!typewriter || !trigger) return;

    let count = 0;
    const delay = startDelay > 0 ? startDelay : undefined;

    const start = () => {
      const id = setInterval(() => {
        count = Math.min(count + 1, text.length);
        setVisibleCount(count);
        if (count >= text.length) {
          clearInterval(id);
        }
      }, Math.max(letterDelay, 1));
      return id;
    };

    if (delay) {
      const timeout = setTimeout(() => {
        intervalRef.current = start();
      }, delay);
      return () => {
        clearTimeout(timeout);
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }

    const id = start();
    return () => clearInterval(id);
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
