import { Navigate, Route, Routes } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ContactPage } from "../pages/ContactPage";
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
  <AnimatedRoutes />
);

const AnimatedPage = ({ children }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}>
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedPage><LandingPage /></AnimatedPage>} />
        <Route path="/contact" element={<AnimatedPage><ContactPage /></AnimatedPage>} />
        <Route path="/login" element={<AnimatedPage><LoginPage /></AnimatedPage>} />
        <Route path="/signup" element={<AnimatedPage><SignupPage /></AnimatedPage>} />
        <Route
          path="/app/dashboard"
          element={
            <PrivateRoute>
              <AnimatedPage><DashboardPage /></AnimatedPage>
            </PrivateRoute>
          }
        />
        <Route
          path="/app/projects"
          element={
            <PrivateRoute>
              <AnimatedPage><ProjectsPage /></AnimatedPage>
            </PrivateRoute>
          }
        />
        <Route
          path="/app/tasks"
          element={
            <PrivateRoute>
              <AnimatedPage><TasksPage /></AnimatedPage>
            </PrivateRoute>
          }
        />
        <Route
          path="/app/team"
          element={
            <PrivateRoute>
              <AnimatedPage><TeamPage /></AnimatedPage>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};
