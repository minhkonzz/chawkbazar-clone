import { configureStore } from "@reduxjs/toolkit";
import PopupReducer from './reducers/popup.reducer';
import CartReducer from './reducers/cart.reducer';

let store = configureStore({
   reducer: {
      popup: PopupReducer,
      cart: CartReducer
   }
});

export default store;