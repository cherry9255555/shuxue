"use client";

import { useEffect, useState } from "react";

type Petal = {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  variant: "fall" | "fall-slow";
  hue: number;
};

const COUNT = 16;

function makePetal(id: number): Petal {
  return {
    id,
    left: Math.random() * 100,
    size: 10 + Math.random() * 14,
    delay: Math.random() * 14,
    duration: 14 + Math.random() * 12,
    variant: Math.random() > 0.5 ? "fall" : "fall-slow",
    hue: 340 + Math.random() * 20,
  };
}

export default function SakuraParticles() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    setPetals(Array.from({ length: COUNT }, (_, i) => makePetal(i)));
  }, []);

  if (petals.length === 0) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 2 }}
    >
      {petals.map((p) => (
        <span
          key={p.id}
          style={{
            position: "absolute",
            top: 0,
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.85,
            animation: `petal-${p.variant} ${p.duration}s linear ${p.delay}s infinite`,
            transformOrigin: "center",
            willChange: "transform, opacity",
          }}
        >
          <svg viewBox="0 0 24 24" width="100%" height="100%">
            <defs>
              <radialGradient id={`pg-${p.id}`} cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor={`hsl(${p.hue} 90% 92%)`} />
                <stop offset="60%" stopColor={`hsl(${p.hue} 80% 80%)`} />
                <stop offset="100%" stopColor={`hsl(${p.hue} 60% 70%)`} stopOpacity="0.5" />
              </radialGradient>
            </defs>
            {/* 五瓣樱花轮廓 */}
            <path
              d="M12 2 C 14 6, 18 7, 21 10 C 18 12, 17 16, 14 18 C 13 15, 11 15, 10 18 C 7 16, 6 12, 3 10 C 6 7, 10 6, 12 2 Z"
              fill={`url(#pg-${p.id})`}
              opacity="0.85"
            />
            <circle cx="12" cy="11" r="1.2" fill="#fff5cc" opacity="0.9" />
          </svg>
        </span>
      ))}
    </div>
  );
}
