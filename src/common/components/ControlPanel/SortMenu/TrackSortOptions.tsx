import { SortModes } from "../../../../store/settings/types";
import { MenuItem, Typography } from "@mui/material";
import React from "react";

export interface ITrackSortOptionsProps {
  handleSort: (mode: SortModes) => void;
}

export const TrackSortOptions: React.FC<ITrackSortOptionsProps> = ({
  handleSort,
}) => {
  return (
    <>
      <MenuItem onClick={() => handleSort(SortModes.dateIn)}>
        <Typography>{SortModes.dateIn}</Typography>
      </MenuItem>
      <MenuItem onClick={() => handleSort(SortModes.dateOut)}>
        <Typography>{SortModes.dateOut}</Typography>
      </MenuItem>
      <MenuItem onClick={() => handleSort(SortModes.takerName)}>
        <Typography>{SortModes.takerName}</Typography>
      </MenuItem>
    </>
  );
};
