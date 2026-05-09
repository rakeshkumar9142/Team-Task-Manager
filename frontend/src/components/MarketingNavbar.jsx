import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const MarketingNavbar = () => (
  <header className="sticky top-0 z-40 border-b border-slate-300/20 bg-white/70 backdrop-blur-md dark:border-white/10 dark:bg-bgPrimary/70">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
      <Link to="/" className="text-lg font-semibold">Team Task Manager</Link>
      <nav className="hidden items-center gap-5 text-sm md:flex">
        {links.map((link) => (
          <a key={link.href} href={link.href} className="text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
            {link.label}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Link to="/login" className="rounded-lg px-3 py-2 text-sm hover:bg-slate-900/5 dark:hover:bg-white/5">Login</Link>
        <Link to="/signup" className="rounded-lg bg-gradient-to-r from-accentPurple to-accentViolet px-3 py-2 text-sm text-white">Signup</Link>
      </div>
    </div>
  </header>
);
