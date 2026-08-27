# Intro animation

`intro.json` is the loading animation played over the homepage before the hero
is revealed. It is currently a **placeholder** (a sage dot that scales and
fades).

## Replacing it

1. In After Effects, export with the **Bodymovin / LottieFiles** plugin as JSON.
2. Save it here as `intro.json`, overwriting the placeholder.
3. Reload the homepage. Nothing else needs changing.

## What the site does with it

- Plays once per full page load, at `src/components/IntroOverlay.tsx`.
- The overlay fades out on the animation's `complete` event, so the reveal is
  timed to your animation rather than to a guessed duration. Set the animation's
  own length in After Effects and the site follows it.
- A 6-second ceiling force-ends it, so a slow or broken file can never trap a
  visitor. If your animation is longer than that, raise `MAX_DURATION_MS`.
- Skipped entirely for visitors who prefer reduced motion, and when navigating
  back to the homepage from another page in the same session.
- Sized by `.intro-overlay__animation` in `src/app/globals.css`
  (currently `min(46vw, 300px)`).

## Notes

- Keep it under a few hundred KB; it blocks the hero reveal while it plays.
- Loops are disabled deliberately (`loop: false`) since the animation has to end
  for the site to appear.
- Images embedded in a Lottie export land in a separate `images/` folder. If
  yours has any, either keep them alongside this file and adjust the path, or
  re-export with assets inlined as base64.
- Transparent backgrounds work fine — the overlay sits on the site's cream
  background colour.
