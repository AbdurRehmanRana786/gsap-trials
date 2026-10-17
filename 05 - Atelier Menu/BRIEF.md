# Trial 05 · Atelier Menu

> A fullscreen couture menu that opens, closes and changes its mind gracefully.

**Tier:** Foundations  ·  **Time:** ~40 min  ·  **Loaded for you:** gsap

## The brief

Maison Vellure, a Paris tailoring house, wants its site navigation to feel like a curtain at a private showing. The burger sweeps three silk-coloured panels down over the page, the links rise from behind their hems and the burger folds into an X. It has to close just as elegantly — on a second click, on Escape, or when someone changes their mind half-way through.

## Checkpoints (graded)

1. **The panels sweep in** — Before anything is clicked no menu panel is visible. Clicking the burger (`.menu-toggle`) makes the three colour panels sweep down from the top of the screen one after another — blush, then camel, then wine — each gliding into place (not jumping) until the wine panel covers the whole screen.
2. **Links rise, the burger becomes an X** — As the menu opens, the five links rise into view from behind their masks — clipped while they move, not faded — one after another from top to bottom. Meanwhile the burger turns into an X: its top and bottom lines rotate until they cross each other at about a right angle, and the middle line disappears.
3. **Close it — any way you like** — Clicking the burger again closes the menu backwards: the links leave first, then the panels retract and the X turns back into three lines. *Escape* closes an open menu the same way (and does nothing while it is closed), and the burger still opens it afterwards. Clicking while the menu is still opening turns it around from that exact point — no jump to fully open or fully closed. The burger’s `aria-expanded` reads `true` while open and `false` once closed.
4. **Hover rolls** — With the menu open, hovering a link rolls its label: the word slides up out of its one-line mask while its italic twin slides up into its place. Moving away rolls it back down. Only the hovered link moves, every link does it, and a quick in-and-out never leaves a label stuck half-way.

## Before you start

- The CSS hides `.menu` (`visibility: hidden`) so it can’t flash or block clicks before your script runs. Your animation has to reveal it — and ideally hide it again once it has closed.
- The burger `.menu-toggle` sits above the menu, so the same button can close it. Its three `.menu-toggle__line`s are placed with `top`, 7px apart, and have no transforms of their own.
- Every link has two labels inside a one-line mask (`.menu__roll`): the `.menu__label` you see and its italic twin `.menu__label--clone`, parked just below it. Keep both.
- The page itself doesn’t scroll — everything happens on one screen.

## Skills tested

`Reversible timelines` · `reversed() / reverse()` · `Position parameter` · `Keyboard events` · `timeScale` · `Per-item hover timelines` · `aria-expanded`

## Your files

- `starter/main.js` — write your animation here (HTML & CSS are done, but you may edit them).
- `reference/` — the finished piece. It is locked: watch it, don't read it.

## How to work

1. Start the server: `node serve.mjs` in the *11 - GSAP Trials* folder (or use Live Server).
2. Open the hub → **Trial 05**. Watch the reference, use **Compare** to see yours side by side.
3. Hit **Run grader** whenever you like — every checkpoint is tested on what your page *does*, not how the code looks.
4. Stuck? 3 hints are waiting in the hub (using them is recorded).
