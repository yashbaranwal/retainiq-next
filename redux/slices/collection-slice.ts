import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  products: [
    {
      id: 1,
      filters: [],
      primaryVariant: null,
      variants: [
        {
          id: uuidv4(),
          image: null,
          name: "Variant 2"
        },
      ]
    }
  ],
  colVariants: [
    {
      id: uuidv4(),
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
      const {id, image, name} = action.payload
      state.colVariants.push(action.payload);
      state.products.forEach(product => {
        product.variants.push({
          id,
          image,
          name
        });
      });
    },
    removeColVariant: (state, action) => {
      state.colVariants = state.colVariants.filter(column => column.id !== action.payload);
    },
    reorderProducts: (state, action) => {
      state.products = action.payload;
    },
    updatePrimaryVariant: (state, action) => {
      const { id, img } = action.payload;
      const productIndex = state.products.findIndex((product) => product.id === id)
      if (productIndex !== -1) {
        state.products[productIndex].primaryVariant = img
      }
    },
    updateDynamicVariant: (state, action) => {
      const { prodId, varId, img } = action.payload;
      const productIndex = state.products.findIndex((product) => product.id === prodId)
      if (productIndex !== -1) {
        const variantIndex = state.products[productIndex].variants.findIndex((variant) => variant.id === varId)
        if (variantIndex !== -1) {
          state.products[productIndex].variants[variantIndex].image = img;
        }
      }
    },
  },
});

export const {
  addProduct,
  removeProduct,
  addColVariant,
  removeColVariant,
  reorderProducts,
  updatePrimaryVariant,
  updateDynamicVariant,
} = collectionSlice.actions;

export const selectProducts = (state) => state.coll.products
export const selectColVariants = (state) => state.coll.colVariants

export default collectionSlice.reducer;
