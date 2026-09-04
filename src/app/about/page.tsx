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
 * Photos for the click-through set, in order. Hosted on Vercel Blob rather
 * than committed. The arrows and thumbnail strip appear on their own as soon
 * as there is more than one.
 *
 * External URLs render through a plain <img> (see SmartImage), so these are
 * served at full size -- keep exports web-sized rather than straight off a
 * phone.
 */
const PHOTOS: AboutPhoto[] = [
  { src: "https://7vxrad93nks5odjn.public.blob.vercel-storage.com/me%20pics/me%203.jpg", alt: "Cindy Truong" },
  { src: "https://7vxrad93nks5odjn.public.blob.vercel-storage.com/me%20pics/IMG_9907.jpg", alt: "Cindy Truong" },
  { src: "https://7vxrad93nks5odjn.public.blob.vercel-storage.com/me%20pics/me%202.jpg", alt: "Cindy Truong" },
  { src: "https://7vxrad93nks5odjn.public.blob.vercel-storage.com/me%20pics/me%204.jpg", alt: "Cindy Truong" },
  { src: "https://7vxrad93nks5odjn.public.blob.vercel-storage.com/me%20pics/me.jpg", alt: "Cindy Truong" },
  // Still only uploaded as HEIC, which renders in Safari alone:
  //   me%20pics/IMG_6081.HEIC
  // Re-export as JPEG and add a row here.
];

/**
 * Grouped credentials. An entry without a `period` renders as a continuation
 * line under the one above it, for things like a degree under its school.
 */
const CREDENTIALS = [
  {
    label: "Experience",
    entries: [
      { detail: "Design Assistant, UT LAITS", period: "Jun 2026 — Present" },
      {
        detail: "UX Design Fellow, Longhorn Developers",
        period: "Aug 2025 — Present",
      },
      {
        detail: "STEM Instructor & Intern, Lavner Education",
        period: "Apr — Aug 2026",
      },
    ],
  },
  {
    label: "Education",
    entries: [
      { detail: "The University of Texas at Austin", period: "2024 — 2028" },
      { detail: "Informatics (UI/UX Design)" },
      { detail: "Design Strategies BDP" },
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

export default function AboutPage() {
  return (
    <div className="pt-12 pb-(--section-gap) md:pt-16">
      <Container>
        <h1 className="page-rise text-page-title max-w-[16ch]">About me!</h1>

        <div
          className="page-rise mt-10 grid grid-cols-1 gap-12 md:mt-14 md:grid-cols-12 md:gap-10"
          style={{ animationDelay: "120ms" }}
        >
          <div className="md:col-span-4">
            <PhotoCarousel photos={PHOTOS} />
          </div>

          <div className="space-y-14 md:col-span-7 md:col-start-6">
            <section aria-labelledby="bio-heading">
              <RuledHeading id="bio-heading">
                <span lang="vi">Xin chào!</span> I’m Cindy Truong
              </RuledHeading>

              <div className="text-body-lg text-muted mt-6 max-w-[58ch] space-y-5">
                <p>
                  I’m a Vietnamese-American designer developing my craft at The
                  University of Texas at Austin, where I’m getting a BSA in
                  Informatics (Concentration in UI/UX Design), a Design
                  Strategies Bridging Discipline Program certification, and a
                  background in coding (Java, Python, and HTML). I’m driven to
                  explore as many experiences as I can by blending creativity
                  with human-centered values, whether it’s making eye-catching
                  edits and motion graphics, building user interfaces, gaining
                  industry experience, or creating whimsical graphics.
                </p>
                <p>
                  Outside of design, I am obsessed with matcha, food, cats, and
                  watching sitcoms! Right now, I am watching Modern Family when
                  I’m cooking or doing chores, and I’m having a bunch of good
                  laughs ꉂ(˵˃ ᗜ ˂˵)
                </p>
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
