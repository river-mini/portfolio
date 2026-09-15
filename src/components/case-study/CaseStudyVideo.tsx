"use client";

import { useEffect, useRef, useState } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/** How much of the figure has to be on screen before it starts playing. */
const VISIBLE_ENOUGH = 0.4;

type CaseStudyVideoProps = {
  src: string;
  /** Frame shown before playback, and the only thing shown under reduced motion. */
  poster?: string;
  alt: string;
  className?: string;
};

/**
 * A product demo in a case study: muted, looping, and playing only while it is
 * actually on screen.
 *
 * Playback is tied to visibility rather than to load. A page carrying three
 * demos would otherwise pull all three at once for a reader who may never
 * scroll as far as the second, so each one waits its turn and pauses again on
 * the way out. The poster carries the frame until then, which means the still
 * is what loads first and the footage follows only if it is needed.
 *
 * Controls stay on, matching the videos already in these case studies, so a
 * reader can scrub or pause. A manual pause is remembered: scrolling past and
 * back will not start it up again underneath someone who chose to stop it.
 *
 * Under prefers-reduced-motion nothing autoplays at all. The poster sits there
 * with its controls and waits to be asked.
 */
export function CaseStudyVideo({ src, poster, alt, className = "" }: CaseStudyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const pausedByReader = useRef(false);
  // Starts false so the server render and the first client render agree, and
  // so the poster is what a reader sees until we know motion is welcome.
  const [autoplayAllowed, setAutoplayAllowed] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(REDUCED_MOTION_QUERY);
    const update = () => setAutoplayAllowed(!reduced.matches);

    update();
    reduced.addEventListener("change", update);
    return () => reduced.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video || !autoplayAllowed) return;

    // A pause while the figure is still on screen came from the reader, not
    // from scrolling away, so it is the one case worth remembering.
    const onPause = () => {
      if (video.getBoundingClientRect().bottom > 0) pausedByReader.current = true;
    };
    const onPlay = () => {
      pausedByReader.current = false;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!pausedByReader.current) {
            // Rejects if the reader scrolls away mid-start. Harmless: the
            // poster is still there and the next pass will try again.
            void video.play().catch(() => {});
          }
        } else if (!video.paused) {
          video.pause();
          // Scrolling out is not a decision, so it must not latch.
          pausedByReader.current = false;
        }
      },
      { threshold: VISIBLE_ENOUGH }
    );

    video.addEventListener("pause", onPause);
    video.addEventListener("play", onPlay);
    observer.observe(video);

    return () => {
      video.removeEventListener("pause", onPause);
      video.removeEventListener("play", onPlay);
      observer.disconnect();
    };
  }, [autoplayAllowed]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      controls
      preload="metadata"
      aria-label={alt || undefined}
      className={className}
    />
  );
}
