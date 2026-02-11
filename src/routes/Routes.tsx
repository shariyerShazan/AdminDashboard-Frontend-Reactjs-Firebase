import ErrorPage from "@/components/shared/ErrorPage";
import NewsAndUpdate from "@/dashboard/pages/newsAndUpdate/NewsAndUpdate";
import AdminOverview from "@/dashboard/pages/overview/Overview";
import DashboardSetting from "@/dashboard/pages/setting/Setting";
import UserManagement from "@/dashboard/pages/userManagement/UserManagement";
import MainLayout from "@/layouts/MainLayout";
import { createBrowserRouter } from "react-router";

export const Routes = createBrowserRouter([
  {
    path: "",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "overview",
        element: <AdminOverview />,
      },
      {
        path: "news-and-update",
        element: <NewsAndUpdate />
      },
      {
        path: "users-management" ,
        element: <UserManagement />
      },
      {
        path: "settings" ,
        element: <DashboardSetting />
      }
    ],
  },
]);