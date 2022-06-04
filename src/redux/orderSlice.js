import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = [];


export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    getOrderList: (state, action) => {
      state = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getOrderList } = orderSlice.actions;

export default orderSlice.reducer;