import { SortModes } from "../../../../store/settings/types";
import { MenuItem, Typography } from "@mui/material";
import React from "react";

export interface IUsersSortOptionsProps {
  handleSort: (mode: SortModes) => void;
}

export const UsersSortOptions: React.FC<IUsersSortOptionsProps> = ({
  handleSort,
}) => {
  return (
    <>
      <MenuItem onClick={() => handleSort(SortModes.fullName)}>
        <Typography>{SortModes.fullName}</Typography>
      </MenuItem>
      <MenuItem onClick={() => handleSort(SortModes.department)}>
        <Typography>{SortModes.department}</Typography>
      </MenuItem>
      <MenuItem onClick={() => handleSort(SortModes.role)}>
        <Typography>{SortModes.role}</Typography>
      </MenuItem>
    </>
  );
};
