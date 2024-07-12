import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  products: [
    {
      id: 1,
      filters: [],
      primaryVariant: {
        id: uuidv4(),
        image: "https://via.placeholder.com/150",
        name: "Primary Variant"
      },
      variants: [
        {
          id: uuidv4(),
          image: "https://via.placeholder.com/150",
          name: "Variant 2"
        }]
    }
  ],
  colVariants: [
    {
      id: uuidv4(),
      image: "https://via.placeholder.com/150",
      name: "Variant 2"
    }
  ]
};

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload);
    },
    addColVariant: (state, action) => {
      state.colVariants.push(action.payload);
    },
    removeColVariant: (state, action) => {
      state.colVariants = state.colVariants.filter(column => column.id !== action.payload);
    },
  },
});

export const {
  addProduct,
  removeProduct,
  addColVariant,
  removeColVariant,
} = collectionSlice.actions;

export const selectProducts = (state) => state.coll.products
export const selectColVariants = (state) => state.coll.colVariants

export default collectionSlice.reducer;
