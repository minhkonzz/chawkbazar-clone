import { configureStore } from "@reduxjs/toolkit";
import PopupReducer from './reducers/popup.reducer';
import CartReducer from './reducers/cart.reducer';
import CatalogReducer from "./reducers/catalog.slice";

let store = configureStore({
  reducer: {
    popup: PopupReducer,
    cart: CartReducer, 
    catalog: CatalogReducer
  }
});

export default store;