import { createAsyncThunk } from "@reduxjs/toolkit";
import { TPublication } from "./types";
import Api from "../../api";

export const fetchAllPublications = createAsyncThunk<TPublication[]>(
  "publications/fetchAll",
  async () => {
    return await Api.publications.getAllPublicationsReq();
  }
);

export const addPublication = createAsyncThunk<void, Partial<TPublication>>(
  "publications/addPublication",
  async (payload, { dispatch }) => {
    try {
      await Api.publications.addPublicationReq(payload);
    } catch (e) {
      console.error(e);
    } finally {
      await dispatch(fetchAllPublications());
    }
  }
);

export const updatePublication = createAsyncThunk<
  void,
  { id: string; data: Partial<TPublication> }
>("publications/updatePublication", async (payload, { dispatch }) => {
  try {
    await Api.publications.updatePublicationReq(payload.id, payload.data);
  } catch (e) {
    console.error(e);
  } finally {
    await dispatch(fetchAllPublications());
  }
});

export const deletePublication = createAsyncThunk<void, string>(
  "publications/deletePublication",
  async (id, { dispatch }) => {
    try {
      await Api.publications.deletePublicationReq(id);
    } catch (e) {
      console.error(e);
    } finally {
      await dispatch(fetchAllPublications());
    }
  }
);
