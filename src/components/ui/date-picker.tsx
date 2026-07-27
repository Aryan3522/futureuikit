/**
 * @registry-slug date-picker
 * @registry-name Date Picker
 * @registry-description A self-contained date picker with an animated popover calendar, month navigation, and colors.
 * @registry-category form
 * @registry-type components:ui
 * @registry-dependency class-variance-authority
 * @registry-dependency framer-motion
 * @registry-dependency lucide-react
 * @registry-is-new
 */
"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type DatePickerColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";

const accentMap: Record<DatePickerColor, { solid: string; today: string }> = {
  default: { solid: "bg-foreground text-background", today: "text-foreground ring-1 ring-foreground/30" },
  blue: { solid: "bg-blue-600 text-white", today: "text-blue-600 ring-1 ring-blue-600/40" },
  emerald: { solid: "bg-emerald-500 text-white", today: "text-emerald-600 ring-1 ring-emerald-500/40" },
  rose: { solid: "bg-rose-500 text-white", today: "text-rose-600 ring-1 ring-rose-500/40" },
  amber: { solid: "bg-amber-500 text-white", today: "text-amber-600 ring-1 ring-amber-500/40" },
  violet: { solid: "bg-violet-600 text-white", today: "text-violet-600 ring-1 ring-violet-600/40" },
  indigo: { solid: "bg-indigo-600 text-white", today: "text-indigo-600 ring-1 ring-indigo-600/40" },
  sky: { solid: "bg-sky-500 text-white", today: "text-sky-600 ring-1 ring-sky-500/40" },
  slate: { solid: "bg-slate-600 text-white", today: "text-slate-600 ring-1 ring-slate-600/40" },
  orange: { solid: "bg-orange-500 text-white", today: "text-orange-600 ring-1 ring-orange-500/40" },
};

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const isSameDay = (a: Date | undefined, b: Date | undefined) =>
  !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export interface DatePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color" | "onChange" | "defaultValue"> {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
  color?: DatePickerColor;
  placeholder?: string;
  /** Format the displayed value. */
  format?: (date: Date) => string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

const defaultFormat = (date: Date) =>
  date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    { className, value: controlled, defaultValue, onChange, color = "default", placeholder = "Pick a date", format = defaultFormat, disabled, minDate, maxDate, ...props },
    ref
  ) => {
    const [internal, setInternal] = React.useState<Date | undefined>(defaultValue);
    const selected = controlled !== undefined ? controlled : internal;
    const [open, setOpen] = React.useState(false);
    const [view, setView] = React.useState(() => {
      const base = selected ?? new Date();
      return { year: base.getFullYear(), month: base.getMonth() };
    });
    const rootRef = React.useRef<HTMLDivElement>(null);
    const accent = accentMap[color];

    React.useEffect(() => {
      if (!open) return;
      const onPointerDown = (e: PointerEvent) => {
        if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
      };
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      document.addEventListener("pointerdown", onPointerDown);
      document.addEventListener("keydown", onKeyDown);
      return () => {
        document.removeEventListener("pointerdown", onPointerDown);
        document.removeEventListener("keydown", onKeyDown);
      };
    }, [open]);

    const select = (date: Date) => {
      if (controlled === undefined) setInternal(date);
      onChange?.(date);
      setOpen(false);
    };

    const navigate = (delta: number) => {
      setView((v) => {
        const next = new Date(v.year, v.month + delta, 1);
        return { year: next.getFullYear(), month: next.getMonth() };
      });
    };

    const firstDay = new Date(view.year, view.month, 1).getDay();
    const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
    const today = new Date();

    const isDisabled = (date: Date) =>
      (minDate && date < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) ||
      (maxDate && date > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate(), 23, 59, 59)) ||
      false;

    return (
      <div ref={rootRef} className={cn("relative inline-block", className)} {...props}>
        <button
          type="button"
          ref={ref as React.Ref<HTMLButtonElement> | undefined}
          disabled={disabled}
          aria-expanded={open}
          aria-haspopup="dialog"
          onClick={() => setOpen(!open)}
          className={cn(
            "flex h-10 w-60 items-center gap-2.5 rounded-lg border border-border bg-transparent px-3.5 text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-50",
            selected ? "text-foreground" : "text-muted-foreground"
          )}
        >
          <CalendarIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          {selected ? format(selected) : placeholder}
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              role="dialog"
              aria-label="Choose date"
              initial={{ opacity: 0, scale: 0.95, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 500, damping: 34 }}
              className="absolute left-0 top-full z-50 mt-2 w-72 origin-top rounded-2xl border border-border/60 bg-background p-4 shadow-xl shadow-black/10"
            >
              <div className="mb-3 flex items-center justify-between">
                <button
                  type="button"
                  aria-label="Previous month"
                  onClick={() => navigate(-1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <span className="text-sm font-semibold text-foreground">
                  {MONTHS[view.month]} {view.year}
                </span>
                <button
                  type="button"
                  aria-label="Next month"
                  onClick={() => navigate(1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center">
                {WEEKDAYS.map((d) => (
                  <span key={d} className="py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">
                    {d}
                  </span>
                ))}
                {Array.from({ length: firstDay }, (_, i) => (
                  <span key={`pad-${i}`} />
                ))}
                {Array.from({ length: daysInMonth }, (_, i) => {
                  const date = new Date(view.year, view.month, i + 1);
                  const isSelected = isSameDay(date, selected);
                  const isToday = isSameDay(date, today);
                  const dateDisabled = isDisabled(date);
                  return (
                    <button
                      key={i}
                      type="button"
                      disabled={dateDisabled}
                      aria-pressed={isSelected}
                      onClick={() => select(date)}
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition-all duration-200 mx-auto",
                        isSelected
                          ? accent.solid
                          : isToday
                            ? accent.today
                            : "text-foreground hover:bg-muted/60",
                        dateDisabled && "opacity-30 cursor-not-allowed hover:bg-transparent"
                      )}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
DatePicker.displayName = "DatePicker";

export { DatePicker };
