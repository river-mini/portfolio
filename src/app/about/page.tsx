import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Container } from "@/components/Container";
import { PhotoCarousel, type AboutPhoto } from "@/components/PhotoCarousel";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Cindy Truong, a multidisciplinary designer working across UI/UX, motion design, and graphic design.",
};

/**
 * Photos for the click-through set, in order. Drop more files into
 * /public/images/about/ and add a row -- the arrows and thumbnail strip appear
 * on their own as soon as there is more than one.
 */
const PHOTOS: AboutPhoto[] = [
  { src: "/images/portrait.png", alt: "Cindy Truong" },
  // Filler until the real photos land -- swap the src and alt on each row.
  { src: "/images/about/about-1.png", alt: "Filler photo" },
  { src: "/images/about/about-2.png", alt: "Filler photo" },
  { src: "/images/about/about-3.png", alt: "Filler photo" },
  { src: "/images/about/about-4.png", alt: "Filler photo" },
];

/**
 * Grouped credentials. An entry without a `period` renders as a continuation
 * line under the one above it, for things like a degree under its school.
 *
 * Placeholder rows -- replace the strings in place.
 */
const CREDENTIALS = [
  {
    label: "Previously",
    entries: [
      { detail: "Add a role here.", period: "Year" },
      { detail: "Add a role here.", period: "Year" },
    ],
  },
  {
    label: "Education",
    entries: [
      { detail: "Add a school here.", period: "Years" },
      { detail: "Add a degree here." },
    ],
  },
] as const;

/** Heading with a hairline running out to the right of it. */
function RuledHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="flex items-center gap-4">
      <span className="text-title">{children}</span>
      <span aria-hidden="true" className="bg-line h-px flex-1" />
    </h2>
  );
}

/**
 * All copy below is placeholder. Replace the strings in place -- the layout
 * adapts to however much text each section ends up holding.
 */
export default function AboutPage() {
  return (
    <div className="pt-12 pb-(--section-gap) md:pt-16">
      <Container>
        <h1 className="text-page-title max-w-[16ch]">About me!</h1>

        <div className="mt-10 grid grid-cols-1 gap-12 md:mt-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <PhotoCarousel photos={PHOTOS} />
          </div>

          <div className="space-y-14 md:col-span-7 md:col-start-6">
            <section aria-labelledby="bio-heading">
              <RuledHeading id="bio-heading">
                <span lang="vi">Xin chào!</span> I&apos;m Cindy Truong
              </RuledHeading>

              <div className="text-body-lg text-muted mt-6 max-w-[58ch] space-y-5">
                <p>Biography placeholder.</p>
                <p>Biography placeholder.</p>
              </div>
            </section>

            <section aria-labelledby="designer-heading">
              <RuledHeading id="designer-heading">As a designer</RuledHeading>

              <dl className="mt-6 space-y-8">
                {CREDENTIALS.map((group) => (
                  <div
                    key={group.label}
                    className="grid gap-x-8 gap-y-2 sm:grid-cols-[9rem_1fr]"
                  >
                    <dt className="text-body text-muted">{group.label}</dt>
                    <dd className="space-y-1.5">
                      {group.entries.map((entry, index) => (
                        <div
                          key={index}
                          className="flex items-baseline justify-between gap-6"
                        >
                          <span className="text-body">{entry.detail}</span>
                          {"period" in entry ? (
                            <span className="text-meta text-subtle tabular-nums whitespace-nowrap">
                              [{entry.period}]
                            </span>
                          ) : null}
                        </div>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
