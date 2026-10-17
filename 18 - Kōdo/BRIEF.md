# Trial 18 · Kōdo

> The capstone: a whole landing page for a Kyoto tea house — every technique, working together, on every screen.

**Tier:** Mastery  ·  **Time:** ~90 min  ·  **Loaded for you:** gsap, ScrollTrigger, SplitText, Flip, DrawSVGPlugin, Lenis

## The brief

Kōdo has poured tea on the same Higashiyama backstreet since 1897, and wants a site as calm and exact as its ceremony. A brush-drawn 茶 counts the page in; the ceremony unfolds step by step while the page stands still; five tea tins slide past sideways; the seasonal menu rearranges itself when you change the season. And it all has to behave on a phone — and for visitors who asked their device for less motion.

## Checkpoints (graded)

1. **Preloader → hero** — On load the counter counts up from 0 to 100, passing through the numbers in between (it takes the best part of a second or more and never goes backwards). Only once it reaches 100 does the loader leave — gradually, not in a single frame. Until then the hero headline is hidden; then it reveals line by line or word by word (not as one block).
2. **The ceremony** — When “The Ceremony” reaches the top of the screen it pins in place for at least a couple of screens of scrolling, then releases. While pinned, the four steps take turns: one step at a time is clearly highlighted (the others dimmed or hidden), in order Prepare → Whisk → Serve → Savour as you scroll down, and back again as you scroll up.
3. **Our teas, sideways** — On a desktop, “Our Teas” pins while scrolling down moves its track of tins to the left, until the last tin is fully on screen; then the page carries on. Each tin’s text (`.tin__info`) is hidden while that tin is still off to the right, and animates in as the tin slides into view.
4. **Seasonal menu** — Clicking a season tab leaves exactly that season’s dishes on show. The change is animated: dishes that stay glide to their new places, and the ones arriving or leaving fade or scale in and out — nothing just blinks. Works for every tab, one after another.
5. **Phones & reduced motion** — On a phone (390 px wide) nothing scrolls sideways: the page is no wider than the screen, the tea tins stay put horizontally while you scroll, the tea section does not pin, and every tin’s text is readable once it is on screen. With reduced motion on a desktop, nothing slides or pins: the loader and headline only fade, the ceremony and the tea gallery scroll by like normal sections, and the tins’ text still appears (fading is fine).

## Before you start

- The loader covers the site until your code moves it out of the way — keep it in the DOM or remove it, either is fine.
- If you use Lenis and `lenis.stop()` during the loader, call `lenis.start()` again once it leaves: while stopped, the page cannot be scrolled at all — not even by the grader.
- The CSS already has the states you may want to toggle: `.step.is-active` / `.step.is-dim`, `.dial__icon.is-current`, `.menu__tab.is-active` and `.dish.is-hidden` (display: none). Each dish lists its seasons in `data-seasons`; each tab has a `data-season`.
- The tea gallery is a plain grid until you add `.is-sliding` to `.teas` — that class turns it into one long horizontal row, on *any* screen size. Add it only where the sideways version belongs (and take it off again in your matchMedia cleanup).
- Reduced motion is tested with the JS media query (`gsap.matchMedia()` / `window.matchMedia`), not CSS. SplitText line breaks depend on the web fonts: split after `document.fonts.ready`.

## Skills tested

`Preloader timelines` · `SplitText masks` · `Pin + scrub + callbacks` · `containerAnimation` · `Flip filtering` · `gsap.matchMedia` · `Reduced motion` · `Lenis`

## Your files

- `starter/main.js` — write your animation here (HTML & CSS are done, but you may edit them).
- `reference/` — the finished piece. It is locked: watch it, don't read it.

## How to work

1. Start the server: `node serve.mjs` in the *11 - GSAP Trials* folder (or use Live Server).
2. Open the hub → **Trial 18**. Watch the reference, use **Compare** to see yours side by side.
3. Hit **Run grader** whenever you like — every checkpoint is tested on what your page *does*, not how the code looks.
4. Stuck? 3 hints are waiting in the hub (using them is recorded).
