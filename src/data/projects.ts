import type { Project } from "@/types/project";

/**
 * ---------------------------------------------------------------------------
 * PROJECT DATA — the main file to edit when adding real work.
 * ---------------------------------------------------------------------------
 * Order here is the order shown on the homepage.
 *
 * shortDescription -> the one-liner under each card, reused as the case-study
 *                      subtitle. Keep it to a single line.
 * thumbnail     -> put exports in /public/images/projects, or use a CDN URL
 * hoverVideoUrl -> optional, externally hosted MP4/WebM (never committed here)
 *
 * The hoverVideoUrl values below point at small public sample clips purely
 * so the hover interaction can be tested. Replace them with your own.
 */
export const projects: Project[] = [
  {
    slug: "longhorn-loop",
    title: "Longhorn Loop",
    year: "Aug 2025 — Present",
    categories: ["UI/UX", "Motion Design"],
    thumbnail: "/images/projects/longhorn-loop/splash.png",
    thumbnailFit: "contain",
    heroMedia: "/images/projects/project-1-wide.png",
    shortDescription: "One-line description of the project goes here.",
  },
  {
    slug: "animated-intro",
    title: "ARH301 Animated Intro",
    year: "Jul — Aug 2026",
    categories: ["Motion Design"],
    thumbnail: "/images/projects/project-2.png",
    heroMedia: "/images/projects/project-2-wide.png",
    shortDescription: "One-line description of the project goes here.",
  },
  {
    slug: "sweethearts-x-barbie",
    title: "Sweethearts x Barbie Ad",
    year: "Mar 2026",
    categories: ["Motion Design"],
    thumbnail: "/images/projects/project-3.png",
    heroMedia: "/images/projects/project-3-wide.png",
    shortDescription: "One-line description of the project goes here.",
  },
  {
    slug: "christmas-invitation",
    title: "Christmas Invitation",
    year: "Dec 2025",
    categories: ["Graphic Design"],
    thumbnail: "/images/projects/project-4.png",
    heroMedia: "/images/projects/project-4-wide.png",
    shortDescription: "One-line description of the project goes here.",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/**
 * Adjacent projects for the case-study pager. Neither wraps: the first project
 * has no previous and the last has no next, so the controls always reflect a
 * real position in the list.
 */
export function getPreviousProject(slug: string): Project | undefined {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index <= 0) return undefined;
  return projects[index - 1];
}

export function getNextProject(slug: string): Project | undefined {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1 || index === projects.length - 1) return undefined;
  return projects[index + 1];
}
