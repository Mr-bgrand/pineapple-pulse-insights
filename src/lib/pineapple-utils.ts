import { toast } from "sonner";
import { Pineapple } from "./types/pineapple";
import { MOCK_PINEAPPLES } from "./mock/pineapple-data";
import { fetchInscriptionDetails, fetchChildInscriptions } from "./api/ordiscan";
export * from "./types/pineapple";
export * from "./utils/status-utils";

export const fetchPineappleData = async (): Promise<Pineapple[]> => {
  try {
    const pineapples = [...MOCK_PINEAPPLES];
    
    for (const pineapple of pineapples) {
      const inscriptionDetails = await fetchInscriptionDetails(pineapple.inscriptionId);
      
      if (inscriptionDetails) {
        if (inscriptionDetails.genesis_timestamp) {
          const blockHeight = inscriptionDetails.genesis_height;
          
          if (blockHeight) {
            pineapple.activatedBlock = blockHeight;
            pineapple.status = "active";
            pineapple.detonationBlock = blockHeight + 144;
          }
        }
        
        if (pineapple.status === "detonated") {
          const children = await fetchChildInscriptions(pineapple.inscriptionId);
          if (children.length > 0) {
            pineapple.lastChild = children[children.length - 1];
          }
        }
      }
    }
    
    return pineapples;
  } catch (error) {
    console.error("Error fetching pineapple data:", error);
    toast.error("Failed to fetch pineapple data");
    return MOCK_PINEAPPLES;
  }
};