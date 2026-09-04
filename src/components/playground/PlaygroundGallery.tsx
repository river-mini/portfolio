"use client";

import { useState } from "react";
import { Container } from "../Container";
import { Reveal } from "../Reveal";
import { SmartImage } from "../SmartImage";
import { PlaygroundLightbox } from "./PlaygroundLightbox";
import type { PlaygroundItem } from "@/types/playground";

type Opened = {
  index: number;
  /** The tile's box at the moment it was clicked, for the flight to centre. */
  rect: DOMRect | null;
};

/**
 * Three-up gallery of playground pieces. A tile opens in place rather than
 * navigating, since these have no write-up to navigate to.
 */
export function PlaygroundGallery({ items }: { items: PlaygroundItem[] }) {
  const [opened, setOpened] = useState<Opened | null>(null);

  // Wrap in both directions so the arrows never dead-end, matching the photo
  // carousel on the about page. No rect: stepping swaps the piece in place
  // rather than flying from a tile the reader is no longer looking at.
  const step = (by: number) =>
    setOpened((current) =>
      current === null
        ? null
        : {
            index: (current.index + by + items.length) % items.length,
            rect: null,
          }
    );

  if (items.length === 0) return null;

  return (
    <Container className="max-w-6xl">
      <ul className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:gap-x-10">
        {items.map((item, index) => (
          <li key={item.id}>
            {/* Three across, so the second and third tiles in a row trail the
                first, the same cascade the work grid uses. */}
            <Reveal delay={(index % 3) * 90}>
              <button
                type="button"
                onClick={(event) => {
                  const tile = event.currentTarget.querySelector(
                    "[data-tile-media]"
                  );
                  setOpened({
                    index,
                    rect: tile?.getBoundingClientRect() ?? null,
                  });
                }}
                className="group border-line rounded-card ease-standard hover:border-line-strong hover:shadow-card flex w-full cursor-pointer flex-col border p-3 text-left transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1"
              >
                <span
                  data-tile-media
                  className="rounded-media bg-bg-raised relative block aspect-square w-full overflow-hidden"
                >
                  <SmartImage
                    src={item.thumbnail}
                    alt={item.title}
                    sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="ease-standard object-cover transition-transform duration-400 group-hover:scale-[1.015]"
                  />
                </span>

                <span className="block px-1 pt-4 pb-1">
                  <span className="text-title ease-standard block transition-colors duration-200 group-hover:text-muted">
                    {item.title}
                  </span>
                  <span className="text-meta text-subtle mt-1.5 block">
                    {item.blurb}
                  </span>
                  <span className="text-label text-muted mt-3 block uppercase">
                    {item.categories.join(" · ")}
                  </span>
                </span>
              </button>
            </Reveal>
          </li>
        ))}
      </ul>

      {opened !== null ? (
        <PlaygroundLightbox
          item={items[opened.index]}
          originRect={opened.rect}
          onClose={() => setOpened(null)}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
        />
      ) : null}
    </Container>
  );
}
