import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetSingleNewsQuery } from "@/redux/news/news.api";
import { Calendar, Tag, Loader2, Badge } from "lucide-react";

interface ViewNewsDialogProps {
  id: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ViewNewsDialog({
  id,
  open,
  onOpenChange,
}: ViewNewsDialogProps) {
  const { data, isLoading } = useGetSingleNewsQuery(id!, { skip: !id });

  const news = data?.data;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] overflow-hidden p-0 rounded-[28px] border-none shadow-2xl">
        {isLoading ? (
          <div className="h-[400px] flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#00C853]" />
          </div>
        ) : news ? (
          <div className="flex flex-col">
            <div className="relative h-64 w-full">
              <img
                src={news.image}
                alt={news.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <Badge className="bg-white/90 text-[#00C853] hover:bg-white border-none backdrop-blur-md px-4 py-1.5 rounded-full font-bold shadow-lg">
                  {news.category}
                </Badge>
              </div>
            </div>

            <div className="p-8 bg-white">
              <div className="flex items-center gap-4 mb-4 text-slate-400 text-xs font-semibold uppercase tracking-widest">
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-[#00C853]" />
                  {new Date(news.createdAt).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1.5">
                  <Tag size={14} className="text-[#00C853]" />
                  {news.id.split("-")[0]}
                </div>
              </div>

              <DialogHeader className="mb-4">
                <DialogTitle className="text-2xl font-extrabold text-slate-900 leading-tight">
                  {news.title}
                </DialogTitle>
              </DialogHeader>

              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00C853]/20 rounded-full" />
                <p className="pl-6 text-slate-600 leading-relaxed text-sm">
                  {news.description}
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
