import { Navigate, Route, Routes } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Suspense, lazy } from "react";
import { Loader } from "../components/Loader";

const ContactPage = lazy(() => import("../pages/ContactPage").then(module => ({ default: module.ContactPage })));
const DashboardPage = lazy(() => import("../pages/DashboardPage").then(module => ({ default: module.DashboardPage })));
const LandingPage = lazy(() => import("../pages/LandingPage").then(module => ({ default: module.LandingPage })));
const LoginPage = lazy(() => import("../pages/LoginPage").then(module => ({ default: module.LoginPage })));
const ProjectsPage = lazy(() => import("../pages/ProjectsPage").then(module => ({ default: module.ProjectsPage })));
const SignupPage = lazy(() => import("../pages/SignupPage").then(module => ({ default: module.SignupPage })));
const TasksPage = lazy(() => import("../pages/TasksPage").then(module => ({ default: module.TasksPage })));
const TeamPage = lazy(() => import("../pages/TeamPage").then(module => ({ default: module.TeamPage })));

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
    <Suspense fallback={<div className="flex h-screen w-screen items-center justify-center"><Loader className="h-10 w-10" /></div>}>
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
    </Suspense>
  );
};
