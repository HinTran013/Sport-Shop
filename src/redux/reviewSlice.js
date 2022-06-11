import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getReviewListFromDatabase } from "../utils/getReviewList";

const initialState = {
  list: [],
};

export const fetchReviewList = createAsyncThunk(
  "cart/fetchReviewList",
  async (_, thunkApi) => {
    try {
      const reviewList = await getReviewListFromDatabase();
      thunkApi.dispatch(getReviewList(reviewList));
    } catch (err) {
      getReviewList([]);
    }
  }
);

export const reviewList = createSlice({
  name: "review",
  initialState,
  reducers: {
    getReviewList: (state, action) => {
      state.list = action.payload;
    },
    resetReviewList: () => {
      return initialState;
    }
  },
});

// Action creators are generated for each case reducer function
export const { getReviewList, resetReviewList } = reviewList.actions;

export default reviewList.reducer;
