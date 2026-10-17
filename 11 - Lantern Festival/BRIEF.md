# Trial 11 · Lantern Festival

> A layered night scene that rises as you scroll and leans as you look around.

**Tier:** Motion Systems  ·  **Time:** ~45 min  ·  **Loaded for you:** gsap, ScrollTrigger, SplitText

## The brief

Hội An Lights is the guide to the old town’s full-moon night, when the streetlights go off and the river fills with paper lanterns. The landing page is one deep, layered illustration: scroll and the camera rises past the sampan, the shophouses and the hills toward the moon while the scattered letters of the title drift together; move the pointer and the whole night leans with you. On the water, every lantern bobs on its own little current.

## Checkpoints (graded)

1. **Layers drift by depth** — While the scene is stuck on screen, scrolling moves every `.layer` vertically by an amount proportional to its `data-depth` — the depth-1 sampan travels ten times as far as the depth-0.1 moon, and all layers go the same way. The motion tracks the scroll 1:1 (no easing): half the scroll, half the distance, all the way through the scene.
2. **The title gathers** — At the top of the page the letters of “Hội An Lights” are scattered — each letter knocked off its line by its own random amount (offset and tilted). Scrolling down gathers them back into place gradually, in step with the scroll; by the time the content below starts to come up, every letter is home and upright. Scroll back up and they scatter again.
3. **The night follows the pointer** — Moving the pointer left/right and up/down shifts every layer — nearer layers more than far ones, in proportion to their depth. The layers glide after the pointer with an eased follow that catches up over a fraction of a second; they never snap instantly.
4. **Lanterns float** — Every floating `.lantern` bobs gently up and down by itself, forever, each at its own pace — they never move in lockstep.

## Before you start

- `.scene` is 260vh tall and `.scene__sticky` is `position: sticky`, so the scene already stays on screen for the first 160vh of scrolling. You don’t need to pin anything.
- Every `.layer` has exactly the same box, and its `data-depth` runs from `0.1` (the moon) to `1` (the sampan). The title lives in a layer too.
- Each `.lantern` is an SVG group sitting inside a positioning `<g>`, so a `y` tween on it is relative to where it floats.
- Scroll and pointer will *both* move the layers. If both effects write the same transform property, the last one wins — decide which property each effect owns.

## Skills tested

`data-depth parallax` · `scrub + ease: none` · `SplitText chars` · `gsap.utils.random` · `Function-based values` · `gsap.quickTo` · `Ambient loops`

## Your files

- `starter/main.js` — write your animation here (HTML & CSS are done, but you may edit them).
- `reference/` — the finished piece. It is locked: watch it, don't read it.

## How to work

1. Start the server: `node serve.mjs` in the *11 - GSAP Trials* folder (or use Live Server).
2. Open the hub → **Trial 11**. Watch the reference, use **Compare** to see yours side by side.
3. Hit **Run grader** whenever you like — every checkpoint is tested on what your page *does*, not how the code looks.
4. Stuck? 3 hints are waiting in the hub (using them is recorded).
