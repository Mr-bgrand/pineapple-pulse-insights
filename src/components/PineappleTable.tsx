import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pineapple } from "@/lib/pineapple-utils";
import { 
  calculateTimeRemaining, 
  calculateLotionTimeRemaining,
  calculateCooldownTimeRemaining 
} from "@/lib/utils/status-utils";

interface PineappleTableProps {
  pineapples: Pineapple[];
}

export function PineappleTable({ pineapples }: PineappleTableProps) {
  const currentBlock = (window as any).currentBlock || 0;
  
  const formatBlockAndTime = (block: number | null, currentBlock: number) => {
    if (!block) return "N/A";
    const timeRemaining = calculateTimeRemaining(block, currentBlock);
    return `${block} (${timeRemaining})`;
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
                  {pineapple.activatedBlock ? (
                    pineapple.lotionDeadlineBlock ? (
                      <>
                        {pineapple.lotionDeadlineBlock}
                        <span className="ml-2 text-sm text-gray-400">
                          ({calculateLotionTimeRemaining(pineapple.activatedBlock, pineapple.lotionDeadlineBlock, currentBlock)})
                        </span>
                      </>
                    ) : "N/A"
                  ) : "N/A"}
                </TableCell>
                <TableCell>
                  {pineapple.cooldownBlock ? (
                    <>
                      {pineapple.cooldownBlock}
                      <span className="ml-2 text-sm text-gray-400">
                        ({calculateCooldownTimeRemaining(pineapple.cooldownBlock, currentBlock)})
                      </span>
                    </>
                  ) : "N/A"}
                </TableCell>
                <TableCell>
                  {pineapple.activatedBlock ? (
                    pineapple.detonationBlock ? (
                      formatBlockAndTime(pineapple.detonationBlock, currentBlock)
                    ) : "N/A"
                  ) : "N/A"}
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