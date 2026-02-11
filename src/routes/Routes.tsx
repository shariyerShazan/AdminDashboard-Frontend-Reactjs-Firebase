import MainLayout from "@/layouts/MainLayout";
import { createBrowserRouter } from "react-router";

export const Routes = createBrowserRouter([
    {
        path: "" ,
        element: <MainLayout />
    }
])