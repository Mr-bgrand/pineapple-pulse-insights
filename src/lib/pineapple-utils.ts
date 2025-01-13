import { toast } from "sonner";
import { Pineapple } from "./types/pineapple";
import { fetchInscriptionDetails, fetchChildInscriptions } from "./api/ordiscan";

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

interface ApiResponse {
  logs: string[];
  pineapples: {
    color: string;
    cooldown_block: number | null;
    cooldown_period: number;
    detonation_block: number | null;
    inscription: string;
    last_activation: number | null;
    lotion_block: number | null;
  }[];
  status: string;
}

export const fetchPineappleData = async (): Promise<Pineapple[]> => {
  try {
    console.log("Fetching pineapple data...");
    const response = await fetch('https://us-central1-pizza-pets.cloudfunctions.net/monitor_pineapples');
    if (!response.ok) {
      throw new Error('Failed to fetch pineapple data');
    }
    
    const data: ApiResponse = await response.json();
    console.log("Received pineapple data:", data);
    
    if (!data.pineapples) {
      console.error("No pineapples array in response");
      return [];
    }

    const pineapples: Pineapple[] = data.pineapples.map(p => ({
      name: p.color + " Pineapple",
      inscriptionId: p.inscription,
      activatedBlock: p.last_activation,
      detonationBlock: p.detonation_block || undefined,
      lotionDeadlineBlock: p.lotion_block || undefined,
      status: p.detonation_block ? "detonated" : p.last_activation ? "active" : "inactive",
      rechargePeriod: p.cooldown_period,
      color: p.color.toLowerCase()
    }));
    
    // Enrich the data with inscription details
    for (const pineapple of pineapples) {
      if (!pineapple.inscriptionId) continue;
      
      console.log(`Fetching details for inscription ${pineapple.inscriptionId}`);
      const inscriptionDetails = await fetchInscriptionDetails(pineapple.inscriptionId);
      
      if (pineapple.status === "detonated") {
        console.log(`Fetching children for detonated pineapple ${pineapple.inscriptionId}`);
        const children = await fetchChildInscriptions(pineapple.inscriptionId);
        if (children.length > 0) {
          pineapple.lastChild = children[children.length - 1];
        }
      }
    }
    
    return pineapples;
  } catch (error) {
    console.error("Error fetching pineapple data:", error);
    toast.error("Failed to fetch pineapple data");
    throw error;
  }
};