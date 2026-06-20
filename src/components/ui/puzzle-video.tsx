/**
 * @registry-slug puzzle-video
 * @registry-name Puzzle Video
 * @registry-description A cinematic storytelling component where physical puzzle pieces seamlessly assemble into a premium glass video container.
 * @registry-category ui
 * @registry-type components:ui
 */

'use client';
import React, { useEffect, useRef, useMemo, useState } from 'react';
import { motion, useTransform, useSpring, useMotionValueEvent, useScroll } from 'framer-motion';
import { cn } from "@/lib/utils";

export interface PuzzleVideoProps {
  src: string;
  variant?: "jigsaw" | "jigsaw-uneven" | "glass";
  aspectRatio?: "landscape" | "portrait" | "square" | "video";
  rows?: number;
  cols?: number;
  className?: string;
  position?: "left" | "center" | "right";
  scrollContainer?: React.RefObject<HTMLElement | null>;
}

interface PieceShape {
  i: number;
  logicalBounds: { x: number; y: number; w: number; h: number; };
  paddingPercents: { top: number; right: number; bottom: number; left: number; };
  tracePath: (ctx: CanvasRenderingContext2D, videoW: number, videoH: number) => void;
  randX: number;
  randY: number;
  randZ: number;
  randRotX: number;
  randRotY: number;
  randRotZ: number;
  randOffset: number;
}

const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const drawEdge = (ctx: CanvasRenderingContext2D, len: number, tabSize: number, dir: number) => {
  if (dir === 0) {
    ctx.lineTo(len, 0);
    return;
  }
  const cx = len / 2;
  const cy = -tabSize * dir;
  
  const neckW = tabSize * 0.3;
  const headW = tabSize * 0.5;
  
  ctx.lineTo(cx - tabSize, 0);
  ctx.bezierCurveTo(cx - neckW, 0, cx - neckW, cy * 0.1, cx - neckW, cy * 0.4);
  ctx.bezierCurveTo(cx - neckW, cy * 0.7, cx - headW, cy, cx, cy);
  ctx.bezierCurveTo(cx + headW, cy, cx + neckW, cy * 0.7, cx + neckW, cy * 0.4);
  ctx.bezierCurveTo(cx + neckW, cy * 0.1, cx + neckW, 0, cx + tabSize, 0);
  ctx.lineTo(len, 0);
};

const splitConvexPoly = (poly: {x:number, y:number}[], P: {x:number, y:number}, N: {x:number, y:number}) => {
  const poly1 = [];
  const poly2 = [];
  for(let i=0; i<poly.length; i++) {
    const p1 = poly[i];
    const p2 = poly[(i+1)%poly.length];
    const d1 = (p1.x - P.x) * N.x + (p1.y - P.y) * N.y;
    const d2 = (p2.x - P.x) * N.x + (p2.y - P.y) * N.y;
    
    if (d1 >= -1e-9) poly1.push(p1);
    else poly2.push(p1);
    
    if (d1 * d2 < -1e-9) {
      const t = d1 / (d1 - d2);
      const intersect = {
        x: p1.x + t * (p2.x - p1.x),
        y: p1.y + t * (p2.y - p1.y)
      };
      poly1.push(intersect);
      poly2.push(intersect);
    }
  }
  return [poly1, poly2];
};

const generateGlassPieces = (depth: number, seed: number): Omit<PieceShape, 'i'|'randX'|'randY'|'randZ'|'randRotX'|'randRotY'|'randRotZ'|'randOffset'>[] => {
  let shards = [[ {x:0,y:0}, {x:1,y:0}, {x:1,y:1}, {x:0,y:1} ]];
  let s = seed;
  
  for(let i=0; i<depth; i++) {
    const newShards = [];
    for(const shard of shards) {
      let cx = 0, cy = 0;
      shard.forEach(p => { cx += p.x; cy += p.y; });
      cx /= shard.length;
      cy /= shard.length;
      
      const angle = pseudoRandom(s++) * Math.PI * 2;
      const N = { x: Math.cos(angle), y: Math.sin(angle) };
      const P = { 
         x: cx + (pseudoRandom(s++) - 0.5) * 0.4, 
         y: cy + (pseudoRandom(s++) - 0.5) * 0.4 
      };
      
      const [p1, p2] = splitConvexPoly(shard, P, N);
      if (p1.length > 2) newShards.push(p1);
      if (p2.length > 2) newShards.push(p2);
    }
    shards = newShards;
  }
  
  return shards.map(shard => {
    const minX = Math.min(...shard.map(p => p.x));
    const maxX = Math.max(...shard.map(p => p.x));
    const minY = Math.min(...shard.map(p => p.y));
    const maxY = Math.max(...shard.map(p => p.y));
    
    return {
      logicalBounds: { x: minX, y: minY, w: maxX - minX, h: maxY - minY },
      paddingPercents: { top: 0, right: 0, bottom: 0, left: 0 },
      tracePath: (ctx: CanvasRenderingContext2D, vw: number, vh: number) => {
        ctx.beginPath();
        shard.forEach((p, idx) => {
          if (idx === 0) ctx.moveTo(p.x * vw, p.y * vh);
          else ctx.lineTo(p.x * vw, p.y * vh);
        });
        ctx.closePath();
      }
    };
  });
};

const generateJigsawPieces = (rows: number, cols: number, isUneven: boolean, seed: number): Omit<PieceShape, 'i'|'randX'|'randY'|'randZ'|'randRotX'|'randRotY'|'randRotZ'|'randOffset'>[] => {
  const shapes: any[] = [];
  const nodes: {x:number, y:number}[][] = [];
  let s = seed;
  
  for(let r=0; r<=rows; r++) {
    nodes[r] = [];
    for(let c=0; c<=cols; c++) {
      let x = c / cols;
      let y = r / rows;
      if (isUneven && r > 0 && r < rows && c > 0 && c < cols) {
         x += (pseudoRandom(s++) - 0.5) * (0.6 / cols);
         y += (pseudoRandom(s++) - 0.5) * (0.6 / rows);
      }
      nodes[r][c] = { x, y };
    }
  }

  const horizTabs: number[][] = [];
  const vertTabs: number[][] = [];
  for(let r=0; r<=rows; r++) {
    horizTabs[r] = [];
    vertTabs[r] = [];
    for(let c=0; c<=cols; c++) {
      horizTabs[r][c] = pseudoRandom(s++) > 0.5 ? 1 : -1;
      vertTabs[r][c] = pseudoRandom(s++) > 0.5 ? 1 : -1;
    }
  }

  const globalTabSizePctX = 1/cols * 0.25;
  const globalTabSizePctY = 1/rows * 0.25;

  for(let r=0; r<rows; r++) {
    for(let c=0; c<cols; c++) {
      const TL = nodes[r][c];
      const TR = nodes[r][c+1];
      const BR = nodes[r+1][c+1];
      const BL = nodes[r+1][c];
      
      const topDir = r === 0 ? 0 : -vertTabs[r][c];
      const rightDir = c === cols - 1 ? 0 : horizTabs[r][c+1];
      const bottomDir = r === rows - 1 ? 0 : vertTabs[r+1][c];
      const leftDir = c === 0 ? 0 : -horizTabs[r][c];

      const minX = Math.min(TL.x, TR.x, BR.x, BL.x);
      const maxX = Math.max(TL.x, TR.x, BR.x, BL.x);
      const minY = Math.min(TL.y, TR.y, BR.y, BL.y);
      const maxY = Math.max(TL.y, TR.y, BR.y, BL.y);
      
      const logicalBounds = { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
      
      const padLeft = leftDir !== 0 ? globalTabSizePctX / logicalBounds.w * 100 : 0;
      const padRight = rightDir !== 0 ? globalTabSizePctX / logicalBounds.w * 100 : 0;
      const padTop = topDir !== 0 ? globalTabSizePctY / logicalBounds.h * 100 : 0;
      const padBottom = bottomDir !== 0 ? globalTabSizePctY / logicalBounds.h * 100 : 0;
      
      const paddingPercents = { top: padTop, right: padRight, bottom: padBottom, left: padLeft };

      const tracePath = (ctx: CanvasRenderingContext2D, vw: number, vh: number) => {
        const tabSize = Math.min(vw/cols, vh/rows) * 0.25;
        const radius = 24;
        ctx.beginPath();
        
        const drawSegment = (p1: {x:number, y:number}, p2: {x:number, y:number}, dir: number, cornerRadius: number) => {
          const dx = (p2.x - p1.x) * vw;
          const dy = (p2.y - p1.y) * vh;
          const dist = Math.hypot(dx, dy);
          const angle = Math.atan2(dy, dx);
          
          ctx.save();
          ctx.translate(p1.x * vw, p1.y * vh);
          ctx.rotate(angle);
          
          if (dir === 0) {
             if (cornerRadius > 0 && dist > cornerRadius) {
                drawEdge(ctx, dist - cornerRadius, tabSize, 0);
                ctx.quadraticCurveTo(dist, 0, dist, cornerRadius);
             } else {
                drawEdge(ctx, dist, tabSize, 0);
             }
          } else {
             drawEdge(ctx, dist, tabSize, dir);
          }
          ctx.restore();
        };

        const isTopLeft = r === 0 && c === 0;
        const isTopRight = r === 0 && c === cols - 1;
        const isBottomRight = r === rows - 1 && c === cols - 1;
        const isBottomLeft = r === rows - 1 && c === 0;

        if (isTopLeft) {
          ctx.moveTo(TL.x * vw + radius, TL.y * vh);
        } else {
          ctx.moveTo(TL.x * vw, TL.y * vh);
        }

        drawSegment(TL, TR, topDir, isTopRight ? radius : 0);
        drawSegment(TR, BR, rightDir, isBottomRight ? radius : 0);
        drawSegment(BR, BL, bottomDir, isBottomLeft ? radius : 0);
        drawSegment(BL, TL, leftDir, isTopLeft ? radius : 0);
        
        ctx.closePath();
      };
      
      shapes.push({ logicalBounds, paddingPercents, tracePath });
    }
  }
  return shapes;
};

const PuzzlePiece = ({
  piece,
  scatterProgressRaw,
  setCanvasRef,
}: {
  piece: PieceShape;
  scatterProgressRaw: any;
  setCanvasRef: (el: HTMLCanvasElement | null) => void;
}) => {
  const staggeredRaw = useTransform(
    scatterProgressRaw,
    [0, 0.2, 0.8, 1],
    [0, Math.max(0, 0.2 + piece.randOffset), Math.min(1, 0.8 + piece.randOffset), 1]
  );

  const scatterSpring = useSpring(staggeredRaw, {
    mass: 1.2,
    stiffness: 120,
    damping: 14,
  });

  const x = useTransform(scatterSpring, [0, 1], [0, piece.randX]);
  const y = useTransform(scatterSpring, [0, 1], [0, piece.randY]);
  const z = useTransform(scatterSpring, [0, 1], [0, piece.randZ]);
  const rotX = useTransform(scatterSpring, [0, 1], [0, piece.randRotX]);
  const rotY = useTransform(scatterSpring, [0, 1], [0, piece.randRotY]);
  const rotZ = useTransform(scatterSpring, [0, 1], [0, piece.randRotZ]);

  const scale = useTransform(scatterSpring, [0, 0.05, 1], [1.006, 1, 1]);

  return (
    <motion.div
      className="absolute will-change-transform"
      style={{
        width: `${piece.logicalBounds.w * 100}%`,
        height: `${piece.logicalBounds.h * 100}%`,
        left: `${piece.logicalBounds.x * 100}%`,
        top: `${piece.logicalBounds.y * 100}%`,
        x,
        y,
        z,
        rotateX: rotX,
        rotateY: rotY,
        rotateZ: rotZ,
        scale,
        transformStyle: "preserve-3d",
      }}
    >
      <canvas
        ref={setCanvasRef}
        className="absolute drop-shadow-xl"
        style={{
          width: `calc(100% + ${piece.paddingPercents.left + piece.paddingPercents.right}%)`,
          height: `calc(100% + ${piece.paddingPercents.top + piece.paddingPercents.bottom}%)`,
          left: `-${piece.paddingPercents.left}%`,
          top: `-${piece.paddingPercents.top}%`,
        }}
      />
    </motion.div>
  );
};

export const PuzzleVideo: React.FC<PuzzleVideoProps> = ({
  src,
  variant = "jigsaw",
  aspectRatio = "video",
  rows = 4,
  cols = 4,
  className,
  position = "center",
  scrollContainer,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const activeRows = isMobile ? 3 : rows;
  const activeCols = isMobile ? 2 : cols;

  const pieces = useMemo(() => {
    let rawShapes: Omit<PieceShape, 'i'|'randX'|'randY'|'randZ'|'randRotX'|'randRotY'|'randRotZ'|'randOffset'>[];
    
    if (variant === "glass") {
      rawShapes = generateGlassPieces(isMobile ? 3 : 4, 12345);
    } else if (variant === "jigsaw-uneven") {
      rawShapes = generateJigsawPieces(activeRows, activeCols, true, 54321);
    } else {
      rawShapes = generateJigsawPieces(activeRows, activeCols, false, 98765);
    }

    return rawShapes.map((shape, i) => {
      const spreadMultiplierX = isMobile ? 80 : 160;
      const spreadMultiplierY = isMobile ? 80 : 160;
      const depthMultiplier = isMobile ? 600 : 1200;
      
      const randX = (pseudoRandom(i * 7 + 1) - 0.5) * spreadMultiplierX;
      const randY = (pseudoRandom(i * 7 + 2) - 0.5) * spreadMultiplierY;
      const randZ = (pseudoRandom(i * 7 + 3) - 0.5) * depthMultiplier;
      
      const randRotX = (pseudoRandom(i * 7 + 4) - 0.5) * 40;
      const randRotY = (pseudoRandom(i * 7 + 5) - 0.5) * 40;
      const randRotZ = (pseudoRandom(i * 7 + 6) - 0.5) * 100;
      const randOffset = (pseudoRandom(i * 7 + 7) - 0.5) * 0.5;

      return {
        ...shape,
        i,
        randX,
        randY,
        randZ,
        randRotX,
        randRotY,
        randRotZ,
        randOffset,
      } as PieceShape;
    });
  }, [variant, activeCols, activeRows, isMobile]);

  const scrollConfig = scrollContainer
    ? { target: containerRef, container: scrollContainer, offset: ["start end", "end start"] as any }
    : { target: containerRef, offset: ["start end", "end start"] as any };

  const { scrollYProgress } = useScroll(scrollConfig);

  const scatterProgressRaw = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [1, 0, 0, 1]);

  const [isAssembled, setIsAssembled] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  useMotionValueEvent(scatterProgressRaw, "change", (val) => {
    if (val <= 0.01) {
      if (!isAssembled) setIsAssembled(true);
    } else {
      if (isAssembled) setIsAssembled(false);
    }
  });

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isAssembled) {
      timeout = setTimeout(() => {
        setIsVideoVisible(true);
      }, 400);
    } else {
      setIsVideoVisible(false);
    }
    return () => clearTimeout(timeout);
  }, [isAssembled]);

  const drawPieces = () => {
    const video = videoRef.current;
    if (!video || video.readyState < 2) return;

    const vw = video.videoWidth;
    const vh = video.videoHeight;
    if (!vw || !vh) return;

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

    canvasRefs.current.forEach((canvas, idx) => {
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) return;

      const p = pieces[idx];
      
      const logicalWPx = p.logicalBounds.w * vw;
      const logicalHPx = p.logicalBounds.h * vh;
      const padLeftPx = (p.paddingPercents.left / 100) * logicalWPx;
      const padTopPx = (p.paddingPercents.top / 100) * logicalHPx;
      const padRightPx = (p.paddingPercents.right / 100) * logicalWPx;
      const padBottomPx = (p.paddingPercents.bottom / 100) * logicalHPx;
      
      const canvasW = logicalWPx + padLeftPx + padRightPx;
      const canvasH = logicalHPx + padTopPx + padBottomPx;

      canvas.width = canvasW * dpr;
      canvas.height = canvasH * dpr;
      ctx.scale(dpr, dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      ctx.clearRect(0, 0, canvasW, canvasH);

      const globalOffsetX = p.logicalBounds.x * vw - padLeftPx;
      const globalOffsetY = p.logicalBounds.y * vh - padTopPx;

      // 1. Draw Extrusion
      ctx.save();
      ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
      ctx.shadowBlur = 30;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 15;

      for (let i = 8; i >= 1; i -= 1) {
        ctx.save();
        ctx.translate(0, i);
        ctx.translate(-globalOffsetX, -globalOffsetY);
        p.tracePath(ctx, vw, vh);
        const depthTone = Math.floor(10 + (8 - i) * 2);
        ctx.fillStyle = `rgb(${depthTone}, ${depthTone}, ${depthTone})`;
        ctx.fill();
        ctx.restore();
        
        if (i === 8) ctx.shadowColor = "transparent";
      }
      ctx.restore();

      // 2. Draw Video Face
      ctx.save();
      ctx.translate(-globalOffsetX, -globalOffsetY);
      p.tracePath(ctx, vw, vh);
      ctx.clip();
      try {
        ctx.drawImage(video, 0, 0, vw, vh);
      } catch (e) {}
      ctx.restore();

      // 3. Specular Highlights & Bevel
      ctx.save();
      ctx.translate(-globalOffsetX, -globalOffsetY);
      p.tracePath(ctx, vw, vh);
      ctx.clip(); 

      ctx.save();
      ctx.translate(1, 1);
      p.tracePath(ctx, vw, vh);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.translate(-2, -2);
      p.tracePath(ctx, vw, vh);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      ctx.stroke();
      ctx.restore();

      ctx.restore();
    });
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video || video.readyState < 2) return;

    if (isVideoVisible) {
      if (video.paused) video.play().catch(() => {});
    } else {
      if (!video.paused) video.pause();
      drawPieces();
    }
  }, [isVideoVisible]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleLoadedData = () => drawPieces();
    video.addEventListener("loadeddata", handleLoadedData);
    if (video.readyState >= 2) drawPieces();
    return () => video.removeEventListener("loadeddata", handleLoadedData);
  }, [pieces]);

  return (
    <div
      className={cn("w-full flex py-32 overflow-visible", {
        "justify-start": position === "left",
        "justify-center": position === "center",
        "justify-end": position === "right",
      })}
    >
      <div
        ref={containerRef}
        className={cn(
          "relative w-full mx-auto perspective-[2500px]",
          {
            "max-w-5xl aspect-video": aspectRatio === "video" || aspectRatio === "landscape",
            "max-w-md aspect-[9/16]": aspectRatio === "portrait",
            "max-w-2xl aspect-square": aspectRatio === "square",
          },
          className
        )}
      >
        <motion.div 
          animate={{ opacity: isVideoVisible ? 1 : 0, scale: isVideoVisible ? 1 : 0.95 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full bg-white/5 blur-[120px] rounded-full pointer-events-none"
        />

        <motion.div
          animate={{ opacity: isVideoVisible ? 1 : 0, scale: isVideoVisible ? 1 : 0.95 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/20 bg-black/50 backdrop-blur-3xl z-10"
          style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4), 0 40px 100px rgba(0,0,0,0.8)' }}
        >
          <video
            ref={videoRef}
            src={src}
            muted
            playsInline
            loop
            crossOrigin="anonymous"
            preload="auto"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          animate={{ opacity: isVideoVisible ? 0 : 1 }}
          transition={{ duration: isVideoVisible ? 0.5 : 0.3, ease: "easeOut" }}
          className="absolute inset-0 pointer-events-none z-20"
        >
          {pieces.map((p) => (
            <PuzzlePiece
              key={p.i}
              piece={p}
              scatterProgressRaw={scatterProgressRaw}
              setCanvasRef={(el) => {
                canvasRefs.current[p.i] = el;
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default PuzzleVideo;