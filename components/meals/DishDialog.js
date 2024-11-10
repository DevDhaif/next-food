// DishDialog.js
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AddDishForm } from "@/components/meals/AddDishForm";
import { EditDishForm } from "@/components/meals/EditDishForm";
import { DeleteDishForm } from "@/components/meals/DeleteDishForm";

const DishDialog = ({
  dialogState,
  handleCloseDialog,
  handleAddDishSuccess,
  handleEditDishSuccess,
  handleDeleteDishSuccess,
}) => {
  const renderDialogContent = () => {
    switch (dialogState.type) {
      case "add":
        return (
          <AddDishForm
            onClose={handleCloseDialog}
            onSuccess={handleAddDishSuccess}
          />
        );
      case "edit":
        return (
          <EditDishForm
            item={dialogState.selectedItem}
            onClose={handleCloseDialog}
            onSuccess={handleEditDishSuccess}
          />
        );
      case "delete":
        return (
          <DeleteDishForm
            item={dialogState.selectedItem}
            onClose={handleCloseDialog}
            onSuccess={handleDeleteDishSuccess}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ResponsiveDialog
      isOpen={dialogState.open}
      setIsOpen={handleCloseDialog}
      title={
        dialogState.type === "add"
          ? "Add New Dish"
          : dialogState.type === "edit"
          ? "Edit Dish"
          : "Delete Dish"
      }
      description={
        dialogState.type === "delete"
          ? `Are you sure you want to delete "${dialogState.selectedItem?.name}"?`
          : "Enter the details for the dish"
      }
    >
      {renderDialogContent()}
    </ResponsiveDialog>
  );
};

export default DishDialog;
