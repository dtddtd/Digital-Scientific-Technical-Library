import axios from "axios";
import { TPublication } from "../store/publications/types";

export const getAllPublicationsReq = async () => {
  const { data } = await axios.get<TPublication[]>("/publications");

  return data;
};

export const addPublicationReq = async (payload: Partial<TPublication>) => {
  await axios.post("/publications", payload);
};

export const updatePublicationReq = async (
  id: string,
  payload: Partial<TPublication>
) => {
  await axios.put(`/publications?pubID=${id}`, payload);
};

export const deletePublicationReq = async (id: string) => {
  await axios.delete(`/publications?pubID=${id}`);
};
