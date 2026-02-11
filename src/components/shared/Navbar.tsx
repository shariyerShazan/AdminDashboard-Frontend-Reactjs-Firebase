import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Navbar() {
  return (
    <header className="flex h-24 items-center justify-between px-8 bg-[#121212] border-b border-white/5 text-white rounded-b-[40px] shadow-2xl">
      <h1 className="text-2xl pl-8 sm:pl-0 font-bold tracking-tight">Dashboard</h1>

      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-bold">Malina Gates</p>
          <p className="text-xs text-gray-400">Admin</p>
        </div>
        <Avatar className="h-12 w-12 border-2 border-white/10 transition-transform cursor-pointer hover:scale-105">
          <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" />
          <AvatarFallback className="bg-slate-800">MG</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
