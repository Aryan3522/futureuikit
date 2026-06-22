/**
 * @registry-slug card
 * @registry-name Card
 * @registry-description A set of modular card components including Header, Title, Description, Content, and Footer.
 * @registry-category layout
 * @registry-type components:ui
 */

"use client";

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export type CardColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type CardVariant = "solid" | "outline" | "ghost" | "link";
export type CardTheme = "default" | "modern" | "clean" | "futuristic" | "brutal" | "halftone";
export type CardShape = "default" | "square" | "rounded" | "sharp";
export type CardSpacing = "default" | "2x" | "4x" | "6x" | "8x";
export type CardLayout = "default" | "elevated" | "interactive" | "feature" | "stats" | "content" | "compact" | "media";

interface CardContextValue {
  color: CardColor;
  theme: CardTheme;
  variant: CardVariant;
  spacing: CardSpacing;
  shape: CardShape;
  layout: CardLayout;
}

const CardContext = React.createContext<CardContextValue>({
  color: "default",
  theme: "default",
  variant: "solid",
  spacing: "default",
  shape: "default",
  layout: "default",
});

const useCardContext = () => React.useContext(CardContext);

const colorThemeMap: Record<CardColor, { text: string; border: string; accent: string; bgActive: string; glow: string; brutalShadow: string; }> = {
  default: { text: "text-primary", border: "border-primary/20", accent: "bg-primary/10", bgActive: "bg-primary", glow: "shadow-foreground/10 dark:shadow-foreground/5", brutalShadow: "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]" },
  blue: { text: "text-blue-600 dark:text-blue-500", border: "border-blue-600/20 dark:border-blue-500/20", accent: "bg-blue-600/10 dark:bg-blue-500/10", bgActive: "bg-blue-600 dark:bg-blue-500", glow: "shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)]", brutalShadow: "shadow-[4px_4px_0px_0px_rgba(37,99,235,1)]" },
  emerald: { text: "text-emerald-600 dark:text-emerald-500", border: "border-emerald-600/20 dark:border-emerald-500/20", accent: "bg-emerald-600/10 dark:bg-emerald-500/10", bgActive: "bg-emerald-600 dark:bg-emerald-500", glow: "shadow-[0_0_20px_-5px_rgba(5,150,105,0.4)]", brutalShadow: "shadow-[4px_4px_0px_0px_rgba(5,150,105,1)]" },
  rose: { text: "text-rose-600 dark:text-rose-500", border: "border-rose-600/20 dark:border-rose-500/20", accent: "bg-rose-600/10 dark:bg-rose-500/10", bgActive: "bg-rose-600 dark:bg-rose-500", glow: "shadow-[0_0_20px_-5px_rgba(225,29,72,0.4)]", brutalShadow: "shadow-[4px_4px_0px_0px_rgba(225,29,72,1)]" },
  amber: { text: "text-amber-600 dark:text-amber-500", border: "border-amber-600/20 dark:border-amber-500/20", accent: "bg-amber-600/10 dark:bg-amber-500/10", bgActive: "bg-amber-600 dark:bg-amber-500", glow: "shadow-[0_0_20px_-5px_rgba(217,119,6,0.4)]", brutalShadow: "shadow-[4px_4px_0px_0px_rgba(217,119,6,1)]" },
  violet: { text: "text-violet-600 dark:text-violet-500", border: "border-violet-600/20 dark:border-violet-500/20", accent: "bg-violet-600/10 dark:bg-violet-500/10", bgActive: "bg-violet-600 dark:bg-violet-500", glow: "shadow-[0_0_20px_-5px_rgba(124,58,237,0.4)]", brutalShadow: "shadow-[4px_4px_0px_0px_rgba(124,58,237,1)]" },
  indigo: { text: "text-indigo-600 dark:text-indigo-500", border: "border-indigo-600/20 dark:border-indigo-500/20", accent: "bg-indigo-600/10 dark:bg-indigo-500/10", bgActive: "bg-indigo-600 dark:bg-indigo-500", glow: "shadow-[0_0_20px_-5px_rgba(79,70,229,0.4)]", brutalShadow: "shadow-[4px_4px_0px_0px_rgba(79,70,229,1)]" },
  sky: { text: "text-sky-600 dark:text-sky-500", border: "border-sky-600/20 dark:border-sky-500/20", accent: "bg-sky-600/10 dark:bg-sky-500/10", bgActive: "bg-sky-600 dark:bg-sky-500", glow: "shadow-[0_0_20px_-5px_rgba(2,132,199,0.4)]", brutalShadow: "shadow-[4px_4px_0px_0px_rgba(2,132,199,1)]" },
  slate: { text: "text-slate-600 dark:text-slate-400", border: "border-slate-600/20 dark:border-slate-500/20", accent: "bg-slate-600/10 dark:bg-slate-500/10", bgActive: "bg-slate-600 dark:bg-slate-500", glow: "shadow-[0_0_20px_-5px_rgba(71,85,105,0.4)]", brutalShadow: "shadow-[4px_4px_0px_0px_rgba(71,85,105,1)]" },
  orange: { text: "text-orange-600 dark:text-orange-500", border: "border-orange-600/20 dark:border-orange-500/20", accent: "bg-orange-600/10 dark:bg-orange-500/10", bgActive: "bg-orange-600 dark:bg-orange-500", glow: "shadow-[0_0_20px_-5px_rgba(234,88,12,0.4)]", brutalShadow: "shadow-[4px_4px_0px_0px_rgba(234,88,12,1)]" },
};

const getShapeClass = (shape: CardShape, element: "container" | "inner" | "avatar" | "action" | "badge" = "container") => {
  if (element === "avatar" || element === "badge") {
    switch (shape) {
      case "square": return "rounded-none";
      case "sharp": return "rounded-sm";
      case "rounded": return "rounded-md";
      case "default": return "rounded-full";
    }
  }
  if (element === "action") {
    switch (shape) {
      case "square": return "rounded-none";
      case "sharp": return "rounded-[2px]";
      case "rounded": return "rounded-xl";
      case "default": return "rounded-lg";
    }
  }
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-xl";
    case "rounded": return "rounded-2xl";
    case "default": return "rounded-3xl";
  }
};

const spacingPaddingMap: Record<CardSpacing, { header: string; content: string; footer: string; gap: string; action: string; compactGap: string; }> = {
  "2x": { header: "p-2 sm:p-3", content: "p-2 sm:p-3", footer: "p-2 sm:p-3", gap: "gap-1.5", action: "py-1 px-2 text-xs", compactGap: "gap-1.5" },
  "4x": { header: "p-3 sm:p-5", content: "p-3 sm:p-5", footer: "p-3 sm:p-5", gap: "gap-3", action: "py-1.5 px-3 text-sm", compactGap: "gap-3" },
  "6x": { header: "p-5 sm:p-7", content: "p-5 sm:p-7", footer: "p-5 sm:p-7", gap: "gap-5", action: "py-2.5 px-5 text-base", compactGap: "gap-5" },
  "8x": { header: "p-6 sm:p-9", content: "p-6 sm:p-9", footer: "p-6 sm:p-9", gap: "gap-6", action: "py-3 px-6 text-lg", compactGap: "gap-6" },
  default: { header: "p-6", content: "p-6", footer: "p-6", gap: "gap-4", action: "py-2 px-4 text-sm", compactGap: "gap-4" },
};

const standardShadowMap: Record<string, string> = {
  xxs: "shadow-[0_0.5px_1px_0_rgb(0_0_0_/_0.05)]",
  xs: "shadow-xs",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
  xxl: "shadow-2xl",
};

const layoutClasses: Record<CardLayout, string> = {
  default: "flex flex-col",
  elevated: "flex flex-col ring-1 ring-border/20",
  interactive: "flex flex-col cursor-pointer select-none active:scale-[1.005] transition-transform duration-150",
  feature: "flex flex-col items-center text-center",
  stats: "flex flex-col",
  content: "flex flex-col overflow-hidden",
  compact: "flex-row items-center",
  media: "flex flex-col overflow-hidden",
};

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  color?: CardColor;
  theme?: CardTheme;
  shape?: CardShape;
  spacing?: CardSpacing;
  shadow?: "default" | "none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  layout?: CardLayout;
  disabled?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "solid", color = "default", theme = "default", shape = "default", spacing = "default", shadow = "default", layout = "default", disabled, ...props }, ref) => {
    const activeTheme = colorThemeMap[color];
    const isOutline = variant === "outline";
    const isGhost = variant === "ghost";
    const isLink = variant === "link";

    const shadowClass = shadow === "none" ? "!shadow-none" : (shadow === "default" ? "" : `!${standardShadowMap[shadow] || ""}`);

    const getContainerStyles = () => {
      const baseBg = isGhost || isLink ? "bg-transparent" : "bg-card";

      switch (theme) {
        case "modern":
          return cn(baseBg, "border border-border/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]", "backdrop-blur-xl", "relative overflow-hidden transition-all duration-500",
            color !== "default" && !isGhost && !isLink ? activeTheme.border : "",
            color !== "default" && !isGhost && !isLink ? activeTheme.glow : "shadow-[0_20px_50px_0] shadow-foreground/10 dark:shadow-foreground/5",
            isGhost || isLink ? "border-transparent shadow-none" : "");
        case "brutal":
          return cn(baseBg, "border-4 relative transition-all duration-200",
            isGhost || isLink ? "border-transparent shadow-none" : (color !== "default" ? activeTheme.border : "border-foreground"),
            !isGhost && !isLink ? (color !== "default" ? activeTheme.brutalShadow : "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]") : "");
        case "futuristic":
          return cn(baseBg, "border relative overflow-hidden transition-all duration-500",
            "before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:via-transparent before:to-foreground/[0.02] dark:before:to-foreground/[0.04]",
            isOutline || isGhost || isLink
              ? (isGhost || isLink ? "border-transparent" : (color !== "default" ? activeTheme.border : "border-border"))
              : cn(color !== "default" ? activeTheme.border : "border-border", color !== "default" ? activeTheme.glow : "shadow-sm"),
            isGhost && "!border-transparent", isLink && "!border-transparent !shadow-none");
        case "halftone":
          return cn(baseBg, "border-2 border-dashed relative overflow-hidden",
            "bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#374151_1px,transparent_1px)] [background-size:16px_16px]",
            isGhost || isLink ? "border-transparent shadow-none" : (color !== "default" ? activeTheme.border : "border-foreground/20"),
            !isGhost && !isLink ? (color !== "default" ? activeTheme.brutalShadow : "shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]") : "");
        case "clean":
          return cn(baseBg, isGhost || isLink ? "border-transparent shadow-none" : "border-border/40 border-[0.5px]", "relative overflow-hidden transition-all duration-500",
            color !== "default" && !isGhost && !isLink ? activeTheme.glow : "shadow-sm");
        case "default":
        default:
          return cn(baseBg, isGhost || isLink ? "border-transparent shadow-none" : "border-border border", "relative overflow-hidden transition-all duration-500",
            color !== "default" && !isGhost && !isLink ? activeTheme.glow : "shadow-sm");
      }
    };

    return (
      <CardContext.Provider value={{ color, theme, variant, spacing, shape, layout }}>
        <div
          ref={ref}
          aria-disabled={disabled ?? undefined}
          className={cn(
            getShapeClass(shape, "container"),
            getContainerStyles(),
            layoutClasses[layout],
            layout === "compact" ? spacingPaddingMap[spacing].compactGap : "",
            "text-card-foreground",
            isOutline && color !== "default" && activeTheme.text,
            isGhost && color !== "default" && activeTheme.text,
            isLink && color !== "default" && activeTheme.text,
            isLink && "underline-offset-4 hover:underline",
            disabled && "opacity-40 pointer-events-none select-none",
            shadowClass,
            className
          )}
          {...props}
        />
      </CardContext.Provider>
    );
  }
);
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  const { spacing } = useCardContext();
  const s = spacingPaddingMap[spacing];
  return <div ref={ref} className={cn("flex flex-col", s.header, s.gap, className)} {...props} />;
})
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => {
  const { theme, color } = useCardContext();
  const activeTheme = colorThemeMap[color];

  const getTitleStyles = () => {
    switch (theme) {
      case "modern": return "text-2xl font-medium tracking-tight text-foreground/90";
      case "brutal": return cn("text-2xl font-mono font-black uppercase tracking-tighter", color !== "default" ? activeTheme.text : "text-foreground");
      case "futuristic": return cn("text-2xl font-mono font-bold tracking-widest", color !== "default" ? activeTheme.text : "text-foreground");
      case "halftone": return cn("text-2xl font-serif font-black italic tracking-tighter", color !== "default" ? activeTheme.text : "text-foreground");
      case "clean": return "text-3xl font-extralight tracking-tight text-foreground/90";
      case "default":
      default: return "text-2xl font-bold tracking-tight";
    }
  };

  return <h3 ref={ref} className={cn(getTitleStyles(), className)} {...props} />;
})
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => {
  const { theme, color } = useCardContext();
  const activeTheme = colorThemeMap[color];

  const getDescriptionStyles = () => {
    switch (theme) {
      case "modern": return "text-sm text-muted-foreground/80 font-light";
      case "brutal": return cn("text-sm font-mono font-bold uppercase tracking-wider", color !== "default" ? activeTheme.text + "/80" : "text-muted-foreground/80");
      case "futuristic": return cn("text-sm font-mono tracking-wider", color !== "default" ? activeTheme.text + "/80" : "text-muted-foreground/80");
      case "halftone": return cn("text-sm font-serif italic", color !== "default" ? activeTheme.text + "/80" : "text-muted-foreground/80");
      case "clean": return "text-sm text-muted-foreground/60 font-extralight";
      case "default":
      default: return "text-sm text-muted-foreground";
    }
  };

  return <p ref={ref} className={cn(getDescriptionStyles(), className)} {...props} />;
})
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  const { spacing } = useCardContext();
  const s = spacingPaddingMap[spacing];
  return <div ref={ref} className={cn("flex flex-col", s.content, s.gap, className)} {...props} />;
})
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  const { spacing, color } = useCardContext();
  const activeTheme = colorThemeMap[color];
  const borderClass = color === "default" ? "border-border/50" : activeTheme.border;
  const s = spacingPaddingMap[spacing];
  return (
    <div
      ref={ref}
      className={cn("flex items-center mt-auto border-t", s.footer, s.gap, borderClass, className)}
      {...props}
    />
  );
})
CardFooter.displayName = "CardFooter"

const CardSeparator = React.forwardRef<HTMLHRElement, React.HTMLAttributes<HTMLHRElement>>(({ className, ...props }, ref) => {
  const { color } = useCardContext();
  const activeTheme = colorThemeMap[color];
  const borderClass = color === "default" ? "border-border/50" : activeTheme.border;
  return <hr ref={ref} className={cn("border-t my-0", borderClass, className)} {...props} />;
})
CardSeparator.displayName = "CardSeparator"

interface CardBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "primary" | "success" | "warning" | "danger" | "info" | "neutral";
}

const CardBadge = React.forwardRef<HTMLSpanElement, CardBadgeProps>(({ className, tone = "primary", ...props }, ref) => {
  const { color, shape } = useCardContext();
  const activeTheme = colorThemeMap[color];

  const toneClasses = tone === "primary"
    ? color === "default" ? "bg-muted text-muted-foreground" : cn(activeTheme.accent, activeTheme.text)
    : tone === "success" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
    : tone === "warning" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
    : tone === "danger" ? "bg-red-500/10 text-red-600 dark:text-red-400"
    : tone === "info" ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
    : "bg-foreground/5 text-foreground/70 border border-border/50";

  return (
    <span ref={ref} className={cn("inline-flex items-center px-2 py-0.5 text-[11px] font-medium tracking-wide transition-colors duration-150", getShapeClass(shape, "badge"), toneClasses, className)} {...props} />
  );
})
CardBadge.displayName = "CardBadge"

interface CardStatProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  label: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

const CardStat = React.forwardRef<HTMLDivElement, CardStatProps>(({ className, value, label, trend, trendValue, ...props }, ref) => {
  const trendColor = trend === "up" ? "text-emerald-500" : trend === "down" ? "text-red-500" : "text-muted-foreground";
  return (
    <div ref={ref} className={cn("flex flex-col gap-1", className)} {...props}>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-semibold tracking-tight tabular-nums text-foreground">{value}</span>
        {trendValue && <span className={cn("text-xs font-medium", trendColor)}>{trend === "up" ? "\u2191" : trend === "down" ? "\u2193" : "\u2014"} {trendValue}</span>}
      </div>
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
    </div>
  );
})
CardStat.displayName = "CardStat"

interface CardAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  initials?: string;
  size?: "sm" | "md" | "lg";
}

const avatarSizes = { sm: "w-8 h-8 text-xs", md: "w-10 h-10 text-sm", lg: "w-12 h-12 text-base" };

const CardAvatar = React.forwardRef<HTMLDivElement, CardAvatarProps>(({ className, src, initials = "?", size = "md", ...props }, ref) => {
  const { color, shape } = useCardContext();
  const activeTheme = colorThemeMap[color];

  return (
    <div
      ref={ref}
      className={cn("relative shrink-0 flex items-center justify-center font-semibold overflow-hidden", avatarSizes[size], getShapeClass(shape, "avatar"),
        color === "default" ? "bg-muted text-muted-foreground" : cn(activeTheme.accent, activeTheme.text), className)}
      {...props}
    >
      {src ? <Image src={src} alt={initials} fill className="object-cover" unoptimized /> : initials}
    </div>
  );
})
CardAvatar.displayName = "CardAvatar"

interface CardMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  aspectRatio?: "video" | "square" | "auto";
}

const aspectMap = { video: "aspect-video", square: "aspect-square", auto: "" };

const CardMedia = React.forwardRef<HTMLDivElement, CardMediaProps>(({ className, src, alt = "", aspectRatio = "video", children, ...props }, ref) => (
  <div ref={ref} className={cn("relative w-full bg-muted overflow-hidden", aspectMap[aspectRatio], className)} {...props}>
    {src ? <Image src={src} alt={alt} fill className="object-cover" unoptimized /> : children}
  </div>
))
CardMedia.displayName = "CardMedia"

interface CardActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: "primary" | "secondary" | "ghost" | "link";
}

const CardAction = React.forwardRef<HTMLButtonElement, CardActionProps>(({ className, tone = "secondary", ...props }, ref) => {
  const { color, shape, spacing } = useCardContext();
  const activeTheme = colorThemeMap[color];

  const toneClasses = tone === "primary"
    ? color === "default" ? "bg-foreground text-background hover:bg-foreground/90" : cn(activeTheme.bgActive, "text-white hover:opacity-90")
    : tone === "secondary" ? color === "default" ? "bg-muted text-foreground hover:bg-muted/80" : cn(activeTheme.accent, activeTheme.text, "hover:opacity-80")
    : tone === "ghost" ? color === "default" ? "text-muted-foreground hover:text-foreground hover:bg-muted" : cn("text-muted-foreground", `hover:${activeTheme.text}`, "hover:bg-black/5 dark:hover:bg-white/5")
    : color === "default" ? "text-foreground underline-offset-4 hover:underline p-0 h-auto" : cn(activeTheme.text, "underline-offset-4 hover:underline p-0 h-auto");

  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-offset-1 disabled:opacity-40 disabled:pointer-events-none",
        tone !== "link" ? getShapeClass(shape, "action") : "",
        tone !== "link" ? spacingPaddingMap[spacing].action : "",
        toneClasses,
        className
      )}
      {...props}
    />
  );
})
CardAction.displayName = "CardAction"

export {
  Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent,
  CardSeparator, CardBadge, CardStat, CardMedia, CardAvatar, CardAction
}
