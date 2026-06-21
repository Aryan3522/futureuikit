"use client";

/**
 * @registry-slug automotive-carousel
 * @registry-name Automotive Carousel
 * @registry-description A Future UI Automotive Carousel component.
 * @registry-category ui
 * @registry-type components:ui
 * @registry-dependency framer-motion three @react-three/fiber @react-three/drei
 */

import React, { useState, useEffect, useRef, Suspense, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ContactShadows, useGLTF, Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BasicLoader } from "@/components/ui/basic-loader";

// ─────────────────────────────────────────────────────────────────────────────
// PRELOAD MODELS
// ─────────────────────────────────────────────────────────────────────────────
try {
  useGLTF.preload("/models/m4.glb");
} catch (_) { }

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
interface SlideTarget {
  camPos: [number, number, number];
  camTarget: [number, number, number];
  align: "left" | "center" | "right";
}

// ─────────────────────────────────────────────────────────────────────────────
// AutoFitModel
//
// The ENTIRE scaling strategy is:
//   1. Compute tight bounding SPHERE from visible meshes only
//   2. On every frame, use basic trigonometry to compute the EXACT scale
//      that makes the sphere fill 95% of the viewport
//   3. No feedback loops. No convergence delays. Analytically perfect.
//
// Why bounding sphere?
//   It is ROTATION-INVARIANT. No matter how the model rotates,
//   the sphere radius stays the same. So the object never suddenly
//   shrinks or grows when it turns — it stays massive.
// ─────────────────────────────────────────────────────────────────────────────
const AutoFitModel = React.memo(function AutoFitModel({
  url,
  annotations = [],
  isMobile
}: {
  url: string;
  annotations?: Annotation[];
  isMobile: boolean;
}) {
  const { scene } = useGLTF(url);

  const { mesh, scaleFactor } = useMemo(() => {
    const cloned = scene.clone(true);
    const box = new THREE.Box3();
    cloned.updateMatrixWorld(true);
    cloned.traverse((node) => {
      if (node instanceof THREE.Mesh && node.geometry) {
        node.geometry.computeBoundingBox();
        if (node.geometry.boundingBox) {
          const b = node.geometry.boundingBox.clone();
          b.applyMatrix4(node.matrixWorld);
          box.union(b);
        }
      }
    });
    if (box.isEmpty()) box.setFromObject(cloned);

    const rSize = new THREE.Vector3();
    const rCenter = new THREE.Vector3();
    box.getSize(rSize);
    box.getCenter(rCenter);

    // Trust native X symmetry
    rCenter.x = 0;
    cloned.position.sub(rCenter);

    // Ground it perfectly on Y=0
    cloned.position.y += rSize.y / 2;

    // Scale so the longest side is ~4.5 units (perfect for cars)
    const maxDim = Math.max(rSize.x, rSize.y, rSize.z);
    const scale = 4.5 / maxDim;

    return { mesh: cloned, scaleFactor: scale };
  }, [scene]);

  return (
    <>
      <group scale={scaleFactor}>
        <primitive object={mesh} />
      </group>

      {/* Annotations rendered OUTSIDE the scaled group so they position correctly in world space! */}
      {annotations.map((ann, i) => {
        // Shorter stalk heights to keep labels from obscuring interior screens
        const stalkHeight = isMobile ? (15 + (i % 3) * 10) : (25 + (i % 3) * 15);

        return (
          <Html
            key={ann.id || i}
            position={[ann.position[0], ann.position[1], ann.position[2]]}
            center
          // Remove distanceFactor to rely purely on CSS for consistent sizing control
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="flex flex-col items-center pointer-events-none select-none"
              style={{ paddingBottom: stalkHeight }}
            >
              {/* Fluid Label - Scales between 10px and 14px based on viewport */}
              <div
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600/95 backdrop-blur-md border border-blue-400/50 rounded-full text-white whitespace-nowrap shadow-[0_4px_20px_rgba(0,0,0,0.4)] font-bold tracking-wide transition-all duration-500"
                style={{
                  fontSize: 'clamp(10px, 1.2vw, 14px)',
                  lineHeight: '1.2'
                }}
              >
                {ann.label}
              </div>

              {/* Original Stalk Style - Vertical and Clean (Shortened) */}
              <div
                className="w-px bg-linear-to-b from-blue-400/80 to-transparent mt-1 origin-bottom"
                style={{ height: stalkHeight }}
              />

              {/* Original Point (Dot) - Responsive Size */}
              <div
                className="rounded-full bg-blue-400 animate-pulse shadow-[0_0_15px_rgba(59,130,246,1)]"
                style={{
                  width: 'clamp(6px, 0.8vw, 10px)',
                  height: 'clamp(6px, 0.8vw, 10px)'
                }}
              />
            </motion.div>
          </Html>
        );
      })}
    </>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// CameraRig
// ─────────────────────────────────────────────────────────────────────────────
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

function CameraRig({ target, layout, isMobile }: { target: SlideTarget; layout: number; isMobile: boolean }) {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const userInteracted = useRef(false);

  useEffect(() => {
    userInteracted.current = false;
  }, [target]);

  useFrame((state, delta) => {
    if (!controlsRef.current || userInteracted.current) return;

    const camera = state.camera;
    const k = 3.2; // Faster, punchier damping for a more premium feel

    // Target FOV: Wide enough for dashboard on desktop (75), ultra-wide for mobile interior
    const targetFov = isMobile
      ? (layout === 1 ? 95 : layout === 2 ? 110 : 75)
      : (layout === 1 ? 75 : 65);

    if (camera instanceof THREE.PerspectiveCamera) {
      if (Math.abs(camera.fov - targetFov) > 0.01) {
        camera.fov = THREE.MathUtils.damp(camera.fov, targetFov, k, delta);
        camera.updateProjectionMatrix();
      }
    }

    const currentRadius = camera.position.length();
    const targetVector = new THREE.Vector3(target.camPos[0], target.camPos[1], target.camPos[2]);
    const targetRadius = targetVector.length();

    // STRICT INTERIOR LOCK: 
    // If BOTH current and target are inside the cabin (radius < 2.2),
    // force pure linear damping to prevent ANY spherical sweeping over the roof.
    const isCurrentlyInside = currentRadius < 2.2;
    const isTargetInside = targetRadius < 2.2;

    if (isCurrentlyInside && isTargetInside) {
      camera.position.x = THREE.MathUtils.damp(camera.position.x, target.camPos[0], k, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, target.camPos[1], k, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, target.camPos[2], k, delta);
    } else {
      // Spherical Interpolation for transitions involving the exterior
      const currentSpherical = new THREE.Spherical().setFromVector3(camera.position);
      const targetSpherical = new THREE.Spherical().setFromVector3(targetVector);

      let dTheta = targetSpherical.theta - currentSpherical.theta;
      // Normalize shortest path for rotation to prevent wild spinning
      while (dTheta > Math.PI) dTheta -= Math.PI * 2;
      while (dTheta < -Math.PI) dTheta += Math.PI * 2;

      currentSpherical.radius = THREE.MathUtils.damp(currentSpherical.radius, targetSpherical.radius, k, delta);
      currentSpherical.phi = THREE.MathUtils.damp(currentSpherical.phi, targetSpherical.phi, k, delta);
      currentSpherical.theta = THREE.MathUtils.damp(currentSpherical.theta, currentSpherical.theta + dTheta, k, delta);

      camera.position.setFromSpherical(currentSpherical);
    }

    controlsRef.current.target.x = THREE.MathUtils.damp(controlsRef.current.target.x, target.camTarget[0], k, delta);
    controlsRef.current.target.y = THREE.MathUtils.damp(controlsRef.current.target.y, target.camTarget[1], k, delta);
    controlsRef.current.target.z = THREE.MathUtils.damp(controlsRef.current.target.z, target.camTarget[2], k, delta);

    controlsRef.current.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enablePan={false}
      enableZoom
      enableDamping
      dampingFactor={0.08}
      minDistance={1}
      maxDistance={8}
      onStart={() => {
        userInteracted.current = true;
      }}
    />
  );
}

function CanvasLoader() {
  return (
    <Html center>
      <div className="pointer-events-none">
        <BasicLoader />
      </div>
    </Html>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Scene
// ─────────────────────────────────────────────────────────────────────────────
function Scene({
  url,
  target,
  annotations,
  layout,
  isMobile
}: {
  url: string;
  target: SlideTarget;
  annotations?: Annotation[];
  layout: number;
  isMobile: boolean;
}) {
  return (
    <>
      <CameraRig target={target} layout={layout} isMobile={isMobile} />

      <ambientLight intensity={0.6} />
      <directionalLight position={[15, 20, 15]} intensity={2.5} castShadow />
      <directionalLight position={[-15, 10, -15]} intensity={1.0} color="#aaccff" />
      <directionalLight position={[0, 30, -10]} intensity={1.5} color="#ffffff" />

      <Environment
        files="/hdr/kloppenheim_06_1k.hdr"
        background
        ground={{ height: 1.5, radius: 20, scale: 20 }}
      />

      <Suspense fallback={<CanvasLoader />}>
        <AutoFitModel
          url={url}
          annotations={annotations}
          isMobile={isMobile}
        />
      </Suspense>

      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.6}
        scale={15}
        blur={2.5}
        far={4}
      />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────
export interface Annotation {
  id: string;
  position: [number, number, number];
  label: string;
}

export interface CarouselSlide {
  id: string | number;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  annotations?: Annotation[];
}

export interface AutomotiveCarouselProps {
  slides: CarouselSlide[];
  className?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// AutomotiveCarousel
// ─────────────────────────────────────────────────────────────────────────────
export const AutomotiveCarousel = ({ slides, className }: AutomotiveCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const checkMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 150);
    };
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
      clearTimeout(timeoutId);
    };
  }, []);

  const go = useCallback((d: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((p) => (p + d + slides.length) % slides.length);
  }, [isAnimating, slides.length]);

  useEffect(() => {
    if (!isAnimating) return;
    const t = setTimeout(() => setIsAnimating(false), 900);
    return () => clearTimeout(t);
  }, [isAnimating]);



  // ── Slide targets: align determines where the object anchors ───────────
  const layout = currentIndex % 4;
  const targets: SlideTarget[] = [
    // 1: Exterior 3/4 Front
    { camPos: [3.5, 1.2, 4.0], camTarget: [0, 0.5, 0], align: "center" },
    // 2: Dashboard (Interior view, ultra-wide angle, shifted right)
    {
      camPos: isMobile ? [0.35, 0.85, -0.35] : [0.15, 0.8, 0.05],
      camTarget: isMobile ? [-0.25, 0.6, 0.8] : [-0.1, 0.65, 0.8],
      align: "right"
    },
    // 3: Seats (Interior view looking back - Reverted to Original)
    {
      camPos: [-0.4, 1.0, 0.4],
      camTarget: [0.1, 0.75, -0.2],
      align: "left"
    },
    // 4: Rear 3/4 Low Angle
    { camPos: [-3.0, 0.8, -4.5], camTarget: [0, 0.5, -2], align: "right" },
  ];
  const currentTarget = targets[layout];

  // ── Text alignment helper ───────────
  const getTextAlign = (align: "left" | "right" | "center") => {
    return align === "left"
      ? "items-center sm:items-end justify-end sm:justify-center text-center sm:text-right px-4 sm:pr-20 sm:pl-0 pb-32 sm:pb-0 sm:pt-12"
      : align === "right"
        ? "items-center sm:items-start justify-end sm:justify-center text-center sm:text-left px-4 sm:pl-20 sm:pr-0 pb-32 sm:pb-0 sm:pt-12"
        : "items-center justify-end text-center px-4 pb-32 sm:pb-36";
  };

  const getOverlayGradient = (align?: string) => {
    return align === "right"
      ? "bg-gradient-to-t sm:bg-gradient-to-l from-black/90 via-black/40 to-transparent w-full sm:w-3/4 h-[65%] sm:h-full absolute bottom-0 sm:right-0 sm:inset-y-0"
      : align === "left"
        ? "bg-gradient-to-t sm:bg-gradient-to-r from-black/90 via-black/40 to-transparent w-full sm:w-3/4 h-[65%] sm:h-full absolute bottom-0 sm:left-0 sm:inset-y-0"
        : "bg-gradient-to-t from-black/95 via-black/50 to-transparent h-[65%] sm:h-[70%] absolute bottom-0 inset-x-0";
  };

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden bg-background select-none @container",
        className
      )}
    >
      {/* ── Background ────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-linear-to-b from-foreground/5 via-background to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_30%,rgba(30,30,60,0.2),transparent)]" />

      {/* ── Text (z-30 — ON TOP of the 3D model) ──────── */}
      <div className="absolute inset-0 z-30" style={{ pointerEvents: "none" }}>
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            className={cn("absolute inset-0 flex flex-col", getTextAlign(currentTarget.align))}
            initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(12px)" }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
          >
            {/* Premium Dark Gradient Overlay behind text */}
            <div className={cn("absolute z-[-1] pointer-events-none", getOverlayGradient(currentTarget.align))} />

            <div className="relative z-10 max-w-3xl">
              {slides[currentIndex].title && (
                <h2 className="text-[clamp(2.25rem,8cqw,5.5rem)] font-black text-white tracking-tighter leading-[1.05] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
                  {slides[currentIndex].title}
                </h2>
              )}
              {slides[currentIndex].description && (
                <p className="mt-[clamp(0.75rem,2.5cqw,1.5rem)] text-[clamp(1rem,3cqw,1.5rem)] text-white/80 font-medium tracking-tight leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                  {slides[currentIndex].description}
                </p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── WebGL Canvas (z-20 — ON TOP of text) ─────────────────────────── */}
      <div className="absolute inset-0 z-20" style={{ pointerEvents: "none" }}>
        <Canvas
          dpr={[1, 1.5]}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2,
          }}
          // Dynamic base FOV for mobile
          camera={{ position: [0, 1.2, 4], fov: isMobile ? 70 : 65 }}
          style={{ width: "100%", height: "100%", background: "transparent" }}
        >
          <Scene
            url={"/models/m4.glb"}
            target={currentTarget}
            annotations={slides[currentIndex].annotations}
            layout={layout}
            isMobile={isMobile}
          />
        </Canvas>
      </div>

      {/* ── Slide indicators (z-40) ─────────────────────────────────── */}
      <div
        className="absolute inset-0 z-40 pointer-events-none"
      >
        {/* Minimal pill indicator */}
        <div className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2.5 pointer-events-none">
          {slides.map((_, idx) => (
            <div
              key={idx}
              className={cn(
                "h-1 rounded-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
                idx === currentIndex ? "w-8 sm:w-10 bg-foreground" : "w-2 sm:w-2.5 bg-foreground/20"
              )}
            />
          ))}
        </div>
      </div>

      {/* ── Navigation Buttons (z-50) ────────────────────────────────────── */}
      <div className="absolute bottom-6 sm:bottom-8 right-6 sm:right-8 z-50 flex items-center gap-3 sm:gap-4">
        <button
          onClick={() => go(-1)}
          className="p-3 sm:p-4 rounded-full bg-background/10 border border-border/20 hover:bg-background/20 backdrop-blur-md text-foreground transition-all active:scale-95"
          aria-label="Previous slide"
        >
          <ChevronLeft size={isMobile ? 20 : 24} />
        </button>
        <button
          onClick={() => go(1)}
          className="p-3 sm:p-4 rounded-full bg-background/10 border border-border/20 hover:bg-background/20 backdrop-blur-md text-foreground transition-all active:scale-95"
          aria-label="Next slide"
        >
          <ChevronRight size={isMobile ? 20 : 24} />
        </button>
      </div>
    </div>
  );
};
