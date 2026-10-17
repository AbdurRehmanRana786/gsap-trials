# Trial 01 · Citrus Splash

> A sunny preloader that hands off to the website underneath.

**Tier:** Foundations  ·  **Time:** ~30 min  ·  **Loaded for you:** gsap

## The brief

Citrus & Co. is launching a small-batch lemonade and wants a splash screen with personality. A lemon slice rolls in, the brand name rises into place, a loader fills — then the whole splash lifts like a curtain to reveal the site.

## Checkpoints (graded)

1. **The lemon rolls in** — The lemon slice starts off-screen on the left and rolls — travelling and spinning at the same time — into the centre of the splash, where it comes to rest.
2. **The title rises from its mask** — Once the lemon has (almost) arrived, “Citrus & Co.” slides up from behind its mask — it is clipped while it moves, not faded in. After that, the tagline appears.
3. **The bar fills, the curtain lifts** — The loader bar fills from its left edge. Only when it is full does the whole splash glide upward off the screen, revealing the website — whose hero headline animates in as the curtain clears.

## Before you start

- The CSS hides `.splash__inner` (visibility: hidden) so nothing flashes before your script runs. Your code has to reveal it.
- All markup and styling is done — you only write `main.js`.

## Skills tested

`gsap.to / from / set` · `Eases` · `Sequencing (delays or a timeline)` · `transformOrigin` · `Mask reveals` · `autoAlpha & FOUC`

## Your files

- `starter/main.js` — write your animation here (HTML & CSS are done, but you may edit them).
- `reference/` — the finished piece. It is locked: watch it, don't read it.

## How to work

1. Start the server: `node serve.mjs` in the *11 - GSAP Trials* folder (or use Live Server).
2. Open the hub → **Trial 01**. Watch the reference, use **Compare** to see yours side by side.
3. Hit **Run grader** whenever you like — every checkpoint is tested on what your page *does*, not how the code looks.
4. Stuck? 3 hints are waiting in the hub (using them is recorded).
