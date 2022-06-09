import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TTracking } from "./types";
import { fetchAllTrackings, fetchAllTrackingsByUser } from "./trackingsThunks";

export interface IITrackingsState {
  all: TTracking[];
}

const initialState: IITrackingsState = {
  all: [],
};

export const trackingsSlice = createSlice({
  name: "trackings",
  initialState,
  reducers: {
    dropTrackings: (state) => {
      state.all = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchAllTrackings.fulfilled,
        (state, action: PayloadAction<TTracking[]>) => {
          state.all = action.payload;
        }
      )
      .addCase(
        fetchAllTrackingsByUser.fulfilled,
        (state, action: PayloadAction<TTracking[]>) => {
          state.all = action.payload;
        }
      );
  },
});

// Action creators are generated for each case reducer function
export const { dropTrackings } = trackingsSlice.actions;

export default trackingsSlice.reducer;
