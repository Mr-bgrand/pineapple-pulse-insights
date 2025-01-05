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
  const blocksRemaining = targetBlock - currentBlock;
  const hours = Math.floor(blocksRemaining / 6);
  const minutes = Math.floor((blocksRemaining % 6) * 10);
  return `${hours}h ${minutes}m`;
};