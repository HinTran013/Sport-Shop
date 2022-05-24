import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productsInCart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addAProductToCart: (state, action) => {
      state.productsInCart.push(action.payload.id);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addAProductToCart } = cartSlice.actions;

export default cartSlice.reducer;
