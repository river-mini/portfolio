"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/** Peak tilt either side of upright, and the length of one full sway. */
const TILT = 7;
const SWAY_MS = 1800;

/**
 * The cat logo in the header. Hovering anywhere on the lockup it sits in (the
 * cat itself, or the name and role beside it) makes the cat grow a little (a
 * CSS transition on `scale`) and sway back and forth (a Web Animation on
 * `rotate`, a separate property, so the two never fight). Only the cat moves;
 * the text stays put. Leaving mid-sway brings it back upright from wherever it
 * is, at the sway's own pace, rather than snapping. Reduced-motion visitors
 * get neither.
 */
export function LogoMark() {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const cat = ref.current;
    // Listen on the parent link, not the image, so the name and role count too.
    const lockup = cat?.parentElement;
    if (!cat || !lockup) return;

    let sway: Animation | null = null;

    const start = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      sway?.cancel();
      // Starts and ends upright, so the loop has no seam. Each quarter slows
      // only toward the tips of the swing, never while passing upright, so the
      // motion is one continuous pendulum.
      sway = cat.animate(
        [
          { rotate: "0deg", easing: "ease-out" },
          { rotate: `${-TILT}deg`, easing: "ease-in" },
          { rotate: "0deg", easing: "ease-out" },
          { rotate: `${TILT}deg`, easing: "ease-in" },
          { rotate: "0deg" },
        ],
        { duration: SWAY_MS, iterations: Infinity },
      );
    };

    const stop = () => {
      if (!sway) return;
      const angle = parseFloat(getComputedStyle(cat).rotate) || 0;
      sway.cancel();
      // A straight return at roughly the sway's speed: no slow-down at the end.
      sway = cat.animate([{ rotate: `${angle}deg` }, { rotate: "0deg" }], {
        duration: (Math.abs(angle) / TILT) * (SWAY_MS / 4),
        easing: "linear",
      });
    };

    lockup.addEventListener("mouseenter", start);
    lockup.addEventListener("mouseleave", stop);
    return () => {
      lockup.removeEventListener("mouseenter", start);
      lockup.removeEventListener("mouseleave", stop);
      sway?.cancel();
    };
  }, []);

  return (
    <Image
      ref={ref}
      src="/images/logo.png"
      alt=""
      width={169}
      height={192}
      preload
      // Pulled a little into the left margin. Grows when the lockup is hovered.
      className="ease-standard -ml-2 h-10 w-auto transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100 md:-ml-4 md:h-12"
    />
  );
}
