import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filterSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    filter: filterReducer
  },
});
