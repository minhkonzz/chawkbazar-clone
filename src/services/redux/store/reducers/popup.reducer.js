import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   menuSidebar: false, 
   cartSidebar: false,
   authDialog: false, 
   productDetailId: "", 
   message: null
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
      touchProductDialog: (state, action) => {
        state.productDetailId = action.payload || ""
      }, 
      touchMessageBox: (state, action) => {
         state.message = action.payload || null
      }
   }
})

export const { 
   touchMenuSidebar, 
   touchCartSidebar, 
   touchAuthDialog, 
   touchProductDialog, 
   touchMessageBox 
} = PopupReducer.actions; 

export default PopupReducer.reducer; 

