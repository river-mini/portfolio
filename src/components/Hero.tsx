import { Container } from "./Container";
import { WorkLink } from "./WorkLink";

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
          Hi, I&apos;m Cindy!
        </h1>

        <p className="text-body-lg text-muted mx-auto mt-7 max-w-[42ch] text-balance">
          I craft playful and thoughtful experiences with emotional resonance!
        </p>

        <WorkLink className="nav-link scroll-cue text-meta text-muted hover:text-ink mt-14 inline-block">
          Selected work
          <span aria-hidden="true" className="scroll-cue__arrow ml-2">↓</span>
        </WorkLink>
      </Container>
    </section>
  );
}
