import { BlockRenderer } from "./BlockRenderer";
import type { CaseStudySection as Section } from "@/types/case-study";

/**
 * Editorial two-column section: label on the left, content on the right,
 * stacking on smaller screens.
 */
export function CaseStudySection({ section }: { section: Section }) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-heading`}
      className="border-line border-t pt-8 md:grid md:grid-cols-12 md:gap-8"
    >
      <h2
        id={`${section.id}-heading`}
        className="text-label text-muted uppercase md:col-span-3"
      >
        {section.heading}
      </h2>

      <div className="mt-5 space-y-12 md:col-span-8 md:col-start-5 md:mt-0">
        {section.blocks.map((block, index) => (
          <BlockRenderer key={index} block={block} />
        ))}
      </div>
    </section>
  );
}
