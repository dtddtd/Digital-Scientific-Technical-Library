import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../api";
import { TTracking } from "./types";
import { TPublication } from "../publications/types";
import { fetchAllPublications } from "../publications/publicationsThunks";
import { AppDispatch, RootState } from "../index";
import { UserRoles } from "../users/types";

export const fetchAllTrackings = createAsyncThunk<TTracking[]>(
  "tracking/fetchAllTrackings",
  async () => {
    return await Api.trackings.getAllTrackingsReq();
  }
);

export const fetchAllTrackingsByUser = createAsyncThunk<TTracking[], number>(
  "tracking/fetchAllTrackingsByUser",
  async (payload) => {
    return await Api.trackings.getAllTrackingsByUserReq(payload);
  }
);

export const addTracking = createAsyncThunk<
  void,
  Partial<TTracking>,
  { dispatch: AppDispatch }
>("tracking/addTracking", async (payload, { dispatch }) => {
  try {
    await Api.trackings.addTrackingReq(payload);
  } catch (e) {
    console.error(e);
  } finally {
    await dispatch(fetchAllTrackings());
    await dispatch(fetchAllPublications());
  }
});

export const updateTracking = createAsyncThunk<
  void,
  { id: string; data: Partial<TTracking> }
>("tracking/updateTracking", async (payload, { dispatch }) => {
  try {
    await Api.trackings.updateTrackingReq(payload.id, payload.data);
  } catch (e) {
    console.error(e);
  } finally {
    await dispatch(fetchAllTrackings());
    await dispatch(fetchAllPublications());
  }
});

export const deleteTracking = createAsyncThunk<void, string>(
  "tracking/deleteTracking",
  async (id, { dispatch }) => {
    try {
      await Api.trackings.deleteTrackingReq(id);
    } catch (e) {
      console.error(e);
    } finally {
      await dispatch(fetchAllTrackings());
      await dispatch(fetchAllPublications());
    }
  }
);
