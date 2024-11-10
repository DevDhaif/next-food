"use client";
import { useState, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import useRealtimeDishCount from "@/lib/hooks/useRealtimeDishCount";
import usePaginatedDishes from "@/lib/hooks/usePaginatedDishes";
import Pagination from "@/components/Pagination";
import DishDialog from "@/components/meals/DishDialog";
import DishTableRow from "@/components/meals/DishTableRow";
import SearchBar from "@/components/meals/SearchBar";
import useDialogState from "@/lib/hooks/useDialogStatus";
function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const { dialogState, handleOpenDialog, handleCloseDialog } = useDialogState();

  const {
    dishes,
    isLoading,
    handleNextPage,
    handlePrevPage,
    handlePageClick,
    currentPage,
    totalPages,
    addDish,
    updateDishInState,
    removeDishInState,
  } = usePaginatedDishes(searchQuery);

  const handleAddDishSuccess = useCallback(
    (newDish) => {
      addDish(newDish);
      handleCloseDialog();
    },
    [addDish, handleCloseDialog]
  );
  const handleEditDishSuccess = useCallback(
    (updatedDish) => {
      updateDishInState(updatedDish); // This will update the dish in the state
      handleCloseDialog(); // Close the edit dialog
    },
    [updateDishInState, handleCloseDialog]
  );
  const handleDeleteDishSuccess = useCallback(
    (dishId) => {
      removeDishInState(dishId); // Update the state by removing the dish
      handleCloseDialog();
    },
    [removeDishInState, handleCloseDialog]
  );

  const dishCount = useRealtimeDishCount();

  return (
    <div className="">
      <p className="text-3xl">{dishCount}</p>
      <div className="my-4">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>
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
                  dishes.map((dish, index) => (
                    <DishTableRow
                      index={index + 1}
                      key={dish.id}
                      dish={dish}
                      handleOpenDialog={handleOpenDialog}
                    />
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
        <DishDialog
          dialogState={dialogState}
          handleCloseDialog={handleCloseDialog}
          handleAddDishSuccess={handleAddDishSuccess}
          handleEditDishSuccess={handleEditDishSuccess}
          handleDeleteDishSuccess={handleDeleteDishSuccess}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageClick={handlePageClick}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
        />
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
