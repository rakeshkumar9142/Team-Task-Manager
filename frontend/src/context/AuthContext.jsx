import { createContext, useContext, useMemo, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("ttm_user");
    return raw ? JSON.parse(raw) : null;
  });

  const setSession = (payload) => {
    localStorage.setItem("ttm_token", payload.token);
    localStorage.setItem("ttm_user", JSON.stringify(payload.user));
    setUser(payload.user);
  };

  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    setSession(data);
  };

  const register = async (name, email, password, role) => {
    const { data } = await api.post("/auth/register", { name, email, password, role });
    setSession(data);
  };

  const logout = () => {
    localStorage.removeItem("ttm_token");
    localStorage.removeItem("ttm_user");
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, register, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
