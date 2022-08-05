import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   menuSidebar: false, 
   cartSidebar: false
}

export const PopupReducer = createSlice({
   name: "Popup", 
   initialState, 
   reducers: {
      touchMenuSidebar: state => {
         state.menuSidebar = !state.menuSidebar
      },
      touchCartSidebar: state => {
         state.cartSidebar = !state.cartSidebar
      }
   }
})

export const { touchMenuSidebar, touchCartSidebar } = PopupReducer.actions
export default PopupReducer.reducer

