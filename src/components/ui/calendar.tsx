/**
 * @registry-slug calendar
 * @registry-name Calendar
 * @registry-description A Future UI Calendar component.
 * @registry-category ui
 * @registry-dependency framer-motion
 * @registry-dependency lucide-react
 */
"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type CalendarColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type CalendarShape = "default" | "square" | "rounded" | "sharp";
export type CalendarSpacing = "default" | "2x" | "4x" | "6x" | "8x";

export interface CalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
  highlightedDates?: Date[];
  onHighlightToggle?: (date: Date) => void;
  disabledDates?: Date[];
  hiddenDates?: Date[];
  filterDate?: (date: Date) => boolean;
  className?: string;
  variant?: "modern" | "clean" | "minimal";
  id?: string;
  color?: CalendarColor;
  shape?: CalendarShape;
  spacing?: CalendarSpacing;
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const colorThemeMap: Record<CalendarColor, { bg: string; text: string; bgSoft: string; border: string; shadow: string; bgSoftest: string; textOnBg: string; bgDot: string }> = {
  default: { bg: "bg-primary", text: "text-primary", bgSoft: "bg-primary/10", border: "border-primary/20", shadow: "shadow-primary/30", bgSoftest: "bg-primary/5", textOnBg: "text-primary-foreground", bgDot: "bg-primary/60" },
  blue: { bg: "bg-blue-600 dark:bg-blue-500", text: "text-blue-600 dark:text-blue-500", bgSoft: "bg-blue-600/10 dark:bg-blue-500/10", border: "border-blue-600/20 dark:border-blue-500/20", shadow: "shadow-blue-600/30 dark:shadow-blue-500/30", bgSoftest: "bg-blue-600/5 dark:bg-blue-500/5", textOnBg: "text-white", bgDot: "bg-blue-600/60 dark:bg-blue-500/60" },
  emerald: { bg: "bg-emerald-600 dark:bg-emerald-500", text: "text-emerald-600 dark:text-emerald-500", bgSoft: "bg-emerald-600/10 dark:bg-emerald-500/10", border: "border-emerald-600/20 dark:border-emerald-500/20", shadow: "shadow-emerald-600/30 dark:shadow-emerald-500/30", bgSoftest: "bg-emerald-600/5 dark:bg-emerald-500/5", textOnBg: "text-white", bgDot: "bg-emerald-600/60 dark:bg-emerald-500/60" },
  rose: { bg: "bg-rose-600 dark:bg-rose-500", text: "text-rose-600 dark:text-rose-500", bgSoft: "bg-rose-600/10 dark:bg-rose-500/10", border: "border-rose-600/20 dark:border-rose-500/20", shadow: "shadow-rose-600/30 dark:shadow-rose-500/30", bgSoftest: "bg-rose-600/5 dark:bg-rose-500/5", textOnBg: "text-white", bgDot: "bg-rose-600/60 dark:bg-rose-500/60" },
  amber: { bg: "bg-amber-600 dark:bg-amber-500", text: "text-amber-600 dark:text-amber-500", bgSoft: "bg-amber-600/10 dark:bg-amber-500/10", border: "border-amber-600/20 dark:border-amber-500/20", shadow: "shadow-amber-600/30 dark:shadow-amber-500/30", bgSoftest: "bg-amber-600/5 dark:bg-amber-500/5", textOnBg: "text-white", bgDot: "bg-amber-600/60 dark:bg-amber-500/60" },
  violet: { bg: "bg-violet-600 dark:bg-violet-500", text: "text-violet-600 dark:text-violet-500", bgSoft: "bg-violet-600/10 dark:bg-violet-500/10", border: "border-violet-600/20 dark:border-violet-500/20", shadow: "shadow-violet-600/30 dark:shadow-violet-500/30", bgSoftest: "bg-violet-600/5 dark:bg-violet-500/5", textOnBg: "text-white", bgDot: "bg-violet-600/60 dark:bg-violet-500/60" },
  indigo: { bg: "bg-indigo-600 dark:bg-indigo-500", text: "text-indigo-600 dark:text-indigo-500", bgSoft: "bg-indigo-600/10 dark:bg-indigo-500/10", border: "border-indigo-600/20 dark:border-indigo-500/20", shadow: "shadow-indigo-600/30 dark:shadow-indigo-500/30", bgSoftest: "bg-indigo-600/5 dark:bg-indigo-500/5", textOnBg: "text-white", bgDot: "bg-indigo-600/60 dark:bg-indigo-500/60" },
  sky: { bg: "bg-sky-600 dark:bg-sky-500", text: "text-sky-600 dark:text-sky-500", bgSoft: "bg-sky-600/10 dark:bg-sky-500/10", border: "border-sky-600/20 dark:border-sky-500/20", shadow: "shadow-sky-600/30 dark:shadow-sky-500/30", bgSoftest: "bg-sky-600/5 dark:bg-sky-500/5", textOnBg: "text-white", bgDot: "bg-sky-600/60 dark:bg-sky-500/60" },
  slate: { bg: "bg-slate-600 dark:bg-slate-500", text: "text-slate-600 dark:text-slate-400", bgSoft: "bg-slate-600/10 dark:bg-slate-500/10", border: "border-slate-600/20 dark:border-slate-500/20", shadow: "shadow-slate-600/30 dark:shadow-slate-500/30", bgSoftest: "bg-slate-600/5 dark:bg-slate-500/5", textOnBg: "text-white", bgDot: "bg-slate-600/60 dark:bg-slate-500/60" },
  orange: { bg: "bg-orange-600 dark:bg-orange-500", text: "text-orange-600 dark:text-orange-500", bgSoft: "bg-orange-600/10 dark:bg-orange-500/10", border: "border-orange-600/20 dark:border-orange-500/20", shadow: "shadow-orange-600/30 dark:shadow-orange-500/30", bgSoftest: "bg-orange-600/5 dark:bg-orange-500/5", textOnBg: "text-white", bgDot: "bg-orange-600/60 dark:bg-orange-500/60" },
};

const getShapeClass = (shape: CalendarShape) => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-lg sm:rounded-xl";
    case "rounded": return "rounded-2xl sm:rounded-3xl";
    case "default": return "rounded-3xl sm:rounded-[2.5rem]";
  }
};

const getItemShapeClass = (shape: CalendarShape) => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-sm";
    case "rounded": return "rounded-xl";
    case "default": return "rounded-2xl";
  }
};

const getSpacingClass = (spacing: CalendarSpacing) => {
  switch (spacing) {
    case "2x": return "p-2 sm:p-4";
    case "4x": return "p-4 sm:p-7";
    case "6x": return "p-6 sm:p-10";
    case "8x": return "p-8 sm:p-12";
    default: return "p-4 sm:p-7";
  }
};

export const Calendar: React.FC<CalendarProps> = React.memo(({
          value,
          onChange,
          highlightedDates = [],
          onHighlightToggle,
          disabledDates = [],
          hiddenDates = [],
          filterDate,
          className,
          variant = "modern",
          id: providedId,
          color = "default",
          shape = "default",
          spacing = "default",
        }) => {
          const today = new Date();
          const [viewDate, setViewDate] = useState(value || today);
          const [direction, setDirection] = useState(0);
          const internalId = React.useId();
          const calendarId = providedId || internalId;

          const activeTheme = colorThemeMap[color];
          const shapeClass = getShapeClass(shape);
          const itemShapeClass = getItemShapeClass(shape);
          const spacingClass = getSpacingClass(spacing);

          const month = viewDate.getMonth();
          const year = viewDate.getFullYear();

          const daysInMonth = useMemo(() => {
            const firstDayOfMonth = new Date(year, month, 1).getDay();
            const daysInM = new Date(year, month + 1, 0).getDate();
            
            const days = [];
            const prevMonthLastDay = new Date(year, month, 0).getDate();
            
            for (let i = firstDayOfMonth - 1; i >= 0; i--) {
              days.push({
                date: new Date(year, month - 1, prevMonthLastDay - i),
                isCurrentMonth: false,
              });
            }

            for (let i = 1; i <= daysInM; i++) {
              days.push({
                date: new Date(year, month, i),
                isCurrentMonth: true,
              });
            }

            const remainingDays = 42 - days.length;
            for (let i = 1; i <= remainingDays; i++) {
              days.push({
                date: new Date(year, month + 1, i),
                isCurrentMonth: false,
              });
            }

            return days;
          }, [month, year]);

          const isSameDay = (d1: Date, d2: Date) => {
            return (
              d1.getDate() === d2.getDate() &&
              d1.getMonth() === d2.getMonth() &&
              d1.getFullYear() === d2.getFullYear()
            );
          };

          const isHighlighted = (date: Date) => {
            return highlightedDates.some(hd => isSameDay(hd, date));
          };

          const isDisabled = (date: Date) => {
            if (disabledDates.some(dd => isSameDay(dd, date))) return true;
            if (filterDate && !filterDate(date)) return true;
            return false;
          };

          const handleDateClick = (date: Date) => {
            if (onHighlightToggle) {
              onHighlightToggle(date);
            } else {
              onChange?.(date);
            }
          };

          const navigateMonth = (step: number) => {
            setDirection(step);
            setViewDate(new Date(year, month + step, 1));
          };

          const getVariantStyles = () => {
            switch (variant) {
              case "modern":
                return "bg-background/40 backdrop-blur-2xl border border-border/50 shadow-[0_20px_50px_0] shadow-foreground/10 dark:shadow-foreground/5";
              case "clean":
                return "bg-card border-border/60 shadow-sm";
              case "minimal":
                return "bg-transparent border-transparent p-0";
              default:
                return "bg-background border-border shadow-sm";
            }
          };

          return (
            <LayoutGroup id={calendarId}>
              <div 
                className={cn(
                  "w-full max-w-sm border select-none overflow-hidden shrink-0",
                  shapeClass,
                  spacingClass,
                  getVariantStyles(),
                  className
                )}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-8 px-1">
                  <div className="flex flex-col">
                    <AnimatePresence mode="wait">
                      <motion.h2 
                        key={month}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="text-2xl font-bold tracking-tight text-foreground/90"
                      >
                        {MONTHS[month]}
                      </motion.h2>
                    </AnimatePresence>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40 mt-0.5">
                      {year}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 bg-muted/30 p-1 rounded-2xl border border-border/10">
                    <button
                      onClick={() => navigateMonth(-1)}
                      className="p-2 rounded-xl hover:bg-background/50 hover:shadow-sm transition-all text-muted-foreground hover:text-foreground"
                    >
                      <ChevronLeft size={18} strokeWidth={2.5} />
                    </button>
                    <button
                      onClick={() => navigateMonth(1)}
                      className="p-2 rounded-xl hover:bg-background/50 hover:shadow-sm transition-all text-muted-foreground hover:text-foreground"
                    >
                      <ChevronRight size={18} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>

                {/* Days Header */}
                <div className="grid grid-cols-7 mb-4">
                  {DAYS.map(day => (
                    <div key={day} className="text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground/30">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="relative w-full">
                  <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                    <motion.div
                      key={`${month}-${year}`}
                      initial={{ opacity: 0, scale: 0.98, x: direction * 10 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 1.02, x: direction * -10 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 30,
                        mass: 0.8
                      }}
                      className="grid grid-cols-7 gap-y-1"
                    >
                      {daysInMonth.map((item, idx) => {
                        const { date, isCurrentMonth } = item;
                        const selected = value && isSameDay(date, value);
                        const highlighted = isHighlighted(date);
                        const disabled = isDisabled(date);
                        const isToday = isSameDay(date, today);

                        return (
                          <div key={idx} className="relative aspect-square flex items-center justify-center p-0.5 sm:p-1">
                            {selected && (
                              <motion.div
                                layoutId="selected-indicator"
                                className={cn("absolute inset-1 shadow-lg z-0", activeTheme.bg, activeTheme.shadow, itemShapeClass)}
                                transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                              />
                            )}
                            {highlighted && !selected && (
                              <motion.div
                                layoutId={`highlight-${date.toDateString()}`}
                                className={cn("absolute inset-1 border-2 z-0", activeTheme.border, activeTheme.bgSoftest, itemShapeClass)}
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                              />
                            )}
                            
                            <motion.button
                              whileTap={{ scale: 0.85 }}
                              onClick={() => !disabled && handleDateClick(date)}
                              disabled={disabled}
                              className={cn(
                                "relative z-10 w-full h-full flex flex-col items-center justify-center transition-all duration-300",
                                !isCurrentMonth && "opacity-[0.15] scale-90",
                                isCurrentMonth && !selected && !highlighted && cn("hover:bg-muted/40 text-foreground/60 hover:text-foreground", itemShapeClass),
                                selected && activeTheme.textOnBg,
                                highlighted && !selected && cn(activeTheme.text, "font-bold"),
                                disabled && "opacity-5 cursor-not-allowed grayscale"
                              )}
                            >
                              <span className="text-xs sm:text-sm font-semibold tabular-nums">{date.getDate()}</span>
                              {isToday && !selected && (
                                <div className={cn("absolute bottom-1.5 w-1 h-1 rounded-full", activeTheme.bgDot)} />
                              )}
                            </motion.button>
                          </div>
                        );
                      })}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Footer */}
                <div className="mt-6 pt-6 border-t border-border/10 flex items-center justify-between">
                  <button 
                    onClick={() => {
                      const now = new Date();
                      setViewDate(now);
                      onChange?.(now);
                    }}
                    className={cn("flex items-center gap-2 px-4 py-2 hover:bg-muted/50 transition-all group", itemShapeClass)}
                  >
                    <div className={cn("p-1 rounded-lg transition-colors group-hover:text-white", activeTheme.bgSoft, activeTheme.text, "group-hover:" + activeTheme.bg.split(' ')[0])}>
                      <CalendarIcon size={12} strokeWidth={3} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground/60 group-hover:text-foreground transition-colors">
                      Today
                    </span>
                  </button>
                  
                  {value && (
                    <div className="flex flex-col items-end pr-1">
                      <span className="text-[10px] font-bold text-muted-foreground/30 uppercase tracking-widest">Selected</span>
                      <span 
                        suppressHydrationWarning
                        className="text-xs font-bold text-foreground/80 tracking-tight"
                      >
                        {value.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </LayoutGroup>
          );
        });
Calendar.displayName = "Calendar";
