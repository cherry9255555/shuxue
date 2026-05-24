"use client";

import { useEffect, useState } from "react";

type Sparkle = {
  id: number;
  top: number;
  left: number;
  size: number;
  delay: number;
};

const COUNT = 22;

function makeSparkle(id: number): Sparkle {
  return {
    id,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: 6 + Math.random() * 10,
    delay: Math.random() * 4,
  };
}

export default function Sparkles() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    setSparkles(Array.from({ length: COUNT }, (_, i) => makeSparkle(i)));
  }, []);

  if (sparkles.length === 0) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {sparkles.map((s) => (
        <span
          key={s.id}
          style={{
            position: "absolute",
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animation: `shimmer 3.5s ease-in-out ${s.delay}s infinite`,
            willChange: "opacity, transform",
          }}
        >
          <svg viewBox="0 0 24 24" width="100%" height="100%">
            <path
              d="M12 0 L13.5 9 L24 12 L13.5 15 L12 24 L10.5 15 L0 12 L10.5 9 Z"
              fill="#f4d35e"
              opacity="0.85"
            />
          </svg>
        </span>
      ))}
    </div>
  );
}
