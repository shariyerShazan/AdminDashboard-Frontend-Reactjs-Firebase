import React, { useState } from "react";
import { useNavigate } from "react-router"; // Standard React Router


import { Eye, EyeOff, Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth logic
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    console.log("Logged in:", form);
  }; 
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f8fafc] p-4 font-sans">
      <Card className="w-full max-w-[400px] border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl bg-white">
        <CardHeader className="pt-10 pb-8 text-center">
          <CardTitle className="text-2xl font-bold text-slate-900 tracking-tight">
            Welcome back
          </CardTitle>
          <CardDescription className="text-slate-500 mt-2">
            Enter your details to access your dashboard
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 px-8 pb-10">
          {/* Social Login */}
          <Button
            variant="outline"
            className="w-full cursor-pointer py-6 border-slate-200 hover:bg-slate-50 transition-all rounded-xl flex items-center justify-center gap-3 font-medium text-slate-700"
            onClick={() => console.log("Google Auth")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Sign in with Google
          </Button>

          <div className="relative flex items-center justify-center">
            <span className="absolute inset-x-0 h-px bg-slate-100"></span>
            <span className="relative bg-white px-4 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
              or use email
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div className="relative group">
                <Mail
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors"
                  size={18}
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="Email address"
                  required
                  className="pl-11 h-12 rounded-xl border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/10 transition-all bg-slate-50/30"
                  onChange={handleChange}
                />
              </div>

              <div className="relative group">
                <Lock
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors"
                  size={18}
                />
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  className="pl-11 pr-11 h-12 rounded-xl border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/10 transition-all bg-slate-50/30"
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute cursor-pointer right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-sm cursor-pointer font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full cursor-pointer h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-[0_4px_12px_rgba(16,185,129,0.25)] flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight size={18} />
                </>
              )}
            </Button>
          </form>

          {/* <p className="text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <button className="text-emerald-600 font-bold hover:underline">
              Sign up
            </button>
          </p> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
