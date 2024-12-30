"use client";

import { type ReactNode, createContext, useContext } from "react";
import type { SelectedProduct } from "@/shared/types";
import { useLocalStorage } from "@/shared/hooks";
import { constants } from "@/configs";

const { DECREASE_ONCE } = constants;

export type Cart = {
   items: SelectedProduct[];
   totalPrice: number;
};

type CartContextType = {
   cart: Cart;
   addCart: (item: SelectedProduct) => void;
   removeFromCart: (item: any) => void;
   adjustAmount: (params: any) => void;
   clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export default function CartProvider({ children }: { children: ReactNode }) {
   const [cart, setCart] = useLocalStorage<Cart>("cart", {
      items: [],
      totalPrice: 0
   });

   const addCart = (item: SelectedProduct) => {
      const {
         id: idAdd,
         qty: qtyAdd,
         lastPrice,
         selectedVariation: {
            size,
            color
         }
      } = item;

      const currentItems = cart.items;
      const isItemAdded = !!currentItems.find(
         (item: SelectedProduct) =>
            item.id === idAdd &&
            item.selectedVariation.size === size &&
            item.selectedVariation.color?.name === color?.name
      );
      setCart({
         items: isItemAdded
            ? currentItems.map((item: SelectedProduct) =>
                 item.id === idAdd ? { ...item, qty: item.qty + qtyAdd } : item
              )
            : [...currentItems, { ...item, qty: qtyAdd }],
         totalPrice: cart.totalPrice + qtyAdd * lastPrice
      });
   };

   const removeFromCart = (item: any) => {
      const currentItems = cart.items;
      if (currentItems.length === 1) {
         setCart({ items: [], totalPrice: 0 });
         return;
      }

      const {
         qty: currentAmount,
         price: unitPrice,
         sale_price,
         selectedSize,
         selectedColor
      } = item;

      setCart({
         items: currentItems.filter(
            (_item: SelectedProduct) =>
               (_item.id === item.id &&
                  (item.selectedSize.id !== selectedSize.id ||
                     item.selectedColor.id !== selectedColor.id)) ||
               _item.id !== item.id
         ),
         totalPrice: cart.totalPrice - currentAmount * (sale_price || unitPrice)
      });
   };

   const adjustAmount = (params: any) => {
      const { itemAdjust, type: adjustType } = params;

      const {
         id,
         lastPrice,
         selectedVariation: {
            size,
            color
         },
         qty
      } = itemAdjust;
      

      if (adjustType === DECREASE_ONCE && qty === 1) return;

      const currentItems = cart.items;
      const totalPrice = cart.totalPrice;

      setCart({
         items: currentItems.map((item: SelectedProduct) =>
            item.id === id &&
            item.selectedVariation.size === size &&
            item.selectedVariation.color?.name === color?.name
               ? {
                    ...item,
                    qty: item.qty + adjustType
                 }
               : item
         ),
         totalPrice: totalPrice + lastPrice * adjustType
      });
   };

   const clearCart = () => {
      setCart({ items: [], totalPrice: 0 });
   };

   return (
      <CartContext.Provider
         value={{ cart, addCart, removeFromCart, adjustAmount, clearCart }}>
         {children}
      </CartContext.Provider>
   );
}

export const useCartContext = () => useContext(CartContext);
