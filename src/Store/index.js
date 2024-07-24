import { configureStore } from "@reduxjs/toolkit";
import AuthSclice from "../Reducer/Auth";
import productSlice from "../Reducer/Products";
import categoriSlice from "../Reducer/category";
import cartSlice from "../Reducer/cart";
import addressSlice from "../Reducer/Address";

const store = configureStore({
  reducer: {
    auth: AuthSclice,
    product: productSlice,
    category: categoriSlice,
    cart: cartSlice,
    userAddress: addressSlice,
  },
});

export default store;
