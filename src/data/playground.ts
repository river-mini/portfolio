import type {
  BoardSpot,
  PlaygroundDecal,
  PlaygroundItem,
  PlaygroundSticker,
} from "@/types/playground";

/**
 * ---------------------------------------------------------------------------
 * PLAYGROUND — the file to edit when adding a piece.
 * ---------------------------------------------------------------------------
 * Order here is the order the arrows step through once a piece is open. Every entry needs a square thumbnail; add
 * `media` when the thing that should open is different from it -- a video, or
 * a full-size version of the image.
 *
 *   media: { src: "https://cdn.example.com/edit.mp4", kind: "video", alt: "..." }
 *
 * Videos open with sound, so they are worth a listen before adding one. Large
 * files belong on a CDN rather than in this repo, same as the case studies.
 *
 * hoverVideoUrl is the muted loop a tile plays while hovered, and defaults to
 * the piece's own video. The edits below name short cuts instead: streaming a
 * 9MB file because a cursor crossed a tile is a lot to ask of a visitor.
 */
export const playgroundItems: PlaygroundItem[] = [
  {
    id: "muichiro-edit",
    title: "Muichiro Edit",
    blurb: "A character edit cut to music.",
    categories: ["Motion Design"],
    thumbnail: "/images/playground/muichiro-cover-2.jpg",
    hoverVideoUrl: "https://7vxrad93nks5odjn.public.blob.vercel-storage.com/playground/compressed/preview/muichiro-preview.mp4",
    media: {
      src: "https://7vxrad93nks5odjn.public.blob.vercel-storage.com/playground/compressed/muichiro-edit-compressed.mp4",
      kind: "video",
      alt: "Muichiro character edit",
      aspect: "1 / 1",
    },
  },
  {
    id: "toge-edit",
    title: "Toge Edit",
    blurb: "A character edit cut to music.",
    categories: ["Motion Design"],
    thumbnail: "/images/playground/toge-cover.jpg",
    hoverVideoUrl: "https://7vxrad93nks5odjn.public.blob.vercel-storage.com/playground/compressed/preview/toge-preview.mp4",
    media: {
      src: "https://7vxrad93nks5odjn.public.blob.vercel-storage.com/playground/compressed/toge-edit-compressed.mp4",
      kind: "video",
      alt: "Toge character edit",
      aspect: "1 / 1",
    },
  },
  {
    id: "white-elephant-invite",
    title: "White Elephant Invite",
    blurb: "A Christmas party invitation, made for friends.",
    categories: ["Graphic Design"],
    // The tile is a square crop of the top; the full poster opens.
    thumbnail: "/images/playground/invite-tile.jpg",
    media: {
      src: "/images/playground/invite.jpg",
      alt: "White Elephant party invitation, December 2025",
      aspect: "1500 / 2100",
    },
  },
];

/**
 * Animated characters that float around the board alongside the pieces. They
 * are small local files (a few hundred KB each), so they live in
 * public/animations/playground rather than on the CDN.
 */
export const playgroundStickers: PlaygroundSticker[] = [
  {
    id: "sticky-wave",
    label: "An orange sticky-note character waving hello",
    webm: "/animations/playground/sticky-wave.webm",
    webp: "/animations/playground/sticky-wave.webp",
    still: "/animations/playground/sticky-wave-still.webp",
    loopFrom: 2,
    behaviour: "float",
  },
  {
    id: "sticky-squint",
    label: "An orange sticky-note character squinting suspiciously",
    webm: "/animations/playground/sticky-squint.webm",
    webp: "/animations/playground/sticky-squint.webp",
    still: "/animations/playground/sticky-squint-still.webp",
    loopFrom: 3,
    behaviour: "float",
  },
  {
    id: "sticky-cap",
    label: "An orange sticky-note character in a cap, peeking up",
    webm: "/animations/playground/sticky-cap.webm",
    webp: "/animations/playground/sticky-cap.webp",
    still: "/animations/playground/sticky-cap-still.webp",
    behaviour: "peek",
    side: {
      webm: "/animations/playground/sticky-cap-side.webm",
      webp: "/animations/playground/sticky-cap-side.webp",
      still: "/animations/playground/sticky-cap-side-still.webp",
    },
  },
];

/**
 * Still stickers on the board. The cat is the site logo with a white border
 * added around its silhouette (public/images/playground/cat-sticker.png).
 */
export const playgroundDecals: PlaygroundDecal[] = [
  {
    id: "cat-sticker",
    src: "/images/playground/cat-sticker.png",
    width: 560,
    height: 628,
    label: "A sticker of the cat-shaped C logo",
  },
];

/**
 * Where everything starts on the board, keyed by id. Visitors can drag things
 * anywhere and their arrangement is remembered in their own browser; these are
 * the spots before that, and what "Tidy up" returns to.
 *
 * Wide is the desktop board (landscape), narrow the phone board (portrait).
 * Anything without a spot here is placed automatically.
 */
export const boardLayout: Record<"wide" | "narrow", Record<string, BoardSpot>> = {
  wide: {
    "muichiro-edit": { x: 0.2, y: 0.34, rotate: -4 },
    "toge-edit": { x: 0.5, y: 0.5, rotate: 2.5 },
    "white-elephant-invite": { x: 0.8, y: 0.36, rotate: -1.5 },
    "sticky-wave": { x: 0.7, y: 0.8, rotate: 0 },
    "sticky-squint": { x: 0.3, y: 0.8, rotate: 0 },
    "sticky-cap": { x: 0.1, y: 0.6, rotate: 0, edge: "left" },
    "cat-sticker": { x: 0.5, y: 0.14, rotate: 8 },
  },
  // The cat takes the top middle, so the photos sit a row lower than on desktop.
  narrow: {
    "muichiro-edit": { x: 0.3, y: 0.3, rotate: -4 },
    "toge-edit": { x: 0.68, y: 0.52, rotate: 3 },
    "white-elephant-invite": { x: 0.32, y: 0.75, rotate: -2 },
    "sticky-wave": { x: 0.76, y: 0.14, rotate: 0 },
    "sticky-squint": { x: 0.76, y: 0.85, rotate: 0 },
    "sticky-cap": { x: 0.15, y: 0.52, rotate: 0, edge: "left" },
    "cat-sticker": { x: 0.5, y: 0.1, rotate: 8 },
  },
};
