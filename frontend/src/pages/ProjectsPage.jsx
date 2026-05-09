import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Users } from "lucide-react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import api from "../services/api";
import { Modal } from "../components/Modal";
import { EmptyState } from "../components/EmptyState";
import { SkeletonCard } from "../components/SkeletonCard";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export const ProjectsPage = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [openCreate, setOpenCreate] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const { data } = await api.get("/projects");
      setProjects(data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects().catch(() => {});
  }, []);

  const createProject = async (event) => {
    event.preventDefault();
    try {
      await api.post("/projects", form);
      setForm({ title: "", description: "" });
      setOpenCreate(false);
      toast.success("Project created");
      fetchProjects();
    } catch {
      toast.error("Could not create project");
    }
  };

  const updateProject = async (event) => {
    event.preventDefault();
    try {
      await api.put(`/projects/${editingProject._id}`, form);
      setForm({ title: "", description: "" });
      setEditingProject(null);
      toast.success("Project updated");
      fetchProjects();
    } catch {
      toast.error("Could not update project");
    }
  };

  const deleteProject = async (projectId) => {
    try {
      await api.delete(`/projects/${projectId}`);
      toast.success("Project deleted");
      fetchProjects();
    } catch {
      toast.error("Could not delete project");
    }
  };

  const openEdit = (project) => {
    setForm({ title: project.title, description: project.description || "" });
    setEditingProject(project);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Projects</h1>
          {user?.role === "admin" && (
            <button onClick={() => setOpenCreate(true)} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accentPurple to-accentViolet px-4 py-2">
              <Plus size={16} />
              New Project
            </button>
          )}
        </div>
        {loading && <SkeletonCard count={4} className="h-44" />}
        <div className="grid gap-4 md:grid-cols-2">
          {projects.length === 0 && (
            <div className="md:col-span-2">
              <EmptyState title="No projects created" message="Start with your first project to organize teams and tasks." />
            </div>
          )}
          {projects.map((project) => {
            const memberCount = project.teamMembers?.length || 0;
            const progress = Math.min(100, memberCount * 20);
            return (
              <motion.div key={project._id} whileHover={{ y: -4 }} className="glass rounded-2xl p-5">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  {user?.role === "admin" && (
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(project)} className="rounded-lg bg-white/5 p-2 text-slate-200 hover:bg-white/10">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => deleteProject(project._id)} className="rounded-lg bg-rose-500/15 p-2 text-rose-200 hover:bg-rose-500/25">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}
                </div>
                <p className="mt-2 text-sm text-slate-400">{project.description || "No description provided yet."}</p>
                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
                    <span className="inline-flex items-center gap-1">
                      <Users size={12} />
                      {memberCount} members
                    </span>
                    <span>Project setup {progress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-accentPurple to-accentCyan" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <Modal open={openCreate && user?.role === "admin"} title="Create New Project" onClose={() => setOpenCreate(false)}>
        <form className="space-y-3" onSubmit={createProject}>
          <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3" placeholder="Project title" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} required />
          <textarea className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3" rows={4} placeholder="Description" value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />
          <button className="w-full rounded-xl bg-gradient-to-r from-accentPurple to-accentViolet py-3">Create Project</button>
        </form>
      </Modal>
      <Modal open={Boolean(editingProject) && user?.role === "admin"} title="Edit Project" onClose={() => setEditingProject(null)}>
        <form className="space-y-3" onSubmit={updateProject}>
          <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3" placeholder="Project title" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} required />
          <textarea className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3" rows={4} placeholder="Description" value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />
          <button className="w-full rounded-xl bg-gradient-to-r from-accentPurple to-accentViolet py-3">Save Changes</button>
        </form>
      </Modal>
    </DashboardLayout>
  );
};
