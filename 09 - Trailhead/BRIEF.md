# Trial 09 · Trailhead

> A pinned trail map where scrolling walks a hiker round the loop.

**Tier:** Scroll  ·  **Time:** ~50 min  ·  **Loaded for you:** gsap, ScrollTrigger, DrawSVGPlugin, MotionPathPlugin

## The brief

Ridgeline publishes trail guides you actually want to read. For the Saddle Loop they want the map to do the talking: the map pins, and as you scroll the route draws itself across the fells with a little hiker leading the line, waypoint pins plant themselves as the hiker reaches them and the panel counts the kilometres and metres climbed.

## Checkpoints (graded)

1. **The trail draws as you scroll** — When the map section reaches the top of the screen it pins in place. Over the next few screens of scrolling the orange route (`.trail__path`) draws itself from the car park all the way round the loop — nothing of it is drawn before the pin starts, all of it by the time the map is released. Scrolling back up un-draws it.
2. **The hiker walks the line** — The hiker (`.trail__hiker`) moves along the route as you scroll, its centre always on the trail — never cutting corners — and always at the leading tip of the drawn line. Scroll back and it walks back.
3. **Waypoints pop as the hiker arrives** — Every waypoint (`.waypoint`) is hidden while the hiker is still before it. As the hiker reaches it (its `data-km` mark) it pops in — growing from nothing to full size — so the four pins appear one by one in trail order. Scrolling back hides them again.
4. **The readouts count the hike** — The panel’s *Walked* readout (`.readout__km`) shows how far the hiker has gone, with one decimal: `0.0` at the trailhead, counting smoothly up to `11.4` at the end. *Climbed* (`.readout__gain`) counts whole metres from `0` to `590`. Both count back down when you scroll up.

## Before you start

- Plugins are loaded as globals but not registered: start with `gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin)`.
- The map is two layers: `map-art.svg` is a static picture; everything you animate (`.trail__path`, `.trail__hiker`, `.waypoint`) lives in the inline `<svg class="trail__map">`, in the same coordinates.
- The hiker is drawn around its own centre `(0, 0)` and parked at the trailhead with a `translate()`; each pin’s tip is the `(0, 0)` of its `.waypoint` group. Each waypoint carries its distance in `data-km`; the loop is 11.4 km and climbs 590 m.
- Rotating SVG yourself? SVG elements turn around the top-left corner of their bounding box unless you give them a `transformOrigin`.
- In the starter everything is shown in its finished state (full line, all pins, hiker at the trailhead) — your script decides what is hidden.

## Skills tested

`Pinned scrub timelines` · `DrawSVG (or stroke-dashoffset)` · `MotionPathPlugin` · `Syncing tweens on one playhead` · `Timeline positions from data` · `Tweening a plain object + onUpdate`

## Your files

- `starter/main.js` — write your animation here (HTML & CSS are done, but you may edit them).
- `reference/` — the finished piece. It is locked: watch it, don't read it.

## How to work

1. Start the server: `node serve.mjs` in the *11 - GSAP Trials* folder (or use Live Server).
2. Open the hub → **Trial 09**. Watch the reference, use **Compare** to see yours side by side.
3. Hit **Run grader** whenever you like — every checkpoint is tested on what your page *does*, not how the code looks.
4. Stuck? 3 hints are waiting in the hub (using them is recorded).
