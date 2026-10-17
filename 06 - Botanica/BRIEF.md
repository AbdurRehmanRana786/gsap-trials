# Trial 06 · Botanica

> A plant-subscription landing page that grows as you scroll.

**Tier:** Scroll  ·  **Time:** ~40 min  ·  **Loaded for you:** gsap, ScrollTrigger, Lenis

## The brief

Botanica ships nursery-grown plants (and the confidence to keep them alive). Their long landing page should feel like it is growing as you scroll: each “Why Botanica” row unfurls as it arrives, this month’s nine plants pop onto the shelf a few at a time, and the stats band counts up the proof.

## Checkpoints (graded)

1. **Feature rows reveal (and reverse)** — Each of the three “Why Botanica” rows (`.feature`) is invisible until its top edge scrolls up to about 80% of the way down the screen. Then it reveals: the heading lines rise out of their masks while the text and the illustration (`.feature__art`) fade or grow in. Scroll back up until the row is below the screen again and it hides itself — animated in reverse — ready to play again on the way down. Every row does this on its own.
2. **Cards arrive in batches** — The nine plant cards are hidden until you reach them. When a row of cards scrolls into view, the cards that enter together appear one after another, left to right (staggered — not all at once), while cards further down stay hidden until they are reached. Scroll back up above the grid and the cards hide again.
3. **The counters count up** — The three stats read *0* until the stats band (`.stats`) comes into view. Then each counts up from 0 through whole numbers — always formatted like its final value, with a thousands comma (`8,214`, never `8214.37`) — and lands exactly on its target: *12,480* · *98* · *64*. They count only once: scroll away and come back and they still show the final numbers.

## Before you start

- GSAP, ScrollTrigger and Lenis are loaded. Hook Lenis up as in the course (`lenis.on("scroll", ScrollTrigger.update)` + `gsap.ticker`). Don’t use ScrollSmoother — the grader scrolls the window.
- Each feature heading is already split into lines: every `.feature__line` sits inside its own `.mask` (`overflow: hidden`).
- The stat numbers contain their *final* values in the HTML so the page reads correctly without JavaScript. Your script has to set them to 0 before they are seen. The target is in each `.stat__num`’s `data-value`.
- Keep the classes the grader looks at: `.feature`, `.feature__title`, `.feature__text`, `.feature__art`, `.plant-card`, `.stats`, `.stat__num`.

## Skills tested

`ScrollTrigger start / end` · `toggleActions` · `A trigger per element (forEach)` · `ScrollTrigger.batch` · `Snapped counters + formatting` · `once` · `Lenis`

## Your files

- `starter/main.js` — write your animation here (HTML & CSS are done, but you may edit them).
- `reference/` — the finished piece. It is locked: watch it, don't read it.

## How to work

1. Start the server: `node serve.mjs` in the *11 - GSAP Trials* folder (or use Live Server).
2. Open the hub → **Trial 06**. Watch the reference, use **Compare** to see yours side by side.
3. Hit **Run grader** whenever you like — every checkpoint is tested on what your page *does*, not how the code looks.
4. Stuck? 3 hints are waiting in the hub (using them is recorded).
