import { configureStore } from "@reduxjs/toolkit";
import PopupReducer from './reducers/popup'

let store = configureStore({
   reducer: {
      popup: PopupReducer
   }
})

export default store