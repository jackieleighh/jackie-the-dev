import React, { useEffect, useState } from "react";

function MouseGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hasHover, setHasHover] = useState(false);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover)").matches;
    setHasHover(canHover);

    if (!canHover) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!hasHover) return null;

  return (
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
  );
}

export default MouseGlow;
