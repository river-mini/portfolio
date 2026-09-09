import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PlaygroundGallery } from "@/components/playground/PlaygroundGallery";
import { playgroundItems } from "@/data/playground";

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Smaller pieces by Cindy Truong — video edits, graphics and interfaces created for fun.",
};

export default function PlaygroundPage() {
  return (
    <div className="pt-12 pb-(--section-gap) md:pt-16">
      <Container>
        <h1 className="page-rise text-page-title max-w-[16ch]">Playground</h1>
        <p className="page-rise text-body-lg text-muted mt-5 max-w-[52ch]">
          Video edits, Graphics and Interfaces I created for fun!
        </p>
      </Container>

      <div
        className="page-rise mt-10 md:mt-14"
        style={{ animationDelay: "120ms" }}
      >
        <PlaygroundGallery items={playgroundItems} />
      </div>
    </div>
  );
}
