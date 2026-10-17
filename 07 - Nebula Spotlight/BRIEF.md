# Trial 07 · Nebula Spotlight

> A pinned product spotlight whose story is scrubbed by the scrollbar — and snaps to every feature.

**Tier:** Scroll  ·  **Time:** ~50 min  ·  **Loaded for you:** gsap, ScrollTrigger

## The brief

Nebula Audio is launching Nebula One, its first over-ear headphones. The launch page pins the product centre stage and lets the scrollbar tell the story: three features arrive one by one while the headphones turn under shifting light, and wherever you stop, the page glides to the nearest feature. A hairline bar at the top shows how far down the page you are.

## Checkpoints (graded)

1. **Progress bar** — The bar at the top of the screen is empty at the top of the page and full at the very bottom. In between, the filled part grows from its *left edge* in proportion to how far down the whole page you are (half-way down ≈ half full), and shrinks again when you scroll back up.
2. **Pin the spotlight** — When the top of the spotlight section reaches the top of the screen, the section stays fixed in place for *at least two screens* of scrolling (the reference holds it for three), then lets go and scrolls away normally towards the specs.
3. **Scrubbed story** — When the spotlight pins, the three callouts are hidden. As you keep scrolling they appear *in order* — Noise Cancelling, then Battery, then Spatial audio — and the headphones (`.product`) turn and/or scale gradually, their pose following the scrollbar. Scroll back up to where the pin started and everything rewinds: callouts hidden, product back in its starting pose.
4. **Snap to features** — Stop scrolling half-way between two features and, a moment later, the page *glides* (not jumps) to rest on a feature: the newest visible callout fully shown, the next one still hidden. Wherever you let go inside the spotlight, you never end up looking at a half-revealed callout.

## Before you start

- The progress bar `.progress__bar` is styled at *full* width — your code decides how much of it shows. The grader measures the visible part of the bar.
- The grader scrolls the page itself and watches `.spotlight`, `.product` and the three `.callout`s. Keep those classes.
- The teal and amber background layers (`.spotlight__layer--teal`, `--amber`) start at `opacity: 0` and the sound rings `.product__waves` are invisible. Bringing them in is part of the reference look, not a graded checkpoint.
- ScrollTriggers are measured in the order you create them, and a pin *adds* scroll distance. A bar whose end is “the bottom of the page” must be measured after the pin exists — `end: "max"` is always recalculated last, or create the bar’s trigger after the spotlight’s.
- Snapping only kicks in once scrolling has stopped, so give it a moment when you test by hand. `markers: true` is your friend while you work.

## Skills tested

`ScrollTrigger pin` · `scrub with smoothing` · `One scrubbed timeline` · `Timeline labels` · `snap to labels` · `Scroll-progress UI`

## Your files

- `starter/main.js` — write your animation here (HTML & CSS are done, but you may edit them).
- `reference/` — the finished piece. It is locked: watch it, don't read it.

## How to work

1. Start the server: `node serve.mjs` in the *11 - GSAP Trials* folder (or use Live Server).
2. Open the hub → **Trial 07**. Watch the reference, use **Compare** to see yours side by side.
3. Hit **Run grader** whenever you like — every checkpoint is tested on what your page *does*, not how the code looks.
4. Stuck? 3 hints are waiting in the hub (using them is recorded).
