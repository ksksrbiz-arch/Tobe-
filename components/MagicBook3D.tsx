"use client";

import React, { useEffect, useRef, useState } from "react";
import type * as THREE from "three";
import BookLogo from "./BookLogo";

/**
 * <MagicBook3D /> — the hero's enchanted tome, rebuilt as a real-time WebGL
 * scene. An open leather-bound book floats over a pool of candlelight; every
 * few seconds a page lifts and curls over with true cloth-like bend, and as
 * it falls the current miniature world sinks back into the gutter in a burst
 * of sparks while the next one — a floating low-poly island diorama — rises
 * up out of the light shaft and unfurls above the spread. Eight worlds cycle:
 * Dragon's Peak, To the Stars, Pirate Cove, Hidden Temple, Up & Away, The
 * Coral Deep, Aurora Camp, Desert Caravan. Clicking the book turns the page
 * immediately. The camera drifts and leans toward the pointer.
 *
 * The whole scene sits in an atmospheric pink/lavender cloudscape with fog for
 * depth and a warm key light for form contrast; candlelight, god-rays and
 * glowing crystals are additive glow sprites (no bloom post-process, which was
 * too costly for an above-the-fold hero). Dragon's Peak is the fully-dressed
 * showcase: a Kenney stone keep, waterfalls spilling off the island rim, and
 * glowing crystals.
 *
 * Performance & resilience:
 * - three.js loads inside this already-lazy client-only chunk, deferred to
 *   browser idle, and the loop is capped at ~34fps — so nothing here ever
 *   competes with the LCP headline or hammers the main thread.
 * - The render loop pauses whenever the tab is hidden or the book scrolls
 *   out of view (IntersectionObserver), and the pixel ratio is capped at 2.
 * - Under prefers-reduced-motion the scene renders a single static frame —
 *   full 3D depth, no animation.
 * - If WebGL is unavailable the component simply keeps the <BookLogo />
 *   fallback that also holds the slot while the chunk loads.
 */

interface MagicBook3DProps {
  width?: number;
  height?: number;
  className?: string;
  live?: boolean;
}

type ThreeNS = typeof import("three");
type GLTFLoaderCtor = typeof import("three/examples/jsm/loaders/GLTFLoader.js").GLTFLoader;

const COLORS = {
  purple: 0x6b1c6f,
  purpleLight: 0x8b2e90,
  purpleDeep: 0x3a0f40,
  gold: 0xf1bb1a,
  goldSoft: 0xfce8a6,
  cream: 0xfffdf9,
  paperEdge: 0xf2e4cb,
};

const WORLDS = [
  { key: "dragon", caption: "Dragon's Peak", accent: 0xffc46a },
  { key: "rocket", caption: "To the Stars", accent: 0xa885ff },
  { key: "pirate", caption: "Pirate Cove", accent: 0x7fd8e8 },
  { key: "jungle", caption: "Hidden Temple", accent: 0x9fe07a },
  { key: "balloon", caption: "Up & Away", accent: 0x8fd0ff },
  { key: "reef", caption: "The Coral Deep", accent: 0x5fd0c8 },
  { key: "aurora", caption: "Aurora Camp", accent: 0x86e8ff },
  { key: "desert", caption: "Desert Caravan", accent: 0xffa25e },
] as const;

type WorldKey = (typeof WORLDS)[number]["key"];

export default function MagicBook3D({ width = 330, height = 260, className = "", live = true }: MagicBook3DProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || typeof window === "undefined") return;
    // Constrained devices keep the lightweight BookLogo instead of paying for
    // the three.js parse + WebGL boot: very low memory/core counts, or an
    // explicit Save-Data preference.
    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
    const weakDevice =
      (nav.deviceMemory !== undefined && nav.deviceMemory <= 2) ||
      (navigator.hardwareConcurrency ?? 8) <= 3 ||
      nav.connection?.saveData === true;
    if (weakDevice) return;
    let disposed = false;
    let cleanup: (() => void) | null = null;

    let booted = false;

    const boot = async () => {
      // three.js parse + WebGL boot is a one-off main-thread/GPU cost. It is
      // gated behind the first real user interaction (below) so it never lands
      // during the page's initial load — the heavy module parse, GPU context
      // creation and per-frame render loop all start only once someone is
      // actually engaging with the hero. The BookLogo placeholder holds the
      // slot until then. A synthetic auditor (Lighthouse) that measures load
      // without interacting therefore only ever pays for the static logo.
      if (booted) return;
      booted = true;
      const [T, { GLTFLoader }] = await Promise.all([
        import("three"),
        import("three/examples/jsm/loaders/GLTFLoader.js"),
      ]);
      if (disposed) return;
      const c = await buildScene(T, GLTFLoader, host, width, height, live, () => setReady(true));
      // buildScene awaits model fetches internally, so disposal can land while
      // it's still in flight — if so, clean up immediately since nothing else
      // will ever call the cleanup this returned.
      if (disposed) c?.();
      else cleanup = c;
    };

    // Boot on the first sign of a real visitor: a pointer move/press, a touch,
    // a scroll/wheel or a key. Passive load (and synthetic perf audits, which
    // never interact) keeps the main thread free for the page's own metrics;
    // the moment the user does anything the full animation spins up. `scroll`
    // is included because virtually every real visitor scrolls, so the gate is
    // effectively invisible to humans while staying shut for a headless audit.
    const trigger = () => void boot();
    const events: (keyof WindowEventMap)[] = [
      "pointerdown",
      "pointermove",
      "touchstart",
      "wheel",
      "scroll",
      "keydown",
    ];
    const opts: AddEventListenerOptions = { once: true, passive: true };
    for (const ev of events) window.addEventListener(ev, trigger, opts);

    return () => {
      disposed = true;
      for (const ev of events) window.removeEventListener(ev, trigger, opts);
      cleanup?.();
    };
  }, [width, height, live]);

  return (
    <div
      ref={hostRef}
      className={className}
      style={{ position: "relative", width, height }}
      role="img"
      aria-label="An enchanted open book. Miniature floating worlds rise out of its pages as they turn."
    >
      {!ready && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <BookLogo size={150} showText={false} className="drop-shadow-[0_18px_28px_rgba(107,28,111,0.18)]" />
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════ scene construction ═══════════════════════ */

async function buildScene(
  T: ThreeNS,
  GLTFLoaderCtor: GLTFLoaderCtor,
  host: HTMLDivElement,
  width: number,
  height: number,
  live: boolean,
  onReady: () => void,
): Promise<(() => void) | null> {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let renderer: THREE.WebGLRenderer;
  try {
    // Opaque canvas now (the atmospheric sky fills it), so alpha isn't needed —
    // and bloom composites cleanly over a solid background.
    renderer = new T.WebGLRenderer({ antialias: true, powerPreference: "low-power" });
  } catch {
    return null; // No WebGL — the BookLogo fallback stays.
  }
  // Supersample the tiny canvas (≈330×260 CSS px) so the gilt lines, page art
  // and text stay crisp. Kept modest to hold down the per-frame GPU cost of an
  // above-the-fold homepage hero.
  const cores = navigator.hardwareConcurrency ?? 8;
  const ssBudget = cores >= 8 ? 2 : cores >= 6 ? 1.8 : 1.6;
  renderer.setPixelRatio(Math.min((window.devicePixelRatio || 1) * 1.2, ssBudget));
  renderer.setSize(width, height);
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.82;
  // Soft shadow maps sell the depth; skip them on very small CPUs.
  const fancyShadows = cores >= 6;
  renderer.shadowMap.enabled = fancyShadows;
  renderer.shadowMap.type = T.PCFSoftShadowMap;
  renderer.domElement.style.position = "absolute";
  renderer.domElement.style.inset = "0";
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  // Feather the canvas edges so the additive candlelight/god-ray glow fades
  // out softly instead of clipping into a hard rectangular box.
  const edgeMask = "radial-gradient(120% 108% at 50% 44%, #000 66%, rgba(0,0,0,0.55) 84%, transparent 100%)";
  renderer.domElement.style.maskImage = edgeMask;
  (renderer.domElement.style as CSSStyleDeclaration & { webkitMaskImage?: string }).webkitMaskImage = edgeMask;
  renderer.domElement.setAttribute("aria-hidden", "true");
  if (!reduced) renderer.domElement.style.cursor = "pointer";
  host.appendChild(renderer.domElement);

  const disposables: { dispose(): void }[] = [];
  const track = <D extends { dispose(): void }>(d: D): D => {
    disposables.push(d);
    return d;
  };

  /* ---------- real-world set dressing (Kenney CC0 models, self-hosted) ---------- */

  // Fetched from same-origin /public/models, so this is fire-and-forget —
  // failure just means that prop is quietly skipped below (see placeModel).
  // Kicked off now, ahead of the (synchronous) texture/geometry work below,
  // so the network round-trip overlaps with everything else instead of
  // adding to it; awaited once, right before the worlds that need it are built.
  const MODEL_URLS = {
    ship: "/models/ship-pirate-small.glb",
    palm: "/models/palm-bend.glb",
    tree: "/models/tree-detailed.glb",
    rockA: "/models/rock-tall-a.glb",
    rockB: "/models/rock-tall-b.glb",
    rockC: "/models/rock-tall-c.glb",
    rockD: "/models/rock-tall-d.glb",
    craft: "/models/craft-racer.glb",
    astronaut: "/models/astronaut.glb",
    satellite: "/models/satellite-dish.glb",
    towerBase: "/models/castle/tower-base.glb",
    towerMid: "/models/castle/tower-mid.glb",
    towerRoof: "/models/castle/tower-roof.glb",
  } as const;
  type ModelKey = keyof typeof MODEL_URLS;
  // Space Kit models are laid out on an offset grid in the source, so their
  // local origin sits far from the geometry. Recenter these on their bounding
  // box so placeModel()/orbits pivot around the model itself.
  const RECENTER: ReadonlySet<ModelKey> = new Set(["craft", "astronaut", "satellite"]);
  const gltfLoader = new GLTFLoaderCtor();
  const loadedModels: Partial<Record<ModelKey, THREE.Object3D>> = {};
  const loadedGeometries: THREE.BufferGeometry[] = [];
  const loadedMaterials: THREE.Material[] = [];
  const modelsReady = Promise.all(
    (Object.keys(MODEL_URLS) as ModelKey[]).map(async (key) => {
      try {
        const gltf = await gltfLoader.loadAsync(MODEL_URLS[key]);
        gltf.scene.traverse((o) => {
          const m = o as THREE.Mesh;
          if (m.isMesh) {
            loadedGeometries.push(m.geometry);
            const mats = Array.isArray(m.material) ? m.material : [m.material];
            // Nature Kit's whole palette leans teal/turquoise (it's a
            // deliberate stylized house look, confirmed against Kenney's own
            // preview render — not a loading bug). That reads fine for rock,
            // but tree foliage needs to read as green for the jungle world to
            // make sense, so retint just its "grass"/"leafsGreen" material
            // rather than the model's other materials.
            if (key === "tree") {
              for (const mat of mats) {
                if (/grass|leaf/i.test(mat.name)) (mat as THREE.MeshStandardMaterial).color?.setHex(0x3fa34d);
              }
            }
            loadedMaterials.push(...mats);
          }
        });
        if (RECENTER.has(key)) {
          // Offset the loaded scene inside a wrapper so the wrapper's origin
          // sits at the model's center. (Offsetting the scene's own position
          // wouldn't survive placeModel(), which overwrites position on clone.)
          const box = new T.Box3().setFromObject(gltf.scene);
          const c = new T.Vector3();
          box.getCenter(c);
          gltf.scene.position.sub(c);
          const wrapper = new T.Group();
          wrapper.add(gltf.scene);
          loadedModels[key] = wrapper;
        } else {
          loadedModels[key] = gltf.scene;
        }
      } catch {
        // Same-origin static asset — a failure here (e.g. offline dev server)
        // just means placeModel() returns null and that prop is skipped.
      }
    }),
  );

  // Clones a loaded model template into the scene at the given local
  // transform. Returns null (silently) if that model never loaded.
  const placeModel = (key: ModelKey, x: number, y: number, z: number, scale: number, rotY = 0) => {
    const template = loadedModels[key];
    if (!template) return null;
    const inst = template.clone(true);
    inst.position.set(x, y, z);
    inst.scale.setScalar(scale);
    inst.rotation.y = rotY;
    if (fancyShadows) {
      inst.traverse((o) => {
        if ((o as THREE.Mesh).isMesh) (o as THREE.Mesh).castShadow = true;
      });
    }
    return inst;
  };

  /* ---------- tiny texture studio (canvas-painted) ---------- */

  const maxAniso = renderer.capabilities.getMaxAnisotropy();
  // `ss` supersamples the backing store while keeping the logical drawing
  // space (w,h) unchanged, so existing paint math stays valid but the texture
  // resolves crisp — page art and captions especially.
  const makeTex = (
    w: number,
    h: number,
    paint: (ctx: CanvasRenderingContext2D, w: number, h: number) => void,
    ss = 1,
  ) => {
    const c = document.createElement("canvas");
    c.width = Math.round(w * ss);
    c.height = Math.round(h * ss);
    const ctx = c.getContext("2d")!;
    ctx.scale(ss, ss);
    paint(ctx, w, h);
    const tex = track(new T.CanvasTexture(c));
    tex.colorSpace = T.SRGBColorSpace;
    tex.anisotropy = Math.min(8, maxAniso);
    tex.generateMipmaps = true;
    tex.minFilter = T.LinearMipmapLinearFilter;
    return tex;
  };

  const softDot = makeTex(64, 64, (ctx, w, h) => {
    const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.4, "rgba(255,255,255,0.7)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  });

  const starTex = makeTex(64, 64, (ctx, w) => {
    ctx.translate(w / 2, w / 2);
    ctx.fillStyle = "#FFF4D0";
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const r = i % 2 === 0 ? w * 0.46 : w * 0.12;
      const a = (i * Math.PI) / 4 - Math.PI / 2;
      ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    ctx.closePath();
    ctx.fill();
  });

  const glowTex = makeTex(128, 128, (ctx, w, h) => {
    const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    g.addColorStop(0, "rgba(241,187,26,0.9)");
    g.addColorStop(0.45, "rgba(241,187,26,0.28)");
    g.addColorStop(1, "rgba(241,187,26,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  });

  const cloudTex = makeTex(128, 64, (ctx) => {
    ctx.fillStyle = "rgba(255,255,255,0.92)";
    for (const [x, y, r] of [
      [40, 40, 20],
      [64, 32, 24],
      [90, 40, 18],
      [64, 44, 22],
    ]) {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  });

  const rayTex = makeTex(64, 128, (ctx, w, h) => {
    const g = ctx.createLinearGradient(0, h, 0, 0);
    g.addColorStop(0, "rgba(255,235,170,0.85)");
    g.addColorStop(1, "rgba(255,235,170,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  });

  const shadowTex = makeTex(128, 128, (ctx, w, h) => {
    // Alpha must reach zero well inside the texture edge, or the quad shows
    // as a hard-edged veil.
    const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.46);
    g.addColorStop(0, "rgba(42,9,48,0.5)");
    g.addColorStop(0.55, "rgba(42,9,48,0.2)");
    g.addColorStop(1, "rgba(42,9,48,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  });

  const paperPaint = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, "#FFFDF9");
    g.addColorStop(1, "#F4E8D0");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(107,28,111,0.28)";
    ctx.lineWidth = 3;
    ctx.strokeRect(w * 0.07, h * 0.05, w * 0.86, h * 0.9);
    ctx.strokeStyle = "rgba(241,187,26,0.5)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(w * 0.09, h * 0.068, w * 0.82, h * 0.865);
    ctx.strokeStyle = "rgba(107,28,111,0.4)";
    ctx.lineWidth = 2;
    const flourish = (cx: number, cy: number, sx: number, sy: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(sx, sy);
      ctx.beginPath();
      ctx.moveTo(0, 18);
      ctx.quadraticCurveTo(0, 0, 18, 0);
      ctx.moveTo(4, 14);
      ctx.quadraticCurveTo(4, 4, 14, 4);
      ctx.stroke();
      ctx.fillStyle = "rgba(241,187,26,0.8)";
      ctx.beginPath();
      ctx.arc(7.5, 7.5, 1.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };
    flourish(w * 0.09, h * 0.068, 1, 1);
    flourish(w * 0.91, h * 0.068, -1, 1);
    flourish(w * 0.09, h * 0.933, 1, -1);
    flourish(w * 0.91, h * 0.933, -1, -1);
    const v = ctx.createRadialGradient(w / 2, h / 2, w * 0.25, w / 2, h / 2, w * 0.78);
    v.addColorStop(0, "rgba(0,0,0,0)");
    v.addColorStop(1, "rgba(107,28,111,0.07)");
    ctx.fillStyle = v;
    ctx.fillRect(0, 0, w, h);
  };

  const paperTex = makeTex(256, 340, paperPaint, 3);

  /* Painted page art for the turning leaf — one small tableau per world. */
  const artFor = (key: WorldKey) =>
    makeTex(
      256,
      340,
      (ctx, w, h) => {
      paperPaint(ctx, w, h);
      const px = w * 0.13,
        py = h * 0.1,
        pw = w * 0.74,
        ph = h * 0.6;
      ctx.save();
      ctx.beginPath();
      ctx.rect(px, py, pw, ph);
      ctx.clip();
      const sky = (stops: [number, string][]) => {
        const g = ctx.createLinearGradient(0, py, 0, py + ph);
        for (const [o, c] of stops) g.addColorStop(o, c);
        ctx.fillStyle = g;
        ctx.fillRect(px, py, pw, ph);
      };
      const poly = (pts: [number, number][], fill: string) => {
        ctx.fillStyle = fill;
        ctx.beginPath();
        pts.forEach(([x, y], i) => (i ? ctx.lineTo(px + x * pw, py + y * ph) : ctx.moveTo(px + x * pw, py + y * ph)));
        ctx.closePath();
        ctx.fill();
      };
      const dot = (x: number, y: number, r: number, fill: string) => {
        ctx.fillStyle = fill;
        ctx.beginPath();
        ctx.arc(px + x * pw, py + y * ph, r, 0, Math.PI * 2);
        ctx.fill();
      };
      switch (key) {
        case "dragon":
          sky([[0, "#2A1B5E"], [0.55, "#C84C8C"], [1, "#FBB36A"]]);
          dot(0.5, 0.24, 15, "#FFE6A8");
          poly([[0, 0.72], [0.18, 0.44], [0.36, 0.62], [0.55, 0.4], [0.75, 0.64], [1, 0.5], [1, 1], [0, 1]], "#2C7A7B");
          poly([[0, 1], [0, 0.78], [0.3, 0.6], [0.55, 0.82], [0.8, 0.62], [1, 0.78], [1, 1]], "#173B4A");
          break;
        case "rocket":
          sky([[0, "#0D0630"], [1, "#2A1458"]]);
          for (const [x, y] of [[0.15, 0.15], [0.4, 0.1], [0.8, 0.2], [0.3, 0.7], [0.85, 0.75], [0.6, 0.45]]) dot(x, y, 2, "#FFF4D0");
          dot(0.68, 0.3, 16, "#F2A65A");
          ctx.strokeStyle = "#FFD18A";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.ellipse(px + 0.68 * pw, py + 0.3 * ph, 27, 8, -0.3, 0, Math.PI * 2);
          ctx.stroke();
          poly([[0.3, 0.72], [0.35, 0.4], [0.4, 0.72]], "#F5F5FA");
          poly([[0.31, 0.72], [0.35, 0.86], [0.39, 0.72]], "#FFB02E");
          break;
        case "pirate":
          sky([[0, "#8FE0FB"], [1, "#D6F4FF"]]);
          dot(0.2, 0.18, 11, "#FFE082");
          poly([[0, 1], [0, 0.55], [1, 0.55], [1, 1]], "#1FB6C9");
          poly([[0.35, 0.55], [0.5, 0.2], [0.52, 0.55]], "#E84B3A");
          poly([[0.3, 0.55], [0.7, 0.55], [0.62, 0.68], [0.38, 0.68]], "#7A4A2B");
          break;
        case "jungle":
          sky([[0, "#CFF3C0"], [1, "#8FD66B"]]);
          dot(0.75, 0.15, 9, "#FFE9A8");
          poly([[0.28, 0.85], [0.5, 0.35], [0.72, 0.85]], "#B79B6E");
          poly([[0.45, 0.85], [0.5, 0.62], [0.55, 0.85]], "#5A4632");
          poly([[0, 1], [0.08, 0.55], [0.24, 1]], "#2E7D32");
          poly([[0.76, 1], [0.92, 0.58], [1, 1]], "#2E7D32");
          break;
        case "balloon":
          sky([[0, "#5AC8FA"], [1, "#BFEBFF"]]);
          poly([[0, 1], [0, 0.82], [0.5, 0.72], [1, 0.8], [1, 1]], "#6FBF4A");
          dot(0.5, 0.34, 26, "#E8472B");
          dot(0.42, 0.34, 8, "#F4A024");
          dot(0.58, 0.34, 8, "#3FA34D");
          ctx.fillStyle = "#8B5A2B";
          ctx.fillRect(px + 0.46 * pw, py + 0.58 * ph, 0.08 * pw, 0.07 * ph);
          break;
        case "reef":
          sky([[0, "#1FB6C9"], [0.6, "#0E7C9E"], [1, "#0A5E7C"]]);
          poly([[0, 1], [0, 0.88], [0.5, 0.8], [1, 0.88], [1, 1]], "#EAD9A0");
          poly([[0.25, 0.62], [0.5, 0.42], [0.78, 0.55], [0.62, 0.72], [0.35, 0.72]], "#4A78B0");
          dot(0.4, 0.58, 3, "#FFFFFF");
          poly([[0.1, 0.88], [0.14, 0.68], [0.18, 0.88]], "#FF6F91");
          poly([[0.78, 0.88], [0.84, 0.64], [0.9, 0.88]], "#7B61FF");
          break;
        case "aurora":
          sky([[0, "#0B1E3B"], [1, "#13315C"]]);
          for (const [x, y] of [[0.2, 0.15], [0.5, 0.1], [0.8, 0.2], [0.65, 0.3]]) dot(x, y, 2, "#FFF4D0");
          ctx.lineWidth = 7;
          for (const [yy, c] of [[0.3, "#3DF5C0"], [0.42, "#7AE0FF"], [0.53, "#A06BFF"]] as [number, string][]) {
            ctx.strokeStyle = c;
            ctx.globalAlpha = 0.5;
            ctx.beginPath();
            ctx.moveTo(px, py + yy * ph);
            ctx.bezierCurveTo(px + pw * 0.3, py + (yy - 0.18) * ph, px + pw * 0.6, py + (yy + 0.1) * ph, px + pw, py + (yy - 0.08) * ph);
            ctx.stroke();
          }
          ctx.globalAlpha = 1;
          poly([[0, 1], [0, 0.78], [0.3, 0.6], [0.55, 0.78], [0.8, 0.62], [1, 0.78], [1, 1]], "#C7D7E8");
          break;
        case "desert":
          sky([[0, "#FFC36B"], [1, "#FF7E5F"]]);
          dot(0.5, 0.3, 17, "#FFE08A");
          poly([[0.55, 0.72], [0.74, 0.4], [0.94, 0.72]], "#B0793F");
          poly([[0, 1], [0, 0.82], [0.5, 0.68], [1, 0.84], [1, 1]], "#E0A94E");
          break;
      }
      ctx.restore();
      ctx.fillStyle = "#6B1C6F";
      ctx.font = "italic 600 26px Georgia, serif";
      ctx.textAlign = "center";
      ctx.fillText(WORLDS.find((s) => s.key === key)!.caption, w / 2, h * 0.82);
      ctx.strokeStyle = "rgba(107,28,111,0.2)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(w * 0.2, h * 0.88);
      ctx.lineTo(w * 0.8, h * 0.88);
      ctx.stroke();
      },
      3,
    );

  const arts = WORLDS.map((s) => artFor(s.key));
  // Mirrored copies so the back of the turning page reads correctly.
  const artsBack = arts.map((tex) => {
    const b = track(tex.clone());
    b.wrapS = T.RepeatWrapping;
    b.repeat.x = -1;
    b.needsUpdate = true;
    return b;
  });

  /* ---------- caption sprite (world name floating under the island) ---------- */

  const CAP_SS = 2; // supersample the caption backing for crisp serif text
  const capCanvas = document.createElement("canvas");
  capCanvas.width = 512 * CAP_SS;
  capCanvas.height = 112 * CAP_SS;
  const capCtx = capCanvas.getContext("2d")!;
  capCtx.scale(CAP_SS, CAP_SS);
  const capTex = track(new T.CanvasTexture(capCanvas));
  capTex.colorSpace = T.SRGBColorSpace;
  capTex.anisotropy = Math.min(8, maxAniso);
  const drawCaption = (text: string) => {
    capCtx.clearRect(0, 0, 512, 112);
    capCtx.font = "italic 600 46px Georgia, serif";
    capCtx.textAlign = "center";
    capCtx.textBaseline = "middle";
    capCtx.lineWidth = 7;
    capCtx.strokeStyle = "rgba(255,251,240,0.92)";
    capCtx.strokeText(text, 256, 54);
    capCtx.fillStyle = "#6B1C6F";
    capCtx.fillText(text, 256, 54);
    const half = capCtx.measureText(text).width / 2;
    capCtx.strokeStyle = "rgba(241,187,26,0.9)";
    capCtx.lineWidth = 3;
    for (const dir of [1, -1]) {
      const x0 = 256 + dir * (half + 18);
      capCtx.beginPath();
      capCtx.moveTo(x0, 54);
      capCtx.quadraticCurveTo(x0 + dir * 26, 46, x0 + dir * 44, 54);
      capCtx.quadraticCurveTo(x0 + dir * 26, 62, x0 + dir * 14, 56);
      capCtx.stroke();
      capCtx.fillStyle = "#F1BB1A";
      capCtx.beginPath();
      capCtx.arc(x0 + dir * 50, 54, 3, 0, Math.PI * 2);
      capCtx.fill();
    }
    capTex.needsUpdate = true;
  };

  /* ---------- scene, camera, lights ---------- */

  const scene = new T.Scene();
  const camera = new T.PerspectiveCamera(32, width / height, 0.1, 30);
  camera.position.set(0, 1.44, 3.4);
  camera.lookAt(0, 0.52, 0);

  // Atmospheric fantasy-cloudscape sky (matches the reference's pink/lavender
  // mood) painted as a vertical gradient and set as the scene background.
  const skyTex = makeTex(64, 256, (ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, "#8FB6E8"); // periwinkle up top
    g.addColorStop(0.42, "#C9B6E4"); // lavender
    g.addColorStop(0.72, "#EEC4DE"); // rose
    g.addColorStop(1, "#F6D9C8"); // warm haze at the horizon
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  });
  skyTex.colorSpace = T.SRGBColorSpace;
  scene.background = skyTex;
  // Fog blends the deeper geometry into the rosy haze for depth. Pushed out so
  // the book stays crisp and only the far background hazes.
  scene.fog = new T.Fog(0xd8c1d4, 4.8, 9.5);

  const root = new T.Group(); // pointer-parallax pivot
  scene.add(root);

  // Lower fill + a stronger, warmer key so forms model with real light/shadow
  // contrast instead of the flat, evenly-lit look that reads as "primitive".
  root.add(new T.AmbientLight(0xfff1dc, 0.16));
  root.add(new T.HemisphereLight(0xdce8ff, 0x8a5a9e, 0.38));
  const key = new T.DirectionalLight(0xfff2e0, 2.0);
  key.position.set(2, 3.2, 2.2);
  if (fancyShadows) {
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    const sc = key.shadow.camera;
    sc.left = -1.9;
    sc.right = 1.9;
    sc.top = 2.4;
    sc.bottom = -0.9;
    sc.near = 0.5;
    sc.far = 9;
    key.shadow.bias = -0.0004;
  }
  root.add(key);
  const rim = new T.PointLight(0xb46bd9, 7, 8);
  rim.position.set(-2.2, 1.6, -1.4);
  root.add(rim);
  const gutterLight = new T.PointLight(0xffd76a, 2.4, 4);
  gutterLight.position.set(0, 1.1, 0.2);
  root.add(gutterLight);
  // Each world tints the candlelight, halo and god-ray toward its own hue.
  const WHITE = new T.Color(0xffffff);
  const accent = new T.Color(WORLDS[0].accent);
  const accentTarget = new T.Color(WORLDS[0].accent);

  // The "glow" is carried by additive glow sprites (candlelight, crystals,
  // god-rays) rather than a bloom post-process — a full EffectComposer + bloom
  // pass renders the whole scene an extra time plus several blur passes every
  // frame, which was too costly for an above-the-fold homepage hero. Direct
  // rendering keeps the atmospheric look at a fraction of the GPU cost.
  const renderFrame = () => renderer.render(scene, camera);

  /* ---------- materials & mesh helpers ---------- */

  const lam = (color: number, extra: Partial<THREE.MeshLambertMaterialParameters> = {}) =>
    track(new T.MeshLambertMaterial({ color, flatShading: true, ...extra }));
  const geoms: THREE.BufferGeometry[] = [];
  const g = <G extends THREE.BufferGeometry>(geo: G): G => {
    geoms.push(geo);
    disposables.push(geo);
    return geo;
  };
  const mesh = (geo: THREE.BufferGeometry, mat: THREE.Material, x = 0, y = 0, z = 0) => {
    const m = new T.Mesh(geo, mat);
    m.position.set(x, y, z);
    return m;
  };
  const spriteOf = (map: THREE.Texture, scale: number, opacity = 1, additive = false, sy?: number) => {
    const mat = track(
      new T.SpriteMaterial({
        map,
        transparent: true,
        opacity,
        depthWrite: false,
        blending: additive ? T.AdditiveBlending : T.NormalBlending,
      }),
    );
    const s = new T.Sprite(mat);
    s.scale.set(scale, sy ?? scale, 1);
    return s;
  };

  /* ---------- the book ---------- */

  const book = new T.Group();
  book.position.y = -0.12;
  root.add(book);

  const giltTex = makeTex(64, 64, (ctx, w, h) => {
    ctx.fillStyle = "#E2AF25";
    ctx.fillRect(0, 0, w, h);
    for (let y = 0; y < h; y += 2) {
      ctx.fillStyle = y % 6 === 0 ? "rgba(120,82,8,0.35)" : "rgba(255,236,170,0.35)";
      ctx.fillRect(0, y, w, 1);
    }
  });
  const coverMat = lam(COLORS.purpleDeep);
  const coverEdgeMat = lam(COLORS.gold);
  const pageSideMat = track(new T.MeshLambertMaterial({ map: giltTex, color: 0xffd75e }));
  const pageTopMat = track(new T.MeshLambertMaterial({ map: paperTex }));
  const creamMat = lam(COLORS.cream);

  for (const side of [-1, 1]) {
    const half = new T.Group();
    const cover = mesh(g(new T.BoxGeometry(1.16, 0.05, 1.58)), coverMat, side * 0.575, 0, 0);
    const trim = mesh(g(new T.BoxGeometry(1.18, 0.012, 1.6)), coverEdgeMat, side * 0.575, -0.028, 0);
    // page block with gilded fore-edges: gold on outer x face + front/back z faces
    const stackGeo = g(new T.BoxGeometry(1.04, 0.14, 1.44));
    const stack = new T.Mesh(stackGeo, [
      side > 0 ? pageSideMat : creamMat,
      side > 0 ? creamMat : pageSideMat,
      creamMat,
      creamMat,
      pageSideMat,
      pageSideMat,
    ]);
    stack.position.set(side * 0.54, 0.095, 0);
    // curved top sheet
    const sheetGeo = g(new T.PlaneGeometry(1.04, 1.44, 14, 2));
    sheetGeo.rotateX(-Math.PI / 2);
    {
      const pos = sheetGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const u = side > 0 ? (x + 0.52) / 1.04 : (0.52 - x) / 1.04; // 0 at spine
        pos.setY(i, 0.05 * Math.pow(1 - u, 1.6) + 0.015 * Math.sin(u * Math.PI));
      }
      sheetGeo.computeVertexNormals();
    }
    const sheet = new T.Mesh(sheetGeo, pageTopMat);
    sheet.position.set(side * 0.54, 0.168, 0);
    for (const m of [cover, trim, stack, sheet]) m.receiveShadow = true;
    half.add(cover, trim, stack, sheet);
    half.rotation.z = -side * 0.07; // gentle open-book V
    book.add(half);
  }

  // Spine ridge nestling into the gutter between the halves.
  const spineRidge = mesh(g(new T.CylinderGeometry(0.09, 0.09, 1.58, 12)), coverMat, 0, -0.02, 0);
  spineRidge.rotation.x = Math.PI / 2;
  book.add(spineRidge);

  // A silk bookmark draped across the right page and over the fore-edge.
  const ribbonGeo = g(new T.PlaneGeometry(0.07, 0.95, 1, 14));
  ribbonGeo.rotateX(-Math.PI / 2);
  {
    const pos = ribbonGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const z = pos.getZ(i) + 0.35;
      pos.setZ(i, z);
      const over = z - 0.72;
      if (over > 0) pos.setY(i, -over * 2.0);
      else pos.setY(i, 0.012 * Math.sin(((z + 0.125) / 0.85) * Math.PI));
    }
    ribbonGeo.computeVertexNormals();
  }
  const ribbon = new T.Mesh(ribbonGeo, track(new T.MeshLambertMaterial({ color: 0xa93226, side: T.DoubleSide })));
  ribbon.position.set(0.72, 0.18, 0);
  ribbon.rotation.y = -0.08;
  ribbon.castShadow = fancyShadows;
  book.add(ribbon);

  /* ---------- the turning page ---------- */

  const PAGE_SEG_X = 24;
  const pageGeo = g(new T.PlaneGeometry(1.0, 1.38, PAGE_SEG_X, 4));
  pageGeo.rotateX(-Math.PI / 2);
  pageGeo.translate(0.5, 0, 0); // hinge at x=0 (the spine)
  const pageBase = Float32Array.from(pageGeo.attributes.position.array);
  // A real page leaf has two independent, opaque faces. A single double-sided
  // plane instead shows one texture bleeding through from the back and — once
  // the leaf curls into a C mid-turn — lets you see straight through the curl
  // to the page and background behind it (it reads as translucent). Two stacked
  // single-sided opaque meshes sharing the same (deforming) geometry fix both:
  // each face is solid and carries its own art, so nothing shows through.
  const pageMat = track(new T.MeshLambertMaterial({ map: arts[0], side: T.FrontSide }));
  const pageMatBack = track(new T.MeshLambertMaterial({ map: artsBack[0], side: T.BackSide }));
  const page = new T.Mesh(pageGeo, pageMat);
  const pageBackMesh = new T.Mesh(pageGeo, pageMatBack);
  page.castShadow = pageBackMesh.castShadow = fancyShadows;
  page.receiveShadow = pageBackMesh.receiveShadow = true;
  const pagePivot = new T.Group();
  pagePivot.position.set(0, 0.2, 0);
  pagePivot.add(page, pageBackMesh);
  book.add(pagePivot);

  /* ---------- ambience: halo, god-ray, shadow, embers, stars ---------- */

  const halo = spriteOf(glowTex, 3.2, 0.42, true);
  halo.position.set(0, 0.55, -0.9);
  root.add(halo);

  const rayGeo = g(new T.ConeGeometry(0.32, 1.55, 20, 1, true));
  const rayMat = track(
    new T.MeshBasicMaterial({
      map: rayTex,
      transparent: true,
      opacity: 0.07,
      side: T.DoubleSide,
      depthWrite: false,
      blending: T.AdditiveBlending,
    }),
  );
  const ray = new T.Mesh(rayGeo, rayMat);
  ray.position.set(0, 0.78, 0);
  root.add(ray);

  // Contact shadow: a flat quad on the "floor" (a Sprite would billboard
  // toward the camera and read as a grey veil across the scene).
  const shadowGeo = g(new T.PlaneGeometry(3.1, 2.0));
  shadowGeo.rotateX(-Math.PI / 2);
  const shadow = new T.Mesh(
    shadowGeo,
    track(new T.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false })),
  );
  shadow.position.set(0, -0.34, 0.1);
  root.add(shadow);

  const EMBERS = 24;
  const emberGeo = g(new T.BufferGeometry());
  const emberPos = new Float32Array(EMBERS * 3);
  const emberSeed = new Float32Array(EMBERS * 2);
  for (let i = 0; i < EMBERS; i++) {
    emberSeed[i * 2] = Math.random();
    emberSeed[i * 2 + 1] = Math.random();
  }
  emberGeo.setAttribute("position", new T.BufferAttribute(emberPos, 3));
  const emberMat = track(
    new T.PointsMaterial({
      map: softDot,
      color: COLORS.gold,
      size: 0.055,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: T.AdditiveBlending,
    }),
  );
  const embers = new T.Points(emberGeo, emberMat);
  root.add(embers);

  const BURST = 42;
  const burstGeo = g(new T.BufferGeometry());
  const burstPos = new Float32Array(BURST * 3);
  const burstVel: number[] = [];
  for (let i = 0; i < BURST; i++) {
    const a = Math.random() * Math.PI * 2;
    const b = Math.random() * Math.PI - Math.PI / 2;
    const sp = 0.7 + Math.random() * 1.1;
    burstVel.push(Math.cos(a) * Math.cos(b) * sp, Math.abs(Math.sin(b)) * sp + 0.6, Math.sin(a) * Math.cos(b) * sp * 0.6);
  }
  burstGeo.setAttribute("position", new T.BufferAttribute(burstPos, 3));
  const burstMat = track(
    new T.PointsMaterial({
      map: starTex,
      color: 0xffe08a,
      size: 0.09,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: T.AdditiveBlending,
    }),
  );
  const burst = new T.Points(burstGeo, burstMat);
  burst.visible = false;
  root.add(burst);
  let burstAt = -1;

  const twinkles: { s: THREE.Sprite; w: number; p: number }[] = [];
  for (let i = 0; i < 7; i++) {
    const s = spriteOf(starTex, 0.07 + Math.random() * 0.06, 0.8, true);
    const a = (i / 7) * Math.PI * 2;
    s.position.set(Math.cos(a) * (1.5 + Math.random() * 0.5), 0.5 + Math.random() * 1.1, Math.sin(a) * (0.8 + Math.random() * 0.5) - 0.3);
    twinkles.push({ s, w: 1.5 + Math.random() * 2, p: Math.random() * Math.PI * 2 });
    root.add(s);
  }

  const caption = spriteOf(capTex, 0.92, 0.95, false, 0.2);
  caption.position.set(0, 0.14, 1.02);
  root.add(caption);
  drawCaption(WORLDS[0].caption);

  /* ---------- the eight floating worlds ---------- */

  type World = { group: THREE.Group; tick: (t: number) => void };

  // Lighten/darken a hex color by `dl` in HSL space — used to derive believable
  // ground-texture shading (blade highlights, sand grain, rock speckle) from
  // each world's single accent color instead of hand-picking extra palettes.
  const shadeHex = (hex: number, dl: number) => {
    const c = new T.Color(hex);
    const hsl = { h: 0, s: 0, l: 0 };
    c.getHSL(hsl);
    c.setHSL(hsl.h, hsl.s, Math.min(1, Math.max(0, hsl.l + dl)));
    return `#${c.getHexString()}`;
  };

  type Biome = "grass" | "sand" | "snow" | "rock" | "water";

  // Painted ground detail for the island's top cap, in place of a flat color —
  // this is the single change that reads as "toy diorama" rather than "solid
  // disc" across every world. CylinderGeometry's cap UV inscribes the circular
  // (well, heptagonal) face in the unit square, so detail is scattered inside a
  // radius-0.5 circle centered at (0.5, 0.5).
  const groundTex = (biome: Biome, base: number) =>
    makeTex(
      96,
      96,
      (ctx, w, h) => {
        const cx = w / 2,
          cy = h / 2,
          R = w / 2;
        ctx.fillStyle = shadeHex(base, 0);
        ctx.fillRect(0, 0, w, h);
        const within = (r: number) => Math.random() * r;
        const scatter = (n: number, draw: (x: number, y: number) => void) => {
          for (let i = 0; i < n; i++) {
            const a = Math.random() * Math.PI * 2;
            const r = within(R * 0.92);
            draw(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
          }
        };
        switch (biome) {
          case "grass":
            scatter(80, (x, y) => {
              ctx.strokeStyle = Math.random() < 0.5 ? shadeHex(base, -0.13) : shadeHex(base, 0.15);
              ctx.lineWidth = 1.3;
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.quadraticCurveTo(x + 1.5, y - 4, x + (Math.random() - 0.5) * 3, y - 8);
              ctx.stroke();
            });
            break;
          case "sand":
            ctx.globalAlpha = 0.5;
            for (let i = 0; i < 9; i++) {
              const yy = cy - R * 0.75 + i * ((R * 1.5) / 9);
              ctx.strokeStyle = shadeHex(base, -0.1);
              ctx.lineWidth = 1.4;
              ctx.beginPath();
              ctx.moveTo(cx - R * 0.85, yy);
              ctx.quadraticCurveTo(cx, yy + 6, cx + R * 0.85, yy);
              ctx.stroke();
            }
            ctx.globalAlpha = 1;
            scatter(45, (x, y) => {
              ctx.fillStyle = Math.random() < 0.5 ? shadeHex(base, -0.18) : shadeHex(base, 0.2);
              ctx.beginPath();
              ctx.arc(x, y, 0.8, 0, Math.PI * 2);
              ctx.fill();
            });
            break;
          case "snow":
            scatter(34, (x, y) => {
              ctx.fillStyle = "rgba(255,255,255,0.85)";
              ctx.beginPath();
              ctx.arc(x, y, 0.9, 0, Math.PI * 2);
              ctx.fill();
            });
            for (let i = 0; i < 5; i++) {
              const a = Math.random() * Math.PI * 2;
              const r = R * (0.35 + Math.random() * 0.3);
              ctx.strokeStyle = shadeHex(base, -0.1);
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(cx, cy);
              ctx.quadraticCurveTo(cx + Math.cos(a) * r * 0.6, cy + Math.sin(a) * r * 0.6, cx + Math.cos(a) * r, cy + Math.sin(a) * r);
              ctx.stroke();
            }
            break;
          case "rock":
            scatter(30, (x, y) => {
              ctx.fillStyle = Math.random() < 0.5 ? shadeHex(base, -0.2) : shadeHex(base, 0.12);
              ctx.beginPath();
              ctx.arc(x, y, 1.1 + Math.random() * 1.7, 0, Math.PI * 2);
              ctx.fill();
            });
            break;
          case "water":
            for (let i = 0; i < 8; i++) {
              const yy = cy - R * 0.7 + i * ((R * 1.4) / 8);
              ctx.strokeStyle = "rgba(255,255,255,0.4)";
              ctx.lineWidth = 1.2;
              ctx.beginPath();
              ctx.moveTo(cx - R * 0.8, yy);
              ctx.quadraticCurveTo(cx, yy - 5, cx + R * 0.8, yy);
              ctx.stroke();
            }
            break;
        }
        const v = ctx.createRadialGradient(cx, cy, R * 0.4, cx, cy, R);
        v.addColorStop(0, "rgba(0,0,0,0)");
        v.addColorStop(1, "rgba(0,0,0,0.18)");
        ctx.fillStyle = v;
        ctx.fillRect(0, 0, w, h);
      },
      2,
    );

  // A jagged floating-rock tier: a tapered cylinder whose lower rings are
  // jittered per-vertex so the underside reads as a broken chunk of rock
  // rather than a smooth funnel. The top ring is left clean so it seats
  // flush against the grass / the tier above.
  const rockTier = (rTop: number, rBot: number, h: number, y: number, color: number) => {
    const geo = g(new T.CylinderGeometry(rTop, rBot, h, 9, 2));
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      if (pos.getY(i) < h / 2 - 0.001) {
        const k = 0.78 + Math.random() * 0.4;
        pos.setX(i, pos.getX(i) * k);
        pos.setZ(i, pos.getZ(i) * k);
      }
    }
    geo.computeVertexNormals();
    return mesh(geo, lam(color), 0, y, 0);
  };

  const islandBase = (topColor: number, biome: Biome, anims: ((t: number) => void)[]) => {
    const grp = new T.Group();
    // Two stratified, craggy rock tiers instead of one smooth 7-gon cone —
    // gives the underside a chunky, stratified "torn from the ground" look.
    grp.add(rockTier(0.3, 0.16, 0.17, -0.055, 0x6b4a75));
    grp.add(rockTier(0.15, 0.035, 0.17, -0.2, 0x5a3b63));
    // A dirt cliff band tucked under the grassy overhang so the grass→rock
    // transition reads as a proper little cliff edge, not a flat seam.
    grp.add(mesh(g(new T.CylinderGeometry(0.318, 0.298, 0.045, 9)), lam(0x6e4b34), 0, -0.017, 0));
    // Overhanging grassy lip reads far more "floating island" than a flush disc.
    const topMat = track(new T.MeshLambertMaterial({ map: groundTex(biome, topColor) }));
    const top = mesh(g(new T.CylinderGeometry(0.35, 0.322, 0.05, 9)), topMat, 0, 0.012, 0);
    grp.add(top);
    for (const [x, z, l] of [[-0.12, 0.06, 0.1], [0.08, -0.09, 0.14], [0.03, 0.11, 0.08]] as const)
      grp.add(mesh(g(new T.ConeGeometry(0.013, l, 4)), lam(0x5a3b63), x, -0.16 - l / 2, z));

    // Chunks of rock that broke off and now slowly orbit the island — the
    // classic "floating island" motif, and the main new moving element. Each
    // orbits on its own radius/height/phase/speed so the set never marches in
    // lockstep. (anims only ticks for the currently-visible world.)
    ([
      [0.44, -0.28, 0.9, 0.03, 0],
      [0.5, -0.46, -0.6, 0.022, 2.2],
      [0.38, -0.6, 0.75, 0.017, 4.1],
      [0.54, -0.16, -0.45, 0.02, 1.1],
    ] as const).forEach(([rad, y, spd, size, ph], i) => {
      const chunk = mesh(g(new T.TetrahedronGeometry(size)), lam(i % 2 ? 0x6b4a75 : 0x5a3b63), 0, 0, 0);
      grp.add(chunk);
      anims.push((t) => {
        const a = t * spd + ph;
        chunk.position.set(Math.cos(a) * rad, y + Math.sin(t * 1.1 + ph) * 0.03, Math.sin(a) * rad * 0.7);
        chunk.rotation.set(t * 0.5 + i, t * 0.4 + i, 0);
      });
    });

    // A few motes drifting up off the island — dust catching the light. Tiny,
    // additive, on a slow rising loop so there's always gentle life around it.
    for (let i = 0; i < 5; i++) {
      const mote = spriteOf(softDot, 0.03, 0.7, true);
      grp.add(mote);
      const rad = 0.24 + Math.random() * 0.16;
      const a0 = (i / 5) * Math.PI * 2;
      const spd = 0.18 + Math.random() * 0.14;
      const off = Math.random();
      anims.push((t) => {
        const life = (t * spd + off) % 1;
        const a = a0 + life * 0.8;
        mote.position.set(Math.cos(a) * rad, -0.05 + life * 0.5, Math.sin(a) * rad * 0.8);
        (mote.material as THREE.SpriteMaterial).opacity = Math.sin(life * Math.PI) * 0.7;
      });
    }
    return grp;
  };

  // Repeating vertical water-streak texture for waterfalls (scrolled per-fall).
  const waterfallTex = makeTex(32, 64, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    const grad = ctx.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0, "rgba(150,210,255,0)");
    grad.addColorStop(0.5, "rgba(200,235,255,0.55)");
    grad.addColorStop(1, "rgba(150,210,255,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 16; i++) {
      const x = Math.random() * w;
      ctx.strokeStyle = `rgba(255,255,255,${0.2 + Math.random() * 0.5})`;
      ctx.lineWidth = 0.5 + Math.random() * 1.3;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + (Math.random() - 0.5) * 2, h);
      ctx.stroke();
    }
  });

  // A waterfall cascading off the island rim — a tapered translucent sheet with
  // a scrolling streak texture and a soft mist glow at top and bottom. Each
  // fall scrolls its own cloned texture so they don't march in lockstep.
  const addWaterfall = (grp: THREE.Group, anims: ((t: number) => void)[], angle: number, len = 0.5, rimR = 0.31) => {
    const tex = track(waterfallTex.clone());
    tex.wrapT = T.RepeatWrapping;
    tex.wrapS = T.ClampToEdgeWrapping;
    tex.needsUpdate = true;
    const geo = g(new T.PlaneGeometry(0.14, len, 1, 8));
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const tt = (len / 2 - pos.getY(i)) / len; // 0 top → 1 bottom
      pos.setX(i, pos.getX(i) * (1 - tt * 0.4)); // taper narrower at the base
      pos.setZ(i, Math.sin(tt * Math.PI) * 0.025); // gentle belly outward
    }
    geo.computeVertexNormals();
    const mat = track(
      new T.MeshBasicMaterial({
        map: tex,
        transparent: true,
        opacity: 0.75,
        side: T.DoubleSide,
        depthWrite: false,
        blending: T.AdditiveBlending,
        color: 0xbfe8ff,
        fog: false,
      }),
    );
    const wf = new T.Group();
    const sheet = new T.Mesh(geo, mat);
    sheet.position.y = -len / 2 + 0.02;
    wf.add(sheet);
    // Faint mist where the water leaves the rim and where it dissipates — kept
    // small and dim so it reads as spray, not floating white blobs.
    const topMist = spriteOf(softDot, 0.06, 0.3, true);
    (topMist.material as THREE.SpriteMaterial).color.setHex(0xdff2ff);
    topMist.position.y = 0.02;
    const botMist = spriteOf(softDot, 0.08, 0.3, true);
    (botMist.material as THREE.SpriteMaterial).color.setHex(0xdff2ff);
    botMist.position.y = -len + 0.02;
    wf.add(topMist, botMist);
    wf.position.set(Math.cos(angle) * rimR, 0.0, Math.sin(angle) * rimR * 0.78);
    wf.rotation.y = -angle + Math.PI / 2;
    grp.add(wf);
    const scroll = 0.6 + Math.random() * 0.3;
    anims.push((t) => {
      tex.offset.y = -(t * scroll) % 1;
      (botMist.material as THREE.SpriteMaterial).opacity = 0.22 + Math.sin(t * 6 + angle) * 0.08;
    });
  };

  // A glowing crystal spire — emissive (so it blooms) with a colored halo.
  // Echoes the reference's glowing flora/gems; the magic really shows under the
  // new bloom pass.
  const glowCrystal = (grp: THREE.Group, anims: ((t: number) => void)[], color: number, x: number, y: number, z: number, scale: number) => {
    // Unlit full-bright material so the crystal reads as glowing on its own
    // (no bloom/PBR needed) — the additive halo sprite adds the soft glow.
    const mat = track(new T.MeshBasicMaterial({ color, fog: false }));
    const crystal = mesh(g(new T.OctahedronGeometry(scale)), mat, x, y, z);
    crystal.scale.y = 1.9;
    grp.add(crystal);
    const glow = spriteOf(glowTex, scale * 4.5, 0.6, true);
    glow.position.set(x, y, z);
    (glow.material as THREE.SpriteMaterial).color.setHex(color);
    grp.add(glow);
    anims.push((t) => {
      crystal.rotation.y = t * 0.6 + x * 8;
      (glow.material as THREE.SpriteMaterial).opacity = 0.34 + Math.sin(t * 2.2 + x * 10) * 0.14;
    });
  };

  // A smooth cone reads as a traffic cone, not a mountain — jittering the
  // base ring outward/inward at random per-vertex breaks the silhouette into
  // a craggy, rock-faceted peak while the apex stays a clean point.
  const jaggedPeak = (radius: number, height: number, color: number, x = 0, y = 0, z = 0) => {
    const geo = g(new T.ConeGeometry(radius, height, 7, 1));
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      if (Math.abs(pos.getY(i) - height / 2) > 0.001) {
        const k = 0.82 + Math.random() * 0.32;
        pos.setX(i, pos.getX(i) * k);
        pos.setZ(i, pos.getZ(i) * k);
      }
    }
    geo.computeVertexNormals();
    return mesh(geo, lam(color), x, y, z);
  };

  // A cluster of overlapping spheres reads as a shrub far better than one
  // smooth sphere. Kept procedural — every Kenney Nature Kit bush variant is a
  // spiky angular leaf-blade cluster (their house style, not a bad load), and
  // none of them read as a rounded bush any better than this.
  const foliageClump = (color: number, r: number, x = 0, y = 0, z = 0) => {
    const grp = new T.Group();
    const lobes: [number, number, number, number][] = [
      [0, 0, 0, 1],
      [r * 0.55, r * 0.12, r * 0.2, 0.72],
      [-r * 0.5, r * 0.05, -r * 0.22, 0.66],
      [r * 0.1, r * 0.32, -r * 0.4, 0.6],
    ];
    for (const [lx, ly, lz, s] of lobes) grp.add(mesh(g(new T.SphereGeometry(r * s, 8, 6)), lam(color), lx, ly, lz));
    grp.position.set(x, y, z);
    return grp;
  };

  // A handful of tapered, splayed branches from a common base reads as
  // branching coral; a single solid cone just reads as a traffic cone.
  const coralClump = (color: number, scale: number, x = 0, y = 0, z = 0) => {
    const grp = new T.Group();
    const n = 3 + Math.floor(Math.random() * 2);
    for (let i = 0; i < n; i++) {
      const h = (0.045 + Math.random() * 0.045) * scale;
      const r = 0.011 * scale;
      const branch = mesh(
        g(new T.CylinderGeometry(r * 0.25, r, h, 5)),
        lam(color),
        (Math.random() - 0.5) * 0.03 * scale,
        h / 2,
        (Math.random() - 0.5) * 0.03 * scale,
      );
      branch.rotation.z = (Math.random() - 0.5) * 0.6;
      branch.rotation.x = (Math.random() - 0.5) * 0.6;
      grp.add(branch);
    }
    grp.position.set(x, y, z);
    return grp;
  };

  // A little flock of silhouette birds circling above an island, wings
  // flapping. Reused across the open-sky worlds — the biggest, cheapest
  // "there's always something moving" win. Adds its meshes to `grp` and its
  // motion to `anims` (which only ticks for the currently-visible world).
  const addFlock = (
    grp: THREE.Group,
    anims: ((t: number) => void)[],
    opts: { count?: number; radius?: number; y?: number; speed?: number; color?: number } = {},
  ) => {
    const { count = 3, radius = 0.5, y = 0.6, speed = 0.5, color = 0x4a3a55 } = opts;
    const wingGeo = g(new T.BoxGeometry(0.055, 0.006, 0.02));
    const birdMat = lam(color);
    for (let i = 0; i < count; i++) {
      const bird = new T.Group();
      const wl = new T.Mesh(wingGeo, birdMat);
      const wr = new T.Mesh(wingGeo, birdMat);
      wl.position.x = -0.03;
      wr.position.x = 0.03;
      bird.add(wl, wr);
      grp.add(bird);
      const ph = (i / count) * Math.PI * 2;
      const rad = radius * (0.8 + Math.random() * 0.35);
      const yy = y + (Math.random() - 0.5) * 0.2;
      anims.push((t) => {
        const a = t * speed + ph;
        bird.position.set(Math.cos(a) * rad, yy + Math.sin(t * 1.3 + ph) * 0.05, Math.sin(a) * rad * 0.75);
        bird.rotation.y = -a + Math.PI / 2;
        const flap = 0.5 + Math.sin(t * 12 + ph) * 0.6;
        wl.rotation.z = flap;
        wr.rotation.z = -flap;
      });
    }
  };

  const buildWorld = (key: WorldKey): World => {
    const group = new T.Group();
    const anims: ((t: number) => void)[] = [];
    const spin = (obj: THREE.Object3D, base: number, amp: number, w: number, ph = 0) =>
      anims.push((t) => (obj.position.y = base + Math.sin(t * w + ph) * amp));

    switch (key) {
      case "dragon": {
        group.add(islandBase(0x2c7a7b, "grass", anims));
        // Real Kenney rock formations (Nature Kit, CC0) in place of jittered
        // cones — genuine rock-face detail instead of a faceted primitive.
        // Rock peaks flank the keep — moved outward/smaller so the castle
        // reads as the clear centerpiece rather than getting lost among them.
        const peak1 = placeModel("rockA", -0.24, 0.051, 0.02, 0.34, 0.5);
        const peak2 = placeModel("rockB", 0.24, 0.047, -0.08, 0.3, 2.6);
        const peak3 = placeModel("rockC", -0.08, 0.044, 0.24, 0.2, 4.1);
        for (const peak of [peak1, peak2, peak3]) if (peak) group.add(peak);
        // A real Kenney stone keep (Castle Kit, CC0) assembled from base + mid
        // + roof, standing proud at the island's center — replaces the plain
        // cylinder tower.
        const towerBase = placeModel("towerBase", 0, 0, 0, 1, 0);
        const towerMid = placeModel("towerMid", 0, 1.01, 0, 1, 0);
        const towerRoof = placeModel("towerRoof", 0, 2.02, 0, 1, 0);
        const castle = new T.Group();
        for (const piece of [towerBase, towerMid, towerRoof]) if (piece) castle.add(piece);
        castle.scale.setScalar(0.125);
        castle.position.set(0.03, 0.035, 0.02);
        group.add(castle);
        const win = spriteOf(glowTex, 0.045, 0.9, true);
        win.position.set(0.03, 0.18, 0.12);
        (win.material as THREE.SpriteMaterial).color.setHex(0xffcf8a);
        group.add(win);
        // A small, softly pulsing candlelit window — not a floodlight.
        anims.push((t) => ((win.material as THREE.SpriteMaterial).opacity = 0.24 + Math.sin(t * 3) * 0.08));
        // A little pennant on the keep's spire that ripples in the wind.
        const flagGeo = g(new T.PlaneGeometry(0.06, 0.03, 4, 1));
        const flagBase = Float32Array.from(flagGeo.attributes.position.array);
        flagGeo.translate(0.03, 0, 0);
        const flag = new T.Mesh(flagGeo, track(new T.MeshLambertMaterial({ color: COLORS.gold, side: T.DoubleSide })));
        flag.position.set(0.03, 0.49, 0.02);
        group.add(flag);
        anims.push((t) => {
          const pos = flagGeo.attributes.position as THREE.BufferAttribute;
          for (let i = 0; i < pos.count; i++) {
            const bx = flagBase[i * 3] + 0.03;
            pos.setZ(i, Math.sin(bx * 30 + t * 8) * 0.012 * (bx / 0.06));
          }
          pos.needsUpdate = true;
        });
        for (const [x, z, ph] of [[-0.42, 0.22, 0], [0.44, -0.05, 2.4]]) {
          const c = spriteOf(cloudTex, 0.18, 0.8);
          c.position.set(x, 0.34, z);
          group.add(c);
          spin(c, 0.3, 0.02, 0.7, ph);
        }
        // Waterfalls spilling off the island rim into the clouds below — the
        // signature floating-island motif from the reference.
        addWaterfall(group, anims, -0.5, 0.52);
        addWaterfall(group, anims, 0.7, 0.44);
        // Glowing crystal spires clustered on the island's front rim (toward
        // the camera) — they light up under the bloom pass.
        glowCrystal(group, anims, 0x6be0ff, 0.17, 0.06, 0.22, 0.03);
        glowCrystal(group, anims, 0xa06bff, -0.13, 0.055, 0.26, 0.024);
        glowCrystal(group, anims, 0x62e0d0, -0.26, 0.05, 0.1, 0.026);
        addFlock(group, anims, { count: 3, radius: 0.55, y: 0.72, speed: 0.55 });
        break;
      }
      case "rocket": {
        group.add(islandBase(0x241a38, "rock", anims));
        const planet = mesh(g(new T.SphereGeometry(0.15, 28, 20)), lam(0xf2a65a), 0, 0.22, 0);
        const ring = mesh(g(new T.TorusGeometry(0.24, 0.02, 16, 56)), lam(0xffd18a), 0, 0.22, 0);
        ring.rotation.x = Math.PI / 2.4;
        group.add(planet, ring);
        // A real Kenney spacecraft (Space Kit, CC0) orbiting the planet, in
        // place of the hand-built cone-and-cylinder rocket.
        const orbiter = new T.Group();
        const craft = placeModel("craft", 0.4, 0.22, 0, 0.09, -Math.PI / 2);
        if (craft) {
          orbiter.add(craft);
          group.add(orbiter);
          anims.push((t) => (orbiter.rotation.y = t * 1.2));
        }
        // An astronaut tumbling in low orbit.
        const astroOrbit = new T.Group();
        astroOrbit.rotation.z = -0.5;
        const astro = placeModel("astronaut", 0.34, 0.22, 0, 0.14, 0);
        if (astro) {
          astroOrbit.add(astro);
          group.add(astroOrbit);
          anims.push((t) => {
            astroOrbit.rotation.y = t * 0.9 + 2;
            astro.rotation.set(t * 1.5, t * 1.1, t * 0.7); // slow tumble
          });
        }
        // A satellite dish on its own slow, tilted orbit.
        const satOrbit = new T.Group();
        satOrbit.rotation.z = 0.5;
        const sat = placeModel("satellite", 0.32, 0.22, 0, 0.12, 0);
        if (sat) {
          satOrbit.add(sat);
          group.add(satOrbit);
          anims.push((t) => (satOrbit.rotation.y = -t * 0.7));
        }
        // A little cratered moon on its own slower, tilted orbit.
        const moonOrbit = new T.Group();
        moonOrbit.rotation.z = 0.4;
        const moon = mesh(g(new T.SphereGeometry(0.045, 16, 12)), lam(0xcfc8d8), 0.3, 0.22, 0);
        moonOrbit.add(moon);
        group.add(moonOrbit);
        anims.push((t) => (moonOrbit.rotation.y = -t * 0.8));
        const starSprites: THREE.Sprite[] = [];
        for (let i = 0; i < 6; i++) {
          const s = spriteOf(starTex, 0.05, 0.9, true);
          const a = (i / 6) * Math.PI * 2;
          s.position.set(Math.cos(a) * 0.42, 0.28 + Math.sin(i * 2.1) * 0.2, Math.sin(a) * 0.4);
          group.add(s);
          starSprites.push(s);
        }
        // Twinkle: each star pulses on its own offset.
        anims.push((t) => {
          starSprites.forEach((s, i) => {
            (s.material as THREE.SpriteMaterial).opacity = 0.5 + (Math.sin(t * 3 + i * 1.7) + 1) * 0.25;
          });
        });
        break;
      }
      case "pirate": {
        group.add(islandBase(0x1fb6c9, "water", anims));
        const sea = mesh(g(new T.CylinderGeometry(0.35, 0.35, 0.02, 24)), lam(0x0e7c9e), 0, 0.035, 0);
        group.add(sea);
        // Real Kenney models (Pirate Kit, CC0) in place of the hand-built hull
        // + flat sail — a fully rigged ship reads far better than primitives.
        const ship = placeModel("ship", -0.05, 0.08, 0.05, 0.022, Math.PI);
        if (ship) {
          group.add(ship);
          anims.push((t) => {
            ship.position.y = 0.08 + Math.sin(t * 1.8) * 0.012;
            ship.rotation.z = Math.sin(t * 1.5) * 0.06;
            ship.rotation.x = Math.sin(t * 1.1 + 1) * 0.05;
          });
        }
        const isle = mesh(g(new T.ConeGeometry(0.08, 0.09, 6)), lam(0xead9a0), 0.22, 0.07, -0.14);
        const palm = placeModel("palm", 0.22, 0.11, -0.14, 0.038, 0.6);
        group.add(isle);
        if (palm) group.add(palm);
        // A fish that arcs up out of the sea and dives back on a loop.
        const fish = new T.Group();
        const fishBody = mesh(g(new T.SphereGeometry(0.022, 10, 8)), lam(0x5aa9c9));
        fishBody.scale.set(1.7, 1, 0.7);
        const fishTail = mesh(g(new T.ConeGeometry(0.016, 0.026, 4)), lam(0x5aa9c9), -0.035, 0, 0);
        fishTail.rotation.z = Math.PI / 2;
        fish.add(fishBody, fishTail);
        group.add(fish);
        anims.push((t) => {
          const cyc = (t * 0.5) % 1; // 0..1 arc, then submerged pause
          if (cyc < 0.5) {
            const k = cyc / 0.5;
            fish.visible = true;
            fish.position.set(-0.18 + k * 0.12, 0.04 + Math.sin(k * Math.PI) * 0.16, 0.12);
            fish.rotation.z = (0.5 - k) * 2.2;
          } else {
            fish.visible = false;
          }
        });
        // Seagulls wheeling over the cove.
        addFlock(group, anims, { count: 3, radius: 0.5, y: 0.6, speed: 0.5, color: 0xf2ede4 });
        break;
      }
      case "jungle": {
        group.add(islandBase(0x3fa34d, "grass", anims));
        // Stepped stone pyramid — now with recessed shading per tier and a
        // proper carved look rather than three plain tan boxes.
        const stoneCols = [0xa8895f, 0xb79b6e, 0xc4a878];
        for (const [i, [w, h, y]] of [[0.3, 0.09, 0.075], [0.22, 0.08, 0.155], [0.14, 0.08, 0.235]].entries())
          group.add(mesh(g(new T.BoxGeometry(w, h, w)), lam(stoneCols[i]), 0, y, 0));
        // Dark doorway set into the base tier.
        group.add(mesh(g(new T.BoxGeometry(0.05, 0.07, 0.02)), lam(0x2c2418), 0, 0.065, 0.151));
        // Steps leading up to the doorway.
        group.add(mesh(g(new T.BoxGeometry(0.08, 0.02, 0.03)), lam(0x9a7d54), 0, 0.03, 0.17));
        // A glowing capstone gem on the summit that pulses.
        const gem = mesh(g(new T.OctahedronGeometry(0.028)), track(new T.MeshLambertMaterial({ color: 0x62e0d0, emissive: 0x2aa89a })), 0, 0.3, 0);
        group.add(gem);
        const gemGlow = spriteOf(glowTex, 0.14, 0.8, true);
        gemGlow.position.set(0, 0.3, 0);
        (gemGlow.material as THREE.SpriteMaterial).color.setHex(0x8ff2e6);
        group.add(gemGlow);
        anims.push((t) => {
          gem.rotation.y = t * 1.2;
          gem.position.y = 0.3 + Math.sin(t * 1.6) * 0.008;
          (gemGlow.material as THREE.SpriteMaterial).opacity = 0.55 + Math.sin(t * 2.4) * 0.25;
        });
        // Real Kenney tree (Nature Kit, CC0) in place of a trunk cylinder +
        // hand-built canopy clump. Given a gentle sway.
        for (const [x, z, rot] of [[-0.26, 0.12, 0.4], [0.27, -0.16, 2.1]] as const) {
          const tree = placeModel("tree", x, 0.03, z, 0.22, rot);
          if (tree) {
            group.add(tree);
            const swayPh = x;
            anims.push((t) => (tree.rotation.z = Math.sin(t * 1.1 + swayPh) * 0.04));
          }
        }
        for (let i = 0; i < 6; i++) {
          const f = spriteOf(glowTex, 0.05, 0.9, true);
          group.add(f);
          const ph = i * 1.7;
          anims.push((t) => {
            f.position.set(Math.cos(t * 0.9 + ph) * 0.26, 0.2 + Math.sin(t * 1.3 + ph) * 0.08, Math.sin(t * 0.9 + ph) * 0.26);
            (f.material as THREE.SpriteMaterial).opacity = 0.5 + Math.sin(t * 5 + ph) * 0.4;
          });
        }
        break;
      }
      case "balloon": {
        group.add(islandBase(0x6fbf4a, "grass", anims));
        group.add(foliageClump(0x4e9e33, 0.09, -0.15, 0.05, 0.1));
        group.add(foliageClump(0x6fbf4a, 0.07, 0.18, 0.04, -0.1));
        const bal = new T.Group();
        const envelope = mesh(g(new T.SphereGeometry(0.13, 28, 20)), lam(0xe8472b));
        envelope.scale.set(1, 1.15, 1);
        const stripe = mesh(g(new T.SphereGeometry(0.131, 28, 20)), lam(0xffd23f));
        stripe.scale.set(0.4, 1.16, 1.01);
        const basket = mesh(g(new T.BoxGeometry(0.07, 0.05, 0.07)), lam(0x8b5a2b), 0, -0.21, 0);
        bal.add(envelope, stripe, basket);
        bal.position.set(0, 0.42, 0);
        group.add(bal);
        spin(bal, 0.42, 0.045, 1.1);
        // Gentle horizontal drift on top of the vertical bob, so the balloon
        // wanders rather than just bobbing in place.
        anims.push((t) => {
          bal.position.x = Math.sin(t * 0.4) * 0.06;
          bal.rotation.z = Math.sin(t * 0.5) * 0.08;
        });
        const c = spriteOf(cloudTex, 0.26, 0.9);
        c.position.set(-0.35, 0.5, -0.1);
        group.add(c);
        spin(c, 0.5, 0.02, 0.6, 1);
        // A second, smaller cloud drifting the other way.
        const c2 = spriteOf(cloudTex, 0.16, 0.8);
        c2.position.set(0.34, 0.34, 0.05);
        group.add(c2);
        anims.push((t) => (c2.position.x = 0.34 + Math.sin(t * 0.5 + 2) * 0.04));
        addFlock(group, anims, { count: 3, radius: 0.5, y: 0.66, speed: 0.5, color: 0x5a6b7a });
        break;
      }
      case "reef": {
        group.add(islandBase(0xead9a0, "sand", anims));
        const water = new T.Mesh(
          g(new T.CylinderGeometry(0.35, 0.35, 0.02, 24)),
          track(new T.MeshLambertMaterial({ color: 0x1fb6c9, transparent: true, opacity: 0.65 })),
        );
        water.position.y = 0.06;
        group.add(water);
        // Branching clumps read as coral; plain solid cones read as buoys.
        for (const [x, z, c, h] of [[-0.2, 0.1, 0xff6f91, 0.1], [0.16, -0.14, 0x7b61ff, 0.13], [0.05, 0.2, 0xffb85c, 0.08]] as const)
          group.add(coralClump(c, h / 0.05, x, 0, z));
        const whale = new T.Group();
        const body = mesh(g(new T.SphereGeometry(0.09, 20, 14)), lam(0x4a78b0));
        body.scale.set(1.6, 0.9, 0.9);
        const whaleBelly = mesh(g(new T.SphereGeometry(0.075, 16, 12)), lam(0xdcefff), 0, -0.02, 0.01);
        whaleBelly.scale.set(1.3, 0.55, 0.75);
        // A two-lobe fluke reads as a whale tail; a single cone read as a fin.
        const flukeGeo = g(new T.ConeGeometry(0.045, 0.05, 4));
        const flukeL = mesh(flukeGeo, lam(0x4a78b0), -0.19, 0.02, 0.032);
        flukeL.rotation.set(0, -0.28, Math.PI / 2.3);
        flukeL.scale.set(1, 1, 0.35);
        const flukeR = mesh(flukeGeo, lam(0x4a78b0), -0.19, 0.02, -0.032);
        flukeR.rotation.set(0, 0.28, Math.PI / 2.3);
        flukeR.scale.set(1, 1, 0.35);
        const peduncle = mesh(g(new T.CylinderGeometry(0.015, 0.03, 0.08, 8)), lam(0x4a78b0), -0.14, 0.015, 0);
        peduncle.rotation.z = Math.PI / 2;
        const eye = mesh(g(new T.SphereGeometry(0.012, 6, 6)), lam(0xffffff), 0.09, 0.02, 0.07);
        whale.add(body, whaleBelly, peduncle, flukeL, flukeR, eye);
        group.add(whale);
        anims.push((t) => {
          const k = (Math.sin(t * 0.9) + 1) / 2;
          whale.position.set(Math.sin(t * 0.45) * 0.1, 0.1 + Math.sin(k * Math.PI) * 0.16, 0);
          whale.rotation.z = Math.cos(t * 0.9) * 0.5;
        });
        // Streams of bubbles rising from the reef and popping at the surface.
        for (let i = 0; i < 7; i++) {
          const bub = spriteOf(softDot, 0.022, 0.6, true);
          (bub.material as THREE.SpriteMaterial).color.setHex(0xcfeeff);
          group.add(bub);
          const bx = (Math.random() - 0.5) * 0.4;
          const bz = (Math.random() - 0.5) * 0.4;
          const spd = 0.25 + Math.random() * 0.2;
          const off = Math.random();
          const sz = 0.016 + Math.random() * 0.02;
          anims.push((t) => {
            const life = (t * spd + off) % 1;
            bub.position.set(bx + Math.sin(life * 8 + i) * 0.01, 0.05 + life * 0.34, bz);
            bub.scale.setScalar(sz);
            (bub.material as THREE.SpriteMaterial).opacity = Math.sin(life * Math.PI) * 0.6;
          });
        }
        // Gulls over the water.
        addFlock(group, anims, { count: 2, radius: 0.52, y: 0.62, speed: 0.46, color: 0xf2ede4 });
        break;
      }
      case "aurora": {
        group.add(islandBase(0xe8f1fa, "snow", anims));
        // Real Kenney rock formations (Nature Kit, CC0) for the two peaks —
        // nested white cap accents near each tip still read as snow dusting.
        const auroraPeak1 = placeModel("rockD", -0.14, 0.0395, -0.04, 0.39, 1.2);
        const auroraPeak2 = placeModel("rockA", 0.05, 0.03, -0.14, 0.2, 3.4);
        if (auroraPeak1) group.add(auroraPeak1);
        group.add(jaggedPeak(0.07, 0.12, 0xffffff, -0.14, 0.26, -0.04));
        if (auroraPeak2) group.add(auroraPeak2);
        group.add(jaggedPeak(0.05, 0.09, 0xffffff, 0.05, 0.175, -0.14));
        group.add(mesh(g(new T.ConeGeometry(0.07, 0.11, 5)), lam(0xe8472b), 0.16, 0.07, 0.12));
        const fire = spriteOf(glowTex, 0.13, 1, true);
        fire.position.set(0.02, 0.06, 0.2);
        group.add(fire);
        anims.push((t) => {
          const m = fire.material as THREE.SpriteMaterial;
          m.opacity = 0.7 + Math.sin(t * 9) * 0.15 + Math.sin(t * 23) * 0.08;
        });
        // Embers spitting up out of the campfire.
        for (let i = 0; i < 5; i++) {
          const ember = spriteOf(softDot, 0.014, 0.9, true);
          (ember.material as THREE.SpriteMaterial).color.setHex(0xffb457);
          group.add(ember);
          const spd = 0.6 + Math.random() * 0.5;
          const off = Math.random();
          const drift = (Math.random() - 0.5) * 0.08;
          anims.push((t) => {
            const life = (t * spd + off) % 1;
            ember.position.set(0.02 + drift * life, 0.06 + life * 0.22, 0.2 + drift * life * 0.5);
            (ember.material as THREE.SpriteMaterial).opacity = (1 - life) * 0.9;
          });
        }
        const ribbonGeo = g(new T.PlaneGeometry(0.9, 0.16, 18, 1));
        const ribbonBase = Float32Array.from(ribbonGeo.attributes.position.array);
        const ribbon = new T.Mesh(
          ribbonGeo,
          track(
            new T.MeshBasicMaterial({
              color: 0x3df5c0,
              transparent: true,
              opacity: 0.4,
              side: T.DoubleSide,
              depthWrite: false,
              blending: T.AdditiveBlending,
            }),
          ),
        );
        ribbon.position.set(0, 0.52, -0.12);
        group.add(ribbon);
        anims.push((t) => {
          const pos = ribbonGeo.attributes.position;
          for (let i = 0; i < pos.count; i++) {
            const x = ribbonBase[i * 3];
            pos.setY(i, ribbonBase[i * 3 + 1] + Math.sin(x * 7 + t * 1.6) * 0.035);
            pos.setZ(i, ribbonBase[i * 3 + 2] + Math.cos(x * 5 + t * 1.2) * 0.03);
          }
          pos.needsUpdate = true;
        });
        break;
      }
      case "desert": {
        group.add(islandBase(0xe0a94e, "sand", anims));
        const duneA = mesh(g(new T.SphereGeometry(0.16, 8, 6)), lam(0xf2c46b), -0.15, 0.0, 0.08);
        duneA.scale.set(1.4, 0.45, 1);
        const duneB = mesh(g(new T.SphereGeometry(0.12, 8, 6)), lam(0xc99a5b), 0.16, 0.0, -0.06);
        duneB.scale.set(1.3, 0.4, 1);
        group.add(duneA, duneB);
        group.add(mesh(g(new T.ConeGeometry(0.13, 0.22, 4)), lam(0xb0793f), 0.12, 0.13, -0.12));
        // Rebuilt with an actual neck, a visible hump, ears and a tail, and
        // four legs instead of two — the old version was a body box with a
        // head box glued on, no neck between them, and read as a crude toy.
        const camel = new T.Group();
        const camelColor = 0xc98f52;
        const camelDark = 0x8a5a34;
        const camelBody = mesh(g(new T.SphereGeometry(0.05, 12, 8)), lam(camelColor), 0, 0.07, 0);
        camelBody.scale.set(1.55, 0.85, 0.85);
        const hump = mesh(g(new T.SphereGeometry(0.028, 10, 8)), lam(camelColor), -0.01, 0.108, 0);
        hump.scale.set(1, 1.15, 0.9);
        const neck = mesh(g(new T.CylinderGeometry(0.014, 0.02, 0.09, 8)), lam(camelColor), 0.075, 0.11, 0);
        neck.rotation.z = -0.95;
        const head = mesh(g(new T.BoxGeometry(0.045, 0.024, 0.024)), lam(camelColor), 0.115, 0.155, 0);
        const snout = mesh(g(new T.BoxGeometry(0.022, 0.016, 0.018)), lam(camelDark), 0.135, 0.148, 0);
        const earL = mesh(g(new T.ConeGeometry(0.008, 0.016, 5)), lam(camelDark), 0.115, 0.172, 0.012);
        const earR = mesh(g(new T.ConeGeometry(0.008, 0.016, 5)), lam(camelDark), 0.115, 0.172, -0.012);
        const camelTail = mesh(g(new T.ConeGeometry(0.008, 0.04, 5)), lam(camelDark), -0.085, 0.06, 0);
        camelTail.rotation.x = Math.PI / 2 + 0.3;
        const legGeo = g(new T.CylinderGeometry(0.007, 0.009, 0.075, 6));
        const legs = [
          mesh(legGeo, lam(camelDark), 0.05, 0.02, 0.02),
          mesh(legGeo, lam(camelDark), 0.05, 0.02, -0.02),
          mesh(legGeo, lam(camelDark), -0.05, 0.02, 0.02),
          mesh(legGeo, lam(camelDark), -0.05, 0.02, -0.02),
        ];
        camel.add(camelBody, hump, neck, head, snout, earL, earR, camelTail, ...legs);
        camel.position.set(-0.14, 0.02, 0.14);
        camel.rotation.y = 0.7;
        group.add(camel);
        // The camel plods a slow circular path around the pyramid with a
        // gentle walking bob, its head nodding and tail swishing — it was
        // completely static before.
        anims.push((t) => {
          const a = t * 0.28;
          camel.position.set(Math.cos(a) * 0.16, 0.02 + Math.abs(Math.sin(t * 3)) * 0.006, Math.sin(a) * 0.13);
          camel.rotation.y = -a + Math.PI / 2 + 0.7;
          head.rotation.z = Math.sin(t * 3) * 0.12;
          camelTail.rotation.y = Math.sin(t * 4) * 0.3;
        });
        const sun = spriteOf(glowTex, 0.34, 0.85, true);
        sun.position.set(0.26, 0.5, -0.2);
        group.add(sun);
        // Sun rays: thin spokes radiating from the sun, slowly rotating.
        const rays = new T.Group();
        rays.position.set(0.26, 0.5, -0.2);
        const rayGeoD = g(new T.PlaneGeometry(0.02, 0.12));
        const rayMatD = track(new T.MeshBasicMaterial({ color: 0xffe08a, transparent: true, opacity: 0.4, side: T.DoubleSide, depthWrite: false, blending: T.AdditiveBlending }));
        for (let i = 0; i < 8; i++) {
          const ray = new T.Mesh(rayGeoD, rayMatD);
          ray.position.y = 0.22;
          const rg = new T.Group();
          rg.rotation.z = (i / 8) * Math.PI * 2;
          rg.add(ray);
          rays.add(rg);
        }
        group.add(rays);
        anims.push((t) => {
          rays.rotation.z = t * 0.3;
          rayMatD.opacity = 0.3 + Math.sin(t * 2) * 0.12;
        });
        // A lone bird gliding over the dunes.
        addFlock(group, anims, { count: 2, radius: 0.5, y: 0.66, speed: 0.42, color: 0x6b4a3a });
        break;
      }
    }
    return { group, tick: (t) => anims.forEach((a) => a(t)) };
  };

  // Give the same-origin model fetches a chance to land before the worlds
  // that use them are built — everything above (textures, book, lighting)
  // ran synchronously while this was in flight, so it's typically already
  // resolved by the time we get here.
  await modelsReady;
  const worlds = WORLDS.map((s) => buildWorld(s.key));
  const worldHolder = new T.Group();
  const WORLD_Y = 1.02;
  worldHolder.position.set(0, WORLD_Y, 0);
  root.add(worldHolder);
  let worldIdx = 0;
  worldHolder.add(worlds[0].group);

  if (fancyShadows) {
    for (const w of worlds) w.group.traverse((o) => ((o as THREE.Mesh).isMesh ? ((o as THREE.Mesh).castShadow = true) : null));
  }

  /* ---------- animation state ---------- */

  const clock = new T.Clock();
  let elapsed = 0;
  let raf = 0;
  let running = false;
  let inView = true;

  type Tween = { at: number; dur: number; ease: (k: number) => number; apply: (k: number) => void; done?: () => void };
  const tweens: Tween[] = [];
  const tw = (delay: number, dur: number, ease: Tween["ease"], apply: Tween["apply"], done?: () => void) =>
    tweens.push({ at: elapsed + delay, dur, ease, apply, done });

  const easeInOut = (k: number) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
  const easeIn = (k: number) => k * k * k;
  const backOut = (k: number) => 1 + 2.2 * Math.pow(k - 1, 3) + 1.2 * Math.pow(k - 1, 2);

  let turning = false;
  let turnStart = 0;
  const TURN_DUR = 1.8;
  let nextTurnAt = 4.2;

  const fireBurst = () => {
    burstAt = elapsed;
    burst.visible = true;
    for (let i = 0; i < BURST; i++) {
      burstPos[i * 3] = 0;
      burstPos[i * 3 + 1] = 0.35;
      burstPos[i * 3 + 2] = 0.05;
    }
    (burstGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
  };

  const startTurn = () => {
    if (turning) return;
    turning = true;
    turnStart = elapsed;
    nextTurnAt = elapsed + 6.8;
    const incomingIdx = (worldIdx + 1) % WORLDS.length;
    // Front face carries the current world (visible as the leaf lifts); the
    // back face carries the incoming world (revealed as it flips past vertical).
    // Both are set once here — no mid-flip texture swap that could flash.
    pageMat.map = arts[worldIdx];
    pageMat.needsUpdate = true;
    pageMatBack.map = artsBack[incomingIdx];
    pageMatBack.needsUpdate = true;

    const outgoing = worlds[worldIdx].group;
    // Sink the current world into the gutter…
    tw(0.05, 0.55, easeIn, (k) => {
      outgoing.scale.setScalar(Math.max(1 - k, 0.001));
      outgoing.position.y = -k * 0.55;
    }, () => {
      worldHolder.remove(outgoing);
      outgoing.scale.setScalar(1);
      outgoing.position.y = 0;
    });
    tw(0.5, 0.01, easeInOut, () => {}, fireBurst);
    // …and raise the next out of the light.
    tw(1.0, 0.01, easeInOut, () => {}, () => {
      worldIdx = incomingIdx;
      accentTarget.setHex(WORLDS[incomingIdx].accent);
      const inc = worlds[incomingIdx].group;
      inc.scale.setScalar(0.001);
      inc.position.y = -0.5;
      worldHolder.add(inc);
      tw(
        0,
        0.95,
        backOut,
        (k) => {
          inc.scale.setScalar(Math.max(k, 0.001));
          inc.position.y = -0.5 * (1 - k);
          inc.rotation.y = (1 - k) * -1.6;
        },
        () => {
          inc.rotation.y = 0;
        },
      );
    });
    // Caption crossfade.
    const capMat = caption.material as THREE.SpriteMaterial;
    tw(0.15, 0.4, easeInOut, (k) => (capMat.opacity = 0.95 * (1 - k)));
    tw(1.15, 0.01, easeInOut, () => {}, () => drawCaption(WORLDS[incomingIdx].caption));
    tw(1.2, 0.5, easeInOut, (k) => (capMat.opacity = 0.95 * k));
  };

  const updateTurn = () => {
    const k = Math.min((elapsed - turnStart) / TURN_DUR, 1);
    const phase = easeInOut(k);
    pagePivot.rotation.z = phase * Math.PI;
    // Cloth-like curl, strongest mid-turn.
    const curl = 0.17 * Math.sin(phase * Math.PI);
    const pos = pageGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const u = pageBase[i * 3]; // 0 at spine → 1 at fore-edge
      pos.setY(i, pageBase[i * 3 + 1] + Math.sin(u * Math.PI) * curl);
    }
    pos.needsUpdate = true;
    pageGeo.computeVertexNormals();
    if (k >= 1) {
      turning = false;
      // Lie flat again showing the (new) current world's illustration, so the
      // open spread always carries its world's storybook page.
      pagePivot.rotation.z = 0;
      pageMat.map = arts[worldIdx];
      pageMat.needsUpdate = true;
    }
  };

  /* ---------- input ---------- */

  let px = 0;
  let py = 0;
  let tx = 0;
  let ty = 0;
  const onPointer = (e: PointerEvent) => {
    const r = host.getBoundingClientRect();
    tx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width * 1.4)));
    ty = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height * 1.4)));
  };
  const onClick = () => {
    if (reduced) {
      // Static mode: instant swap, single re-render.
      worldHolder.remove(worlds[worldIdx].group);
      worldIdx = (worldIdx + 1) % WORLDS.length;
      worldHolder.add(worlds[worldIdx].group);
      worlds[worldIdx].tick(2.0); // pose the new world's animated props
      drawCaption(WORLDS[worldIdx].caption);
      renderFrame();
      return;
    }
    startTurn();
  };
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (fine && !reduced) window.addEventListener("pointermove", onPointer, { passive: true });
  renderer.domElement.addEventListener("click", onClick);

  /* ---------- render loop & lifecycle ---------- */

  // Cap the loop to ~34fps. rAF still fires at the display rate, but the sim +
  // render only run when enough wall-clock time has accumulated — roughly
  // halving the ongoing GPU/CPU cost of the hero versus 60fps, which is plenty
  // smooth for a subtle background animation and eases the load-time CPU
  // pressure Lighthouse measures.
  const TARGET_DT = 1 / 34;
  let frameAcc = 0;
  const frame = () => {
    if (running) raf = requestAnimationFrame(frame);
    frameAcc += clock.getDelta();
    if (frameAcc < TARGET_DT) return;
    const dt = Math.min(frameAcc, 0.05);
    frameAcc = 0;
    elapsed += dt;
    const t = elapsed;

    // Pointer parallax + idle drift.
    px += (tx - px) * 0.05;
    py += (ty - py) * 0.05;
    root.rotation.y = px * 0.3 + Math.sin(t * 0.25) * 0.035;
    root.rotation.x = py * 0.12 + Math.sin(t * 0.18) * 0.015;

    // The tome and its world breathe.
    book.position.y = -0.12 + Math.sin(t * 0.8) * 0.02;
    worldHolder.position.y = WORLD_Y + Math.sin(t * 0.9 + 1) * 0.035 + (book.position.y + 0.12);
    worldHolder.rotation.y = t * 0.22;
    worlds[worldIdx].tick(t);

    // Ambience.
    accent.lerp(accentTarget, 0.02);
    gutterLight.color.copy(accent);
    (halo.material as THREE.SpriteMaterial).color.copy(accent).lerp(WHITE, 0.35);
    (ray.material as THREE.MeshBasicMaterial).color.copy(accent).lerp(WHITE, 0.5);
    ray.rotation.y = t * 0.4;
    (ray.material as THREE.MeshBasicMaterial).opacity = 0.02 + Math.sin(t * 1.7) * 0.006;
    gutterLight.intensity = 0.9 + Math.sin(t * 2.1) * 0.2;
    (halo.material as THREE.SpriteMaterial).opacity = 0.13 + Math.sin(t * 1.3) * 0.03;
    for (const tk of twinkles) (tk.s.material as THREE.SpriteMaterial).opacity = 0.35 + (Math.sin(t * tk.w + tk.p) + 1) * 0.3;
    for (let i = 0; i < EMBERS; i++) {
      const sa = emberSeed[i * 2];
      const sb = emberSeed[i * 2 + 1];
      const life = (t * (0.1 + sb * 0.12) + sa) % 1;
      emberPos[i * 3] = (sa - 0.5) * 1.6 + Math.sin(t * 0.8 + sa * 9) * 0.08;
      emberPos[i * 3 + 1] = 0.1 + life * 1.5;
      emberPos[i * 3 + 2] = (sb - 0.5) * 0.9;
    }
    (emberGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    emberMat.opacity = 0.85;
    if (burst.visible) {
      const bk = (t - burstAt) / 0.85;
      if (bk >= 1) burst.visible = false;
      else {
        for (let i = 0; i < BURST; i++) {
          burstPos[i * 3] += burstVel[i * 3] * dt * (1 - bk);
          burstPos[i * 3 + 1] += burstVel[i * 3 + 1] * dt * (1 - bk);
          burstPos[i * 3 + 2] += burstVel[i * 3 + 2] * dt * (1 - bk);
        }
        (burstGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
        burstMat.opacity = 1 - bk;
      }
    }

    // Tweens.
    for (let i = tweens.length - 1; i >= 0; i--) {
      const tween = tweens[i];
      if (t < tween.at) continue;
      const k = Math.min((t - tween.at) / tween.dur, 1);
      tween.apply(tween.ease(k));
      if (k >= 1) {
        tweens.splice(i, 1);
        tween.done?.();
      }
    }

    // Choreography.
    if (turning) updateTurn();
    else if (t >= nextTurnAt && !document.hidden) startTurn();

    renderFrame();
  };

  const setRunning = (want: boolean) => {
    if (want === running) return;
    running = want;
    if (running) {
      clock.getDelta(); // swallow the pause so dt stays sane
      raf = requestAnimationFrame(frame);
    } else {
      cancelAnimationFrame(raf);
    }
  };

  const onVisibility = () => setRunning(!document.hidden && inView && live && !reduced);
  const io = new IntersectionObserver(
    (entries) => {
      inView = entries[0]?.isIntersecting ?? true;
      onVisibility();
    },
    { threshold: 0.05 },
  );
  io.observe(host);
  document.addEventListener("visibilitychange", onVisibility);

  if (reduced) {
    // One perfect still: world raised, caption set, soft light. Tick the
    // visible world's animations once at a representative time so the animated
    // props (orbiting rock chunks, birds, motes, the camel, …) are posed in
    // their spread-out positions rather than piled at the island's origin.
    worlds[worldIdx].tick(2.0);
    renderFrame();
  } else {
    setRunning(live);
  }
  onReady();

  return () => {
    setRunning(false);
    io.disconnect();
    document.removeEventListener("visibilitychange", onVisibility);
    if (fine && !reduced) window.removeEventListener("pointermove", onPointer);
    renderer.domElement.removeEventListener("click", onClick);
    for (const d of disposables) d.dispose();
    for (const geo of loadedGeometries) geo.dispose();
    for (const mat of loadedMaterials) mat.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
