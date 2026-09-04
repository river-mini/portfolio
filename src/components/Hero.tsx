import { Container } from "./Container";
import { WordmarkAnimation } from "./WordmarkAnimation";
import { WorkLink } from "./WorkLink";

/**
 * Typography-led introduction. Copy lives here so it is easy to find and
 * rewrite. Centred, and tall enough to fill the viewport below the header,
 * so the intro animation resolves onto a full screen of hero.
 *
 * Each line rises in on a stagger once the intro overlay begins clearing --
 * see `.hero-line` in globals.css.
 */
export function Hero() {
  return (
    <section className="flex min-h-[calc(100svh-4rem)] items-center py-10 md:min-h-[calc(100svh-5rem)]">
      {/* Without JavaScript the intro never signals, so unhide the lines. */}
      <noscript>
        <style>{".hero-line{opacity:1}"}</style>
      </noscript>

      <Container className="text-center">
        <p className="hero-line text-label text-subtle uppercase">
          UI/UX · Motion · Product · Graphic
        </p>

        {/* The animated wordmark stands in for the heading text. It keeps the
            h1 so the page still has one, with the name available to screen
            readers and crawlers inside the component. */}
        <h1 className="hero-line mt-8" style={{ animationDelay: "110ms" }}>
          <WordmarkAnimation
            src="/animations/CindyWaterMark.webm"
            label="Cindy Truong"
          />
        </h1>

        <p
          className="hero-line text-body-lg text-muted mx-auto mt-7 max-w-[42ch] text-balance"
          style={{ animationDelay: "220ms" }}
        >
          I craft playful and thoughtful experiences with emotional resonance!
        </p>

        <div className="hero-line mt-4" style={{ animationDelay: "330ms" }}>
          <WorkLink className="nav-link scroll-cue text-meta text-muted hover:text-ink inline-block">
            Check out my work
            <span aria-hidden="true" className="scroll-cue__arrow ml-2">↓</span>
          </WorkLink>
        </div>
      </Container>
    </section>
  );
}
