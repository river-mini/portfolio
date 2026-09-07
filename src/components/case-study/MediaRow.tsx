import { MediaFigure } from "./MediaFigure";
import type { CaseStudyMedia } from "@/types/case-study";

/**
 * Two or three pieces of media across, stacking on mobile. Columns follow the
 * count, so a trio does not leave a gap where a fourth would go.
 */
export function MediaRow({ media }: { media: CaseStudyMedia[] }) {
  const columns = media.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";
  return (
    <div className={`grid grid-cols-1 gap-6 ${columns}`}>
      {media.map((item, index) => (
        <MediaFigure
          key={index}
          media={item}
          defaultAspect="4 / 3"
          sizes="(min-width: 768px) 25vw, 100vw"
        />
      ))}
    </div>
  );
}
