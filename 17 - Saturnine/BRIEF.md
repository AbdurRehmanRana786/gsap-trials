# Trial 17 · Saturnine

> Fly a ringed planet through a scrolling page — GSAP at the controls of a three.js scene.

**Tier:** Mastery  ·  **Time:** ~60 min  ·  **Loaded for you:** gsap, ScrollTrigger, three

## The brief

Saturnine sells nights at an observatory parked off Saturn, and their website is the view: a three.js planet floats behind every section. The scene is built, lit and spinning — but it just sits there. Make it arrive, let the scroll fly it from section to section (tipping the rings open, diving the camera in among the moons, pulling back for the booking), and let visitors re-tint its atmosphere with a click.

## Checkpoints (graded)

1. **The planet arrives** — On load the planet — rings and all — grows into view from (almost) nothing: it starts tiny and gets smoothly bigger over the best part of a second or more, then rests at its full size in the hero. It must not just pop in.
2. **Scroll carries the planet** — By the time “The Rings” fills the screen, the planet has drifted clearly to the right (about a tenth of the screen width or more) and tilted so its rings open up. The move is scrubbed — part-way down, it is part-way there — and scrolling back to the top returns it exactly to its hero pose.
3. **The camera dives in** — While “The Moons” fills the screen, the camera is much closer to the planet (its distance at least a quarter shorter than in the hero), reached gradually as you scroll. Scrolling on to “Visit” pulls it back out again, and scrolling back up to The Moons brings it close again.
4. **Atmosphere filters** — Clicking any of the five filter swatches smoothly re-tints the planet to that swatch’s colour (its `data-color`) — you can watch it pass through in-between colours rather than snap. Every swatch works, one after another.

## Before you start

- `main.js` is an ES module (it imports three through the import map). `gsap` and `ScrollTrigger` are still plain globals inside it — just call `gsap.registerPlugin(ScrollTrigger)`.
- The whole scene is done for you. Write your GSAP code in the marked area *above* the last line, and keep that last line (`window.__trial = { planet, rings, camera, material }`): the grader reads the real 3D objects through it.
- `planet` is a `THREE.Group` holding the globe, atmosphere, rings and moons — move, tilt or scale it and everything follows. The render loop already redraws every frame; you never call `renderer.render()` yourself.
- Rotations are in *radians* (0.5 ≈ 29°). Colours: three.js stores them in linear space — `new THREE.Color(hex)` converts a swatch’s hex for you.
- Every section is exactly one screen tall. Toggling `.is-active` on the swatches is a nice touch, but it isn’t graded.

## Skills tested

`Tweening non-DOM objects` · `Vector3 · Euler · Color` · `ScrollTrigger scrub on 3D` · `One timeline, many legs` · `fromTo + immediateRender` · `Click-driven tweens`

## Your files

- `starter/main.js` — write your animation here (HTML & CSS are done, but you may edit them).
- `reference/` — the finished piece. It is locked: watch it, don't read it.

## How to work

1. Start the server: `node serve.mjs` in the *11 - GSAP Trials* folder (or use Live Server).
2. Open the hub → **Trial 17**. Watch the reference, use **Compare** to see yours side by side.
3. Hit **Run grader** whenever you like — every checkpoint is tested on what your page *does*, not how the code looks.
4. Stuck? 3 hints are waiting in the hub (using them is recorded).
