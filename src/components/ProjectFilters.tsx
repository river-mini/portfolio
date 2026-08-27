"use client";

import { PROJECT_CATEGORIES, type ProjectFilter } from "@/types/project";

/** "All" first, then the categories in their canonical order. */
const FILTERS: ProjectFilter[] = ["All", ...PROJECT_CATEGORIES];

type ProjectFiltersProps = {
  active: ProjectFilter;
  onChange: (filter: ProjectFilter) => void;
};

export function ProjectFilters({ active, onChange }: ProjectFiltersProps) {
  return (
    <div
      role="group"
      aria-label="Filter projects by category"
      className="flex flex-wrap items-center gap-x-6 gap-y-2"
    >
      {FILTERS.map((filter) => {
        const isActive = filter === active;

        return (
          <button
            key={filter}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(filter)}
            className={`text-meta ease-standard relative cursor-pointer pb-1 transition-colors duration-200 ${
              isActive ? "text-ink" : "text-subtle hover:text-ink"
            }`}
          >
            {filter}
            <span
              aria-hidden="true"
              className={`bg-ink ease-standard absolute inset-x-0 bottom-0 h-px origin-left transition-transform duration-300 ${
                isActive ? "scale-x-100" : "scale-x-0"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
