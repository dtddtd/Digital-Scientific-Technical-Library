import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "./types";
import { fetchAllUsers, login, registration } from "./usersThunks";

export interface UsersState {
  authToken: string;
  user: TUser | null;
  registrationSuccessToast: boolean;
  allUsers: TUser[];
}

const initialState: UsersState = {
  authToken: "",
  user: null,
  registrationSuccessToast: false,
  allUsers: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    dropUsers: (state) => {
      state.authToken = "";
      state.user = null;
      state.allUsers = [];
    },
    closeRegistrationToast: (state) => {
      state.registrationSuccessToast = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<{ token: string; user: TUser }>) => {
          state.authToken = action.payload.token;
          state.user = action.payload.user;
        }
      )
      .addCase(registration.fulfilled, (state) => {
        state.registrationSuccessToast = true;
      })
      .addCase(
        fetchAllUsers.fulfilled,
        (state, action: PayloadAction<TUser[]>) => {
          state.allUsers = action.payload;
        }
      );
  },
});

export const { dropUsers, closeRegistrationToast } = usersSlice.actions;

export default usersSlice.reducer;
