import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { SmartImage } from "@/components/SmartImage";
import { CaseStudyNav } from "@/components/case-study/CaseStudyNav";
import { CaseStudySection } from "@/components/case-study/CaseStudySection";
import { getCaseStudy } from "@/data/case-studies";
import {
  getNextProject,
  getPreviousProject,
  getProjectBySlug,
  projects,
} from "@/data/projects";

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
  const previousProject = getPreviousProject(slug);
  const nextProject = getNextProject(slug);
  const heroSrc = project.heroMedia ?? project.thumbnail;

  return (
    <article className="pt-12 pb-(--section-gap) md:pt-16">
      <Container>
        {/* --- Title block ------------------------------------------------- */}
        <header className="page-rise md:grid md:grid-cols-12 md:gap-8">
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
        {/* Banner, pulled in from full bleed: same flat crop, centred and
            scaled in from the content width. Mobile stays at 3:2 --
            a 2:1 strip on a phone is a sliver. */}
        <div
          className="page-rise rounded-media bg-bg-raised relative mx-auto mt-8 aspect-[3/2] w-full max-w-3xl overflow-hidden md:mt-12 md:aspect-[2/1]"
          // An inline ratio beats the classes at every breakpoint, so a project
          // that sets one gets it everywhere and the rest keep the responsive
          // default of 3:2 on mobile, 2:1 above it.
          style={{
            animationDelay: "120ms",
            ...(project.heroAspect ? { aspectRatio: project.heroAspect } : {}),
          }}
        >
          <SmartImage
            src={heroSrc}
            alt={`${project.title} — hero image`}
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
            priority
          />
        </div>

        {/* --- Case-study body ---------------------------------------------
            Section nav in the left rail, content on the right. Sections come
            from src/data/case-studies.ts; until a project gets its own entry
            there, the shared placeholder outline is rendered. */}
        <div
          className="page-rise mt-10 md:mt-14 md:grid md:grid-cols-[11rem_1fr] md:gap-10"
          style={{ animationDelay: "240ms" }}
        >
          <div className="hidden md:block">
            <CaseStudyNav
              sections={caseStudy.sections.map(({ id, heading }) => ({
                id,
                heading,
              }))}
            />
          </div>

          <div className="space-y-16 md:space-y-20">
            {caseStudy.sections.map((section) => (
              <CaseStudySection key={section.id} section={section} />
            ))}
          </div>
        </div>

        {/* --- Project pager ------------------------------------------------
            Neither direction wraps, so the controls reflect a real position
            in the project list. */}
        {previousProject || nextProject ? (
          <nav
            aria-label="Project navigation"
            className="border-line mt-24 grid gap-10 border-t pt-8 sm:grid-cols-2 md:mt-32"
          >
            {previousProject ? (
              <div>
                <p className="text-label text-subtle uppercase">Previous project</p>
                <Link
                  href={`/projects/${previousProject.slug}`}
                  className="group mt-4 inline-flex items-baseline gap-3"
                >
                  <span
                    aria-hidden="true"
                    className="ease-standard text-muted transition-transform duration-300 group-hover:-translate-x-1"
                  >
                    &larr;
                  </span>
                  <span className="text-heading ease-standard transition-colors duration-200 group-hover:text-muted">
                    {previousProject.title}
                  </span>
                </Link>
                {previousProject.shortDescription ? (
                  <p className="text-meta text-subtle mt-2 max-w-[38ch]">
                    {previousProject.shortDescription}
                  </p>
                ) : null}
              </div>
            ) : (
              <div aria-hidden="true" />
            )}

            {nextProject ? (
              <div className="sm:text-right">
                <p className="text-label text-subtle uppercase">Next project</p>
                <Link
                  href={`/projects/${nextProject.slug}`}
                  className="group mt-4 inline-flex items-baseline gap-3"
                >
                  <span className="text-heading ease-standard transition-colors duration-200 group-hover:text-muted">
                    {nextProject.title}
                  </span>
                  <span
                    aria-hidden="true"
                    className="ease-standard text-muted transition-transform duration-300 group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </Link>
                {nextProject.shortDescription ? (
                  <p className="text-meta text-subtle mt-2 sm:ml-auto max-w-[38ch]">
                    {nextProject.shortDescription}
                  </p>
                ) : null}
              </div>
            ) : null}
          </nav>
        ) : null}
      </Container>
    </article>
  );
}
