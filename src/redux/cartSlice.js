import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Alert } from "react-native";
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
    increase: (state, action) => {
      state.list.forEach((element) => {
        if (
          element.name == action.payload.name &&
          element.currentSize == action.payload.size &&
          element.currentColor == action.payload.color
        ) {
          element.quantity += 1;
        }
      });
    },
    decrease: (state, action) => {
      state.list.forEach((element) => {
        if (
          element.name == action.payload.name &&
          element.currentSize == action.payload.size &&
          element.currentColor == action.payload.color
        ) {
          element.quantity -= 1;
          if (element.quantity == 0)
            state.list.splice(
              state.list.findIndex((arrow) => arrow === element),
              1
            );
        }
      });
    },
    resetCartList: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getCartList, increase, decrease, resetCartList } =
  cartSlice.actions;

export default cartSlice.reducer;
