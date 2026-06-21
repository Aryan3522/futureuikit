/**
 * @registry-slug text-3d-flip
 * @registry-name Text 3d Flip
 * @registry-description A standard Text 3d Flip component.
 * @registry-category ui
 * @registry-type components:ui
 */
"use client";

import React, { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { useAnimate } from "motion/react";
import { cn } from "@/lib/utils";

const HAS_SEGMENTER =
  typeof Intl !== "undefined" && typeof Intl.Segmenter !== "undefined";

const splitIntoCharacters = (text: any) => {
  if (HAS_SEGMENTER) {
    const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
    return Array.from(segmenter.segment(text), ({ segment }) => segment);
  }
  return Array.from(text);
};

const extractTextFromChildren = (children: any): any => {
  if (children == null) return "";
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join("");
  }

  if (React.isValidElement(children)) {
    return extractTextFromChildren((children.props as any)?.children);
  }

  return "";
};

const ROTATION_MAP: any = {
  top: "rotateX(90deg)",
  right: "rotateY(90deg)",
  bottom: "rotateX(-90deg)",
  left: "rotateY(-90deg)",
};

const DEFAULT_TRANSITION = {
  type: "spring",
  damping: 25,
  stiffness: 160,
};

export type Text3DFlipColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type Text3DFlipShape = "default" | "square" | "rounded" | "sharp";
export type Text3DFlipSpacing = "default" | "2x" | "4x" | "6x" | "8x";

export interface Text3DFlipProps extends Omit<React.HTMLAttributes<HTMLParagraphElement>, "color"> {
  children?: React.ReactNode;
  as?: React.ElementType;
  textClassName?: string;
  flipTextClassName?: string;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | "random" | number;
  transition?: any;
  rotateDirection?: "top" | "right" | "bottom" | "left";
  color?: Text3DFlipColor;
  shape?: Text3DFlipShape;
  spacing?: Text3DFlipSpacing;
}

const colorThemeMap: Record<Text3DFlipColor, { text: string; flipText: string }> = {
  default: { text: "text-foreground", flipText: "text-muted-foreground" },
  blue: { text: "text-blue-500", flipText: "text-blue-300" },
  emerald: { text: "text-emerald-500", flipText: "text-emerald-300" },
  rose: { text: "text-rose-500", flipText: "text-rose-300" },
  amber: { text: "text-amber-500", flipText: "text-amber-300" },
  violet: { text: "text-violet-500", flipText: "text-violet-300" },
  indigo: { text: "text-indigo-500", flipText: "text-indigo-300" },
  sky: { text: "text-sky-500", flipText: "text-sky-300" },
  slate: { text: "text-slate-500", flipText: "text-slate-300" },
  orange: { text: "text-orange-500", flipText: "text-orange-300" },
};

const getSpacingClass = (spacing: Text3DFlipSpacing) => {
  switch (spacing) {
    case "2x": return "text-sm";
    case "4x": return "text-base";
    case "6x": return "text-2xl";
    case "8x": return "text-4xl";
    default: return "text-xl";
  }
};

export default function Text3DFlip({
  children,
  className,
  textClassName,
  flipTextClassName,
  staggerDuration = 0.03,
  staggerFrom = "first",
  transition = DEFAULT_TRANSITION,
  rotateDirection = "top",
  color = "default",
  shape = "default", // unused on text, kept for universal API
  spacing = "default",
  ...props
}: Text3DFlipProps) {
  const [scope, animate] = useAnimate();
  const isAnimatingRef = useRef(false);
  const isMountedRef = useRef(false);

  const activeTheme = colorThemeMap[color];
  const spacingClass = getSpacingClass(spacing);

  const rotationTransform = ROTATION_MAP[rotateDirection];

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      isAnimatingRef.current = false;
    };
  }, []);

  const text = useMemo(() => {
    try {
      return extractTextFromChildren(children);
    } catch {
      return "";
    }
  }, [children]);

  const words = useMemo(() => {
    return text.split(" ").map((word: any, index: any, arr: any) => ({
      chars: splitIntoCharacters(word),
      needsSpace: index < arr.length - 1,
    }));
  }, [text]);

  const totalChars = useMemo(
    () => words.reduce((sum: any, word: any) => sum + word.chars.length, 0),
    [words]
  );

  const getDelay = useCallback(
    (index: any) => {
      if (staggerFrom === "first") return index * staggerDuration;
      if (staggerFrom === "last")
        return (totalChars - index - 1) * staggerDuration;

      if (staggerFrom === "center") {
        const center = Math.floor(totalChars / 2);
        return Math.abs(center - index) * staggerDuration;
      }

      if (staggerFrom === "random") {
        return Math.random() * totalChars * staggerDuration;
      }

      if (typeof staggerFrom === "number") {
        return Math.abs(staggerFrom - index) * staggerDuration;
      }

      return index * staggerDuration;
    },
    [staggerFrom, staggerDuration, totalChars]
  );

  const handleHoverStart = useCallback(async () => {
    if (isAnimatingRef.current) return;

    isAnimatingRef.current = true;

    try {
      await animate(
        ".text-3d-flip-char",
        { transform: rotationTransform },
        {
          ...transition,
          delay: (i: any) => getDelay(i),
        }
      );

      if (!isMountedRef.current) return;

      await animate(
        ".text-3d-flip-char",
        { transform: "rotateX(0deg) rotateY(0deg)" },
        { duration: 0 }
      );
    } finally {
      if (isMountedRef.current) {
        isAnimatingRef.current = false;
      }
    }
  }, [animate, rotationTransform, transition, getDelay]);

  let charIndex = 0;

  return (
    <p
      ref={scope}
      onMouseEnter={handleHoverStart}
      className={cn("relative inline-flex flex-wrap items-center", spacingClass, className)}
      {...props}
    >
      <span className="sr-only">{text}</span>

      {words.map((word: any, wordIndex: any) => (
        <React.Fragment key={wordIndex}>
          <span className="inline-flex">
            {word.chars.map((char: any) => {
              const key = charIndex++;
              return (
                <CharBox
                  key={key}
                  char={char}
                  textClassName={cn(activeTheme.text, textClassName)}
                  flipTextClassName={cn(activeTheme.flipText, flipTextClassName)}
                  rotateDirection={rotateDirection}
                />
              );
            })}
          </span>

          {word.needsSpace && (
            <span
              aria-hidden="true"
              className="inline-block"
              style={{ width: "0.3em" }}
            />
          )}
        </React.Fragment>
      ))}
    </p>
  );
}

const SECOND_FACE_TRANSFORMS: any = {
  top: "rotateX(-90deg) translateZ(0.5lh)",
  right:
    "rotateY(90deg) translateX(50%) rotateY(-90deg) translateX(-50%) rotateY(-90deg) translateX(50%)",
  bottom: "rotateX(90deg) translateZ(0.5lh)",
  left:
    "rotateY(90deg) translateX(50%) rotateY(-90deg) translateX(50%) rotateY(-90deg) translateX(50%)",
};

const FRONT_FACE_TRANSFORMS: any = {
  top: "translateZ(0.5lh)",
  right: "rotateY(-90deg) translateX(50%) rotateY(90deg)",
  bottom: "translateZ(0.5lh)",
  left: "rotateY(90deg) translateX(50%) rotateY(-90deg)",
};

const CONTAINER_TRANSFORMS: any = {
  top: "translateZ(-0.5lh)",
  right: "rotateY(90deg) translateX(50%) rotateY(-90deg)",
  bottom: "translateZ(-0.5lh)",
  left: "rotateY(90deg) translateX(50%) rotateY(-90deg)",
};

const CharBox = memo(function CharBox({
  char,
  textClassName,
  flipTextClassName,
  rotateDirection,
}: any) {
  return (
    <span
      className="text-3d-flip-char relative inline-block transform-3d"
      style={{ transform: CONTAINER_TRANSFORMS[rotateDirection] }}
    >
      <span
        className={cn(
          "relative inline-block h-[1lh] backface-hidden",
          textClassName
        )}
        style={{ transform: FRONT_FACE_TRANSFORMS[rotateDirection] }}
      >
        {char}
      </span>

      <span
        className={cn(
          "absolute left-0 top-0 inline-block h-[1lh] backface-hidden",
          flipTextClassName
        )}
        style={{ transform: SECOND_FACE_TRANSFORMS[rotateDirection] }}
      >
        {char}
      </span>
    </span>
  );
});