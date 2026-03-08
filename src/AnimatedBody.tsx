import React, { useEffect, useRef, useLayoutEffect, useState, useCallback } from "react";

interface AnimatedBodyProps {
  paragraphs: string[];
  trigger: boolean;
  letterDelay?: number;
  onComplete?: () => void;
}

function AnimatedBody({
  paragraphs,
  trigger,
  letterDelay = 10,
  onComplete,
}: AnimatedBodyProps) {
  const [visible, setVisible] = useState(false);
  const [delays, setDelays] = useState<Map<string, number>>(new Map());
  const spansRef = useRef<Map<string, HTMLSpanElement>>(new Map());
  const calledRef = useRef(false);
  const measuredRef = useRef(false);

  const setSpanRef = useCallback(
    (key: string) => (el: HTMLSpanElement | null) => {
      if (el) {
        spansRef.current.set(key, el);
      }
    },
    []
  );

  // Measure line breaks and compute column-based delays
  useLayoutEffect(() => {
    if (!trigger || measuredRef.current) return;

    requestAnimationFrame(() => {
      const spans = spansRef.current;
      if (spans.size === 0) return;

      // Group all characters by their offsetTop (visual line)
      const lineGroups = new Map<number, string[]>();
      spans.forEach((el, key) => {
        const top = el.offsetTop;
        if (!lineGroups.has(top)) {
          lineGroups.set(top, []);
        }
        lineGroups.get(top)!.push(key);
      });

      // For each visual line, assign delay based on column position
      const newDelays = new Map<string, number>();
      lineGroups.forEach((keys) => {
        keys.forEach((key, colIndex) => {
          newDelays.set(key, colIndex * letterDelay);
        });
      });

      measuredRef.current = true;
      setDelays(newDelays);
      setVisible(true);
    });
  }, [trigger, letterDelay]);

  // Fire onComplete after the longest line finishes
  useEffect(() => {
    if (!visible || calledRef.current || !onComplete) return;
    calledRef.current = true;

    // Find the max delay
    let maxDelay = 0;
    delays.forEach((d) => {
      if (d > maxDelay) maxDelay = d;
    });

    const timer = setTimeout(onComplete, maxDelay * 0.7);
    return () => clearTimeout(timer);
  }, [visible, delays, onComplete]);

  // Split each paragraph into words, wrapping each word in a nowrap span
  // so line breaks only happen between words
  return (
    <>
      {paragraphs.map((text, pIdx) => {
        let charIndex = 0;
        const words = text.split(" ");
        return (
          <p key={pIdx}>
            {words.map((word, wIdx) => {
              const startIdx = charIndex;
              charIndex += word.length + 1; // +1 for the space
              return (
                <React.Fragment key={wIdx}>
                  <span style={{ whiteSpace: "nowrap" }}>
                    {word.split("").map((char, i) => {
                      const key = `${pIdx}-${startIdx + i}`;
                      return (
                        <span
                          key={key}
                          ref={setSpanRef(key)}
                          className={`animated-letter${visible ? " animated-letter--visible" : ""}`}
                          style={{
                            transitionDelay: visible ? `${delays.get(key) ?? 0}ms` : undefined,
                          }}
                        >
                          {char}
                        </span>
                      );
                    })}
                  </span>
                  {wIdx < words.length - 1 && (() => {
                    const spaceKey = `${pIdx}-${startIdx + word.length}`;
                    return (
                      <span
                        ref={setSpanRef(spaceKey)}
                        className={`animated-letter${visible ? " animated-letter--visible" : ""}`}
                        style={{
                          transitionDelay: visible ? `${delays.get(spaceKey) ?? 0}ms` : undefined,
                        }}
                      >
                        {"\u00A0"}
                      </span>
                    );
                  })()}
                </React.Fragment>
              );
            })}
          </p>
        );
      })}
    </>
  );
}

export default AnimatedBody;
