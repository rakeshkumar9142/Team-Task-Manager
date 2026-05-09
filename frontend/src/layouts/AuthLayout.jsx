import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GlowingBackground } from "../components/GlowingBackground";
import { ThemeToggle } from "../components/ThemeToggle";

export const AuthLayout = ({ title, subtitle, children }) => (
  <div className="relative flex min-h-screen items-center justify-center px-4">
    <GlowingBackground />
    <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
      <Link to="/" className="rounded-xl border border-slate-300/30 bg-white/60 px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5">
        Team Task Manager
      </Link>
      <ThemeToggle />
    </div>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="glass w-full max-w-md rounded-3xl p-8 shadow-glow"
    >
      <h1 className="bg-gradient-to-r from-slate-900 to-accentPurple bg-clip-text text-3xl font-semibold text-transparent dark:from-white dark:to-slate-300">
        {title}
      </h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{subtitle}</p>
      <div className="mt-6">{children}</div>
    </motion.div>
  </div>
);
