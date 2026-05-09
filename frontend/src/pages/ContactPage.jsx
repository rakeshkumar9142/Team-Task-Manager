import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { MarketingNavbar } from "../components/MarketingNavbar";
import { MarketingFooter } from "../components/MarketingFooter";

export const ContactPage = () => (
  <div className="min-h-screen bg-transparent text-slate-900 dark:text-slate-100">
    <MarketingNavbar />
    <main className="mx-auto max-w-4xl px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-8"
      >
        <p className="text-sm uppercase tracking-wider text-accentCyan">Developer Profile</p>
        <h1 className="mt-2 text-4xl font-semibold">Rakesh Kumar</h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          Full-stack developer focused on polished, high-impact SaaS experiences.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-300/30 p-4 dark:border-white/10">
            <p className="text-sm text-slate-500 dark:text-slate-400">University</p>
            <p className="mt-1 flex items-center gap-2"><Users size={16} /> Chitkara University</p>
          </div>
          <div className="rounded-2xl border border-slate-300/30 p-4 dark:border-white/10">
            <p className="text-sm text-slate-500 dark:text-slate-400">Phone</p>
            <p className="mt-1 flex items-center gap-2"><Users size={16} /> 9905307658</p>
          </div>
          <a href="https://linkedin.com/in/rakesh-kumar-ba423826b/" target="_blank" rel="noreferrer" className="rounded-2xl border border-slate-300/30 p-4 transition hover:bg-slate-900/5 dark:border-white/10 dark:hover:bg-white/5">
            <p className="text-sm text-slate-500 dark:text-slate-400">LinkedIn</p>
            <p className="mt-1 flex items-center gap-2"><Users size={16} /> linkedin.com/in/rakesh-kumar-ba423826b</p>
          </a>
          <a href="https://github.com/rakeshkumar9142s" target="_blank" rel="noreferrer" className="rounded-2xl border border-slate-300/30 p-4 transition hover:bg-slate-900/5 dark:border-white/10 dark:hover:bg-white/5">
            <p className="text-sm text-slate-500 dark:text-slate-400">GitHub</p>
            <p className="mt-1 flex items-center gap-2"><Users size={16} /> github.com/rakeshkumar9142s</p>
          </a>
        </div>
      </motion.div>
    </main>
    <MarketingFooter />
  </div>
);
