import { configureStore } from "@reduxjs/toolkit";
import PopupReducer from '../Reducers/popup'
import CartReducer from '../Reducers/cart'

let store = configureStore({
   reducer: {
      popup: PopupReducer,
      cart: CartReducer
   }
})

export default store