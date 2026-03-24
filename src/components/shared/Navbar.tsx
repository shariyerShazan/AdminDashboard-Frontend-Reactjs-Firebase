import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Loader2, Settings, ChevronDown } from "lucide-react";
import { useGetProfileQuery } from "@/redux/auth/auth.api";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { data, isLoading } = useGetProfileQuery();
  const user = data?.data;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  const getTitle = (pathname: string) => {
    switch (pathname) {
      case "/overview":
        return "Dashboard";
      case "/news-and-update":
        return "News & Updates";
      case "/users-management":
        return "User Management";
      case "/settings":
        return "Settings";
      default:
        return "ScorePulse";
    }
  };

  return (
    <header className="flex h-24 items-center justify-between px-8 bg-[#121212] border-b border-white/5 text-white rounded-b-[40px] shadow-2xl relative z-50">
      <h1 className="text-lg md:text-2xl pl-12 md:pl-0 font-bold tracking-tight">
        {getTitle(location.pathname)}
      </h1>

      <div className="flex items-center gap-4">
        {isLoading ? (
          <Loader2 className="animate-spin text-gray-400" size={20} />
        ) : (
          <div className="flex items-center gap-4 relative" ref={dropdownRef}>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold">{user?.name || "Admin User"}</p>
              <p className="text-xs text-gray-400 capitalize">
                {user?.role?.toLowerCase() || "Admin"}
              </p>
            </div>

            {/* Custom Dropdown Trigger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex cursor-pointer items-center gap-2 group outline-none"
            >
              <Avatar className="h-10 w-10 md:h-12 md:w-12 border-2 border-white/10 transition-transform group-hover:scale-105">
                <AvatarImage
                  src={
                    user?.profileImageUrl ||
                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`
                  }
                />
                <AvatarFallback className="bg-slate-800 text-white">
                  {user?.name?.charAt(0) || "A"}
                </AvatarFallback>
              </Avatar>
              <ChevronDown
                size={16}
                className={`text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Custom Dropdown Menu */}
            {isOpen && (
              <div className="absolute right-0 top-full mt-4 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 animate-in fade-in zoom-in duration-200 origin-top-right">
                <div className="px-4 py-2 border-b border-slate-50">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    My Account
                  </p>
                </div>

                <button
                  onClick={() => {
                    navigate("/dashboard/settings");
                    setIsOpen(false);
                  }}
                  className="w-full flex cursor-pointer items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Settings size={18} className="text-slate-400" />
                  Profile Settings
                </button>

                <div className="h-px bg-slate-50 my-1" />

                <button
                  onClick={handleLogout}
                  className="w-full flex cursor-pointer items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
