import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export default function LinksTable() {
  const links = [];

  return (
    <div className="w-full sm:p-4">
      <h2 className="p-4">All links</h2>
      <div className="rounded-md sm:border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-medium">Name</TableHead>
              <TableHead className="font-medium">Link</TableHead>
              <TableHead className="font-medium">Views</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {links
              ? links.map((link) => (
                  <TableRow key={link.id}>
                    <TableCell>{link.name}</TableCell>
                    <TableCell>{link.id}</TableCell>
                    <TableCell>{link.viewCount}</TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
