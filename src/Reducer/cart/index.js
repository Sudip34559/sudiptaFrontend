import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  loding: false,
  total: 0,
  error: "",
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // console.log("ss", action.payload.data);
      state.cart = action.payload.data;
      state.error = action.payload.error;
      state.loding = action.payload.loding;
    },
  },
});
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
