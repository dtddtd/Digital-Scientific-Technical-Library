import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TPublication } from "./types";
import { fetchAllPublications } from "./publicationsThunks";

export interface PublicationsState {
  all: TPublication[];
}

const initialState: PublicationsState = {
  all: [],
};

export const publicationsSlice = createSlice({
  name: "publications",
  initialState,
  reducers: {
    dropPublications: (state) => {
      state.all = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAllPublications.fulfilled,
      (state, action: PayloadAction<TPublication[]>) => {
        state.all = action.payload;
      }
    );
  },
});

// Action creators are generated for each case reducer function
export const { dropPublications } = publicationsSlice.actions;

export default publicationsSlice.reducer;
