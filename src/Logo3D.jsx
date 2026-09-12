import React, { useEffect, useRef, useState } from "react";

/**
 * Seat C — the AAE graffiti mark as a real extruded object.
 *
 * Fallback ladder, top rung first:
 *   1. three.js extruded sculpture (this file, loaded lazily)
 *   2. CSS 3D layered depth — stacked, progressively darkened copies of the
 *      flat art under a perspective tilt (no WebGL at all)
 *   3. the flat mark, static
 *
 * three.js is ~150KB gzipped, so it is NEVER in the main bundle: the CSS rung
 * renders immediately and `import("three")` only runs after load, on idle, and
 * only when WebGL actually works. Reduced motion stops at rung 3.
 */

const LOGO_SVG = "/art/logo.svg";
const LOGO_FLAT = "/art/logo.webp";

/** Cheap WebGL probe — a lost/!supported context should drop us to CSS. */
function webglOK() {
  try {
    const c = document.createElement("canvas");
    return Boolean(
      c.getContext("webgl2") ||
        c.getContext("webgl") ||
        c.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

export default function Logo3D({ className = "" }) {
  const hostRef = useRef(null);
  const canvasRef = useRef(null);
  const [mode, setMode] = useState("css"); // css | webgl
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarse =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: none)").matches;

  // ---- decide whether to climb to the WebGL rung ----
  useEffect(() => {
    // Coarse pointers stay on the CSS rung on purpose. There is no cursor to
    // track there, so WebGL would buy only the idle float — which CSS does for
    // free — in exchange for ~181KB and a parse on a throttled phone CPU.
    if (reduced || coarse || !webglOK()) return;
    const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 600));
    let cancelled = false;
    const arm = () => idle(() => !cancelled && setMode("webgl"), { timeout: 2500 });
    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", arm);
    };
  }, [reduced, coarse]);

  // ---- build the sculpture ----
  useEffect(() => {
    if (mode !== "webgl") return;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      const { SVGLoader } = await import("three/examples/jsm/loaders/SVGLoader.js");
      const { mergeGeometries } = await import(
        "three/examples/jsm/utils/BufferGeometryUtils.js"
      );
      if (disposed) return;

      const host = hostRef.current;
      const canvas = canvasRef.current;
      if (!host || !canvas) return;

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, 1, 1, 4000);

      const root = new THREE.Group();
      const spin = new THREE.Group(); // carries tilt; children carry their own float
      spin.add(root);
      scene.add(spin);

      const data = await new Promise((res, rej) =>
        new SVGLoader().load(LOGO_SVG, res, undefined, rej)
      );
      if (disposed) return;

      // group paths by fill so we get one mesh (one draw call) per brand colour
      const byColor = new Map();
      for (const path of data.paths) {
        const hex = (path.userData?.style?.fill || "#ffffff").toLowerCase();
        if (hex === "none") continue;
        const shapes = SVGLoader.createShapes(path);
        if (!byColor.has(hex)) byColor.set(hex, []);
        byColor.get(hex).push(...shapes);
      }

      // depth ~8% of the mark's height; bevel small and round for a puffy
      // sticker read rather than a sharp machine edge
      const bbox = new THREE.Box3();
      const tmp = [];
      for (const [hex, shapes] of byColor) {
        const geoms = shapes.map((sh) =>
          new THREE.ExtrudeGeometry(sh, {
            depth: 26,
            bevelEnabled: true,
            bevelThickness: 5,
            bevelSize: 4,
            bevelSegments: 3,
            curveSegments: 6,
          })
        );
        const merged = mergeGeometries(geoms, false);
        geoms.forEach((g) => g.dispose());
        if (!merged) continue;
        merged.computeVertexNormals();
        const mat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(hex),
          roughness: 0.5,
          metalness: 0.0,
        });
        const mesh = new THREE.Mesh(merged, mat);
        tmp.push({ hex, mesh });
        bbox.expandByObject(mesh);
      }

      // SVG y grows downward; flip and centre on origin
      const size = new THREE.Vector3();
      const center = new THREE.Vector3();
      bbox.getSize(size);
      bbox.getCenter(center);
      tmp.forEach(({ mesh }, i) => {
        mesh.position.set(-center.x, -center.y, 0);
        // tiny per-colour z-stagger so the mark has internal depth
        mesh.position.z += i * 4;
        mesh.userData.phase = Math.random() * Math.PI * 2;
        mesh.userData.baseZ = mesh.position.z;
        root.add(mesh);
      });
      root.scale.y = -1; // undo SVG's y-down

      // lighting: soft ambient + warm key from upper-left + faint cream rim
      scene.add(new THREE.AmbientLight(0xffffff, 1.35));
      const key = new THREE.DirectionalLight(0xffd9a0, 2.1);
      key.position.set(-420, 460, 620);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0xfff4df, 0.85);
      rim.position.set(360, -220, -260);
      scene.add(rim);

      const fit = () => {
        const w = host.clientWidth || 1;
        const h = host.clientHeight || 1;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        // frame the mark with a little air
        const dist = (size.y * 1.22) / (2 * Math.tan((camera.fov * Math.PI) / 360));
        camera.position.set(0, 0, Math.max(dist, size.x * 0.75));
        camera.updateProjectionMatrix();
      };
      fit();
      const ro = new ResizeObserver(fit);
      ro.observe(host);

      // ---- interaction ----
      const target = { x: 0, y: 0 };
      const cur = { x: 0, y: 0 };
      const MAX = (14 * Math.PI) / 180;
      const onMove = (e) => {
        const r = host.getBoundingClientRect();
        const nx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        const ny = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        target.y = Math.max(-1, Math.min(1, nx)) * MAX;
        target.x = Math.max(-1, Math.min(1, ny)) * MAX;
      };
      const onLeave = () => { target.x = 0; target.y = 0; };
      if (!coarse) {
        window.addEventListener("pointermove", onMove, { passive: true });
        host.addEventListener("pointerleave", onLeave);
      }

      // pause entirely when off-viewport
      let visible = true;
      const io = new IntersectionObserver(
        ([en]) => { visible = en.isIntersecting; },
        { threshold: 0.05 }
      );
      io.observe(host);

      let raf = 0;
      const t0 = performance.now();
      const tick = (now) => {
        raf = requestAnimationFrame(tick);
        if (!visible) return;
        const t = (now - t0) / 1000;
        // damped follow — lerp 0.06
        cur.x += (target.x - cur.x) * 0.06;
        cur.y += (target.y - cur.y) * 0.06;
        // idle sway ±3°, always present so the mark never sits dead
        const sway = (3 * Math.PI) / 180;
        spin.rotation.x = cur.x + Math.sin(t * 0.45) * sway * 0.5;
        spin.rotation.y = cur.y + Math.sin(t * 0.31) * sway;
        // independent micro-float per colour group, desynced
        root.children.forEach((m) => {
          m.position.z = m.userData.baseZ + Math.sin(t * 0.9 + m.userData.phase) * 2.5;
        });
        renderer.render(scene, camera);
      };
      raf = requestAnimationFrame(tick);

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        window.removeEventListener("pointermove", onMove);
        host.removeEventListener("pointerleave", onLeave);
        root.children.forEach((m) => {
          m.geometry.dispose();
          m.material.dispose();
        });
        renderer.dispose();
      };
    })().catch(() => {
      // any failure in the WebGL rung drops us back to CSS, silently
      if (!disposed) setMode("css");
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, [mode, coarse]);

  // Rung 2/3: stacked copies fake the extrusion under a perspective tilt.
  // Reduced motion renders the same stack with no tilt and no transition.
  const layers = reduced ? 1 : 7;

  return (
    <div ref={hostRef} className={"logo3d " + className} role="img" aria-label="All Aboard Earth">
      {mode === "webgl" ? (
        <canvas ref={canvasRef} className="logo3d-canvas" aria-hidden="true" />
      ) : (
        <div className={"logo3d-css" + (reduced ? " still" : "") + (coarse ? " drift" : "")} aria-hidden="true">
          {Array.from({ length: layers }).map((_, i) => (
            <img
              key={i}
              src={LOGO_FLAT}
              alt=""
              width="900"
              height="777"
              loading="eager"
              decoding="async"
              style={{
                "--d": i,
                filter: i === layers - 1 ? "none" : `brightness(${0.45 + i * 0.06})`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
