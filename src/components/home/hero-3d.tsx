"use client";

import React from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";

/**
 * Procedural 3D centerpiece — zero asset downloads. A liquid-metal core,
 * counter-rotating wireframe shell, orbital rings, and a particle field.
 * Reacts to the pointer and pauses rendering when scrolled out of view.
 */

/* ---------------------------------- scene --------------------------------- */

const PARTICLE_COUNT = 500;

// Deterministic PRNG (mulberry32) — pure, so particle layout is stable
// across renders and safe to call during render.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildParticlePositions() {
  const rand = mulberry32(20260726);
  const arr = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    // Shell distribution between two radii for depth
    const r = 2.6 + rand() * 1.8;
    const theta = rand() * Math.PI * 2;
    const phi = Math.acos(2 * rand() - 1);
    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
    arr[i * 3 + 2] = r * Math.cos(phi);
  }
  return arr;
}

function Particles() {
  const ref = React.useRef<THREE.Points>(null);
  const positions = React.useMemo(() => buildParticlePositions(), []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#a78bfa"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function Core() {
  const group = React.useRef<THREE.Group>(null);
  const shell = React.useRef<THREE.Mesh>(null);
  const ringA = React.useRef<THREE.Mesh>(null);
  const ringB = React.useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const { pointer } = state;
    if (group.current) {
      // Ease toward pointer for a weighty, premium parallax
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.45, 0.04);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.y * 0.3, 0.04);
    }
    if (shell.current) {
      shell.current.rotation.y -= delta * 0.12;
      shell.current.rotation.z += delta * 0.05;
    }
    if (ringA.current) ringA.current.rotation.z += delta * 0.18;
    if (ringB.current) ringB.current.rotation.z -= delta * 0.12;
  });

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.9}>
        {/* Liquid-metal core */}
        <mesh>
          <icosahedronGeometry args={[1.35, 24]} />
          <MeshDistortMaterial
            color="#17131f"
            emissive="#6d28d9"
            emissiveIntensity={0.28}
            roughness={0.18}
            metalness={0.92}
            distort={0.34}
            speed={1.6}
          />
        </mesh>

        {/* Counter-rotating wireframe shell */}
        <mesh ref={shell} scale={1.55}>
          <icosahedronGeometry args={[1.35, 1]} />
          <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.14} />
        </mesh>

        {/* Orbital rings */}
        <mesh ref={ringA} rotation={[Math.PI / 2.2, 0.4, 0]}>
          <torusGeometry args={[2.35, 0.008, 8, 96]} />
          <meshBasicMaterial color="#a78bfa" transparent opacity={0.5} />
        </mesh>
        <mesh ref={ringB} rotation={[Math.PI / 1.8, -0.5, 0.6]}>
          <torusGeometry args={[2.7, 0.005, 8, 96]} />
          <meshBasicMaterial color="#6d28d9" transparent opacity={0.35} />
        </mesh>
      </Float>
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

/* --------------------------- CSS fallback (cheap) -------------------------- */

/** Pure-CSS orb for low-end devices and reduced-motion users. */
function FallbackOrb() {
  return (
    <div className="relative h-full w-full flex items-center justify-center" aria-hidden="true">
      <div className="relative h-64 w-64 md:h-80 md:w-80">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(167,139,250,0.55),rgba(109,40,217,0.25)_45%,transparent_70%)] blur-[2px]" />
        <div className="absolute inset-6 rounded-full bg-[radial-gradient(circle_at_60%_65%,rgba(23,19,31,0.9),rgba(109,40,217,0.3))] border border-white/10" />
        <div className="absolute -inset-4 rounded-full border border-violet-500/25 motion-safe:animate-[spin_24s_linear_infinite]" style={{ transform: "rotateX(70deg)" }} />
        <div className="absolute -inset-10 rounded-full border border-violet-500/15 motion-safe:animate-[spin_36s_linear_infinite_reverse]" style={{ transform: "rotateX(70deg)" }} />
      </div>
    </div>
  );
}

/* --------------------------------- export --------------------------------- */

export function Hero3D({ className }: { className?: string }) {
  const capability = useDeviceCapability();
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [inView, setInView] = React.useState(true);

  // Stop rendering entirely once the hero is scrolled away.
  React.useEffect(() => {
    const el = wrapperRef.current;
    if (!el || capability !== "full") return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [capability]);

  return (
    <div ref={wrapperRef} className={className} aria-hidden="true">
      {capability === "full" ? (
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 6.5], fov: 42 }}
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
          frameloop={inView ? "always" : "never"}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.35} />
          <directionalLight position={[4, 6, 5]} intensity={1.4} color="#c4b5fd" />
          <pointLight position={[-6, -3, -4]} intensity={12} color="#6d28d9" />
          <pointLight position={[5, -2, 3]} intensity={6} color="#38bdf8" />
          <Core />
          <Particles />
        </Canvas>
      ) : capability === "fallback" ? (
        <FallbackOrb />
      ) : null}
    </div>
  );
}

export default Hero3D;
