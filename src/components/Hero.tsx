import Link from "next/link";
import { Container } from "./Container";

/**
 * Typography-led introduction. Copy lives here so it is easy to find and
 * rewrite. Centred, and tall enough to fill the viewport below the header,
 * so the intro animation resolves onto a full screen of hero.
 */
export function Hero() {
  return (
    <section className="flex min-h-[calc(100svh-4rem)] items-center py-20 md:min-h-[calc(100svh-5rem)]">
      <Container className="text-center">
        <p className="text-label text-subtle uppercase">
          UI/UX · Motion Design · Product Design · Graphic Design
        </p>

        <h1 className="text-display mx-auto mt-8 max-w-[16ch] text-balance">
          <span className="text-muted">Hi I&apos;m</span> Cindy Truong,
        </h1>

        <p className="text-body-lg text-muted mx-auto mt-7 max-w-[42ch] text-balance">
          I craft playful and thoughtful experiences with emotional resonance!
        </p>

        <Link
          href="/#work"
          className="nav-link text-meta text-muted hover:text-ink mt-14 inline-block"
        >
          Selected work
          <span aria-hidden="true" className="ml-2 inline-block">↓</span>
        </Link>
      </Container>
    </section>
  );
}
