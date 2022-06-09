import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../api";
import { TPublisher } from "./types";

export const fetchAllPublishers = createAsyncThunk<TPublisher[]>(
  "publishers/fetchAll",
  // Declare the type your function argument here:
  async () => {
    return await Api.publishers.getAllPublishersReq();
  }
);
