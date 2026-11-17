"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** How small the tiles are while gathered at the centre. */
const START_SCALE = 0.45;
/** Fraction of the scroll over which the tiles fade in. */
const FADE_SPAN = 0.3;

/**
 * A grid whose tiles start stacked at its centre point and spread out to their
 * own cells as the visitor scrolls, growing to full size on the way. Progress
 * is tied to scroll position rather than time: scrolling back up gathers them
 * in again, and stopping halfway leaves them halfway.
 *
 * The motion runs from the moment the grid's top enters the viewport until the
 * grid sits centred on screen (or as close as the page can scroll). The server
 * renders every tile in place, so the grid reads fine without JavaScript. Single
 * column layouts and reduced-motion visitors also get the tiles in place:
 * stacking a column into one point would cover the page.
 */
export function AssembleGrid({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = ref.current;
    if (!grid) return;

    const wide = window.matchMedia("(min-width: 768px)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const tiles = Array.from(grid.children) as HTMLElement[];

    // Each tile's distance from its cell to the grid's centre point. Offsets
    // are layout positions, so the transforms applied below don't skew them.
    let offsets: { x: number; y: number }[] = [];
    const measure = () => {
      const cx = grid.offsetWidth / 2;
      const cy = grid.offsetHeight / 2;
      offsets = tiles.map((tile) => ({
        x: cx - (tile.offsetLeft + tile.offsetWidth / 2),
        y: cy - (tile.offsetTop + tile.offsetHeight / 2),
      }));
    };

    let frame = 0;
    const update = () => {
      frame = 0;

      if (!wide.matches || calm.matches) {
        for (const tile of tiles) {
          tile.style.transform = "";
          tile.style.opacity = "";
        }
        return;
      }

      const viewport = window.innerHeight;
      const rect = grid.getBoundingClientRect();
      const gridTop = rect.top + window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - viewport;

      // Start: grid top at the bottom of the screen. End: grid centred, unless
      // the page runs out first, in which case the end is the bottom of the page.
      const startScroll = gridTop - viewport;
      const endScroll = Math.min(gridTop - (viewport - rect.height) / 2, maxScroll);
      const raw = (window.scrollY - startScroll) / Math.max(endScroll - startScroll, 1);
      const progress = Math.min(Math.max(raw, 0), 1);
      const eased = 1 - (1 - progress) ** 3;
      const remaining = 1 - eased;
      const scale = START_SCALE + (1 - START_SCALE) * eased;

      tiles.forEach((tile, index) => {
        const { x, y } = offsets[index];
        tile.style.transform =
          remaining === 0
            ? ""
            : `translate3d(${x * remaining}px, ${y * remaining}px, 0) scale(${scale})`;
        tile.style.opacity = String(Math.min(progress / FADE_SPAN, 1));
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const remeasure = () => {
      measure();
      schedule();
    };

    remeasure();
    const resize = new ResizeObserver(remeasure);
    resize.observe(grid);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    wide.addEventListener("change", schedule);
    calm.addEventListener("change", schedule);

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      wide.removeEventListener("change", schedule);
      calm.removeEventListener("change", schedule);
      for (const tile of tiles) {
        tile.style.transform = "";
        tile.style.opacity = "";
      }
    };
  }, []);

  // `relative` makes the grid the tiles' offsetParent, which `measure` relies on.
  return (
    <div ref={ref} className={`relative ${className}`}>
      {children}
    </div>
  );
}
