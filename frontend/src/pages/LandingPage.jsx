import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GlowingBackground } from "../components/GlowingBackground";

export const LandingPage = () => (
  <div className="relative flex min-h-screen items-center justify-center px-6">
    <GlowingBackground />
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl text-center">
      <p className="mb-3 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
        Premium Campus Placement Workflow
      </p>
      <h1 className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-5xl font-semibold text-transparent">
        Team Task Manager
      </h1>
      <p className="mt-5 text-lg text-slate-400">
        A startup-grade collaboration hub for projects, tasks, analytics, and role-driven campus teams.
      </p>
      <div className="mt-8 flex items-center justify-center gap-4">
        <Link to="/signup" className="rounded-xl bg-gradient-to-r from-accentPurple to-accentViolet px-6 py-3 font-medium">Get Started</Link>
        <Link to="/login" className="rounded-xl border border-white/15 px-6 py-3">Sign In</Link>
      </div>
    </motion.div>
  </div>
);
