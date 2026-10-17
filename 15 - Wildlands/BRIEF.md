# Trial 15 · Wildlands

> A full-screen atlas that travels one landscape per flick — never two.

**Tier:** Production  ·  **Time:** ~50 min  ·  **Loaded for you:** gsap, Observer, SplitText

## The brief

Wildlands publishes a national-parks atlas, and their homepage is a slideshow with no scrollbar: four hand-drawn parks, one per screen. Wheel, swipe, arrow keys or the dots move you on; the next landscape wipes in over the last while it drifts away, and the park’s name builds itself letter by letter. A frantic trackpad flick must still move exactly one park.

## Checkpoints (graded)

1. **One wheel step, one slide** — Scrolling the mouse wheel down moves to the next park, scrolling up goes back. The change is a *wipe*: for a moment part of the screen shows the new landscape and part still shows the old one (not a cut, not a cross-fade) — and when going forward the outgoing landscape drifts upward as it leaves.
2. **Keys, dots, wrap-around** — ↓ and ↑ (arrow keys) also move forward and back, and clicking a dot goes straight to that park. Travel wraps around: forward from Fiordland (04) lands on Patagonia (01), back from Patagonia lands on Fiordland. The counter (`.counter__current`) always shows the number of the park on screen.
3. **No skipping** — A burst of wheel events (one frantic trackpad flick) moves exactly *one* slide — input that arrives while a transition is still playing is ignored. Once the transition is over, the next flick works again.
4. **Titles build in** — Every time a slide arrives — including when you come back to one you have already seen — its big title (`.slide__title`) animates in *letter by letter* (a staggered entrance), then rests fully visible.

## Before you start

- The page never scrolls natively (`overflow: hidden` on `html, body`) — every move is yours to animate.
- All four `.slide`s are stacked full-screen. The CSS only shows the one with `.is-active` (the others are `visibility: hidden`). Make the incoming slide visible yourself (toggle the class or use `autoAlpha`) and keep it *above* the outgoing one (`zIndex`).
- The landscape you see is `.slide__art`. The counter number is `.counter__current`; the dots are `.dots__dot` buttons (an `.is-active` style is ready for them).
- The grader looks at what is on screen (which landscape covers which part of the viewport), so a wheel listener or `Observer`, a `clip-path` or a sliding mask — all fine.

## Skills tested

`Observer (wheel / touch / pointer)` · `utils.wrap` · `Animation lock` · `clip-path wipes` · `SplitText chars + masks` · `Keyboard & dot navigation`

## Your files

- `starter/main.js` — write your animation here (HTML & CSS are done, but you may edit them).
- `reference/` — the finished piece. It is locked: watch it, don't read it.

## How to work

1. Start the server: `node serve.mjs` in the *11 - GSAP Trials* folder (or use Live Server).
2. Open the hub → **Trial 15**. Watch the reference, use **Compare** to see yours side by side.
3. Hit **Run grader** whenever you like — every checkpoint is tested on what your page *does*, not how the code looks.
4. Stuck? 3 hints are waiting in the hub (using them is recorded).
