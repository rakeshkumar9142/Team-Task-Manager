import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { Loader } from "./Loader";

export const AITaskBreakdown = () => {
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setIsGenerating(true);
    setTasks([]);
    
    // Simulate API delay
    setTimeout(() => {
      setTasks([
        "Design UI wireframe",
        "Develop frontend components",
        "Test responsiveness",
        "Deploy application"
      ]);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="glass overflow-hidden rounded-2xl border border-accentViolet/20 bg-gradient-to-b from-accentViolet/5 to-transparent p-6 relative">
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <Sparkles size={80} />
      </div>
      
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg bg-accentViolet/20 text-accentViolet">
          <Sparkles size={20} />
        </div>
        <h3 className="text-xl font-semibold">AI Task Breakdown</h3>
      </div>
      
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-md">
        Enter a complex task or idea, and let our AI break it down into actionable subtasks.
      </p>

      <form onSubmit={handleGenerate} className="flex gap-2 mb-6 relative z-10">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g., Build landing page"
          className="flex-1 rounded-xl border border-slate-300/30 bg-white/60 px-4 py-3 outline-none focus:border-accentViolet dark:border-white/10 dark:bg-white/5"
          disabled={isGenerating}
        />
        <button
          type="submit"
          disabled={isGenerating || !input.trim()}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-accentPurple to-accentViolet px-6 py-3 font-medium text-white transition-all hover:opacity-90 disabled:opacity-50"
        >
          {isGenerating ? <Loader className="w-5 h-5 border-white" /> : "Generate"}
          {!isGenerating && <ArrowRight size={18} />}
        </button>
      </form>

      <AnimatePresence>
        {tasks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="space-y-3"
          >
            <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-3 text-sm uppercase tracking-wider">Suggested Subtasks</h4>
            {tasks.map((task, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                className="flex items-center justify-between glass p-4 rounded-xl border border-white/5 hover:border-accentViolet/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-slate-400" />
                  <span>{task}</span>
                </div>
                <button className="text-xs px-3 py-1.5 rounded-lg bg-accentCyan/10 text-accentCyan hover:bg-accentCyan/20 transition-colors">
                  Add Task
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
