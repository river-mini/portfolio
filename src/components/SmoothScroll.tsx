"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/** Height of the sticky header, so a target can clear it. */
const HEADER_OFFSET = -80;

/**
 * Breathing room left above the target when arriving from further up the page.
 * The header has hidden itself by then, so this is genuine space rather than
 * bar. Raise the magnitude to stop earlier, lower it to land tighter.
 */
const APPROACH_OFFSET = -24;

declare global {
  interface Window {
    /**
     * Kept on window rather than in a module variable: this file is imported
     * by the layout and by link components on separate route bundles, and a
     * per-bundle copy would leave callers seeing `null` and silently falling
     * back to a native scroll -- which the running Lenis loop then overwrites
     * on the next frame, so nothing moves at all.
     */
    __lenis?: Lenis;
  }
}

/**
 * How much room to leave above a scroll target, given that the header hides
 * itself on the way down.
 *
 * Scrolling down, the bar is gone by the time we land, so reserving its height
 * just leaves a band of empty page above the heading. Scrolling up the bar
 * stays put and would cover the heading, so its height has to come off.
 */
function headerOffsetFor(element: HTMLElement) {
  // Lenis subtracts the target's scroll-margin-top before applying our offset,
  // and globals.css sets that on [id] and .case-study-section for the benefit
  // of native anchor jumps. Adding it back makes the number below the whole
  // story: 0 puts the top of the element at the top of the viewport.
  const cssMargin =
    Number.parseFloat(getComputedStyle(element).scrollMarginTop) || 0;
  const isScrollingDown = element.getBoundingClientRect().top > 0;
  return cssMargin + (isScrollingDown ? APPROACH_OFFSET : HEADER_OFFSET);
}

/**
 * Scrolls an element into view through Lenis when it is running, so the glide
 * matches the rest of the page. Falls back to the native jump otherwise --
 * reduced-motion visitors, or if the library failed to load.
 */
export function scrollToElement(element: HTMLElement, offset?: number) {
  const lenis = typeof window !== "undefined" ? window.__lenis : undefined;
  const resolved = offset ?? headerOffsetFor(element);

  if (lenis) {
    // force: a scrollTo is a no-op while Lenis considers itself stopped.
    lenis.scrollTo(element, { offset: resolved, force: true });
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
  const lastPath = useRef(pathname);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({
      autoRaf: true,
      // Fraction of the remaining distance covered each frame: lower glides
      // longer. 0.09 reads as a slow settle without feeling detached.
      lerp: 0.09,
      // Not using Lenis anchors: it binds its own click handler, which then
      // races the browser's native hash jump -- the two land in different
      // places. Links call scrollToElement directly instead.
      anchors: false,
      // Touch devices already have momentum of their own; syncing to it fights
      // the OS and feels worse than leaving it alone.
      syncTouch: false,
    });
    window.__lenis = instance;

    return () => {
      instance.destroy();
      if (window.__lenis === instance) delete window.__lenis;
    };
  }, []);

  // A real route change should land at the top instantly, or Lenis keeps its
  // scroll position across the navigation and the new page opens part-way
  // down. Guarded by a ref so a re-render on the same route -- which a hash
  // update can cause -- cannot yank the page back to the top mid-scroll.
  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    window.__lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
