"use client";

import { useEffect, useRef } from "react";

/**
 * Pastel colour fields behind the hero: soft radial blooms of green, blue,
 * lilac, pink and peach that fade into the page colour, like an aura.
 *
 * Each bloom drifts and breathes on its own, and they also lean with the
 * cursor: every bloom has a depth, some following the pointer and some sliding
 * away from it, so the colours seem to flow around wherever it goes. The lean
 * is eased towards its target each frame, so it trails the cursor.
 *
 * Painted on one small canvas (a fraction of the hero's size) that CSS
 * stretches to fill it. The blooms have no hard edges, so the upscale is
 * invisible, and it avoids what screen-sized moving layers cost: GPU memory,
 * and tiles flashing black when the GPU runs short. The loop stops whenever
 * the hero is off screen or the tab is hidden.
 *
 * Purely decorative and behind everything. Touch screens get only the drift;
 * reduced-motion visitors get the colours held still.
 */

type Bloom = {
  /** Centre, as a fraction of the hero's width and height. */
  x: number;
  y: number;
  /** Radius, as a fraction of the hero's larger side. */
  radius: number;
  /** Red, green, blue and peak opacity. */
  rgba: [number, number, number, number];
  /**
   * How far it leans with the cursor, as a fraction of the hero's larger side
   * at its edge. Negative moves away from the pointer, which is what makes
   * neighbours part around it.
   */
  depth: number;
  /** Seconds for one loop of the idle drift; varied so they never sync up. */
  drift: number;
};

const BLOOMS: Bloom[] = [
  { x: 0.06, y: 0.22, radius: 0.31, rgba: [178, 240, 196, 0.85], depth: 0.1, drift: 14 },
  { x: 0.62, y: 0.04, radius: 0.32, rgba: [186, 238, 247, 0.9], depth: -0.09, drift: 17 },
  { x: 0.98, y: 0.38, radius: 0.26, rgba: [222, 196, 244, 0.85], depth: 0.08, drift: 13 },
  { x: 0.1, y: 0.86, radius: 0.3, rgba: [255, 198, 226, 0.85], depth: -0.095, drift: 16 },
  { x: 0.76, y: 0.96, radius: 0.33, rgba: [238, 186, 180, 0.75], depth: 0.075, drift: 18 },
  { x: 1, y: 1, radius: 0.2, rgba: [244, 222, 196, 0.8], depth: -0.06, drift: 12 },
];

/** Canvas pixels per CSS pixel. Tiny on purpose: the blooms are all blur. */
const RESOLUTION = 0.125;
/** Share of the remaining distance covered each frame: lower is floatier. */
const EASE = 0.06;
/** How far the idle drift wanders, as a fraction of the hero's larger side. */
const DRIFT = 0.07;
/** How much each bloom swells and shrinks as it drifts (0 = not at all). */
const BREATHE = 0.12;

export function HeroAura() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const followsPointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    // Pointer position relative to the hero, from -1 to 1 each way.
    const target = { x: 0, y: 0 };
    const lean = { x: 0, y: 0 };
    let frame = 0;
    let onScreen = true;

    const resize = () => {
      const box = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(box.width * RESOLUTION));
      canvas.height = Math.max(1, Math.round(box.height * RESOLUTION));
    };

    const paint = (now: number) => {
      const { width, height } = canvas;
      const side = Math.max(width, height);
      const t = now / 1000;
      context.clearRect(0, 0, width, height);
      BLOOMS.forEach((bloom, index) => {
        const [r, g, b, a] = bloom.rgba;
        // Two sines at unrelated rates trace a slow loop that never repeats
        // exactly, so the drift reads as wandering rather than bouncing.
        const phase = (t / bloom.drift) * Math.PI * 2 + index * 1.3;
        const motion = still ? 0 : 1;
        const cx =
          bloom.x * width +
          motion * (Math.sin(phase) * DRIFT + lean.x * bloom.depth) * side;
        const cy =
          bloom.y * height +
          motion * (Math.cos(phase * 0.7) * DRIFT + lean.y * bloom.depth) * side;
        const radius =
          bloom.radius * side * (1 + motion * Math.sin(phase * 1.3) * BREATHE);
        const gradient = context.createRadialGradient(cx, cy, 0, cx, cy, radius);
        // Fading to the same colour at zero opacity, not "transparent" (which
        // is black at zero), keeps the edges from going grey.
        gradient.addColorStop(0, `rgba(${r},${g},${b},${a})`);
        gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);
        context.fillStyle = gradient;
        context.fillRect(0, 0, width, height);
      });
    };

    const tick = (now: number) => {
      lean.x += (target.x - lean.x) * EASE;
      lean.y += (target.y - lean.y) * EASE;
      paint(now);
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!still && !frame && onScreen && !document.hidden) {
        frame = requestAnimationFrame(tick);
      }
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    resize();
    paint(0);

    const sizeObserver = new ResizeObserver(() => {
      resize();
      paint(performance.now());
    });
    sizeObserver.observe(canvas);

    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    visibility.observe(canvas);

    const onVisibilityChange = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibilityChange);

    const onMove = (event: PointerEvent) => {
      const box = canvas.getBoundingClientRect();
      target.x = ((event.clientX - box.left) / box.width) * 2 - 1;
      target.y = ((event.clientY - box.top) / box.height) * 2 - 1;
    };
    if (followsPointer && !still) {
      window.addEventListener("pointermove", onMove, { passive: true });
    }

    start();
    return () => {
      stop();
      sizeObserver.disconnect();
      visibility.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div aria-hidden="true" className="hero-aura">
      <canvas ref={ref} className="hero-aura__canvas" />
    </div>
  );
}
