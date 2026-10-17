# Trial 13 · Crate Diggers

> A record shop where every layout change is a smooth shuffle — and every sleeve slides out to show its liner notes.

**Tier:** Motion Systems  ·  **Time:** ~50 min  ·  **Loaded for you:** gsap, Flip

## The brief

Crate Diggers is a tiny Bristol record shop with a big online bin. Lou wants the website to feel like flipping through a real crate: switching between grid and list should shuffle the records into place, picking a genre should pull the others out of the crate, and clicking a sleeve should lift that very cover off the shelf and into the liner-notes panel — then slip it back when you’re done.

## Checkpoints (graded)

1. **Grid ⇄ List shuffles** — Clicking *List* switches the crate to the list layout and clicking *Grid* switches it back. In both directions every record glides from its old place and size to its new one — and so does its sleeve (the cover shrinks to a thumbnail, or grows back, while it travels). Nothing jumps.
2. **Genres pull records out** — Clicking a genre pill (say *Jazz*) animates the other records out — they shrink and/or fade, not vanish — and the remaining records glide over to close the gaps, ending in the first slots of the grid. Clicking *All* animates the missing records back in and everything returns to its original place.
3. **The sleeve slides out** — Clicking a record opens the liner-notes panel showing *that* record (its title, artist and tracklist), and its cover visibly travels and grows from the card into the panel’s big sleeve spot — it doesn’t simply appear there. Clicking the close button sends the cover back the same way: it shrinks and flies back into its card, and the panel goes away.

## Before you start

- All layouts are already in the CSS — your script only *switches states* and animates between them: `.crate.is-list` (list view), `.record.is-hidden` (a filtered-out record, `display: none`), `.detail.is-open` (the liner-notes panel). The active button styles are `.is-active` on `.filter` / `.view__btn`.
- Filter pills carry `data-genre="all|jazz|funk|soul"`, and so does every `.record`. The layout buttons carry `data-view="grid|list"`.
- The big cover belongs in `.detail__sleeve`. Each record carries its panel copy in a hidden `.record__liner` — put its HTML into `.detail__body` when you open that record.
- The grader clicks a record’s cover (`.record__cover`) to open it and `.detail__close` to close it. Keep the starter classes.

## Skills tested

`Flip.getState / Flip.from` · `nested Flips` · `onEnter / onLeave` · `absolute / absoluteOnLeave` · `Moving elements between containers` · `Flip.fit (optional)`

## Your files

- `starter/main.js` — write your animation here (HTML & CSS are done, but you may edit them).
- `reference/` — the finished piece. It is locked: watch it, don't read it.

## How to work

1. Start the server: `node serve.mjs` in the *11 - GSAP Trials* folder (or use Live Server).
2. Open the hub → **Trial 13**. Watch the reference, use **Compare** to see yours side by side.
3. Hit **Run grader** whenever you like — every checkpoint is tested on what your page *does*, not how the code looks.
4. Stuck? 3 hints are waiting in the hub (using them is recorded).
