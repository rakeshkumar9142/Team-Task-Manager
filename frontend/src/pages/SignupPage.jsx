import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Loader } from "../components/Loader";

export const SignupPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "member" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await register(form.name, form.email, form.password, form.role);
      toast.success("Account created successfully!");
      navigate("/app/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create account" subtitle="Start managing placement teams like a startup.">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input className="w-full rounded-xl border border-slate-300/30 bg-white/60 px-4 py-3 dark:border-white/10 dark:bg-white/5" placeholder="Name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required />
        <input className="w-full rounded-xl border border-slate-300/30 bg-white/60 px-4 py-3 dark:border-white/10 dark:bg-white/5" placeholder="Email" type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} required />
        <input className="w-full rounded-xl border border-slate-300/30 bg-white/60 px-4 py-3 dark:border-white/10 dark:bg-white/5" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} required />
        <select className="w-full rounded-xl border border-slate-300/30 bg-white/60 px-4 py-3 dark:border-white/10 dark:bg-white/5" value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}>
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>
        <button 
          disabled={loading}
          className="w-full flex items-center justify-center rounded-xl bg-gradient-to-r from-accentPurple to-accentViolet py-3 font-medium transition-all hover:opacity-90 active:scale-95 disabled:opacity-70"
        >
          {loading ? <Loader className="h-6" /> : "Create account"}
        </button>
      </form>
      <p className="mt-5 text-sm text-slate-600 dark:text-slate-400">
        Already registered? <Link to="/login" className="text-accentCyan">Sign in</Link>
      </p>
    </AuthLayout>
  );
};
