import type { CaseStudy, CaseStudySection } from "@/types/case-study";

/**
 * ---------------------------------------------------------------------------
 * CASE-STUDY CONTENT
 * ---------------------------------------------------------------------------
 * Every project falls back to the placeholder outline below until it gets its
 * own entry in `caseStudies`. To write a real case study, copy the outline,
 * key it by the project slug, and replace the blocks.
 *
 * Available blocks (see src/types/case-study.ts):
 *   { type: "text",      paragraphs: ["...", "..."] }
 *   { type: "media",     media: { src, alt, caption?, kind?, aspect? } }
 *   { type: "mediaPair", media: [ {...}, {...} ] }
 *
 * `src` accepts a local /public path or an absolute URL, so large videos can
 * stay on a CDN. Set kind: "video" for MP4/WebM.
 *
 * If these case studies later outgrow plain data, this is the seam to swap for
 * MDX or a CMS: the page only consumes `getCaseStudy()`, nothing else.
 */

function placeholderSections(): CaseStudySection[] {
  return [
    {
      id: "overview",
      heading: "Overview",
      blocks: [{ type: "text", paragraphs: ["Add overview here."] }],
    },
    {
      id: "context",
      heading: "Context",
      blocks: [{ type: "text", paragraphs: ["Add project context here."] }],
    },
    {
      id: "process",
      heading: "Process",
      blocks: [{ type: "text", paragraphs: ["Add process here."] }],
    },
    {
      id: "outcome",
      heading: "Final Design / Outcome",
      blocks: [{ type: "text", paragraphs: ["Add final work here."] }],
    },
    {
      id: "reflection",
      heading: "Reflection",
      blocks: [{ type: "text", paragraphs: ["Add reflection here."] }],
    },
  ];
}

/** Per-slug overrides. Empty until real case studies are written. */
const caseStudies: Record<string, CaseStudy> = {
  // "project-one": {
  //   sections: [
  //     {
  //       id: "overview",
  //       heading: "Overview",
  //       blocks: [
  //         { type: "text", paragraphs: ["..."] },
  //         {
  //           type: "media",
  //           media: {
  //             src: "https://cdn.example.com/project-one/hero.mp4",
  //             kind: "video",
  //             alt: "",
  //             caption: "Optional caption",
  //           },
  //         },
  //       ],
  //     },
  //     ...placeholderSections().slice(1),
  //   ],
  // },
};

export function getCaseStudy(slug: string): CaseStudy {
  return caseStudies[slug] ?? { sections: placeholderSections() };
}
