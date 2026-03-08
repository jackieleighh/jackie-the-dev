import React, { useEffect, useRef } from "react";

interface AnimatedLettersProps {
  text: string;
  startDelay?: number;
  letterDelay?: number;
  trigger?: boolean;
  className?: string;
  onComplete?: () => void;
}

function AnimatedLetters({
  text,
  startDelay = 0,
  letterDelay = 50,
  trigger = true,
  className,
  onComplete,
}: AnimatedLettersProps) {
  const calledRef = useRef(false);

  useEffect(() => {
    if (trigger && onComplete && !calledRef.current) {
      calledRef.current = true;
      const totalDuration = startDelay + text.length * letterDelay * 0.75;
      const timer = setTimeout(onComplete, totalDuration);
      return () => clearTimeout(timer);
    }
  }, [trigger, onComplete, startDelay, text.length, letterDelay]);

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
