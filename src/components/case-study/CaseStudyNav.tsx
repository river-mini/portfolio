"use client";

import { useEffect, useState } from "react";
import { Container } from "../Container";

type NavSection = { id: string; heading: string };

/**
 * Sticky in-page nav for jumping between case-study sections.
 *
 * Sits directly beneath the site header and highlights whichever section is
 * currently in view. Scrolls horizontally on narrow screens rather than
 * wrapping, so it stays one line tall no matter how many sections there are.
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
        // Of everything currently on screen, the highest one wins. Falling back
        // to the previous value keeps the marker from blanking out between
        // sections.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      {
        // Discount the sticky header and this bar at the top, and most of the
        // lower half, so "active" tracks what the reader is actually looking at.
        rootMargin: "-160px 0px -55% 0px",
        threshold: 0,
      }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sections]);

  if (sections.length === 0) return null;

  return (
    <nav
      aria-label="Case study sections"
      className="border-line/70 bg-bg/85 ease-standard sticky top-(--header-offset) z-40 mt-16 border-y backdrop-blur-md transition-[top] duration-300 md:mt-24"
    >
      <Container>
        <ul className="section-nav__list flex gap-x-7 overflow-x-auto py-3 md:justify-center">
          {sections.map((section) => {
            const isActive = section.id === activeId;
            return (
              <li key={section.id} className="shrink-0">
                <a
                  href={`#${section.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`text-meta ease-standard relative inline-block py-1 whitespace-nowrap transition-colors duration-200 ${
                    isActive ? "text-ink" : "text-subtle hover:text-ink"
                  }`}
                >
                  {section.heading}
                  <span
                    aria-hidden="true"
                    className={`bg-ink ease-standard absolute inset-x-0 bottom-0 h-px origin-left transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </nav>
  );
}
