"use client";

import { useMemo, useState } from "react";
import { Container } from "./Container";
import { ProjectCard } from "./ProjectCard";
import { ProjectFilters } from "./ProjectFilters";
import { Reveal } from "./Reveal";
import type { Project, ProjectFilter } from "@/types/project";

/**
 * The homepage work section. This is the only client component on the page --
 * the hero and page shell stay on the server.
 *
 * Each card rises in as its own row reaches the viewport, rather than the
 * whole grid animating once on mount: scrolling down reveals row by row, and
 * the cards are still in their entrance state when the work link jumps here.
 * Re-keying by filter replays it, so a filtered set cascades in too.
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
      {/* Narrower than the site max: at the full 1440px a two-up grid makes each
          card hero-sized. Capping here keeps the heading row aligned with it. */}
      <Container className="max-w-6xl">
        <div className="border-line flex flex-wrap items-baseline justify-between gap-x-10 gap-y-4 border-b pb-5">
          <h2 id="work-heading" className="text-label text-muted uppercase">
            My work
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
              <Reveal
                key={`${filter}-${project.slug}`}
                className="h-full"
                // Two columns, so the second card in each row trails the first.
                delay={(index % 2) * 90}
              >
                <ProjectCard project={project} priority={index < 2} />
              </Reveal>
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
