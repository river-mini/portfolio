"use client";

import { useEffect, useState } from "react";

/**
 * Shortest the star may spin. Without a floor, a warm cache resolves the page
 * almost instantly and the intro reads as a flicker rather than a beat.
 */
const MIN_SPIN_MS = 900;

/** Hard ceiling: a slow or stalled load can never strand a visitor. */
const MAX_DURATION_MS = 6000;

/** Must match the .intro-overlay transition in globals.css. */
const FADE_MS = 500;

/** Must match the animation durations in globals.css. */
const CYCLE_MS = 7800;

/**
 * Where each scribble pulse sits in the cycle, as fractions of it. These are
 * the same numbers as the intro-star-burst-draw keyframes: a pulse opens as
 * its turn stops and closes once the mark has drawn and left again.
 */
const PULSES: readonly (readonly [number, number])[] = [
  [0.07, 0.17],
  [0.41, 0.51],
  [0.78, 0.88],
];

/**
 * How long until the scribbles are off screen, or 0 if they already are.
 *
 * Read off the running animation rather than a clock of our own, so it stays
 * true however long the page took to load and whatever the browser did with
 * the timeline in between.
 */
function msUntilLinesAreDone(): number {
  const mark = document.querySelector(".intro-overlay__burst path");
  const running = mark?.getAnimations?.() ?? [];
  const draw = running.find(
    (a) => (a as { animationName?: string }).animationName === "intro-star-burst-draw"
  );

  const now = draw?.currentTime;
  if (typeof now !== "number") return 0; // no animation to wait on

  const at = (now % CYCLE_MS) / CYCLE_MS;
  const pulse = PULSES.find(([from, to]) => at >= from && at < to);
  return pulse ? (pulse[1] - at) * CYCLE_MS : 0;
}

/**
 * Module-level rather than component state, so the intro plays once per full
 * page load and is skipped when navigating back to the homepage client-side.
 * It resets naturally on reload, and is only ever mutated in the browser, so
 * server render and hydration always agree on the initial phase.
 */
let hasPlayed = false;

type Phase = "spinning" | "leaving" | "done";

/**
 * Loading screen: the wordmark's star, spinning while the page loads, then
 * shrinking away as the screen fades to the hero.
 *
 * The star is drawn inline rather than loaded, so it is on screen in the first
 * frame. An animation fetched over the network would have the overlay sitting
 * empty for exactly as long as the connection is slow, which is precisely when
 * a visitor most needs to see something happening.
 *
 * How long it spins is the page's answer, not a fixed length: it holds until
 * the window has finished loading, floored so it cannot flicker and capped so
 * it cannot hang. The hero is rendered underneath the whole time, so this
 * overlay is purely decorative and never gates content. Visitors who prefer
 * reduced motion never see it at all (hidden in CSS).
 */
export function IntroOverlay() {
  const [phase, setPhase] = useState<Phase>(hasPlayed ? "done" : "spinning");

  useEffect(() => {
    if (phase !== "spinning") return;

    let cancelled = false;
    let floor = 0;
    let hold = 0;
    const startedAt = Date.now();

    const leave = () => {
      if (cancelled) return;
      hasPlayed = true;
      setPhase("leaving");
    };

    // Never cut a scribble off part way through. If one is mid-pulse, keep the
    // overlay up until it has drawn and left; between pulses there is nothing
    // to wait for and the star goes at once. The wait is a pulse at worst.
    const leaveOnceLinesAreDone = () => {
      if (cancelled) return;
      const wait = msUntilLinesAreDone();
      if (wait <= 0) return leave();
      hold = window.setTimeout(leave, wait);
    };

    // The ceiling does not wait for anything. It exists for the case where
    // something has gone wrong, and a tidy exit is not worth a longer hostage.
    const ceiling = window.setTimeout(leave, MAX_DURATION_MS);

    // Loading is only half of it: hold the star for the rest of the floor so a
    // fast load still gets a beat instead of a blink.
    const settle = () => {
      if (cancelled) return;
      floor = window.setTimeout(
        leaveOnceLinesAreDone,
        Math.max(0, MIN_SPIN_MS - (Date.now() - startedAt))
      );
    };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // CSS already hides the overlay for these visitors, so there is nothing
      // to wait for. Resolve on the next frame.
      const frame = requestAnimationFrame(leave);
      return () => {
        cancelled = true;
        window.clearTimeout(ceiling);
        cancelAnimationFrame(frame);
      };
    }

    if (document.readyState === "complete") settle();
    else window.addEventListener("load", settle, { once: true });

    return () => {
      cancelled = true;
      window.clearTimeout(ceiling);
      window.clearTimeout(floor);
      window.clearTimeout(hold);
      window.removeEventListener("load", settle);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "leaving") return;
    const id = window.setTimeout(() => setPhase("done"), FADE_MS);
    return () => window.clearTimeout(id);
  }, [phase]);

  // Release the hero entrance as soon as the overlay starts clearing, so the
  // lines rise in behind the fade rather than after it. Also covers the
  // client-side return to home, where the phase starts at "done" and the
  // overlay never renders at all.
  useEffect(() => {
    if (phase === "spinning") return;
    document.documentElement.dataset.introDone = "true";
  }, [phase]);

  // Hold the page still while the overlay covers it.
  useEffect(() => {
    if (phase === "done") return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className={`intro-overlay${phase === "leaving" ? " is-leaving" : ""}`}
      aria-hidden="true"
    >
      {/* Without JavaScript the overlay would never be removed. */}
      <noscript>
        <style>{".intro-overlay{display:none}"}</style>
      </noscript>

      {/* Three layers, one transform each, because they would otherwise
          overwrite one another: the wrapper leaves, the middle arrives, and
          the star inside turns. An animation on transform beats a transition
          on the same property, so sharing an element loses the exit. */}
      <div className="intro-overlay__animation">
        <div className="intro-overlay__enter">
          <IntroStar />
        </div>
      </div>
    </div>
  );
}

/**
 * The star from the wordmark: one stroke, drawn point to point so the middle
 * stays open, with the corners left round and the vertices off true. A stroked
 * path rather than a filled one is what keeps it reading as drawn instead of
 * generated.
 *
 * The ring of short marks is the burst, thrown out behind the star as each
 * turn lands. Their angles, lengths and curl are all off a regular ring, for
 * the same reason the star's points are: evenly spaced reads as generated.
 *
 * The viewBox is wider than the star needs. That margin is the room the marks
 * fly into, and it is also what makes the star smaller inside the same box.
 */
function IntroStar() {
  return (
    <svg
      className="intro-overlay__star"
      viewBox="-22 -22 144 144"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* pathLength normalises every mark to 1, so one set of dash values
          trims all six regardless of how long each curve actually is. Each is
          drawn inner end first, which is the end nearest the star. */}
      <g className="intro-overlay__burst" strokeWidth="4.5">
        <path pathLength="1" d="M103.2 60.1 Q109.2 56.7 113.6 62.1" />
        <path pathLength="1" d="M74 98.5 Q76.4 103 78.5 107.6" />
        <path pathLength="1" d="M23.3 95.8 Q24.5 103.4 17.3 106.1" />
        <path pathLength="1" d="M-3.6 41.1 Q-8.2 37.8 -13.6 39.5" />
        <path pathLength="1" d="M25.7 2.2 Q23.4 -1.8 21.6 -6" />
        <path pathLength="1" d="M81 5.1 Q85.4 1.3 87.4 -4.2" />
      </g>
      {/* Five strokes rather than one closed path, because a path carries a
          single stroke-width and a drawn line does not: each arm gets its own
          weight, 5 through 7.5. The vertices sit off a true pentagon and
          every line bows slightly, so no two arms are the same length or
          angle. The round caps overlapping at the corners are the point, not
          a flaw: that is what a pen doubling back looks like. */}
      <path strokeWidth="7.5" d="M48.5 7.5 Q57.4 47.1 70.5 85.5" />
      <path strokeWidth="5.5" d="M70.5 85.5 Q38.7 60.7 9 33.5" />
      <path strokeWidth="6.5" d="M9 33.5 Q50.1 38.8 91.5 40.5" />
      <path strokeWidth="5" d="M91.5 40.5 Q58.4 61.6 23 78.5" />
      <path strokeWidth="7" d="M23 78.5 Q37.1 43.5 48.5 7.5" />
    </svg>
  );
}
