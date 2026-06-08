"use client";

import React, { createContext, useContext, useEffect, useState } from"react";

type Theme ="dark"|"light";

interface ThemeContextType {
 theme: Theme;
 toggleTheme: () => void;
 setThemeMode: (mode: Theme) => void;
 mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
 const context = useContext(ThemeContext);

 if (!context) {
 throw new Error("useTheme must be used within ThemeProvider");
 }

 return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 const [theme, setTheme] = useState<Theme>("dark");
 const [mounted, setMounted] = useState(false);

 useEffect(() => {
 // Sync state with what's actually in the DOM (applied by layout script)
 const handle = requestAnimationFrame(() => {
 setMounted(true);
 // Ensure state matches the forced dark mode from layout script on mount
 setTheme("dark");
 });
 return () => cancelAnimationFrame(handle);
 }, []);

 useEffect(() => {
 if (mounted) {
 // Synchronize DOM with current session state (no localStorage)
 document.documentElement.classList.toggle("dark", theme ==="dark");
 }
 }, [theme, mounted]);

 const toggleTheme = () => {
 setTheme((prev) => (prev ==="dark"?"light":"dark"));
 };

 const setThemeMode = (mode: Theme) => {
 if (mode ==="dark"|| mode ==="light") {
 setTheme(mode);
 }
 };

 return (
 <ThemeContext.Provider
 value={{
 theme,
 toggleTheme,
 setThemeMode,
 mounted,
 }}
 >
 <div style={{ visibility: mounted ?"visible":"hidden"}}>
 {children}
 </div>
 </ThemeContext.Provider>
 );
};
