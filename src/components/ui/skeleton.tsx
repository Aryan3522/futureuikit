/**
 * @registry-slug skeleton
 * @registry-name Skeleton
 * @registry-description A standard Skeleton component.
 * @registry-category ui
 * @registry-type components:ui
 */
import { cn } from "@/lib/utils"

export type SkeletonColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type SkeletonShape = "default" | "square" | "rounded" | "sharp";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: SkeletonColor;
  shape?: SkeletonShape;
}

function Skeleton({
  className,
  color = "default",
  shape = "default",
  ...props
}: SkeletonProps) {
  
  const getColorClasses = () => {
    switch (color) {
      case "blue": return "bg-blue-200 dark:bg-blue-900/40";
      case "emerald": return "bg-emerald-200 dark:bg-emerald-900/40";
      case "rose": return "bg-rose-200 dark:bg-rose-900/40";
      case "amber": return "bg-amber-200 dark:bg-amber-900/40";
      case "violet": return "bg-violet-200 dark:bg-violet-900/40";
      case "indigo": return "bg-indigo-200 dark:bg-indigo-900/40";
      case "sky": return "bg-sky-200 dark:bg-sky-900/40";
      case "slate": return "bg-slate-200 dark:bg-slate-800/60";
      case "orange": return "bg-orange-200 dark:bg-orange-900/40";
      default: return "bg-muted";
    }
  };

  return (
    <div
      className={cn(
        "animate-pulse",
        shape === "square" ? "rounded-none" : shape === "sharp" ? "rounded-[2px]" : shape === "rounded" ? "rounded-xl" : "rounded-md",
        getColorClasses(),
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
