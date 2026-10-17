# Trial 08 · Manifesto

> A type foundry’s manifesto that rises, cycles and lights up word by word — all with GSAP’s own SplitText.

**Tier:** Scroll  ·  **Time:** ~45 min  ·  **Loaded for you:** gsap, ScrollTrigger, SplitText

## The brief

Kinetic Type Co. draws typefaces for brands that move. Their manifesto page has to prove it: the headline rises out of its own line masks, the subline keeps swapping the word at its end, and the long manifesto paragraph lights up word by word as you scroll through it, like someone reading it aloud.

## Checkpoints (graded)

1. **Headline rises from line masks** — On load the headline is hidden. Then each of its lines slides *up out of its own mask* (clipped while it moves, not faded in), one after another, *top line first*, until the whole headline is fully visible.
2. **The word ticker** — The red word at the end of “We design for …” cycles *brands → motion → people*, then starts over with brands, forever, holding each word for a couple of seconds (the reference: about 2.3 s). Every swap is animated: the old word leaves *upward* out of the ticker’s box while the new one rises in *from below* — never an instant text change.
3. **Read-along highlight** — Before you reach it, the manifesto paragraph is dim (words barely visible). As you scroll through it, it lights up to full brightness *word by word, in reading order*, tied to the scroll position — half-way through, the first part is lit and the rest still dim. By the time it leaves the screen every word is lit; scroll back up and it dims again.

## Before you start

- The CSS hides `.hero__title` (`visibility: hidden`) so the un-split headline never flashes. Reveal it with `autoAlpha` once you have split it.
- Only the first `.ticker__word` is visible in the CSS — the other two are `visibility: hidden` until your loop brings them in. All three sit in the same spot inside `.ticker`, which clips anything outside it.
- Split text by lines only once the web fonts have loaded (`document.fonts.ready.then(…)`, or SplitText’s `autoSplit`). A fallback font breaks lines in different places.
- SplitText is GSAP’s own plugin (free, already loaded) — not the SplitType library from the course, but the idea is the same: it wraps lines, words and characters in elements you can animate.

## Skills tested

`SplitText lines / words / chars` · `mask: "lines"` · `Staggers on splits` · `Looping timelines` · `Scrub across many targets` · `Fonts & FOUC`

## Your files

- `starter/main.js` — write your animation here (HTML & CSS are done, but you may edit them).
- `reference/` — the finished piece. It is locked: watch it, don't read it.

## How to work

1. Start the server: `node serve.mjs` in the *11 - GSAP Trials* folder (or use Live Server).
2. Open the hub → **Trial 08**. Watch the reference, use **Compare** to see yours side by side.
3. Hit **Run grader** whenever you like — every checkpoint is tested on what your page *does*, not how the code looks.
4. Stuck? 3 hints are waiting in the hub (using them is recorded).
