import { AssembleGrid } from "./AssembleGrid";
import { Container } from "./Container";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/types/project";

/**
 * The homepage work section.
 *
 * The cards start gathered at the grid's centre point and spread out to their
 * places as the visitor scrolls into the section (see AssembleGrid).
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

        <AssembleGrid className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:gap-x-10 lg:gap-y-14">
          {projects.map((project, index) => (
            <div key={project.slug} className="h-full will-change-transform">
              <ProjectCard project={project} priority={index < 2} />
            </div>
          ))}
        </AssembleGrid>
      </Container>
    </section>
  );
}
