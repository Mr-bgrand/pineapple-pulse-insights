import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pineapple } from "@/lib/pineapple-utils";
import { calculateTimeRemaining } from "@/lib/utils/status-utils";

interface PineappleTableProps {
  pineapples: Pineapple[];
}

export function PineappleTable({ pineapples }: PineappleTableProps) {
  // Get current block from window object (set by PineappleTracker)
  const currentBlock = (window as any).currentBlock || 0;
  
  const formatBlockAndTime = (block: number | null, currentBlock: number) => {
    if (!block) return "N/A";
    const timeRemaining = calculateTimeRemaining(block, currentBlock);
    return `${block} (Est. ${timeRemaining})`;
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Inscription ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Activated Block</TableHead>
            <TableHead>Lotion Deadline</TableHead>
            <TableHead>Cooldown</TableHead>
            <TableHead>Detonation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(pineapples) && pineapples.length > 0 ? (
            pineapples.map((pineapple) => (
              <TableRow key={pineapple.inscriptionId}>
                <TableCell className="font-medium">{pineapple.name}</TableCell>
                <TableCell className="font-mono text-sm">
                  {pineapple.inscriptionId}
                </TableCell>
                <TableCell className="capitalize">{pineapple.status}</TableCell>
                <TableCell>{pineapple.activatedBlock || "N/A"}</TableCell>
                <TableCell>
                  {formatBlockAndTime(pineapple.lotionDeadlineBlock, currentBlock)}
                </TableCell>
                <TableCell>
                  {formatBlockAndTime(pineapple.cooldown, currentBlock)}
                </TableCell>
                <TableCell>
                  {formatBlockAndTime(pineapple.detonationBlock, currentBlock)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No pineapple data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}