import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductsService } from "services/firebase/products";

export const getFilteredProducts = createAsyncThunk("catalog/getByFilter", async(params, { rejectWithValue }) => {
  const { newFilter, currentProductsLength } = params;
  try {
    const productsResponse = await ProductsService.getFilteredProducts(newFilter, currentProductsLength || 10);
    return {
      currentProducts: productsResponse, 
      filter: newFilter
    }
  }
  catch(err) {
    return rejectWithValue(err.response.data);
  }
});

const CatalogSlice = createSlice({
  name: "Catalog", 
  initialState: {
    currentProducts: [], 
    filter: {}
  }, 
  reducers: {
    loadMore: (state, action) => {
      const productsMore = action.payload; 
      state.currentProducts = [ ...state.currentProducts, ...productsMore ];
    }
  },
  extraReducers: (builder) => {
    builder 
      .addCase(getFilteredProducts.fulfilled, (state, action) => {
        const { currentProducts, filter } = action.payload;
        state.currentProducts = currentProducts;
        state.filter = filter;
      })
      .addCase(getFilteredProducts.pending, (state, action) => {
        console.log("Pending...");
      })
      .addCase(getFilteredProducts.rejected, (state, action) => {
        console.log("Rejected");
      })
  }
});

export const { loadMore } = CatalogSlice.actions;
export default CatalogSlice.reducer;