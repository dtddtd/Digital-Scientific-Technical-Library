import axios from "axios";
import { TPublisher } from "../store/publishers/types";
import { TUser } from "../store/users/types";
import { TPublication } from "../store/publications/types";

export const loginReq = async (payload: {
  email: string;
  password: string;
}) => {
  const { data } = await axios.post<{ token: string; user: TUser }>(
    "/login",
    payload
  );

  return data;
};

export const registrationReq = async (payload: Omit<TUser, "userID">) => {
  await axios.post("/registration", payload);
};

export const getAllUsersReq = async () => {
  const { data } = await axios.get<TUser[]>("/users");

  return data;
};

export const updateUserReq = async (id: string, payload: Partial<TUser>) => {
  await axios.put(`/users?userId=${id}`, payload);
};

export const deleteUserReq = async (id: string) => {
  await axios.delete(`/users?userId=${id}`);
};
