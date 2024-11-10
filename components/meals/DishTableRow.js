// DishTableRow.js
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, SquarePen, Trash2 } from "lucide-react";
import IconMenu from "@/components/icon-menu";
import { TableCell, TableRow } from "../ui/table";

const DishTableRow = ({ dish, handleOpenDialog, index }) => (
  <TableRow key={dish.id}>
    <TableCell>{index}</TableCell>
    <TableCell>{dish.name}</TableCell>
    <TableCell>
      <img className="w-20 h-20" src={dish.imgUrl} alt={dish.name} />
    </TableCell>
    <TableCell>{dish.price}</TableCell>
    <TableCell>{dish.category}</TableCell>
    <TableCell>{dish.calories}</TableCell>
    <TableCell>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40 z-50">
          <DropdownMenuItem className="group flex w-full items-center justify-between text-left p-0 text-sm">
            <button
              onClick={() => handleOpenDialog("edit", dish)}
              className="w-full justify-start flex rounded-md p-2 transition-all duration-75"
            >
              <IconMenu
                text={"Edit"}
                icon={<SquarePen className="w-4 h-4" />}
              />
            </button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="group flex w-full items-center justify-between text-left p-0 text-sm">
            <button
              onClick={() => handleOpenDialog("delete", dish)}
              className="w-full justify-start flex rounded-md p-2 transition-all duration-75"
            >
              <IconMenu text={"Delete"} icon={<Trash2 className="w-4 h-4" />} />
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>
  </TableRow>
);

export default DishTableRow;
