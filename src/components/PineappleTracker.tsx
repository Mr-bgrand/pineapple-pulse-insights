import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Pineapple, fetchPineappleData } from "@/lib/pineapple-utils";
import { PineappleCard } from "./PineappleCard";
import { PineappleStats } from "./PineappleStats";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export function PineappleTracker() {
  const [currentBlock, setCurrentBlock] = useState(100000); // Mock current block

  const { data: pineapples = [], isLoading, refetch } = useQuery({
    queryKey: ["pineapples"],
    queryFn: fetchPineappleData,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Simulate block updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBlock(prev => prev + 1);
    }, 10000); // New block every 10 seconds for demo
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 min-h-screen bg-dashboard-bg text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Pineapple Tracker</h1>
          <Button
            onClick={() => refetch()}
            className="bg-dashboard-accent hover:bg-dashboard-accent/90"
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        <PineappleStats pineapples={pineapples} />

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-48 bg-dashboard-card animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pineapples.map((pineapple) => (
              <PineappleCard
                key={pineapple.inscriptionId}
                pineapple={pineapple}
                currentBlock={currentBlock}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}