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
 * Everything below is placeholder. Replace the strings in place.
 */
export const playgroundItems: PlaygroundItem[] = [
  {
    id: "piece-one",
    title: "Piece One",
    blurb: "One line about what this is.",
    categories: ["Motion Design"],
    thumbnail: "/images/projects/project-2.png",
  },
  {
    id: "piece-two",
    title: "Piece Two",
    blurb: "One line about what this is.",
    categories: ["Graphic Design"],
    thumbnail: "/images/projects/project-3.png",
  },
  {
    id: "piece-three",
    title: "Piece Three",
    blurb: "One line about what this is.",
    categories: ["UI/UX"],
    thumbnail: "/images/projects/project-4.png",
  },
  {
    id: "piece-four",
    title: "Piece Four",
    blurb: "One line about what this is.",
    categories: ["Motion Design", "Graphic Design"],
    thumbnail: "/images/projects/project-2.png",
  },
  {
    id: "piece-five",
    title: "Piece Five",
    blurb: "One line about what this is.",
    categories: ["Graphic Design"],
    thumbnail: "/images/projects/project-3.png",
  },
  {
    id: "piece-six",
    title: "Piece Six",
    blurb: "One line about what this is.",
    categories: ["Motion Design"],
    thumbnail: "/images/projects/project-4.png",
  },
];
