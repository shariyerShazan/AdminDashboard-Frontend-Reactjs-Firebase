
import { useState } from "react";
import {
  Search,
  ListFilter,
  Ban,
  Trash2,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import CommonTable, { type Column } from "@/components/shared/CommonTable";
import CommonPagination from "@/components/shared/CommonPagination";
import Swal from "sweetalert2";
import { useBlockUserMutation, useDeleteUserMutation, useGetAllUsersQuery, useUnblockUserMutation, type User } from "@/redux/users/user.api";
// import type { User } from "firebase/auth";

const UserManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // API Hooks
  const { data, isLoading } = useGetAllUsersQuery({
    page: currentPage,
    limit: 10,
    search: searchTerm,
  });

  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  // Helper for SweetAlert styling
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
    const isBlocking = user.status; // if true, we are blocking him
    const actionText = isBlocking ? "Block" : "Unblock";

    const result = await Swal.fire({
      ...swalConfig,
      title: `Are you sure?`,
      text: `Do you want to ${actionText.toLowerCase()} ${user.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${actionText}`,
    });

    if (result.isConfirmed) {
      try {
        if (isBlocking) {
          await blockUser(user.id).unwrap();
        } else {
          await unblockUser(user.id).unwrap();
        }
        Swal.fire({
          ...swalConfig,
          title: "Success!",
          text: `User ${actionText}ed successfully`,
          icon: "success",
        });
      } catch (error) {
        console.log(error)
        Swal.fire({
          ...swalConfig,
          title: "Error!",
          text: "Something went wrong",
          icon: "error",
        });
      }
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      ...swalConfig,
      title: "Delete User?",
      text: "This action cannot be undone!",
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    });

    if (result.isConfirmed) {
      try {
        await deleteUser(id).unwrap();
        Swal.fire({
          ...swalConfig,
          title: "Deleted!",
          text: "User has been removed.",
          icon: "success",
        });
      } catch (error) {
                console.log(error);
        Swal.fire({
          ...swalConfig,
          title: "Error!",
          text: "Failed to delete user",
          icon: "error",
        });
      }
    }
  };

  const columns: Column<User>[] = [
    {
      header: "Sl",
      render: (_, index) => (currentPage - 1) * 10 + index + 1,
    },
    {
      header: "User",
      render: (item) => (
        <div className="flex items-center gap-3 py-1">
          <Avatar className="h-10 w-10 border border-slate-100 shadow-sm">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.name}`}
            />
            <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold text-slate-700 leading-none mb-1">
              {item.name}
            </span>
            <span className="text-xs text-slate-400">
              {item.status ? "Active" : "Blocked"}
            </span>
          </div>
        </div>
      ),
    },
    { header: "Email", key: "email" },
    {
      header: "Last Login",
      render: (item) =>
        item.lastLogin ? new Date(item.lastLogin).toLocaleString() : "Never",
    },
    {
      header: "Action",
      render: (item) => (
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleToggleStatus(item)}
            className={`cursor-pointer transition-all hover:scale-110 ${item.status ? "text-slate-400 hover:text-amber-500" : "text-[#00C853] hover:text-green-600"}`}
            title={item.status ? "Block User" : "Unblock User"}
          >
            {item.status ? <Ban size={20} /> : <CheckCircle size={20} />}
          </button>
          <button
            onClick={() => handleDelete(item.id)}
            className="text-red-400 hover:text-red-600 cursor-pointer transition-all hover:scale-110"
            title="Delete User"
          >
            <Trash2 size={20} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-50 min-h-[calc(100vh-140px)]">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="relative w-full max-w-md">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <Loader2 className="animate-spin text-[#00C853]" size={40} />
          <p className="text-slate-400 font-medium">Loading users...</p>
        </div>
      ) : (
        <>
          <CommonTable columns={columns} data={data?.data || []} />

          <div className="mt-6">
            <CommonPagination
              currentPage={currentPage}
              totalPages={Math.ceil((data?.totalUsers || 0) / 10)}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default UserManagement;
