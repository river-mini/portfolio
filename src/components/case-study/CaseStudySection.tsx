import { BlockRenderer } from "./BlockRenderer";
import type { CaseStudyBlock, CaseStudySection as Section } from "@/types/case-study";

/**
 * Space above a block, given what precedes it.
 *
 * Prose that continues prose gets the same gap paragraphs get inside a single
 * text block, so a run of writing reads at one rhythm however it happens to be
 * split up in the data. Anything else -- media arriving, or a sub-head opening
 * a new thought -- gets the full gap, because there a break is the point.
 */
function gapBefore(block: CaseStudyBlock, previous: CaseStudyBlock | undefined) {
  if (!previous) return "";
  const continuesProse =
    block.type === "text" && previous.type === "text" && !block.heading;
  return continuesProse ? "mt-5" : "mt-12";
}

/**
 * A section of the case-study body. The heading sits above its content rather
 * than in a left column, because the left rail now holds the section nav.
 */
export function CaseStudySection({ section }: { section: Section }) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-heading`}
      className="case-study-section border-line border-t pt-8"
    >
      <h2
        id={`${section.id}-heading`}
        className="text-label text-muted uppercase"
      >
        {section.heading}
      </h2>

      <div className="mt-6">
        {section.blocks.map((block, index) => (
          <div key={index} className={gapBefore(block, section.blocks[index - 1])}>
            <BlockRenderer block={block} />
          </div>
        ))}
      </div>
    </section>
  );
}
