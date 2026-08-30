"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

  // Fade the section in as it scrolls into view.
  //
  // "idle" is what the server renders: fully visible. The section is only
  // hidden once we know it starts below the fold, so it never flashes out and
  // back in, and the work stays readable if JavaScript never runs. The
  // transition lives on the "shown" state alone, which makes idle -> hidden
  // instant and hidden -> shown animated.
  const sectionRef = useRef<HTMLElement>(null);
  const [reveal, setReveal] = useState<"idle" | "hidden" | "shown">("idle");

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;
    if (element.getBoundingClientRect().top < window.innerHeight) return;

    setReveal("hidden");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setReveal("shown");
        observer.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const revealClass =
    reveal === "hidden"
      ? "translate-y-6 opacity-0"
      : reveal === "shown"
        ? "ease-soft translate-y-0 opacity-100 transition-[opacity,transform] duration-500"
        : "";

  return (
    <section
      ref={sectionRef}
      id="work"
      aria-labelledby="work-heading"
      className="pb-(--section-gap)"
    >
      {/* Narrower than the site max: at the full 1440px a two-up grid makes each
          card hero-sized. Capping here keeps the heading row aligned with it.
          The reveal rides on the Container so the section itself -- the scroll
          target for /#work -- is never transformed. */}
      <Container className={`max-w-6xl ${revealClass}`}>
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
