"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { scrollToElement } from "../SmoothScroll";

type NavSection = { id: string; heading: string };

/**
 * Vertical in-page nav for a case study.
 *
 * Sits in the left rail and stays put while the body scrolls, so every section
 * is one click away at any point. The section in view is marked three ways at
 * once -- full-contrast ink, a heavier weight, and a bar on the rail -- so the
 * reader's place is obvious at a glance rather than a subtle tint. Nothing
 * moves or resizes, so the rail still stays quiet while reading.
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

  // Drive the jump ourselves rather than leaving it to the browser hash. A
  // native jump ignores the eased scroll and lands on a different offset than
  // Lenis would, and re-clicking a section already in the URL does nothing.
  //
  // The hash is written with replaceState so the section stays linkable
  // without stacking a history entry per click. Next patches that method to
  // sync its router, which re-renders the tree -- safe because SmoothScroll
  // only resets scroll when the pathname actually changes.
  const handleClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    scrollToElement(target);
    window.history.replaceState(null, "", `#${id}`);
  };

  if (sections.length === 0) return null;

  return (
    <nav aria-label="Case study sections" className="sticky top-32">
      <ul className="border-line space-y-3 border-l pl-5">
        {sections.map((section) => {
          const isActive = section.id === activeId;
          return (
            <li key={section.id} className="relative">
              {/* Sits directly over the rail hairline, so the active row reads
                  as a thickened segment of the line rather than a new element. */}
              <span
                aria-hidden="true"
                className={`ease-standard absolute -left-5 top-0 h-full w-0.5 transition-colors duration-200 ${
                  isActive ? "bg-ink" : "bg-transparent"
                }`}
              />
              <a
                href={`#${section.id}`}
                onClick={(event) => handleClick(event, section.id)}
                aria-current={isActive ? "true" : undefined}
                className={`text-meta ease-standard block transition-colors duration-200 ${
                  isActive
                    ? "text-ink font-medium"
                    : "text-subtle hover:text-ink"
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
