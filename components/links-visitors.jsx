import { TableCell, TableRow } from "../components/ui/table";
import { Gauge } from "@/components/ui/gauge";

export default function LinksVisitors(linkId) {
  const visitors = [];

  return (
    <>
      {visitors
        ? visitors.map((visitor) => (
            <TableRow key={visitor.id}>
              <TableCell>{visitor.name}</TableCell>
              <TableCell>{visitor.totalDuration}</TableCell>
              <TableCell>
                <Gauge value={view.completionRate} />
              </TableCell>
            </TableRow>
          ))
        : null}
    </>
  );
}
