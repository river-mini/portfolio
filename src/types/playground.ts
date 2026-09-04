import type { ProjectCategory } from "./project";

/**
 * Playground pieces: smaller work made for its own sake, shown as a gallery
 * rather than written up. No case study, no slug, no page of its own -- a
 * piece opens in place.
 */
export type PlaygroundMedia = {
  /** Local path under /public, or an absolute URL. */
  src: string;
  /** Defaults to "image". Use "video" for MP4/WebM -- it plays with sound. */
  kind?: "image" | "video";
  alt: string;
  /** CSS aspect-ratio for the opened view. Defaults to 16 / 9. */
  aspect?: string;
};

export type PlaygroundItem = {
  id: string;
  title: string;
  /** The single line under the title. */
  blurb: string;
  /** Same vocabulary as the work page, so the labels read consistently. */
  categories: ProjectCategory[];
  /** Square crop for the grid. */
  thumbnail: string;
  /** What opens when the tile is clicked. Falls back to the thumbnail. */
  media?: PlaygroundMedia;
};
