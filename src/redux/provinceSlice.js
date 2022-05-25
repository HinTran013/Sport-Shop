import { createSlice } from "@reduxjs/toolkit";

export const provinceSlice = createSlice({
  name: "province",
  initialState: {
    provinceList: [],
    districtList: [],
  },
  reducers: {
    setProvince: (state, action) => {
      state.provinceList.push(action.payload);
    },
    resetProvince: (state) => {
      state.provinceList = [];
    },
    setDistrict: (state, action) => {
      state.districtList.push(action.payload);
    },
    resetDistrict: (state) => {
      state.districtList = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProvince, resetProvince, setDistrict, resetDistrict } =
  provinceSlice.actions;

export default provinceSlice.reducer;
