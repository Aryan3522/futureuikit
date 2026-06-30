/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";

export interface CalendarSyncState {
  groups: Record<string, Date[]>;
  setGroupDates: (group: string, dates: Date[]) => void;
  addGroupDate: (group: string, date: Date) => void;
  removeGroupDate: (group: string, date: Date) => void;
  toggleGroupDate: (group: string, date: Date) => void;
  clearGroup: (group: string) => void;
}

const CalendarSyncContext = createContext<CalendarSyncState | undefined>(undefined);

export function CalendarSyncProvider({ children }: { children: React.ReactNode }) {
  const [groups, setGroups] = useState<Record<string, Date[]>>({});

  const setGroupDates = useCallback((group: string, dates: Date[]) => {
    setGroups(prev => ({ ...prev, [group]: dates }));
  }, []);

  const addGroupDate = useCallback((group: string, date: Date) => {
    setGroups(prev => {
      const existing = prev[group] || [];
      const exists = existing.some(d =>
        d.getDate() === date.getDate() &&
        d.getMonth() === date.getMonth() &&
        d.getFullYear() === date.getFullYear()
      );
      if (exists) return prev;
      return { ...prev, [group]: [...existing, date] };
    });
  }, []);

  const removeGroupDate = useCallback((group: string, date: Date) => {
    setGroups(prev => ({
      ...prev,
      [group]: (prev[group] || []).filter(d =>
        d.getDate() !== date.getDate() ||
        d.getMonth() !== date.getMonth() ||
        d.getFullYear() !== date.getFullYear()
      ),
    }));
  }, []);

  const toggleGroupDate = useCallback((group: string, date: Date) => {
    setGroups(prev => {
      const existing = prev[group] || [];
      const exists = existing.some(d =>
        d.getDate() === date.getDate() &&
        d.getMonth() === date.getMonth() &&
        d.getFullYear() === date.getFullYear()
      );
      return {
        ...prev,
        [group]: exists
          ? existing.filter(d =>
              d.getDate() !== date.getDate() ||
              d.getMonth() !== date.getMonth() ||
              d.getFullYear() !== date.getFullYear()
            )
          : [...existing, date],
      };
    });
  }, []);

  const clearGroup = useCallback((group: string) => {
    setGroups(prev => ({ ...prev, [group]: [] }));
  }, []);

  const value = useMemo<CalendarSyncState>(() => ({
    groups,
    setGroupDates,
    addGroupDate,
    removeGroupDate,
    toggleGroupDate,
    clearGroup,
  }), [groups, setGroupDates, addGroupDate, removeGroupDate, toggleGroupDate, clearGroup]);

  return (
    <CalendarSyncContext.Provider value={value}>
      {children}
    </CalendarSyncContext.Provider>
  );
}

export function useCalendarSync(group?: string) {
  const context = useContext(CalendarSyncContext);

  return useMemo(() => {
    if (!group || !context) return null;
    const groupDates = context.groups[group] || [];
    return {
      dates: groupDates,
      setDates: (dates: Date[]) => context.setGroupDates(group, dates),
      addDate: (date: Date) => context.addGroupDate(group, date),
      removeDate: (date: Date) => context.removeGroupDate(group, date),
      toggleDate: (date: Date) => context.toggleGroupDate(group, date),
      clear: () => context.clearGroup(group),
    };
  }, [group, context?.groups, context?.setGroupDates, context?.addGroupDate, context?.removeGroupDate, context?.toggleGroupDate, context?.clearGroup]);
}

