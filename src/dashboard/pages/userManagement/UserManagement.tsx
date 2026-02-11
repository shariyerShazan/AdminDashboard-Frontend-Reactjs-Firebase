import { useState } from "react";
import { Search, ListFilter, Ban, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import CommonTable, {type Column } from "@/components/shared/CommonTable";
import CommonPagination from "@/components/shared/CommonPagination";

interface UserData {
  id: string;
  sl: string;
  name: string;
  email: string;
  loginType: "Google" | "Email";
  lastLogin: string;
}

const UserManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const columns: Column<UserData>[] = [
    { header: "Sl", key: "sl" },
    {
      header: "User",
      render: (item) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border border-slate-100">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name}`}
            />
            <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
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
            <>
              <img
                src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png"
                className="w-4 h-4"
                alt="Google"
              />
              <span className="text-slate-600">Google</span>
            </>
          ) : (
            <>
              <span className="text-slate-400">✉️</span>
              <span className="text-slate-600">Email</span>
            </>
          )}
        </div>
      ),
    },
    { header: "Last Login", key: "lastLogin" },
    {
      header: "Action",
      render: () => (
        <div className="flex items-center gap-3">
          <button className="text-slate-400 cursor-pointer hover:text-slate-600 transition-colors">
            <Ban size={20} />
          </button>
          <button className="text-[#00C853] hover:text-[#00a344] cursor-pointer transition-colors">
            <Trash2 size={20} />
          </button>
        </div>
      ),
    },
  ];

  // Mocking 10 rows to match your User Management screenshot
  const userData: UserData[] = Array(10)
    .fill({
      name: "Robert William",
      email: "robert.william@gmail.com",
      loginType: "Google",
      lastLogin: "Last 2026-01-15",
    })
    .map((item, i) => ({
      ...item,
      id: `${i}`,
      sl: `${i + 1}`,
      loginType: i % 2 === 1 ? "Email" : "Google",
      lastLogin: i > 2 ? `Last 2026-01-15` : "2026-01-15",
    }));

  return (
    <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-50 min-h-[calc(100vh-140px)]">
      {/* Header with Search and Filter */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="relative w-full max-w-md">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <Input
            placeholder="Search by name, email or login type"
            className="pl-12 h-14 rounded-2xl border-slate-200 bg-slate-50/30 focus-visible:ring-[#00C853] text-sm"
          />
        </div>

        <Button
          variant="outline"
          className="h-14 px-8 rounded-2xl border-slate-200 flex gap-3 font-semibold text-slate-700 hover:bg-slate-50 transition-all active:scale-95"
        >
          <ListFilter size={20} strokeWidth={2.5} />
          Filter
        </Button>
      </div>

      {/* Reusable Table Component */}
      <CommonTable columns={columns} data={userData} />

      {/* Reusable Pagination Component */}
      <div className="">
        <CommonPagination
          currentPage={currentPage}
          totalPages={10}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default UserManagement;
