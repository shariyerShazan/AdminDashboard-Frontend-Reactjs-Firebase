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
import { ImagePlus, Plus, X } from "lucide-react";

export function NewsDialog() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection via browse
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Drag and Drop handlers
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      image: file,
    };
    console.log("Submitting Data:", data);
    // Add your API call here
  };

  return (
    <Dialog>
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
            <Select name="category" defaultValue="football">
              <SelectTrigger className="h-11 w-full rounded-xl border-slate-200 bg-slate-50/30 px-4 text-sm focus:ring-1 focus:ring-[#00C853]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="rounded-xl shadow-lg">
                <SelectItem value="football">Football</SelectItem>
                <SelectItem value="tennis">Tennis</SelectItem>
                <SelectItem value="basketball">Basketball</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 ml-0.5">
              Upload Image
            </label>

            {/* Hidden Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
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
                      className="h-20 w-28 object-cover rounded-lg shadow-md border border-white"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg opacity-0 group-hover/img:opacity-100 transition-opacity"
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
                    <ImagePlus
                      className="h-6 w-6 text-slate-600"
                      strokeWidth={2}
                    />
                  </div>
                  <p className="text-sm text-slate-600 font-medium text-center">
                    Drop Image or{" "}
                    <span className="text-[#00C853] font-semibold underline underline-offset-2">
                      Browse here
                    </span>
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1.5 uppercase tracking-wider font-semibold">
                    JPEG, PNG, WebP • Max 40MB
                  </p>
                </>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full cursor-pointer bg-[#00C853] hover:bg-[#00b049] text-white h-12 rounded-xl text-sm font-bold shadow-md shadow-green-100/50 mt-2 transition-all active:scale-[0.98]"
          >
            Create News
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
