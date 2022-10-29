import { configureStore } from "@reduxjs/toolkit";
import PopupReducer from '../Reducers/global/popup'
import CartReducer from '../Reducers/global/cart'
import currentUserReducer from "../Reducers/global/currentUser"

let store = configureStore({
   reducer: {
      currentUser: currentUserReducer, 
      popup: PopupReducer,
      cart: CartReducer
   }
})

export default store