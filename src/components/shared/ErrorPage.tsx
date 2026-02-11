// import React from "react";
import { useNavigate } from "react-router";
import { AlertCircle, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0F0F0F] text-white p-6">
      {/* Visual Element */}
      <div className="relative mb-8">
        <div className="absolute inset-0 blur-3xl bg-[#00C853] opacity-20 rounded-full" />
        <div className="relative bg-[#1A1A1A] p-8 rounded-full border border-white/5 shadow-2xl">
          <AlertCircle size={80} className="text-[#00C853] animate-pulse" />
        </div>
      </div>

      {/* Text Content */}
      <div className="text-center space-y-4 max-w-md">
        <h1 className="text-6xl font-black tracking-tighter italic">
          4<span className="text-[#00C853]">0</span>4
        </h1>
        <h2 className="text-2xl font-bold tracking-tight">Page Not Found</h2>
        <p className="text-gray-400 leading-relaxed">
          Oops! It looks like you've wandered into offside territory. The page
          you are looking for doesn't exist or has been moved.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-10 w-full max-w-sm">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="flex-1 bg-transparent border-white/10 hover:bg-white/5 hover:text-white text-gray-300 rounded-xl py-6"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Go Back
        </Button>

        <Button
          onClick={() => navigate("/")}
          className="flex-1 bg-[#00C853] hover:bg-[#00a344] text-white font-bold rounded-xl py-6"
        >
          <Home className="mr-2 h-5 w-5" />
          Dashboard
        </Button>
      </div>

      {/* Subtle Footer Branding */}
      <div className="mt-20 opacity-30 flex items-center gap-2 font-bold tracking-tighter italic grayscale">
        <span className="text-[#00C853]">S</span>P
        <span className="not-italic text-sm uppercase tracking-widest">
          Scorepulse
        </span>
      </div>
    </div>
  );
};

export default ErrorPage;
