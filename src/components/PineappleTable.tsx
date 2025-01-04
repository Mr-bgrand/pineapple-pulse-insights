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
          {pineapples.map((pineapple) => (
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
}