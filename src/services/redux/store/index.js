import { configureStore } from "@reduxjs/toolkit";
import PopupReducer from './reducers/popup.reducer';
import CartReducer from './reducers/cart.reducer';
import currentUserReducer from "./reducers/currentUser.reducer";

let store = configureStore({
   reducer: {
      currentUser: currentUserReducer, 
      popup: PopupReducer,
      cart: CartReducer
   }
});

export default store;