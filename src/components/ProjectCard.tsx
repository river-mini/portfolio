import Link from "next/link";
import { ProjectMedia } from "./ProjectMedia";
import type { Project } from "@/types/project";

type ProjectCardProps = {
  project: Project;
  /** Eager-loads the thumbnail. Use for the first row only. */
  priority?: boolean;
};

/**
 * One project in the grid: media, title, categories, year. The whole card is a
 * single link, so it is reachable with one Tab stop and shows one focus ring.
 */
export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const { slug, title, year, categories, thumbnail, hoverVideoUrl } = project;

  return (
    <Link href={`/projects/${slug}`} className="group block">
      <ProjectMedia
        thumbnail={thumbnail}
        videoUrl={hoverVideoUrl}
        alt={`${title} — project preview`}
        priority={priority}
      />

      <h3 className="text-title ease-standard mt-5 transition-colors duration-200 group-hover:text-muted">
        {title}
      </h3>

      <div className="mt-1.5 flex items-baseline justify-between gap-6">
        <p className="text-label text-muted uppercase">{categories.join(" · ")}</p>
        <span className="text-meta text-subtle tabular-nums">{year}</span>
      </div>
    </Link>
  );
}
