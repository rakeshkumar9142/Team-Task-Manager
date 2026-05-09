import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import api from "../services/api";
import { Modal } from "../components/Modal";
import { EmptyState } from "../components/EmptyState";
import { SkeletonCard } from "../components/SkeletonCard";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export const TeamPage = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState([]);
  const [users, setUsers] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [memberId, setMemberId] = useState("");
  const [openInvite, setOpenInvite] = useState(false);
  const [loadingMembers, setLoadingMembers] = useState(true);

  useEffect(() => {
    api.get("/projects").then(({ data }) => {
      setProjects(data.data);
      if (data.data[0]?._id) setProjectId(data.data[0]._id);
    });
    api.get("/users").then(({ data }) => setUsers(data.data)).catch(() => {});
  }, []);

  useEffect(() => {
    if (!projectId) return;
    setLoadingMembers(true);
    api
      .get(`/projects/${projectId}/members`)
      .then(({ data }) => setMembers(data.data))
      .catch(() => setMembers([]))
      .finally(() => setLoadingMembers(false));
  }, [projectId]);

  const inviteMember = async (event) => {
    event.preventDefault();
    try {
      await api.post(`/projects/${projectId}/members`, { memberId });
      setMemberId("");
      setOpenInvite(false);
      showToast("Member invited");
      const { data } = await api.get(`/projects/${projectId}/members`);
      setMembers(data.data);
    } catch {
      showToast("Could not invite member", "error");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-semibold">Team Management</h1>
          {user?.role === "admin" && (
            <button onClick={() => setOpenInvite(true)} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accentPurple to-accentViolet px-4 py-2">
              <Plus size={16} />
              Invite Member
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          <select className="glass rounded-xl px-4 py-3" value={projectId} onChange={(e) => setProjectId(e.target.value)}>
            {projects.map((project) => <option key={project._id} value={project._id}>{project.title}</option>)}
          </select>
        </div>
        {loadingMembers && <SkeletonCard count={2} className="h-24" />}
        {!loadingMembers && members.length === 0 && (
          <EmptyState title="No members in this project" message="Invite members to collaborate and assign work." />
        )}
        <div className="grid gap-3 md:grid-cols-2">
          {members.map((member) => (
            <div key={member._id} className="glass rounded-2xl p-4">
              <p className="font-medium">{member.name}</p>
              <p className="text-sm text-slate-400">{member.email}</p>
              <span className="mt-2 inline-block rounded-full bg-accentCyan/20 px-2 py-1 text-xs">{member.role}</span>
            </div>
          ))}
        </div>
      </div>
      <Modal open={openInvite && user?.role === "admin"} title="Invite Member" onClose={() => setOpenInvite(false)}>
        <form className="space-y-3" onSubmit={inviteMember}>
          <select className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3" value={memberId} onChange={(e) => setMemberId(e.target.value)} required>
            <option value="">Select member</option>
            {users
              .filter((user) => !members.some((member) => member._id === user._id))
              .map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name} ({user.role})
                </option>
              ))}
          </select>
          <button className="w-full rounded-xl bg-gradient-to-r from-accentPurple to-accentViolet py-3">Invite to Project</button>
        </form>
      </Modal>
    </DashboardLayout>
  );
};
