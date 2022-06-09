import { Alert, Snackbar } from "@mui/material";
import React, { SyntheticEvent, useState } from "react";

export interface IToastProps {
  children?: React.ReactNode;
  type: "success" | "error";
  open: boolean;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<IToastProps> = ({
  children,
  type,
  open,
  onClose,
  duration = 5000,
}) => {
  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    onClose();
  };

  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {children}
      </Alert>
    </Snackbar>
  );
};
