import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import userSlice from "./userSlice";
import cartSlice from "./cartSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import filterSlice from "./filterSlice";
import provinceSlice from "./provinceSlice";

//root reducer
const rootReducer = combineReducers({
  user: userSlice,
  cart: cartSlice,
  filter: filterSlice,
  province: provinceSlice,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
  whitelist: ["user", "cart", "province"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
