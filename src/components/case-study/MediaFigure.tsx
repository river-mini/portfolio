import { SmartImage } from "../SmartImage";
import type { CaseStudyMedia } from "@/types/case-study";

type MediaFigureProps = {
  media: CaseStudyMedia;
  /** Fallback aspect ratio when the media doesn't specify one. */
  defaultAspect?: string;
  sizes?: string;
};

/**
 * A single image or video with an optional caption. Handles both local files
 * and externally hosted media, so large videos can live on a CDN.
 */
export function MediaFigure({
  media,
  defaultAspect = "16 / 9",
  sizes = "(min-width: 768px) 66vw, 100vw",
}: MediaFigureProps) {
  return (
    <figure>
      <div
        className="rounded-media bg-bg-raised relative w-full overflow-hidden"
        style={{ aspectRatio: media.aspect ?? defaultAspect }}
      >
        {media.kind === "video" ? (
          <video
            src={media.src}
            muted
            loop
            playsInline
            controls
            preload="metadata"
            aria-label={media.alt || undefined}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <SmartImage
            src={media.src}
            alt={media.alt}
            sizes={sizes}
            className="object-cover"
          />
        )}
      </div>

      {media.caption ? (
        <figcaption className="text-meta text-subtle mt-3">
          {media.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
