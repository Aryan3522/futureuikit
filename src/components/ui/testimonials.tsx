/**
 * @registry-slug testimonials
 * @registry-name Testimonials
 * @registry-description A testimonial section with star ratings, shown as an infinite marquee or a static grid.
 * @registry-category layout
 * @registry-type components:ui
 * @registry-dependency class-variance-authority
 * @registry-dependency framer-motion
 * @registry-dependency lucide-react
 * @registry-is-new
 */
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export type TestimonialsColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";

const avatarAccentMap: Record<TestimonialsColor, string> = {
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
};

export interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  avatar?: string;
  rating?: number;
}

const TestimonialCard = ({
  testimonial,
  color = "default",
  className,
}: {
  testimonial: Testimonial;
  color?: TestimonialsColor;
  className?: string;
}) => (
  <figure
    className={cn(
      "flex w-80 shrink-0 flex-col gap-4 rounded-2xl border border-border/60 bg-background p-6 transition-shadow duration-300 hover:shadow-lg hover:shadow-black/5",
      className
    )}
  >
    {typeof testimonial.rating === "number" && (
      <div className="flex gap-0.5" aria-label={`${testimonial.rating} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={cn(
              "size-4",
              i < (testimonial.rating ?? 0) ? "fill-amber-400 text-amber-400" : "text-border"
            )}
            aria-hidden="true"
          />
        ))}
      </div>
    )}
    <blockquote className="text-sm leading-relaxed text-muted-foreground">
      &ldquo;{testimonial.quote}&rdquo;
    </blockquote>
    <figcaption className="mt-auto flex items-center gap-3">
      <span
        className={cn(
          "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold uppercase overflow-hidden",
          avatarAccentMap[color]
        )}
      >
        {testimonial.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={testimonial.avatar} alt="" className="h-full w-full object-cover" />
        ) : (
          testimonial.author.charAt(0)
        )}
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-foreground">{testimonial.author}</p>
        {testimonial.role && <p className="truncate text-xs text-muted-foreground">{testimonial.role}</p>}
      </div>
    </figcaption>
  </figure>
);

export interface TestimonialsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  items: Testimonial[];
  color?: TestimonialsColor;
  variant?: "marquee" | "grid";
  /** Seconds for one full marquee loop. */
  duration?: number;
  /** Pause the marquee on hover. */
  pauseOnHover?: boolean;
}

const MarqueeRow = ({
  items,
  color,
  duration,
  reverse,
  pauseOnHover,
}: {
  items: Testimonial[];
  color: TestimonialsColor;
  duration: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
}) => {
  const [paused, setPaused] = React.useState(false);
  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
      <motion.div
        className="flex gap-4 w-max"
        animate={paused ? {} : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {[...items, ...items].map((t, i) => (
          <TestimonialCard key={`${t.author}-${i}`} testimonial={t} color={color} />
        ))}
      </motion.div>
    </div>
  );
};

const Testimonials = React.forwardRef<HTMLDivElement, TestimonialsProps>(
  ({ className, items, color = "default", variant = "marquee", duration = 40, pauseOnHover = true, ...props }, ref) => {
    if (variant === "grid") {
      return (
        <div ref={ref} className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)} {...props}>
          {items.map((t, i) => (
            <motion.div
              key={`${t.author}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
            >
              <TestimonialCard testimonial={t} color={color} className="w-full h-full" />
            </motion.div>
          ))}
        </div>
      );
    }

    const half = Math.ceil(items.length / 2);
    return (
      <div ref={ref} className={cn("flex flex-col gap-4", className)} {...props}>
        <MarqueeRow items={items.slice(0, half)} color={color} duration={duration} pauseOnHover={pauseOnHover} />
        {items.length > 2 && (
          <MarqueeRow items={items.slice(half)} color={color} duration={duration} reverse pauseOnHover={pauseOnHover} />
        )}
      </div>
    );
  }
);
Testimonials.displayName = "Testimonials";

export { Testimonials, TestimonialCard };
