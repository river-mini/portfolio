import type { CaseStudy, CaseStudySection } from "@/types/case-study";

/**
 * ---------------------------------------------------------------------------
 * CASE-STUDY CONTENT
 * ---------------------------------------------------------------------------
 * Every project falls back to the placeholder outline below until it gets its
 * own entry in `caseStudies`. To write a real case study, copy the outline,
 * key it by the project slug, and replace the blocks.
 *
 * Available blocks (see src/types/case-study.ts):
 *   { type: "text",      paragraphs: ["...", "..."] }
 *   { type: "factSheet", items: [{ label, value }] }   // value may be string[]
 *   { type: "media",     media: { src, alt, caption?, kind?, aspect? } }
 *   { type: "mediaPair", media: [ {...}, {...} ] }
 *
 * `src` accepts a local /public path or an absolute URL, so large videos can
 * stay on a CDN. Set kind: "video" for MP4/WebM.
 *
 * If these case studies later outgrow plain data, this is the seam to swap for
 * MDX or a CMS: the page only consumes `getCaseStudy()`, nothing else.
 */

function placeholderSections(): CaseStudySection[] {
  return [
    {
      id: "tldr",
      heading: "TL;DR",
      blocks: [
        { type: "text", paragraphs: ["Add a two-line summary here."] },
        {
          type: "factSheet",
          items: [
            { label: "My Role", value: "Add your role." },
            { label: "Timeline", value: "Add the timeline." },
            {
              // An array renders as stacked lines, for listing a team.
              label: "Team",
              value: ["Add a team member.", "Add a team member."],
            },
            { label: "Tools", value: "Add the tools used." },
          ],
        },
      ],
    },
    {
      id: "background",
      heading: "Background",
      blocks: [{ type: "text", paragraphs: ["Add background here."] }],
    },
    {
      id: "problem",
      heading: "Problem",
      blocks: [{ type: "text", paragraphs: ["Add the problem here."] }],
    },
    {
      id: "process",
      heading: "Process",
      blocks: [{ type: "text", paragraphs: ["Add process here."] }],
    },
    {
      id: "final-product",
      heading: "Final Product",
      blocks: [{ type: "text", paragraphs: ["Add final work here."] }],
    },
    {
      id: "impact",
      heading: "Impact",
      blocks: [{ type: "text", paragraphs: ["Add impact here."] }],
    },
    {
      id: "reflections",
      heading: "Reflections",
      blocks: [{ type: "text", paragraphs: ["Add reflections here."] }],
    },
  ];
}

/**
 * Every media block below points here until the real export is dropped in.
 * Grep PLACEHOLDER_MEDIA to find every slot still waiting on a file -- the
 * comment above each one names the asset it is standing in for.
 */
const PLACEHOLDER_MEDIA = "/images/projects/project-1-wide.png";

/** Per-slug overrides. Projects without an entry fall back to the outline. */
const caseStudies: Record<string, CaseStudy> = {
  "sweethearts-x-barbie": {
    sections: [
      {
        id: "tldr",
        heading: "TL;DR",
        blocks: [
          {
            type: "media",
            media: {
              src: "https://7vxrad93nks5odjn.public.blob.vercel-storage.com/cutdownSweethearts.mp4",
              kind: "video",
              alt: "A cut-down of the Sweethearts x Barbie spot",
              caption:
                "Unaffiliated student concept. Sweethearts and Barbie are trademarks of their respective owners.",
            },
          },
          {
            type: "text",
            paragraphs: [
              "For PR 339K Digital Graphics Communication, we were asked to invent a Sweethearts collaboration with a brand of our choice. I paired Sweethearts with Barbie and built a BFF campaign — candy hearts carrying friendship messages instead of romantic ones — then animated it so the hearts spill from the box alongside kinetic typography.",
            ],
          },
          {
            type: "factSheet",
            items: [
              { label: "Role", value: "Motion Designer — concept, visual design, animation" },
              { label: "Timeline", value: "Spring 2026" },
              { label: "Team", value: "Solo" },
              { label: "Tools", value: "After Effects" },
              { label: "Context", value: "Motion · Solo · Academic · Spring 2026" },
            ],
          },
        ],
      },
      {
        id: "background",
        heading: "Background",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "Sweethearts is a Valentine’s product with sixty years of romantic shorthand printed on it. Barbie has one of the most recognizable visual identities in the world, and after 2023, a specific cultural tone attached to it.",
              "The brief was open: pick a brand, make the collaboration make sense. I was interested in what the two had in common beyond pink.",
            ],
          },
          {
            type: "text",
            heading: "Two loud brands, and neither can swallow the other",
            paragraphs: [
              "A collaboration fails in one of two directions. Lean too hard into Barbie and it is a Barbie ad with candy in it. Lean too hard into Sweethearts and the Barbie half is just a color palette.",
              "There was also a content question. Sweethearts’ entire vocabulary is romantic — and Barbie’s most durable idea is not romance, it is friendship. The collaboration only had a reason to exist if the candy said something different than it usually does.",
            ],
          },
        ],
      },
      {
        id: "process",
        heading: "Process",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "I built the campaign around a custom Sweethearts box filled with Barbie-inspired BFF messages. The messages carry the concept: the packaging is unmistakably Sweethearts, the palette and copy are unmistakably Barbie, and the two meet on the hearts themselves.",
            ],
          },
          {
            type: "media",
            media: {
              src: "/images/projects/sweethearts/box.png",
              alt: "The custom Sweethearts x Barbie BFF Edition box",
              caption: "The custom box, carrying both identities at once",
              fit: "contain",
            },
          },
          {
            type: "media",
            media: {
              src: "/images/projects/sweethearts/hearts.png",
              alt: "Candy hearts reading KAWAII, 4LIFER, JUST A GIRL, BEST FRIENDS, MY INSPO and I LUV U GIRL",
              caption: "The BFF messages the campaign turns on",
              fit: "contain",
            },
          },
          {
            type: "text",
            paragraphs: [
              "For the brand systems, I kept Sweethearts’ packaging structure and pastel base intact and let Barbie enter through color, type, and voice, so neither identity reads as a skin applied to the other.",
            ],
          },
          {
            type: "text",
            paragraphs: [
              "Then I took it out of static layout and into After Effects. Candy hearts spill from the box while the typography animates around them, and I tuned the timing so the piece feels energetic without pulling focus off the product.",
            ],
          },
          {
            type: "text",
            heading: "Sound, Story & Motion",
            paragraphs: [
              "Before the animation begins, I used a short scene from Barbie: Life in the Dreamhouse where Barbie’s friends argue over who her best friend is. That setup directly connects to the BFF theme of the Sweethearts concept and gives the ad a playful narrative before the product is introduced.",
              "From there, the animation transitions into the Sweethearts × Barbie visual, with the hearts falling from the box and the typography coming to life. I paired it with “Speed Drive” by Charli XCX, a song made for the Barbie movie, to keep the audio connected to the brand world as well. Its fast pace and energetic sound helped make the ad feel more exciting, outgoing, and playful.",
              "Together, the opening clip, music, and motion helped the piece feel less like a standalone animation and more like a complete campaign moment built around Barbie’s friendship theme.",
            ],
          },
        ],
      },
      {
        id: "final-product",
        heading: "Final product",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "The finished spot combines Sweethearts packaging with Barbie’s palette, messaging, and motion. Falling hearts and animated type turn a conventional product ad into something with pacing and personality — nostalgic, playful, and about friendship rather than romance.",
            ],
          },
          {
            type: "media",
            media: {
              src: "https://7vxrad93nks5odjn.public.blob.vercel-storage.com/sweethrts%20ad.mp4",
              kind: "video",
              alt: "The finished Sweethearts x Barbie spot",
            },
          },
          {
            type: "mediaPair",
            media: [
              {
                src: "/images/projects/sweethearts/spot-frame-2.png",
                alt: "Frame from the spot: the box on screen",
                caption: "The box, mid-spot",
                fit: "contain",
              },
              {
                src: "/images/projects/sweethearts/spot-frame-1.png",
                alt: "Frame from the spot: candy hearts spilling from the box",
                caption: "The hearts spilling out",
                fit: "contain",
              },
            ],
          },
          {
            type: "media",
            media: {
              src: "/images/projects/sweethearts/cover.jpg",
              alt: "The finished packaging with the candy hearts",
              caption: "The finished packaging and its BFF messages",
            },
          },
        ],
      },
      {
        id: "status",
        heading: "Status",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "Completed as the final assignment for PR 339K: Digital Graphics Communication, Spring 2026.",
            ],
          },
        ],
      },
      {
        id: "reflection",
        heading: "Reflection",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "The useful lesson was that a brand collaboration has to say something. Combining two visual identities is a styling exercise; deciding what the pairing means is the design work, and the BFF angle is what made the two brands belong in the same frame.",
              "The second was about motion as argument rather than decoration. Animating the hearts spilling out is not ornament — it is the moment the product delivers its message, and pacing it correctly was most of the work.",
            ],
          },
        ],
      },
    ],
  },
  "fintastic-shack": {
    sections: [
      {
        id: "tldr",
        heading: "TL;DR",
        blocks: [
          {
            type: "media",
            media: {
              src: "/images/projects/fintastic/wordmark.png",
              alt: "The Fintastic Shack lockup",
              fit: "contain",
            },
          },
          {
            type: "text",
            paragraphs: [
              "A complete logo lockup for The Fintastic Shack, a new family-owned seafood restaurant. Rather than setting a fish icon beside the name, I built the mark into the name! A custom ‘A’ that serves as the ‘A’ in both Fintastic and Shack, reads as a fish, and hides a diner in a bib in its negative space.",
            ],
          },
          {
            type: "factSheet",
            items: [
              { label: "Role", value: "Brand Designer — concept, logo design, visual identity" },
              { label: "Timeline", value: "August 2026" },
              { label: "Team", value: "Solo" },
              { label: "Tools", value: "Illustrator, Photoshop, hand sketching" },
              { label: "Context", value: "Branding · Solo · Academic" },
            ],
          },
        ],
      },
      {
        id: "background",
        heading: "Background",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "The Fintastic Shack is a newly founded, family-owned seafood restaurant. The brief called for both a brandmark and a wordmark, combined into one cohesive lockup.",
              "The family was described as friendly, fun, and fond of puns, and even the restaurant’s name reflects that personality. The identity needed to feel playful without becoming overly gimmicky.",
            ],
          },
          {
            type: "text",
            heading: "Playful, but still practical",
            paragraphs: [
              "I wanted the logo to reflect the family’s fun personality without sacrificing clarity. The design needed enough character to feel memorable, while still being simple and readable enough to work on signage, at small sizes, and in a single color.",
              "Most attempts at a playful restaurant logo solve this by bolting a cute icon onto a clean wordmark, which reads as two designs sharing a space. I wanted the joke to live inside the typography, where it could not be separated from the name.",
            ],
          },
        ],
      },
      {
        id: "process",
        heading: "Process",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "I started on paper, working through fish forms, letterforms, and ways a symbol could sit against the name. I was being pretty literal with the early iterations. For example, a fish wearing a hat and a fish as a standalone icon. However, they felt more decorative than integrated into the identity.",
            ],
          },
          {
            type: "media",
            media: {
              src: "/images/projects/fintastic/sketches.jpg",
              alt: "Hand sketches exploring fish forms and letterforms",
              caption: "Early directions on paper",
            },
          },
          {
            type: "media",
            media: {
              src: "/images/projects/fintastic/draft-mark.png",
              alt: "An early direction: the mark drawn as a standalone character",
              caption:
                "An early direction, set aside — the mark as a character rather than a letterform",
              fit: "contain",
            },
          },
          {
            type: "text",
            paragraphs: [
              "I first started out with three brandmark versions in black and white before any color, which kept the early work on silhouette and readability rather than palette.",
            ],
          },
          {
            type: "text",
            paragraphs: [
              "The idea came from the name itself. When I stacked FINTASTIC over SHACK, the two ‘A’s lined up closely enough that one custom letterform could connect both words. This made the brandmark feel like part of the logo, rather than something added on afterward.",
              "The custom ‘A’ is fish-shaped, with tail fins forming the apex and a net texture across the body. Its counter reads as a person seated in a bib, and the small red shape works as either that bib or the fish’s tongue depending on how you look at it. The ambiguity is the point: it is a joke you find on the second look, not one shouted on the first.",
            ],
          },
          {
            type: "text",
            paragraphs: [
              "From there, I focused on refining the proportions so the custom letterform could stand out without hurting readability. I also scaled the letters in FINTASTIC from large to small and back to large to subtly suggest the shape of a fish, with the F as the tail and the C as the head.",
              "Layered blues carry water and freshness; the single red accent is the only warm element in the system, which is what draws the eye to the detail that carries the joke.",
            ],
          },
          {
            type: "mediaPair",
            media: [
              {
                src: "/images/projects/fintastic/draft-1.png",
                alt: "The lockup resolved in black and white",
                caption: "Draft direction: structure resolved in one color",
                fit: "contain",
              },
              {
                src: "/images/projects/fintastic/draft-2.png",
                alt: "The lockup with color introduced and the ‘A’ isolated as the focal point",
                caption: "Draft direction: color introduced, mark isolated as focal point",
                fit: "contain",
              },
            ],
          },
        ],
      },
      {
        id: "final-product",
        heading: "Final product",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "The lockup is a clean two-line wordmark with a custom letterform at its center, doing the work a separate icon usually does.",
            ],
          },
          {
            type: "mediaPair",
            media: [
              { src: "/images/projects/fintastic/wordmark.png", alt: "The finished Fintastic Shack lockup", caption: "The lockup", fit: "contain" },
              { src: "/images/projects/fintastic/mark.png", alt: "The custom ‘A’ that anchors the lockup", caption: "The brandmark that carries it", fit: "contain" },
            ],
          },
          {
            type: "text",
            paragraphs: [
              "It holds up under the tests that matter for a restaurant identity: it survives in a single color, stays legible at small sizes, and reads correctly on signage.",
            ],
          },

          {
            type: "media",
            media: {
              src: "/images/projects/fintastic/signage.jpg",
              alt: "The lockup applied to restaurant signage",
              caption: "Applied to restaurant signage",
            },
          },
        ],
      },
      {
        id: "status",
        heading: "Status",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "Completed August 2026 as an academic branding project. Deliverables: concept sketches, standalone brandmark, refined lockup, color variations, and a signage mockup.",
            ],
          },
        ],
      },
      {
        id: "reflection",
        heading: "Reflection",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "The thing I underestimated was how much refinement a simple mark takes. The final ‘A’ went through many more passes than the sketch suggested it would, almost all of them small — a few degrees of angle, a slightly different counter, a red shape moved two points.",
              "The larger lesson was where to put the personality. My early directions kept the wordmark clean and put the fun beside it, which is the safe move and also the forgettable one. Building the joke into a letterform meant it could not be removed without breaking the name — and that constraint made the mark better, because it forced the playful idea to also be structurally correct.",
              "Working between sketches, Illustrator, and Photoshop across the project also made me substantially faster in both programs, which I have carried into everything since.",
            ],
          },
        ],
      },
    ],
  },
  "animated-intro": {
    sections: [
      {
        id: "tldr",
        heading: "TL;DR",
        blocks: [
          {
            type: "media",
            media: {
              src: "https://7vxrad93nks5odjn.public.blob.vercel-storage.com/ARH301-Cushing_intro-NEW.mp4",
              kind: "video",
              alt: "The finished ARH 301 animated course intro",
              aspect: "16 / 9",
            },
          },
          {
            type: "factSheet",
            items: [
              { label: "Role", value: "Design STA — concept, animation, art direction" },
              { label: "Timeline", value: "July 7 – August 10, 2026" },
              { label: "Team", value: "Solo animator with feedback from LAITS" },
              { label: "Tools", value: "After Effects, Photoshop, Adobe Stock" },
            ],
          },
          {
            type: "text",
            heading: "Thirty seconds of art history, with a wink",
            paragraphs: [
              "ARH 301 needed a new animated intro that felt scholarly, clever, and a little wacky.",
              "I developed three concepts, animated two of them, and ultimately created a gallery walkthrough using artwork from the course. The intro ends with a Greek statue using the professor’s eyes to wink at the viewer.",
              "It was my first project after completing LAITS training and shipped for Fall 2026.",
            ],
          },
        ],
      },
      {
        id: "background",
        heading: "Background",
        blocks: [
          {
            type: "text",
            heading: "Giving the course its own personality",
            paragraphs: [
              "ARH 301 already had an established visual style, but it needed a new intro.",
              "The previous course intro felt more serious than the personality of the new professor, Dr. Cushing. I was given a lot of creative freedom to develop something that better matched both him and the course.",
            ],
          },
          // Asset checklist: existing-package.png -- export a still from the
          // existing course graphics.
          {
            type: "media",
            media: {
              src: PLACEHOLDER_MEDIA,
              alt: "Existing ARH 301 course graphics",
              caption: "The course’s existing graphics package",
            },
          },
        ],
      },
      {
        id: "problem",
        heading: "Problem",
        blocks: [
          {
            type: "text",
            heading: "Scholarly, but not too serious",
            paragraphs: [
              "The goal was to create something inspired by the polished feel of Masterpiece Theatre, while adding enough humor to keep it from feeling overly formal.",
              "I used artwork from Dr. Cushing’s course materials and his interest in Greek and Roman sculpture as my starting point.",
            ],
          },
          {
            type: "text",
            heading:
              "How could I make the intro feel like an art gallery while still adding some personality?",
            paragraphs: [],
          },
        ],
      },
      {
        id: "process",
        heading: "Process",
        blocks: [
          {
            type: "text",
            heading: "01 — Exploring concepts",
            paragraphs: [
              "I developed three directions and reviewed them with my design mentor. Two stood out, so I created rough animations in After Effects to see how each concept worked in motion.",
            ],
          },
          {
            type: "list",
            items: [
              "Zoom out from a bookcase, the camera flying past floating artwork before pushing into a final painting to reveal the course abbreviation, name, and professor.",
              "Fade into a white gallery hall with the David statue at its center. As the camera looks around the art, the statue follows it with human eyes — and when the camera catches it looking, it closes them, the screen blinks shut with it, and the course title appears.",
              "Make the art pieces letters. A spotlight follows the outline of the course abbreviation, then the camera pulls back to reveal the full course name and professor on a closed hardcover book, the artwork framed and hung around it.",
            ],
          },
          {
            type: "media",
            media: {
              src: "/images/projects/arh301/storyboards.jpg",
              alt: "Notebook spread showing both concepts — Idea 1 spotlight title, Idea 2 gallery walk with numbered camera path",
              caption:
                "Both directions, side by side — the gallery concept’s camera path was mapped out here",
              aspect: "4 / 3",
            },
          },
          {
            type: "text",
            heading: "02 — Testing the first idea",
            paragraphs: [
              "The first concept featured the course title on an aged book cover, with artwork moving inside the letters.",
              "It worked visually, but once animated, the movement felt repetitive. Testing it early helped me realize the concept worked better as a static design than as motion.",
            ],
          },
          // Asset checklist: concept-1-rejected.mp4 -- on the blog as
          // ARH301-Idea-1.mp4. Upload to Blob and set kind: "video".
          {
            type: "media",
            media: {
              src: PLACEHOLDER_MEDIA,
              alt: "The first concept, animated",
              caption: "Concept one — set aside after seeing it in motion",
            },
          },
          {
            type: "text",
            heading: "03 — Building the gallery",
            paragraphs: [
              "The second concept placed the viewer inside an art gallery.",
              "I used artwork directly from the course and placed historical pieces in ornate gold frames, while modern works used simpler black frames. The camera moves through the room before returning to a statue in the center.",
              "This direction felt more immersive and gave me more opportunities to use motion intentionally.",
            ],
          },
          {
            type: "media",
            media: {
              src: "https://7vxrad93nks5odjn.public.blob.vercel-storage.com/arh301%20Intro%20transitions.mp4",
              kind: "video",
              alt: "Early gallery pass with transitions, before revisions",
              caption: "Early gallery pass, before revisions",
              aspect: "16 / 9",
            },
          },
          {
            type: "text",
            heading: "04 — Refining the animation",
            paragraphs: [
              "The project went through several rounds of feedback and refinement.",
              "I replaced Michelangelo’s David with the Berlin Kore, a sculpture already featured in the course. I also adjusted the wall textures, made the camera movement feel more natural, and refined the ending.",
              "For the final transition, the camera passes the statue and moves through an archway into another gallery room, suggesting that the course is just beginning.",
            ],
          },
          // Asset checklist: statue-david.png and statue-kore.png, exported
          // from the same camera position so the swap is the only difference.
          {
            type: "mediaPair",
            media: [
              { src: PLACEHOLDER_MEDIA, alt: "Gallery with Michelangelo’s David at center", caption: "Before" },
              { src: PLACEHOLDER_MEDIA, alt: "Gallery with the Berlin Kore at center", caption: "After" },
            ],
          },
        ],
      },
      {
        id: "final-product",
        heading: "Final product",
        blocks: [
          {
            type: "text",
            heading: "The wink",
            paragraphs: [
              "The final detail became the personality of the intro.",
              "I placed Dr. Cushing’s eyes onto the Greek statue at the center of the gallery. When the camera returns to it, the statue briefly winks before the viewer moves into the next room.",
              "The gallery keeps the intro scholarly, while the unexpected wink adds the humor the brief called for.",
            ],
          },
          {
            type: "media",
            media: {
              src: "https://7vxrad93nks5odjn.public.blob.vercel-storage.com/ARH301-Cushing_intro-NEW.mp4",
              kind: "video",
              alt: "The finished ARH 301 animated course intro",
              aspect: "16 / 9",
            },
          },
          // Asset checklist: wink-closeup.png -- export the frame from final.
          {
            type: "media",
            media: {
              src: PLACEHOLDER_MEDIA,
              alt: "Close-up of the statue winking",
              caption: "Dr. Cushing’s eyes, on the Berlin Kore",
            },
          },
          {
            type: "list",
            heading: "Other details included:",
            items: [
              "Course artwork displayed throughout the gallery",
              "Gold frames for historical works and simpler frames for modern pieces",
              "An archway that leads the viewer into the “next” room",
            ],
          },
          // Asset checklist: detail-gold-frames.png, detail-modern-wall.png
          // and detail-arch.png, in the same order as the three bullets above.
          {
            type: "mediaRow",
            media: [
              { src: PLACEHOLDER_MEDIA, alt: "Gold-framed historical works on the gallery wall" },
              { src: PLACEHOLDER_MEDIA, alt: "Modern works in simple black frames" },
              { src: PLACEHOLDER_MEDIA, alt: "The archway leading to the next room" },
            ],
          },
        ],
      },
      {
        id: "impact",
        heading: "Impact",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "The final 30-second intro shipped for ARH 301 in Fall 2026.",
              "I completed the animation on August 10, and the LAITS post-production team added the final audio before delivery on August 25.",
            ],
          },
          {
            type: "stats",
            items: [
              { value: "30 sec", label: "final runtime" },
              { value: "3", label: "concepts developed" },
              { value: "2", label: "concepts animated" },
              { value: "1st", label: "project after LAITS training" },
            ],
          },
        ],
      },
      {
        id: "reflection",
        heading: "Reflection",
        blocks: [
          {
            type: "text",
            heading: "Test motion early",
            paragraphs: [
              "My first concept looked promising as a still image, but animating it quickly showed its weaknesses. Rough motion tests helped me make decisions before spending time polishing the wrong direction.",
            ],
          },
          {
            type: "text",
            heading: "Feedback made the piece stronger",
            paragraphs: [
              "Small changes to the statue, camera movement, walls, and ending made a noticeable difference. The project taught me how useful fresh feedback can be when I’ve been looking at the same animation for too long.",
            ],
          },
          {
            type: "text",
            heading: "Constraints can improve an idea",
            paragraphs: [
              "Replacing David initially felt like a limitation, but the Berlin Kore ultimately worked better with the course content and gave me more room to make the wink readable.",
            ],
          },
        ],
      },
    ],
  },
  "longhorn-loop": {
    sections: [
      {
        id: "tldr",
        heading: "TL;DR",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "A personalized event board for UT students — everything happening on campus, sorted by what you actually care about.",
            ],
          },
          {
            type: "factSheet",
            items: [
              { label: "Role", value: "Design Fellow → Design Lead (Aug 2026)" },
              { label: "Timeline", value: "Aug 2025 — Present" },
              {
                label: "Team",
                value: [
                  "Product: lead + 2 fellows",
                  "Design: lead + 2 fellows",
                  "Engineering: lead + 3 fellows",
                ],
              },
              { label: "Tools", value: "Figma, Linear, Notion" },
              { label: "Context", value: "Mobile · 0→1 · Consumer · Beta Sept 2026" },
              {
                label: "I designed",
                value: [
                  "Account creation and onboarding",
                  "Event detail and map overlay",
                  "Explore filters",
                  "Profile and edit profile",
                  "Reporting flow",
                  "Academic standing update",
                  "Core components — buttons, dropdowns, search",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "background",
        heading: "Background",
        blocks: [
          {
            type: "text",
            heading: "Campus events are everywhere except in one place",
            paragraphs: [
              "UT Austin has 55,000 students and over 1,000 recognized student organizations putting on events constantly. The events aren’t the problem — finding them is. They live on Instagram stories, GroupMe, and printed flyers, and while HornsLink exists as UT’s central org database, it isn’t where students actually look.",
              "A student can miss the one event meant for them because it lived on an account they don’t follow.",
            ],
          },
          {
            type: "text",
            heading: "Asking students how they actually find things to do",
            paragraphs: [
              "We ran a 30-response survey to find the patterns, then two rounds of interviews — about 20 students total — spaced across the project so we could check our assumptions twice.",
              "Survey, 30 students: how students currently find campus events, and what makes them decide to go.",
              "Interviews, round one, roughly 10 students: early in the project, to understand the discovery habits behind the survey answers.",
              "Interviews, round two, roughly 10 students: later, against working designs, to test whether those assumptions survived contact.",
            ],
          },
          // Appendix: three method cards, redrawn in Figma. No source file --
          // do not screenshot Google Forms.
          {
            type: "media",
            media: {
              src: PLACEHOLDER_MEDIA,
              alt: "Research methods: survey and two interview rounds",
            },
          },
          {
            type: "text",
            heading: "Three things students needed before they’d show up",
            paragraphs: [
              "1. Tell me what’s actually in it for me. Students decide fast, and they decide on specifics — free food, swag, prizes, who’s speaking. A title and a time isn’t enough to justify the walk.",
              "2. Show me why this event is for me. Relevance had to be visible on the card itself, not buried a tap away.",
              "3. Make it findable, then remind me. Discovery was only half the problem. Students found events they wanted to attend and then forgot about them.",
            ],
          },
          {
            type: "text",
            heading:
              "How might we bring campus events into one place and surface the ones that actually fit each student?",
            paragraphs: [
              "HornsLink is a directory — you go to it already knowing what you’re looking for. We were building a feed: something that knows what a student cares about before they open it, and that stays with them from finding an event to actually showing up.",
            ],
          },
        ],
      },
      {
        id: "process",
        heading: "Process",
        blocks: [
          {
            type: "text",
            heading: "01 — Cutting a tab",
            paragraphs: [
              "The first structure had five tabs: Home, Explore, Create, Events, Profile. Events and Profile were doing overlapping work — both were places you went to see your own stuff.",
              "We folded Events into Profile as three filters: Going, Saved, Posted. Four tabs, one mental model, and a profile that finally had a reason to exist beyond a bio.",
            ],
          },
          // Appendix: left = lo-fi_onboarding.png cropped to the 5-tab bottom
          // nav. Right = Hifis__4_.png frame 1, Profile with the 4-tab nav.
          {
            type: "mediaPair",
            media: [
              { src: PLACEHOLDER_MEDIA, alt: "Lo-fi five-tab bottom navigation", caption: "Before — five tabs" },
              { src: PLACEHOLDER_MEDIA, alt: "Hi-fi profile with Going, Saved and Posted", caption: "After — four tabs, Events folded into Profile" },
            ],
          },
          {
            type: "text",
            heading: "02 — Onboarding that earns the personalization",
            paragraphs: [
              "The whole product depends on knowing what a student is interested in, so interest selection is the most important screen in the app. The first version was a 3×4 grid of unlabeled tiles asking students to choose three or more — no search, no structure, no way to find something specific.",
              "The rebuild groups interests into six collapsible categories — Social & Networking, Gaming & Entertainment, Learning & Education, Sports & Fitness, Food & Drink, Nightlife & Parties — adds search across all of them, and shows a running count per category. Searching something we do not have returns “Tag not listed? Send it in”, so an unmet interest becomes a signal instead of a dead end.",
              "Avatar selection got the same treatment. The lo-fi made students pick one of four preset Bevos to continue. The rebuilt version offers three paths — upload a photo, customize a Bevo, or skip — so a step that was a gate became one a student opts into.",
            ],
          },
          // Appendix: left = lo-fi_onboarding.png "Select your Interest" grid.
          // Right = Hifis__13_.png frames 1 and 4, plus the "No results" frame.
          {
            type: "mediaPair",
            media: [
              { src: PLACEHOLDER_MEDIA, alt: "Lo-fi grid of unlabeled interest tiles", caption: "Before — an unlabeled tile grid" },
              { src: PLACEHOLDER_MEDIA, alt: "Hi-fi categorized, searchable interest tags", caption: "After — categorized and searchable, with a send-it-in fallback" },
            ],
          },
          // Appendix: left = lo-fi_onboarding.png, the four preset Bevos.
          // Right = 1788297449092_image.png frame 1 plus one customizer frame.
          {
            type: "mediaPair",
            media: [
              { src: PLACEHOLDER_MEDIA, alt: "Lo-fi avatar selection with four preset options", caption: "Before — pick one of four to continue" },
              { src: PLACEHOLDER_MEDIA, alt: "Hi-fi avatar screen offering upload, customize or skip", caption: "After — upload, customize, or skip" },
            ],
          },
          {
            type: "text",
            heading: "03 — Designing around flyers we do not control",
            paragraphs: [
              "Orgs make their own flyers, and they make them at whatever aspect ratio they want — vertical, square, horizontal. The event board is mostly flyers, so the card had to hold all three without the feed falling apart.",
              "I tested the variants against a two-column layout and locked the card to a fixed ratio with consistent metadata below the image: org name with verification badge, date, time, location.",
            ],
          },
          // Appendix: left = lo-fi_homepage.png flyer variant row (top-left).
          // Right = Hifis__11_.png, the populated Home board (right frame).
          {
            type: "mediaPair",
            media: [
              { src: PLACEHOLDER_MEDIA, alt: "Lo-fi flyer variants at three aspect ratios", caption: "Before — three ratios, one feed" },
              { src: PLACEHOLDER_MEDIA, alt: "Hi-fi Explore board with real flyers", caption: "After — fixed card ratio, consistent metadata" },
            ],
          },
          {
            type: "text",
            heading: "04 — Designing for bad behavior",
            paragraphs: [
              "An open posting platform for 50,000 students needs a way to flag what should not be there. The report flow covers four reasons — violent or harmful, misinformation, troll or spam, concern not listed — requires a description, blocks submission until both are filled, and confirms that a human will review it.",
              "Small surface, but it is the difference between a prototype and something you can hand to real students.",
            ],
          },
          // Appendix: left = lo-fi_homepage.png report frame (right cluster).
          // Right = Hifis__6_.png, keeping validation and confirmation frames.
          {
            type: "mediaPair",
            media: [
              { src: PLACEHOLDER_MEDIA, alt: "Lo-fi report screen", caption: "Before" },
              { src: PLACEHOLDER_MEDIA, alt: "Hi-fi report flow with validation and confirmation", caption: "After — validation and confirmation states" },
            ],
          },
        ],
      },
      {
        id: "final-design",
        heading: "Final design",
        blocks: [
          {
            type: "text",
            heading: "Campus, all in one place",
            paragraphs: [
              "A personalized board built from the interests a student picks during onboarding, with a time-aware greeting and upcoming events up top.",
            ],
          },
          // Hosted on Vercel Blob rather than committed -- see the README on
          // keeping video out of the repo. Served as video/mp4 despite having
          // no extension in the path.
          {
            type: "media",
            media: {
              src: "https://7vxrad93nks5odjn.public.blob.vercel-storage.com/longhorn-loop-sneak-peek",
              kind: "video",
              alt: "Home — the personalized event board",
              caption: "Layout ideated with the design team; final screen by a teammate.",
              aspect: "9 / 16",
            },
          },
          {
            type: "text",
            heading: "Find something outside your bubble",
            paragraphs: [
              "Explore is search plus filters: sort, time of day, in-person or online, distance, and Perks — free food, free swag, free stuff, prizes. That last filter came straight from the first finding. Students told us what makes an event worth attending, so we made it filterable.",
            ],
          },
          // Appendix: Explore + filter panel, screen recording.
          // Hifis__2_.png and Hifis__1_.png for reference.
          {
            type: "media",
            media: { src: PLACEHOLDER_MEDIA, alt: "Explore with the filter panel open" },
          },
          {
            type: "text",
            heading: "Everything you need in one tap",
            paragraphs: [
              "Date, location, host, interest tags, who is going, and RSVP on one screen. Save it and the app reminds you before it starts — the gap where students told us they lost events they had already found. Tapping the location opens a map overlay with walking distance and a handoff to Maps. If the org has not posted a location yet, the event says so and offers to notify you when it is added.",
            ],
          },
          // Appendix: Event detail, RSVP, map overlay — screen recording.
          // Hifis__8_.png and Hifis__7_.png for reference.
          {
            type: "media",
            media: { src: PLACEHOLDER_MEDIA, alt: "Event detail, RSVP and the map overlay" },
          },
          {
            type: "text",
            heading: "Your events, three ways",
            paragraphs: [
              "Profile holds Going, Saved, and Posted, with search and filters inside each. Org accounts use the same layout with an Upcoming and Past split.",
            ],
          },
          // Appendix: Hifis__4_.png — Profile and Organization page, stills.
          {
            type: "mediaPair",
            media: [
              { src: PLACEHOLDER_MEDIA, alt: "Profile with Going, Saved and Posted" },
              { src: PLACEHOLDER_MEDIA, alt: "Organization page with Upcoming and Past" },
            ],
          },
          {
            type: "text",
            heading: "Built to survive a team that turns over",
            paragraphs: [
              "Fellows cycle out every year. The system is how the work stays consistent when the people do not. I built the button set, the year and classification dropdowns, and the search-and-dropdown pattern used across onboarding, explore, and profile.",
            ],
          },
          // Appendix: one wide image exported fresh from Figma — type scale,
          // color ramp, event card anatomy, component library.
          {
            type: "media",
            media: {
              src: PLACEHOLDER_MEDIA,
              alt: "Type scale, color ramp, event card anatomy and component library",
              aspect: "16 / 9",
            },
          },
          {
            type: "text",
            heading: "The states nobody screenshots",
            paragraphs: [
              "The academic standing prompt is the one worth calling out: it asks students to update their year, so the feed stays relevant past freshman year.",
            ],
          },
          // Appendix crops: Hifis__16_.png frame 3, Hifis__6_.png frame 4.
          {
            type: "mediaPair",
            media: [
              { src: PLACEHOLDER_MEDIA, alt: "Invalid UT email error", caption: "Invalid UT email" },
              { src: PLACEHOLDER_MEDIA, alt: "Required fields not filled", caption: "Required fields not filled" },
            ],
          },
          // Appendix crops: Hifis__13_.png last frame, Hifis__7_.png frame 4.
          {
            type: "mediaPair",
            media: [
              { src: PLACEHOLDER_MEDIA, alt: "No search results, with a send-it-in fallback", caption: "No results, with send it in" },
              { src: PLACEHOLDER_MEDIA, alt: "No location listed for this event", caption: "No location listed yet" },
            ],
          },
          // Appendix crops: Hifis__3_.png frame 6, Hifis__9_.png frame 3.
          {
            type: "mediaPair",
            media: [
              { src: PLACEHOLDER_MEDIA, alt: "Leave without saving confirmation", caption: "Leave without saving" },
              { src: PLACEHOLDER_MEDIA, alt: "Undo delete on notifications", caption: "Undo delete" },
            ],
          },
          // Appendix crop: Hifis__5_.png.
          {
            type: "media",
            media: {
              src: PLACEHOLDER_MEDIA,
              alt: "Prompt to update academic standing",
              caption: "New academic standing",
              aspect: "4 / 3",
            },
          },
        ],
      },
      {
        id: "status",
        heading: "Status",
        blocks: [
          {
            type: "text",
            heading: "Where it stands",
            paragraphs: [
              "Longhorn Loop enters beta testing in September 2026. I joined at ideation in August 2025 as a design fellow and now lead the design team.",
            ],
          },
          {
            type: "factSheet",
            items: [
              { label: "Screens and states designed", value: "70+" },
              { label: "Flows owned end to end", value: "9" },
              { label: "Design fellows I now lead", value: "2" },
              { label: "On the project", value: "1 year, from ideation to beta" },
            ],
          },
        ],
      },
      {
        id: "reflection",
        heading: "Reflection",
        blocks: [
          {
            type: "text",
            heading: "Designing for a team that turns over",
            paragraphs: [
              "Fellows rotate out yearly, so anything undocumented gets rebuilt or quietly dropped. Building components and states other people could pick up mattered more than any single screen I made.",
              "We were also our own users, which cut both ways. It made the research fast to interpret and it made it easy to assume we already knew the answer — the second interview round existed partly to keep us honest about that.",
            ],
          },
          {
            type: "text",
            heading: "From making screens to owning them",
            paragraphs: [
              "As a fellow I was responsible for my own flows. As lead I am responsible for whether all of them add up to one product — which turns out to be a mostly different job, and mostly about running critique well.",
            ],
          },
          {
            type: "text",
            heading: "The open question",
            paragraphs: [
              "A 30-person survey and two rounds of interviews got us to something coherent. What they cannot tell us is whether the personalized board actually works — whether a student opens it, finds an event they would not have found otherwise, and goes. The September beta is the first real test of that, and it is the number I want.",
            ],
          },
        ],
      }
    ],
  },
};

export function getCaseStudy(slug: string): CaseStudy {
  return caseStudies[slug] ?? { sections: placeholderSections() };
}
