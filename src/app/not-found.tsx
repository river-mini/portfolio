import Link from "next/link";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <div className="pt-(--section-gap) pb-(--section-gap)">
      <Container>
        <p className="text-label text-subtle uppercase">404</p>
        <h1 className="text-display mt-8 max-w-[16ch]">
          This page doesn&apos;t exist.
        </h1>
        <Link
          href="/"
          className="nav-link text-meta text-muted hover:text-ink mt-12 inline-block"
        >
          Back to work
        </Link>
      </Container>
    </div>
  );
}
