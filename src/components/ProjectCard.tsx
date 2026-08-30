import Link from "next/link";
import { ProjectMedia } from "./ProjectMedia";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
  /** Eager-loads the thumbnail. Use for the first row only. */
  priority?: boolean;
};

/**
 * One project in the grid: media, title, categories, year and a one-line
 * description. The whole card is a single link, so it is reachable in one Tab
 * stop and shows one focus ring.
 *
 * On hover the card lifts slightly and takes the shared card shadow. The lift
 * is a transform, so it never reflows the grid.
 */
export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const { slug, title, year, categories, thumbnail, hoverVideoUrl, shortDescription } =
    project;

  return (
    <Link
      href={`/projects/${slug}`}
      className="group border-line rounded-card ease-standard hover:border-line-strong hover:shadow-card flex h-full flex-col border p-3 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1"
    >
      {/* 3:2 rather than the component default 4:3, and the section is width-
          capped, so a row of two reads as a grid instead of filling the fold. */}
      <ProjectMedia
        thumbnail={thumbnail}
        videoUrl={hoverVideoUrl}
        alt={`${title} — project preview`}
        aspect="3 / 2"
        sizes="(min-width: 1024px) 480px, (min-width: 768px) 50vw, 100vw"
        priority={priority}
      />

      <div className="px-1 pt-5 pb-2">
        <h3 className="text-title ease-standard transition-colors duration-200 group-hover:text-muted">
          {title}
        </h3>

        <div className="mt-1.5 flex items-baseline justify-between gap-6">
          <p className="text-label text-muted uppercase">{categories.join(" · ")}</p>
          <span className="text-meta text-subtle tabular-nums">{year}</span>
        </div>

        {shortDescription ? (
          <p className="text-meta text-subtle mt-3">{shortDescription}</p>
        ) : null}
      </div>
    </Link>
  );
}
