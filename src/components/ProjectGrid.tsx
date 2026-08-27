"use client";

import { useMemo, useState } from "react";
import { Container } from "./Container";
import { ProjectCard } from "./ProjectCard";
import { ProjectFilters } from "./ProjectFilters";
import type { Project, ProjectFilter } from "@/types/project";

/**
 * The homepage work section. This is the only client component on the page --
 * the hero and page shell stay on the server.
 *
 * Filtering re-keys each card by the active filter, so the matching set
 * re-runs its entrance animation instead of popping in. The stagger is capped
 * so a long list never feels slow.
 */
export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<ProjectFilter>("All");

  const visible = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((project) => project.categories.includes(filter)),
    [filter, projects]
  );

  return (
    <section id="work" aria-labelledby="work-heading" className="pb-(--section-gap)">
      <Container>
        <div className="border-line flex flex-wrap items-baseline justify-between gap-x-10 gap-y-4 border-b pb-5">
          <h2 id="work-heading" className="text-label text-muted uppercase">
            Selected Work
          </h2>
          <ProjectFilters active={filter} onChange={setFilter} />
        </div>

        {/* Announces the result count to screen readers when filters change. */}
        <p aria-live="polite" className="sr-only">
          {visible.length} {visible.length === 1 ? "project" : "projects"} shown
        </p>

        {visible.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:gap-x-10 lg:gap-y-14">
            {visible.map((project, index) => (
              <div
                key={`${filter}-${project.slug}`}
                className="animate-rise h-full"
                style={{ animationDelay: `${Math.min(index, 5) * 60}ms` }}
              >
                <ProjectCard project={project} priority={index < 2} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-body-lg text-muted mt-12">
            No projects in this category yet.
          </p>
        )}
      </Container>
    </section>
  );
}
