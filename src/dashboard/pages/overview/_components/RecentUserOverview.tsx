/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Ban, Trash2, CheckCircle, Loader2 } from "lucide-react";
import type { Column } from "@/components/shared/CommonTable";
import CommonTable from "@/components/shared/CommonTable";

import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useBlockUserMutation, useDeleteUserMutation, useGetRecentUsersQuery, useUnblockUserMutation, type User } from "@/redux/users/user.api";

export function RecentUserOverview() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetRecentUsersQuery();
  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const swalConfig = {
    confirmButtonColor: "#00C853",
    cancelButtonColor: "#EF4444",
    customClass: {
      popup: "rounded-[24px] p-6",
      confirmButton: "rounded-xl px-6 py-2.5 font-semibold",
      cancelButton: "rounded-xl px-6 py-2.5 font-semibold",
    },
  };

  const handleToggleStatus = async (user: User) => {
    const isBlocking = user.status;
    const actionText = isBlocking ? "Block" : "Unblock";

    const result = await Swal.fire({
      ...swalConfig,
      title: `${actionText} User?`,
      text: `Are you sure you want to ${actionText.toLowerCase()} ${user.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${actionText}`,
    });

    if (result.isConfirmed) {
      try {
        isBlocking
          ? await blockUser(user.id).unwrap()
          : await unblockUser(user.id).unwrap();
        Swal.fire({
          ...swalConfig,
          title: "Updated!",
          text: `User has been ${actionText.toLowerCase()}ed.`,
          icon: "success",
        });
      } catch (error) {
        console.log(error)
        Swal.fire({
          ...swalConfig,
          title: "Error",
          text: "Operation failed",
          icon: "error",
        });
      }
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      ...swalConfig,
      title: "Permanent Delete?",
      text: "This user will be removed forever.",
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Delete Now",
    });

    if (result.isConfirmed) {
      try {
        await deleteUser(id).unwrap();
        Swal.fire({
          ...swalConfig,
          title: "Deleted",
          text: "User removed from system.",
          icon: "success",
        });
      } catch (error) {
        console.log(error)
        Swal.fire({
          ...swalConfig,
          title: "Error",
          text: "Delete failed",
          icon: "error",
        });
      }
    }
  };

  const columns: Column<User>[] = [
    {
      header: "Sl",
      render: (_, index: any) => index + 1,
    },
    {
      header: "User",
      render: (item) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border border-slate-100 shadow-sm">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name}`}
            />
            <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold text-slate-700 text-sm leading-tight">
              {item.name}
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              {item.status ? "Active" : "Restricted"}
            </span>
          </div>
        </div>
      ),
    },
    { header: "Email", key: "email" },
    {
      header: "Last Login",
      render: (item) => (
        <span className="text-slate-500 text-sm">
          {item.lastLogin
            ? new Date(item.lastLogin).toLocaleDateString()
            : "No Data"}
        </span>
      ),
    },
    {
      header: "Action",
      render: (item) => (
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleToggleStatus(item)}
            className={`transition-all hover:scale-110 cursor-pointer ${item.status ? "text-slate-300 hover:text-amber-500" : "text-[#00C853] hover:text-green-600"}`}
          >
            {item.status ? <Ban size={18} /> : <CheckCircle size={18} />}
          </button>
          <button
            onClick={() => handleDelete(item.id)}
            className="text-red-300 hover:text-red-600 transition-all hover:scale-110 cursor-pointer"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-50">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">
            Recent Users
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Overview of the latest registered members.
          </p>
        </div>
        <Button
          onClick={() => navigate("/dashboard/user-management")}
          className="bg-[#00C853] hover:bg-[#00b049] text-white rounded-2xl px-8 h-12 font-bold transition-all active:scale-95 shadow-lg shadow-green-100"
        >
          View All
        </Button>
      </div>

      {isLoading ? (
        <div className="h-64 flex items-center justify-center">
          <Loader2 className="animate-spin text-[#00C853] h-10 w-10" />
        </div>
      ) : (
        <CommonTable columns={columns} data={data?.data || []} />
      )}
    </div>
  );
}
