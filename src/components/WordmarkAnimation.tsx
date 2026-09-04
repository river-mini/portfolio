"use client";

import { useEffect, useRef } from "react";

/**
 * The source is 1920x1080 and the wrapper matches it exactly, with the video
 * fitted by object-contain -- so no edge of the wordmark is ever cropped.
 *
 * The transparent margins around it cost layout height but are invisible, and
 * MAX_WIDTH below already keeps the hero inside the viewport, so there is
 * nothing to gain by cropping and a clipped letterform to lose.
 */
const ASPECT = "16 / 9";
const ASPECT_RATIO = 16 / 9;

/**
 * Vertical space the rest of the hero needs: the section padding, the eyebrow,
 * the description, the scroll cue, and the gaps between them. Whatever is left
 * of the viewport is what the wordmark may occupy.
 */
const HERO_RESERVED = "22rem";

/**
 * Width cap. Normally 900px, but on a short viewport it drops to whatever keeps
 * the whole hero on screen, so the wordmark scales down with the window instead
 * of pushing the eyebrow and description below the fold.
 *
 * Scaling rather than cropping further: the ratio is preserved, so the wordmark
 * only ever gets smaller, never clipped. The floor stops it collapsing on a
 * very short window, where scrolling is the reasonable outcome anyway.
 */
const MAX_WIDTH =
  "min(900px, max(260px, calc((100svh - " +
  HERO_RESERVED +
  ") * " +
  ASPECT_RATIO +
  ")))";

/**
 * The animated wordmark, played as a plain <video>.
 *
 * A transparent VP9 WebM, so no background, poster colour or wrapper styling
 * goes anywhere near it -- anything painted behind would show through the
 * alpha channel.
 *
 * Playback is started here rather than with an `autoplay` attribute so that
 * reduced-motion visitors never see it move at all: they get the first frame,
 * held still, instead of a loop that starts and is then cut short.
 */
export function WordmarkAnimation({
  src,
  label,
  className = "",
}: {
  src: string;
  /** Read out in place of the animation, and what the heading says to crawlers. */
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Nudging currentTime forces the first frame to paint without playing.
      const showFirstFrame = () => {
        try {
          video.currentTime = 0;
        } catch {
          /* seeking before metadata is fine to ignore */
        }
      };
      if (video.readyState >= 2) showFirstFrame();
      else video.addEventListener("loadeddata", showFirstFrame, { once: true });
      return;
    }

    video.loop = true;
    // Autoplay can still be refused -- low power mode, say. The first frame
    // stands in, which is the same thing reduced-motion visitors see.
    void video.play().catch(() => {});
  }, []);

  return (
    <span
      className={`mx-auto block w-full ${className}`}
      style={{ aspectRatio: ASPECT, maxWidth: MAX_WIDTH }}
    >
      <video
        ref={ref}
        src={src}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className="h-full w-full object-contain"
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}
