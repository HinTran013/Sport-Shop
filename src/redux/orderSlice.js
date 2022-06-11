import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOrderListFromDatabase } from "../utils/getOrderList";

const initialState = {
  list: [],
};

export const fetchOrderList = createAsyncThunk(
  "cart/fetchOrderList",
  async (_, thunkApi) => {
    try {
      const orderList = await getOrderListFromDatabase();
      thunkApi.dispatch(getOrderList(orderList));
    } catch (err) {
      getOrderList([]);
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    getOrderList: (state, action) => {
      state.list = action.payload;
    },
    resetOrderList: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getOrderList, resetOrderList } = orderSlice.actions;

export default orderSlice.reducer;
