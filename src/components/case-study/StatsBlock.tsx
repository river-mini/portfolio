/**
 * Headline figures. The number carries the weight and the label sits under it,
 * which is what separates a set of results from the label-first fact sheet.
 */
export function StatsBlock({
  items,
}: {
  items: { value: string; label: string }[];
}) {
  return (
    <dl className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4">
      {items.map((item) => (
        <div key={item.label}>
          <dt className="sr-only">{item.label}</dt>
          <dd>
            <span className="text-heading block">{item.value}</span>
            <span className="text-meta text-subtle mt-1 block max-w-[18ch]">
              {item.label}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
