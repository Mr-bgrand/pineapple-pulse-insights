
import { toast } from "sonner";
import { Pineapple } from "./types/pineapple";
import { MOCK_PINEAPPLES } from "./mock/pineapple-data";

export * from "./types/pineapple";
export * from "./utils/status-utils";

export const fetchCurrentBlockHeight = async (): Promise<number> => {
  try {
    const response = await fetch('https://mempool.space/api/blocks/tip/height');
    if (!response.ok) {
      throw new Error('Failed to fetch current block height');
    }
    const height = await response.json();
    console.log("Current block height:", height);
    return height;
  } catch (error) {
    console.error("Error fetching block height:", error);
    throw error;
  }
};

export const fetchPineappleData = async (): Promise<Pineapple[]> => {
  try {
    console.log("Fetching pineapple data...");
    // Get current block height to determine detonation status
    const currentBlock = await fetchCurrentBlockHeight();
    console.log("Current block for pineapple status check:", currentBlock);
    
    // Update pineapple statuses based on current block
    const updatedPineapples = MOCK_PINEAPPLES.map(pineapple => {
      if (pineapple.detonationBlock && currentBlock >= pineapple.detonationBlock) {
        console.log(`Pineapple ${pineapple.name} has detonated at block ${currentBlock}`);
        return {
          ...pineapple,
          status: "detonated" as const
        };
      }
      return pineapple;
    });

    console.log("Updated pineapples:", updatedPineapples);
    return updatedPineapples;
  } catch (error) {
    console.error("Error fetching pineapple data:", error);
    toast.error("Failed to fetch pineapple data");
    throw error;
  }
};
