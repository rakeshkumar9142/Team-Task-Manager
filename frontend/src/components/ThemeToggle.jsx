import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-xl border border-slate-300/20 bg-white/5 px-3 py-2 text-sm transition hover:bg-white/10 dark:border-white/10"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
};
