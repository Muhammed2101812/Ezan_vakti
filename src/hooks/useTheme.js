// hooks/useTheme.js
import { useState, useEffect } from "react";
import { themeStorage } from "../utils/storage";

/**
 * Custom hook for managing theme state (light/dark mode)
 * @returns {{theme: string, toggleTheme: function}}
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first, then system preference, then default to light
    return (
      themeStorage.get() ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
    );
  });

  useEffect(() => {
    // Apply theme to document element
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Update localStorage
    themeStorage.set(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return { theme, toggleTheme };
}
