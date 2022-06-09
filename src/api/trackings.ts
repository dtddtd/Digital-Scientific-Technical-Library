import axios from "axios";
import { TTracking } from "../store/trackings/types";

export const getAllTrackingsReq = async () => {
  const { data } = await axios.get<TTracking[]>("/trackings");

  return data;
};

export const getAllTrackingsByUserReq = async (userId: number) => {
  const { data } = await axios.get<TTracking[]>(`/trackings/${userId}`);

  return data;
};

export const addTrackingReq = async (payload: Partial<TTracking>) => {
  await axios.post("/trackings", payload);
};

export const updateTrackingReq = async (
  id: string,
  payload: Partial<TTracking>
) => {
  await axios.put(`/trackings?trackID=${id}`, payload);
};

export const deleteTrackingReq = async (id: string) => {
  await axios.delete(`/trackings?trackID=${id}`);
};
