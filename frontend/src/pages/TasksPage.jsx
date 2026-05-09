import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import api from "../services/api";
import { Modal } from "../components/Modal";
import { EmptyState } from "../components/EmptyState";
import { PriorityBadge } from "../components/PriorityBadge";
import { StatusBadge } from "../components/StatusBadge";
import { SkeletonCard } from "../components/SkeletonCard";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { AITaskBreakdown } from "../components/AITaskBreakdown";

export const TasksPage = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState("");
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [viewMode, setViewMode] = useState("table");
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    assignedTo: "",
  });

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await api.get("/projects");
      setProjects(data.data);
      if (data.data[0]?._id) setActiveProject(data.data[0]._id);
    };
    fetchProjects().catch(() => {});
  }, []);

  useEffect(() => {
    if (!activeProject) return;
    setLoadingTasks(true);
    api
      .get(`/projects/${activeProject}/tasks`)
      .then(({ data }) => setTasks(data.data))
      .catch(() => {})
      .finally(() => setLoadingTasks(false));
    api.get(`/projects/${activeProject}/members`).then(({ data }) => {
      setMembers(data.data);
      if (data.data[0]?._id) {
        setForm((prev) => ({ ...prev, assignedTo: data.data[0]._id }));
      }
    });
  }, [activeProject]);

  const refreshTasks = async () => {
    setLoadingTasks(true);
    const { data } = await api.get(`/projects/${activeProject}/tasks`);
    setTasks(data.data);
    setLoadingTasks(false);
  };

  const createTask = async (event) => {
    event.preventDefault();
    try {
      await api.post("/tasks", {
        ...form,
        projectId: activeProject,
        dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : undefined,
      });
      setOpenCreate(false);
      setForm({ title: "", description: "", priority: "medium", dueDate: "", assignedTo: members[0]?._id || "" });
      toast.success("Task created");
      refreshTasks();
    } catch {
      toast.error("Could not create task");
    }
  };

  const updateStatus = async (taskId, status) => {
    try {
      await api.patch(`/tasks/${taskId}/status`, { status });
      toast.success("Task status updated");
      refreshTasks();
    } catch {
      toast.error("Could not update task");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <AITaskBreakdown />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-semibold">Task Management</h1>
          <div className="flex gap-2">
            <div className="glass inline-flex rounded-xl p-1">
              <button onClick={() => setViewMode("table")} className={`rounded-lg px-3 py-1.5 text-xs ${viewMode === "table" ? "bg-white/10 text-white" : "text-slate-400"}`}>Table</button>
              <button onClick={() => setViewMode("kanban")} className={`rounded-lg px-3 py-1.5 text-xs ${viewMode === "kanban" ? "bg-white/10 text-white" : "text-slate-400"}`}>Kanban</button>
            </div>
            {user?.role === "admin" && (
              <button onClick={() => setOpenCreate(true)} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accentPurple to-accentViolet px-4 py-2">
                <Plus size={16} />
                Create Task
              </button>
            )}
          </div>
        </div>
        <select className="glass rounded-xl px-4 py-3" value={activeProject} onChange={(e) => setActiveProject(e.target.value)}>
          {projects.map((project) => (
            <option key={project._id} value={project._id}>{project.title}</option>
          ))}
        </select>
        {loadingTasks && <SkeletonCard count={3} className="h-16" />}
        {!loadingTasks && tasks.length === 0 && (
          <EmptyState title="No tasks in this project" message="Create a task and assign it to a team member." />
        )}
        {viewMode === "table" && (
          <div className="glass overflow-x-auto rounded-2xl p-2">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400">
                <th className="px-3 py-2">Task</th>
                <th className="px-3 py-2">Priority</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Due Date</th>
                <th className="px-3 py-2">Assignee</th>
                <th className="px-3 py-2">Update</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id} className="border-t border-white/10">
                  <td className="px-3 py-3">{task.title}</td>
                  <td className="px-3 py-3"><PriorityBadge priority={task.priority} /></td>
                  <td className="px-3 py-3"><StatusBadge status={task.status} /></td>
                  <td className="px-3 py-3">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "-"}</td>
                  <td className="px-3 py-3">{task.assignedTo?.name || "-"}</td>
                  <td className="px-3 py-3">
                    {user?.role === "admin" ? (
                      <select className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs" value={task.status} onChange={(e) => updateStatus(task._id, e.target.value)}>
                        <option value="todo">todo</option>
                        <option value="in_progress">in progress</option>
                        <option value="done">done</option>
                      </select>
                    ) : (
                      <span className="text-xs text-slate-400">Admin only</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
        {viewMode === "kanban" && (
          <div className="grid gap-4 lg:grid-cols-3">
            {["todo", "in_progress", "done"].map((column) => (
              <div key={column} className="glass rounded-2xl p-4">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-300">{column.replace("_", " ")}</h3>
                <div className="space-y-3">
                  {tasks.filter((task) => task.status === column).map((task) => (
                    <div key={task._id} className="rounded-xl bg-white/5 p-3">
                      <p className="font-medium">{task.title}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <PriorityBadge priority={task.priority} />
                        <StatusBadge status={task.status} />
                      </div>
                      <p className="mt-2 text-xs text-slate-400">
                        {task.assignedTo?.name || "Unassigned"} {task.dueDate ? `• ${new Date(task.dueDate).toLocaleDateString()}` : ""}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Modal open={openCreate && user?.role === "admin"} title="Create Task" onClose={() => setOpenCreate(false)}>
        <form className="space-y-3" onSubmit={createTask}>
          <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3" placeholder="Task title" value={form.title} onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))} required />
          <textarea className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3" rows={3} placeholder="Description" value={form.description} onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))} />
          <div className="grid grid-cols-2 gap-3">
            <select className="rounded-xl border border-white/10 bg-white/5 px-4 py-3" value={form.priority} onChange={(e) => setForm((prev) => ({ ...prev, priority: e.target.value }))}>
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </select>
            <input className="rounded-xl border border-white/10 bg-white/5 px-4 py-3" type="date" value={form.dueDate} onChange={(e) => setForm((prev) => ({ ...prev, dueDate: e.target.value }))} />
          </div>
          <select className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3" value={form.assignedTo} onChange={(e) => setForm((prev) => ({ ...prev, assignedTo: e.target.value }))} required>
            {members.map((member) => (
              <option key={member._id} value={member._id}>
                {member.name} ({member.role})
              </option>
            ))}
          </select>
          <button className="w-full rounded-xl bg-gradient-to-r from-accentPurple to-accentViolet py-3">Create Task</button>
        </form>
      </Modal>
    </DashboardLayout>
  );
};
