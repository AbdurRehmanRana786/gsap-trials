# Trial 04 · Boarding Pass

> A boarding pass that assembles itself — with a full set of video-player controls.

**Tier:** Foundations  ·  **Time:** ~45 min  ·  **Loaded for you:** gsap

## The brief

Aurora Air’s check-in page ends with a pass that builds itself: the card rises, the header wipes in, the plane flies the dashed arc from Lisbon to Tokyo, the details drop into their grid, the barcode prints and the stamp comes down. Underneath sits a transport bar, because the design team wants to inspect every frame: play/pause, reverse, restart, a scrubber, a 2× button and chapter jumps. One master timeline drives all of it.

## Checkpoints (graded)

1. **The pass assembles itself** — On load the pass starts empty, then builds up *in this order*: the header (`.pass__header`), the route (`.route__code` LIS / HND), the details grid (`.detail`), and finally the barcode (`.barcode__bar`). Each part animates in rather than popping.
2. **Play, pause, reverse, restart** — While it’s assembling, `.ctrl--play` pauses it — everything freezes — and a second click resumes from the same spot. When it’s finished, `.ctrl--reverse` plays the assembly *backwards* (the barcode disappears first, the header last). `.ctrl--restart` jumps back to the very beginning and plays it again.
3. **The scrubber** — While the timeline plays, the range input (`.scrubber`, 0–100) moves along with it and the readout (`.time__now`) counts the elapsed time. Dragging the scrubber poses the pass at that point — 0 is the empty card, 100 the finished pass — and it *stays paused there* when you let go.
4. **Speed & chapters** — With `.ctrl--speed` switched to 2×, the pass assembles in roughly *half the time*. The chapter buttons (`.chapter` Route · Details · Barcode) jump to the start of their section: everything before it is in place and that section is about to build (it may then play on, or wait).

## Before you start

- Build *one master timeline* — every control steers that same timeline. Keep the greeting and the transport bar out of it (they shouldn’t vanish when you reverse).
- The assembly should take a few seconds (the reference runs about 5 s) so there is something to pause and scrub.
- Ready-made CSS states: `.is-paused` on `.ctrl--play` swaps its icon, `.is-active` highlights the reverse/speed/chapter buttons, and the CSS variable `--p` (e.g. `"40%"`) on `.scrubber` paints its filled track. All optional polish — not graded.
- The dashed arc is revealed by the stroke inside its SVG `<mask>` (`.route__trace`) — animate its `stroke-dashoffset` if you want the line to draw (not graded).

## Skills tested

`Nested timelines` · `Labels` · `Position parameter` · `pause / resume / reverse / restart` · `progress() & onUpdate` · `timeScale()` · `seek / play(label) / tweenTo`

## Your files

- `starter/main.js` — write your animation here (HTML & CSS are done, but you may edit them).
- `reference/` — the finished piece. It is locked: watch it, don't read it.

## How to work

1. Start the server: `node serve.mjs` in the *11 - GSAP Trials* folder (or use Live Server).
2. Open the hub → **Trial 04**. Watch the reference, use **Compare** to see yours side by side.
3. Hit **Run grader** whenever you like — every checkpoint is tested on what your page *does*, not how the code looks.
4. Stuck? 3 hints are waiting in the hub (using them is recorded).
