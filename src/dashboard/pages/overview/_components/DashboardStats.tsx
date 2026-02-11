import { Users, Newspaper } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function DashboardStats() {
  const stats = [
    {
      label: "Total Users",
      value: "1,200",
      icon: <Users className="h-6 w-6 text-slate-600" />,
    },
    {
      label: "Total News",
      value: "1,200",
      icon: <Newspaper className="h-6 w-6 text-slate-600" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="border-none shadow-sm rounded-3xl py-4">
          <CardContent className="flex items-center gap-6 p-6">
            <div className="bg-slate-50 p-4 rounded-full border border-slate-100">
              {stat.icon}
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
              <p className="text-4xl font-bold text-slate-800">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
