import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   menuSidebar: false, 
   cartSidebar: false,
   authDialog: false, 
   productDialog: false, 
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
      },
      touchAuthDialog: state => {
         state.authDialog = !state.authDialog
      },
      touchProductDialog: state => {
        state.productDialog = !state.productDialog 
      }
   }
})

export const { 
   touchMenuSidebar, 
   touchCartSidebar, 
   touchAuthDialog, 
   touchProductDialog 
} = PopupReducer.actions

export default PopupReducer.reducer

