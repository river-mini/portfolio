import { Container } from "./Container";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";
import type { Project } from "@/types/project";

/**
 * The homepage work section.
 *
 * Each card rises in as its own row reaches the viewport, rather than the
 * whole grid animating once on mount: scrolling down reveals row by row, and
 * the cards are still in their entrance state when the work link jumps here.
 */
export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <section id="work" aria-labelledby="work-heading" className="pb-(--section-gap)">
      {/* Narrower than the site max: at the full 1440px a two-up grid makes each
          card hero-sized. Capping here keeps the heading row aligned with it. */}
      <Container className="max-w-6xl">
        <div className="border-line border-b pb-5">
          <h2 id="work-heading" className="text-label text-muted uppercase">
            My work
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:gap-x-10 lg:gap-y-14">
          {projects.map((project, index) => (
            <Reveal
              key={project.slug}
              className="h-full"
              // Two columns, so the second card in each row trails the first.
              delay={(index % 2) * 90}
            >
              <ProjectCard project={project} priority={index < 2} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
