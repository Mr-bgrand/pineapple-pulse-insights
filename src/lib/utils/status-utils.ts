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

export const calculateLotionTimeRemaining = (activatedBlock: number | null, lotionDeadlineBlock: number | null, currentBlock: number) => {
  if (!activatedBlock || !lotionDeadlineBlock || !currentBlock) return "N/A";
  
  const blocksUntilDeadline = Math.max(0, lotionDeadlineBlock - currentBlock);
  const MINUTES_PER_BLOCK = 10;
  const minutesRemaining = blocksUntilDeadline * MINUTES_PER_BLOCK;
  
  if (minutesRemaining <= 0) return "Expired";
  return `~${minutesRemaining} minutes`;
};

export const calculateCooldownTimeRemaining = (cooldownBlock: number | null, currentBlock: number) => {
  if (!cooldownBlock || !currentBlock) return "N/A";
  
  const blocksRemaining = Math.max(0, cooldownBlock - currentBlock);
  const BLOCKS_PER_DAY = 144; // Average blocks per day
  const BLOCKS_PER_HOUR = 6; // Average blocks per hour

  const days = Math.floor(blocksRemaining / BLOCKS_PER_DAY);
  const hours = Math.floor((blocksRemaining % BLOCKS_PER_DAY) / BLOCKS_PER_HOUR);

  if (blocksRemaining <= 0) return "Ready";
  return `~${days}d:${hours.toString().padStart(2, '0')}h`;
};

export const calculateTimeRemaining = (targetBlock: number, currentBlock: number) => {
  if (!targetBlock || !currentBlock) return "N/A";
  
  const blocksRemaining = Math.max(0, targetBlock - currentBlock);
  const BLOCKS_PER_DAY = 144;
  const BLOCKS_PER_HOUR = 6;
  const MINUTES_PER_BLOCK = 10;

  const days = Math.floor(blocksRemaining / BLOCKS_PER_DAY);
  const hours = Math.floor((blocksRemaining % BLOCKS_PER_DAY) / BLOCKS_PER_HOUR);
  const minutes = Math.floor((blocksRemaining % BLOCKS_PER_HOUR) * MINUTES_PER_BLOCK);

  return `${days}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};