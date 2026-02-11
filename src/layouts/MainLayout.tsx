import { useState } from "react";
import { Sidebar, SidebarContent } from "@/components/shared/Sidebar";
import { Navbar } from "@/components/shared/Navbar";
import { Outlet } from "react-router";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const MainLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-[#0F0F0F] overflow-hidden font-sans">
      {/* Sidebar - Desktop */}
      <Sidebar />

      {/* Main Container */}
      <div className="flex flex-1 flex-col bg-gray-50 md:ml-64 overflow-hidden relative transition-all duration-300">
        {/* Mobile Burger (Absolute positioned to not break Navbar rounded design) */}
        <div className="md:hidden absolute left-6 top-8 z-50">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-black cursor-pointer bg-white "
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="p-0 bg-[#0F0F0F] border-none w-72"
            >
              <SidebarContent setOpen={setOpen} />
            </SheetContent>
          </Sheet>
        </div>

        {/* The Rounded Navbar */}
        <div className="sticky mx-0 sm:mx-6 sm:rounded-b-2xl top-0 z-40 bg-[#0F0F0F]">
          <Navbar />
        </div>

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 md:p-10 max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
