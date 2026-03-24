import ErrorPage from "@/components/shared/ErrorPage";
import ForgotPasswordPage from "@/dashboard/pages/login/ForgotPasswordPage";
import LoginPage from "@/dashboard/pages/login/LoginPage";
import NewsAndUpdate from "@/dashboard/pages/newsAndUpdate/NewsAndUpdate";
import AdminOverview from "@/dashboard/pages/overview/Overview";
import DashboardSetting from "@/dashboard/pages/setting/Setting";
import UserManagement from "@/dashboard/pages/userManagement/UserManagement";
import MainLayout from "@/layouts/MainLayout";
// import path from "path";
import { createBrowserRouter } from "react-router";
import ProtectedRoute from "./ProtectedRoute";

export const Routes = createBrowserRouter([
  {
    path: "dashboard",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "overview",
        element: <AdminOverview />,
      },
      {
        path: "news-and-update",
        element: <NewsAndUpdate />,
      },
      {
        path: "users-management",
        element: <UserManagement />,
      },
      {
        path: "settings",
        element: <DashboardSetting />,
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "forgot-password",
    element: <ForgotPasswordPage />,
  },
]);