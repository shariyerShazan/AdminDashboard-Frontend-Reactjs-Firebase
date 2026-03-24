import { Users, Newspaper, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useGetDashboardStatsQuery } from "@/redux/users/user.api";


export function DashboardStats() {
  const { data, isLoading } = useGetDashboardStatsQuery();

  const stats = [
    {
      label: "Total Users",
      value: data?.totalUser ?? 0,
      icon: <Users className="h-6 w-6 text-slate-600" />,
    },
    {
      label: "Total News",
      value: data?.totalNews ?? 0,
      icon: <Newspaper className="h-6 w-6 text-slate-600" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="border-none shadow-sm rounded-3xl py-4 overflow-hidden relative"
        >
          <CardContent className="flex items-center gap-6 p-6">
            <div className="bg-slate-50 p-4 rounded-full border border-slate-100 z-10">
              {stat.icon}
            </div>
            <div className="z-10">
              <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
              {isLoading ? (
                <Loader2 className="h-9 w-9 animate-spin text-slate-300 mt-1" />
              ) : (
                <p className="text-4xl font-bold text-slate-800 tracking-tight">
                  {stat.value.toLocaleString()}
                </p>
              )}
            </div>
            {/* Subtle decorative background circle */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-slate-50 rounded-full opacity-50" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
