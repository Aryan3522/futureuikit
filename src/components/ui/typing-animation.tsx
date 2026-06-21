/**
 * @registry-slug typing-animation
 * @registry-name Typing Animation
 * @registry-description A standard Typing Animation component.
 * @registry-category ui
 * @registry-type components:ui
 */

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

const motionElements = {
  article: motion.article,
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
  li: motion.li,
  p: motion.p,
  section: motion.section,
  span: motion.span
}

export type TypingAnimationColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type TypingAnimationShape = "default" | "square" | "rounded" | "sharp";
export type TypingAnimationSpacing = "default" | "2x" | "4x" | "6x" | "8x";

export interface TypingAnimationProps {
  children?: React.ReactNode;
  words?: string[];
  className?: string;
  duration?: number;
  typeSpeed?: number;
  deleteSpeed?: number;
  delay?: number;
  pauseDelay?: number;
  loop?: boolean;
  as?: string;
  startOnView?: boolean;
  showCursor?: boolean;
  blinkCursor?: boolean;
  cursorStyle?: "line" | "block" | "underscore";
  color?: TypingAnimationColor;
  shape?: TypingAnimationShape;
  spacing?: TypingAnimationSpacing;
}

const colorThemeMap: Record<TypingAnimationColor, string> = {
  default: "text-foreground",
  blue: "text-blue-500",
  emerald: "text-emerald-500",
  rose: "text-rose-500",
  amber: "text-amber-500",
  violet: "text-violet-500",
  indigo: "text-indigo-500",
  sky: "text-sky-500",
  slate: "text-slate-500",
  orange: "text-orange-500",
};

const getSpacingClass = (spacing: TypingAnimationSpacing) => {
  switch (spacing) {
    case "2x": return "text-sm";
    case "4x": return "text-base";
    case "6x": return "text-2xl";
    case "8x": return "text-4xl";
    default: return "text-xl";
  }
};

export default function TypingAnimation({
  children,
  words,
  className,
  duration = 100,
  typeSpeed,
  deleteSpeed,
  delay = 0,
  pauseDelay = 1000,
  loop = false,
  as: Component = "span",
  startOnView = true,
  showCursor = true,
  blinkCursor = true,
  cursorStyle = "line",
  color = "default",
  shape = "default", // unused on text
  spacing = "default",
  ...props
}: TypingAnimationProps) {
  const MotionComponent = motionElements[Component as keyof typeof motionElements]

  const [displayedText, setDisplayedText] = useState("")
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [phase, setPhase] = useState("typing")
  const elementRef = useRef(null)
  const isInView = useInView(elementRef, {
    amount: 0.3,
    once: true,
  })

  const wordsToAnimate = useMemo(() => words ?? (children && typeof children === 'string' ? [children] : []), [words, children])
  const hasMultipleWords = wordsToAnimate.length > 1

  const typingSpeed = typeSpeed ?? duration
  const deletingSpeed = deleteSpeed ?? typingSpeed / 2

  const shouldStart = startOnView ? isInView : true
  const animationSourceKey = useMemo(() => (words ? words.join("\u0000") : (typeof children === 'string' ? children : "")), [words, children])

  const activeColor = colorThemeMap[color];
  const spacingClass = getSpacingClass(spacing);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setDisplayedText("")
    setCurrentWordIndex(0)
    setCurrentCharIndex(0)
    setPhase("typing")
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [animationSourceKey])

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null

    if (shouldStart && wordsToAnimate.length > 0) {
      const timeoutDelay =
        delay > 0 && displayedText === ""
          ? delay
          : phase === "typing"
            ? typingSpeed
            : phase === "deleting"
              ? deletingSpeed
              : pauseDelay

      timeout = setTimeout(() => {
        const currentWord = wordsToAnimate[currentWordIndex] || ""
        const graphemes = Array.from(currentWord)

        switch (phase) {
          case "typing":
            if (currentCharIndex < graphemes.length) {
              setDisplayedText(graphemes.slice(0, currentCharIndex + 1).join(""))
              setCurrentCharIndex(currentCharIndex + 1)
            } else {
              if (hasMultipleWords || loop) {
                const isLastWord =
                  currentWordIndex === wordsToAnimate.length - 1
                if (!isLastWord || loop) {
                  setPhase("pause")
                }
              }
            }
            break

          case "pause":
            setPhase("deleting")
            break

          case "deleting":
            if (currentCharIndex > 0) {
              setDisplayedText(graphemes.slice(0, currentCharIndex - 1).join(""))
              setCurrentCharIndex(currentCharIndex - 1)
            } else {
              const nextIndex = (currentWordIndex + 1) % wordsToAnimate.length
              setCurrentWordIndex(nextIndex)
              setPhase("typing")
            }
            break
        }
      }, timeoutDelay)
    }

    return () => {
      if (timeout !== null) {
        clearTimeout(timeout)
      }
    };
  }, [
    shouldStart,
    phase,
    currentCharIndex,
    currentWordIndex,
    displayedText,
    wordsToAnimate,
    hasMultipleWords,
    loop,
    typingSpeed,
    deletingSpeed,
    pauseDelay,
    delay,
  ])

  const currentWordGraphemes = Array.from(wordsToAnimate[currentWordIndex] || "")
  const isComplete =
    !loop &&
    currentWordIndex === wordsToAnimate.length - 1 &&
    currentCharIndex >= currentWordGraphemes.length &&
    phase !== "deleting"

  const shouldShowCursor =
    showCursor &&
    !isComplete &&
    (hasMultipleWords || loop || currentCharIndex < currentWordGraphemes.length)

  const getCursorChar = () => {
    switch (cursorStyle) {
      case "block":
        return "▌"
      case "underscore":
        return "_"
      case "line":
      default:
        return "|"
    }
  }

  return (
    <MotionComponent
      ref={elementRef}
      className={cn(
        "leading-20 tracking-[-0.02em]",
        Component === "span" && "inline-block",
        activeColor,
        spacingClass,
        className
      )}
      {...props as any}>
      {displayedText}
      {shouldShowCursor && (
        <span className={cn("inline-block", blinkCursor && "animate-blink-cursor")}>
          {getCursorChar()}
        </span>
      )}
    </MotionComponent>
  );
}
