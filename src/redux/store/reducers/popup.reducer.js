// import { createSlice } from "@reduxjs/toolkit";

// export const PopupReducer = createSlice({
//    name: "Popup", 
//    initialState: {
//      menuSidebar: false, 
//      cartSidebar: false,
//      filtersSidebar: false, 
//      authDialog: false, 
//      productDetailId: "", 
//      message: null
//    }, 
//    reducers: {
//       touchMenuSidebar: state => {
//          state.menuSidebar = !state.menuSidebar;
//       },
//       touchCartSidebar: state => {
//          state.cartSidebar = !state.cartSidebar;
//       },
//       touchFiltersSidebar: state => {
//          state.filtersSidebar = !state.filtersSidebar;
//       },
//       touchAuthDialog: state => {
//          state.authDialog = !state.authDialog;
//       },
//       touchProductDialog: (state, action) => {
//         state.productDetailId = action.payload || "";
//       }, 
//       touchMessageBox: (state, action) => {
//          state.message = action.payload || null;
//       }
//    }
// })

// export const { 
//    touchMenuSidebar, 
//    touchCartSidebar, 
//    touchFiltersSidebar,
//    touchAuthDialog, 
//    touchProductDialog, 
//    touchMessageBox 
// } = PopupReducer.actions; 

// export default PopupReducer.reducer; 

