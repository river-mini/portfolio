import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SmartImage } from "@/components/SmartImage";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Cindy Truong, a multidisciplinary designer working across UI/UX, motion design, and graphic design.",
};

/**
 * All copy below is placeholder. Replace the strings in place -- the layout
 * adapts to however much text each section ends up holding.
 */
export default function AboutPage() {
  return (
    <div className="pt-(--section-gap) pb-(--section-gap)">
      <Container>
        <h1 className="text-display max-w-[16ch]">About Cindy</h1>

        <div className="mt-16 grid grid-cols-1 gap-12 md:mt-24 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <div
              className="rounded-media bg-bg-raised relative w-full overflow-hidden"
              style={{ aspectRatio: "4 / 5" }}
            >
              <SmartImage
                src="/images/portrait.png"
                alt="Portrait placeholder"
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="space-y-16 md:col-span-6 md:col-start-7">
            <section aria-labelledby="bio-heading">
              <h2 id="bio-heading" className="text-label text-muted uppercase">
                Biography
              </h2>
              <p className="text-body-lg text-muted mt-5 max-w-[58ch]">
                Biography placeholder.
              </p>
            </section>

            <section aria-labelledby="experience-heading">
              <h2
                id="experience-heading"
                className="text-label text-muted uppercase"
              >
                Experience
              </h2>
              <p className="text-body-lg text-muted mt-5 max-w-[58ch]">
                Experience placeholder.
              </p>
            </section>

            <section aria-labelledby="contact-heading">
              <h2 id="contact-heading" className="text-label text-muted uppercase">
                Contact
              </h2>
              <p className="text-body-lg text-muted mt-5 max-w-[58ch]">
                Contact links placeholder.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
