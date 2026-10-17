# Trial 02 · Swatch Cards

> Five paint chips that open up when you point at them.

**Tier:** Foundations  ·  **Time:** ~35 min  ·  **Loaded for you:** gsap

## The brief

Pigment & Hue, a Porto paint mill, is launching its autumn collection as a row of tall paint chips. Point at a chip and it widens like a card pulled from a fan deck: three tint strips slide up into its corner and its code, story and “Order sample” button rise out of their masks one by one. Move on and it folds itself away again — however fast or erratic the pointer is.

## Checkpoints (graded)

1. **The chip widens** — Pointing at a chip makes it at least *40% wider*, growing smoothly (not snapping). The other chips do not widen. When the pointer leaves, the chip shrinks smoothly back to its original width.
2. **Details rise, tints slide up** — Before any hover, every chip’s code, description and “Order sample” button are hidden, and so are its three tint strips. On hover, the hovered chip’s details appear *one after another, top to bottom*, and its tint strips *slide upward* into view. Every other chip keeps its details hidden. Leaving tucks them away again.
3. **Every chip, any pointer speed** — All five chips behave the same way. Moving straight from one chip to the next closes the first while the second opens. Leaving a chip half-way through its opening — or coming back to it half-way through closing — turns the motion around *from where it is*, with no jumps. After a fast sweep across the whole row and away, every chip ends closed with its details hidden.

## Before you start

- Every chip has `flex: 1 1 0` in the CSS, so its `flexGrow` starts at *1*. Grow it and the neighbours make room on their own.
- Each detail (`.swatch__code`, `.swatch__desc`, `.swatch__pill`) already sits inside its own `.swatch__line` mask (`overflow: hidden`), and the three `.swatch__tint` strips sit inside the `.swatch__tints` mask.
- With no JavaScript every detail is visible — hiding them until a hover is part of your job.

## Skills tested

`Paused timelines` · `play() / reverse()` · `utils.toArray + forEach` · `Scoped selectors` · `Stagger` · `Tweening flex-grow`

## Your files

- `starter/main.js` — write your animation here (HTML & CSS are done, but you may edit them).
- `reference/` — the finished piece. It is locked: watch it, don't read it.

## How to work

1. Start the server: `node serve.mjs` in the *11 - GSAP Trials* folder (or use Live Server).
2. Open the hub → **Trial 02**. Watch the reference, use **Compare** to see yours side by side.
3. Hit **Run grader** whenever you like — every checkpoint is tested on what your page *does*, not how the code looks.
4. Stuck? 3 hints are waiting in the hub (using them is recorded).
