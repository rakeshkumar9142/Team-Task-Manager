import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout";
import { useAuth } from "../context/AuthContext";

export const SignupPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "member" });
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setError("");
      await register(form.name, form.email, form.password, form.role);
      navigate("/app/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to register");
    }
  };

  return (
    <AuthLayout title="Create account" subtitle="Start managing placement teams like a startup.">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3" placeholder="Name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required />
        <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3" placeholder="Email" type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} required />
        <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3" placeholder="Password" type="password" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} required />
        <select className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3" value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}>
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>
        {error && <p className="text-sm text-rose-400">{error}</p>}
        <button className="w-full rounded-xl bg-gradient-to-r from-accentPurple to-accentViolet py-3 font-medium">Create account</button>
      </form>
      <p className="mt-5 text-sm text-slate-400">
        Already registered? <Link to="/login" className="text-accentCyan">Sign in</Link>
      </p>
    </AuthLayout>
  );
};
