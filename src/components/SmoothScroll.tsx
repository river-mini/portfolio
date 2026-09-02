"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/** Matches scroll-margin-top on [id], so an anchor clears the sticky header. */
const HEADER_OFFSET = -104;

let lenis: Lenis | null = null;

/**
 * Scrolls an element into view through Lenis when it is running, so the glide
 * matches the rest of the page. Falls back to the native jump otherwise --
 * reduced-motion visitors, or if the library failed to load.
 *
 * `offset` is how far above the element to stop, negative being higher up the
 * page. The default clears the sticky header, which is what a section anchor
 * wants; callers landing on a section with no top padding of its own pass
 * something shallower.
 */
export function scrollToElement(element: HTMLElement, offset = HEADER_OFFSET) {
  if (lenis) {
    lenis.scrollTo(element, { offset });
    return;
  }
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  element.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
}

/**
 * Inertial scrolling: the page keeps gliding after the wheel stops and eases
 * to a halt rather than cutting dead.
 *
 * Never runs for visitors who ask for reduced motion -- momentum scrolling is
 * a common migraine and nausea trigger, and it is the one effect on this site
 * that takes control away from the input device. They get native scrolling,
 * which is what the rest of the reduced-motion handling assumes.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({
      autoRaf: true,
      // Fraction of the remaining distance covered each frame: lower glides
      // longer. 0.09 reads as a slow settle without feeling detached.
      lerp: 0.09,
      // Lenis handles in-page #links itself, offset to clear the header.
      anchors: { offset: HEADER_OFFSET },
      // Touch devices already have momentum of their own; syncing to it fights
      // the OS and feels worse than leaving it alone.
      syncTouch: false,
    });
    lenis = instance;

    return () => {
      instance.destroy();
      lenis = null;
    };
  }, []);

  // A route change should land at the top instantly. Without this Lenis keeps
  // its own scroll position across the navigation and the new page opens
  // part-way down.
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
