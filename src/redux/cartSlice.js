import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCartListFromDatabase } from "../utils/getCartList";

const initialState = {
  list: [],
};

export const fetchCartList = createAsyncThunk(
  "cart/fetchCartList",
  async (_, thunkApi) => {
    try {
      const cartList = await getCartListFromDatabase();
      thunkApi.dispatch(getCartList(cartList));
    } catch (err) {
      getCartList([]);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getCartList: (state, action) => {
      state.list = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getCartList } = cartSlice.actions;

export default cartSlice.reducer;
