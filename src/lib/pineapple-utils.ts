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
    return await response.json();
  } catch (error) {
    console.error("Error fetching block height:", error);
    throw error;
  }
};

export const fetchPineappleData = async (): Promise<Pineapple[]> => {
  try {
    console.log("Fetching pineapple data...");
    // Return mock data directly
    return MOCK_PINEAPPLES;
  } catch (error) {
    console.error("Error fetching pineapple data:", error);
    toast.error("Failed to fetch pineapple data");
    throw error;
  }
};