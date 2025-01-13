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
  cooldownBlock?: number;
  status: "active" | "inactive" | "error" | "detonated";
  rechargePeriod: number;
  color: string;
  lastChild?: PineappleChild;
}