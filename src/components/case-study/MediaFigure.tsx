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
 *
 * Contained media is inset from the frame. Artwork that is trimmed to its own
 * bounds -- a logo, a mark -- would otherwise run edge to edge and read as
 * cramped; photography still fills the frame, which is what it wants.
 */
export function MediaFigure({
  media,
  defaultAspect = "16 / 9",
  sizes = "(min-width: 768px) 66vw, 100vw",
}: MediaFigureProps) {
  const isContained = media.fit === "contain";
  const fitClass = isContained ? "object-contain" : "object-cover";

  const content =
    media.kind === "video" ? (
      <video
        src={media.src}
        muted
        loop
        playsInline
        controls
        preload="metadata"
        aria-label={media.alt || undefined}
        className={`absolute inset-0 h-full w-full ${fitClass}`}
      />
    ) : (
      <SmartImage src={media.src} alt={media.alt} sizes={sizes} className={fitClass} />
    );

  return (
    <figure className="mx-auto w-full max-w-3xl">
      <div
        className="rounded-media bg-bg-raised relative w-full overflow-hidden"
        style={{ aspectRatio: media.aspect ?? defaultAspect }}
      >
        {isContained ? (
          // The inner box is what the media fills, so the padding actually
          // holds it off the edges -- padding on the frame alone would not,
          // since the media is positioned against the frame's own inset.
          <div className="absolute inset-0 p-6 md:p-12">
            <div className="relative h-full w-full">{content}</div>
          </div>
        ) : (
          content
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
