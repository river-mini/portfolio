/**
 * Core content types for the portfolio.
 *
 * Project *metadata* lives in `src/data/projects.ts`.
 * Longer case-study *content* lives in `src/data/case-studies.ts`.
 */

export type ProjectCategory = "UI/UX" | "Motion Design" | "Graphic Design";

/** Ordered list that drives the homepage filter controls. */
export const PROJECT_CATEGORIES = [
  "UI/UX",
  "Motion Design",
  "Graphic Design",
] as const satisfies readonly ProjectCategory[];

/** "All" is a filter state, not a category a project can carry. */
export type ProjectFilter = "All" | ProjectCategory;

export type Project = {
  slug: string;
  title: string;
  year: string;
  /** A project may belong to several categories. */
  categories: ProjectCategory[];
  /** Grid thumbnail. Local path under /public, or an absolute URL. */
  thumbnail: string;
  /**
   * How the thumbnail fills the card. Defaults to "cover", which crops to the
   * card ratio. Use "contain" for art that must be seen whole -- a portrait
   * phone mockup, say -- and it sits letterboxed on the raised ground.
   */
  thumbnailFit?: "cover" | "contain";
  /**
   * Optional externally hosted preview, played on hover on pointer devices.
   * Use a direct MP4/WebM URL (CDN, Cloudflare Stream, S3, ...) so the video
   * never has to live in this repository.
   */
  hoverVideoUrl?: string;
  shortDescription?: string;
  /** Reserved for future asymmetric grid layouts. */
  featured?: boolean;
  /** Case-study hero media. Falls back to `thumbnail` when omitted. */
  heroMedia?: string;
};
