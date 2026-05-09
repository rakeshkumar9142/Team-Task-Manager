import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import api from "../services/api";
import { EmptyState } from "../components/EmptyState";
import { SkeletonCard } from "../components/SkeletonCard";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { InviteTeamModal } from "../components/InviteTeamModal";

export const TeamPage = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState([]);
  const [users, setUsers] = useState([]);
  const [projectId, setProjectId] = useState("");
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

  // Removed old inviteMember function since we now use InviteTeamModal

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

      <InviteTeamModal open={openInvite && user?.role === "admin"} onClose={() => setOpenInvite(false)} />
    </DashboardLayout>
  );
};
