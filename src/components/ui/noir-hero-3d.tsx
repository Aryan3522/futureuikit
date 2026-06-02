/**
 * @registry-slug noir-hero-3d
 * @registry-name Noir Hero 3D
 * @registry-description A Future UI Noir Hero 3D component.
 * @registry-category ui
 * @registry-dependency @react-three/fiber @react-three/drei three
 */
"use client"

import * as React from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, MeshTransmissionMaterial, OrbitControls } from "@react-three/drei"
import * as THREE from "three"

function GeometricCore() {
  const outerRef = React.useRef<THREE.Mesh>(null!)
  
  useFrame((state, delta) => {
    outerRef.current.rotation.x += delta * 0.15
    outerRef.current.rotation.y += delta * 0.2
    outerRef.current.rotation.z += delta * 0.1
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      {/* Outer Premium Glass Shell */}
      <mesh ref={outerRef}>
        <torusKnotGeometry args={[1.6, 0.6, 256, 64]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={2}
          thickness={1.5}
          chromaticAberration={0.06}
          anisotropicBlur={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={3}
          resolution={1024}
          distortion={0.2}
          distortionScale={0.3}
          temporalDistortion={0.1}
          color="#e0d4ff"
        />
      </mesh>
    </Float>
  )
}

export function NoirHero3D({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
        style={{ overflow: 'visible' }}
      >
        <React.Suspense fallback={null}>
          <OrbitControls enableZoom={false} enablePan={false} />
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 10]} intensity={2} color="#8b5cf6" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#c6c6c6" />
          <GeometricCore />
          <Environment preset="city" />
        </React.Suspense>
      </Canvas>
    </div>
  )
}
