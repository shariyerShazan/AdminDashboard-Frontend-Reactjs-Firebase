
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { Loader2 } from "lucide-react";
import { useGetProfileQuery } from "@/redux/auth/auth.api";

const DashboardSetting = () => {
  const { data, isLoading } = useGetProfileQuery();
  const user = data?.data;

  return (
    <div className="bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-10 shadow-sm border border-slate-50 min-h-[calc(100vh-140px)]">
      <Tabs defaultValue="profile" className="w-full">
        <div className="w-full overflow-x-auto no-scrollbar border-b border-slate-100 mb-8 md:mb-10">
          <TabsList className="bg-transparent w-full justify-start rounded-none h-auto p-0 flex flex-nowrap min-w-max">
            <TabsTrigger
              value="profile"
              className="rounded-none cursor-pointer !border-t-0 !border-x-0 border-b-2 border-transparent data-[state=active]:border-[#00C853] data-[state=active]:bg-transparent data-[state=active]:text-[#00C853] px-4 md:px-8 py-4 text-sm md:text-base font-semibold transition-all whitespace-nowrap"
            >
              Profile Information
            </TabsTrigger>

            {/* Tab Two Commented Out 
            <TabsTrigger
              value="password"
              className="rounded-none cursor-pointer !border-t-0 !border-x-0 border-b-2 border-transparent data-[state=active]:border-[#00C853] data-[state=active]:bg-transparent data-[state=active]:text-[#00C853] px-4 md:px-8 py-4 text-sm md:text-base font-semibold transition-all whitespace-nowrap"
            >
              Password Change
            </TabsTrigger> 
            */}
          </TabsList>
        </div>

        <TabsContent
          value="profile"
          className="space-y-8 md:space-y-10 animate-in fade-in duration-300 outline-none"
        >
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-[#00C853]" />
            </div>
          ) : (
            <>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                  Profile Information
                </h2>
                <p className="text-sm md:text-base text-slate-500 mt-1">
                  View your personal details and account settings.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-base md:text-lg font-semibold text-slate-800">
                  Profile Picture
                </h3>
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20 md:h-24 md:w-24 border-2 border-slate-100 shadow-sm">
                    <AvatarImage
                      src={
                        user?.profileImageUrl ||
                        `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`
                      }
                    />
                    <AvatarFallback className="bg-slate-100 text-[#00C853] font-bold text-xl">
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-700">
                      {user?.role} Account
                    </span>
                    <span className="text-xs text-slate-400 uppercase tracking-widest mt-0.5">
                      Verified Profile
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 ml-1">
                    Name
                  </label>
                  <Input
                    readOnly
                    value={user?.name || ""}
                    className="h-12 md:h-14 rounded-xl md:rounded-2xl border-slate-200 bg-slate-50/50 px-4 md:px-6 text-slate-600 focus-visible:ring-0 cursor-default"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 ml-1">
                    Email
                  </label>
                  <Input
                    readOnly
                    value={user?.email || ""}
                    className="h-12 md:h-14 rounded-xl md:rounded-2xl border-slate-200 bg-slate-50/50 px-4 md:px-6 text-slate-600 focus-visible:ring-0 cursor-default"
                  />
                </div>
              </div>
            </>
          )}
        </TabsContent>

        {/* Tab Two Content Commented Out
        <TabsContent value="password" className="outline-none">
          <PasswordChange />
        </TabsContent> 
        */}
      </Tabs>
    </div>
  );
};

export default DashboardSetting;
