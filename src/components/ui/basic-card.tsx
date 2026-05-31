/**
 * @registry-slug basic-card
 * @registry-name Basic Card
 * @registry-dependency class-variance-authority
 */
"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────
// CARD ROOT
// ─────────────────────────────────────────────

const cardVariants = cva(
  [
    "relative w-full flex flex-col text-foreground",
    "transition-colors duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  ],
  {
    variants: {
      variant: {
        /** Clean bordered card — dashboards, apps */
        default: [
          "bg-background border border-border rounded-xl p-6",
          "hover:border-border/80",
        ],
        /** Layered surface with elevated border hierarchy */
        elevated: [
          "bg-card border border-border/60 rounded-xl p-6",
          "ring-1 ring-border/20",
          "hover:border-border hover:ring-border/40",
        ],
        /** Entire surface is a clickable interactive element */
        interactive: [
          "bg-background border border-border rounded-xl p-6 cursor-pointer select-none",
          "hover:bg-muted/40 hover:border-border/80",
          "active:bg-muted/60 active:scale-[1.005]",
          "data-[selected=true]:border-foreground/30 data-[selected=true]:bg-muted/30",
        ],
        /** Landing page feature showcase */
        feature: [
          "bg-background border border-border rounded-2xl p-8",
          "hover:border-border/70",
        ],
        /** Metrics and KPI display */
        stats: [
          "bg-background border border-border rounded-xl p-6",
          "hover:bg-muted/20 hover:border-border/80",
        ],
        /** Articles, blogs, content preview */
        content: [
          "bg-background border border-border rounded-xl overflow-hidden",
          "hover:border-border/80",
        ],
        /** Dense layout for tables and sidebars */
        compact: [
          "bg-background border border-border rounded-lg p-4",
          "hover:bg-muted/30 hover:border-border/70",
        ],
        /** Supports image or illustration header */
        media: [
          "bg-background border border-border rounded-xl overflow-hidden",
          "hover:border-border/80",
        ],
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
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
  selected?: boolean;
  disabled?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, disabled, selected, children, ...props }, ref) => (
    <div
      ref={ref}
      data-selected={selected ?? undefined}
      aria-disabled={disabled ?? undefined}
      className={cn(cardVariants({ variant, disabled }), className)}
      {...props}
    >
      {children}
    </div>
  )
);
Card.displayName = "Card";

// ─────────────────────────────────────────────
// CARD HEADER
// ─────────────────────────────────────────────

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

// ─────────────────────────────────────────────
// CARD TITLE
// ─────────────────────────────────────────────

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-base font-semibold leading-snug tracking-tight text-foreground",
      className
    )}
    {...props}
  >
    {children}
  </h3>
));
CardTitle.displayName = "CardTitle";

// ─────────────────────────────────────────────
// CARD DESCRIPTION
// ─────────────────────────────────────────────

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground leading-relaxed", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

// ─────────────────────────────────────────────
// CARD CONTENT
// ─────────────────────────────────────────────

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-4", className)} {...props} />
));
CardContent.displayName = "CardContent";

// ─────────────────────────────────────────────
// CARD FOOTER
// ─────────────────────────────────────────────

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center gap-3 pt-4 mt-auto border-t border-border/50",
      className
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

// ─────────────────────────────────────────────
// CARD SEPARATOR  (thin visual divider)
// ─────────────────────────────────────────────

export const CardSeparator = React.forwardRef<
  HTMLHRElement,
  React.HTMLAttributes<HTMLHRElement>
>(({ className, ...props }, ref) => (
  <hr
    ref={ref}
    className={cn("border-none border-t border-border/50 my-0", className)}
    {...props}
  />
));
CardSeparator.displayName = "CardSeparator";

// ─────────────────────────────────────────────
// CARD BADGE  (inline label / tag)
// ─────────────────────────────────────────────

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium tracking-wide transition-colors duration-150",
  {
    variants: {
      tone: {
        default: "bg-muted text-muted-foreground",
        success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
        danger: "bg-red-500/10 text-red-600 dark:text-red-400",
        info: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
        neutral: "bg-foreground/5 text-foreground/70 border border-border/50",
      },
    },
    defaultVariants: { tone: "default" },
  }
);

export interface CardBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const CardBadge = React.forwardRef<HTMLSpanElement, CardBadgeProps>(
  ({ className, tone, ...props }, ref) => (
    <span ref={ref} className={cn(badgeVariants({ tone }), className)} {...props} />
  )
);
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

export const CardStat = React.forwardRef<HTMLDivElement, CardStatProps>(
  ({ className, value, label, trend, trendValue, ...props }, ref) => {
    const trendColor =
      trend === "up"
        ? "text-emerald-500"
        : trend === "down"
        ? "text-red-500"
        : "text-muted-foreground";

    return (
      <div ref={ref} className={cn("flex flex-col gap-1", className)} {...props}>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-semibold tracking-tight text-foreground tabular-nums">
            {value}
          </span>
          {trendValue && (
            <span className={cn("text-xs font-medium", trendColor)}>
              {trend === "up" ? "↑" : trend === "down" ? "↓" : "—"} {trendValue}
            </span>
          )}
        </div>
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
          {label}
        </span>
      </div>
    );
  }
);
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

export const CardAvatar = React.forwardRef<HTMLDivElement, CardAvatarProps>(
  ({ className, src, initials = "?", size = "md", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "shrink-0 rounded-full flex items-center justify-center font-semibold bg-muted text-muted-foreground overflow-hidden",
        avatarSizes[size],
        className
      )}
      {...props}
    >
      {src ? (
        <img src={src} alt={initials} className="w-full h-full object-cover" />
      ) : (
        initials
      )}
    </div>
  )
);
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

export const CardMedia = React.forwardRef<HTMLDivElement, CardMediaProps>(
  ({ className, src, alt = "", aspectRatio = "video", children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "w-full bg-muted overflow-hidden",
        aspectMap[aspectRatio],
        className
      )}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        children
      )}
    </div>
  )
);
CardMedia.displayName = "CardMedia";

// ─────────────────────────────────────────────
// CARD ACTION BUTTON  (minimal inline action)
// ─────────────────────────────────────────────

const actionVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium text-sm",
    "transition-colors duration-150 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
    "disabled:opacity-40 disabled:pointer-events-none",
  ],
  {
    variants: {
      tone: {
        primary:
          "bg-foreground text-background hover:bg-foreground/90 px-4 py-2",
        secondary:
          "bg-muted text-foreground hover:bg-muted/80 px-4 py-2",
        ghost:
          "text-muted-foreground hover:text-foreground hover:bg-muted px-3 py-1.5",
        link:
          "text-foreground underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
      },
    },
    defaultVariants: { tone: "secondary", size: "md" },
  }
);

export interface CardActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof actionVariants> {}

export const CardAction = React.forwardRef<HTMLButtonElement, CardActionProps>(
  ({ className, tone, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(actionVariants({ tone, size }), className)}
      {...props}
    />
  )
);
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

export const BasicCard = React.forwardRef<HTMLDivElement, BasicCardProps>(
  (
    {
      className,
      variant = "default",
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
        <Card ref={ref} variant="media" className={cn("max-w-sm w-full", className)} {...props}>
          <CardMedia src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" aspectRatio="video" />
          <div className="p-6 flex flex-col gap-4">
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
        <Card ref={ref} variant="content" className={cn("max-w-sm w-full", className)} {...props}>
          <div className="p-6 flex flex-col gap-5">
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
        <Card ref={ref} variant="stats" className={cn("max-w-sm w-full", className)} {...props}>
          <CardHeader className="flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
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
        <Card ref={ref} variant="compact" className={cn("max-w-sm w-full flex-row items-center gap-4", className)} {...props}>
          <CardAvatar initials={avatarInitials} size="sm" />
          <div className="flex flex-col flex-1">
            <CardTitle className="text-sm">{name}</CardTitle>
            <CardDescription className="text-xs">{title}</CardDescription>
          </div>
          <CardAction tone="ghost" size="sm" onClick={onSecondaryClick}>
            View
          </CardAction>
        </Card>
      );
    }

    if (variant === "feature") {
      return (
        <Card ref={ref} variant="feature" className={cn("max-w-sm w-full items-center text-center gap-4", className)} {...props}>
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-2">
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
      <Card ref={ref} variant={variant} className={cn("gap-5 max-w-sm w-full", className)} {...props}>
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
        <CardContent className="gap-5 p-0">
          <CardDescription>{description}</CardDescription>

          {/* Stats */}
          {stats && stats.length > 0 && variant !== "interactive" && (
            <div className="flex items-center gap-6">
              {stats.map((s, i) => (
                <CardStat key={i} value={s.value} label={s.label} />
              ))}
            </div>
          )}
        </CardContent>

        {/* Footer */}
        {variant !== "interactive" && (
          <CardFooter className="px-0 pb-0">
            {primaryCtaText && (
              <CardAction tone="primary" onClick={onPrimaryClick} className="flex-1">
                {primaryCtaText}
              </CardAction>
            )}
            {secondaryCtaText && (
              <CardAction tone="secondary" onClick={onSecondaryClick} className="flex-1">
                {secondaryCtaText}
              </CardAction>
            )}
          </CardFooter>
        )}
      </Card>
    );
  }
);
BasicCard.displayName = "BasicCard";