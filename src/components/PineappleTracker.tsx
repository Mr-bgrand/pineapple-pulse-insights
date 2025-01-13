import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Pineapple, fetchPineappleData, fetchCurrentBlockHeight } from "@/lib/pineapple-utils";
import { PineappleCard } from "./PineappleCard";
import { PineappleStats } from "./PineappleStats";
import { PineappleTable } from "./PineappleTable";
import { PizzaPetsDisplay } from "./PizzaPetsDisplay";
import { Button } from "@/components/ui/button";
import { RefreshCw, Blocks } from "lucide-react";
import { toast } from "sonner";

export function PineappleTracker() {
  const [currentBlock, setCurrentBlock] = useState<number | null>(null);

  const { data: pineapples = [], isLoading, error, refetch } = useQuery({
    queryKey: ["pineapples"],
    queryFn: fetchPineappleData,
    refetchInterval: 30000, // Refetch every 30 seconds
    meta: {
      onSuccess: (data: Pineapple[]) => {
        console.log("Successfully fetched pineapples:", data);
      },
      onError: (err: Error) => {
        console.error("Error fetching pineapples:", err);
        toast.error("Failed to fetch pineapple data");
      }
    }
  });

  // Fetch current block height
  useEffect(() => {
    const fetchBlockHeight = async () => {
      try {
        const height = await fetchCurrentBlockHeight();
        setCurrentBlock(height);
      } catch (error) {
        console.error("Error fetching block height:", error);
        toast.error("Failed to fetch current block height");
      }
    };

    fetchBlockHeight();
    const interval = setInterval(fetchBlockHeight, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  // Set current block in window object for PineappleTable
  useEffect(() => {
    if (currentBlock) {
      (window as any).currentBlock = currentBlock;
    }
  }, [currentBlock]);

  if (error) {
    console.error("Render error:", error);
    return <div className="p-6 text-red-500">Error loading pineapple data</div>;
  }

  return (
    <div className="p-6 min-h-screen bg-dashboard-bg text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Pineapple Tracker</h1>
            <div className="flex items-center mt-2 text-gray-400">
              <Blocks className="h-4 w-4 mr-2" />
              <span>Current Block: {currentBlock ?? "Loading..."}</span>
            </div>
          </div>
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
          <div className="space-y-4">
            <div className="h-48 bg-dashboard-card animate-pulse rounded-lg" />
            <div className="h-64 bg-dashboard-card animate-pulse rounded-lg" />
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Detailed View</h2>
              <PineappleTable pineapples={pineapples} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pineapples.map((pineapple) => (
                <PineappleCard
                  key={pineapple.inscriptionId}
                  pineapple={pineapple}
                  currentBlock={currentBlock ?? 0}
                />
              ))}
            </div>

            <PizzaPetsDisplay />
          </>
        )}
      </div>
    </div>
  );
}
