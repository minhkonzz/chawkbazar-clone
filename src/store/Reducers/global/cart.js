import { createSlice } from "@reduxjs/toolkit";
import { MeanVars } from "../../../utils/constants";

const initialState = {
   cartItems: [], 
   cartTotalPrice: 0
}

const cartReducer = createSlice({
   name: "Cart", 
   initialState, 
   reducers: {
      addCart: (state, action) => {
         const { id: idAdd, qty: qtyAdd, price: unitPrice } = action.payload
         const isItemAdded = !!state.cartItems.find(item => item.id === idAdd)
         const currentItems = state.cartItems
         state.cartItems = isItemAdded ? 
            currentItems.map(item => item.id === idAdd ? {...item, qty: item.qty + qtyAdd} : item) : 
            [...currentItems, {...action.payload, qty: qtyAdd}]
         state.cartTotalPrice = state.cartTotalPrice + (qtyAdd * unitPrice)
      },
      removeFromCart: (state, action) => {
         const itemRemove = action.payload 
         const { qty: currentAmount, price: unitPrice } = itemRemove
         const currentItems = state.cartItems
         state.cartItems = currentItems.filter(item => item.id !== itemRemove.id)
         state.cartTotalPrice = state.cartTotalPrice - (currentAmount * unitPrice)
      }, 
      adjustAmount: (state, action) => {
         const { itemAdjust, type: adjustType } = action.payload 
         const { price: unitPrice } = itemAdjust
         const currentItems = state.cartItems
         state.cartItems = currentItems.map(item => 
            item.id === itemAdjust.id ? 
            {
               ...item, 
               qty: item.qty + (adjustType === MeanVars.INCREASE_ONCE ? 1 : -1)
            } : item
         )
         state.cartTotalPrice = state.cartTotalPrice + (adjustType === MeanVars.INCREASE_ONCE ? unitPrice : -unitPrice)
      }
   }
})

export const { addCart, removeFromCart, adjustAmount } = cartReducer.actions
export default cartReducer.reducer