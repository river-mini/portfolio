"use client";

import { useEffect, useRef, useState } from "react";
import { rendersAlpha } from "@/lib/videoAlpha";
import type { PlaygroundSticker, StickerClip } from "@/types/playground";

/**
 * One transparent character on the playground board.
 *
 * Plays the alpha WebM where the browser honours its transparency, and swaps
 * to the animated WebP where it does not (Safari, every iOS browser), so it
 * never shows up as a black box. Reduced-motion visitors get a single frame.
 *
 * Playback is started here rather than with `autoplay`, and looping is done by
 * hand: after the first play-through the clip jumps back to `loopFrom`, so an
 * entrance plays once and only the idle part repeats.
 *
 * `clip` overrides which files play (a peeker's side version); the parent
 * remounts this with a new key when it changes, so the check runs again.
 */
export function BoardSticker({
  sticker,
  clip = sticker,
}: {
  sticker: PlaygroundSticker;
  clip?: StickerClip;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [fallback, setFallback] = useState<"webp" | "still" | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Deferred a frame so the swap happens as an update, not during the
      // effect body; the video never starts, so nothing moves meanwhile.
      const frame = requestAnimationFrame(() => setFallback("still"));
      return () => cancelAnimationFrame(frame);
    }

    const video = ref.current;
    if (!video) return;

    const onEnded = () => {
      video.currentTime = sticker.loopFrom ?? 0;
      void video.play().catch(() => {});
    };
    const check = () => {
      if (rendersAlpha(video)) return;
      video.pause();
      setFallback("webp");
    };

    video.addEventListener("ended", onEnded);
    if (video.readyState >= 2) check();
    else video.addEventListener("loadeddata", check, { once: true });
    // Autoplay can be refused (low power mode, say); it then holds frame one.
    void video.play().catch(() => {});

    return () => {
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("loadeddata", check);
    };
  }, [sticker.loopFrom]);

  return (
    <span className="block aspect-480/492 w-full">
      {fallback ? (
        // Fixed, pre-compressed assets swapped in at runtime; next/image would
        // re-encode the animated WebP into a still.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={fallback === "webp" ? clip.webp : clip.still}
          alt=""
          draggable={false}
          className="h-full w-full object-contain"
        />
      ) : (
        <video
          ref={ref}
          src={clip.webm}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="h-full w-full object-contain"
        />
      )}
      <span className="sr-only">{sticker.label}</span>
    </span>
  );
}
