/**
 * @registry-slug icon-cloud
 * @registry-name Icon Cloud
 * @registry-description A standard Icon Cloud component.
 * @registry-category ui
 * @registry-type components:ui
 */
"use client";

import React, { useEffect, useRef, useState, useMemo } from "react"
import { renderToString } from "react-dom/server"
import { cn } from "@/lib/utils";

export type IconCloudColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type IconCloudShape = "default" | "square" | "rounded" | "sharp";
export type IconCloudSpacing = "default" | "2x" | "4x" | "6x" | "8x";

export interface IconCloudProps {
  icons?: React.ReactNode[];
  images?: string[];
  count?: number;
  color?: IconCloudColor;
  shape?: IconCloudShape;
  spacing?: IconCloudSpacing;
  className?: string;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

const colorThemeMap: Record<IconCloudColor, { hex: string, bgHex: string }> = {
  default: { hex: "#18181b", bgHex: "rgba(24, 24, 27, 0.1)" }, // Overridden dynamically based on dark mode
  blue: { hex: "#2563eb", bgHex: "rgba(37, 99, 235, 0.15)" },
  emerald: { hex: "#16a34a", bgHex: "rgba(22, 163, 74, 0.15)" },
  rose: { hex: "#e11d48", bgHex: "rgba(225, 29, 72, 0.15)" },
  amber: { hex: "#d97706", bgHex: "rgba(217, 119, 6, 0.15)" },
  violet: { hex: "#7c3aed", bgHex: "rgba(124, 58, 237, 0.15)" },
  indigo: { hex: "#4f46e5", bgHex: "rgba(79, 70, 229, 0.15)" },
  sky: { hex: "#0284c7", bgHex: "rgba(2, 132, 199, 0.15)" },
  slate: { hex: "#475569", bgHex: "rgba(71, 85, 105, 0.15)" },
  orange: { hex: "#ea580c", bgHex: "rgba(234, 88, 12, 0.15)" },
};

const getCanvasSize = (spacing: IconCloudSpacing) => {
  switch (spacing) {
    case "2x": return 250;
    case "4x": return 300;
    case "6x": return 350;
    case "8x": return 450;
    default: return 400;
  }
};

const applyShapeToCanvas = (ctx: CanvasRenderingContext2D, shape: IconCloudShape, x: number, y: number, size: number) => {
  const radius = size / 2;
  ctx.beginPath();
  switch (shape) {
    case "square":
      ctx.rect(x, y, size, size);
      break;
    case "sharp":
      if (ctx.roundRect) {
        ctx.roundRect(x, y, size, size, 4);
      } else {
        ctx.rect(x, y, size, size);
      }
      break;
    case "rounded":
      if (ctx.roundRect) {
        ctx.roundRect(x, y, size, size, Math.max(2, size * 0.25));
      } else {
        ctx.rect(x, y, size, size);
      }
      break;
    case "default":
      ctx.arc(x + radius, y + radius, radius, 0, Math.PI * 2);
      break;
  }
  ctx.closePath();
}

export default function IconCloud({
  icons,
  images,
  count,
  color = "default",
  shape = "default",
  spacing = "default",
  className
}: IconCloudProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [iconPositions, setIconPositions] = useState<any[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 })
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [targetRotation, setTargetRotation] = useState<any>(null)
  const animationFrameRef = useRef(0)
  const rotationRef = useRef({ x: 0, y: 0 })
  const iconCanvasesRef = useRef<any[]>([])
  const imagesLoadedRef = useRef<boolean[]>([])
  
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDark(document.documentElement.classList.contains("dark"));
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const activeTheme = useMemo(() => {
    if (color === "default") {
      return {
        hex: isDark ? "#ffffff" : "#18181b",
        bgHex: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)"
      };
    }
    return colorThemeMap[color];
  }, [color, isDark]);

  const canvasSize = getCanvasSize(spacing);

  const items = useMemo(() => {
    const list: { type: 'icon' | 'image' | 'number', data: any }[] = [];
    if (images && images.length > 0) {
      images.forEach(img => list.push({ type: 'image', data: img }));
    }
    if (icons && icons.length > 0) {
      icons.forEach(icon => list.push({ type: 'icon', data: icon }));
    }
    if (list.length === 0) {
      const num = count || 20;
      for (let i = 0; i < num; i++) {
        list.push({ type: 'number', data: i + 1 });
      }
    }
    return list;
  }, [icons, images, count]);

  const numIcons = items.length;
  // Calculate dynamic sphere radius leaving a margin
  const sphereRadius = (canvasSize / 2) * 0.7; 
  // Base icon size on available surface area
  const baseSize = Math.sqrt((4 * Math.PI * sphereRadius * sphereRadius) / numIcons) * 0.6;
  const iconSize = Math.max(16, Math.min(64, baseSize)); // Clamp size

  // Create icon canvases once when items change
  useEffect(() => {
    imagesLoadedRef.current = new Array(items.length).fill(false)

    const newIconCanvases = items.map((item, index) => {
      const offscreen = document.createElement("canvas")
      offscreen.width = iconSize
      offscreen.height = iconSize
      const offCtx = offscreen.getContext("2d")

      if (offCtx) {
        // Draw soft background
        offCtx.clearRect(0, 0, iconSize, iconSize)
        applyShapeToCanvas(offCtx, shape, 0, 0, iconSize)
        offCtx.fillStyle = activeTheme.bgHex
        offCtx.fill()

        const innerSize = iconSize * 0.6;
        const offset = (iconSize - innerSize) / 2;

        if (item.type === 'image') {
          const img = new Image()
          img.crossOrigin = "anonymous"
          img.src = item.data
          img.onload = () => {
            // Draw image on temp canvas to tint it properly
            const tempCanvas = document.createElement("canvas")
            tempCanvas.width = innerSize
            tempCanvas.height = innerSize
            const tempCtx = tempCanvas.getContext("2d")
            
            if (tempCtx) {
              tempCtx.drawImage(img, 0, 0, innerSize, innerSize)
              tempCtx.globalCompositeOperation = "source-in"
              tempCtx.fillStyle = activeTheme.hex
              tempCtx.fillRect(0, 0, innerSize, innerSize)
              offCtx.drawImage(tempCanvas, offset, offset)
            }
            imagesLoadedRef.current[index] = true
          }
        } else if (item.type === 'icon') {
          let svgString = renderToString(item.data as React.ReactElement)
          svgString = svgString.replace(/currentColor/g, activeTheme.hex)

          const img = new Image()
          img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgString)))
          img.onload = () => {
            offCtx.drawImage(img, offset, offset, innerSize, innerSize)
            imagesLoadedRef.current[index] = true
          }
        } else {
          offCtx.fillStyle = activeTheme.hex
          offCtx.textAlign = "center"
          offCtx.textBaseline = "middle"
          offCtx.font = `bold ${Math.max(10, innerSize * 0.6)}px Arial`
          offCtx.fillText(`${item.data}`, iconSize / 2, iconSize / 2)
          imagesLoadedRef.current[index] = true
        }
      }
      return offscreen
    })

    iconCanvasesRef.current = newIconCanvases
  }, [items, shape, iconSize, activeTheme.hex, activeTheme.bgHex])

  // Generate initial icon positions on a sphere
  useEffect(() => {
    const newIcons = []

    // Fibonacci sphere parameters
    const offset = 2 / numIcons
    const increment = Math.PI * (3 - Math.sqrt(5))

    for (let i = 0; i < numIcons; i++) {
      const y = i * offset - 1 + offset / 2
      const r = Math.sqrt(1 - y * y)
      const phi = i * increment

      const x = Math.cos(phi) * r
      const z = Math.sin(phi) * r

      newIcons.push({
        x: x * sphereRadius,
        y: y * sphereRadius,
        z: z * sphereRadius,
        scale: 1,
        opacity: 1,
        id: i,
      })
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIconPositions(newIcons)
  }, [numIcons, sphereRadius])

  // Handle mouse events
  const handleMouseDown = (e: any) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect || !canvasRef.current) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    iconPositions.forEach((icon) => {
      const cosX = Math.cos(rotationRef.current.x)
      const sinX = Math.sin(rotationRef.current.x)
      const cosY = Math.cos(rotationRef.current.y)
      const sinY = Math.sin(rotationRef.current.y)

      const rotatedX = icon.x * cosY - icon.z * sinY
      const rotatedZ = icon.x * sinY + icon.z * cosY
      const rotatedY = icon.y * cosX + rotatedZ * sinX

      const canvas = canvasRef.current;
      if (!canvas) return;
      const screenX = canvas.width / 2 + rotatedX
      const screenY = canvas.height / 2 + rotatedY

      const perspectiveScale = (rotatedZ + sphereRadius * 2) / (sphereRadius * 3)
      const currentRadius = (iconSize / 2) * perspectiveScale
      const dx = x - screenX
      const dy = y - screenY

      if (dx * dx + dy * dy < currentRadius * currentRadius) {
        const targetX = -Math.atan2(icon.y, Math.sqrt(icon.x * icon.x + icon.z * icon.z))
        const targetY = Math.atan2(icon.x, icon.z)

        const currentX = rotationRef.current.x
        const currentY = rotationRef.current.y
        const distance = Math.sqrt(Math.pow(targetX - currentX, 2) + Math.pow(targetY - currentY, 2))

        const duration = Math.min(2000, Math.max(800, distance * 1000))

        setTargetRotation({
          x: targetX,
          y: targetY,
          startX: currentX,
          startY: currentY,
          distance,
          startTime: performance.now(),
          duration,
        })
        return
      }
    })

    setIsDragging(true)
    setLastMousePos({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e: any) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setMousePos({ x, y })
    }

    if (isDragging) {
      const deltaX = e.clientX - lastMousePos.x
      const deltaY = e.clientY - lastMousePos.y

      rotationRef.current = {
        x: rotationRef.current.x + deltaY * 0.002,
        y: rotationRef.current.y + deltaX * 0.002,
      }

      setLastMousePos({ x: e.clientX, y: e.clientY })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Animation and rendering
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (canvas && ctx) {
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY)
        const dx = mousePos.x - centerX
        const dy = mousePos.y - centerY
        const distance = Math.sqrt(dx * dx + dy * dy)
        const speed = 0.003 + (distance / maxDistance) * 0.01

        if (targetRotation) {
          const elapsed = performance.now() - targetRotation.startTime
          const progress = Math.min(1, elapsed / targetRotation.duration)
          const easedProgress = easeOutCubic(progress)

          rotationRef.current = {
            x:
              targetRotation.startX +
              (targetRotation.x - targetRotation.startX) * easedProgress,
            y:
              targetRotation.startY +
              (targetRotation.y - targetRotation.startY) * easedProgress,
          }

          if (progress >= 1) {
            setTargetRotation(null)
          }
        } else if (!isDragging) {
          rotationRef.current = {
            x: rotationRef.current.x + (dy / canvas.height) * speed,
            y: rotationRef.current.y + (dx / canvas.width) * speed,
          }
        }

        iconPositions.forEach((icon, index) => {
          const cosX = Math.cos(rotationRef.current.x)
          const sinX = Math.sin(rotationRef.current.x)
          const cosY = Math.cos(rotationRef.current.y)
          const sinY = Math.sin(rotationRef.current.y)

          const rotatedX = icon.x * cosY - icon.z * sinY
          const rotatedZ = icon.x * sinY + icon.z * cosY
          const rotatedY = icon.y * cosX + rotatedZ * sinX

          const perspectiveScale = (rotatedZ + sphereRadius * 2) / (sphereRadius * 3)
          const opacity = Math.max(0.2, Math.min(1, (rotatedZ + sphereRadius * 1.5) / (sphereRadius * 2)))

          ctx.save()
          ctx.translate(canvas.width / 2 + rotatedX, canvas.height / 2 + rotatedY)
          ctx.scale(perspectiveScale, perspectiveScale)
          ctx.globalAlpha = opacity

          if (iconCanvasesRef.current[index] && imagesLoadedRef.current[index]) {
            ctx.drawImage(iconCanvasesRef.current[index], -iconSize / 2, -iconSize / 2, iconSize, iconSize)
          }

          ctx.restore()
        })
        animationFrameRef.current = requestAnimationFrame(animate)
      }

      animate()
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    };
  }, [iconPositions, isDragging, mousePos, targetRotation, sphereRadius, iconSize])

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize}
      height={canvasSize}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className={cn("outline-none", className)}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      aria-label="Interactive 3D Icon Cloud"
      role="img" />
  );
}
