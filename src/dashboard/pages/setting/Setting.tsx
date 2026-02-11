// import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import PasswordChange from "./_components/PasswordChnage";

const DashboardSetting = () => {
  return (
    <div className="bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-10 shadow-sm border border-slate-50 min-h-[calc(100vh-140px)]">
      <Tabs defaultValue="profile" className="w-full">
        {/* Responsive TabsList: scrollable on mobile, fixed on desktop */}
        <div className="w-full overflow-x-auto no-scrollbar border-b border-slate-100 mb-8 md:mb-10">
          <TabsList className="bg-transparent w-full justify-start rounded-none h-auto p-0 flex flex-nowrap min-w-max">
            <TabsTrigger
              value="profile"
              className="rounded-none cursor-pointer !border-t-0 !border-x-0 border-b-2 border-transparent data-[state=active]:border-[#00C853] data-[state=active]:bg-transparent data-[state=active]:text-[#00C853] px-4 md:px-8 py-4 text-sm md:text-base font-semibold transition-all whitespace-nowrap"
            >
              Profile Information
            </TabsTrigger>
            <TabsTrigger
              value="password"
              className="rounded-none cursor-pointer !border-t-0 !border-x-0 border-b-2 border-transparent data-[state=active]:border-[#00C853] data-[state=active]:bg-transparent data-[state=active]:text-[#00C853] px-4 md:px-8 py-4 text-sm md:text-base font-semibold transition-all whitespace-nowrap"
            >
              Password Change
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent
          value="profile"
          className="space-y-8 md:space-y-10 animate-in fade-in duration-300 outline-none"
        >
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              Profile Information
            </h2>
            <p className="text-sm md:text-base text-slate-500 mt-1">
              Manage your personal details and keep your contact info up to
              date.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-base md:text-lg font-semibold text-slate-800">
              Profile Picture
            </h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Avatar className="h-20 w-20 md:h-24 md:w-24 border-2 border-slate-100">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>MG</AvatarFallback>
              </Avatar>
              <div className="flex gap-3 w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="flex-1 sm:flex-none rounded-full px-6 border-[#00C853] text-[#00C853] hover:bg-[#F0FAF3] h-10 md:h-11 font-semibold transition-all"
                >
                  Delete
                </Button>
                <Button className="flex-1 sm:flex-none rounded-full cursor-pointer px-6 bg-[#00C853] hover:bg-[#00b049] text-white h-10 md:h-11 font-semibold shadow-md shadow-green-100 transition-all active:scale-95">
                  Update
                </Button>
              </div>
            </div>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 ml-1">
                Name <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Enter your name"
                className="h-12 md:h-14 rounded-xl md:rounded-2xl border-slate-200 bg-slate-50/30 px-4 md:px-6 focus-visible:ring-[#00C853] text-sm md:text-base"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 ml-1">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-12 md:h-14 rounded-xl md:rounded-2xl border-slate-200 bg-slate-50/30 px-4 md:px-6 focus-visible:ring-[#00C853] text-sm md:text-base"
              />
            </div>
          </form>
        </TabsContent>

        <TabsContent value="password" className="outline-none">
          <PasswordChange />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardSetting;
