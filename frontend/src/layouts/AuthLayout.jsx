import { motion } from "framer-motion";
import { GlowingBackground } from "../components/GlowingBackground";

export const AuthLayout = ({ title, subtitle, children }) => (
  <div className="relative flex min-h-screen items-center justify-center px-4">
    <GlowingBackground />
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="glass w-full max-w-md rounded-3xl p-8 shadow-glow"
    >
      <h1 className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-3xl font-semibold text-transparent">
        {title}
      </h1>
      <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
      <div className="mt-6">{children}</div>
    </motion.div>
  </div>
);
