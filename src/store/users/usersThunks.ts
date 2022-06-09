import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../api";
import { TUser } from "./types";
import { dropUsers } from "./usersSlice";
import { dropTrackings } from "../trackings/trackingsSlice";
import { dropPublications } from "../publications/publicationsSlice";
import { dropSettings } from "../settings/settingsSlice";

export const login = createAsyncThunk<
  { token: string; user: TUser },
  { email: string; password: string }
>("users/login", async (payload) => {
  return await Api.users.loginReq(payload);
});

export const logout = createAsyncThunk(
  "users/logout",
  async (_, { dispatch }) => {
    await dispatch(dropUsers());
    await dispatch(dropTrackings());
    await dispatch(dropPublications());
    await dispatch(dropSettings());
  }
);

export const registration = createAsyncThunk<void, Omit<TUser, "userID">>(
  "users/registration",
  async (payload, { dispatch }) => {
    try {
      await Api.users.registrationReq(payload);
    } catch (e) {
      console.error(e);
    } finally {
      await dispatch(fetchAllUsers());
    }
  }
);

export const fetchAllUsers = createAsyncThunk<TUser[]>(
  "users/fetchAllUsers",
  async () => {
    return await Api.users.getAllUsersReq();
  }
);

export const updateUser = createAsyncThunk<
  void,
  { id: string; data: Partial<TUser> }
>("users/updateUser", async (payload, { dispatch }) => {
  try {
    await Api.users.updateUserReq(payload.id, payload.data);
  } catch (e) {
    console.error(e);
  } finally {
    await dispatch(fetchAllUsers());
  }
});

export const deleteUser = createAsyncThunk<void, string>(
  "users/deleteUser",
  async (id, { dispatch }) => {
    try {
      await Api.users.deleteUserReq(id);
    } catch (e) {
      console.error(e);
    } finally {
      await dispatch(fetchAllUsers());
    }
  }
);
