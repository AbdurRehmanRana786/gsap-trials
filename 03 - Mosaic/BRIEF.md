# Trial 03 · Mosaic

> A Bauhaus album cover that ripples in from its centre — and remixes itself on demand.

**Tier:** Foundations  ·  **Time:** ~40 min  ·  **Loaded for you:** gsap

## The brief

Lumen Kollektiv’s new record, PRISM HOURS, has a cover made of 48 printed tiles. On the launch page the cover assembles itself in a ripple that starts at the sun in the middle and races out to the corners; only then does the record slide out and the title rise. A “Remix the cover” button gives every tile a random quarter-turn, so every fan gets their own one-off sleeve.

## Checkpoints (graded)

1. **The cover ripples in from the centre** — When the page loads, every tile starts hidden. The tiles then appear (scaling, turning and/or fading in) in a ripple that starts at the *centre of the grid* and spreads outwards: the middle tiles are in clearly before the tiles at the edges, and the four corners come last. The whole reveal is spread over at least half a second.
2. **Then the title and the rest** — The album title (`.album__title`), the track list (`.album__tracks`) and the buttons (`.album__actions`) start hidden and only appear once *most of the tiles are in*. The title comes before the buttons.
3. **Remix the cover** — Clicking “Remix the cover” turns most tiles by *90°, 180° or 270°* — each tile gets its own random amount — animating through the angles in between, with the tiles starting at different moments rather than all at once. Every tile ends perfectly square. Clicking again produces a different arrangement, and two quick clicks in a row still leave every tile square.

## Before you start

- The 48 `.tile` elements sit in `.cover` as *6 rows × 8 columns*, in reading order. Each tile’s shape is drawn by its `::before` — rotate the `.tile` itself and the shape turns with it.
- Accent tiles (`.tile--accent`) scale their shape with the CSS variable `--breathe` (1 = normal). GSAP can tween CSS variables — that’s how the reference makes them breathe (not graded).
- The two title lines (`.album__line`) already sit inside `.mask` wrappers.

## Skills tested

`Stagger objects (grid / from / amount)` · `Function-based values` · `utils.random` · `Relative vs absolute values` · `repeat / yoyo` · `Timeline sequencing`

## Your files

- `starter/main.js` — write your animation here (HTML & CSS are done, but you may edit them).
- `reference/` — the finished piece. It is locked: watch it, don't read it.

## How to work

1. Start the server: `node serve.mjs` in the *11 - GSAP Trials* folder (or use Live Server).
2. Open the hub → **Trial 03**. Watch the reference, use **Compare** to see yours side by side.
3. Hit **Run grader** whenever you like — every checkpoint is tested on what your page *does*, not how the code looks.
4. Stuck? 3 hints are waiting in the hub (using them is recorded).
