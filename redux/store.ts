
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { myApi } from "./api";
import authSlice from "./slices/auth-slice";
import collectionSlice from "./slices/collection-slice";

const rootReducer = combineReducers({
  [myApi.reducerPath]: myApi.reducer,
  auth: authSlice,
  coll: collectionSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(myApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
