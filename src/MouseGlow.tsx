import React, { useEffect, useState, useRef, useCallback } from "react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
}

let sparkleId = 0;

function MouseGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hasHover, setHasHover] = useState(false);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const lastSparkle = useRef(0);

  const spawnSparkle = useCallback((x: number, y: number) => {
    const now = Date.now();
    if (now - lastSparkle.current < 40) return;
    lastSparkle.current = now;

    const id = ++sparkleId;
    setSparkles((prev) => {
      const next = [...prev, { id, x, y }];
      return next.length > 20 ? next.slice(-20) : next;
    });

    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== id));
    }, 600);
  }, []);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover)").matches;
    setHasHover(canHover);

    if (!canHover) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      spawnSparkle(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [spawnSparkle]);

  if (!hasHover) return null;

  return (
    <>
      <div
        className="mouse-glow"
        style={{ left: position.x, top: position.y }}
      >
        <svg width="24" height="32" viewBox="0 0 20 30" fill="none">
          <path
            d="M 1 1 L 1 23 L 6 18 L 11 28 L 14 26.5 L 9 17 L 17 17 Z"
            stroke="rgba(0, 212, 184, 0.8)"
            strokeWidth="1.5"
            fill="transparent"
          />
        </svg>
      </div>
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="sparkle"
          style={{ left: s.x, top: s.y }}
        />
      ))}
    </>
  );
}

export default MouseGlow;
