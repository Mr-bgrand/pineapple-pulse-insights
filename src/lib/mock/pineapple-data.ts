import { Pineapple } from "../types/pineapple";

export const MOCK_PINEAPPLES: Pineapple[] = [
  { 
    name: "Yellow Pineapple", 
    color: "Yellow", 
    inscriptionId: "794673820000", 
    status: "inactive", 
    rechargePeriod: 6,
    activatedBlock: null 
  },
  { 
    name: "White Pineapple", 
    color: "White", 
    inscriptionId: "794673810000", 
    status: "detonated", 
    rechargePeriod: 5,
    activatedBlock: 100000,
    detonationBlock: 100050,
    lastChild: {
      inscriptionId: "794679990000",
      timestamp: new Date().toISOString(),
      contentUrl: "https://ordiscan.com/content/794679990000"
    }
  },
  { 
    name: "Red Pineapple", 
    color: "Red", 
    inscriptionId: "794673800000", 
    status: "inactive", 
    rechargePeriod: 7,
    activatedBlock: null 
  },
  { 
    name: "Green Pineapple", 
    color: "Green", 
    inscriptionId: "794673790000", 
    status: "inactive", 
    rechargePeriod: 7,
    activatedBlock: null 
  },
  { 
    name: "Blue Pineapple", 
    color: "Blue", 
    inscriptionId: "794673780000", 
    status: "inactive", 
    rechargePeriod: 7,
    activatedBlock: null 
  },
  { 
    name: "Black Pineapple", 
    color: "Black", 
    inscriptionId: "794673770000", 
    status: "inactive", 
    rechargePeriod: 6,
    activatedBlock: null 
  }
];