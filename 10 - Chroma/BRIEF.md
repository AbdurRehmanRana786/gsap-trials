# Trial 10 · Chroma

> A museum timeline that turns vertical scroll into a walk through five eras of colour.

**Tier:** Motion Systems  ·  **Time:** ~50 min  ·  **Loaded for you:** gsap, ScrollTrigger

## The brief

The Lister Gallery’s exhibition “Chroma — A History of Colour” tells forty thousand years of pigment in five objects. Online, the timeline should feel like walking down the gallery: the section pins, the five rooms slide past sideways, each era’s year rises into place as its room arrives, the walls change colour with the pigment, and the page always comes to rest squarely in front of one exhibit.

## Checkpoints (graded)

1. **The timeline slides sideways** — When `.chroma` reaches the top of the screen it pins. Scrolling down then slides the track to the left in step with the scroll — half-way through the pin you are looking at the middle panel — and the pin ends exactly on the last panel (no gap after it). Then the page carries on. Scrolling back slides it back.
2. **Each era arrives as its panel slides in** — For panels 2–5: while a panel is still waiting off to the right, its year (`.panel__year`) and story (`.panel__text`) are hidden. As the panel slides into view they animate in — the year rising out of its mask — and by the time the panel is in place both are fully visible.
3. **The colour and the dots follow the era** — Whichever panel is in view, the section behind it is painted that era’s colour (its `data-color`), blending smoothly from one era to the next as you scroll. The progress dot for that era (`.era__dot`) is highlighted — one dot at a time.
4. **It always comes to rest on a whole panel** — Stop scrolling part-way between two panels and the page eases itself onto a whole panel, squarely in view — never resting half-way between two eras.

## Before you start

- ScrollTrigger is loaded as a global but not registered: start with `gsap.registerPlugin(ScrollTrigger)`.
- The track (`.chroma__track`) is five panels wide and every `.panel` is exactly one screen. The section `.chroma` hides the overflow, so only one panel shows until you move the track.
- Each panel carries its era colour in `data-color`. The CSS paints `.chroma` in the first one. The progress dots are `.era__dot`; an `.is-active` style is ready in the CSS (and so is `.era__fill`, a progress line, if you fancy it).
- Each year sits inside a `.panel__mask` (`overflow: hidden`).

## Skills tested

`Horizontal pin-scroll` · `containerAnimation` · `Function values + invalidateOnRefresh` · `Snap to panels` · `onUpdate-driven UI` · `utils.interpolate`

## Your files

- `starter/main.js` — write your animation here (HTML & CSS are done, but you may edit them).
- `reference/` — the finished piece. It is locked: watch it, don't read it.

## How to work

1. Start the server: `node serve.mjs` in the *11 - GSAP Trials* folder (or use Live Server).
2. Open the hub → **Trial 10**. Watch the reference, use **Compare** to see yours side by side.
3. Hit **Run grader** whenever you like — every checkpoint is tested on what your page *does*, not how the code looks.
4. Stuck? 3 hints are waiting in the hub (using them is recorded).
