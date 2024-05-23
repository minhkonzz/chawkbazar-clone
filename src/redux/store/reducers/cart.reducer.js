// import { createSlice } from "@reduxjs/toolkit";
// import { MeanVars } from "utils/constants";

// const initialState = {
//   cartItems: [], 
//   cartTotalPrice: 0 
// }; 

// const cartReducer = createSlice({
//   name: "Cart", 
//   initialState, 
//   reducers: {
//     addCart: (state, action) => {
//       const { id: idAdd, qty: qtyAdd, price: unitPrice, sale_price, sizeSelected, colorSelected } = action.payload
//       const isItemAdded = !!state.cartItems.find(item => item.id === idAdd && item.sizeSelected.id === sizeSelected.id && item.colorSelected.id === colorSelected.id); 
//       const currentItems = state.cartItems
//       state.cartItems = isItemAdded ? 
//         currentItems.map(item => item.id === idAdd ? {...item, qty: item.qty + qtyAdd} : item) : 
//         [...currentItems, {...action.payload, qty: qtyAdd}]
//       state.cartTotalPrice = state.cartTotalPrice + (qtyAdd * (sale_price || unitPrice));
//     },
//     removeFromCart: (state, action) => {
//       const itemRemove = action.payload; 
//       const { qty: currentAmount, price: unitPrice, sale_price, sizeSelected, colorSelected } = itemRemove;
//       const currentItems = state.cartItems;
//       state.cartItems = currentItems.filter(item => (item.id === itemRemove.id && ((item.sizeSelected.id !== sizeSelected.id) || (item.colorSelected.id !== colorSelected.id))) || (item.id !== itemRemove.id));
//       state.cartTotalPrice = state.cartTotalPrice - (currentAmount * (sale_price || unitPrice));
//     }, 
//     adjustAmount: (state, action) => {
//       const { itemAdjust, type: adjustType } = action.payload;
//       const { price: unitPrice, sale_price, sizeSelected, colorSelected, qty } = itemAdjust; 
//       const currentItems = state.cartItems; 
//       state.cartItems = currentItems.map(item => 
//         item.id === itemAdjust.id && item.sizeSelected.id === sizeSelected.id && item.colorSelected.id === colorSelected.id ? 
//         {
//           ...item, 
//           qty: item.qty + (adjustType === MeanVars.INCREASE_ONCE ? 1 : (qty > 1 ? -1 : 0))
//         } : item
//       )
//       const priceChange = sale_price || unitPrice; 
//       state.cartTotalPrice = state.cartTotalPrice + (adjustType === MeanVars.INCREASE_ONCE ? priceChange : (qty > 1 ? -priceChange : 0))
//     }
//   }
// })

// export const { addCart, removeFromCart, adjustAmount } = cartReducer.actions;
// export default cartReducer.reducer;