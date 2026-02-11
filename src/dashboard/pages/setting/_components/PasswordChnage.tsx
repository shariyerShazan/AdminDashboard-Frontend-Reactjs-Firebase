import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Eye, EyeOff, Lock } from "lucide-react";

const PasswordChange = () => {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Change Password</h2>
          <p className="text-slate-500 mt-1">
            Choose a secure password to protect your account.
          </p>
        </div>
        <div className="bg-[#F0FAF3] p-3 rounded-2xl">
          <ShieldCheck className="text-[#00C853] h-8 w-8" />
        </div>
      </div>

      <form className="space-y-8 max-w-md">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 ml-1">
              Current Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                className="h-14 rounded-2xl border-slate-200 bg-slate-50/30 pl-12 pr-12 focus-visible:ring-[#00C853]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 ml-1">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                type={showPass ? "text" : "password"}
                placeholder="Create new password"
                className="h-14 rounded-2xl border-slate-200 bg-slate-50/30 pl-12 pr-12 focus-visible:ring-[#00C853]"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {/* Password Strength Indicator */}
            <div className="flex gap-1 mt-3 px-1">
              <div className="h-1.5 flex-1 rounded-full bg-[#00C853]" />
              <div className="h-1.5 flex-1 rounded-full bg-[#00C853]" />
              <div className="h-1.5 flex-1 rounded-full bg-slate-100" />
              <div className="h-1.5 flex-1 rounded-full bg-slate-100" />
              <span className="text-[11px] font-bold text-[#00C853] ml-2 uppercase tracking-wider">
                Medium
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 ml-1">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                type={showPass ? "text" : "password"}
                placeholder="Repeat new password"
                className="h-14 rounded-2xl border-slate-200 bg-slate-50/30 pl-12 focus-visible:ring-[#00C853]"
              />
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Button className="w-full bg-[#00C853] hover:bg-[#00b049] cursor-pointer text-white h-14 rounded-2xl text-base font-bold shadow-lg shadow-green-100/50 transition-all active:scale-[0.98]">
            Update Password
          </Button>
          <p className="text-center text-xs text-slate-400 mt-4">
            Make sure your password is at least 8 characters long and includes a
            mix of numbers and symbols.
          </p>
        </div>
      </form>
    </div>
  );
};

export default PasswordChange;
