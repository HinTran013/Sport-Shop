import { createSlice } from "@reduxjs/toolkit";
import getDefaultAddress from "../utils/getDefaultAddress";

export const addressSlice = createSlice({
  name: "address",
  initialState: {
    listAddresses: [],
    deliveredAddress: {},
  },
  reducers: {
    setAddress: (state, action) => {
      state.listAddresses.push(action.payload);
    },
    resetAddress: (state) => {
      state.listAddresses = [];
    },
    setDefault: (state, action) => {
      state.listAddresses.forEach((e) => {
        if (e.id == action.payload) e.default = true;
        else e.default = false;
      });
    },
    updateAddress: (state, action) => {
      state.listAddresses.forEach((e) => {
        if (e.id == action.payload.id) {
          e = action.payload;
        }
      });
    },
    deleteAddress: (state, action) => {
      state.listAddresses.splice(
        state.listAddresses.findIndex((e) => e.id === action.payload),
        1
      );
    },
    setDelivered: (state, action) => {
      state.deliveredAddress = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setAddress,
  resetAddress,
  setDefault,
  updateAddress,
  deleteAddress,
  setDelivered,
} = addressSlice.actions;

export default addressSlice.reducer;
