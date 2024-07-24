import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: [],
  error: null,
  loding: true,
};
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategoryOnRedux: (state, action) => {
      state.category.push(action.payload.data);
      state.error = action.payload.error;
      state.loding = action.payload.loding;
    },
    deleteCategoryOnRedux: (state, action) => {
      state.category.pull(action.payload.data);
      state.error = action.payload.error;
      state.loding = action.payload.loding;
    },
    getAllCategory: (state, action) => {
      state.category = action.payload.data;
      state.error = action.payload.error;
      state.loding = action.payload.loding;
    },
  },
});
export const { addCategoryOnRedux, deleteCategoryOnRedux, getAllCategory } =
  categorySlice.actions;
export default categorySlice.reducer;
