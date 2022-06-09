import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppTabs, SortModes } from "./types";

export interface TSettingsState {
  openedTab: AppTabs;
  sortMode: SortModes;
  sortByNew: boolean;
  search: string;
}

const initialState: TSettingsState = {
  openedTab: AppTabs.publications,
  sortMode: SortModes.addDate,
  sortByNew: true,
  search: "",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    dropSettings: (state) => {
      state.openedTab = initialState.openedTab;
      state.sortMode = initialState.sortMode;
      state.sortByNew = initialState.sortByNew;
      state.search = initialState.search;
    },
    openTab: (state, action: PayloadAction<AppTabs>) => {
      state.openedTab = action.payload;

      if (action.payload === AppTabs.publications)
        state.sortMode = SortModes.addDate;
      if (action.payload === AppTabs.trackings)
        state.sortMode = SortModes.dateIn;
      if (action.payload === AppTabs.users) state.sortMode = SortModes.fullName;
    },
    sort: (state, action: PayloadAction<SortModes>) => {
      state.sortMode = action.payload;
    },
    changeSortOrder: (state, action: PayloadAction<boolean>) => {
      state.sortByNew = action.payload;
    },
    search: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { dropSettings, openTab, sort, search, changeSortOrder } =
  settingsSlice.actions;

export default settingsSlice.reducer;
