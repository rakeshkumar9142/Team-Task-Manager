import { CheckCircle2, PlusCircle, UserPlus, Clock } from "lucide-react";
import { motion } from "framer-motion";

const activities = [
  {
    id: 1,
    user: "John",
    action: "completed task",
    target: "Design system setup",
    time: "2 hours ago",
    icon: CheckCircle2,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10"
  },
  {
    id: 2,
    user: "Sarah",
    action: "created project",
    target: "Marketing Website Rebrand",
    time: "4 hours ago",
    icon: PlusCircle,
    color: "text-accentPurple",
    bg: "bg-accentPurple/10"
  },
  {
    id: 3,
    user: "Rakesh",
    action: "assigned task to",
    target: "Alex",
    time: "Yesterday",
    icon: UserPlus,
    color: "text-accentCyan",
    bg: "bg-accentCyan/10"
  },
  {
    id: 4,
    user: "Team",
    action: "reached milestone",
    target: "Alpha Release",
    time: "2 days ago",
    icon: Clock,
    color: "text-rose-400",
    bg: "bg-rose-400/10"
  }
];

export const ActivityTimeline = () => {
  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="mb-6 text-xl font-semibold">Activity Feed</h3>
      <div className="relative space-y-6 before:absolute before:inset-y-0 before:left-6 before:w-px before:bg-white/10">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <motion.div 
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-start gap-4"
            >
              <div className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${activity.bg} ${activity.color} ring-4 ring-[#0f111a]`}>
                <Icon size={20} />
              </div>
              <div className="pt-2">
                <p className="text-sm text-slate-300">
                  <span className="font-semibold text-white">{activity.user}</span>{" "}
                  {activity.action}{" "}
                  <span className="font-medium text-white">{activity.target}</span>
                </p>
                <p className="mt-1 text-xs text-slate-500">{activity.time}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
