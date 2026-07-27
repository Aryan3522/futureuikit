"use client";

/* eslint-disable react-hooks/immutability -- useFrame is an imperative
   per-frame animation callback (react-three-fiber); it mutates three.js
   objects and a shared ref by design. */

import React from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";

/**
 * The homepage's persistent 3D backbone. One fixed canvas sits behind the
 * entire page; a crystalline core (liquid-metal blob + wireframe shell +
 * orbital rings + particle field) travels, recolors, and reshapes itself as
 * the user scrolls between journey chapters, and leans toward the pointer.
 *
 * Everything is procedural — zero asset downloads — and the whole scene is
 * skipped on low-end devices in favour of a pure-CSS orb.
 */

/* ------------------------------ chapter states ----------------------------- */

interface ChapterState {
  /** Core group position. */
  x: number;
  y: number;
  scale: number;
  /** MeshDistortMaterial distortion 0..1 */
  distort: number;
  /** Emissive + accent color */
  color: string;
  emissive: number;
  /** Wireframe shell opacity */
  wire: number;
  /** Particle spread multiplier */
  spread: number;
  /** Overall canvas opacity (lets the car showcase own the screen) */
  opacity: number;
  /** Idle spin speed */
  spin: number;
}

const CHAPTERS: Record<string, ChapterState> = {
  hero:      { x: 0,    y: 0,    scale: 1.0,  distort: 0.34, color: "#6d28d9", emissive: 0.30, wire: 0.14, spread: 1.0, opacity: 1,    spin: 0.10 },
  ritual:    { x: 2.4,  y: 0.2,  scale: 0.62, distort: 0.18, color: "#0284c7", emissive: 0.45, wire: 0.30, spread: 0.7, opacity: 0.9,  spin: 0.25 },
  arsenal:   { x: 0,    y: -3.5, scale: 0.4,  distort: 0.1,  color: "#0284c7", emissive: 0.2,  wire: 0.05, spread: 0.4, opacity: 0,    spin: 0.05 },
  numbers:   { x: 0,    y: 0.3,  scale: 0.55, distort: 0.55, color: "#10b981", emissive: 0.5,  wire: 0.08, spread: 2.2, opacity: 0.85, spin: 0.18 },
  craft:     { x: -2.4, y: 0,    scale: 0.75, distort: 0.28, color: "#f59e0b", emissive: 0.35, wire: 0.22, spread: 1.0, opacity: 0.9,  spin: 0.12 },
  people:    { x: 0,    y: 0.4,  scale: 1.25, distort: 0.42, color: "#e11d48", emissive: 0.22, wire: 0.10, spread: 1.4, opacity: 0.5,  spin: 0.06 },
  answers:   { x: 2.2,  y: -0.2, scale: 0.5,  distort: 0.15, color: "#475569", emissive: 0.3,  wire: 0.25, spread: 0.6, opacity: 0.65, spin: 0.08 },
  beginning: { x: 0,    y: 0,    scale: 1.15, distort: 0.5,  color: "#7c3aed", emissive: 0.6,  wire: 0.18, spread: 1.6, opacity: 1,    spin: 0.20 },
};

const CHAPTER_ORDER = Object.keys(CHAPTERS);

/** Shared mutable target the scroll handler writes and useFrame reads. */
interface JourneyTarget {
  state: ChapterState;
  /** 0..1 blend toward the NEXT chapter for smooth cross-section morphs. */
  pointer: { x: number; y: number };
  burst: number;
}

/* ------------------------------- deterministic ------------------------------ */

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const PARTICLE_COUNT = 650;

function buildParticles() {
  const rand = mulberry32(116);
  const arr = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const r = 2.4 + rand() * 2.2;
    const theta = rand() * Math.PI * 2;
    const phi = Math.acos(2 * rand() - 1);
    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.55;
    arr[i * 3 + 2] = r * Math.cos(phi);
  }
  return arr;
}

/* --------------------------------- scene ---------------------------------- */

// Scratch color shared by the single scene instance — avoids per-frame
// allocation without tripping the compiler's memo-immutability rule.
const scratchColor = new THREE.Color();

function JourneyScene({ target }: { target: React.RefObject<JourneyTarget> }) {
  const group = React.useRef<THREE.Group>(null);
  const inner = React.useRef<THREE.Group>(null);
  const shell = React.useRef<THREE.Mesh>(null);
  const ringA = React.useRef<THREE.Mesh>(null);
  const ringB = React.useRef<THREE.Mesh>(null);
  const points = React.useRef<THREE.Points>(null);
  const coreMat = React.useRef<React.ComponentRef<typeof MeshDistortMaterial> | null>(null);
  const positions = React.useMemo(() => buildParticles(), []);

  useFrame((state, delta) => {
    const t = target.current;
    if (!t || !group.current) return;
    const s = t.state;
    const k = 2.4;
    const tmpColor = scratchColor;

    // Position / scale toward the active chapter
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, s.x, k, delta);
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, s.y, k, delta);
    const burst = 1 + t.burst * 0.25;
    const sc = THREE.MathUtils.damp(group.current.scale.x, s.scale * burst, k, delta);
    group.current.scale.setScalar(sc);
    target.current.burst = Math.max(0, t.burst - delta * 1.6);

    // Pointer lean (weighty, damped)
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, t.pointer.x * 0.5, 1.8, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -t.pointer.y * 0.32, 1.8, delta);

    // Idle spin + float
    if (inner.current) {
      inner.current.rotation.y += delta * s.spin;
      inner.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.12;
    }
    if (shell.current) {
      shell.current.rotation.y -= delta * (s.spin + 0.06);
      shell.current.rotation.z += delta * 0.04;
      const mat = shell.current.material as THREE.MeshBasicMaterial;
      mat.opacity = THREE.MathUtils.damp(mat.opacity, s.wire, k, delta);
      mat.color.lerp(tmpColor.set(s.color), delta * 2);
    }
    if (ringA.current) ringA.current.rotation.z += delta * 0.16;
    if (ringB.current) ringB.current.rotation.z -= delta * 0.1;

    // Material morph
    if (coreMat.current) {
      coreMat.current.distort = THREE.MathUtils.damp(coreMat.current.distort, s.distort, k, delta);
      coreMat.current.emissiveIntensity = THREE.MathUtils.damp(coreMat.current.emissiveIntensity, s.emissive, k, delta);
      coreMat.current.emissive.lerp(tmpColor.set(s.color), delta * 2);
    }

    // Particle spread + slow orbit
    if (points.current) {
      points.current.rotation.y += delta * 0.03;
      const psc = THREE.MathUtils.damp(points.current.scale.x, s.spread, k, delta);
      points.current.scale.setScalar(psc);
      const pm = points.current.material as THREE.PointsMaterial;
      pm.color.lerp(tmpColor.set(s.color).offsetHSL(0, 0, 0.25), delta * 2);
    }
  });

  return (
    <group ref={group}>
      <group ref={inner}>
        <mesh>
          <icosahedronGeometry args={[1.35, 24]} />
          <MeshDistortMaterial
            ref={coreMat}
            color="#17131f"
            emissive="#6d28d9"
            emissiveIntensity={0.3}
            roughness={0.18}
            metalness={0.92}
            distort={0.34}
            speed={1.6}
          />
        </mesh>
        <mesh ref={shell} scale={1.55}>
          <icosahedronGeometry args={[1.35, 1]} />
          <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.14} />
        </mesh>
        <mesh ref={ringA} rotation={[Math.PI / 2.2, 0.4, 0]}>
          <torusGeometry args={[2.35, 0.008, 8, 96]} />
          <meshBasicMaterial color="#a78bfa" transparent opacity={0.45} />
        </mesh>
        <mesh ref={ringB} rotation={[Math.PI / 1.8, -0.5, 0.6]}>
          <torusGeometry args={[2.7, 0.005, 8, 96]} />
          <meshBasicMaterial color="#6d28d9" transparent opacity={0.3} />
        </mesh>
      </group>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.02} color="#a78bfa" transparent opacity={0.55} sizeAttenuation depthWrite={false} />
      </points>
    </group>
  );
}

/* ------------------------------ device gating ------------------------------ */

type Capability = "pending" | "full" | "fallback";

function useDeviceCapability(): Capability {
  const [capability, setCapability] = React.useState<Capability>("pending");
  React.useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nav = navigator as Navigator & { deviceMemory?: number };
    const lowMemory = nav.deviceMemory !== undefined && nav.deviceMemory <= 4;
    const lowCpu = navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 3;
    const noWebGL = (() => {
      try {
        const canvas = document.createElement("canvas");
        return !(canvas.getContext("webgl2") || canvas.getContext("webgl"));
      } catch {
        return true;
      }
    })();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCapability(reduced || lowMemory || lowCpu || noWebGL ? "fallback" : "full");
  }, []);
  return capability;
}

/* ---------------------------- CSS fallback orb ----------------------------- */

function FallbackOrb({ style }: { style?: React.CSSProperties }) {
  return (
    <div className="flex items-center justify-center h-full w-full" style={style} aria-hidden="true">
      <div className="relative h-64 w-64 md:h-80 md:w-80">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(167,139,250,0.55),rgba(109,40,217,0.25)_45%,transparent_70%)] blur-[2px]" />
        <div className="absolute inset-6 rounded-full bg-[radial-gradient(circle_at_60%_65%,rgba(23,19,31,0.9),rgba(109,40,217,0.3))] border border-white/10" />
        <div className="absolute -inset-4 rounded-full border border-violet-500/25 motion-safe:animate-[spin_24s_linear_infinite]" style={{ transform: "rotateX(70deg)" }} />
        <div className="absolute -inset-10 rounded-full border border-violet-500/15 motion-safe:animate-[spin_36s_linear_infinite_reverse]" style={{ transform: "rotateX(70deg)" }} />
      </div>
    </div>
  );
}

/* --------------------------------- export ---------------------------------- */

export function Journey3D() {
  const capability = useDeviceCapability();
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const targetRef = React.useRef<JourneyTarget>({
    state: { ...CHAPTERS.hero },
    pointer: { x: 0, y: 0 },
    burst: 0,
  });
  const [running, setRunning] = React.useState(true);

  // Scroll → active chapter. Sections declare themselves with
  // [data-journey="<chapter>"]; the one nearest the viewport center wins.
  React.useEffect(() => {
    if (capability !== "full") return;
    const wrapper = wrapperRef.current;
    let raf = 0;
    let lastChapter = "hero";

    const update = () => {
      const sections = document.querySelectorAll<HTMLElement>("[data-journey]");
      const mid = window.innerHeight / 2;
      let best: { name: string; dist: number } | null = null;
      sections.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -window.innerHeight || rect.top > window.innerHeight * 2) return;
        const center = rect.top + rect.height / 2;
        // Sections taller than the viewport count as "centered" while any
        // part of them covers the middle of the screen.
        const dist = rect.top <= mid && rect.bottom >= mid ? 0 : Math.abs(center - mid);
        if (!best || dist < best.dist) best = { name: el.dataset.journey || "hero", dist };
      });
      const next = best ? (best as { name: string }).name : lastChapter;
      if (CHAPTERS[next]) {
        if (next !== lastChapter) {
          targetRef.current.burst = 1; // small scale pulse on chapter change
          lastChapter = next;
        }
        targetRef.current.state = CHAPTERS[next];
      }
      // Fade the canvas at the DOM level too (cheaper than material opacity)
      if (wrapper) wrapper.style.opacity = String(targetRef.current.state.opacity);
      // Suspend the frameloop entirely while the showcase owns the screen
      setRunning(targetRef.current.state.opacity > 0.01);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    const onPointerMove = (e: PointerEvent) => {
      targetRef.current.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetRef.current.pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(raf);
    };
  }, [capability]);

  // Fallback: CSS orb pinned behind the hero only.
  const [fallbackOpacity, setFallbackOpacity] = React.useState(1);
  React.useEffect(() => {
    if (capability !== "fallback") return;
    const onScroll = () => {
      const fade = 1 - Math.min(1, window.scrollY / (window.innerHeight * 0.8));
      setFallbackOpacity(fade);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [capability]);

  if (capability === "pending") return null;

  if (capability === "fallback") {
    return (
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ opacity: fallbackOpacity, display: fallbackOpacity <= 0.01 ? "none" : undefined }}
        aria-hidden="true"
      >
        <FallbackOrb />
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-300"
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6.5], fov: 42 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        frameloop={running ? "always" : "never"}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 6, 5]} intensity={1.4} color="#c4b5fd" />
        <pointLight position={[-6, -3, -4]} intensity={12} color="#6d28d9" />
        <pointLight position={[5, -2, 3]} intensity={6} color="#38bdf8" />
        <JourneyScene target={targetRef} />
      </Canvas>
    </div>
  );
}

export default Journey3D;
