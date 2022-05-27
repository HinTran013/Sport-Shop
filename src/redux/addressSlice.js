import { createSlice } from "@reduxjs/toolkit";

export const addressSlice = createSlice({
  name: "address",
  initialState: {
    listAddresses: [],
  },
  reducers: {
    setAddress: (state, action) => {
      state.listAddresses.push(action.payload);
    },
    resetAddress: (state) => {
      state.listAddresses = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAddress, resetAddress } = addressSlice.actions;

export default addressSlice.reducer;
