import { combineReducers } from "@reduxjs/toolkit";
import { configureStore, applyMiddleware, compose } from "@reduxjs/toolkit";
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
import thunk from "redux-thunk";
import userSlice from "./userSlice";
import cartSlice from "./cartSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import filterSlice from "./filterSlice";
import addressSlice from "./addressSlice";

//root reducer
const rootReducer = combineReducers({
  user: userSlice,
  cart: cartSlice,
  filter: filterSlice,
  address: addressSlice,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
  whitelist: ["user", "cart", "filter", "address"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore(
  {
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  },
  compose(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
