import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Loader } from "../components/Loader";

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleDemoLogin = () => {
    setForm({ email: "demo@taskmanager.com", password: "demo123" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await login(form.email, form.password);
      toast.success("Welcome back!");
      navigate("/app/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Manage tasks, projects, and team momentum.">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          className="w-full rounded-xl border border-slate-300/30 bg-white/60 px-4 py-3 outline-none placeholder:text-slate-500 focus:border-accentViolet dark:border-white/10 dark:bg-white/5"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          required
        />
        <input
          className="w-full rounded-xl border border-slate-300/30 bg-white/60 px-4 py-3 outline-none placeholder:text-slate-500 focus:border-accentViolet dark:border-white/10 dark:bg-white/5"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
          required
        />
        <button 
          disabled={loading}
          className="w-full flex items-center justify-center rounded-xl bg-gradient-to-r from-accentPurple to-accentViolet py-3 font-medium transition-all hover:opacity-90 active:scale-95 disabled:opacity-70"
        >
          {loading ? <Loader className="h-6" /> : "Sign in"}
        </button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-slate-50 px-2 text-slate-500 dark:bg-slate-900 dark:text-slate-400">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={handleDemoLogin}
            className="flex w-full justify-center rounded-xl border border-slate-300 bg-white py-3 font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 active:scale-95 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
          >
            Try Demo Account
          </button>
        </div>
      </div>
      <p className="mt-5 text-sm text-slate-600 dark:text-slate-400">
        New here? <Link to="/signup" className="text-accentCyan">Create account</Link>
      </p>
    </AuthLayout>
  );
};
