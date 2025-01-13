import { Card } from "@/components/ui/card";
import { Pineapple } from "@/lib/types/pineapple";
import { getStatusColor } from "@/lib/utils/status-utils";
import { Clock, Activity, Zap, Timer } from "lucide-react";

interface PineappleCardProps {
  pineapple: Pineapple;
  currentBlock: number;
}

export function PineappleCard({ pineapple, currentBlock }: PineappleCardProps) {
  const statusColor = getStatusColor(pineapple.status);

  return (
    <Card className="p-6 bg-dashboard-card border-none shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{pineapple.name}</h3>
        <div className={`h-3 w-3 rounded-full ${statusColor} animate-pulse`} />
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-gray-400">
          <Activity className="h-4 w-4" />
          <span className="capitalize">{pineapple.status}</span>
        </div>
        
        {pineapple.activatedBlock && (
          <div className="flex items-center space-x-2 text-gray-400">
            <Clock className="h-4 w-4" />
            <span>Block {pineapple.activatedBlock}</span>
          </div>
        )}

        {pineapple.lotionDeadlineBlock && (
          <div className="flex items-center space-x-2 text-gray-400">
            <Timer className="h-4 w-4" />
            <span>Lotion Deadline: {pineapple.lotionDeadlineBlock}</span>
          </div>
        )}
        
        {pineapple.lastChild && (
          <div className="mt-2 p-2 bg-dashboard-bg rounded-lg">
            <div className="flex items-center space-x-2 text-gray-400">
              <Zap className="h-4 w-4" />
              <span className="text-xs">Last Child: {pineapple.lastChild.inscriptionId}</span>
            </div>
          </div>
        )}
        
        {pineapple.detonationBlock && currentBlock < pineapple.detonationBlock && (
          <div className="mt-4 p-2 bg-dashboard-bg rounded-lg">
            <div className="text-xs text-gray-400">Time until detonation</div>
            <div className="text-lg font-mono text-white">
              {Math.max(0, pineapple.detonationBlock - currentBlock)} blocks
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}