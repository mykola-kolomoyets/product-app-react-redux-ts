import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';

import { Product, Comment, AddCommentPayload, DeleteCommentPayload } from '../utils/types';
import { getProductsUrl } from '../utils/routes';

const initialState: Product[] = [];

export const productListSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Product>) => {
      return [...state, action.payload]
    },
    remove: (state, action: PayloadAction<number>) => {
      return state.filter(product => product?.id !== action?.payload);
    },
    edit: (state, action: PayloadAction<Product>) => {
      const index = state.findIndex((product) => product?.id === action?.payload?.id);
      state.splice(index, 1, action?.payload);
    },
    addComment: (state, action: PayloadAction<AddCommentPayload>) => {
      const index = state.findIndex((product) => product?.id === action?.payload?.id);
      const currentProduct = state[index];
      currentProduct.comments.push(action.payload.comment);
      state.splice(index, 1, currentProduct);
    },
    removeComment: (state, action: PayloadAction<DeleteCommentPayload>) => {
      const index = state.findIndex((product) => product?.id === action?.payload?.productId);
      const currentProduct = state[index];
      currentProduct.comments.filter(comment => comment.id !== action?.payload?.id);
      state.splice(index, 1, currentProduct);
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchProducts.fulfilled, (_, action) => {
      return [...action.payload];
    })
  }
});

export const fetchProducts = createAsyncThunk('products/getProducts', async () => {
  const response = await fetch(getProductsUrl);
  return response.json();
})

export const { add, remove, edit, removeComment, addComment } = productListSlice.actions;

export const { reducer: productListReducer } = productListSlice;
