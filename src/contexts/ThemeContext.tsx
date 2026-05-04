"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

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
    const timer = setTimeout(() => setMounted(true), 0);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (mounted) {
      const savedTheme = localStorage.getItem("theme") as Theme | null;
      let targetTheme: Theme = "dark";
      if (savedTheme === "dark" || savedTheme === "light") {
        targetTheme = savedTheme;
      } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        targetTheme = prefersDark ? "dark" : "light";
      }
      
      const timer = setTimeout(() => {
        setTheme(targetTheme);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("theme", theme);
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const setThemeMode = (mode: Theme) => {
    if (mode === "dark" || mode === "light") {
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
      <div style={{ visibility: mounted ? "visible" : "hidden" }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
