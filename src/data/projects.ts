import type { Project } from "@/types/project";

/**
 * ---------------------------------------------------------------------------
 * PROJECT DATA — the main file to edit when adding real work.
 * ---------------------------------------------------------------------------
 * Order here is the order shown on the homepage.
 *
 * thumbnail     -> put exports in /public/images/projects, or use a CDN URL
 * hoverVideoUrl -> optional, externally hosted MP4/WebM (never committed here)
 *
 * The hoverVideoUrl values below point at small public sample clips purely
 * so the hover interaction can be tested. Replace them with your own.
 */
export const projects: Project[] = [
  {
    slug: "project-one",
    title: "Project One",
    year: "2026",
    categories: ["UI/UX", "Motion Design"],
    thumbnail: "/images/projects/project-1.png",
    heroMedia: "/images/projects/project-1-wide.png",
    hoverVideoUrl:
      "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
    shortDescription: "Short description placeholder.",
    featured: true,
  },
  {
    slug: "project-two",
    title: "Project Two",
    year: "2025",
    categories: ["Graphic Design"],
    thumbnail: "/images/projects/project-2.png",
    heroMedia: "/images/projects/project-2-wide.png",
    shortDescription: "Short description placeholder.",
  },
  {
    slug: "project-three",
    title: "Project Three",
    year: "2025",
    categories: ["Motion Design"],
    thumbnail: "/images/projects/project-3.png",
    heroMedia: "/images/projects/project-3-wide.png",
    hoverVideoUrl:
      "https://test-videos.co.uk/vids/jellyfish/mp4/h264/360/Jellyfish_360_10s_1MB.mp4",
    shortDescription: "Short description placeholder.",
  },
  {
    slug: "project-four",
    title: "Project Four",
    year: "2024",
    categories: ["UI/UX"],
    thumbnail: "/images/projects/project-4.png",
    heroMedia: "/images/projects/project-4-wide.png",
    hoverVideoUrl:
      "https://test-videos.co.uk/vids/sintel/mp4/h264/360/Sintel_360_10s_1MB.mp4",
    shortDescription: "Short description placeholder.",
  },
  {
    slug: "project-five",
    title: "Project Five",
    year: "2024",
    categories: ["Graphic Design", "Motion Design"],
    thumbnail: "/images/projects/project-5.png",
    heroMedia: "/images/projects/project-5-wide.png",
    shortDescription: "Short description placeholder.",
  },
  {
    slug: "project-six",
    title: "Project Six",
    year: "2023",
    categories: ["UI/UX", "Graphic Design"],
    thumbnail: "/images/projects/project-6.png",
    heroMedia: "/images/projects/project-6-wide.png",
    hoverVideoUrl:
      "https://mdn.github.io/shared-assets/videos/flower.mp4",
    shortDescription: "Short description placeholder.",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Wraps around, so the last project links back to the first. */
export function getNextProject(slug: string): Project | undefined {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return undefined;
  return projects[(index + 1) % projects.length];
}
