"use client";

import { useEffect, useState } from "react";

/** Drop your exported Lottie JSON here to replace the placeholder. */
const ANIMATION_SRC = "/animations/intro.json";

/** Hard ceiling: a slow, missing or malformed file can never strand a visitor. */
const MAX_DURATION_MS = 6000;

/** Must match the .intro-overlay transition in globals.css. */
const FADE_MS = 500;

/**
 * Module-level rather than component state, so the intro plays once per full
 * page load and is skipped when navigating back to the homepage client-side.
 * It resets naturally on reload, and is only ever mutated in the browser, so
 * server render and hydration always agree on the initial phase.
 */
let hasPlayed = false;

type Phase = "playing" | "leaving" | "done";

/**
 * Loading screen that plays a Lottie animation over the page, then fades to
 * reveal the hero.
 *
 * The hero is rendered underneath the whole time -- this overlay is purely
 * decorative and never gates content, so search engines and assistive tech are
 * unaffected. Visitors who prefer reduced motion never see it (hidden in CSS,
 * and the player is not even downloaded for them).
 */
export function IntroOverlay() {
  const [phase, setPhase] = useState<Phase>(hasPlayed ? "done" : "playing");

  useEffect(() => {
    if (phase !== "playing") return;

    let cancelled = false;
    let animation: { destroy: () => void } | null = null;

    const finish = () => {
      if (cancelled) return;
      hasPlayed = true;
      setPhase("leaving");
    };

    const timeout = window.setTimeout(finish, MAX_DURATION_MS);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // CSS already hides the overlay for these visitors, so skip downloading
      // the player entirely and resolve on the next frame.
      const frame = requestAnimationFrame(finish);
      return () => {
        cancelled = true;
        window.clearTimeout(timeout);
        cancelAnimationFrame(frame);
      };
    }

    void (async () => {
      const container = document.getElementById("intro-animation");
      if (!container) return; // the timeout will resolve it

      try {
        // Loaded on demand so the player stays out of the initial bundle.
        const lottie = (await import("lottie-web/build/player/lottie_light"))
          .default;
        if (cancelled) return;

        const instance = lottie.loadAnimation({
          container,
          renderer: "svg",
          loop: false,
          autoplay: true,
          path: ANIMATION_SRC,
        });
        animation = instance;

        instance.addEventListener("complete", finish);
        instance.addEventListener("data_failed", finish);
      } catch {
        finish();
      }
    })();

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      animation?.destroy();
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "leaving") return;
    const id = window.setTimeout(() => setPhase("done"), FADE_MS);
    return () => window.clearTimeout(id);
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
      <div id="intro-animation" className="intro-overlay__animation" />
    </div>
  );
}
