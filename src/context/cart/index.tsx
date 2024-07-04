"use client"

import { useLocalStorage } from "@/shared/hooks"; 
import { constants } from "@/configs";
import { ReactNode, createContext, useContext } from "react";

type Cart = {
   items: any[],
   totalPrice: number
}

type CartContextType = {
   cart: Cart;
   addCart: any,
   removeFromCart: any,
   adjustAmount: any
};

const CartContext = createContext<CartContextType | null>(null);

export default function CartProvider({ children }: { children: ReactNode }) {

   const [cart, setCart] = useLocalStorage<Cart>("cart", {
      items: [],
      totalPrice: 0
   });
   
   const addCart = (params: any) => {
      const {
         id: idAdd, 
         qty: qtyAdd, 
         price: unitPrice, 
         sale_price, 
         sizeSelected, 
         colorSelected
      } = params;

      const currentItems = cart.items;
      const isItemAdded = !!currentItems.find((item: any) => item.id === idAdd && item.sizeSelected.id === sizeSelected.id && item.colorSelected.id === colorSelected.id);
      setCart({
         items: isItemAdded ?
            currentItems.map((item: any) => item.id === idAdd ? { ...item, qty: item.qty + qtyAdd } : item) :
            [...currentItems, { ...params, qty: qtyAdd }],
         totalPrice: cart.totalPrice + (qtyAdd * (sale_price || unitPrice))
      })
   };

   const removeFromCart = (item: any) => {
      const { 
         qty: currentAmount, 
         price: unitPrice, 
         sale_price, 
         sizeSelected, 
         colorSelected 
      } = item;

      const currentItems = cart.items;

      setCart({
         items: currentItems.filter((_item: any) => 
            (_item.id === item.id && ((item.sizeSelected.id !== sizeSelected.id) || (item.colorSelected.id !== colorSelected.id))) || (item.id !== item.id)
         ),
         totalPrice: cart.totalPrice - (currentAmount * (sale_price || unitPrice))
      });
   };

   const adjustAmount = (params: any) => {
      const { itemAdjust, type: adjustType } = params;

      const { 
         price: unitPrice, 
         sale_price, 
         sizeSelected, 
         colorSelected, 
         qty 
      } = itemAdjust;

      const currentItems = cart.items;
      const priceChange = sale_price || unitPrice;

      setCart({
         items: currentItems.map((item: any) =>
            item.id === itemAdjust.id && item.sizeSelected.id === sizeSelected.id && item.colorSelected.id === colorSelected.id ?
            {...item, qty: item.qty + (adjustType === constants.INCREASE_ONCE ? 1 : (qty > 1 ? -1 : 0))} : item
         ),
         totalPrice: cart.totalPrice + (adjustType === constants.INCREASE_ONCE ? priceChange : (qty > 1 ? -priceChange : 0))
      });
   }; 

   return <CartContext.Provider value={{ cart, addCart, removeFromCart, adjustAmount }}>
      { children }
   </CartContext.Provider>;
};

export const useCartContext = () => useContext(CartContext);