"use client";

import { ReactNode, createContext, useContext } from "react";
import { SelectedProduct } from "@/shared/types/entities";
import { useLocalStorage } from "@/shared/hooks";
import { constants } from "@/configs";

const { DECREASE_ONCE } = constants;

export type Cart = {
   items: SelectedProduct[];
   totalPrice: number;
};

type CartContextType = {
   cart: Cart,
   addCart: (params: NewSelection) => void,
   removeFromCart: (item: any) => void,
   adjustAmount: (params: any) => void,
   clearCart: () => void
};

type NewSelection = Pick<SelectedProduct, "id" | "qty" | "price" | "sale_price" | "selectedSize" | "selectedColor">;

const CartContext = createContext<CartContextType | null>(null);

export default function CartProvider({ children }: { children: ReactNode }) {
   const [cart, setCart] = useLocalStorage<Cart>("cart", {
      items: [],
      totalPrice: 0,
   });

   const addCart = (params: NewSelection) => {
      const {
         id: idAdd,
         qty: qtyAdd,
         price: unitPrice,
         sale_price,
         selectedSize,
         selectedColor,
      } = params;

      const currentItems = cart.items;
      const isItemAdded = !!currentItems.find(
         (item: SelectedProduct) =>
            item.id === idAdd &&
            item.selectedSize.id === selectedSize.id &&
            item.selectedColor.id === selectedColor.id
      );
      setCart({
         items: isItemAdded
            ? currentItems.map((item: SelectedProduct) =>
               item.id === idAdd ? { ...item, qty: item.qty + qtyAdd } : item
            )
            : [...currentItems, { ...params, qty: qtyAdd }],
         totalPrice: cart.totalPrice + qtyAdd * (sale_price || unitPrice),
      });
   };

   const removeFromCart = (item: any) => {
      const {
         qty: currentAmount,
         price: unitPrice,
         sale_price,
         selectedSize,
         selectedColor,
      } = item;

      const currentItems = cart.items;

      setCart({
         items: currentItems.filter(
            (_item: SelectedProduct) =>
               (_item.id === item.id &&
                  (item.selectedSize.id !== selectedSize.id ||
                     item.selectedColor.id !== selectedColor.id)) ||
               item.id !== item.id
         ),
         totalPrice: cart.totalPrice - currentAmount * (sale_price || unitPrice),
      });
   };

   const adjustAmount = (params: any) => {
      const { itemAdjust, type: adjustType } = params;

      const {
         id,
         price: unitPrice,
         sale_price,
         selectedSize,
         selectedColor,
         qty,
      } = itemAdjust;

      if (adjustType === DECREASE_ONCE && qty === 1) return;

      const currentItems = cart.items;
      const totalPrice = cart.totalPrice;
      const priceChange = sale_price || unitPrice;

      setCart({
         items: currentItems.map((item: SelectedProduct) =>
            item.id === id &&
            item.selectedSize.id === selectedSize.id &&
            item.selectedColor.id === selectedColor.id
            ? {
               ...item,
               qty: item.qty + adjustType
            }
            : item
         ),
         totalPrice: totalPrice + priceChange * adjustType,
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
