# Intro animation

The loading screen over the homepage is the wordmark's star, spinning while the
page loads and then shrinking away as the screen fades to the hero.

It is **not** a file. The star is an inline SVG in
`src/components/IntroOverlay.tsx`: a single stroked path drawn point to point,
so the middle stays open, with round caps and joins and its vertices set
slightly off true. Drawing it in the component rather than fetching it is the
point. Anything loaded over the network leaves the overlay empty for exactly as
long as the connection is slow, which is when a visitor most needs to see that
something is happening.

## Changing it

- **The shape** is the `d` attribute on the path in `IntroOverlay.tsx`. Five
  points connected every other one, which is what leaves the star hollow.
- **The weight** is `strokeWidth` on the same SVG, in a 100-unit viewBox. It is
  9, which matches the wordmark. Heavier than about 10 closes up the gaps and it
  stops reading as a star.
- **The size and the exit** are `.intro-overlay__animation` in
  `src/app/globals.css` (currently `min(46vw, 300px)`, scaling to `0.35` on the
  way out).
- **The spin** is `.intro-overlay__star` and the `intro-star-spin` keyframes,
  also in `globals.css`. Linear on purpose: it is a loader, and an eased spin
  that repeats starts to look stuck.

## How long it shows

The page decides, not a fixed length. The overlay holds until `window.load`
fires, with a 900ms floor so a warm cache still gets a beat rather than a
flicker, and a 6-second ceiling so a stalled load can never strand anyone. Both
live at the top of `IntroOverlay.tsx`.

It plays once per full page load and is skipped when navigating back to the
homepage client-side. Visitors who prefer reduced motion never see it: the
overlay is hidden in CSS and resolves on the next frame.

## The other files here

`CindyWaterMark.webm` and `CindyWaterMark-still.webp` are the animated hero
wordmark and its fallback frame, used by `src/components/WordmarkAnimation.tsx`.
The star in the top half of that wordmark is the one the intro redraws.
