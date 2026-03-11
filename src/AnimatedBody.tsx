import { useCallback, useEffect, useRef, useState } from "react";
import AnimatedLetters from "./AnimatedLetters";

interface AnimatedBodyProps {
  paragraphs: string[];
  trigger: boolean;
  letterDelay?: number;
  onComplete?: () => void;
}

function AnimatedBody({
  paragraphs,
  trigger,
  letterDelay = 18,
  onComplete,
}: AnimatedBodyProps) {
  const [activeParagraph, setActiveParagraph] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const calledRef = useRef(false);

  useEffect(() => {
    if (trigger && activeParagraph === -1) {
      setActiveParagraph(0);
      setIsTyping(true);
    }
  }, [trigger, activeParagraph]);

  const handleParagraphComplete = useCallback(
    (index: number) => {
      setIsTyping(false);
      if (index < paragraphs.length - 1) {
        setTimeout(() => {
          setActiveParagraph(index + 1);
          setIsTyping(true);
        }, 300);
      } else if (!calledRef.current) {
        calledRef.current = true;
        onComplete?.();
      }
    },
    [paragraphs.length, onComplete]
  );

  return (
    <>
      {paragraphs.map((text, i) => (
        <p key={i}>
          <AnimatedLetters
            text={text}
            typewriter
            showCursor={activeParagraph === i && isTyping}
            trigger={activeParagraph >= i}
            letterDelay={letterDelay}
            onComplete={() => handleParagraphComplete(i)}
          />
        </p>
      ))}
    </>
  );
}

export default AnimatedBody;
