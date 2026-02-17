import { NavLink } from "react-router";
import { LayoutDashboard, Newspaper, Users, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard/overview" },
  {
    icon: Newspaper,
    label: "News & Updates",
    path: "/dashboard/news-and-update",
  },
  {
    icon: Users,
    label: "User Management",
    path: "/dashboard/users-management",
  },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
];

// Extracted for reuse
export function SidebarContent({
  setOpen,
}: {
  setOpen?: (open: boolean) => void;
}) {
  return (
    <div className="flex h-full w-full flex-col bg-[#0F0F0F] text-white p-4">
      <div className="flex items-center gap-2 px-4 py-8">
        <div className="flex items-center font-black text-2xl italic tracking-tighter">
          <span className="text-[#00C853]">S</span>
          <span className="text-white">P</span>
          <span className="ml-2 text-xl font-bold not-italic tracking-widest uppercase">
            Scorepulse
          </span>
        </div>
      </div>

      <nav className="flex-1 space-y-2 mt-4 px-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setOpen?.(false)}
            className="block no-underline"
          >
            {({ isActive }) => (
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start cursor-pointer gap-4 px-4 py-7 text-lg font-medium rounded-xl transition-all",
                  isActive
                    ? "bg-[#00C853] text-white hover:bg-[#00b049]"
                    : "text-gray-400 hover:text-white hover:bg-white/5",
                )}
              >
                <item.icon
                  className={cn(
                    "h-6 w-6",
                    isActive ? "text-white" : "text-gray-400",
                  )}
                />
                {item.label}
              </Button>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden md:flex h-screen w-64 flex-col fixed inset-y-0 z-50">
      <SidebarContent />
    </aside>
  );
}
