"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { SmartImage } from "../SmartImage";
import { setScrollLocked } from "../SmoothScroll";
import type { PlaygroundItem } from "@/types/playground";

/**
 * Height the media may take, leaving room for the caption beneath it and a
 * margin top and bottom. Capping this is what keeps the piece centred: a 16:9
 * frame at full width is 576px tall, which overflows a short window and gets
 * clipped rather than centred.
 */
const MEDIA_MAX_HEIGHT = "68svh";

/** How long the tile takes to travel to the middle and grow. */
const FLIGHT_MS = 420;

/**
 * The opened piece: the clicked tile flies to the middle and enlarges, then
 * the caption rises in beneath it.
 *
 * Rendered through a portal to <body> so it is positioned against the viewport
 * and cannot be caught by a transformed ancestor -- a transform anywhere above
 * a fixed element makes it resolve against that ancestor instead.
 *
 * Video plays with sound. Autoplay is only permitted because opening this was a
 * click, which is the gesture browsers require before letting audio start.
 */
export function PlaygroundLightbox({
  item,
  originRect,
  onClose,
  onPrev,
  onNext,
}: {
  item: PlaygroundItem;
  /** Where the clicked tile sat on screen, so the piece can fly from it. */
  originRect: DOMRect | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const media = item.media ?? {
    src: item.thumbnail,
    alt: item.title,
    kind: "image" as const,
  };

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowLeft") onPrev();
      else if (event.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    // Lenis keeps scrolling the page behind an overlay unless it is told to
    // stop, so this covers both it and the native scrollbar.
    setScrollLocked(true);
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      setScrollLocked(false);
    };
  }, [onKeyDown]);

  /**
   * FLIP: the piece is already laid out where it belongs, so it is snapped
   * back onto the tile's box and then released. Animating a transform rather
   * than width and position keeps the whole thing off the layout path.
   *
   * A layout effect, so the snap lands before the browser paints -- in an
   * ordinary effect the piece would flash at full size for a frame first.
   * Reduced-motion visitors skip it and simply arrive.
   */
  useLayoutEffect(() => {
    const element = mediaRef.current;
    if (!element || !originRect) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = element.getBoundingClientRect();
    if (!target.width || !target.height) return;

    const scaleX = originRect.width / target.width;
    const scaleY = originRect.height / target.height;
    const dx =
      originRect.left + originRect.width / 2 - (target.left + target.width / 2);
    const dy =
      originRect.top + originRect.height / 2 - (target.top + target.height / 2);

    element.style.transition = "none";
    element.style.transform = `translate(${dx}px, ${dy}px) scale(${scaleX}, ${scaleY})`;
    // Read back, so the snap is committed before the transition is attached.
    void element.getBoundingClientRect();
    element.style.transition = `transform ${FLIGHT_MS}ms var(--ease-soft)`;
    element.style.transform = "none";
  }, [originRect]);

  // Only ever rendered in response to a click, so document is always there --
  // this guard is just belt and braces against a future server render.
  if (typeof document === "undefined") return null;

  const arrow =
    "text-ink/45 hover:text-ink/85 ease-standard absolute top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center transition-colors duration-200";

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      // Clicking the backdrop closes; clicks on the piece itself stop there.
      onClick={onClose}
      className="lightbox-enter bg-bg/70 fixed inset-0 z-100 flex flex-col items-center justify-center p-4 backdrop-blur-lg md:p-10"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className="text-ink/55 hover:text-ink ease-standard absolute top-4 right-4 flex h-11 w-11 cursor-pointer items-center justify-center text-2xl transition-colors duration-200 md:top-6 md:right-6"
      >
        <span aria-hidden="true">×</span>
        <span className="sr-only">Close</span>
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onPrev();
        }}
        className={`${arrow} left-1 md:left-4`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}
          strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden="true">
          <path d="M15 5 8 12l7 7" />
        </svg>
        <span className="sr-only">Previous piece</span>
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onNext();
        }}
        className={`${arrow} right-1 md:right-4`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}
          strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden="true">
          <path d="M9 5l7 7-7 7" />
        </svg>
        <span className="sr-only">Next piece</span>
      </button>

      <div
        onClick={(event) => event.stopPropagation()}
        className="flex w-full max-w-5xl flex-col items-center"
      >
        <div
          ref={mediaRef}
          className="rounded-media relative w-full overflow-hidden"
          style={{
            aspectRatio: media.aspect ?? "16 / 9",
            maxHeight: MEDIA_MAX_HEIGHT,
          }}
        >
          {media.kind === "video" ? (
            <video
              key={media.src}
              src={media.src}
              controls
              autoPlay
              playsInline
              className="absolute inset-0 h-full w-full object-contain"
            />
          ) : (
            <SmartImage
              key={media.src}
              src={media.src}
              alt={media.alt}
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-contain"
              priority
            />
          )}
        </div>

        {/* Held back until the piece has landed, so the caption arrives after
            the movement rather than travelling with it. Re-keyed per item so
            it replays when the arrows move to the next piece. */}
        <div
          key={item.id}
          className="animate-rise mt-5 text-center"
          style={{ animationDelay: `${FLIGHT_MS - 80}ms` }}
        >
          <h2 className="text-title">{item.title}</h2>
          <p className="text-meta text-muted mt-1.5">{item.blurb}</p>
          <p className="text-label text-subtle mt-3 uppercase">
            {item.categories.join(" · ")}
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
