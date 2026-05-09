import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Siren, TrendingUp, Users } from "lucide-react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import api from "../services/api";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts";
import { EmptyState } from "../components/EmptyState";

const StatCard = ({ title, value, color }) => (
  <motion.div whileHover={{ y: -4 }} className="glass rounded-2xl p-5">
    <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
    <p className={`mt-2 text-3xl font-semibold ${color}`}>{value}</p>
  </motion.div>
);

export const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    overdueTasks: 0,
    recentActivity: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const { data } = await api.get("/dashboard/stats");
        setStats(data.data);
      } finally {
        setLoading(false);
      }
    };
    loadStats().catch(() => {});
  }, []);

  const distribution = [
    { name: "Completed", value: stats.completedTasks, color: "#06b6d4" },
    { name: "Pending", value: stats.pendingTasks, color: "#8b5cf6" },
    { name: "Overdue", value: stats.overdueTasks, color: "#f43f5e" },
  ];

  const kpiBars = [
    { name: "Total", value: stats.totalTasks },
    { name: "Done", value: stats.completedTasks },
    { name: "Pending", value: stats.pendingTasks },
    { name: "Overdue", value: stats.overdueTasks },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold">Dashboard Analytics</h1>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { title: "AI Prioritization", value: "12 suggestions", icon: Sparkles },
            { title: "Deadline Alerts", value: `${stats.overdueTasks} risk tasks`, icon: Siren },
            { title: "Productivity Pulse", value: "82% momentum", icon: TrendingUp },
            { title: "Workload Balance", value: "Team healthy", icon: Users },
          ].map((item) => (
            <motion.div key={item.title} whileHover={{ y: -4 }} className="glass rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500 dark:text-slate-400">{item.title}</p>
                <item.icon size={16} className="text-accentCyan" />
              </div>
              <p className="mt-2 text-lg font-semibold">{item.value}</p>
            </motion.div>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Total Tasks" value={stats.totalTasks} color="text-slate-900 dark:text-slate-100" />
          <StatCard title="Completed" value={stats.completedTasks} color="text-emerald-300" />
          <StatCard title="Pending" value={stats.pendingTasks} color="text-amber-300" />
          <StatCard title="Overdue" value={stats.overdueTasks} color="text-rose-300" />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="glass h-72 rounded-2xl p-5">
            <h2 className="text-lg font-medium">Task Distribution</h2>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={distribution} dataKey="value" innerRadius={55} outerRadius={85}>
                    {distribution.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="glass h-72 rounded-2xl p-5">
            <h2 className="text-lg font-medium">Workload Snapshot</h2>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={kpiBars}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#7c3aed" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="glass rounded-2xl p-5">
          <h2 className="text-lg font-medium">Recent Activity</h2>
          <div className="mt-4 space-y-3">
            {loading && <p className="text-sm text-slate-400">Loading analytics...</p>}
            {!loading && stats.recentActivity.length === 0 && (
              <EmptyState title="No activity yet" message="As soon as your team updates tasks, activity appears here." />
            )}
            {stats.recentActivity.map((activity) => (
              <div key={activity.id} className="rounded-xl bg-white/5 px-4 py-3 text-sm">
                {activity.action} • {activity.assignedTo}
              </div>
            ))}
          </div>
        </div>
        <div className="glass rounded-2xl p-5">
          <h2 className="text-lg font-medium">AI Assistant Widget</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Recommended: Move 2 high-priority tasks from Monday to Friday sprint to avoid deadline congestion.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-accentPurple/20 px-3 py-1">Auto-prioritize</span>
            <span className="rounded-full bg-accentCyan/20 px-3 py-1">Balance workload</span>
            <span className="rounded-full bg-emerald-500/20 px-3 py-1">Generate daily summary</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
