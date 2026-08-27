"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "./Container";

/**
 * `/#work` works from every page: on the homepage the browser smooth-scrolls
 * to the work section, elsewhere it navigates home and then jumps to it.
 */
const NAV_LINKS = [
  { label: "Work", href: "/#work", external: false },
  { label: "About", href: "/about", external: false },
  // Drop the real PDF at public/resume.pdf to replace the placeholder.
  { label: "Resume", href: "/resume.pdf", external: true },
] as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever navigation happens. Derived during render
  // rather than in an effect, so the menu never paints open on the new route.
  const [menuRoute, setMenuRoute] = useState(pathname);
  if (menuRoute !== pathname) {
    setMenuRoute(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const isActive = (href: string) => href === pathname;

  return (
    <header className="border-line/70 bg-bg/85 sticky top-0 z-50 border-b backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between md:h-20">
          <Link href="/" className="nav-link text-meta font-medium">
            Cindy Truong
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-9">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nav-link text-meta text-muted hover:text-ink"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      data-active={isActive(link.href)}
                      className="nav-link text-meta text-muted hover:text-ink aria-[current=page]:text-ink"
                      aria-current={isActive(link.href) ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="-mr-2 flex h-10 w-10 cursor-pointer items-center justify-center md:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {/* Two rules that cross into an X when the menu opens. */}
            <span aria-hidden="true" className="relative block h-3 w-5">
              <span
                className={`bg-ink ease-standard absolute left-0 block h-px w-5 transition-transform duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`bg-ink ease-standard absolute left-0 block h-px w-5 transition-transform duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </Container>

      <nav
        id="mobile-nav"
        aria-label="Primary mobile"
        hidden={!open}
        className="border-line border-t md:hidden"
      >
        <Container>
          <ul className="flex flex-col py-2">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body block py-3"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className="text-body block py-3"
                    aria-current={isActive(link.href) ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </Container>
      </nav>
    </header>
  );
}
