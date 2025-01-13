import { Pineapple } from "../types/pineapple";

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
  if (!targetBlock || !currentBlock) return "N/A";
  
  const blocksRemaining = Math.max(0, targetBlock - currentBlock);
  const BLOCKS_PER_DAY = 144; // Average blocks per day
  const BLOCKS_PER_HOUR = 6; // Average blocks per hour
  const MINUTES_PER_BLOCK = 10; // Average minutes per block

  const days = Math.floor(blocksRemaining / BLOCKS_PER_DAY);
  const hours = Math.floor((blocksRemaining % BLOCKS_PER_DAY) / BLOCKS_PER_HOUR);
  const minutes = Math.floor((blocksRemaining % BLOCKS_PER_HOUR) * MINUTES_PER_BLOCK);

  return `${days}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};