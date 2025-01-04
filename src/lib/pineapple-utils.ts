import { toast } from "sonner";

export interface Pineapple {
  name: string;
  inscriptionId: string;
  activatedBlock?: number;
  detonationBlock?: number;
  lotionDeadlineBlock?: number;
  status: "active" | "inactive" | "error" | "detonated";
}

const MOCK_PINEAPPLES: Pineapple[] = [
  { name: "White Pineapple", inscriptionId: "INSCRIPTION_ID_1", status: "inactive" },
  { name: "Blue Pineapple", inscriptionId: "INSCRIPTION_ID_2", status: "active" },
  { name: "Green Pineapple", inscriptionId: "INSCRIPTION_ID_3", status: "inactive" },
  { name: "Yellow Pineapple", inscriptionId: "INSCRIPTION_ID_4", status: "active" },
  { name: "Red Pineapple", inscriptionId: "INSCRIPTION_ID_5", status: "inactive" },
  { name: "Black Pineapple", inscriptionId: "INSCRIPTION_ID_6", status: "detonated" },
];

export const fetchPineappleData = async (): Promise<Pineapple[]> => {
  try {
    // In production, replace with actual API call
    const mockApiCall = () => new Promise((resolve) => setTimeout(() => resolve(MOCK_PINEAPPLES), 1000));
    const pineapples = await mockApiCall();
    return pineapples as Pineapple[];
  } catch (error) {
    console.error("Error fetching pineapple data:", error);
    toast.error("Failed to fetch pineapple data");
    return [];
  }
};

export const getStatusColor = (status: Pineapple["status"]) => {
  switch (status) {
    case "active":
      return "bg-pineapple-active";
    case "inactive":
      return "bg-pineapple-inactive";
    case "detonated":
      return "bg-pineapple-danger";
    default:
      return "bg-pineapple-warning";
  }
};

export const calculateTimeRemaining = (targetBlock: number, currentBlock: number) => {
  const blocksRemaining = targetBlock - currentBlock;
  const hours = Math.floor(blocksRemaining / 6);
  const minutes = Math.floor((blocksRemaining % 6) * 10);
  return `${hours}h ${minutes}m`;
};