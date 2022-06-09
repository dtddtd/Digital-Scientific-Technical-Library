import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TPublisher } from "./types";
import { fetchAllPublishers } from "./publishersThunks";

export interface CounterState {
  all: TPublisher[];
}

const initialState: CounterState = {
  all: [],
};

export const publishersSlice = createSlice({
  name: "publishers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchAllPublishers.fulfilled,
      (state, action: PayloadAction<TPublisher[]>) => {
        state.all = action.payload;
      }
    );
  },
});

// Action creators are generated for each case reducer function
export const {} = publishersSlice.actions;

export default publishersSlice.reducer;
