import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pineapple } from "@/lib/pineapple-utils";

interface PineappleTableProps {
  pineapples: Pineapple[];
}

export function PineappleTable({ pineapples }: PineappleTableProps) {
  console.log("Rendering PineappleTable with data:", pineapples);
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Inscription ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Activated Block</TableHead>
            <TableHead>Detonation Block</TableHead>
            <TableHead>Lotion Deadline</TableHead>
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
                <TableCell>{pineapple.detonationBlock || "N/A"}</TableCell>
                <TableCell>{pineapple.lotionDeadlineBlock || "N/A"}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No pineapple data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}