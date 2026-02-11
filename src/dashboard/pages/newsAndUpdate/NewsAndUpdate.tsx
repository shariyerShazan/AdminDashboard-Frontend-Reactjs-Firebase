import { useState } from "react";
import {
  Search,
  Eye,
  Trash2,
  Calendar as CalendarIcon,
} from "lucide-react";
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


// Define the News Data structure based on your screenshot
interface NewsItem {
  id: string;
  sl: string;
  image: string;
  title: string;
  uploadTime: string;
  category: string;
  createdDate: string;
}

const NewsAndUpdate = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const columns: Column<NewsItem>[] = [
    { header: "Sl", key: "sl" },
    {
      header: "Name",
      render: (item) => (
        <div className="flex items-center gap-4 py-2">
          <img
            src={item.image}
            alt="news"
            className="w-20 h-14 rounded-lg object-cover"
          />
          <span className="font-medium text-slate-700 max-w-[300px] leading-tight">
            {item.title}
          </span>
        </div>
      ),
    },
    { header: "Upload Time", key: "uploadTime" },
    { header: "Category", key: "category" },
    { header: "Created Date", key: "createdDate" },
    {
      header: "Action",
      render: () => (
        <div className="flex items-center gap-3">
          <button className="text-slate-400 cursor-pointer hover:text-slate-600 transition-colors">
            <Eye size={20} />
          </button>
          <button className="text-[#00C853] hover:text-[#00a344] cursor-pointer transition-colors">
            <Trash2 size={20} />
          </button>
        </div>
      ),
    },
  ];

  // Mock data matching your screenshot
  const newsData: NewsItem[] = Array(5)
    .fill({
      image:
        "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=200&h=150&fit=crop",
      title:
        "US Open: Carlos Alcardze beats Caster Ruud in New York to win first major",
      uploadTime: "12:00 PM",
      category: "Football",
      createdDate: "12 May 2025",
    })
    .map((item, i) => ({
      ...item,
      id: `${i}`,
      sl: `${i + 1}`,
      category: i === 1 ? "Tennis" : i === 2 ? "Basketball" : "Football",
    }));

  return (
    <div className="space-y-6">
      {/* Top Header Section */}
      <div className="flex justify-end">
        <NewsDialog/>
      </div>

      {/* Filter & Search Bar Section */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-50">
        <div className="flex flex-wrap items-center gap-4 mb-8">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[300px]">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <Input
              placeholder="Search News by name"
              className="pl-10 h-12 rounded-xl border-slate-200 focus-visible:ring-[#00C853]"
            />
          </div>

          {/* Category Dropdown */}
          <Select defaultValue="football">
            <SelectTrigger className="w-[180px] !h-12 rounded-xl border-slate-200">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="football">Football</SelectItem>
              <SelectItem value="tennis">Tennis</SelectItem>
              <SelectItem value="basketball">Basketball</SelectItem>
            </SelectContent>
          </Select>

          {/* Date Picker Button */}
          <Button
            variant="outline"
            className="h-12 px-4 rounded-xl border-slate-200 text-slate-500 font-normal flex gap-6"
          >
            Date
            <CalendarIcon size={18} className="text-slate-400" />
          </Button>
        </div>

        {/* Table Integration */}
        <CommonTable columns={columns} data={newsData} />

        {/* Pagination Integration */}
        <div className="">
          <CommonPagination
            currentPage={currentPage}
            totalPages={10}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default NewsAndUpdate;
