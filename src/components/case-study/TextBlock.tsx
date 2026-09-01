/**
 * Body copy, optionally led by a sub-head. Section headings render as a small
 * uppercase label, so this is the level that carries a section’s actual
 * headline.
 */
export function TextBlock({
  heading,
  paragraphs,
}: {
  heading?: string;
  paragraphs: string[];
}) {
  return (
    <div className="space-y-5">
      {heading ? <h3 className="text-title max-w-[40ch]">{heading}</h3> : null}
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="text-body-lg text-muted max-w-[72ch]">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
