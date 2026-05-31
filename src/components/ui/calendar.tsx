/**
 * @registry-slug calendar
 * @registry-name Calendar
 * @registry-dependency framer-motion
 * @registry-dependency lucide-react
 */
"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

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
        }) => {
          const today = new Date();
          const [viewDate, setViewDate] = useState(value || today);
          const [direction, setDirection] = useState(0);
          const internalId = React.useId();
          const calendarId = providedId || internalId;

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
                  "w-full max-w-[340px] rounded-[2.5rem] border p-7 select-none",
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
                <div className="relative min-h-[260px]">
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
                          <div key={idx} className="relative aspect-square flex items-center justify-center p-1">
                            {selected && (
                              <motion.div
                                layoutId="selected-indicator"
                                className="absolute inset-1 bg-primary rounded-2xl shadow-lg shadow-primary/30 z-0"
                                transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                              />
                            )}
                            {highlighted && !selected && (
                              <motion.div
                                layoutId={`highlight-${date.toDateString()}`}
                                className="absolute inset-1 border-2 border-primary/20 bg-primary/5 rounded-2xl z-0"
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
                                isCurrentMonth && !selected && !highlighted && "hover:bg-muted/40 rounded-2xl text-foreground/60 hover:text-foreground",
                                selected && "text-primary-foreground",
                                highlighted && !selected && "text-primary font-bold",
                                disabled && "opacity-5 cursor-not-allowed grayscale"
                              )}
                            >
                              <span className="text-sm font-semibold tabular-nums">{date.getDate()}</span>
                              {isToday && !selected && (
                                <div className="absolute bottom-1.5 w-1 h-1 rounded-full bg-primary/60" />
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
                    className="flex items-center gap-2 px-4 py-2 rounded-2xl hover:bg-muted/50 transition-all group"
                  >
                    <div className="p-1 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
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
