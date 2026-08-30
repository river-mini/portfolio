import { Container } from "./Container";

/**
 * PLACEHOLDERS — replace each href with the real destination.
 * Remove any row that isn't relevant.
 */
const CONTACT_LINKS = [
  { label: "Email", href: "mailto:hello@example.com" },
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
] as const;

export function Footer() {
  return (
    <footer className="border-line mt-auto border-t">
      <Container>
        <div className="flex flex-col gap-4 py-4 md:flex-row md:items-end md:justify-between md:py-6">
          <p className="text-heading max-w-[16ch]">Let&apos;s work together.</p>

          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {CONTACT_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="nav-link text-meta text-muted hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-line/60 flex flex-col gap-2 border-t py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-meta text-subtle">© Cindy Truong</p>
          <p className="text-meta text-subtle">
            UI/UX · Motion Design · Product Design · Graphic Design
          </p>
        </div>
      </Container>
    </footer>
  );
}
