import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loadThemeMode, saveThemeMode } from "../services/storage";
import { darkTheme, lightTheme } from "../theme/colors";

type ThemeMode = "light" | "dark";

type ThemeContextType = {
  themeMode: ThemeMode;
  theme: typeof lightTheme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");

  useEffect(() => {
    async function loadTheme() {
      const savedTheme = await loadThemeMode();
      if (savedTheme === "dark" || savedTheme === "light") {
        setThemeMode(savedTheme);
      }
    }

    loadTheme();
  }, []);

  const toggleTheme = () => {
    setThemeMode((currentMode) => {
      const nextMode = currentMode === "light" ? "dark" : "light";
      void saveThemeMode(nextMode);
      return nextMode;
    });
  };

  const value = useMemo(() => ({
    themeMode,
    theme: themeMode === "dark" ? darkTheme : lightTheme,
    toggleTheme,
  }), [themeMode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside a ThemeProvider");
  }

  return context;
}
