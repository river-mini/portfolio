import Link from "next/link";
import { Container } from "./Container";

/**
 * Typography-led introduction. Copy is temporary and lives here so it is easy
 * to find and rewrite.
 */
export function Hero() {
  return (
    <section className="pt-(--section-gap) pb-(--section-gap)">
      <Container>
        <p className="text-label text-subtle uppercase">
          UI/UX · Motion Design · Graphic Design
        </p>

        <h1 className="text-display mt-8 max-w-[24ch] text-balance">
          Hi, I&apos;m Cindy{" "}
          <span className="text-muted">
            — a multidisciplinary designer working across digital experiences,
            motion, and visual storytelling.
          </span>
        </h1>

        <Link
          href="/#work"
          className="nav-link text-meta text-muted hover:text-ink mt-14 inline-block"
        >
          Selected work
          <span aria-hidden="true" className="ml-2 inline-block">&darr;</span>
        </Link>
      </Container>
    </section>
  );
}
