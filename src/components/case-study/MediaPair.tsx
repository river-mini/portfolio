import { MediaFigure } from "./MediaFigure";
import type { CaseStudyMedia } from "@/types/case-study";

/** Two pieces of media side by side on desktop, stacked on mobile. */
export function MediaPair({ media }: { media: [CaseStudyMedia, CaseStudyMedia] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {media.map((item, index) => (
        <MediaFigure
          key={index}
          media={item}
          defaultAspect="4 / 3"
          sizes="(min-width: 768px) 33vw, 100vw"
        />
      ))}
    </div>
  );
}
