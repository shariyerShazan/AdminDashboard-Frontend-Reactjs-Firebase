import { type ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router";
import { useGetProfileQuery } from "@/redux/auth/auth.api";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";


interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  const { data, isLoading, isError} = useGetProfileQuery(undefined, {
    skip: !token,
  });

  const user = data?.data;

  // 1. Error and Unauthorized Access Toast
  useEffect(() => {
    if (isError) {
      toast.error("Session expired. Please login again.");
      localStorage.removeItem("token");
    }

    if (user && user.role !== "ADMIN") {
      toast.error("Unauthorized! Admins only.");
    }
  }, [isError, user]);

  // 2. Loading State
  if (isLoading && token) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#121212]">
        <Loader2 className="h-10 w-10 animate-spin text-[#00C853] mb-4" />
        <p className="text-white font-medium animate-pulse">
          Verifying Access...
        </p>
      </div>
    );
  }

  // 3. No Token Redirect
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 4. API Error Redirect
  if (isError) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 5. Role Validation UI
  if (user && user.role !== "ADMIN") {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white p-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-2">
            Access Denied
          </h1>
          <p className="text-slate-500">
            You do not have permission to view this page.
          </p>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="mt-6 px-6 py-2 bg-[#00C853] text-white rounded-xl font-bold cursor-pointer hover:bg-[#00b049] transition-all"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
