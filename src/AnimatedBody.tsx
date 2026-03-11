import { useEffect, useRef } from "react";

interface AnimatedBodyProps {
  paragraphs: string[];
  trigger: boolean;
  onComplete?: () => void;
}

function AnimatedBody({
  paragraphs,
  trigger,
  onComplete,
}: AnimatedBodyProps) {
  const calledRef = useRef(false);

  useEffect(() => {
    if (calledRef.current || !onComplete || !trigger) return;
    calledRef.current = true;
    const timer = setTimeout(onComplete, 800);
    return () => clearTimeout(timer);
  }, [trigger, onComplete]);

  return (
    <>
      {paragraphs.map((text, i) => (
        <p
          key={i}
          className={`fade-paragraph${trigger ? " fade-paragraph--visible" : ""}`}
        >
          {text}
        </p>
      ))}
    </>
  );
}

export default AnimatedBody;
