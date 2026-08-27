import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { SmartImage } from "@/components/SmartImage";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
import { getCaseStudy } from "@/data/case-studies";
import { getNextProject, getProjectBySlug, projects } from "@/data/projects";

/** Every project is known at build time, so all case studies prerender. */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const description =
    project.shortDescription ??
    `${project.title} — ${project.categories.join(", ")}, ${project.year}.`;

  return {
    title: project.title,
    description,
    openGraph: {
      title: `${project.title} — Cindy Truong`,
      description,
      images: [{ url: project.heroMedia ?? project.thumbnail }],
    },
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const caseStudy = getCaseStudy(slug);
  const nextProject = getNextProject(slug);
  const heroSrc = project.heroMedia ?? project.thumbnail;

  return (
    <article className="pt-(--section-gap) pb-(--section-gap)">
      <Container>
        {/* --- Title block ------------------------------------------------- */}
        <header className="md:grid md:grid-cols-12 md:gap-8">
          <div className="md:col-span-8">
            <h1 className="text-display max-w-[14ch]">{project.title}</h1>
            {project.shortDescription ? (
              <p className="text-body-lg text-muted mt-8 max-w-[52ch]">
                {project.shortDescription}
              </p>
            ) : null}
          </div>

          <dl className="mt-10 flex gap-12 md:col-span-3 md:col-start-10 md:mt-2 md:flex-col md:gap-8">
            <div>
              <dt className="text-label text-subtle uppercase">Categories</dt>
              <dd className="text-meta mt-2">{project.categories.join(" · ")}</dd>
            </div>
            <div>
              <dt className="text-label text-subtle uppercase">Year</dt>
              <dd className="text-meta mt-2 tabular-nums">{project.year}</dd>
            </div>
          </dl>
        </header>

        {/* --- Hero media --------------------------------------------------- */}
        <div
          className="rounded-media bg-bg-raised relative mt-14 w-full overflow-hidden md:mt-20"
          style={{ aspectRatio: "16 / 9" }}
        >
          <SmartImage
            src={heroSrc}
            alt={`${project.title} — hero image`}
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>

        {/* --- Case-study body ---------------------------------------------
            Sections come from src/data/case-studies.ts. Until a project gets
            its own entry there, the shared placeholder outline is rendered. */}
        <div className="mt-20 space-y-16 md:mt-28 md:space-y-20">
          {caseStudy.sections.map((section) => (
            <CaseStudySection key={section.id} section={section} />
          ))}
        </div>

        {/* --- Next project -------------------------------------------------- */}
        {nextProject ? (
          <nav
            aria-label="Next project"
            className="border-line mt-24 border-t pt-8 md:mt-32"
          >
            <p className="text-label text-subtle uppercase">Next project</p>
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group mt-4 inline-flex items-baseline gap-4"
            >
              <span className="text-heading ease-standard transition-colors duration-200 group-hover:text-muted">
                {nextProject.title}
              </span>
              <span
                aria-hidden="true"
                className="ease-standard text-muted transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </nav>
        ) : null}
      </Container>
    </article>
  );
}
