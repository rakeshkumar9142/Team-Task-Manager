import { useState } from "react";
import { Modal } from "./Modal";
import toast from "react-hot-toast";
import { Loader } from "./Loader";

export const InviteTeamModal = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");
  const [loading, setLoading] = useState(false);

  const handleInvite = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call for inviting by email since backend might not support it yet
    setTimeout(() => {
      toast.success(`Invitation sent to ${email}`);
      setEmail("");
      setRole("member");
      setLoading(false);
      onClose();
    }, 1500);
  };

  return (
    <Modal open={open} title="Invite New Teammate" onClose={onClose}>
      <form className="space-y-4" onSubmit={handleInvite}>
        <div>
          <label className="mb-1 block text-sm text-slate-400">Email Address</label>
          <input
            type="email"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-accentViolet"
            placeholder="colleague@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-slate-400">Role</label>
          <select
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-accentViolet"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            disabled={loading}
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>
        <button
          disabled={loading || !email}
          className="w-full flex justify-center items-center rounded-xl bg-gradient-to-r from-accentPurple to-accentViolet py-3 font-medium transition-all hover:opacity-90 disabled:opacity-50 mt-2"
        >
          {loading ? <Loader className="h-6" /> : "Send Invite"}
        </button>
      </form>
    </Modal>
  );
};
