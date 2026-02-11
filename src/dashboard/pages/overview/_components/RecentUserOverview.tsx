import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Ban, Trash2 } from "lucide-react";
import type { Column } from "@/components/shared/CommonTable";
import CommonTable from "@/components/shared/CommonTable";
import CommonPagination from "@/components/shared/CommonPagination";

interface UserData {
  sl: string;
  name: string;
  email: string;
  loginType: "Google" | "Email";
  lastLogin: string;
}

export function RecentUserOverview() {
  const columns: Column<UserData>[] = [
    { header: "Sl", key: "sl" },
    {
      header: "User",
      render: (item) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name}`}
            />
            <AvatarFallback>RW</AvatarFallback>
          </Avatar>
          <span className="font-medium text-slate-700">{item.name}</span>
        </div>
      ),
    },
    { header: "Email", key: "email" },
    {
      header: "Login Type",
      render: (item) => (
        <div className="flex items-center gap-2">
          {item.loginType === "Google" ? (
            <img
              src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png"
              className="w-4 h-4"
              alt="Google"
            />
          ) : (
            <span className="text-slate-400">✉️</span>
          )}
          {item.loginType}
        </div>
      ),
    },
    { header: "Last Login", key: "lastLogin" },
    {
      header: "Action",
      render: () => (
        <div className="flex items-center gap-3">
          <button className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer">
            <Ban size={18} />
          </button>
          <button className="text-red-400 hover:text-red-600 transition-colors cursor-pointer">
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  const data: UserData[] = Array(5)
    .fill({
      sl: "1",
      name: "Robert William",
      email: "robert.william@gmail.com",
      loginType: "Google",
      lastLogin: "2026-01-15",
    })
    .map((item, i) => ({
      ...item,
      sl: (i + 1).toString(),
      loginType: i === 1 ? "Email" : "Google",
    }));

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Recent Users</h2>
        <Button className="bg-[#5cb85c] hover:bg-[#00C853] text-white rounded-xl px-6">
          View All
        </Button>
      </div>

      <CommonTable columns={columns} data={data} />

      <div className="mt-4">
        <CommonPagination
          currentPage={1}
          totalPages={10}
          onPageChange={(p) => console.log(p)}
        />
      </div>
    </div>
  );
}
