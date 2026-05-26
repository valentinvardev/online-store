"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right";

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;        // ms
  threshold?: number;   // 0-1
}

const directionMap: Record<Direction, string> = {
  up:    "translate-y-10",
  down:  "-translate-y-10",
  left:  "translate-x-10",
  right: "-translate-x-10",
};

export default function RevealOnScroll({
  children,
  className = "",
  direction = "up",
  delay = 0,
  threshold = 0.15,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setTimeout(() => {
            el.classList.add("reveal-visible");
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    <div
      ref={ref}
      className={`reveal-hidden ${directionMap[direction]} ${className}`}
    >
      {children}
    </div>
  );
}
