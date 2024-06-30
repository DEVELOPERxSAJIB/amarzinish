import { configureStore } from '@reduxjs/toolkit';
import { api } from './AllApi';
import AllSlice from "./AllSlice"
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    AllState:AllSlice
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: true,
});