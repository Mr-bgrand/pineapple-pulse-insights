import { Pineapple } from "../types/pineapple";

export const MOCK_PINEAPPLES: Pineapple[] = [
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
    activatedBlock: 877704,
    detonationBlock: 877776,
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
    status: "detonated", 
    rechargePeriod: 7,
    activatedBlock: 878289,
    detonationBlock: 878361,
    lastChild: {
      inscriptionId: "79468001",
      timestamp: new Date().toISOString(),
      contentUrl: "https://ordiscan.com/content/79468001"
    }
  },
  { 
    name: "Blue Pineapple", 
    color: "Blue", 
    inscriptionId: "79467378", 
    status: "detonated", 
    rechargePeriod: 7,
    activatedBlock: 878058,
    detonationBlock: 878130,
    lastChild: {
      inscriptionId: "79468002",
      timestamp: new Date().toISOString(),
      contentUrl: "https://ordiscan.com/content/79468002"
    }
  },
  { 
    name: "Black Pineapple", 
    color: "Black", 
    inscriptionId: "79467377", 
    status: "detonated", 
    rechargePeriod: 6,
    activatedBlock: 877861,
    detonationBlock: 877933,
    lastChild: {
      inscriptionId: "79468003",
      timestamp: new Date().toISOString(),
      contentUrl: "https://ordiscan.com/content/79468003"
    }
  }
];