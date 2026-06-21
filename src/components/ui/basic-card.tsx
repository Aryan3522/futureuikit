/**
 * @registry-slug basic-card
 * @registry-name Basic Card
 * @registry-description A Future UI Basic Card component.
 * @registry-category ui
 * @registry-dependency class-variance-authority
 */
"use client";

import React from "react";
import Image from "next/image";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

export type CardColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type CardShape = "default" | "square" | "rounded" | "sharp";
export type CardSpacing = "default" | "2x" | "4x" | "6x" | "8x";

interface CardContextType {
  color: CardColor;
  shape: CardShape;
  spacing: CardSpacing;
}

const CardContext = React.createContext<CardContextType>({
  color: "default",
  shape: "default",
  spacing: "default"
});

export const useCard = () => React.useContext(CardContext);

export const colorThemeMap: Record<CardColor, { bgActive: string; text: string; border: string; borderActive: string; ring: string; bgSoft: string; textSoft: string }> = {
  default: { bgActive: "bg-foreground", text: "text-foreground", textSoft: "text-muted-foreground", border: "border-border", borderActive: "border-border", ring: "ring-ring/20", bgSoft: "bg-muted" },
  blue: { bgActive: "bg-blue-600", text: "text-blue-600 dark:text-blue-400", textSoft: "text-blue-500/80", border: "border-blue-200 dark:border-blue-900/50", borderActive: "border-blue-500", ring: "focus-visible:ring-blue-500/20", bgSoft: "bg-blue-50 dark:bg-blue-900/20" },
  emerald: { bgActive: "bg-emerald-600", text: "text-emerald-600 dark:text-emerald-400", textSoft: "text-emerald-500/80", border: "border-emerald-200 dark:border-emerald-900/50", borderActive: "border-emerald-500", ring: "focus-visible:ring-emerald-500/20", bgSoft: "bg-emerald-50 dark:bg-emerald-900/20" },
  rose: { bgActive: "bg-rose-600", text: "text-rose-600 dark:text-rose-400", textSoft: "text-rose-500/80", border: "border-rose-200 dark:border-rose-900/50", borderActive: "border-rose-500", ring: "focus-visible:ring-rose-500/20", bgSoft: "bg-rose-50 dark:bg-rose-900/20" },
  amber: { bgActive: "bg-amber-500", text: "text-amber-600 dark:text-amber-400", textSoft: "text-amber-500/80", border: "border-amber-200 dark:border-amber-900/50", borderActive: "border-amber-500", ring: "focus-visible:ring-amber-500/20", bgSoft: "bg-amber-50 dark:bg-amber-900/20" },
  violet: { bgActive: "bg-violet-600", text: "text-violet-600 dark:text-violet-400", textSoft: "text-violet-500/80", border: "border-violet-200 dark:border-violet-900/50", borderActive: "border-violet-500", ring: "focus-visible:ring-violet-500/20", bgSoft: "bg-violet-50 dark:bg-violet-900/20" },
  indigo: { bgActive: "bg-indigo-600", text: "text-indigo-600 dark:text-indigo-400", textSoft: "text-indigo-500/80", border: "border-indigo-200 dark:border-indigo-900/50", borderActive: "border-indigo-500", ring: "focus-visible:ring-indigo-500/20", bgSoft: "bg-indigo-50 dark:bg-indigo-900/20" },
  sky: { bgActive: "bg-sky-500", text: "text-sky-600 dark:text-sky-400", textSoft: "text-sky-500/80", border: "border-sky-200 dark:border-sky-900/50", borderActive: "border-sky-500", ring: "focus-visible:ring-sky-500/20", bgSoft: "bg-sky-50 dark:bg-sky-900/20" },
  slate: { bgActive: "bg-slate-600", text: "text-slate-600 dark:text-slate-400", textSoft: "text-slate-500/80", border: "border-slate-200 dark:border-slate-900/50", borderActive: "border-slate-500", ring: "focus-visible:ring-slate-500/20", bgSoft: "bg-slate-50 dark:bg-slate-900/20" },
  orange: { bgActive: "bg-orange-500", text: "text-orange-600 dark:text-orange-400", textSoft: "text-orange-500/80", border: "border-orange-200 dark:border-orange-900/50", borderActive: "border-orange-500", ring: "focus-visible:ring-orange-500/20", bgSoft: "bg-orange-50 dark:bg-orange-900/20" },
};

const getShapeClass = (shape: CardShape, element: "container" | "inner" | "action" | "avatar" = "container") => {
  if (element === "avatar") {
    switch(shape) {
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
    case "sharp": return "rounded-[4px]";
    case "rounded": return element === "container" ? "rounded-3xl" : "rounded-2xl";
    case "default": return element === "container" ? "rounded-xl" : "rounded-lg";
  }
};

const getSpacingClass = (spacing: CardSpacing, element: "container" | "inner" | "action" | "padding" = "padding") => {
  if (element === "action") {
    switch (spacing) {
      case "2x": return "py-1 px-2 text-xs";
      case "4x": return "py-1.5 px-3 text-sm";
      case "6x": return "py-2.5 px-5 text-base";
      case "8x": return "py-3 px-6 text-lg";
      default: return "py-2 px-4 text-sm";
    }
  }
  if (element === "inner") {
    switch (spacing) {
      case "2x": return "gap-1.5";
      case "4x": return "gap-3";
      case "6x": return "gap-5";
      case "8x": return "gap-6";
      default: return "gap-4";
    }
  }
  if (element === "container") {
    switch (spacing) {
      case "2x": return "gap-2";
      case "4x": return "gap-3";
      case "6x": return "gap-6";
      case "8x": return "gap-8";
      default: return "gap-5";
    }
  }
  switch (spacing) {
    case "2x": return "p-3";
    case "4x": return "p-4";
    case "6x": return "p-8";
    case "8x": return "p-10";
    default: return "p-6";
  }
};

// ─────────────────────────────────────────────
// CARD ROOT
// ─────────────────────────────────────────────

const cardVariants = cva(
  [
    "relative w-full flex flex-col text-foreground",
    "transition-colors duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-offset-2",
  ],
  {
    variants: {
      variant: {
        default: "bg-background border",
        elevated: "bg-card border ring-1 ring-border/20",
        interactive: "bg-background border cursor-pointer select-none active:scale-[1.005]",
        feature: "bg-background border",
        stats: "bg-background border",
        content: "bg-background border overflow-hidden",
        compact: "bg-background border",
        media: "bg-background border overflow-hidden",
      },
      disabled: {
        true: "opacity-40 pointer-events-none select-none",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      disabled: false,
    },
  }
);

export interface CardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
  selected?: boolean;
  disabled?: boolean;
  color?: CardColor;
  shape?: CardShape;
  spacing?: CardSpacing;
}

export const Card = React.memo(React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", disabled, selected, color = "default", shape = "default", spacing = "default", children, ...props }, ref) => {
    const activeTheme = colorThemeMap[color];
    
    // Interactive hover states based on color
    let hoverClass = "";
    if (variant === "interactive") hoverClass = `hover:${activeTheme.bgSoft} hover:${activeTheme.borderActive} data-[selected=true]:${activeTheme.borderActive} data-[selected=true]:${activeTheme.bgSoft}`;
    else if (variant === "default" || variant === "feature" || variant === "content" || variant === "media") hoverClass = `hover:${activeTheme.borderActive}`;
    else if (variant === "elevated") hoverClass = `hover:${activeTheme.borderActive}`;
    else if (variant === "stats") hoverClass = `hover:${activeTheme.bgSoft} hover:${activeTheme.borderActive}`;
    else if (variant === "compact") hoverClass = `hover:${activeTheme.bgSoft} hover:${activeTheme.borderActive}`;

    // Conditional padding logic
    const noPaddingVariants = ["content", "media"];
    const needsPadding = variant ? !noPaddingVariants.includes(variant) : true;

    return (
      <CardContext.Provider value={{ color, shape, spacing }}>
        <div
          ref={ref}
          data-selected={selected ?? undefined}
          aria-disabled={disabled ?? undefined}
          className={cn(
            cardVariants({ variant, disabled }),
            getShapeClass(shape, "container"),
            needsPadding ? getSpacingClass(spacing, "padding") : "",
            activeTheme.border,
            activeTheme.ring,
            hoverClass,
            className
          )}
          {...props}
        >
          {children}
        </div>
      </CardContext.Provider>
    );
  }
));
Card.displayName = "Card";

// ─────────────────────────────────────────────
// CARD HEADER
// ─────────────────────────────────────────────

export const CardHeader = React.memo(React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { spacing } = useCard();
  return (
    <div
      ref={ref}
      className={cn("flex flex-col", getSpacingClass(spacing, "inner"), className)}
      {...props}
    />
  );
}));
CardHeader.displayName = "CardHeader";

// ─────────────────────────────────────────────
// CARD TITLE
// ─────────────────────────────────────────────

export const CardTitle = React.memo(React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => {
  const { color } = useCard();
  const isDefault = color === "default";
  return (
    <h3
      ref={ref}
      className={cn(
        "text-base font-semibold leading-snug tracking-tight",
        isDefault ? "text-foreground" : colorThemeMap[color].text,
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}));
CardTitle.displayName = "CardTitle";

// ─────────────────────────────────────────────
// CARD DESCRIPTION
// ─────────────────────────────────────────────

export const CardDescription = React.memo(React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { color } = useCard();
  const isDefault = color === "default";
  return (
    <p
      ref={ref}
      className={cn(
        "text-sm leading-relaxed",
        isDefault ? "text-muted-foreground" : colorThemeMap[color].textSoft,
        className
      )}
      {...props}
    />
  );
}));
CardDescription.displayName = "CardDescription";

// ─────────────────────────────────────────────
// CARD CONTENT
// ─────────────────────────────────────────────

export const CardContent = React.memo(React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { spacing } = useCard();
  return (
    <div ref={ref} className={cn("flex flex-col", getSpacingClass(spacing, "inner"), className)} {...props} />
  );
}));
CardContent.displayName = "CardContent";

// ─────────────────────────────────────────────
// CARD FOOTER
// ─────────────────────────────────────────────

export const CardFooter = React.memo(React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { spacing, color } = useCard();
  const borderClass = color === "default" ? "border-border/50" : colorThemeMap[color].border;
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center pt-4 mt-auto border-t",
        getSpacingClass(spacing, "inner"),
        borderClass,
        className
      )}
      {...props}
    />
  );
}));
CardFooter.displayName = "CardFooter";

// ─────────────────────────────────────────────
// CARD SEPARATOR  (thin visual divider)
// ─────────────────────────────────────────────

export const CardSeparator = React.memo(React.forwardRef<
  HTMLHRElement,
  React.HTMLAttributes<HTMLHRElement>
>(({ className, ...props }, ref) => {
  const { color } = useCard();
  const borderClass = color === "default" ? "border-border/50" : colorThemeMap[color].border;
  return (
    <hr
      ref={ref}
      className={cn("border-none border-t my-0", borderClass, className)}
      {...props}
    />
  );
}));
CardSeparator.displayName = "CardSeparator";

// ─────────────────────────────────────────────
// CARD BADGE  (inline label / tag)
// ─────────────────────────────────────────────

export interface CardBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "primary" | "success" | "warning" | "danger" | "info" | "neutral";
}

export const CardBadge = React.memo(React.forwardRef<HTMLSpanElement, CardBadgeProps>(
  ({ className, tone = "primary", ...props }, ref) => {
    const { color, shape } = useCard();
    const activeTheme = colorThemeMap[color];
    
    let toneClasses = "";
    if (tone === "primary") {
      toneClasses = color === "default" ? "bg-muted text-muted-foreground" : cn(activeTheme.bgSoft, activeTheme.text);
    } else if (tone === "success") {
      toneClasses = "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
    } else if (tone === "warning") {
      toneClasses = "bg-amber-500/10 text-amber-600 dark:text-amber-400";
    } else if (tone === "danger") {
      toneClasses = "bg-red-500/10 text-red-600 dark:text-red-400";
    } else if (tone === "info") {
      toneClasses = "bg-blue-500/10 text-blue-600 dark:text-blue-400";
    } else {
      toneClasses = "bg-foreground/5 text-foreground/70 border border-border/50";
    }

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center px-2 py-0.5 text-[11px] font-medium tracking-wide transition-colors duration-150",
          getShapeClass(shape, "action"),
          toneClasses,
          className
        )}
        {...props}
      />
    );
  }
));
CardBadge.displayName = "CardBadge";

// ─────────────────────────────────────────────
// CARD STAT  (single metric unit)
// ─────────────────────────────────────────────

export interface CardStatProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  label: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

export const CardStat = React.memo(React.forwardRef<HTMLDivElement, CardStatProps>(
  ({ className, value, label, trend, trendValue, ...props }, ref) => {
    const { color, spacing } = useCard();
    const activeTheme = colorThemeMap[color];
    
    const trendColor =
      trend === "up"
        ? "text-emerald-500"
        : trend === "down"
        ? "text-red-500"
        : color === "default" ? "text-muted-foreground" : activeTheme.textSoft;

    return (
      <div ref={ref} className={cn("flex flex-col gap-1", className)} {...props}>
        <div className="flex items-baseline gap-2">
          <span className={cn("text-2xl font-semibold tracking-tight tabular-nums", color === "default" ? "text-foreground" : activeTheme.text)}>
            {value}
          </span>
          {trendValue && (
            <span className={cn("text-xs font-medium", trendColor)}>
              {trend === "up" ? "↑" : trend === "down" ? "↓" : "—"} {trendValue}
            </span>
          )}
        </div>
        <span className={cn("text-xs font-medium uppercase tracking-wider", color === "default" ? "text-muted-foreground" : activeTheme.textSoft)}>
          {label}
        </span>
      </div>
    );
  }
));
CardStat.displayName = "CardStat";

// ─────────────────────────────────────────────
// CARD AVATAR  (initials or image)
// ─────────────────────────────────────────────

export interface CardAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  initials?: string;
  size?: "sm" | "md" | "lg";
}

const avatarSizes = { sm: "w-8 h-8 text-xs", md: "w-10 h-10 text-sm", lg: "w-12 h-12 text-base" };

export const CardAvatar = React.memo(React.forwardRef<HTMLDivElement, CardAvatarProps>(
  ({ className, src, initials = "?", size = "md", ...props }, ref) => {
    const { color, shape } = useCard();
    const activeTheme = colorThemeMap[color];

    return (
      <div
        ref={ref}
        className={cn(
          "relative shrink-0 flex items-center justify-center font-semibold overflow-hidden",
          avatarSizes[size],
          getShapeClass(shape, "avatar"),
          color === "default" ? "bg-muted text-muted-foreground" : cn(activeTheme.bgSoft, activeTheme.text),
          className
        )}
        {...props}
      >
        {src ? (
          <Image src={src} alt={initials} fill className="object-cover" unoptimized />
        ) : (
          initials
        )}
      </div>
    );
  }
));
CardAvatar.displayName = "CardAvatar";

// ─────────────────────────────────────────────
// CARD MEDIA  (image block at card top)
// ─────────────────────────────────────────────

export interface CardMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  aspectRatio?: "video" | "square" | "auto";
}

const aspectMap = {
  video: "aspect-video",
  square: "aspect-square",
  auto: "",
};

export const CardMedia = React.memo(React.forwardRef<HTMLDivElement, CardMediaProps>(
  ({ className, src, alt = "", aspectRatio = "video", children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative w-full bg-muted overflow-hidden",
        aspectMap[aspectRatio],
        className
      )}
      {...props}
    >
      {src ? (
        <Image src={src} alt={alt} fill className="object-cover" unoptimized />
      ) : (
        children
      )}
    </div>
  )
));
CardMedia.displayName = "CardMedia";

// ─────────────────────────────────────────────
// CARD ACTION BUTTON  (minimal inline action)
// ─────────────────────────────────────────────

export interface CardActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: "primary" | "secondary" | "ghost" | "link";
}

export const CardAction = React.memo(React.forwardRef<HTMLButtonElement, CardActionProps>(
  ({ className, tone = "secondary", ...props }, ref) => {
    const { color, shape, spacing } = useCard();
    const activeTheme = colorThemeMap[color];

    let toneClasses = "";
    if (tone === "primary") {
      toneClasses = color === "default" 
        ? "bg-foreground text-background hover:bg-foreground/90" 
        : cn(activeTheme.bgActive, "text-white hover:opacity-90");
    } else if (tone === "secondary") {
      toneClasses = color === "default"
        ? "bg-muted text-foreground hover:bg-muted/80"
        : cn(activeTheme.bgSoft, activeTheme.text, "hover:opacity-80");
    } else if (tone === "ghost") {
      toneClasses = color === "default"
        ? "text-muted-foreground hover:text-foreground hover:bg-muted"
        : cn(activeTheme.textSoft, "hover:bg-black/5 dark:hover:bg-white/5", `hover:${activeTheme.text}`);
    } else if (tone === "link") {
      toneClasses = color === "default"
        ? "text-foreground underline-offset-4 hover:underline p-0 h-auto"
        : cn(activeTheme.text, "underline-offset-4 hover:underline p-0 h-auto");
    }

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-offset-1 disabled:opacity-40 disabled:pointer-events-none",
          tone !== "link" ? getShapeClass(shape, "action") : "",
          tone !== "link" ? getSpacingClass(spacing, "action") : "",
          activeTheme.ring,
          toneClasses,
          className
        )}
        {...props}
      />
    );
  }
));
CardAction.displayName = "CardAction";

// ─────────────────────────────────────────────
// LEGACY BasicCard  (kept for backwards compat)
// ─────────────────────────────────────────────

export interface Stat {
  label: string;
  value: string;
}

export interface BasicCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: "default" | "elevated" | "interactive" | "feature" | "stats" | "content" | "compact" | "media";
  color?: CardColor;
  shape?: CardShape;
  spacing?: CardSpacing;
  name?: string;
  title?: string;
  description?: string;
  avatarInitials?: string;
  stats?: Stat[];
  badge?: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export const BasicCard = React.memo(React.forwardRef<HTMLDivElement, BasicCardProps>(
  (
    {
      className,
      variant = "default",
      color = "default",
      shape = "default",
      spacing = "default",
      name = "Aryan Hooda",
      title = "Full Stack Developer",
      description = "Building scalable web apps with React, Node.js & MongoDB. Passionate about clean UI and performance.",
      avatarInitials = "AH",
      badge = "Available",
      stats = [
        { label: "Projects", value: "24" },
        { label: "Years", value: "3+" },
        { label: "Clients", value: "12" },
      ],
      primaryCtaText = "Connect",
      secondaryCtaText = "View Profile",
      onPrimaryClick,
      onSecondaryClick,
      ...props
    },
    ref
  ) => {
    if (variant === "media") {
      return (
        <Card ref={ref} variant="media" color={color} shape={shape} spacing={spacing} className={cn("max-w-sm w-full", className)} {...props}>
          <CardMedia src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" aspectRatio="video" />
          <div className={cn("flex flex-col gap-4", getSpacingClass(spacing, "padding"))}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{name}</CardTitle>
                {badge && <CardBadge tone="success">{badge}</CardBadge>}
              </div>
              <CardDescription className="text-xs">{title}</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <CardDescription className="line-clamp-2">{description}</CardDescription>
            </CardContent>
            <CardFooter className="px-0 pb-0 pt-4">
              {primaryCtaText && (
                <CardAction tone="primary" onClick={onPrimaryClick} className="w-full">
                  Read Article
                </CardAction>
              )}
            </CardFooter>
          </div>
        </Card>
      );
    }

    if (variant === "content") {
      return (
        <Card ref={ref} variant="content" color={color} shape={shape} spacing={spacing} className={cn("max-w-sm w-full", className)} {...props}>
          <div className={cn("flex flex-col gap-5", getSpacingClass(spacing, "padding"))}>
            <CardHeader>
              <CardBadge tone="info" className="w-fit mb-2">Engineering</CardBadge>
              <CardTitle className="text-lg">The Future of UI Components</CardTitle>
              <CardDescription className="text-xs mt-1">By {name} • 5 min read</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <CardDescription>{description}</CardDescription>
            </CardContent>
            <CardFooter className="px-0 pb-0 pt-2 border-none">
              <CardAction tone="link" onClick={onPrimaryClick}>
                Read full story →
              </CardAction>
            </CardFooter>
          </div>
        </Card>
      );
    }

    if (variant === "stats") {
      return (
        <Card ref={ref} variant="stats" color={color} shape={shape} spacing={spacing} className={cn("max-w-sm w-full", className)} {...props}>
          <CardHeader className="flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            {badge && <CardBadge tone="success">+12%</CardBadge>}
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight">24,592</span>
              <span className="text-xs font-medium text-emerald-500">↑ 14%</span>
            </div>
            <CardDescription className="text-xs mt-1">Active users this month</CardDescription>
          </CardContent>
        </Card>
      );
    }

    if (variant === "compact") {
      return (
        <Card ref={ref} variant="compact" color={color} shape={shape} spacing={spacing} className={cn("max-w-sm w-full flex-row items-center", getSpacingClass(spacing, "inner"), className)} {...props}>
          <CardAvatar initials={avatarInitials} size="sm" />
          <div className="flex flex-col flex-1">
            <CardTitle className="text-sm">{name}</CardTitle>
            <CardDescription className="text-xs">{title}</CardDescription>
          </div>
          <CardAction tone="ghost" onClick={onSecondaryClick}>
            View
          </CardAction>
        </Card>
      );
    }

    if (variant === "feature") {
      return (
        <Card ref={ref} variant="feature" color={color} shape={shape} spacing={spacing} className={cn("max-w-sm w-full items-center text-center gap-4", className)} {...props}>
          <div className={cn("w-12 h-12 flex items-center justify-center mb-2", getShapeClass(shape, "avatar"), color === "default" ? "bg-primary/10 text-primary" : cn(colorThemeMap[color].bgSoft, colorThemeMap[color].text))}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
          </div>
          <CardHeader>
            <CardTitle className="text-xl">High Performance</CardTitle>
            <CardDescription className="mt-2">{description}</CardDescription>
          </CardHeader>
          <CardContent className="w-full mt-2">
            <CardAction tone="secondary" className="w-full" onClick={onPrimaryClick}>
              Learn more
            </CardAction>
          </CardContent>
        </Card>
      );
    }

    // default, elevated, interactive
    return (
      <Card ref={ref} variant={variant} color={color} shape={shape} spacing={spacing} className={cn("max-w-sm w-full", className)} {...props}>
        {/* Header */}
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CardAvatar initials={avatarInitials} size="md" />
              <div className="flex flex-col gap-0.5">
                <CardTitle>{name}</CardTitle>
                <CardDescription className="text-xs">{title}</CardDescription>
              </div>
            </div>
            {badge && variant !== "interactive" && <CardBadge tone="success">{badge}</CardBadge>}
          </div>
        </CardHeader>

        <CardSeparator />

        {/* Body */}
        <CardContent className="p-0">
          <CardDescription>{description}</CardDescription>

          {/* Stats */}
          {stats && stats.length > 0 && variant !== "interactive" && (
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-2">
              {stats.map((s, i) => (
                <CardStat key={i} value={s.value} label={s.label} />
              ))}
            </div>
          )}
        </CardContent>

        {/* Footer */}
        {variant !== "interactive" && (
          <CardFooter className="px-0 pb-0 flex-col sm:flex-row gap-3">
            {primaryCtaText && (
              <CardAction tone="primary" onClick={onPrimaryClick} className="w-full flex-1">
                {primaryCtaText}
              </CardAction>
            )}
            {secondaryCtaText && (
              <CardAction tone="secondary" onClick={onSecondaryClick} className="w-full flex-1">
                {secondaryCtaText}
              </CardAction>
            )}
          </CardFooter>
        )}
      </Card>
    );
  }
));
BasicCard.displayName = "BasicCard";