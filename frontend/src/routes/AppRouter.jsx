import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { DashboardPage } from "../pages/DashboardPage";
import { LandingPage } from "../pages/LandingPage";
import { LoginPage } from "../pages/LoginPage";
import { ProjectsPage } from "../pages/ProjectsPage";
import { SignupPage } from "../pages/SignupPage";
import { TasksPage } from "../pages/TasksPage";
import { TeamPage } from "../pages/TeamPage";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

export const AppRouter = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route
      path="/app/dashboard"
      element={
        <PrivateRoute>
          <DashboardPage />
        </PrivateRoute>
      }
    />
    <Route
      path="/app/projects"
      element={
        <PrivateRoute>
          <ProjectsPage />
        </PrivateRoute>
      }
    />
    <Route
      path="/app/tasks"
      element={
        <PrivateRoute>
          <TasksPage />
        </PrivateRoute>
      }
    />
    <Route
      path="/app/team"
      element={
        <PrivateRoute>
          <TeamPage />
        </PrivateRoute>
      }
    />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);
