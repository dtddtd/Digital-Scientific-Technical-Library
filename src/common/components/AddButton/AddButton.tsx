import React from "react";
import { IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export interface IAddButtonProps {
  onClick: () => void;
}

export const AddButton: React.FC<IAddButtonProps> = ({ onClick }) => {
  return (
    <IconButton
      sx={{
        position: "fixed",
        right: 0,
        bottom: 0,
        margin: 6,
      }}
      color="success"
      size="large"
      component="span"
      onClick={onClick}
    >
      <AddCircleIcon sx={{ fontSize: 60 }} />
    </IconButton>
  );
};
