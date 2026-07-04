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
 * Coral Deep, Aurora Camp, Desert Caravan. A proper little dragon (long neck,
 * bat wings, sinuous tail — no more angry bird) launches out of the gutter now
 * and then to circle the island before diving home. Clicking the book turns
 * the page immediately. The camera drifts and leans toward the pointer.
 *
 * Performance & resilience:
 * - three.js loads inside this already-lazy client-only chunk, so nothing
 *   here ever competes with the LCP headline.
 * - The render loop pauses whenever the tab is hidden or the book scrolls
 *   out of view (IntersectionObserver), and the pixel ratio is capped at 2.
 * - Under prefers-reduced-motion the scene renders a single static frame —
 *   full 3D depth, no animation, no dragon.
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
    (async () => {
      const T = await import("three");
      if (disposed) return;
      cleanup = buildScene(T, host, width, height, live, () => setReady(true));
    })();
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [width, height, live]);

  return (
    <div
      ref={hostRef}
      className={className}
      style={{ position: "relative", width, height }}
      role="img"
      aria-label="An enchanted open book. Miniature floating worlds rise out of its pages as they turn, and a small dragon flies out now and then."
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

function buildScene(
  T: ThreeNS,
  host: HTMLDivElement,
  width: number,
  height: number,
  live: boolean,
  onReady: () => void,
): (() => void) | null {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new T.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
  } catch {
    return null; // No WebGL — the BookLogo fallback stays.
  }
  // Supersample: render the small canvas at up to ~2.6× device pixels so the
  // gilt lines, page art, and text stay crisp instead of soft. The canvas is
  // tiny (≈330×260 CSS px) so even at 2.6× the buffer is modest.
  const cores = navigator.hardwareConcurrency ?? 8;
  const ssBudget = cores >= 8 ? 2.6 : cores >= 6 ? 2.2 : 2;
  renderer.setPixelRatio(Math.min((window.devicePixelRatio || 1) * 1.35, ssBudget));
  renderer.setSize(width, height);
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.06;
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

  const root = new T.Group(); // pointer-parallax pivot
  scene.add(root);

  root.add(new T.AmbientLight(0xfff1dc, 0.35));
  root.add(new T.HemisphereLight(0xfff6e6, 0x8a5a9e, 0.75));
  const key = new T.DirectionalLight(0xfff6e6, 1.7);
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
  const pageMat = track(new T.MeshLambertMaterial({ map: arts[0], side: T.DoubleSide }));
  const page = new T.Mesh(pageGeo, pageMat);
  page.castShadow = fancyShadows;
  page.receiveShadow = true;
  const pagePivot = new T.Group();
  pagePivot.position.set(0, 0.2, 0);
  pagePivot.add(page);
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

  const islandBase = (topColor: number, anims: ((t: number) => void)[]) => {
    const grp = new T.Group();
    const rock = mesh(g(new T.CylinderGeometry(0.3, 0.05, 0.22, 7)), lam(0x6b4a75), 0, -0.125, 0);
    // Overhanging grassy lip reads far more "floating island" than a flush disc.
    const top = mesh(g(new T.CylinderGeometry(0.35, 0.315, 0.055, 7)), lam(topColor), 0, 0.008, 0);
    grp.add(rock, top);
    for (const [x, z, l] of [[-0.12, 0.06, 0.1], [0.08, -0.09, 0.14], [0.03, 0.11, 0.08]] as const)
      grp.add(mesh(g(new T.ConeGeometry(0.013, l, 4)), lam(0x5a3b63), x, -0.14 - l / 2, z));
    ([[0.3, -0.3, 0.12, 0.035], [-0.24, -0.42, -0.06, 0.024], [0.06, -0.54, 0.02, 0.018]] as const).forEach(([x, y, z, r], i) => {
      const shard = mesh(g(new T.TetrahedronGeometry(r)), lam(0x6b4a75), x, y, z);
      grp.add(shard);
      anims.push((t) => {
        shard.position.y = y + Math.sin(t * 1.1 + i * 2.1) * 0.035;
        shard.rotation.y = t * 0.4 + i;
      });
    });
    return grp;
  };

  const buildWorld = (key: WorldKey): World => {
    const group = new T.Group();
    const anims: ((t: number) => void)[] = [];
    const spin = (obj: THREE.Object3D, base: number, amp: number, w: number, ph = 0) =>
      anims.push((t) => (obj.position.y = base + Math.sin(t * w + ph) * amp));

    switch (key) {
      case "dragon": {
        group.add(islandBase(0x2c7a7b, anims));
        group.add(mesh(g(new T.ConeGeometry(0.16, 0.42, 6)), lam(0x173b4a), -0.12, 0.24, 0.02));
        group.add(mesh(g(new T.ConeGeometry(0.12, 0.3, 6)), lam(0x2c7a7b), 0.14, 0.18, -0.08));
        group.add(mesh(g(new T.ConeGeometry(0.09, 0.22, 6)), lam(0x3a8f8f), 0.05, 0.14, 0.16));
        const tower = mesh(g(new T.CylinderGeometry(0.035, 0.045, 0.16, 6)), lam(0x241a38), 0.16, 0.36, -0.08);
        const roof = mesh(g(new T.ConeGeometry(0.055, 0.08, 6)), lam(0x2e2447), 0.16, 0.48, -0.08);
        const win = spriteOf(glowTex, 0.09, 0.9, true);
        win.position.set(0.16, 0.38, -0.02);
        group.add(tower, roof, win);
        for (const [x, z, ph] of [[-0.34, 0.2, 0], [0.38, -0.05, 2.4]]) {
          const c = spriteOf(cloudTex, 0.24, 0.85);
          c.position.set(x, 0.3, z);
          group.add(c);
          spin(c, 0.3, 0.02, 0.7, ph);
        }
        break;
      }
      case "rocket": {
        group.add(islandBase(0x241a38, anims));
        const planet = mesh(g(new T.SphereGeometry(0.15, 28, 20)), lam(0xf2a65a), 0, 0.22, 0);
        const ring = mesh(g(new T.TorusGeometry(0.24, 0.02, 16, 56)), lam(0xffd18a), 0, 0.22, 0);
        ring.rotation.x = Math.PI / 2.4;
        group.add(planet, ring);
        const orbiter = new T.Group();
        const rocket = new T.Group();
        rocket.add(
          mesh(g(new T.CylinderGeometry(0.03, 0.035, 0.1, 8)), lam(0xf5f5fa)),
          mesh(g(new T.ConeGeometry(0.03, 0.05, 8)), lam(0xe8472b), 0, 0.075, 0),
          mesh(g(new T.ConeGeometry(0.02, 0.045, 6)), lam(0xffb02e), 0, -0.075, 0),
        );
        rocket.position.set(0.38, 0.22, 0);
        rocket.rotation.z = -Math.PI / 2;
        orbiter.add(rocket);
        group.add(orbiter);
        anims.push((t) => (orbiter.rotation.y = t * 1.4));
        for (let i = 0; i < 5; i++) {
          const s = spriteOf(starTex, 0.05, 0.9, true);
          const a = (i / 5) * Math.PI * 2;
          s.position.set(Math.cos(a) * 0.42, 0.28 + Math.sin(i * 2.1) * 0.18, Math.sin(a) * 0.4);
          group.add(s);
        }
        break;
      }
      case "pirate": {
        group.add(islandBase(0x1fb6c9, anims));
        const sea = mesh(g(new T.CylinderGeometry(0.35, 0.35, 0.02, 24)), lam(0x0e7c9e), 0, 0.035, 0);
        group.add(sea);
        const ship = new T.Group();
        const hull = mesh(g(new T.BoxGeometry(0.2, 0.06, 0.09)), lam(0x7a4a2b));
        hull.scale.set(1, 1, 1);
        const mast = mesh(g(new T.CylinderGeometry(0.008, 0.008, 0.18, 6)), lam(0x5a3620), 0, 0.11, 0);
        const sailGeo = g(new T.PlaneGeometry(0.12, 0.12));
        const sail = new T.Mesh(sailGeo, track(new T.MeshLambertMaterial({ color: 0xe84b3a, side: T.DoubleSide })));
        sail.position.set(0.02, 0.12, 0);
        sail.rotation.y = Math.PI / 2;
        ship.add(hull, mast, sail);
        ship.position.set(-0.05, 0.08, 0.05);
        group.add(ship);
        anims.push((t) => {
          ship.position.y = 0.08 + Math.sin(t * 1.8) * 0.012;
          ship.rotation.z = Math.sin(t * 1.5) * 0.06;
          ship.rotation.x = Math.sin(t * 1.1 + 1) * 0.05;
        });
        const isle = mesh(g(new T.ConeGeometry(0.08, 0.09, 6)), lam(0xead9a0), 0.22, 0.07, -0.14);
        const palm = mesh(g(new T.ConeGeometry(0.05, 0.05, 5)), lam(0x2e7d32), 0.22, 0.14, -0.14);
        group.add(isle, palm);
        break;
      }
      case "jungle": {
        group.add(islandBase(0x3fa34d, anims));
        for (const [w, h, y] of [[0.3, 0.09, 0.075], [0.22, 0.08, 0.155], [0.14, 0.08, 0.235]])
          group.add(mesh(g(new T.BoxGeometry(w, h, w)), lam(0xb79b6e), 0, y, 0));
        group.add(mesh(g(new T.BoxGeometry(0.05, 0.07, 0.02)), lam(0x5a4632), 0, 0.065, 0.15));
        for (const [x, z] of [[-0.26, 0.12], [0.27, -0.16]]) {
          group.add(
            mesh(g(new T.CylinderGeometry(0.012, 0.018, 0.14, 5)), lam(0x8b5a2b), x, 0.1, z),
            mesh(g(new T.ConeGeometry(0.09, 0.07, 5)), lam(0x2e7d32), x, 0.19, z),
          );
        }
        for (let i = 0; i < 4; i++) {
          const f = spriteOf(glowTex, 0.05, 0.9, true);
          group.add(f);
          const ph = i * 1.7;
          anims.push((t) => {
            f.position.set(Math.cos(t * 0.9 + ph) * 0.26, 0.2 + Math.sin(t * 1.3 + ph) * 0.08, Math.sin(t * 0.9 + ph) * 0.26);
          });
        }
        break;
      }
      case "balloon": {
        group.add(islandBase(0x6fbf4a, anims));
        group.add(mesh(g(new T.SphereGeometry(0.1, 8, 6)), lam(0x4e9e33), -0.15, 0.05, 0.1));
        group.add(mesh(g(new T.SphereGeometry(0.08, 8, 6)), lam(0x6fbf4a), 0.18, 0.04, -0.1));
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
        const c = spriteOf(cloudTex, 0.26, 0.9);
        c.position.set(-0.35, 0.5, -0.1);
        group.add(c);
        spin(c, 0.5, 0.02, 0.6, 1);
        break;
      }
      case "reef": {
        group.add(islandBase(0xead9a0, anims));
        const water = new T.Mesh(
          g(new T.CylinderGeometry(0.35, 0.35, 0.02, 24)),
          track(new T.MeshLambertMaterial({ color: 0x1fb6c9, transparent: true, opacity: 0.65 })),
        );
        water.position.y = 0.06;
        group.add(water);
        for (const [x, z, c, h] of [[-0.2, 0.1, 0xff6f91, 0.1], [0.16, -0.14, 0x7b61ff, 0.13], [0.05, 0.2, 0xffb85c, 0.08]] as const)
          group.add(mesh(g(new T.ConeGeometry(0.035, h, 5)), lam(c), x, h / 2, z));
        const whale = new T.Group();
        const body = mesh(g(new T.SphereGeometry(0.09, 20, 14)), lam(0x4a78b0));
        body.scale.set(1.6, 0.9, 0.9);
        const tail = mesh(g(new T.ConeGeometry(0.05, 0.07, 4)), lam(0x4a78b0), -0.16, 0.02, 0);
        tail.rotation.z = Math.PI / 2.4;
        const eye = mesh(g(new T.SphereGeometry(0.012, 6, 6)), lam(0xffffff), 0.09, 0.02, 0.07);
        whale.add(body, tail, eye);
        group.add(whale);
        anims.push((t) => {
          const k = (Math.sin(t * 0.9) + 1) / 2;
          whale.position.set(Math.sin(t * 0.45) * 0.1, 0.1 + Math.sin(k * Math.PI) * 0.16, 0);
          whale.rotation.z = Math.cos(t * 0.9) * 0.5;
        });
        break;
      }
      case "aurora": {
        group.add(islandBase(0xe8f1fa, anims));
        group.add(mesh(g(new T.ConeGeometry(0.14, 0.3, 6)), lam(0xc7d7e8), -0.14, 0.17, -0.04));
        group.add(mesh(g(new T.ConeGeometry(0.1, 0.2, 6)), lam(0x9fb3cc), 0.05, 0.12, -0.14));
        group.add(mesh(g(new T.ConeGeometry(0.07, 0.11, 5)), lam(0xe8472b), 0.16, 0.07, 0.12));
        const fire = spriteOf(glowTex, 0.13, 1, true);
        fire.position.set(0.02, 0.06, 0.2);
        group.add(fire);
        anims.push((t) => {
          const m = fire.material as THREE.SpriteMaterial;
          m.opacity = 0.7 + Math.sin(t * 9) * 0.15 + Math.sin(t * 23) * 0.08;
        });
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
        group.add(islandBase(0xe0a94e, anims));
        const duneA = mesh(g(new T.SphereGeometry(0.16, 8, 6)), lam(0xf2c46b), -0.15, 0.0, 0.08);
        duneA.scale.set(1.4, 0.45, 1);
        const duneB = mesh(g(new T.SphereGeometry(0.12, 8, 6)), lam(0xc99a5b), 0.16, 0.0, -0.06);
        duneB.scale.set(1.3, 0.4, 1);
        group.add(duneA, duneB);
        group.add(mesh(g(new T.ConeGeometry(0.13, 0.22, 4)), lam(0xb0793f), 0.12, 0.13, -0.12));
        const camel = new T.Group();
        camel.add(
          mesh(g(new T.BoxGeometry(0.09, 0.05, 0.04)), lam(0x6b3f2a), 0, 0.06, 0),
          mesh(g(new T.SphereGeometry(0.02, 6, 5)), lam(0x6b3f2a), 0.0, 0.095, 0),
          mesh(g(new T.BoxGeometry(0.018, 0.028, 0.018)), lam(0x6b3f2a), 0.05, 0.1, 0),
          mesh(g(new T.SphereGeometry(0.014, 6, 5)), lam(0x5a3620), 0.055, 0.125, 0),
          mesh(g(new T.BoxGeometry(0.012, 0.05, 0.012)), lam(0x6b3f2a), -0.03, 0.02, 0.012),
          mesh(g(new T.BoxGeometry(0.012, 0.05, 0.012)), lam(0x6b3f2a), 0.03, 0.02, -0.012),
        );
        camel.position.set(-0.14, 0.02, 0.14);
        camel.rotation.y = 0.7;
        group.add(camel);
        const sun = spriteOf(glowTex, 0.34, 0.85, true);
        sun.position.set(0.26, 0.5, -0.2);
        group.add(sun);
        break;
      }
    }
    return { group, tick: (t) => anims.forEach((a) => a(t)) };
  };

  const worlds = WORLDS.map((s) => buildWorld(s.key));
  const worldHolder = new T.Group();
  const WORLD_Y = 1.02;
  worldHolder.position.set(0, WORLD_Y, 0);
  root.add(worldHolder);
  let worldIdx = 0;
  worldHolder.add(worlds[0].group);

  /* ---------- the dragon (an actual dragon this time) ---------- */

  const dragon = new T.Group();
  const dTail: THREE.Object3D[] = [];
  {
    const body = mesh(g(new T.SphereGeometry(0.075, 20, 16)), lam(0x7b2480));
    body.scale.set(1, 0.95, 1.65);
    const belly = mesh(g(new T.SphereGeometry(0.06, 20, 16)), lam(0xf5cc45), 0, -0.028, 0.02);
    belly.scale.set(0.85, 0.7, 1.3);
    const neckA = mesh(g(new T.SphereGeometry(0.045, 16, 12)), lam(0x7b2480), 0, 0.055, 0.1);
    const neckB = mesh(g(new T.SphereGeometry(0.038, 16, 12)), lam(0x7b2480), 0, 0.1, 0.15);
    const head = mesh(g(new T.SphereGeometry(0.048, 18, 14)), lam(0x8b2e90), 0, 0.13, 0.19);
    const snout = mesh(g(new T.BoxGeometry(0.045, 0.03, 0.055)), lam(0x8b2e90), 0, 0.115, 0.235);
    for (const s of [-1, 1]) {
      const horn = mesh(g(new T.ConeGeometry(0.011, 0.05, 5)), lam(0xf5cc45), s * 0.022, 0.17, 0.165);
      horn.rotation.x = -0.9;
      const sclera = mesh(g(new T.SphereGeometry(0.014, 8, 7)), lam(0xffffff), s * 0.031, 0.142, 0.212);
      const pupil = mesh(g(new T.SphereGeometry(0.008, 6, 6)), lam(0x1a1a1a), s * 0.034, 0.142, 0.222);
      dragon.add(horn, sclera, pupil);
      const wing = new T.Group();
      const shape = new T.Shape();
      shape.moveTo(0, 0);
      shape.quadraticCurveTo(0.07, 0.1, 0.19, 0.1);
      shape.lineTo(0.14, 0.045);
      shape.lineTo(0.2, 0.045);
      shape.lineTo(0.15, -0.005);
      shape.lineTo(0.19, -0.03);
      shape.lineTo(0.02, -0.03);
      shape.closePath();
      const wgeo = g(new T.ShapeGeometry(shape));
      const wmesh = new T.Mesh(
        wgeo,
        track(new T.MeshLambertMaterial({ color: COLORS.gold, side: T.DoubleSide, transparent: true, opacity: 0.95 })),
      );
      wmesh.scale.x = s;
      wmesh.rotation.y = (Math.PI / 2) * s * 0.15;
      wing.add(wmesh);
      wing.scale.setScalar(1.25);
      wing.position.set(s * 0.05, 0.05, 0.02);
      wing.userData.side = s;
      dragon.add(wing);
        (dragon.userData.wings ??= []).push(wing);
    }
    dragon.add(body, belly, neckA, neckB, head, snout);
    let pz = -0.11;
    for (let i = 0; i < 4; i++) {
      const r = 0.032 - i * 0.007;
      const seg = mesh(g(new T.SphereGeometry(Math.max(r, 0.01), 7, 6)), lam(0x7b2480), 0, -0.005 - i * 0.008, pz);
      pz -= 0.055;
      dragon.add(seg);
      dTail.push(seg);
    }
    const fin = new T.Mesh(
      g(new T.ConeGeometry(0.03, 0.06, 4)),
      track(new T.MeshLambertMaterial({ color: COLORS.gold, side: T.DoubleSide })),
    );
    fin.position.set(0, -0.03, pz + 0.02);
    fin.rotation.x = Math.PI / 2;
    dragon.add(fin);
    dTail.push(fin);
  }
  dragon.visible = false;
  dragon.scale.setScalar(1.15);
  root.add(dragon);
  if (fancyShadows) {
    for (const w of worlds) w.group.traverse((o) => ((o as THREE.Mesh).isMesh ? ((o as THREE.Mesh).castShadow = true) : null));
    dragon.traverse((o) => ((o as THREE.Mesh).isMesh ? ((o as THREE.Mesh).castShadow = true) : null));
  }

  const TRAIL = 16;
  const trailGeo = g(new T.BufferGeometry());
  const trailPos = new Float32Array(TRAIL * 3);
  for (let i = 0; i < TRAIL; i++) trailPos[i * 3 + 1] = -5;
  trailGeo.setAttribute("position", new T.BufferAttribute(trailPos, 3));
  const trailMat = track(
    new T.PointsMaterial({
      map: starTex,
      color: 0xffe08a,
      size: 0.055,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: T.AdditiveBlending,
    }),
  );
  const trail = new T.Points(trailGeo, trailMat);
  root.add(trail);
  let trailHead = 0;
  let trailLast = 0;

  const flightCurve = new T.CatmullRomCurve3(
    [
      new T.Vector3(0, 0.15, 0.1),
      new T.Vector3(0.35, 0.85, 0.55),
      new T.Vector3(0.95, 1.25, 0),
      new T.Vector3(0, 1.5, -0.9),
      new T.Vector3(-0.95, 1.2, 0),
      new T.Vector3(-0.3, 0.95, 0.75),
      new T.Vector3(0.55, 0.8, 0.5),
      new T.Vector3(0.15, 0.45, 0.3),
      new T.Vector3(0, 0.1, 0.1),
    ],
    false,
    "catmullrom",
    0.4,
  );

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
  let swapped = false;
  const TURN_DUR = 1.8;
  let nextTurnAt = 4.2;
  let nextDragonAt = 7;
  let dragonMode: "none" | "flight" | "peek" = "none";
  let dragonStart = 0;

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
    swapped = false;
    turnStart = elapsed;
    nextTurnAt = elapsed + 6.8;
    pageMat.map = arts[worldIdx];
    pageMat.needsUpdate = true;

    const outgoing = worlds[worldIdx].group;
    const incomingIdx = (worldIdx + 1) % WORLDS.length;
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
    if (!swapped && phase >= 0.5) {
      swapped = true;
      pageMat.map = artsBack[(worldIdx + 1) % WORLDS.length];
      pageMat.needsUpdate = true;
    }
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

  const updateDragon = () => {
    const t = elapsed - dragonStart;
    if (dragonMode === "flight") {
      const DUR = 8.5;
      const k = t / DUR;
      if (k >= 1) {
        dragonMode = "none";
        dragon.visible = false;
        trailMat.opacity = 0;
        nextDragonAt = elapsed + 11 + Math.random() * 10;
        return;
      }
      const u = easeInOut(k);
      const p = flightCurve.getPointAt(u);
      dragon.position.copy(p);
      if (elapsed - trailLast > 0.06) {
        trailLast = elapsed;
        trailPos[trailHead * 3] = p.x;
        trailPos[trailHead * 3 + 1] = p.y;
        trailPos[trailHead * 3 + 2] = p.z;
        trailHead = (trailHead + 1) % TRAIL;
        (trailGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      }
      trailMat.opacity = Math.min(k * 6, 1, (1 - k) * 6) * 0.7;
      const ahead = flightCurve.getPointAt(Math.min(u + 0.012, 1));
      dragon.lookAt(ahead);
      const s = Math.min(t / 0.5, 1, (DUR - t) / 0.5);
      dragon.scale.setScalar(1.1 * Math.max(s, 0.001));
    } else if (dragonMode === "peek") {
      const DUR = 4.6;
      const k = t / DUR;
      if (k >= 1) {
        dragonMode = "none";
        dragon.visible = false;
        nextDragonAt = elapsed + 11 + Math.random() * 10;
        return;
      }
      const rise = k < 0.18 ? easeInOut(k / 0.18) : k > 0.85 ? 1 - easeInOut((k - 0.85) / 0.15) : 1;
      // Only head, neck and wings clear the pages — the body stays sunk in
      // the gutter like it's peeking over a wall.
      dragon.position.set(0.25, -0.16 + rise * 0.34, 0.38);
      dragon.rotation.set(0.12, -0.6 + Math.sin(t * 1.1) * 0.3, Math.sin(t * 2.3) * 0.05);
      dragon.scale.setScalar(1.2);
    }
    // Wing flap + tail wave, shared by both antics.
    const wings = (dragon.userData.wings ?? []) as THREE.Group[];
    for (const w of wings) w.rotation.z = (w.userData.side as number) * (0.35 + Math.sin(elapsed * 11) * 0.55);
    dTail.forEach((seg, i) => {
      seg.position.x = Math.sin(elapsed * 5 - i * 0.9) * 0.02 * (i + 1) * 0.5;
    });
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
      drawCaption(WORLDS[worldIdx].caption);
      renderer.render(scene, camera);
      return;
    }
    startTurn();
  };
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (fine && !reduced) window.addEventListener("pointermove", onPointer, { passive: true });
  renderer.domElement.addEventListener("click", onClick);

  /* ---------- render loop & lifecycle ---------- */

  const frame = () => {
    const dt = Math.min(clock.getDelta(), 0.05);
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
    (ray.material as THREE.MeshBasicMaterial).opacity = 0.06 + Math.sin(t * 1.7) * 0.02;
    gutterLight.intensity = 2.2 + Math.sin(t * 2.1) * 0.5;
    (halo.material as THREE.SpriteMaterial).opacity = 0.38 + Math.sin(t * 1.3) * 0.07;
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
    if (dragonMode !== "none") updateDragon();
    else if (t >= nextDragonAt && !document.hidden) {
      dragonMode = Math.random() < 0.45 ? "flight" : "peek";
      dragonStart = t;
      dragon.visible = true;
    }

    renderer.render(scene, camera);
    if (running) raf = requestAnimationFrame(frame);
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
    // One perfect still: world raised, caption set, soft light.
    renderer.render(scene, camera);
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
    renderer.dispose();
    renderer.domElement.remove();
  };
}
