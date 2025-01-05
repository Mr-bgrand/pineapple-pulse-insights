import { toast } from "sonner";

export interface Pineapple {
  name: string;
  inscriptionId: string;
  activatedBlock?: number | null;
  detonationBlock?: number;
  lotionDeadlineBlock?: number;
  status: "active" | "inactive" | "error" | "detonated";
  rechargePeriod: number;
  color: string;
}

const MOCK_PINEAPPLES: Pineapple[] = [
  { 
    name: "Yellow Pineapple", 
    color: "Yellow", 
    inscriptionId: "79467382", 
    status: "inactive", 
    rechargePeriod: 6,
    activatedBlock: null 
  },
  { 
    name: "White Pineapple", 
    color: "White", 
    inscriptionId: "79467381", 
    status: "inactive", 
    rechargePeriod: 5,
    activatedBlock: null 
  },
  { 
    name: "Red Pineapple", 
    color: "Red", 
    inscriptionId: "79467380", 
    status: "inactive", 
    rechargePeriod: 7,
    activatedBlock: null 
  },
  { 
    name: "Green Pineapple", 
    color: "Green", 
    inscriptionId: "79467379", 
    status: "inactive", 
    rechargePeriod: 7,
    activatedBlock: null 
  },
  { 
    name: "Blue Pineapple", 
    color: "Blue", 
    inscriptionId: "79467378", 
    status: "inactive", 
    rechargePeriod: 7,
    activatedBlock: null 
  },
  { 
    name: "Black Pineapple", 
    color: "Black", 
    inscriptionId: "79467377", 
    status: "inactive", 
    rechargePeriod: 6,
    activatedBlock: null 
  }
];

export const fetchPineappleData = async (): Promise<Pineapple[]> => {
  try {
    // In production, replace with actual API call using the API key
    // API Key: 5dcbe0d2-91bd-485c-975b-317c1c2365a4
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