"use client";

import { useEffect, useState } from "react";

type NavSection = { id: string; heading: string };

/**
 * Vertical in-page nav for a case study.
 *
 * Sits in the left rail and stays put while the body scrolls, so every section
 * is one click away at any point. The section currently in view is marked by
 * colour alone -- no movement, so the rail stays quiet while reading.
 *
 * Desktop only: at narrow widths there is no room for a rail beside the
 * content, and the sections read linearly anyway.
 */
export function CaseStudyNav({ sections }: { sections: NavSection[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Of everything on screen, the highest wins. Keeping the previous value
        // when nothing intersects stops the marker blinking out between
        // sections.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-120px 0px -55% 0px", threshold: 0 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sections]);

  if (sections.length === 0) return null;

  return (
    <nav aria-label="Case study sections" className="sticky top-32">
      <ul className="border-line space-y-3 border-l pl-5">
        {sections.map((section) => {
          const isActive = section.id === activeId;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`text-meta ease-standard block transition-colors duration-200 ${
                  isActive ? "text-ink" : "text-subtle hover:text-ink"
                }`}
              >
                {section.heading}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
