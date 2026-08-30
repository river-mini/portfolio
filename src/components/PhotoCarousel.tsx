"use client";

import { useState } from "react";
import { SmartImage } from "./SmartImage";

export type AboutPhoto = { src: string; alt: string };

/**
 * Click-through photo set: one large frame, arrows on either edge, and a
 * thumbnail strip underneath.
 *
 * With a single photo the arrows and strip are dropped entirely, so the
 * component degrades to a plain portrait until more images are added.
 */
export function PhotoCarousel({ photos }: { photos: AboutPhoto[] }) {
  const [index, setIndex] = useState(0);

  if (photos.length === 0) return null;

  const count = photos.length;
  const current = photos[index];
  // Wraps in both directions, so the arrows never dead-end.
  const go = (next: number) => setIndex(((next % count) + count) % count);

  return (
    <div>
      <div
        className="rounded-media bg-bg-raised relative w-full overflow-hidden"
        style={{ aspectRatio: "4 / 5" }}
      >
        <SmartImage
          key={current.src}
          src={current.src}
          alt={current.alt}
          sizes="(min-width: 768px) 32vw, 100vw"
          className="object-cover"
          priority
        />

        {count > 1 ? (
          <>
            {/* Bare chevrons -- no plate, no outline. Thick strokes with round
                caps and joins, so the arrow reads as a shape in its own right
                rather than needing a surface behind it. */}
            <button
              type="button"
              onClick={() => go(index - 1)}
              className="text-ink/55 hover:text-ink/85 ease-standard absolute top-1/2 left-1 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center transition-colors duration-200"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-7 w-7"
                aria-hidden="true"
              >
                <path d="M15 5 8 12l7 7" />
              </svg>
              <span className="sr-only">Previous photo</span>
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              className="text-ink/55 hover:text-ink/85 ease-standard absolute top-1/2 right-1 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center transition-colors duration-200"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-7 w-7"
                aria-hidden="true"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
              <span className="sr-only">Next photo</span>
            </button>
          </>
        ) : null}
      </div>

      {count > 1 ? (
        <>
          <p aria-live="polite" className="sr-only">
            Photo {index + 1} of {count}
          </p>

          <ul className="mt-3 flex flex-wrap gap-2">
            {photos.map((photo, i) => (
              <li key={photo.src}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-current={i === index ? "true" : undefined}
                  className={`rounded-media ease-standard relative block h-14 w-14 cursor-pointer overflow-hidden border-2 transition-[border-color,opacity] duration-200 ${
                    i === index
                      ? "border-ink opacity-100"
                      : "border-transparent opacity-55 hover:opacity-100"
                  }`}
                >
                  {/* Decorative: the label below names the control. */}
                  <SmartImage src={photo.src} alt="" sizes="56px" className="object-cover" />
                  <span className="sr-only">Show photo {i + 1}</span>
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}
