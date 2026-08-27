import { Hero } from "@/components/Hero";
import { IntroOverlay } from "@/components/IntroOverlay";
import { ProjectGrid } from "@/components/ProjectGrid";
import { projects } from "@/data/projects";

/**
 * Server component. Only the work section (filters + hover previews) and the
 * intro overlay ship client JavaScript.
 */
export default function HomePage() {
  return (
    <>
      <IntroOverlay />
      <Hero />
      <ProjectGrid projects={projects} />
    </>
  );
}
