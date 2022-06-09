import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
// @ts-ignore
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import publicationsReducer from "./publications/publicationsSlice";
import publishersReducer from "./publishers/publishersSlice";
import usersReducer from "./users/usersSlice";
import trackingsReducer from "./trackings/trackingsSlice";
import settingsReducer from "./settings/settingsSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["users"],
  blacklist: ["publications", "publishers", "trackings", "settings"],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    users: usersReducer,
    publications: publicationsReducer,
    publishers: publishersReducer,
    trackings: trackingsReducer,
    settings: settingsReducer,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
