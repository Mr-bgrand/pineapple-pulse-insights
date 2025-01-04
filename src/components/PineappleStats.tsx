import { Card } from "@/components/ui/card";
import { Pineapple } from "@/lib/pineapple-utils";

interface PineappleStatsProps {
  pineapples: Pineapple[];
}

export function PineappleStats({ pineapples }: PineappleStatsProps) {
  const active = pineapples.filter(p => p.status === "active").length;
  const detonated = pineapples.filter(p => p.status === "detonated").length;
  const total = pineapples.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card className="p-4 bg-dashboard-card border-none">
        <div className="text-sm text-gray-400">Active Pineapples</div>
        <div className="text-2xl font-bold text-white">{active}</div>
      </Card>
      
      <Card className="p-4 bg-dashboard-card border-none">
        <div className="text-sm text-gray-400">Detonated</div>
        <div className="text-2xl font-bold text-white">{detonated}</div>
      </Card>
      
      <Card className="p-4 bg-dashboard-card border-none">
        <div className="text-sm text-gray-400">Total Tracked</div>
        <div className="text-2xl font-bold text-white">{total}</div>
      </Card>
    </div>
  );
}