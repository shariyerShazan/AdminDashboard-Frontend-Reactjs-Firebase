/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { Search, Eye, Trash2, Calendar as CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Column } from "@/components/shared/CommonTable";
import CommonTable from "@/components/shared/CommonTable";
import CommonPagination from "@/components/shared/CommonPagination";
import { NewsDialog } from "./_components/NewsDialog";
import { useDeleteNewsMutation, useGetAllNewsQuery, type NewsItem } from "@/redux/news/news.api";
// import { toast } from "react-toastify";
import { ViewNewsDialog } from "./_components/ViewNewsDialog";
import Swal from "sweetalert2";

const NewsAndUpdate = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  // API Hooks
  const { data,
    //  isLoading 
    } = useGetAllNewsQuery({
    page: currentPage,
    limit: 10,
    search: searchTerm,
    category: category === "all" ? undefined : category,
  });

  const [deleteNews] = useDeleteNewsMutation();

 const handleDelete = async (id: string) => {
   const result = await Swal.fire({
     title: "Are you sure?",
     text: "You won't be able to revert this news post!",
     icon: "warning",
     showCancelButton: true,
     confirmButtonColor: "#00C853",
     cancelButtonColor: "#d33",
     confirmButtonText: "Yes, delete it!",
     cancelButtonText: "Cancel",
     customClass: {
       popup: "rounded-[24px]",
       confirmButton: "rounded-xl px-6 py-2.5",
       cancelButton: "rounded-xl px-6 py-2.5",
     },
   });

   if (result.isConfirmed) {
     try {
       await deleteNews(id).unwrap();

       Swal.fire({
         title: "Deleted!",
         text: "The news has been deleted.",
         icon: "success",
         confirmButtonColor: "#00C853",
         customClass: {
           popup: "rounded-[24px]",
           confirmButton: "rounded-xl px-6 py-2.5",
         },
       });
     } catch (error) {
       console.error(error);
       Swal.fire({
         title: "Error!",
         text: "Failed to delete the news.",
         icon: "error",
         confirmButtonColor: "#00C853",
         customClass: {
           popup: "rounded-[24px]",
           confirmButton: "rounded-xl px-6 py-2.5",
         },
       });
     }
   }
 };

  const handleView = (id: string) => {
    setSelectedNewsId(id);
    setIsViewOpen(true);
  };

  const columns: Column<NewsItem>[] = [
    {
      header: "Sl",
      render: (_: any, index: number) => ((currentPage - 1) * 10 + index + 1) ,
    },
    {
      header: "Name",
      render: (item) => (
        <div className="flex items-center gap-4 py-2">
          <img
            src={item.image}
            alt="news"
            className="w-20 h-14 rounded-lg object-cover bg-slate-100"
          />
          <span className="font-medium text-slate-700 max-w-[300px] leading-tight line-clamp-2">
            {item.title}
          </span>
        </div>
      ),
    },
    {
      header: "Category",
      render: (item) => (
        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold uppercase">
          {item.category}
        </span>
      ),
    },
    {
      header: "Created Date",
      render: (item) =>
        new Date(item.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
    },
    {
      header: "Action",
      render: (item) => (
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleView(item.id)}
            className="text-slate-400 cursor-pointer hover:text-blue-500 transition-colors"
          >
            <Eye size={20} />
          </button>
          <button
            onClick={() => handleDelete(item.id)}
            className="text-[#FF4D4D] hover:text-red-700 cursor-pointer transition-colors"
          >
            <Trash2 size={20} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <NewsDialog />
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-50">
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="relative flex-1 min-w-[300px]">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <Input
              placeholder="Search News by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 rounded-xl border-slate-200 focus-visible:ring-[#00C853]"
            />
          </div>

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px] !h-12 rounded-xl border-slate-200">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="FOOTBALL">Football</SelectItem>
              <SelectItem value="TENNIS">Tennis</SelectItem>
              <SelectItem value="BASKETBALL">Basketball</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            className="h-12 px-4 rounded-xl border-slate-200 text-slate-500 font-normal flex gap-6"
          >
            Date
            <CalendarIcon size={18} className="text-slate-400" />
          </Button>
        </div>

        <CommonTable
          columns={columns}
          data={data?.data || []}
          // loading={isLoading}
        />

        <div className="mt-6">
          <CommonPagination
            currentPage={currentPage}
            totalPages={Math.ceil((data?.totalNews || 0) / 10)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>

      <ViewNewsDialog
        id={selectedNewsId}
        open={isViewOpen}
        onOpenChange={setIsViewOpen}
      />
    </div>
  );
};

export default NewsAndUpdate;
