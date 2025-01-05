import { toast } from "sonner";

export interface PineappleChild {
  inscriptionId: string;
  timestamp: string;
  contentUrl: string;
}

export interface Pineapple {
  name: string;
  inscriptionId: string;
  activatedBlock?: number | null;
  detonationBlock?: number;
  lotionDeadlineBlock?: number;
  status: "active" | "inactive" | "error" | "detonated";
  rechargePeriod: number;
  color: string;
  lastChild?: PineappleChild;
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
    status: "detonated", 
    rechargePeriod: 5,
    activatedBlock: 100000,
    detonationBlock: 100050,
    lastChild: {
      inscriptionId: "79467999",
      timestamp: new Date().toISOString(),
      contentUrl: "https://ordiscan.com/content/79467999"
    }
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

export const fetchChildInscriptions = async (inscriptionId: string): Promise<PineappleChild[]> => {
  try {
    const API_KEY = "5dcbe0d2-91bd-485c-975b-317c1c2365a4";
    const response = await fetch(
      `https://ordiscan.com/api/v1/inscriptions/${inscriptionId}/children`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data.map((child: any) => ({
      inscriptionId: child.inscription_id,
      timestamp: child.timestamp,
      contentUrl: child.content_url,
    }));
  } catch (error) {
    console.error("Error fetching child inscriptions:", error);
    toast.error("Failed to fetch child inscriptions");
    return [];
  }
};

export const fetchPineappleData = async (): Promise<Pineapple[]> => {
  try {
    // In production, replace with actual API call using the API key
    // API Key: 5dcbe0d2-91bd-485c-975b-317c1c2365a4
    const mockApiCall = () => new Promise((resolve) => setTimeout(() => resolve(MOCK_PINEAPPLES), 1000));
    const pineapples = await mockApiCall();
    
    // In production, fetch child inscriptions for each pineapple
    for (const pineapple of pineapples) {
      if (pineapple.status === "detonated") {
        const children = await fetchChildInscriptions(pineapple.inscriptionId);
        if (children.length > 0) {
          pineapple.lastChild = children[children.length - 1];
        }
      }
    }
    
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
