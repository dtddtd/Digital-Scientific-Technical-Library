import { Button, Menu, MenuItem, Typography } from "@mui/material";
import React from "react";
import SortIcon from "@mui/icons-material/Sort";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useAppDispatch, useAppSelector } from "../../../../store";
import {
  changeSortOrder,
  sort,
} from "../../../../store/settings/settingsSlice";
import { AppTabs, SortModes } from "../../../../store/settings/types";
import { PubSortOptions } from "./PubSortOptions";
import { TrackSortOptions } from "./TrackSortOptions";
import { UsersSortOptions } from "./UsersSortOptions";

export const SortMenu = () => {
  const dispatch = useAppDispatch();

  const [sortMenuAnchor, setSortMenuAnchor] =
    React.useState<null | HTMLElement>(null);
  const isSortMenuOpen = Boolean(sortMenuAnchor);

  const selectedMode = useAppSelector((state) => state.settings.sortMode);
  const openedTab = useAppSelector((state) => state.settings.openedTab);
  const sortByNew = useAppSelector((state) => state.settings.sortByNew);

  const handleOpenSortMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSortMenuAnchor(event.currentTarget);
  };

  const handleChangeSortOrder = (sortByNew: boolean) => {
    dispatch(changeSortOrder(sortByNew));
  };

  const handleClose = () => {
    setSortMenuAnchor(null);
  };

  const handleSort = (mode: SortModes) => {
    dispatch(sort(mode));
    handleClose();
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Typography
        sx={{
          display: "inline",
          marginRight: 1,
          fontSize: 14,
          color: "text.secondary",
        }}
      >
        Отсортировано по: {selectedMode}
      </Typography>
      <Button id="sort-menu" onClick={handleOpenSortMenu} size={"small"}>
        <SortIcon />
      </Button>
      <Button
        id="sort-order"
        onClick={() => handleChangeSortOrder(!sortByNew)}
        size={"small"}
        sx={{ marginRight: 1 }}
      >
        {sortByNew ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
      </Button>

      <Menu
        id="sort-menu"
        anchorEl={sortMenuAnchor}
        open={isSortMenuOpen}
        onClose={handleClose}
      >
        {openedTab === AppTabs.publications && (
          <PubSortOptions handleSort={handleSort} />
        )}
        {openedTab === AppTabs.trackings && (
          <TrackSortOptions handleSort={handleSort} />
        )}
        {openedTab === AppTabs.users && (
          <UsersSortOptions handleSort={handleSort} />
        )}
      </Menu>
    </div>
  );
};
