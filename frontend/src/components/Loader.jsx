import { motion } from "framer-motion";

export const Loader = ({ className = "" }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="h-6 w-6 rounded-full border-2 border-accentViolet border-t-transparent"
    />
  </div>
);
