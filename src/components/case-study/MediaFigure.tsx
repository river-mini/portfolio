import { SmartImage } from "../SmartImage";
import type { CaseStudyMedia } from "@/types/case-study";

type MediaFigureProps = {
  media: CaseStudyMedia;
  /** Fallback aspect ratio when the media doesn't specify one. */
  defaultAspect?: string;
  sizes?: string;
};

/** Tallest a figure may be, so nothing outgrows the window it is read in. */
const MAX_HEIGHT = "68svh";

/** "16 / 9" -> 1.777…, so the height cap can be expressed as a width. */
function ratioOf(aspect: string) {
  const [w, h] = aspect.split("/").map((part) => Number.parseFloat(part.trim()));
  return w > 0 && h > 0 ? w / h : 16 / 9;
}

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
  // Contained artwork is inset; contained footage is not -- a video on a
  // backdrop wants the full height of its frame.
  const isPadded = isContained && media.kind !== "video";
  const fitClass = isContained ? "object-contain" : "object-cover";
  const aspect = media.aspect ?? defaultAspect;

  // Capping the width is what caps the height, since the ratio fixes one from
  // the other. A portrait piece at full column width would stand taller than
  // the window; landscape media never reaches the cap and is left alone.
  //
  // Footage on a backdrop is allowed past the usual measure: the extra width
  // is backdrop rather than content, and holding it to 48rem would force the
  // height -- and so the footage itself -- down instead.
  const measure = isContained && media.kind === "video" ? "56rem" : "48rem";
  const maxWidth = `min(${measure}, calc(${MAX_HEIGHT} * ${ratioOf(aspect)}))`;

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
    <figure className="mx-auto w-full" style={{ maxWidth }}>
      <div
        className="rounded-media bg-bg-raised relative w-full overflow-hidden"
        style={{ aspectRatio: aspect }}
      >
        {isPadded ? (
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
