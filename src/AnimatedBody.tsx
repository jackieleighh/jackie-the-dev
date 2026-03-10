import { useEffect, useRef, useState } from "react";

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
  const [visibleCount, setVisibleCount] = useState(0);
  const calledRef = useRef(false);

  useEffect(() => {
    if (!trigger || visibleCount >= paragraphs.length) return;
    const timer = setTimeout(
      () => setVisibleCount((n) => n + 1),
      visibleCount === 0 ? 0 : 200
    );
    return () => clearTimeout(timer);
  }, [trigger, visibleCount, paragraphs.length]);

  useEffect(() => {
    if (calledRef.current || !onComplete) return;
    if (visibleCount >= paragraphs.length) {
      calledRef.current = true;
      const timer = setTimeout(onComplete, 800);
      return () => clearTimeout(timer);
    }
  }, [visibleCount, paragraphs.length, onComplete]);

  return (
    <>
      {paragraphs.map((text, i) => (
        <p
          key={i}
          className={`fade-up-paragraph${i < visibleCount ? " fade-up-paragraph--visible" : ""}`}
        >
          {text}
        </p>
      ))}
    </>
  );
}

export default AnimatedBody;
