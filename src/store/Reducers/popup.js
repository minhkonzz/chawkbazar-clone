import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   menuSidebar: false, 
   cartSidebar: false,
   authDialog: false, 
   productDetailId: "", 
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

