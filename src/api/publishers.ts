import axios from "axios";
import { TPublisher } from "../store/publishers/types";

export const getAllPublishersReq = async () => {
  const { data } = await axios.get<TPublisher[]>("/publishers");

  return data;
};
