"use client";
import { useEffect, useState, useCallback } from "react";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, SquarePen, Trash2 } from "lucide-react";
import IconMenu from "@/components/icon-menu";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { EditDishForm } from "@/components/meals/EditDishForm";
import { DeleteDishForm } from "@/components/meals/DeleteDishForm";
import { AddDishForm } from "@/components/meals/AddDishForm";
import useRealtimeDishCount from "@/lib/hooks/useRealtimeDishCount";
import usePaginatedDishes from "@/lib/hooks/usePaginatedDishes";
import Pagination from "@/components/Pagination";
function Page() {
  //   const [currentPage, setCurrentPage] = useState(1);
  //     const { dishes, isLoading, error, updateDishes, deleteDish } =
  //   useFetchDishes(currentPage);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [dialogState, setDialogState] = useState({
    type: null, // 'add', 'edit', 'delete'
    open: false,
    selectedItem: null,
  });
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const {
    dishes,
    isLoading,
    handleNextPage,
    handlePrevPage,
    handlePageClick,
    currentPage,
    totalPages,
    addDish,
  } = usePaginatedDishes(searchQuery);

  const handleAddDishSuccess = useCallback(
    (newDish) => {
      // Use the hook's addDish function to append the new dish
      addDish(newDish);
      setAddDialogOpen(false); // Close the dialog after success
    },
    [addDish]
  );

  // const handleAddDishSuccess = useCallback(
  //   (newDish) => {
  //     console.log(newDish);
  //     updateDishes(newDish);
  //     // Update the count
  //     incrementCount();

  //     setAddDialogOpen(false);
  //   },
  //   [updateDishes, incrementCount]
  // );
  //   const handleDeleteDishSuccess = useCallback(
  //     async (dishId) => {
  //       const result = await deleteDish(dishId);
  //       if (result.success) {
  //         setFilteredDishes((currentDishes) =>
  //           currentDishes.filter((dish) => dish.id !== dishId)
  //         );
  //         decrementCount();
  //         setDeleteDialogOpen(false);
  //       }
  //     },
  //     [deleteDish, decrementCount]
  //   );

  //   useEffect(() => {
  //     if (!isLoading) {
  //       setFilteredDishes(dishes);
  //     }
  //   }, [dishes, isLoading]);

  //   useEffect(() => {
  //     if (!isLoading) {
  //       const filtered = dishes.filter(
  //         (dish) =>
  //           dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //           dish.category.toLowerCase().includes(searchQuery.toLowerCase())
  //       );
  //       setFilteredDishes(filtered);
  //     }
  //   }, [searchQuery, dishes]);

  const handleAddClick = () => {
    setAddDialogOpen(true);
  };
  const handleEditClick = (item) => {
    setSelectedItem(item);
    setEditDialogOpen(true);
  };
  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setDeleteDialogOpen(true);
  };

  const handleOpenDialog = (type, item = null) => {
    setDialogState({ type, open: true, selectedItem: item });
  };

  const handleCloseDialog = () => {
    setDialogState({ type: null, open: false, selectedItem: null });
  };

  const dishCount = useRealtimeDishCount();

  return (
    <div className="">
      <div className="my-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-2 border rounded-md max-w-sm"
        />
      </div>
      {/* <Button onClick={handleAddClick}>Add New Dish</Button> */}
      <Button onClick={() => handleOpenDialog("add")}>Add New Dish</Button>
      <div>
        <p>Current Page: {currentPage}</p>
        <Table className="text-left min-w-full bg-white min-h-60">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Photo</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Calories</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              <>
                {dishes.length > 0 ? (
                  dishes.map((dish) => (
                    <TableRow key={dish.id}>
                      <TableCell>{dish.name}</TableCell>
                      <TableCell>
                        <img
                          className="w-20 h-20"
                          src={dish.imgUrl}
                          alt={dish.name}
                        />
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
                          <DropdownMenuContent
                            align="end"
                            className="w-40 z-50"
                          >
                            <DropdownMenuItem className="group flex w-full items-center justify-between text-left p-0 text-sm">
                              <button
                                onClick={() => handleEditClick(dish)}
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
                                onClick={() => handleDeleteClick(dish)}
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
                    <TableCell colSpan={6} className="text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
        {/* <ResponsiveDialog
          isOpen={isAddDialogOpen}
          setIsOpen={setAddDialogOpen}
          title="Add New Dish"
          description="Enter the details for the new dish"
        >
          <AddDishForm
            onClose={() => setAddDialogOpen(false)}
            onSuccess={handleAddDishSuccess}
          />
        </ResponsiveDialog>
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
            title="Delete Dish"
            description={`Are you sure you want to delete "${selectedItem?.name}"?`}
          >
            <DeleteDishForm
              item={selectedItem}
              onClose={() => setDeleteDialogOpen(false)}
              onSuccess={handleDeleteDishSuccess}
            />
          </ResponsiveDialog> */}
        <ResponsiveDialog
          isOpen={dialogState.open && dialogState.type === "add"}
          setIsOpen={handleCloseDialog}
          title="Add New Dish"
          description="Enter the details for the new dish"
        >
          <AddDishForm
            onClose={handleCloseDialog}
            onSuccess={handleAddDishSuccess}
          />
        </ResponsiveDialog>

        <ResponsiveDialog
          isOpen={dialogState.open && dialogState.type === "edit"}
          setIsOpen={handleCloseDialog}
          title="Edit Dish"
          description="Edit the details for the dish"
        >
          <EditDishForm
            item={dialogState.selectedItem}
            onClose={handleCloseDialog}
          />
        </ResponsiveDialog>

        <ResponsiveDialog
          isOpen={dialogState.open && dialogState.type === "delete"}
          setIsOpen={handleCloseDialog}
          title="Delete Dish"
          description={`Are you sure you want to delete "${dialogState.selectedItem?.name}"?`}
        >
          <DeleteDishForm
            item={dialogState.selectedItem}
            onClose={handleCloseDialog}
          />
        </ResponsiveDialog>
        {/* <div>
        <div className="my-4">
          <input
            type="text"
            placeholder="Search by name or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 border rounded-md max-w-sm"
          />
          <Button onClick={handleAddClick}>Add New Dish</Button>
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
            title="Delete Dish"
            description={`Are you sure you want to delete "${selectedItem?.name}"?`}
          >
            <DeleteDishForm
              item={selectedItem}
              onClose={() => setDeleteDialogOpen(false)}
              onSuccess={handleDeleteDishSuccess}
            />
          </ResponsiveDialog>
          <ResponsiveDialog
            isOpen={isAddDialogOpen}
            setIsOpen={setAddDialogOpen}
            title="Add New Dish"
            description="Enter the details for the new dish"
          >
            <AddDishForm
              onClose={() => setAddDialogOpen(false)}
              onSuccess={handleAddDishSuccess}
            />
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
      </div> */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageClick={handlePageClick}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
        />
      </div>
    </div>
  );
}

export default Page;
