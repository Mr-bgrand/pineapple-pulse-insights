
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
    status: "active", 
    rechargePeriod: 5,
    activatedBlock: 882823,
    detonationBlock: 882895,  // 882823 + 72
    lotionDeadlineBlock: 882861, // 882823 + 38
    cooldownBlock: 882878, // 882823 + 55
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
    lotionDeadlineBlock: 878327, // 878289 + 38
    cooldownBlock: 878344, // example cooldown block
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
    lotionDeadlineBlock: 878096, // 878058 + 38
    cooldownBlock: 878113, // example cooldown block
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
    lotionDeadlineBlock: 877899, // 877861 + 38
    cooldownBlock: 877916, // example cooldown block
    lastChild: {
      inscriptionId: "79468003",
      timestamp: new Date().toISOString(),
      contentUrl: "https://ordiscan.com/content/79468003"
    }
  }
];
