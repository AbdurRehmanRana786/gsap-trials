# Trial 12 · Lineup

> A festival poster whose line-up never stops scrolling — and goes louder when you do.

**Tier:** Motion Systems  ·  **Time:** ~45 min  ·  **Loaded for you:** gsap, ScrollTrigger

## The brief

SOUNDWAVE ’26 wants its line-up announcement to feel like the festival: three taped-on bands of artist names that never stop moving. Each band loops forever, alternating direction. Scroll and the whole poster answers — the bands flip direction with you, surge and lean when you flick the page, then settle back. Hover a band and it slows to a crawl so you can actually read who’s playing.

## Checkpoints (graded)

1. **Endless rows** — Every `.marquee` row scrolls sideways on its own, at a steady speed, forever. There is never an empty gap at either edge and never a visible jump when the content repeats. Neighbouring rows travel in opposite directions (left, right, left).
2. **Scroll sets the direction** — Scrolling down and scrolling up make the rows travel in opposite directions: after you scroll up, every row runs the other way to how it ran after scrolling down — and keeps going that way (it never stops dead) until you scroll down again.
3. **Speed and skew from velocity** — A fast flick of the page makes the rows race (at least twice their normal speed) and lean over with a skew; a gentle scroll does much less. When you stop scrolling, both settle smoothly back — normal speed, no skew — within a couple of seconds.
4. **Hover to slow a row** — Hovering a row slows *that row* right down to a crawl (well under half speed — but still creeping along, not stopped dead), while the other rows carry on as normal. Moving the pointer off restores its speed and direction.

## Before you start

- Every `.marquee__track` already contains its content *twice* (two identical `.marquee__group`s, each ending with the same gap it uses between items). Moving a track by one group width lands it exactly where it started.
- The poster is `position: sticky`: it stays on screen while the sections below slide up over it, so the rows are always there to react to your scrolling.
- A tween with a *negative* `timeScale` plays backwards — but a reversed tween stops when it reaches its start. Make sure yours can keep going.
- The rows are tilted with the CSS `rotate` property, so GSAP transforms (like `skewX`) on `.marquee` won’t undo the tilt.

## Skills tested

`Seamless loops` · `repeat: -1 & ease: none` · `timeScale (incl. negative)` · `ScrollTrigger direction` · `getVelocity()` · `gsap.quickTo` · `utils.clamp`

## Your files

- `starter/main.js` — write your animation here (HTML & CSS are done, but you may edit them).
- `reference/` — the finished piece. It is locked: watch it, don't read it.

## How to work

1. Start the server: `node serve.mjs` in the *11 - GSAP Trials* folder (or use Live Server).
2. Open the hub → **Trial 12**. Watch the reference, use **Compare** to see yours side by side.
3. Hit **Run grader** whenever you like — every checkpoint is tested on what your page *does*, not how the code looks.
4. Stuck? 3 hints are waiting in the hub (using them is recorded).
