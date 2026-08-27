import type { CaseStudyFact } from "@/types/case-study";

/**
 * At-a-glance panel for role, timeline, team and tools. Two columns on wider
 * screens, stacking on mobile. Values may be an array to render stacked lines
 * (a team list, for example).
 */
export function FactSheet({ items }: { items: CaseStudyFact[] }) {
  return (
    <dl className="bg-bg-raised rounded-panel grid grid-cols-1 gap-x-10 gap-y-8 p-7 sm:grid-cols-2 md:p-9">
      {items.map((item) => (
        <div key={item.label}>
          <dt className="text-label text-subtle uppercase">{item.label}</dt>
          <dd className="text-body mt-2">
            {Array.isArray(item.value)
              ? item.value.map((line, index) => (
                  <span key={index} className="block">
                    {line}
                  </span>
                ))
              : item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
