# Trial 14 · Tidal

> One surf forecast, three motion personalities: desktop, phone and reduced motion — and clean hand-overs between them.

**Tier:** Production  ·  **Time:** ~45 min  ·  **Loaded for you:** gsap, ScrollTrigger, SplitText

## The brief

Tidal tells surfers on Portugal’s Silver Coast whether to set an alarm. On a laptop the five-day outlook is a pinned side-scroller you swipe through with the scroll wheel; on a phone the same cards simply stack and slide up as you reach them; and for visitors who asked their device for less motion, everything just fades in gently. Rotate a tablet or resize the window and the page has to switch personalities without leaving anything behind.

## Checkpoints (graded)

1. **Desktop: pin and slide** — At a desktop width (1280×800), when the swells section reaches the top of the screen it stays pinned in place while you keep scrolling, and the five day cards travel sideways (right to left) in step with the scroll, until Friday’s card is fully on screen. Then the section un-pins and scrolls away. Scrolling back up reverses the slide.
2. **Phone: stack and reveal** — At a phone width (390×844) nothing pins and nothing moves sideways: the cards sit stacked in a single column inside the screen, and each one is hidden until you scroll it into view, then animates in (a fade, ideally with a short rise). Cards further down wait for their turn.
3. **Clean hand-overs** — Load at desktop width and scroll into the pinned side-scroller. Resize the window to phone width: the pin is gone (no frozen section, no big empty gap), the cards are stacked in the screen with no sideways offset, and they still reveal as you scroll to them. Resize back to desktop: the pin and the sideways slide work again, all the way to Friday.
4. **Reduced motion: fades only** — With *prefers-reduced-motion: reduce*, at any width: the swells section never pins and stays a normal grid (every card reachable just by scrolling), the cards are hidden until they come into view and then *fade* in — and nothing on the page slides, scales or drifts: not the cards, not the spot rows, not the hero letters, not the waves.

## Before you start

- The swells section has two layouts in the CSS. By default it is a *static grid* (5 columns on desktop, stacked on phones). Adding `.is-horizontal` to `.swells` turns it into the desktop side-scroller: a full-height section whose `.swells__track` is one row wider than the screen. Only your desktop, motion-OK branch should switch it on.
- Width breakpoint: desktop is `(min-width: 768px)`, phone is `(max-width: 767px)`.
- The grader emulates *prefers-reduced-motion* for media queries you check from JavaScript (`gsap.matchMedia` / `window.matchMedia`). It does *not* emulate it for CSS `@media` rules, so handle reduced motion in your script.
- The grader resizes the page between desktop and phone widths while it is running — no reload. The hero letters (SplitText) and the drifting waves are polish; they are only graded in the reduced-motion check (they must not move there).

## Skills tested

`gsap.matchMedia()` · `conditions object` · `automatic revert` · `cleanup functions` · `prefers-reduced-motion` · `pin + horizontal scrub` · `invalidateOnRefresh`

## Your files

- `starter/main.js` — write your animation here (HTML & CSS are done, but you may edit them).
- `reference/` — the finished piece. It is locked: watch it, don't read it.

## How to work

1. Start the server: `node serve.mjs` in the *11 - GSAP Trials* folder (or use Live Server).
2. Open the hub → **Trial 14**. Watch the reference, use **Compare** to see yours side by side.
3. Hit **Run grader** whenever you like — every checkpoint is tested on what your page *does*, not how the code looks.
4. Stuck? 3 hints are waiting in the hub (using them is recorded).
