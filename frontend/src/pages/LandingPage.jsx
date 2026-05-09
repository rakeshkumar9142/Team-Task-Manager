import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GlowingBackground } from "../components/GlowingBackground";
import { MarketingNavbar } from "../components/MarketingNavbar";
import { MarketingFooter } from "../components/MarketingFooter";

const sectionClass = "mx-auto max-w-7xl px-4 py-20";

export const LandingPage = () => (
  <div className="text-slate-900 dark:text-slate-100">
    <MarketingNavbar />
    <div id="home" className="relative overflow-hidden">
      <GlowingBackground />
      <section className={`${sectionClass} relative`}>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
          <p className="inline-flex rounded-full border border-slate-300/50 bg-white/70 px-3 py-1 text-xs dark:border-white/10 dark:bg-white/5">
            AI-powered productivity workspace
          </p>
          <h1 className="mt-5 bg-gradient-to-r from-slate-900 via-accentPurple to-accentCyan bg-clip-text text-5xl font-semibold text-transparent md:text-6xl dark:from-white dark:via-slate-200 dark:to-accentCyan">
            Build faster teams with futuristic task intelligence.
          </h1>
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-300">
            Plan, prioritize, and deliver with AI insights, automation-ready workflows, and premium analytics.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/signup" className="rounded-xl bg-gradient-to-r from-accentPurple to-accentViolet px-6 py-3 font-medium text-white">Start Free</Link>
            <Link to="/login" className="rounded-xl border border-slate-300/40 bg-white/70 px-6 py-3 dark:border-white/15 dark:bg-white/5">See Demo</Link>
          </div>
        </motion.div>
      </section>
    </div>

    <section id="features" className={sectionClass}>
      <h2 className="text-3xl font-semibold">Features</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {["AI Task Prioritization", "Real-time Team Dashboards", "Deadline Risk Alerts"].map((item) => (
          <motion.div key={item} whileHover={{ y: -4 }} className="glass rounded-2xl p-5">
            <h3 className="text-lg font-medium">{item}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Designed for high-performance teams that need speed and clarity.</p>
          </motion.div>
        ))}
      </div>
    </section>

    <section id="about" className={sectionClass}>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass rounded-2xl p-6">
          <h3 className="text-2xl font-semibold">Why choose us</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li>Futuristic design inspired by premium SaaS products.</li>
            <li>AI recommendation layer for better execution velocity.</li>
            <li>Role-based collaboration built for campus and startup teams.</li>
          </ul>
        </div>
        <div className="glass rounded-2xl p-6">
          <h3 className="text-2xl font-semibold">AI automation & analytics</h3>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
            Automated workload balancing, productivity recommendations, and predictive deadline monitoring.
          </p>
        </div>
      </div>
    </section>

    <section className={sectionClass}>
      <h2 className="text-3xl font-semibold">Testimonials</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {["Our placement team finally has clarity and speed.", "Feels like using a funded startup tool."].map((quote) => (
          <div key={quote} className="glass rounded-2xl p-5 text-sm text-slate-700 dark:text-slate-300">"{quote}"</div>
        ))}
      </div>
    </section>

    <section className={sectionClass}>
      <h2 className="text-3xl font-semibold">FAQ</h2>
      <div className="mt-6 space-y-3">
        {[
          ["Can I use this with existing auth?", "Yes, it keeps your existing backend auth routes and JWT flow."],
          ["Is this mobile-friendly?", "Yes, layouts are fully responsive for mobile, tablet, and desktop."],
        ].map(([q, a]) => (
          <div key={q} className="glass rounded-xl p-4">
            <p className="font-medium">{q}</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{a}</p>
          </div>
        ))}
      </div>
    </section>

    <section id="contact" className={`${sectionClass} pt-0`}>
      <div className="glass flex flex-wrap items-center justify-between gap-3 rounded-2xl p-6">
        <div>
          <p className="text-xl font-semibold">Let’s build smarter teams.</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">Connect with the developer and explore the full product vision.</p>
        </div>
        <Link to="/contact" className="rounded-xl bg-gradient-to-r from-accentPurple to-accentViolet px-5 py-3 text-white">Go to Contact</Link>
      </div>
    </section>
    <MarketingFooter />
  </div>
);
