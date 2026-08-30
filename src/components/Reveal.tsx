"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Rises and fades its children in when they scroll into view.
 *
 * "idle" is what the server renders: visible. An element is only hidden once we
 * know it starts below the fold, so nothing flashes out and back, and the
 * content stays readable if JavaScript never runs. Anything already on screen
 * at mount -- a filter swap, a short page -- plays immediately instead of
 * waiting for a scroll that will never come.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  /** Stagger in ms, for cascading siblings within a row. */
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"idle" | "hidden" | "shown">("idle");

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (element.getBoundingClientRect().top < window.innerHeight) {
      setPhase("shown");
      return;
    }

    setPhase("hidden");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setPhase("shown");
        observer.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} ${phase === "hidden" ? "opacity-0" : ""} ${
        phase === "shown" ? "animate-rise" : ""
      }`}
      // `both` fill holds the from-state through the delay, so a stagger reads
      // as a cascade rather than everything landing at once.
      style={phase === "shown" && delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
