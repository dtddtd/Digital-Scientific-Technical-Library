import { TextField } from "@mui/material";
import React from "react";
import debounce from "lodash.debounce";
import { useAppDispatch } from "../../../store";
import { search } from "../../../store/settings/settingsSlice";

export const SearchInput = () => {
  const dispatch = useAppDispatch();

  const handleSearch = (input: string) => {
    dispatch(search(input.toLowerCase()));
  };

  const debouncedSearch = debounce(handleSearch, 300);

  return (
    <TextField
      variant="outlined"
      size="small"
      label="Поиск"
      onChange={(e) => debouncedSearch(e.target.value)}
    />
  );
};
