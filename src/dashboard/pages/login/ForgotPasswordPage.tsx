import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Mail,
  Lock,
  ChevronLeft,
  CheckCircle2,
  Loader2,
  KeyRound,
} from "lucide-react";

type Step = "EMAIL" | "OTP" | "RESET" | "SUCCESS";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("EMAIL");
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ email: "", otp: "", password: "" });

  const handleAction = async (nextStep: Step) => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise((r) => setTimeout(r, 1200));
    setIsLoading(false);
    setStep(nextStep);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4">
      <Card className="w-full max-w-[420px] border-none shadow-xl rounded-2xl bg-white overflow-hidden">
        {/* Subtle top branding line */}
        <div className="h-1.5 w-full bg-emerald-500/10">
          <div
            className="h-full bg-emerald-500 transition-all duration-700 ease-in-out"
            style={{
              width: step === "EMAIL" ? "25%" : step === "OTP" ? "50%" : "100%",
            }}
          />
        </div>

        <CardHeader className="pt-10 text-center">
          <div className="mx-auto w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 rotate-3">
            {step === "SUCCESS" ? (
              <CheckCircle2 className="text-emerald-600" size={28} />
            ) : (
              <KeyRound className="text-emerald-600" size={28} />
            )}
          </div>
          <CardTitle className="text-2xl font-bold text-slate-900">
            {step === "EMAIL" && "Reset Password"}
            {step === "OTP" && "Verify Email"}
            {step === "RESET" && "New Password"}
            {step === "SUCCESS" && "Password Reset"}
          </CardTitle>
          <CardDescription className="px-4 mt-2">
            {step === "EMAIL" && "Enter your email to receive a recovery code."}
            {step === "OTP" && `We've sent a code to your inbox.`}
            {step === "RESET" && "Create a secure password for your account."}
            {step === "SUCCESS" &&
              "Your password has been updated successfully."}
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8 pb-10 space-y-6">
          {step === "EMAIL" && (
            <div className="space-y-4">
              <div className="relative group">
                <Mail
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors"
                  size={18}
                />
                <Input
                  placeholder="name@example.com"
                  className="pl-11 h-12 rounded-xl"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <Button
                onClick={() => handleAction("OTP")}
                disabled={isLoading}
                className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 rounded-xl font-bold cursor-pointer"
              >
                {isLoading ? <Loader2 className="animate-spin" /> : "Send Code"}
              </Button>
            </div>
          )}

          {step === "OTP" && (
            <div className="space-y-6">
              <Input
                placeholder="0 0 0 0 0 0"
                className="h-14 rounded-xl text-center text-2xl font-bold tracking-[0.5em] border-2 focus:border-emerald-500"
                maxLength={6}
                onChange={(e) => setForm({ ...form, otp: e.target.value })}
              />
              <Button
                onClick={() => handleAction("RESET")}
                disabled={isLoading}
                className="w-full h-12 bg-emerald-600 rounded-xl font-bold cursor-pointer"
              >
                Verify & Continue
              </Button>
            </div>
          )}

          {step === "RESET" && (
            <div className="space-y-4">
              <div className="relative group">
                <Lock
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <Input
                  type="password"
                  placeholder="Enter new password"
                  className="pl-11 h-12 rounded-xl"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </div>
              <Button
                onClick={() => handleAction("SUCCESS")}
                className="w-full h-12 bg-emerald-600 rounded-xl font-bold cursor-pointer"
              >
                Update Password
              </Button>
            </div>
          )}

          {step === "SUCCESS" && (
            <Button
              onClick={() => navigate("/login")}
              className="w-full h-12 bg-slate-900 hover:bg-black rounded-xl font-bold cursor-pointer"
            >
              Sign In Now
            </Button>
          )}

          {step !== "SUCCESS" && (
            <button
              onClick={() => navigate("/login")}
              className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors w-full cursor-pointer"
            >
              <ChevronLeft size={16} />
              Back to login
            </button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
