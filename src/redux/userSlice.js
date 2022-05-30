import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    phone: "",
    email: "",
    dob: "",
    password: "",
    notiSales: false,
    notiNew: false,
    notiStatus: false,
  },
  reducers: {
    setUserData: (state, action) => {
      state.name = action.payload.name;
      state.phone = action.payload.phone;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.dob = action.payload.dob;
      state.notiNew = action.payload.notiNew;
      state.notiSales = action.payload.notiSales;
      state.notiStatus = action.payload.notiStatus;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
