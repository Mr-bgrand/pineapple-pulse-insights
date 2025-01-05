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