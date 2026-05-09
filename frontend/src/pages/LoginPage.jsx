import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout";
import { useAuth } from "../context/AuthContext";

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setError("");
      await login(form.email, form.password);
      navigate("/app/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to login");
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Manage tasks, projects, and team momentum.">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-slate-500 focus:border-accentViolet"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          required
        />
        <input
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-slate-500 focus:border-accentViolet"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
          required
        />
        {error && <p className="text-sm text-rose-400">{error}</p>}
        <button className="w-full rounded-xl bg-gradient-to-r from-accentPurple to-accentViolet py-3 font-medium">
          Sign in
        </button>
      </form>
      <p className="mt-5 text-sm text-slate-400">
        New here? <Link to="/signup" className="text-accentCyan">Create account</Link>
      </p>
    </AuthLayout>
  );
};
