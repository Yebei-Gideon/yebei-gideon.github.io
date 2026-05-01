import { useEffect, useState } from "react";

const STORAGE_KEY = "gy-theme";

export function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as "dark" | "light" | null;
    const initial = stored ?? "dark";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  return { theme, toggle };
}
