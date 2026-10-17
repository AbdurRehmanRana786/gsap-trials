# GSAP Trials

**18 graded motion challenges · 67 checkpoints** — a test of everything from the
*GSAP + Advanced Frontend* course, from your first tween to a Three.js scene and a full landing page.

Every trial is a finished piece of motion design that's **locked**. You can watch it as much as you like,
but you can't read its code. You rebuild it from a starter, and a grader checks what your page actually
*does*.

---

## Start

```bash
node serve.mjs
```

Run that inside this folder, or on a Mac just double-click **Start Trials.command**. It opens **http://localhost:5510/11%20-%20GSAP%20Trials/**, and pages
under `starter/` reload by themselves when you save. You need Node 18 or newer, and nothing else to
install. Opening the *Practice* folder with VS Code Live Server works too, but you don't get live
"restore starter" that way.

## How a trial works

1. **Watch the reference.** Open a trial in the hub and press *Watch reference*. That's the target.
2. **Rebuild it in `starter/`.** The HTML and CSS are done. You write `starter/main.js`, and you can
   edit the markup or styles if you want. Keep the starter's class names, because the grader uses them.
3. **Compare.** The *Compare* page puts the reference and your build side by side. You can sync their
   scroll, replay both at once, switch to tablet or phone width, turn on reduced motion, or use the
   "onion skin" overlay.
4. **Run the grader.** It loads your page at 1280×800, then scrolls, hovers, clicks, drags, resizes and
   toggles reduced motion the way a visitor would. While it does that it measures what's actually
   visible: positions, masks, clipping, pinning and order. You can write the code any way you like, as
   long as the result behaves as described. Each checkpoint is scored on its own, so partial work earns
   partial credit, and a checkpoint stays earned once you've passed it.
5. **Stuck?** Each trial has up to 3 progressive hints. The later ones point to the course project
   where you learned that technique.

### Medals

| | |
|---|---|
| 🥇 **Gold** | every checkpoint, no hints |
| 🥈 **Silver** | every checkpoint, with hints |
| 🥉 **Bronze** | some checkpoints, or the solution was opened before you finished |

You can open the **annotated solution** at any time. If you open it before you've passed every
checkpoint, that trial's score is frozen and marked 👁. Your progress is saved in this browser.

## The trials

| # | Trial | Tier | Checkpoints | Time | Skills |
|---|---|---|---|---|---|
| 01 | [Citrus Splash](01%20-%20Citrus%20Splash/BRIEF.md) | Foundations | 3 | ~30 min | gsap.to / from / set, Eases, Sequencing (delays or a timeline) |
| 02 | [Swatch Cards](02%20-%20Swatch%20Cards/BRIEF.md) | Foundations | 3 | ~35 min | Paused timelines, play() / reverse(), utils.toArray + forEach |
| 03 | [Mosaic](03%20-%20Mosaic/BRIEF.md) | Foundations | 3 | ~40 min | Stagger objects (grid / from / amount), Function-based values, utils.random |
| 04 | [Boarding Pass](04%20-%20Boarding%20Pass/BRIEF.md) | Foundations | 4 | ~45 min | Nested timelines, Labels, Position parameter |
| 05 | [Atelier Menu](05%20-%20Atelier%20Menu/BRIEF.md) | Foundations | 4 | ~40 min | Reversible timelines, reversed() / reverse(), Position parameter |
| 06 | [Botanica](06%20-%20Botanica/BRIEF.md) | Scroll | 3 | ~40 min | ScrollTrigger start / end, toggleActions, A trigger per element (forEach) |
| 07 | [Nebula Spotlight](07%20-%20Nebula%20Spotlight/BRIEF.md) | Scroll | 4 | ~50 min | ScrollTrigger pin, scrub with smoothing, One scrubbed timeline |
| 08 | [Manifesto](08%20-%20Manifesto/BRIEF.md) | Scroll | 3 | ~45 min | SplitText lines / words / chars, mask: "lines", Staggers on splits |
| 09 | [Trailhead](09%20-%20Trailhead/BRIEF.md) | Scroll | 4 | ~50 min | Pinned scrub timelines, DrawSVG (or stroke-dashoffset), MotionPathPlugin |
| 10 | [Chroma](10%20-%20Chroma/BRIEF.md) | Motion Systems | 4 | ~50 min | Horizontal pin-scroll, containerAnimation, Function values + invalidateOnRefresh |
| 11 | [Lantern Festival](11%20-%20Lantern%20Festival/BRIEF.md) | Motion Systems | 4 | ~45 min | data-depth parallax, scrub + ease: none, SplitText chars |
| 12 | [Lineup](12%20-%20Lineup/BRIEF.md) | Motion Systems | 4 | ~45 min | Seamless loops, repeat: -1 & ease: none, timeScale (incl. negative) |
| 13 | [Crate Diggers](13%20-%20Crate%20Diggers/BRIEF.md) | Motion Systems | 3 | ~50 min | Flip.getState / Flip.from, nested Flips, onEnter / onLeave |
| 14 | [Tidal](14%20-%20Tidal/BRIEF.md) | Production | 4 | ~45 min | gsap.matchMedia(), conditions object, automatic revert |
| 15 | [Wildlands](15%20-%20Wildlands/BRIEF.md) | Production | 4 | ~50 min | Observer (wheel / touch / pointer), utils.wrap, Animation lock |
| 16 | [Modular](16%20-%20Modular/BRIEF.md) | Production | 4 | ~50 min | Draggable (rotation & y), bounds & end stops, snap + InertiaPlugin |
| 17 | [Saturnine](17%20-%20Saturnine/BRIEF.md) | Mastery | 4 | ~60 min | Tweening non-DOM objects, Vector3 · Euler · Color, ScrollTrigger scrub on 3D |
| 18 | [Kōdo](18%20-%20K%C5%8Ddo/BRIEF.md) | Mastery | 5 | ~90 min | Preloader timelines, SplitText masks, Pin + scrub + callbacks |

Each trial's `BRIEF.md` has the full brief, written so you can read it in your editor.

## What's locked, and how

- `reference/ref.js` is the finished animation. It's bundled with its own private copy of GSAP, then
  obfuscated (string encryption, control-flow flattening, self-defending code), then encrypted, and it
  only gets decrypted in memory while the page runs. The page exposes no `gsap`, `ScrollTrigger`
  or other library globals to poke at from the console.
- The solutions in `_arena/locks/` are encrypted, and they only open through the hub, which records it.
- The source of this whole thing (references, solutions and grader) is in `_vault/` as a single
  AES-256 encrypted file. The passphrase isn't anywhere in this folder.
- Nothing here can stop a determined reverse-engineer, since it all runs on your own machine. What it
  does is make sure you never see an answer by accident, and that peeking takes deliberate effort. You
  *can* inspect the reference's elements in DevTools, the same way you'd study any website you admire.
  That counts as learning from it, not cheating.

## Folder map

```
11 - GSAP Trials/
  index.html · trial.html · compare.html · grade.html   the hub (open via the server)
  serve.mjs                                              local server
  NN - Name/
    BRIEF.md       the brief
    starter/       ← your work goes here
    reference/     the locked final (watch it in the browser)
    .pristine/     an untouched copy of the starter ("Restore a fresh starter" uses it)
  _vendor/         GSAP 3 with every plugin, Lenis, three.js
  _arena/          hub code, styles, encrypted solutions
  _vault/          encrypted source (lets Claude fix or add trials later)
```

## Tips

- Use DevTools on **your own** page as much as you like. Add `markers: true` to any ScrollTrigger.
- The grader scrolls with `window.scrollTo`. Lenis and native scrolling both work, but ScrollSmoother doesn't.
- If a check fails, read its message. Each one describes what's wrong on screen, never the code to fix it.
- *Restore a fresh starter* (on the trial page) moves your current attempt into `.backups/` and puts
  back the original files.
