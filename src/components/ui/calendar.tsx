/**
 * @registry-slug calendar
 * @registry-name Calendar
 * @registry-description A Future UI Calendar component.
 * @registry-category ui
 * @registry-dependency framer-motion
 * @registry-dependency lucide-react
 * @registry-file src/components/ui/calendar-context.tsx
 */
"use client";

import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCalendarSync } from "./calendar-context";

export type CalendarColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type CalendarShape = "default" | "square" | "rounded" | "sharp";
export type CalendarSpacing = "default" | "2x" | "4x" | "6x" | "8x";
export type CalendarVariant = "solid" | "outline" | "ghost" | "link";
export type CalendarTheme = "default" | "modern" | "clean" | "futuristic" | "brutal" | "halftone";
export type CalendarMode = "picker" | "display" | "filter";

export interface CalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
  highlightedDates?: Date[];
  onHighlightToggle?: (date: Date) => void;
  disabledDates?: Date[];
  hiddenDates?: Date[];
  filterDate?: (date: Date) => boolean;
  className?: string;
  variant?: CalendarVariant;
  theme?: CalendarTheme;
  id?: string;
  color?: CalendarColor;
  shape?: CalendarShape;
  spacing?: CalendarSpacing;
  mode?: CalendarMode;
  selectedDates?: Date[];
  onSelectedDatesChange?: (dates: Date[]) => void;
  apiHighlightedDates?: Date[];
  syncGroup?: string;
  shadow?: "default" | "none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  yearRange?: { start?: number; end?: number };
  allowFutureDates?: boolean;
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const colorThemeMap: Record<CalendarColor, { bg: string; text: string; bgSoft: string; border: string; shadow: string; bgSoftest: string; textOnBg: string; bgDot: string; glow: string; brutalShadow: string; hoverBg: string; hoverText: string; groupHoverBg: string; }> = {
  default: { bg: "bg-primary", text: "text-primary", bgSoft: "bg-primary/10", border: "border-primary/20", shadow: "shadow-primary/30", bgSoftest: "bg-primary/5", textOnBg: "text-primary-foreground", bgDot: "bg-primary/60", glow: "shadow-foreground/10 dark:shadow-foreground/5", brutalShadow: "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]", hoverBg: "hover:bg-primary/10", hoverText: "hover:text-primary", groupHoverBg: "group-hover:bg-primary" },
  blue: { bg: "bg-blue-600 dark:bg-blue-500", text: "text-blue-600 dark:text-blue-500", bgSoft: "bg-blue-600/10 dark:bg-blue-500/10", border: "border-blue-600/20 dark:border-blue-500/20", shadow: "shadow-blue-600/30 dark:shadow-blue-500/30", bgSoftest: "bg-blue-600/5 dark:bg-blue-500/5", textOnBg: "text-white", bgDot: "bg-blue-600/60 dark:bg-blue-500/60", glow: "shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)]", brutalShadow: "shadow-[4px_4px_0px_0px_rgba(37,99,235,1)]", hoverBg: "hover:bg-blue-600/10 dark:hover:bg-blue-500/10", hoverText: "hover:text-blue-600 dark:hover:text-blue-500", groupHoverBg: "group-hover:bg-blue-600 dark:group-hover:bg-blue-500" },
  emerald: { bg: "bg-emerald-600 dark:bg-emerald-500", text: "text-emerald-600 dark:text-emerald-500", bgSoft: "bg-emerald-600/10 dark:bg-emerald-500/10", border: "border-emerald-600/20 dark:border-emerald-500/20", shadow: "shadow-emerald-600/30 dark:shadow-emerald-500/30", bgSoftest: "bg-emerald-600/5 dark:bg-emerald-500/5", textOnBg: "text-white", bgDot: "bg-emerald-600/60 dark:bg-emerald-500/60", glow: "shadow-[0_0_20px_-5px_rgba(5,150,105,0.4)]", brutalShadow: "shadow-[4px_4px_0px_0px_rgba(5,150,105,1)]", hoverBg: "hover:bg-emerald-600/10 dark:hover:bg-emerald-500/10", hoverText: "hover:text-emerald-600 dark:hover:text-emerald-500", groupHoverBg: "group-hover:bg-emerald-600 dark:group-hover:bg-emerald-500" },
  rose: { bg: "bg-rose-600 dark:bg-rose-500", text: "text-rose-600 dark:text-rose-500", bgSoft: "bg-rose-600/10 dark:bg-rose-500/10", border: "border-rose-600/20 dark:border-rose-500/20", shadow: "shadow-rose-600/30 dark:shadow-rose-500/30", bgSoftest: "bg-rose-600/5 dark:bg-rose-500/5", textOnBg: "text-white", bgDot: "bg-rose-600/60 dark:bg-rose-500/60", glow: "shadow-[0_0_20px_-5px_rgba(225,29,72,0.4)]", brutalShadow: "shadow-[4px_4px_0px_0px_rgba(225,29,72,1)]", hoverBg: "hover:bg-rose-600/10 dark:hover:bg-rose-500/10", hoverText: "hover:text-rose-600 dark:hover:text-rose-500", groupHoverBg: "group-hover:bg-rose-600 dark:group-hover:bg-rose-500" },
  amber: { bg: "bg-amber-600 dark:bg-amber-500", text: "text-amber-600 dark:text-amber-500", bgSoft: "bg-amber-600/10 dark:bg-amber-500/10", border: "border-amber-600/20 dark:border-amber-500/20", shadow: "shadow-amber-600/30 dark:shadow-amber-500/30", bgSoftest: "bg-amber-600/5 dark:bg-amber-500/5", textOnBg: "text-white", bgDot: "bg-amber-600/60 dark:bg-amber-500/60", glow: "shadow-[0_0_20px_-5px_rgba(217,119,6,0.4)]", brutalShadow: "shadow-[4px_4px_0px_0px_rgba(217,119,6,1)]", hoverBg: "hover:bg-amber-600/10 dark:hover:bg-amber-500/10", hoverText: "hover:text-amber-600 dark:hover:text-amber-500", groupHoverBg: "group-hover:bg-amber-600 dark:group-hover:bg-amber-500" },
  violet: { bg: "bg-violet-600 dark:bg-violet-500", text: "text-violet-600 dark:text-violet-500", bgSoft: "bg-violet-600/10 dark:bg-violet-500/10", border: "border-violet-600/20 dark:border-violet-500/20", shadow: "shadow-violet-600/30 dark:shadow-violet-500/30", bgSoftest: "bg-violet-600/5 dark:bg-violet-500/5", textOnBg: "text-white", bgDot: "bg-violet-600/60 dark:bg-violet-500/60", glow: "shadow-[0_0_20px_-5px_rgba(124,58,237,0.4)]", brutalShadow: "shadow-[4px_4px_0px_0px_rgba(124,58,237,1)]", hoverBg: "hover:bg-violet-600/10 dark:hover:bg-violet-500/10", hoverText: "hover:text-violet-600 dark:hover:text-violet-500", groupHoverBg: "group-hover:bg-violet-600 dark:group-hover:bg-violet-500" },
  indigo: { bg: "bg-indigo-600 dark:bg-indigo-500", text: "text-indigo-600 dark:text-indigo-500", bgSoft: "bg-indigo-600/10 dark:bg-indigo-500/10", border: "border-indigo-600/20 dark:border-indigo-500/20", shadow: "shadow-indigo-600/30 dark:shadow-indigo-500/30", bgSoftest: "bg-indigo-600/5 dark:bg-indigo-500/5", textOnBg: "text-white", bgDot: "bg-indigo-600/60 dark:bg-indigo-500/60", glow: "shadow-[0_0_20px_-5px_rgba(79,70,229,0.4)]", brutalShadow: "shadow-[4px_4px_0px_0px_rgba(79,70,229,1)]", hoverBg: "hover:bg-indigo-600/10 dark:hover:bg-indigo-500/10", hoverText: "hover:text-indigo-600 dark:hover:text-indigo-500", groupHoverBg: "group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500" },
  sky: { bg: "bg-sky-600 dark:bg-sky-500", text: "text-sky-600 dark:text-sky-500", bgSoft: "bg-sky-600/10 dark:bg-sky-500/10", border: "border-sky-600/20 dark:border-sky-500/20", shadow: "shadow-sky-600/30 dark:shadow-sky-500/30", bgSoftest: "bg-sky-600/5 dark:bg-sky-500/5", textOnBg: "text-white", bgDot: "bg-sky-600/60 dark:bg-sky-500/60", glow: "shadow-[0_0_20px_-5px_rgba(2,132,199,0.4)]", brutalShadow: "shadow-[4px_4px_0px_0px_rgba(2,132,199,1)]", hoverBg: "hover:bg-sky-600/10 dark:hover:bg-sky-500/10", hoverText: "hover:text-sky-600 dark:hover:text-sky-500", groupHoverBg: "group-hover:bg-sky-600 dark:group-hover:bg-sky-500" },
  slate: { bg: "bg-slate-600 dark:bg-slate-500", text: "text-slate-600 dark:text-slate-400", bgSoft: "bg-slate-600/10 dark:bg-slate-500/10", border: "border-slate-600/20 dark:border-slate-500/20", shadow: "shadow-slate-600/30 dark:shadow-slate-500/30", bgSoftest: "bg-slate-600/5 dark:bg-slate-500/5", textOnBg: "text-white", bgDot: "bg-slate-600/60 dark:bg-slate-500/60", glow: "shadow-[0_0_20px_-5px_rgba(71,85,105,0.4)]", brutalShadow: "shadow-[4px_4px_0px_0px_rgba(71,85,105,1)]", hoverBg: "hover:bg-slate-600/10 dark:hover:bg-slate-500/10", hoverText: "hover:text-slate-600 dark:hover:text-slate-400", groupHoverBg: "group-hover:bg-slate-600 dark:group-hover:bg-slate-500" },
  orange: { bg: "bg-orange-600 dark:bg-orange-500", text: "text-orange-600 dark:text-orange-500", bgSoft: "bg-orange-600/10 dark:bg-orange-500/10", border: "border-orange-600/20 dark:border-orange-500/20", shadow: "shadow-orange-600/30 dark:shadow-orange-500/30", bgSoftest: "bg-orange-600/5 dark:bg-orange-500/5", textOnBg: "text-white", bgDot: "bg-orange-600/60 dark:bg-orange-500/60", glow: "shadow-[0_0_20px_-5px_rgba(234,88,12,0.4)]", brutalShadow: "shadow-[4px_4px_0px_0px_rgba(234,88,12,1)]", hoverBg: "hover:bg-orange-600/10 dark:hover:bg-orange-500/10", hoverText: "hover:text-orange-600 dark:hover:text-orange-500", groupHoverBg: "group-hover:bg-orange-600 dark:group-hover:bg-orange-500" },
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
          variant = "solid",
          theme = "default",
          id: providedId,
          color = "default",
          shape = "sharp",
          spacing = "default",
          mode = "picker",
          selectedDates: controlledSelectedDates,
          onSelectedDatesChange,
          apiHighlightedDates = [],
          syncGroup,
          shadow = "default",
          yearRange,
          allowFutureDates = false,
        }) => {
          const showShadow = shadow !== "none";

          const getShadowVariantClass = (defaultClasses: string, variantClasses: string): string => {
            if (shadow === "none") return "";
            if (shadow === "default") return defaultClasses;
            return variantClasses;
          };

          const standardShadow: Record<string, string> = {
            xxs: "shadow-[0_0.5px_1px_0_rgb(0_0_0_/_0.05)]",
            xs: "shadow-xs",
            sm: "shadow-sm",
            md: "shadow-md",
            lg: "shadow-lg",
            xl: "shadow-xl",
            xxl: "shadow-2xl",
          };

          const containerShadowImportant = shadow === "none" ? "!shadow-none" : (shadow === "default" ? "" : `!${standardShadow[shadow]}`);
          const navBtnShadow = getShadowVariantClass("shadow-sm hover:shadow-md", standardShadow[shadow] || "");
          const today = new Date();
          const [viewDate, setViewDate] = useState(value || today);
          const [direction, setDirection] = useState(0);
          const internalId = React.useId();
          const calendarId = providedId || internalId;

          const sync = useCalendarSync(syncGroup);
          const isControlled = controlledSelectedDates !== undefined;

          const [internalSelectedDates, setInternalSelectedDates] = useState<Date[]>(() => {
            if (isControlled) return controlledSelectedDates ?? [];
            if (sync) return sync.dates;
            return [];
          });

          const isMultiSelect = mode === "filter" || (mode === "picker" && controlledSelectedDates !== undefined);

          const resolvedSelectedDates = isMultiSelect
            ? (internalSelectedDates)
            : [];

          const activeTheme = colorThemeMap[color];
          const indicatorShadow = getShadowVariantClass(`shadow-lg ${activeTheme.shadow}`, standardShadow[shadow] || "");
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
            if (highlightedDates.some(hd => isSameDay(hd, date))) return true;
            if (apiHighlightedDates.some(hd => isSameDay(hd, date))) return true;
            if (mode === "display" && sync && sync.dates.some(d => isSameDay(d, date))) return true;
            return false;
          };

          const isDisabled = (date: Date) => {
            if (mode === "display") return true;
            if (disabledDates.some(dd => isSameDay(dd, date))) return true;
            if (filterDate && !filterDate(date)) return true;
            if (!allowFutureDates && !isSameDay(date, today) && date > today) return true;
            return false;
          };

          const updateSyncAndCallback = useCallback((newDates: Date[]) => {
            if (!isControlled) {
              setInternalSelectedDates(newDates);
            }
            if (sync) {
              sync.setDates(newDates);
            }
            onSelectedDatesChange?.(newDates);
          }, [isControlled, sync, onSelectedDatesChange]);

          const handleDateClick = (date: Date) => {
            if (onHighlightToggle) {
              onHighlightToggle(date);
              return;
            }
            if (mode === "display") return;
            if (isMultiSelect) {
              const exists = internalSelectedDates.some(d => isSameDay(d, date));
              const newDates = exists
                ? internalSelectedDates.filter(d => !isSameDay(d, date))
                : [...internalSelectedDates, date];
              updateSyncAndCallback(newDates);
            } else {
              onChange?.(date);
              if (sync && date) {
                sync.setDates([date]);
              }
            }
          };

          const navigateMonth = (step: number) => {
            setDirection(step);
            setViewDate(new Date(year, month + step, 1));
          };

          const [viewMode, setViewMode] = useState<"days" | "months" | "years">("days");

          const monthClickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

          const handleMonthClick = () => {
            if (monthClickTimer.current) {
              clearTimeout(monthClickTimer.current);
              monthClickTimer.current = null;
              setViewMode("years");
              return;
            }
            monthClickTimer.current = setTimeout(() => {
              monthClickTimer.current = null;
              setViewMode("months");
            }, 250);
          };

          const handleYearClick = () => {
            setViewMode("years");
          };

          const handleMonthSelect = (monthIndex: number) => {
            setViewDate(new Date(year, monthIndex, 1));
            setDirection(monthIndex > month ? 1 : -1);
            setViewMode("days");
          };

          const handleYearSelect = (selectedYear: number) => {
            setViewDate(new Date(selectedYear, month, 1));
            setDirection(selectedYear > year ? 1 : -1);
            setViewMode("months");
          };

          const [yearPageOffset, setYearPageOffset] = useState(0);

          const yearRangeStart = yearRange?.start ?? 1950;
          const yearRangeEnd = yearRange?.end ?? today.getFullYear();

          const yearsRange = useMemo(() => {
            const startYear = yearRangeStart + yearPageOffset;
            const count = Math.max(0, Math.min(12, yearRangeEnd - startYear + 1));
            return Array.from({ length: count }, (_, i) => startYear + i);
          }, [yearRangeStart, yearRangeEnd, yearPageOffset]);

          const canGoBackYears = yearPageOffset > 0;
          const canGoForwardYears = yearRangeStart + yearPageOffset + 11 < yearRangeEnd;

          const monthsView = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
          ];

          const isOutline = variant === "outline";
          const isGhost = variant === "ghost";
          const isLink = variant === "link";
          const isSolid = variant === "solid";

          const getContainerStyles = () => {
            const baseBg = isOutline || isGhost || isLink ? "bg-transparent" : "bg-background";

            switch (theme) {
              case "modern":
                return cn(isOutline || isGhost || isLink ? "bg-transparent" : "bg-background/40", "backdrop-blur-3xl border shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] relative overflow-hidden transition-all duration-500", color !== "default" ? activeTheme.border : "border-border/50", color !== "default" && !isGhost && !isLink ? activeTheme.glow : "shadow-[0_20px_50px_0] shadow-foreground/10 dark:shadow-foreground/5", isGhost || isLink ? "border-transparent shadow-none" : "");
              case "brutal":
                return cn(baseBg, "border-4 relative", isGhost || isLink ? "border-transparent shadow-none" : activeTheme.border, !isGhost && !isLink ? activeTheme.brutalShadow : "");
              case "futuristic":
                return cn(baseBg, "border relative overflow-hidden transition-all duration-500", isOutline || isGhost || isLink ? (isGhost || isLink ? "border-transparent" : activeTheme.border) : cn(activeTheme.border, activeTheme.glow));
              case "halftone":
                return cn(baseBg, "border-2 border-dashed relative overflow-hidden bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px]", isGhost || isLink ? "border-transparent shadow-none" : activeTheme.border, !isGhost && !isLink ? activeTheme.brutalShadow : "");
              case "clean":
                return cn(baseBg, isGhost || isLink ? "border-transparent shadow-none" : "border-border/40 border-[0.5px]", "relative overflow-hidden transition-all duration-500", color !== "default" && !isGhost && !isLink ? activeTheme.glow : "shadow-sm");
              case "default":
              default:
                return cn(baseBg, isGhost || isLink ? "border-transparent shadow-none" : "border-border border", "relative overflow-hidden transition-all duration-500", color !== "default" && !isGhost && !isLink ? activeTheme.glow : "shadow-sm");
            }
          };

          const getHeaderTitleStyles = () => {
            switch (theme) {
              case "modern": return "text-2xl font-medium tracking-tight text-foreground/90";
              case "brutal": return cn("text-2xl font-mono font-black uppercase tracking-tighter", color !== "default" ? activeTheme.text : "text-foreground");
              case "futuristic": return cn("text-2xl font-mono font-bold tracking-widest", color !== "default" ? activeTheme.text : "text-foreground");
              case "halftone": return cn("text-2xl font-serif font-black italic tracking-tighter", color !== "default" ? activeTheme.text : "text-foreground");
              case "clean": return "text-3xl font-extralight tracking-tight text-foreground/90";
              case "default":
              default: return "text-2xl font-bold tracking-tight text-foreground/90";
            }
          };

          const renderDaysView = () => (
            <>
              <div className="flex items-center justify-between mb-8 px-1">
                <div className="flex flex-col">
                  <AnimatePresence mode="wait">
                    <motion.h2 
                      key={month}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className={cn(getHeaderTitleStyles(), "cursor-pointer")}
                      onClick={handleMonthClick}
                    >
                      {MONTHS[month]}
                    </motion.h2>
                  </AnimatePresence>
                  <span 
                    className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40 mt-0.5 cursor-pointer hover:text-foreground/60 transition-colors"
                    onClick={handleYearClick}
                  >
                    {year}
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-muted/30 p-1 rounded-2xl border border-border/10">
                  <button
                    onClick={() => navigateMonth(-1)}
                    className={cn("p-2 rounded-xl transition-all", navBtnShadow, color !== "default" ? cn(activeTheme.text, activeTheme.bgSoftest, activeTheme.hoverBg) : "text-muted-foreground hover:bg-background/80 hover:text-foreground")}
                  >
                    <ChevronLeft size={18} strokeWidth={2.5} />
                  </button>
                  <button
                    onClick={() => navigateMonth(1)}
                    className={cn("p-2 rounded-xl transition-all", navBtnShadow, color !== "default" ? cn(activeTheme.text, activeTheme.bgSoftest, activeTheme.hoverBg) : "text-muted-foreground hover:bg-background/80 hover:text-foreground")}
                  >
                    <ChevronRight size={18} strokeWidth={2.5} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 mb-4">
                {DAYS.map(day => (
                  <div key={day} className="text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground/30">
                    {day}
                  </div>
                ))}
              </div>

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
                      const isInMultiSelect = isMultiSelect && resolvedSelectedDates.some(d => isSameDay(d, date));
                      const selected = isMultiSelect ? isInMultiSelect : (value && isSameDay(date, value));
                      const highlighted = isHighlighted(date);
                      const disabled = isDisabled(date);
                      const isToday = isSameDay(date, today);

                      return (
                        <div key={idx} className="relative aspect-square flex items-center justify-center p-0.5 sm:p-1">
                          {selected && !isMultiSelect && (
                            <motion.div
                              layoutId="selected-indicator"
                              className={cn("absolute inset-1 z-0", indicatorShadow, activeTheme.bg, itemShapeClass)}
                              transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                            />
                          )}
                          {selected && isMultiSelect && (
                            <motion.div
                              layoutId={`selected-${date.toDateString()}`}
                              className={cn("absolute inset-1 z-0", indicatorShadow, activeTheme.bg, itemShapeClass)}
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
                              isCurrentMonth && !selected && !highlighted && cn("text-foreground/60 transition-colors duration-300", color !== "default" ? cn(activeTheme.hoverBg, activeTheme.hoverText) : "hover:bg-muted/40 hover:text-foreground", itemShapeClass),
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

              <div className="mt-6 pt-6 border-t border-border/10 flex items-center justify-between">
                <button 
                  onClick={() => {
                    const now = new Date();
                    setViewDate(now);
                    onChange?.(now);
                  }}
                  className={cn("flex items-center gap-2 px-4 py-2 hover:bg-muted/50 transition-all group", itemShapeClass)}
                >
                  <div className={cn("p-1 rounded-lg transition-colors group-hover:text-white", activeTheme.bgSoft, activeTheme.text, color !== "default" ? activeTheme.groupHoverBg : "group-hover:bg-foreground group-hover:text-background")}>
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
            </>
          );

          const viewNavBtnClass = cn("p-2 rounded-xl transition-all", navBtnShadow, color !== "default" ? cn(activeTheme.text, activeTheme.bgSoftest, activeTheme.hoverBg) : "text-muted-foreground hover:bg-background/80 hover:text-foreground");

          const renderMonthsView = () => (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between px-1">
                <button
                  onClick={() => setViewMode("days")}
                  className={viewNavBtnClass}
                >
                  <ChevronLeft size={18} strokeWidth={2.5} />
                </button>
                <span className={cn(getHeaderTitleStyles())}>
                  {year}
                </span>
                <button
                  onClick={() => setViewMode("years")}
                  className={cn(viewNavBtnClass, "text-[10px] font-black uppercase tracking-[0.15em]")}
                >
                  Year
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2 p-1">
                {monthsView.map((m, i) => (
                  <button
                    key={m}
                    onClick={() => handleMonthSelect(i)}
                    className={cn(
                      "py-3 text-sm font-semibold rounded-lg transition-all duration-200",
                      i === month
                        ? cn(activeTheme.bg, activeTheme.textOnBg, activeTheme.shadow, itemShapeClass)
                        : cn("text-foreground/70 hover:text-foreground transition-colors duration-300", color !== "default" ? cn(activeTheme.hoverBg, activeTheme.hoverText, "hover:bg-muted/40", itemShapeClass) : "hover:bg-muted/40 hover:text-foreground", itemShapeClass)
                    )}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          );

          const renderYearsView = () => (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between px-1">
                <button
                  onClick={() => setViewMode("months")}
                  className={viewNavBtnClass}
                >
                  <ChevronLeft size={18} strokeWidth={2.5} />
                </button>
                <span className={cn(getHeaderTitleStyles())}>
                  {yearRangeStart + yearPageOffset} – {Math.min(yearRangeStart + yearPageOffset + 11, yearRangeEnd)}
                </span>
                <button
                  onClick={() => setViewMode("months")}
                  className={cn(viewNavBtnClass, "text-[10px] font-black uppercase tracking-[0.15em]")}
                >
                  Month
                </button>
              </div>
              <div className="flex items-center justify-between px-1 mb-1">
                <button
                  onClick={() => setYearPageOffset(p => Math.max(0, p - 12))}
                  disabled={!canGoBackYears}
                  className={cn(viewNavBtnClass, !canGoBackYears && "opacity-20 cursor-not-allowed")}
                >
                  <ChevronLeft size={18} strokeWidth={2.5} />
                </button>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40">
                  {yearRangeStart} – {yearRangeEnd}
                </span>
                <button
                  onClick={() => setYearPageOffset(p => p + 12)}
                  disabled={!canGoForwardYears}
                  className={cn(viewNavBtnClass, !canGoForwardYears && "opacity-20 cursor-not-allowed")}
                >
                  <ChevronRight size={18} strokeWidth={2.5} />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2 p-1">
                {yearsRange.map((y) => (
                  <button
                    key={y}
                    onClick={() => handleYearSelect(y)}
                    className={cn(
                      "py-3 text-sm font-semibold rounded-lg transition-all duration-200",
                      y === year
                        ? cn(activeTheme.bg, activeTheme.textOnBg, activeTheme.shadow, itemShapeClass)
                        : cn("text-foreground/70 hover:text-foreground transition-colors duration-300", color !== "default" ? cn(activeTheme.hoverBg, activeTheme.hoverText, "hover:bg-muted/40", itemShapeClass) : "hover:bg-muted/40 hover:text-foreground", itemShapeClass)
                    )}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>
          );

          return (
            <LayoutGroup id={calendarId}>
              <div 
                className={cn(
                  "w-full max-w-sm select-none shrink-0",
                  shapeClass,
                  spacingClass,
                  getContainerStyles(),
                  containerShadowImportant,
                  className
                )}
              >
                {viewMode === "days" && renderDaysView()}
                {viewMode === "months" && renderMonthsView()}
                {viewMode === "years" && renderYearsView()}
              </div>
            </LayoutGroup>
          );
        });
Calendar.displayName = "Calendar";
