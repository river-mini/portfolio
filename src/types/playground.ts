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
  /**
   * Muted loop played while the tile is hovered, on pointer devices. Defaults
   * to the piece's own video, so an edit previews itself; name a lighter cut
   * here when the full file is too heavy to start streaming on a hover.
   */
  hoverVideoUrl?: string;
  /** What opens when the tile is clicked. Falls back to the thumbnail. */
  media?: PlaygroundMedia;
};

/** The three files that make up one transparent clip. */
export type StickerClip = {
  /** VP9 WebM with an alpha channel: what Chrome, Edge and Firefox play. */
  webm: string;
  /**
   * Animated WebP of the same clip. WebKit drops WebM transparency and paints
   * a black box, so Safari and every iOS browser get this instead.
   */
  webp: string;
  /** A single frame, held still for reduced-motion visitors. */
  still: string;
};

/**
 * A transparent animated character that lives on the playground board with
 * the pieces. It has no frame or background of its own and does not open.
 */
export type PlaygroundSticker = StickerClip & {
  id: string;
  /** Read out to screen readers in place of the animation. */
  label: string;
  /**
   * Seconds into the clip to loop back to after the first play-through, so
   * an entrance plays once and the idle part repeats. Defaults to 0.
   */
  loopFrom?: number;
  /**
   * "float" drifts gently anywhere on the board. "peek" is artwork cut off
   * along its bottom edge: it sits on the board's bottom edge, peeking over
   * it. Dragged near the left or right side, it moves onto that side edge
   * and switches to `side`.
   */
  behaviour: "float" | "peek";
  /**
   * For a peeker: the same character peeking in from the LEFT edge, cut off
   * along its left side. The right edge uses it mirrored. Without it, the
   * peeker stays on the bottom edge.
   */
  side?: StickerClip;
};

/**
 * A still sticker on the board: a cut-out with a white border, which lifts at
 * a corner while it is dragged and lays flat again when dropped.
 */
export type PlaygroundDecal = {
  id: string;
  /** Transparent PNG with its white border already drawn in. */
  src: string;
  /** Pixel size of the PNG, for its aspect ratio. */
  width: number;
  height: number;
  /** Read out to screen readers. */
  label: string;
};

/** Where a piece or sticker starts on the board, before anyone moves it. */
export type BoardSpot = {
  /** Centre, as fractions (0-1) of the board's width and height. */
  x: number;
  y: number;
  /** Degrees of tilt, so the pieces look dropped rather than aligned. */
  rotate: number;
  /**
   * For a peeker only: which edge it starts on. Defaults to "bottom". On a
   * side edge, `y` is its place along that edge and `x` is ignored.
   */
  edge?: "bottom" | "left" | "right";
};
