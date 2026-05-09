import { NavLink } from "react-router-dom";
import { BarChart3, ClipboardList, FolderOpen, LogOut, Users } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { ThemeToggle } from "../components/ThemeToggle";

const links = [
  { to: "/app/dashboard", label: "Dashboard", icon: BarChart3 },
  { to: "/app/projects", label: "Projects", icon: FolderOpen },
  { to: "/app/tasks", label: "Tasks", icon: ClipboardList },
  { to: "/app/team", label: "Team", icon: Users },
];

export const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-slate-100">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-6 lg:grid-cols-[260px_1fr]">
        <aside className="glass rounded-3xl p-5">
          <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Team Task Manager</p>
          <p className="mt-2 text-xl font-semibold">{user?.name || "Workspace"}</p>
          <span className="mt-2 inline-flex rounded-full bg-accentCyan/20 px-2 py-1 text-xs capitalize text-cyan-200">
            {user?.role || "member"}
          </span>
          <div className="mt-4">
            <ThemeToggle />
          </div>
          <nav className="mt-8 space-y-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2 transition ${
                    isActive
                      ? "bg-accentPurple/30 text-slate-900 dark:text-white"
                      : "text-slate-700 hover:bg-slate-900/5 dark:text-slate-300 dark:hover:bg-white/5"
                  }`
                }
              >
                <link.icon size={16} />
                {link.label}
              </NavLink>
            ))}
          </nav>
          <button
            onClick={logout}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300/30 py-2 text-sm text-slate-700 hover:bg-slate-900/5 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5"
          >
            <LogOut size={16} />
            Logout
          </button>
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
};
