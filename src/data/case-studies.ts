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
              src: "https://7vxrad93nks5odjn.public.blob.vercel-storage.com/playground/compressed/sweethearts-ad-compressed.mp4",
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
              "ARH 301 needed a 30-second animated intro. The brief asked for three things that don’t naturally sit together: scholarly, clever, and wacky. I pitched three concepts, animated two as rough tests, and shipped a gallery walk through the course’s own artwork that ends with the professor’s eyes winking at the camera from inside a Greek statue.",
              "My first project after training. It shipped for Fall 2026.",
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
          // Filled rather than contained, so no cell carries empty bands. The
          // two landscape pieces are near enough 16:9 to lose almost nothing;
          // the portrait backdrop shows its middle.
          {
            type: "mediaRow",
            media: [
              { src: "/images/projects/arh301/package-backdrop.jpg", alt: "ARH 301 digital backdrop" },
              { src: "/images/projects/arh301/package-slides.jpg", alt: "ARH 301 PowerPoint background" },
              { src: "/images/projects/arh301/package-ta.jpg", alt: "ARH 301 teaching assistant backdrop" },
            ],
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
          {
            type: "media",
            media: {
              src: "https://7vxrad93nks5odjn.public.blob.vercel-storage.com/ARH301%20Idea%201.mp4",
              kind: "video",
              alt: "The first concept, animated",
              caption: "Concept one — set aside after seeing it in motion",
              aspect: "16 / 9",
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
          // Both normalised to the same 16:9 crop and size, so the statue is
          // the only thing that changes between them.
          {
            type: "mediaPair",
            media: [
              {
                src: "/images/projects/arh301/statue-david.jpg",
                alt: "Gallery with Michelangelo’s David at center",
                caption: "Before",
                aspect: "16 / 9",
              },
              {
                src: "/images/projects/arh301/statue-kore.jpg",
                alt: "Gallery with the Berlin Kore at center",
                caption: "After",
                aspect: "16 / 9",
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
          {
            type: "media",
            media: {
              src: "/images/projects/arh301/wink.jpg",
              alt: "Close-up of the statue winking, framed by the archway",
              caption: "Dr. Cushing’s eyes, on the Berlin Kore",
              aspect: "16 / 9",
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
          // The gallery's three walls, left to right. Each keeps its own ratio
          // instead of the row default: the middle wall is square, and a 4:3
          // crop would take the frames off the top and bottom of it. Squaring
          // the centre column makes the uneven heights read as symmetry.
          {
            type: "mediaRow",
            media: [
              {
                src: "/images/projects/arh301/wall-left.jpg",
                alt: "Left wall — two Dada posters, a photograph of the Entartete Kunst exhibition and a Cubist still life, in simple black frames",
                aspect: "16 / 10",
              },
              {
                src: "/images/projects/arh301/wall-middle.jpg",
                alt: "Middle wall — a Kahlo self-portrait, a target painting, an abstract still life and a polka-dotted figure, in gold frames",
                aspect: "1 / 1",
              },
              {
                src: "/images/projects/arh301/wall-right.jpg",
                alt: "Right wall — Las Meninas, the Oath of the Horatii, a Monet river scene and a Gauguin, in ornate gold frames",
                aspect: "16 / 10",
              },
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
              "Longhorn Loop helps UT students find campus events that match their interests, save what they want to attend, and keep track of everything in one place.",
            ],
          },
          {
            type: "factSheet",
            items: [
              { label: "Role", value: "Design Fellow → Design Lead (Aug 2026)" },
              { label: "Timeline", value: "Aug 2025 to Present" },
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
                  "Event details and map overlay",
                  "Explore filters",
                  "Profile and edit profile",
                  "Reporting flow",
                  "Academic standing updates",
                  "Core components: buttons, dropdowns, and search",
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
            heading: "Campus events are everywhere, just not in one place",
            paragraphs: [
              "UT Austin has more than 55,000 students and over 1,000 recognized student organizations. There is always something happening, but finding those events is scattered across Instagram, GroupMe, flyers, and HornsLink.",
              "Students can miss an event that would have been perfect for them simply because they never saw the post.",
            ],
          },
          {
            type: "text",
            heading: "Asking students how they actually find things to do",
            paragraphs: [
              "We started with a survey of 30 students, then ran two rounds of interviews with about 20 students total. The first round helped us understand how students currently discover events. The second happened later, once we had working designs, so we could check whether our decisions still made sense to real students.",
            ],
          },
          {
            type: "list",
            items: [
              "Survey, 30 students. How students currently find campus events and what makes an event worth attending.",
              "Interview round one, about 10 students. How students discover events and where that process breaks down.",
              "Interview round two, about 10 students. How students reacted to our working designs and whether our earlier assumptions still held up.",
            ],
          },
          {
            type: "text",
            heading: "Three things students needed before they would show up",
            paragraphs: [
              "1. Show me why it’s worth going. Students make the decision pretty quickly. Things like free food, swag, prizes, or an interesting speaker can be the reason someone chooses one event over another. A title and time alone usually aren’t enough.",
              "2. Show me why this event fits me. Students wanted to know why an event was relevant to them without having to open every single event first.",
              "3. Help me remember it. Finding an event was only part of the problem. Students would see something they wanted to attend, move on, and then forget about it later.",
            ],
          },
          {
            type: "text",
            heading:
              "How might we make campus events easier to discover while still showing students the ones most relevant to them?",
            paragraphs: [
              "HornsLink works more like a directory. You usually go there when you already know what you’re looking for. We wanted Longhorn Loop to feel more like a feed that learns from the interests students choose and helps them go from finding an event to actually attending it.",
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
            heading: "01. Simplifying the navigation",
            paragraphs: [
              "Our first structure had five tabs: Home, Explore, Create, Events, and Profile.",
              "Events and Profile started to feel repetitive because both were places students went to find their own activity. Instead of keeping another destination in the navigation, we moved Events into Profile and separated them into Going, Saved, and Posted.",
              "That brought the navigation down to four tabs and gave Profile a much clearer purpose.",
            ],
          },
          // Both exports are 402x874, so the pair lines up exactly and the
          // nav is the only thing that differs between them.
          {
            type: "mediaPair",
            media: [
              {
                src: "/images/projects/longhorn-loop/tabs-before.png",
                alt: "Lo-fi events list with a five-tab bottom nav: home, explore, create, events, profile",
                caption: "Before: Five separate tabs",
                aspect: "402 / 874",
              },
              {
                src: "/images/projects/longhorn-loop/tabs-after.png",
                alt: "Hi-fi home screen with a four-tab bottom nav: Home, Explore, Create, Profile",
                caption: "After: Events moved into Profile",
                aspect: "402 / 874",
              },
            ],
          },
          {
            type: "text",
            heading: "02. Making onboarding worth it",
            paragraphs: [
              "The feed only works if we know what a student cares about, so interest selection became one of the most important parts of onboarding.",
              "Our first version used a 3 by 4 grid of unlabeled tiles. Students had to choose at least three interests, but there was no search, no grouping, and no easy way to find something specific.",
              "I redesigned it into collapsible categories with search and a running count of the interests a student selects. If someone searches for an interest we don’t have yet, they can send it in. That turns a missing option into useful feedback for us instead of leaving them at a dead end.",
            ],
          },
          {
            type: "media",
            media: {
              src: "https://7vxrad93nks5odjn.public.blob.vercel-storage.com/Loop%20demo%20-%20onboarding.mp4",
              kind: "video",
              poster: "/images/projects/longhorn-loop/onboarding-interests.png",
              alt: "Onboarding, from account creation through interest selection, academic information and verification",
              caption: "From account creation to interests, academic info, and verification.",
              aspect: "8 / 5",
              fit: "contain",
            },
          },
          {
            type: "text",
            paragraphs: [
              "The avatar step had a similar problem. The early version forced students to choose from four preset Bevos before they could continue.",
              "I changed it so students could upload their own photo, customize a Bevo, or skip the step completely. They still get the fun personalization if they want it, but it isn’t something we force them to do.",
            ],
          },
          {
            type: "media",
            media: {
              src: "https://7vxrad93nks5odjn.public.blob.vercel-storage.com/Loop%20demo%20-%20personalization.mp4",
              kind: "video",
              poster: "/images/projects/longhorn-loop/bevo-customizer.png",
              alt: "The Bevo customizer, with photo upload and skip as the other two paths",
              caption: "Students can customize a Bevo, upload their own photo, or skip personalization completely.",
              aspect: "8 / 5",
              fit: "contain",
            },
          },
          // Still missing the lo-fi exports for a before/after pair here: the
          // 3x4 unlabeled interest grid, and the four-preset Bevo step.
          // Captions when they arrive: "Before: An unlabeled tile grid" /
          // "After: Categorized and searchable", then "Before: Choose one of
          // four presets to continue" / "After: Upload, customize, or skip".
          {
            type: "text",
            heading: "03. Making every flyer fit",
            paragraphs: [
              "Event cards were trickier than they looked because student organizations create their own flyers in all kinds of sizes. A feed with vertical, square, and horizontal images starts to feel messy pretty quickly.",
              "I tested the different flyer sizes inside a two-column layout and landed on a fixed card ratio with consistent information underneath: organization, date, time, and location.",
              "The flyer can change, but the structure around it stays predictable.",
            ],
          },
          // Still missing: the flyer ratio variants beside the fixed card.
          // Captions: "Before: Different flyer ratios competing in the same
          // feed" / "After: Consistent cards with predictable event information".
          {
            type: "text",
            heading: "04. Designing for when something goes wrong",
            paragraphs: [
              "Because students can post events, we also needed a clear way to report something that shouldn’t be on the platform.",
              "The flow covers violent or harmful content, misinformation, troll or spam content, and concerns that don’t fit one of those options. Students have to choose a reason and add a description before they can submit the report.",
              "It’s a small part of the overall product, but it matters once the app moves beyond a prototype and into beta with real students.",
            ],
          },
          // Still missing: the report flow, before and after. Captions:
          // "Before: Basic reporting screen" / "After: Required information,
          // validation, and confirmation".
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
              "Home uses the interests students choose during onboarding to shape their event feed. Upcoming events sit near the top so students can quickly see what’s coming up, while the rest of the board gives them a personalized way to browse campus.",
            ],
          },
          // The main reveal, and the longest of the three demos. Hosted on
          // Vercel Blob rather than committed, per the README.
          {
            type: "media",
            media: {
              src: "https://7vxrad93nks5odjn.public.blob.vercel-storage.com/Loop%20demo%20-%20main.mp4",
              kind: "video",
              poster: "/images/projects/longhorn-loop/home-feed.png",
              alt: "The finished app across discovery, event details, profiles and account settings",
              caption: "The final Longhorn Loop experience across discovery, event details, profiles, and account settings.",
              aspect: "8 / 5",
              fit: "contain",
            },
          },
          {
            type: "text",
            heading: "Find something outside your bubble",
            paragraphs: [
              "Explore gives students another way to browse beyond their personalized Home feed.",
              "They can search and filter by things like time of day, in-person or online, distance, and perks such as free food, swag, or prizes. The perks filter came directly from our research because students kept bringing those details up when explaining why they would actually attend an event.",
            ],
          },
          {
            type: "text",
            heading: "Everything you need in one tap",
            paragraphs: [
              "The event page keeps the information students need to make a decision in one place: date, location, host, interest tags, who’s going, and RSVP.",
              "Students can save an event and get reminded before it starts, which helps with the problem we heard during research where someone would find something interesting and then forget about it.",
              "Tapping the location opens a map view with walking distance and a handoff to Maps. If an organization hasn’t added a location yet, the page says so clearly instead of leaving the student guessing.",
            ],
          },
          // Both stills are 1920x1200, so the pair shares one ratio and neither
          // screen has to be cropped to match the other.
          {
            type: "mediaPair",
            media: [
              {
                src: "/images/projects/longhorn-loop/event-detail-2.png",
                alt: "Event detail with date, location, host, interest tags, who is going, and RSVP",
                caption: "Event information and RSVP in one place.",
                aspect: "8 / 5",
              },
              {
                src: "/images/projects/longhorn-loop/explore-map-2.png",
                alt: "Explore in map view, with event pins across campus and a selected event card",
                caption: "Explore’s map view, with events pinned across campus.",
                aspect: "8 / 5",
              },
            ],
          },
          {
            type: "text",
            heading: "Your events, three ways",
            paragraphs: [
              "Profile is where students can keep track of Going, Saved, and Posted events. Each section has its own search and filters.",
              "Organization accounts use the same general structure with Upcoming and Past events, so the experience still feels familiar.",
            ],
          },
          {
            type: "media",
            media: {
              src: "/images/projects/longhorn-loop/profile-events-2.png",
              alt: "Profile showing the Going, Saved and Posted sections",
              caption: "Going, Saved, and Posted events live inside Profile.",
              aspect: "8 / 5",
            },
          },
          {
            type: "text",
            heading: "Built for a team that changes every year",
            paragraphs: [
              "Longhorn Loop is built by student teams, and fellows rotate out each year. That made the design system especially important.",
              "I built and maintained reusable patterns for buttons, dropdowns, search, and form controls so new designers can keep building without having to recreate the same decisions every year.",
            ],
          },
          {
            type: "text",
            heading: "The states that are easy to forget",
            paragraphs: [
              "Not every important screen is going to be a portfolio hero shot. I also worked through error states, empty states, confirmation screens, and smaller updates so students always know what happened and what they should do next.",
              "One example is the academic standing prompt. It asks returning students to update their year over time so the feed doesn’t keep treating someone like a freshman after they’ve moved on.",
            ],
          },
          // Listed rather than shown: the state crops are still to be exported.
          {
            type: "list",
            items: [
              "Invalid UT email",
              "Required fields not filled",
              "No results, with send it in",
              "No location listed yet",
              "Leave without saving",
              "Undo delete",
              "Update academic standing",
            ],
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
              "Longhorn Loop enters beta testing in September 2026. I joined the project during ideation in August 2025 as a design fellow, and I now lead the design team.",
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
            heading: "Designing for a team that changes",
            paragraphs: [
              "One of my biggest takeaways from this project is that good design isn’t only about the screens I personally finish.",
              "Fellows rotate out each year, so components, documentation, and clear states matter because someone else eventually has to understand the work and continue it.",
              "We’re also the target users, which is helpful but can be risky. Since we’re all UT students, it’s easy to assume our own habits represent everyone. The second round of interviews helped us check those assumptions against students outside of the design team.",
            ],
          },
          {
            type: "text",
            heading: "From owning flows to leading the product",
            paragraphs: [
              "As a fellow, I mainly focused on the flows assigned to me. As design lead, I have to look across everyone’s work and make sure it still feels like one product.",
              "A lot of that has been less about making every screen myself and more about critique, consistency, and helping other designers work through their decisions.",
            ],
          },
          {
            type: "text",
            heading: "What I still want to learn",
            paragraphs: [
              "Our research helped us build something that makes sense in interviews and usability testing, but beta is where we’ll find out whether it actually changes behavior.",
              "The question I care about most is pretty simple: does a student discover an event they would have missed otherwise and actually go?",
            ],
          },
        ],
      },
    ],
  },
};

export function getCaseStudy(slug: string): CaseStudy {
  return caseStudies[slug] ?? { sections: placeholderSections() };
}
