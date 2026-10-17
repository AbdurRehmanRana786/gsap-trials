/* ─────────────────────────────────────────────────────────────
   Trial 17 · Saturnine
   Recreate the reference as closely as you can. The brief lists
   exactly what the grader checks — open it from the Trials hub.

   Loaded for you:  gsap, ScrollTrigger  (globals, classic scripts)
                    three                (ES module, via the import map)

   The whole three.js scene is already built below — renderer,
   camera, the planet, its rings, moons, stars and the render loop.
   You don't need to touch it. Your job is the GSAP part: animate
   the 3D objects (positions, rotations, scales, colours) — not DOM.
   ───────────────────────────────────────────────────────────── */
import * as THREE from 'three';

// ═════════════════════════════════════════════════════════════
//  THE SCENE  (done for you — read it, you'll need the names)
// ═════════════════════════════════════════════════════════════

const canvas = document.querySelector('.scene');

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // crisp on retina, but never render 3× pixels
renderer.setSize(window.innerWidth, window.innerHeight, false);
renderer.setClearColor(0x000000, 0);                          // transparent: the CSS sky shows through
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

const scene = new THREE.Scene();

const BASE_FOV = 35;
const camera = new THREE.PerspectiveCamera(BASE_FOV, window.innerWidth / window.innerHeight, 0.1, 400);
camera.position.set(0, 0, 10);

// A tiny seeded random, so the planet looks the same on every load.
function seeded(seed) {
  return () => {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

// ── Planet surface: banded clouds painted into a canvas ──────
// The texture is almost colourless on purpose: material.color tints it,
// so changing that one colour re-paints the whole planet.
function bandTexture() {
  const W = 1024, H = 512, rand = seeded(62), N = 96;
  const knots = Array.from({ length: N + 1 }, rand);
  const noise = (x) => { const i = Math.floor(x), f = x - i, s = f * f * (3 - 2 * f); return knots[((i % N) + N) % N] * (1 - s) + knots[(((i + 1) % N) + N) % N] * s; };
  const storms = [
    { u: 0.62, l: 0.355, rx: 0.045, ry: 0.011, a: 0.22 },  // a great white spot
    { u: 0.18, l: 0.61, rx: 0.022, ry: 0.007, a: -0.16 },  // a dark oval
    { u: 0.86, l: 0.58, rx: 0.016, ry: 0.006, a: 0.12 },
  ];
  // the band profile only depends on latitude, so precompute it once
  const LUT = 4096, bandsLut = new Float32Array(LUT), warmLut = new Float32Array(LUT);
  for (let k = 0; k < LUT; k++) {
    const l = k / (LUT - 1) * 1.1 - 0.05;
    let v = 0.6 + 0.24 * noise(l * 26) + 0.12 * noise(l * 71 + 9) + 0.035 * Math.sin(l * 340);
    v += 0.14 * Math.exp(-(((l - 0.5) / 0.07) ** 2));                                    // bright equatorial zone
    v -= 0.12 * Math.exp(-(((l - 0.405) / 0.02) ** 2)) + 0.1 * Math.exp(-(((l - 0.6) / 0.025) ** 2)); // dark belts
    bandsLut[k] = v;
    warmLut[k] = noise(l * 15 + 3);
  }
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(W, H), d = img.data;
  for (let y = 0; y < H; y++) {
    const lat = y / (H - 1);
    const pole = 0.5 + 0.5 * smooth(0, 0.2, lat) * smooth(1, 0.8, lat);                   // darker poles
    for (let x = 0; x < W; x++) {
      const u = x / W;
      // wavy band edges — the jet streams
      const l = lat + 0.0045 * Math.sin(u * Math.PI * 8 + lat * 48) + 0.002 * Math.sin(u * Math.PI * 26 + lat * 130) + 0.003 * (noise(u * 40 + lat * 300) - 0.5);
      const k = Math.max(0, Math.min(LUT - 1, Math.round((l + 0.05) / 1.1 * (LUT - 1))));
      let v = bandsLut[k];
      for (const st of storms) {
        const dl = (lat - st.l) / st.ry;
        if (dl * dl > 9) continue;
        const du = (((u - st.u + 1.5) % 1) - 0.5) / st.rx;
        if (du * du > 9) continue;
        v += st.a * Math.exp(-(du * du + dl * dl));
      }
      v = v * pole + (rand() - 0.5) * 0.02;                                                 // + grain
      const warm = warmLut[k];
      const i = (y * W + x) * 4;
      d[i] = Math.min(255, v * 255);
      d[i + 1] = Math.min(255, v * (0.94 + 0.05 * warm) * 255);
      d[i + 2] = Math.min(255, v * (0.84 + 0.12 * warm) * 255);
      d[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return tex;
}

// ── Ring texture: one row of pixels, inner edge → outer edge ─
const RING_IN = 1.11, RING_OUT = 2.36; // in planet radii, like the real thing
function ringTexture() {
  const W = 2048, rand = seeded(7), N = 400;
  const knots = Array.from({ length: N + 1 }, rand);
  const noise = (x) => { const i = Math.floor(x), f = x - i; return knots[i % N] * (1 - f) + knots[(i + 1) % N] * f; };
  const band = (r, a, b, s = 0.006) => smooth(a - s, a + s, r) * (1 - smooth(b - s, b + s, r));
  const c = document.createElement('canvas');
  c.width = W; c.height = 2;
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(W, 2), d = img.data;
  for (let x = 0; x < W; x++) {
    const r = RING_IN + (RING_OUT - RING_IN) * (x + 0.5) / W, n = noise(x * 0.18), n2 = noise(x * 0.9 + 50);
    let a = 0, b = 0.8;
    a += band(r, 1.11, 1.235) * (0.05 + 0.05 * n);                          // D ring — dust
    a += band(r, 1.235, 1.525) * (0.22 + 0.16 * n + 0.08 * n2);              // C ring — the crêpe ring
    a += band(r, 1.525, 1.95) * (0.62 + 0.3 * smooth(1.525, 1.62, r) + 0.08 * n2); // B ring — the bright one
    a += band(r, 1.985, 1.995, 0.003) * 0.12;                                // a ringlet inside Cassini
    a += band(r, 2.025, 2.27) * (0.58 + 0.12 * n2) * (1 - 0.92 * band(r, 2.209, 2.219, 0.002)); // A ring + Encke gap
    a += band(r, 2.322, 2.33, 0.003) * 0.55;                                 // F ring
    b = r < 1.525 ? 0.6 + 0.1 * n : r < 1.95 ? 0.92 + 0.08 * n2 : 0.84 + 0.06 * n2;
    for (let row = 0; row < 2; row++) {
      const i = (row * W + x) * 4;
      d[i] = b * 255; d[i + 1] = b * 0.92 * 255; d[i + 2] = b * 0.8 * 255; d[i + 3] = Math.min(1, a) * 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return tex;
}

// ── The planet system ────────────────────────────────────────
// `planet` is a Group: globe + atmosphere + rings + moons travel together.
// Move / tilt / scale `planet` and everything follows.
const planet = new THREE.Group();
planet.position.set(1.55, 0.25, 0);
planet.rotation.set(0.2, 0, 0.36);
scene.add(planet);

// the globe — `material` is the one whose .color you'll tween
const material = new THREE.MeshStandardMaterial({ color: '#E0C39A', map: bandTexture(), roughness: 0.92, metalness: 0 });
const globe = new THREE.Mesh(new THREE.SphereGeometry(1, 128, 96), material);
globe.scale.y = 0.91; // Saturn spins so fast it bulges at the equator
globe.castShadow = true;
globe.receiveShadow = true;
planet.add(globe);

// atmosphere — a fresnel rim plus a soft outer halo (tiny custom shaders)
const atmosphereColor = new THREE.Color('#F2D3A2');
const sunDir = new THREE.Vector3(-6, 3.2, 7).normalize();
const glowVertex = /* glsl */`
  varying vec3 vN; varying vec3 vV;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vN = normalize(normalMatrix * normal);
    vV = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }`;
const glowUniforms = { uColor: { value: atmosphereColor }, uSun: { value: sunDir } };
const rim = new THREE.Mesh(
  new THREE.SphereGeometry(1, 96, 64),
  new THREE.ShaderMaterial({
    uniforms: glowUniforms, vertexShader: glowVertex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, premultipliedAlpha: true,
    fragmentShader: /* glsl */`
      uniform vec3 uColor; uniform vec3 uSun; varying vec3 vN; varying vec3 vV;
      void main() {
        float fres = pow(1.0 - clamp(dot(vN, vV), 0.0, 1.0), 3.4);
        float lit = clamp(dot(vN, uSun) * 0.75 + 0.35, 0.0, 1.0);
        float k = fres * lit * 0.85;
        gl_FragColor = vec4(uColor * k, k); // premultiplied: glow adds light without blacking out the CSS sky
      }`,
  }),
);
rim.scale.set(1.012, 0.922, 1.012);
const halo = new THREE.Mesh(
  new THREE.SphereGeometry(1, 96, 64),
  new THREE.ShaderMaterial({
    uniforms: glowUniforms, vertexShader: glowVertex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, premultipliedAlpha: true, side: THREE.BackSide,
    fragmentShader: /* glsl */`
      uniform vec3 uColor; uniform vec3 uSun; varying vec3 vN; varying vec3 vV;
      void main() {
        float d = clamp(-dot(vN, vV), 0.0, 1.0);
        float glow = pow(smoothstep(0.0, 0.5, d), 2.6);
        float lit = 0.3 + 0.7 * clamp(dot(-vN, uSun) * 0.5 + 0.5, 0.0, 1.0);
        float k = glow * lit * 0.32;
        gl_FragColor = vec4(uColor * k, k);
      }`,
  }),
);
halo.scale.set(1.16, 1.06, 1.16);
planet.add(rim, halo);

// the rings — a flat disc whose UVs run from the inner to the outer edge
const ringGeo = new THREE.RingGeometry(RING_IN, RING_OUT, 256, 1);
const ringPos = ringGeo.attributes.position, ringUv = ringGeo.attributes.uv;
for (let i = 0; i < ringPos.count; i++) {
  const r = Math.hypot(ringPos.getX(i), ringPos.getY(i));
  ringUv.setXY(i, (r - RING_IN) / (RING_OUT - RING_IN), 0.5);
}
const ringTex = ringTexture();
const rings = new THREE.Mesh(ringGeo, new THREE.MeshStandardMaterial({
  map: ringTex, emissive: '#3A3128', emissiveMap: ringTex, transparent: true, side: THREE.DoubleSide, roughness: 1, metalness: 0, depthWrite: false,
}));
rings.rotation.x = -Math.PI / 2; // lie flat in the planet's equator
rings.receiveShadow = true;
rings.castShadow = true;
rings.customDepthMaterial = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking, map: ringTex, alphaTest: 0.55, side: THREE.DoubleSide }); // only the dense B & A rings throw shadow bands
planet.add(rings);

// a few moons on slow orbits
const moonDefs = [
  { r: 0.12, dist: 3.55, speed: 0.045, phase: -0.75, color: '#D7A15C' }, // Titan
  { r: 0.065, dist: 2.85, speed: 0.11, phase: 3.6, color: '#F1F5F8' }, // Enceladus
  { r: 0.05, dist: 3.15, speed: 0.08, phase: 5.3, color: '#BEB8AE' },  // Mimas
];
const moons = moonDefs.map((m) => {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(m.r, 32, 24), new THREE.MeshStandardMaterial({ color: m.color, roughness: 1 }));
  mesh.userData = m;
  planet.add(mesh);
  return mesh;
});

// ── Lights ───────────────────────────────────────────────────
const sunOffset = new THREE.Vector3(-6, 3.2, 7);
const sun = new THREE.DirectionalLight('#FFF1DE', 3.1);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, { left: -3, right: 3, top: 3, bottom: -3, near: 1, far: 30 });
sun.shadow.bias = -0.0006;
sun.shadow.normalBias = 0.015;
scene.add(sun, sun.target);
scene.add(new THREE.HemisphereLight('#7A90B4', '#2A1D12', 0.55));
const backLight = new THREE.DirectionalLight('#8FB0FF', 0.8);
backLight.position.set(6, 2, -6);
scene.add(backLight);

// ── Starfield ────────────────────────────────────────────────
function starSprite() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.18, 'rgba(255,255,255,.85)');
  g.addColorStop(0.45, 'rgba(255,255,255,.18)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
const sprite = starSprite();
const tints = ['#A9BFFF', '#FFFFFF', '#FFF4E0', '#FFD7A6'].map((c) => new THREE.Color(c));
function starLayer(count, size, seed) {
  const rand = seeded(seed), pos = new Float32Array(count * 3), col = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const u = rand() * 2 - 1, th = rand() * Math.PI * 2, r = 60 + rand() * 80, s = Math.sqrt(1 - u * u);
    pos.set([Math.cos(th) * s * r, u * r, Math.sin(th) * s * r], i * 3);
    const c = tints[Math.floor(rand() * tints.length)], b = 0.35 + rand() * 0.65;
    col.set([c.r * b, c.g * b, c.b * b], i * 3);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  return new THREE.Points(g, new THREE.PointsMaterial({
    size, map: sprite, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true,
  }));
}
const stars = new THREE.Group();
stars.add(starLayer(2600, 0.6, 11), starLayer(180, 1.5, 23));
scene.add(stars);

// ── Resize ───────────────────────────────────────────────────
// On tall (phone) screens we widen the field of view and lift the picture
// with a view offset instead of moving the camera — so your camera tweens
// are never fought by the resize code.
function resize() {
  const w = window.innerWidth, h = window.innerHeight;
  const lift = w / h < 0.75 ? h * 0.24 : 0;         // phones: planet sits above the hero copy
  camera.aspect = w / (h + 2 * lift);
  const fit = Math.max(Math.tan(THREE.MathUtils.degToRad(BASE_FOV / 2)), 3.1 / (10 * camera.aspect));
  camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan(fit));
  if (lift) camera.setViewOffset(w, h + 2 * lift, 0, 2 * lift, w, h);
  else camera.clearViewOffset();
  camera.updateProjectionMatrix();
  renderer.setSize(w, h, false);
}
window.addEventListener('resize', resize);
resize();

// ── Render loop ──────────────────────────────────────────────
// Ambient motion only: the globe spins, moons orbit, stars drift.
// Everything else (where the planet is, how it's tilted, how big,
// what colour, where the camera is) is yours to animate with GSAP.
let last = performance.now(), elapsed = 0;
function tick(now) {
  const dt = Math.min((now - last) / 1000, 0.1);
  last = now; elapsed += dt;
  globe.rotation.y += dt * 0.06;
  for (const m of moons) {
    const a = m.userData.phase + elapsed * m.userData.speed;
    m.position.set(Math.cos(a) * m.userData.dist, 0, Math.sin(a) * m.userData.dist);
  }
  stars.rotation.y += dt * 0.004;
  // the sun (and its shadow camera) follows the planet around the screen
  sun.position.copy(planet.position).add(sunOffset);
  sun.target.position.copy(planet.position);
  renderer.render(scene, camera);
}

// Warm-up: one hidden render compiles the shaders, uploads the textures and
// allocates the shadow map now, then we wipe the canvas — so the first real
// frame doesn't stall.
renderer.render(scene, camera);
renderer.clear();


// ═════════════════════════════════════════════════════════════
//  YOUR GSAP CODE  (gsap + ScrollTrigger are globals here)
// ═════════════════════════════════════════════════════════════

// Keep these two lines first. Building the scene took a moment; waiting two
// frames lets GSAP's clock catch up, so your intro starts fresh instead of
// silently skipping its first few hundred milliseconds. (Top-level await is
// fine in a module.) Then the render loop starts — its first frame is drawn
// just after your code below has set up the opening pose.
await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
renderer.setAnimationLoop(tick);


// ── Checkpoint 1 · The planet arrives ─────────────────────────


// ── Checkpoint 2 · Scroll carries the planet ──────────────────


// ── Checkpoint 3 · The camera dives in ────────────────────────


// ── Checkpoint 4 · Atmosphere filters ─────────────────────────



// used by the grader — keep it
window.__trial = { planet, rings, camera, material };
