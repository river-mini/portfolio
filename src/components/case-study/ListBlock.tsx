/**
 * A set of points that read better as a list than as prose -- concepts
 * considered, states covered. Same type and measure as body copy, so it sits
 * in the column rather than looking like a different kind of content.
 */
export function ListBlock({
  heading,
  items,
}: {
  heading?: string;
  items: string[];
}) {
  return (
    <div className="space-y-5">
      {heading ? <h3 className="text-title max-w-[34ch]">{heading}</h3> : null}
      <ul className="text-body-lg text-muted max-w-[72ch] list-disc space-y-3 pl-5 marker:text-subtle">
        {items.map((item, index) => (
          <li key={index} className="pl-1">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
