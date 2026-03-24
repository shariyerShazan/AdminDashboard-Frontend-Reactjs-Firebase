import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImagePlus, Plus, X, Loader2 } from "lucide-react";
import { useCreateNewsMutation, type NewsCategory } from "@/redux/news/news.api";
import { toast } from "react-toastify";


export function NewsDialog() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [createNews, { isLoading }] = useCreateNewsMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return toast.error("Please upload an image");

    const formData = new FormData(e.currentTarget);
    const payload = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as NewsCategory,
      file: file,
    };

    try {
      await createNews(payload).unwrap();
      toast.success("News created successfully!");
      setOpen(false);
      setFile(null);
    } catch (error) {
      console.log(error)
      toast.error("Failed to create news");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#00C853] hover:bg-[#00b049] cursor-pointer text-white rounded-full px-5 py-2.5 h-auto font-semibold flex items-center gap-2 transition-all active:scale-95 shadow-sm">
          <Plus size={18} strokeWidth={2.5} />
          Create New
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[540px] p-8 rounded-[24px] border border-slate-100 shadow-xl bg-white gap-0">
        <DialogHeader className="mb-8">
          <DialogTitle className="text-2xl font-bold text-slate-900 tracking-tight">
            Create News
          </DialogTitle>
          <p className="text-sm text-slate-500 mt-1">
            Fill in the details for your new post.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            name="title"
            placeholder="Enter your title"
            className="h-11 rounded-xl border-slate-200 bg-slate-50/30 px-4 text-sm focus-visible:ring-1 focus-visible:ring-[#00C853]"
            required
          />

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 ml-0.5">
              Description
            </label>
            <Textarea
              name="description"
              placeholder="Enter your description"
              className="min-h-[120px] rounded-xl border-slate-200 bg-slate-50/30 px-4 py-3 text-sm focus-visible:ring-1 focus-visible:ring-[#00C853] resize-none"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 ml-0.5">
              Category <span className="text-red-500">*</span>
            </label>
            <Select name="category" defaultValue="FOOTBALL">
              <SelectTrigger className="h-11 w-full rounded-xl border-slate-200 bg-slate-50/30 px-4 text-sm focus:ring-1 focus:ring-[#00C853]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="rounded-xl shadow-lg">
                <SelectItem value="FOOTBALL">Football</SelectItem>
                <SelectItem value="TENNIS">Tennis</SelectItem>
                <SelectItem value="BASKETBALL">Basketball</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 ml-0.5">
              Upload Image
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <div
              onDragOver={onDragOver}
              onDragLeave={() => setIsDragging(false)}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`group border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-all cursor-pointer ${
                isDragging
                  ? "border-[#00C853] bg-[#F0FAF3]"
                  : "border-slate-200 bg-slate-50/50 hover:bg-[#F0FAF3] hover:border-[#00C853]/40"
              }`}
            >
              {file ? (
                <div className="flex flex-col items-center">
                  <div className="relative group/img">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Preview"
                      className="h-24 w-36 object-cover rounded-lg shadow-md border border-white"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg opacity-100 transition-opacity"
                    >
                      <X size={12} />
                    </button>
                  </div>
                  <p className="mt-2 text-xs font-semibold text-slate-600 truncate max-w-[200px]">
                    {file.name}
                  </p>
                </div>
              ) : (
                <>
                  <div className="bg-white p-3 rounded-xl shadow-sm mb-3">
                    <ImagePlus className="h-6 w-6 text-slate-600" />
                  </div>
                  <p className="text-sm text-slate-600 font-medium text-center">
                    Drop Image or{" "}
                    <span className="text-[#00C853] font-semibold underline underline-offset-2">
                      Browse here
                    </span>
                  </p>
                </>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full cursor-pointer bg-[#00C853] hover:bg-[#00b049] text-white h-12 rounded-xl text-sm font-bold shadow-md mt-2 transition-all active:scale-[0.98]"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Create News"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
