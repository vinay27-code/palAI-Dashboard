import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import NotFound from "../pages/NotFound";
import { LoginPage } from "../pages/auth/LoginPage";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { HomePage } from "../pages/dashboard/HomePage";
import { RecommendationsPage } from "../pages/dashboard/RecommendationsPage";
import { FormsPage } from "../pages/dashboard/FormsPage";
import { ProgressPage } from "../pages/dashboard/ProgressPage";
import { ProfilePage } from "../pages/dashboard/ProfilePage";
import { DashboardLayout } from "../components/feature/DashboardLayout";
import { ProtectedRoute } from "../components/feature/ProtectedRoute";

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/auth/login',
    element: <LoginPage />,
  },
  {
    path: '/auth/register',
    element: <RegisterPage />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <HomePage />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard/recommendations',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <RecommendationsPage />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard/forms',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <FormsPage />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard/progress',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <ProgressPage />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/dashboard/profile',
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <ProfilePage />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;