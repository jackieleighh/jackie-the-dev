import React from "react";

const sprinkles = [
  { char: "\u2726", top: "5%", left: "6%", size: 14, delay: 0, color: "#ff6bcc" },
  { char: "\u2727", top: "8%", right: "12%", size: 10, delay: 4, color: "#d0e840" },
  { char: "\u2726", top: "15%", left: "18%", size: 8, delay: 11, color: "#ff7a3d" },
  { char: "\u2727", top: "18%", right: "5%", size: 16, delay: 1, color: "#ff6bcc" },
  { char: "\u2726", top: "25%", left: "3%", size: 12, delay: 7, color: "#d0e840" },
  { char: "\u2727", top: "30%", right: "18%", size: 9, delay: 3, color: "#ff7a3d" },
  { char: "\u2726", top: "38%", left: "10%", size: 11, delay: 8, color: "#ff6bcc" },
  { char: "\u2727", top: "35%", right: "3%", size: 14, delay: 5, color: "#d0e840" },
  { char: "\u2726", top: "45%", left: "5%", size: 7, delay: 10, color: "#ff7a3d" },
  { char: "\u2727", top: "48%", right: "8%", size: 13, delay: 2, color: "#ff6bcc" },
  { char: "\u2726", top: "55%", left: "15%", size: 10, delay: 6, color: "#d0e840" },
  { char: "\u2727", top: "58%", right: "14%", size: 8, delay: 9, color: "#ff7a3d" },
  { char: "\u2726", top: "65%", left: "4%", size: 15, delay: 0, color: "#ff6bcc" },
  { char: "\u2727", top: "68%", right: "6%", size: 11, delay: 7, color: "#d0e840" },
  { char: "\u2726", top: "75%", left: "12%", size: 9, delay: 3, color: "#ff7a3d" },
  { char: "\u2727", top: "78%", right: "16%", size: 12, delay: 11, color: "#ff6bcc" },
  { char: "\u2726", top: "85%", left: "7%", size: 10, delay: 5, color: "#d0e840" },
  { char: "\u2727", top: "90%", right: "4%", size: 13, delay: 1, color: "#ff7a3d" },
  { char: "\u2726", top: "93%", left: "20%", size: 8, delay: 8, color: "#ff6bcc" },
  { char: "\u2727", top: "12%", left: "25%", size: 7, delay: 6, color: "#d0e840" },
];

function Sprinkles() {
  return (
    <div className="sprinkles" aria-hidden="true">
      {sprinkles.map((s, i) => (
        <span
          key={i}
          className="sprinkle"
          style={{
            top: s.top,
            left: s.left,
            right: (s as any).right,
            fontSize: s.size,
            color: s.color,
            animationDelay: `0s, ${s.delay}s`,
            "--drift-duration": `${12 + (i % 5) * 3}s`,
            "--fade-duration": `${6 + (i % 4) * 2}s`,
          } as React.CSSProperties}
        >
          {s.char}
        </span>
      ))}
    </div>
  );
}

export default Sprinkles;
