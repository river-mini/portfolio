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
              { src: PLACEHOLDER_MEDIA, alt: "Hi-fi categorised, searchable interest tags", caption: "After — categorised and searchable, with a send-it-in fallback" },
            ],
          },
          // Appendix: left = lo-fi_onboarding.png, the four preset Bevos.
          // Right = 1788297449092_image.png frame 1 plus one customiser frame.
          {
            type: "mediaPair",
            media: [
              { src: PLACEHOLDER_MEDIA, alt: "Lo-fi avatar selection with four preset options", caption: "Before — pick one of four to continue" },
              { src: PLACEHOLDER_MEDIA, alt: "Hi-fi avatar screen offering upload, customise or skip", caption: "After — upload, customise, or skip" },
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
          // Appendix: Home, as a prototype screen recording (Hifis__11_.png for
          // reference). Set kind: "video" and a CDN URL once recorded.
          {
            type: "media",
            media: {
              src: PLACEHOLDER_MEDIA,
              alt: "Home — the personalized event board",
              caption: "Layout ideated with the design team; final screen by a teammate.",
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
          // colour ramp, event card anatomy, component library.
          {
            type: "media",
            media: {
              src: PLACEHOLDER_MEDIA,
              alt: "Type scale, colour ramp, event card anatomy and component library",
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
