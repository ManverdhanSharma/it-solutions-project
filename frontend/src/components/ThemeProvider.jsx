import { useEffect, useState } from "react";

const THEME_KEY = "theme"; // "light" | "dark" | "system"

function applyTheme(theme) {
  const root = document.documentElement;
  const preferDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const useDark = theme === "dark" || (theme === "system" && preferDark);
  root.classList.toggle("dark", useDark);
}

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    localStorage.getItem(THEME_KEY) || "system"
  );

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    // respond live to OS theme changes when in system mode
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const current = localStorage.getItem(THEME_KEY) || "system";
      if (current === "system") applyTheme("system");
    };
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  return (
    <>
      {/* simple toggle; style as desired */}
      <div className="fixed bottom-6 left-6 z-50">
        <div className="flex items-center gap-2 rounded-lg bg-white/80 p-1 shadow backdrop-blur dark:bg-gray-800/80">
          <button
            onClick={() => setTheme("light")}
            className={`rounded px-2 py-1 text-sm ${
              theme === "light"
                ? "bg-primary text-white"
                : "text-gray-700 dark:text-gray-200"
            }`}
          >
            Light
          </button>
          <button
            onClick={() => setTheme("system")}
            className={`rounded px-2 py-1 text-sm ${
              theme === "system"
                ? "bg-primary text-white"
                : "text-gray-700 dark:text-gray-200"
            }`}
          >
            System
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`rounded px-2 py-1 text-sm ${
              theme === "dark"
                ? "bg-primary text-white"
                : "text-gray-700 dark:text-gray-200"
            }`}
          >
            Dark
          </button>
        </div>
      </div>
      {children}
    </>
  );
}
