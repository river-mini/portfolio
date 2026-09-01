/**
 * Case-study content model.
 *
 * Deliberately small: a case study is a list of sections, and each section is
 * a list of content blocks. That is enough to lay out real work today, and it
 * leaves a clean seam for richer content later (MDX, or a CMS) without having
 * to change the page component.
 */

export type CaseStudyMedia = {
  /** Local path under /public, or an absolute URL to externally hosted media. */
  src: string;
  alt: string;
  caption?: string;
  /** Defaults to "image". Use "video" for MP4/WebM sources. */
  kind?: "image" | "video";
  /** CSS aspect-ratio value, e.g. "16 / 9". Defaults per block type. */
  aspect?: string;
};

/** One label/value pair in a fact sheet. Arrays render as stacked lines. */
export type CaseStudyFact = {
  label: string;
  value: string | string[];
};

export type CaseStudyBlock =
  /** `heading` renders above the paragraphs, for a sub-head inside a section. */
  | { type: "text"; heading?: string; paragraphs: string[] }
  | { type: "factSheet"; items: CaseStudyFact[] }
  | { type: "media"; media: CaseStudyMedia }
  | { type: "mediaPair"; media: [CaseStudyMedia, CaseStudyMedia] };

export type CaseStudySection = {
  /** Used as the heading's DOM id, so sections can be linked directly. */
  id: string;
  heading: string;
  blocks: CaseStudyBlock[];
};

export type CaseStudy = {
  sections: CaseStudySection[];
};
