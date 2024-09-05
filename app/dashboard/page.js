"use client";
import { useEffect, useState } from "react";
import useFetchDishes from "@/lib/hooks/useFetchDishes";
import useFetchDishCount from "@/lib/hooks/useFetchDishesCount";
import { PAGE_SIZE } from "@/lib/constants";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, SquarePen, Trash2 } from "lucide-react";
import IconMenu from "@/components/icon-menu";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { EditDishForm } from "@/components/meals/EditDishForm";
function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const { dishes, isLoading, error } = useFetchDishes(currentPage);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const {
    count,
    isLoading: loadCount,
    error: errorCount,
  } = useFetchDishCount();

  const totalPages = Math.ceil(count / PAGE_SIZE);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  useEffect(() => {
    setFilteredDishes(dishes);
  }, [dishes]);

  useEffect(() => {
    const filtered = dishes.filter(
      (dish) =>
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDishes(filtered);
  }, [searchQuery, dishes]);

  const renderPageNumbers = () => {
    let pages = [];
    if (totalPages > 1) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            style={{
              margin: "0 5px",
              padding: "5px 10px",
              background: currentPage === i ? "#ccc" : "#fff",
            }}
          >
            {i}
          </button>
        );
      }
    }
    return pages;
  };

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setEditDialogOpen(true);
  };
  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setDeleteDialogOpen(true);
  };
  return (
    <div>
      {loadCount ? "..." : <p> Total Dishes: {count}</p>}
      <div>
        <div className="my-4">
          <input
            type="text"
            placeholder="Search by name or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 border rounded-md max-w-sm"
          />
        </div>
        <div>
          <Table className="text-left min-w-full bg-white min-h-60">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Photo</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Calories</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {filteredDishes.length > 0 ? (
                    filteredDishes.map((item) => (
                      <TableRow key={item.id} className="">
                        <TableCell>{item.name}</TableCell>
                        <TableCell>
                          <img
                            className="w-20 h-20"
                            src={item.imgUrl}
                            alt={item.name}
                          />
                        </TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.calories}</TableCell>
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
                            <DropdownMenuContent
                              align="end"
                              className="w-40 z-50"
                            >
                              <DropdownMenuItem className="group flex w-full items-center justify-between text-left p-0 text-sm">
                                <button
                                  onClick={() => handleEditClick(item)}
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
                                  onClick={() => handleDeleteClick(item)}
                                  className="w-full justify-start flex rounded-md p-2 transition-all duration-75"
                                >
                                  <IconMenu
                                    text={"Delete"}
                                    icon={<Trash2 className="w-4 h-4" />}
                                  />
                                </button>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center">
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </>
              )}
            </TableBody>
          </Table>
          <ResponsiveDialog
            isOpen={isEditDialogOpen}
            setIsOpen={setEditDialogOpen}
            title={"edit item"}
            description={"Edit this item as you wish"}
          >
            <EditDishForm
              item={selectedItem}
              onClose={() => setEditDialogOpen(false)}
            />
          </ResponsiveDialog>
          <ResponsiveDialog
            isOpen={isDeleteDialogOpen}
            setIsOpen={setDeleteDialogOpen}
            title={"delete item"}
            description={"Are you sure you want to delete this item?"}
          >
            DELETE {selectedItem?.name}
            DELETE {selectedItem?.price}
          </ResponsiveDialog>
        </div>
        {totalPages > 1 && (
          <div className="bg-white text-black">
            <button
              className="disabled:text-gray-600 px-2 py-1 border my-2 disabled:bg-slate-400/50"
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {renderPageNumbers()}
            <button
              className="disabled:text-gray-600 px-2 py-1 border my-2 disabled:bg-slate-400/50"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
