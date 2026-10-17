# Trial 16 · Modular

> A silent synth panel with knobs that feel expensive.

**Tier:** Production  ·  **Time:** ~50 min  ·  **Loaded for you:** gsap, Draggable, InertiaPlugin

## The brief

Modular sells a “tiny web synth” that makes no sound at all — the whole pitch is how good the controls feel. Three knobs turn between hard end stops, a fader clicks into its notches, and the power switch wakes a 16-band spectrum that dances (and responds to the knobs). Your job: make the hardware behave like hardware.

## Checkpoints (graded)

1. **Knobs turn, with end stops** — Grab a knob and drag around it: the dial follows your pointer (circling clockwise turns it clockwise). It can never turn past its end stops — the pointer stays between −135° (lower left) and +135° (lower right) even if you keep circling past them. Each knob turns on its own.
2. **Readouts follow the angle** — While you turn a knob, its readout (`.knob__value`) shows a whole number that tracks the angle: 0 at the left stop, 50 straight up, 100 at the right stop, in proportion in between. It updates live during the drag, and only the knob you touch changes its number.
3. **The fader snaps to notches** — Drag the fader handle up or down (it never leaves its track). Let go between two notches and it settles exactly on the *nearest* one; the readout (`.fader__value`) then shows that notch’s value — 0, 25, 50, 75 or 100.
4. **Power wakes the bars** — Clicking the power switch slides its thumb across (animated, not a jump) and lights the LED. While on, the 16 bars rise and keep moving, each at its own level. Clicking again slides the thumb back, the LED goes dark, and the bars collapse back to rest and stop. It works every time you toggle it.

## Before you start

- Each knob’s turning part is `.knob__dial` (it carries the orange `.knob__pointer`); its number is `.knob__value`. The CSS already rotates every dial to match its starting number (0 ↔ −135°, 100 ↔ +135°).
- The fader handle is `.fader__thumb`, moving inside `.fader__track`; the five engraved `.fader__notch` marks are 100 · 75 · 50 · 25 · 0 from top to bottom. The handle starts on 75 (a CSS `translateY` of one step); `.fader__value` is its readout.
- Power: click `.power__switch`. Toggling `.is-on` on `.panel` lights the LED, the “ON” label and the screen’s LIVE badge for you (CSS) — but sliding `.power__thumb` and moving the 16 `.viz__bar`s is your job. The bars rest at 6px tall; animate their `height` (or `scaleY` from the bottom).
- The grader drags like a person: it grabs a knob and circles around it, and it grabs the fader and slides it. Draggable or your own pointer code — both fine.

## Skills tested

`Draggable (rotation & y)` · `bounds & end stops` · `snap + InertiaPlugin` · `utils.mapRange / snap / clamp` · `gsap.ticker` · `quickSetter / quickTo`

## Your files

- `starter/main.js` — write your animation here (HTML & CSS are done, but you may edit them).
- `reference/` — the finished piece. It is locked: watch it, don't read it.

## How to work

1. Start the server: `node serve.mjs` in the *11 - GSAP Trials* folder (or use Live Server).
2. Open the hub → **Trial 16**. Watch the reference, use **Compare** to see yours side by side.
3. Hit **Run grader** whenever you like — every checkpoint is tested on what your page *does*, not how the code looks.
4. Stuck? 3 hints are waiting in the hub (using them is recorded).
