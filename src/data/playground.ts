import type { PlaygroundItem } from "@/types/playground";

/**
 * ---------------------------------------------------------------------------
 * PLAYGROUND — the file to edit when adding a piece.
 * ---------------------------------------------------------------------------
 * Order here is the order shown. Every entry needs a square thumbnail; add
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
