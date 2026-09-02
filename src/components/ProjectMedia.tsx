"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { SmartImage } from "./SmartImage";

const HOVER_QUERY = "(hover: hover) and (pointer: fine)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Hover previews are for pointer devices only, and are suppressed entirely when
 * the visitor has asked for reduced motion. Starts false so the server and
 * first client render agree.
 */
function useHoverPreviewEnabled(): boolean {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const hover = window.matchMedia(HOVER_QUERY);
    const reduced = window.matchMedia(REDUCED_MOTION_QUERY);
    const update = () => setEnabled(hover.matches && !reduced.matches);

    update();
    hover.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      hover.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  return enabled;
}

type ProjectMediaProps = {
  thumbnail: string;
  alt: string;
  /** Externally hosted MP4/WebM. Omit for a thumbnail-only project. */
  videoUrl?: string;
  /** CSS aspect-ratio. Fixed so hovering never shifts the layout. */
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  fit?: "cover" | "contain";
};

/**
 * Thumbnail that cross-fades to a looping muted video while hovered.
 *
 * The <video> element is not created until the first hover, so no preview is
 * fetched on page load and only the hovered project ever streams.
 */
export function ProjectMedia({
  thumbnail,
  alt,
  videoUrl,
  aspect = "4 / 3",
  sizes = "(min-width: 768px) 50vw, 100vw",
  priority = false,
  fit = "cover",
}: ProjectMediaProps) {
  const hoverEnabled = useHoverPreviewEnabled();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Latches true on first hover and stays mounted afterwards, so a second
  // hover replays from cache instead of re-requesting the file.
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  // Driven by the element's own playing/pause events rather than set here, so
  // the cross-fade begins exactly when real frames are on screen.
  const [playing, setPlaying] = useState(false);

  const canPreview = Boolean(videoUrl) && hoverEnabled;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (hovered) {
      // A play() interrupted by a quick pointer-out rejects; that is harmless,
      // and the thumbnail simply stays visible.
      void video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [hovered, mounted]);

  const handleEnter = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!canPreview || event.pointerType === "touch") return;
    setMounted(true);
    setHovered(true);
  };

  const handleLeave = () => {
    if (!canPreview) return;
    setHovered(false);
  };

  return (
    <div
      className="rounded-media bg-bg-raised relative w-full overflow-hidden"
      style={{ aspectRatio: aspect }}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
    >
      <SmartImage
        src={thumbnail}
        alt={alt}
        sizes={sizes}
        priority={priority}
        className={`ease-standard ${
          fit === "contain" ? "object-contain p-4" : "object-cover"
        } transition-[opacity,transform] duration-400 group-hover:scale-[1.015]`}
        style={{ opacity: playing ? 0 : 1 }}
      />

      {mounted && videoUrl ? (
        <video
          ref={videoRef}
          src={videoUrl}
          poster={thumbnail}
          muted
          loop
          playsInline
          preload="none"
          tabIndex={-1}
          aria-hidden="true"
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className="ease-standard pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-300"
          style={{ opacity: playing ? 1 : 0 }}
        />
      ) : null}
    </div>
  );
}
