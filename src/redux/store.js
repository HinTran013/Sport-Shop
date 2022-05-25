import { configureStore } from "@reduxjs/toolkit";
import provinceSlice from "./provinceSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    province: provinceSlice,
  },
});
