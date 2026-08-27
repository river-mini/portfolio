import { BlockRenderer } from "./BlockRenderer";
import type { CaseStudySection as Section } from "@/types/case-study";

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

      <div className="mt-6 space-y-12">
        {section.blocks.map((block, index) => (
          <BlockRenderer key={index} block={block} />
        ))}
      </div>
    </section>
  );
}
