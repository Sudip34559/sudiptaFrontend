import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userAddress: null,
  error: "",
  loading: false,
};

const addressSlice = createSlice({
  name: "userAddress",
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.userAddress = action.payload.data;
      state.error = action.payload.error;
      state.loading = action.payload.loading;
    },
  },
});

export const { setAddress } = addressSlice.actions;

export default addressSlice.reducer;
