/**
 * @registry-slug avatar
 * @registry-name Avatar
 * @registry-description An avatar with image fallback, status dot, colors, sizes, and stackable groups.
 * @registry-category ui
 * @registry-type components:ui
 * @registry-dependency class-variance-authority
 * @registry-is-new
 */
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export type AvatarColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";

const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden select-none font-semibold uppercase align-middle",
  {
    variants: {
      color: {
        default: "bg-muted text-foreground",
        blue: "bg-blue-600/15 text-blue-600 dark:text-blue-400",
        emerald: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
        rose: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
        amber: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
        violet: "bg-violet-600/15 text-violet-600 dark:text-violet-400",
        indigo: "bg-indigo-600/15 text-indigo-600 dark:text-indigo-400",
        sky: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
        slate: "bg-slate-600/15 text-slate-600 dark:text-slate-400",
        orange: "bg-orange-500/15 text-orange-600 dark:text-orange-400",
      },
      size: {
        xs: "h-6 w-6 text-[10px]",
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
        xl: "h-16 w-16 text-lg",
      },
      shape: {
        default: "rounded-full",
        square: "rounded-none",
        rounded: "rounded-xl",
        sharp: "rounded-[2px]",
      },
      ring: {
        none: "",
        subtle: "ring-2 ring-border",
        contrast: "ring-2 ring-background",
      },
    },
    defaultVariants: {
      color: "default",
      size: "md",
      shape: "default",
      ring: "none",
    },
  }
);

const statusColorMap = {
  online: "bg-emerald-500",
  offline: "bg-slate-400",
  busy: "bg-rose-500",
  away: "bg-amber-500",
} as const;

export interface AvatarProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  /** Fallback text (initials). Derived from alt when omitted. */
  fallback?: string;
  /** Presence indicator dot. */
  status?: keyof typeof statusColorMap;
}

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, color, size, shape, ring, src, alt, fallback, status, ...props }, ref) => {
    const [errored, setErrored] = React.useState(false);
    const showImage = src && !errored;
    const initials =
      fallback ??
      (alt || "")
        .split(/\s+/)
        .map((w) => w[0])
        .filter(Boolean)
        .slice(0, 2)
        .join("");

    return (
      <span ref={ref} className={cn(avatarVariants({ color, size, shape, ring }), className)} {...props}>
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt ?? ""}
            onError={() => setErrored(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <span aria-hidden="true">{initials || "?"}</span>
        )}
        {status && (
          <span
            className={cn(
              "absolute bottom-0 right-0 block h-1/4 w-1/4 min-h-2 min-w-2 rounded-full ring-2 ring-background",
              statusColorMap[status]
            )}
            aria-label={status}
            role="status"
          />
        )}
      </span>
    );
  }
);
Avatar.displayName = "Avatar";

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum avatars shown before collapsing into a "+N" counter. */
  max?: number;
  size?: AvatarProps["size"];
  shape?: AvatarProps["shape"];
}

const AvatarGroup = ({ className, children, max, size = "md", shape = "default", ...props }: AvatarGroupProps) => {
  const items = React.Children.toArray(children);
  const visible = max ? items.slice(0, max) : items;
  const overflow = max ? items.length - max : 0;

  return (
    <div className={cn("flex items-center -space-x-2", className)} {...props}>
      {visible.map((child, i) =>
        React.isValidElement<AvatarProps>(child)
          ? React.cloneElement(child, { key: i, size, shape, ring: "contrast" })
          : child
      )}
      {overflow > 0 && (
        <Avatar
          size={size}
          shape={shape}
          ring="contrast"
          fallback={`+${overflow}`}
          className="bg-muted text-muted-foreground normal-case"
        />
      )}
    </div>
  );
};

export { Avatar, AvatarGroup, avatarVariants };
