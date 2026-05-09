import { motion } from "framer-motion";
import { FolderOpen } from "lucide-react";

export const EmptyState = ({ title, message, icon: Icon = FolderOpen }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass flex flex-col items-center justify-center rounded-2xl p-12 text-center"
  >
    <div className="mb-4 rounded-full bg-white/5 p-4 text-accentViolet shadow-inner">
      <Icon size={40} strokeWidth={1.5} />
    </div>
    <h3 className="text-xl font-medium text-slate-800 dark:text-slate-200">{title}</h3>
    <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">{message}</p>
  </motion.div>
);
