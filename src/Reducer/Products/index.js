import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  error: null,
  loding: true,
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getAllProducts: (state, action) => {
      // console.log(action.payload.payload.data, "ac");

      state.products = action.payload.payload.data;
      state.error = action.payload.payload.error;
      state.loding = action.payload.payload.loding;
    },
  },
});

export const { getAllProducts } = productSlice.actions;

export default productSlice.reducer;
