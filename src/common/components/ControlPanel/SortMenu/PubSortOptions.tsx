import { SortModes } from "../../../../store/settings/types";
import { MenuItem, Typography } from "@mui/material";
import React from "react";

export interface IPubSortOptionsProps {
  handleSort: (mode: SortModes) => void;
}

export const PubSortOptions: React.FC<IPubSortOptionsProps> = ({
  handleSort,
}) => {
  return (
    <>
      <MenuItem onClick={() => handleSort(SortModes.addDate)}>
        <Typography>{SortModes.addDate}</Typography>
      </MenuItem>
      <MenuItem onClick={() => handleSort(SortModes.pubName)}>
        <Typography>{SortModes.pubName}</Typography>
      </MenuItem>
      <MenuItem onClick={() => handleSort(SortModes.pubDate)}>
        <Typography>{SortModes.pubDate}</Typography>
      </MenuItem>
    </>
  );
};
