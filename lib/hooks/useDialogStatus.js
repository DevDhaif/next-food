import { useState, useCallback } from "react";

const useDialogState = () => {
  const [dialogState, setDialogState] = useState({
    type: null,
    open: false,
    selectedItem: null,
  });

  const handleOpenDialog = useCallback((type, item = null) => {
    setDialogState({ type, open: true, selectedItem: item });
  }, []);

  const handleCloseDialog = useCallback(() => {
    setDialogState({ type: null, open: false, selectedItem: null });
  }, []);

  return { dialogState, handleOpenDialog, handleCloseDialog };
};

export default useDialogState;
