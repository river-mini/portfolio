import { Hero } from "@/components/Hero";
import { ProjectGrid } from "@/components/ProjectGrid";
import { projects } from "@/data/projects";

/**
 * Server component. Only the work section (filters + hover previews) ships
 * client JavaScript.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ProjectGrid projects={projects} />
    </>
  );
}
