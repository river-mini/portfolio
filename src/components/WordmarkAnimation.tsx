"use client";

import { useEffect, useRef, useState } from "react";

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
 * Does this browser honour the video's alpha channel?
 *
 * WebKit plays VP9 in WebM but ignores its transparency, painting what should
 * be see-through as opaque black -- so on any iOS browser the wordmark arrives
 * as a black rectangle. Nothing reports this, and canPlayType says "probably"
 * either way, so the frame is drawn to a canvas and a corner pixel is read:
 * see-through means alpha survived decoding, opaque means it did not.
 */
function rendersAlpha(video: HTMLVideoElement) {
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return true; // cannot tell, so leave the video alone
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    // The wordmark sits in the middle of the frame, so a corner is transparent
    // whenever alpha is being honoured.
    return context.getImageData(0, 0, 1, 1).data[3] < 250;
  } catch {
    return true; // same-origin should hold, but never break the hero over this
  }
}

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
  still,
  label,
  className = "",
}: {
  src: string;
  /**
   * Shown where the video would paint as a black box. A frame of the same
   * wordmark, so the mark is still right -- it just is not moving.
   */
  still: string;
  /** Read out in place of the animation, for screen readers and crawlers. */
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [alphaBroken, setAlphaBroken] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const check = () => {
      if (rendersAlpha(video)) return;
      video.pause();
      setAlphaBroken(true);
    };

    const whenReady = (run: () => void) => {
      if (video.readyState >= 2) run();
      else video.addEventListener("loadeddata", run, { once: true });
      return () => video.removeEventListener("loadeddata", run);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return whenReady(() => {
        // Nudging currentTime forces the first frame to paint without playing.
        try {
          video.currentTime = 0;
        } catch {
          /* seeking before metadata is fine to ignore */
        }
        check();
      });
    }

    video.loop = true;
    // Autoplay can still be refused -- low power mode, say. The first frame
    // stands in, which is the same thing reduced-motion visitors see.
    void video.play().catch(() => {});
    return whenReady(check);
  }, []);

  return (
    <span
      className={`mx-auto block w-full ${className}`}
      style={{ aspectRatio: ASPECT, maxWidth: MAX_WIDTH }}
    >
      {/* Same frame, same box: where alpha is dropped the wordmark simply stops
          moving, instead of turning into a black rectangle. */}
      {alphaBroken ? (
        // A fixed asset swapped in at runtime, already sized and compressed;
        // next/image would add a round trip and nothing else.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={still}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-contain"
        />
      ) : (
        <video
          ref={ref}
          src={src}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="h-full w-full object-contain"
        />
      )}
      <span className="sr-only">{label}</span>
    </span>
  );
}
