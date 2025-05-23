"use client";

import { type ReactNode, createContext } from "@/configs/imports-wrapper";
import type { CartItem } from "@/types";
import { useLocalStorage } from "@/hooks";
import { constants } from "@/configs";
import context from "../use-context-wrapper";

const { DECREASE_ONCE } = constants;

export type Cart = {
  items: CartItem[];
  totalPrice: number;
};

type CartContextType = {
  cart: Cart;
  addCart: (item: CartItem) => void;
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

  const addCart = (item: CartItem) => {
    const {
      id: idAdd,
      qty: qtyAdd,
      lastPrice,
      selectedVariation: { size, color }
    } = item;

    const currentItems = cart.items;
    const isItemAdded = !!currentItems.find(
      (item: CartItem) =>
        item.id === idAdd &&
        item.selectedVariation.size === size &&
        item.selectedVariation.color?.name === color?.name
    );
    setCart({
      items: isItemAdded
        ? currentItems.map((item: CartItem) =>
            item.id === idAdd ? { ...item, qty: item.qty + qtyAdd } : item
          )
        : [...currentItems, { ...item, qty: qtyAdd }],
      totalPrice: cart.totalPrice + qtyAdd * lastPrice
    });
  };

  const removeFromCart = (item: CartItem) => {
    const currentItems = cart.items;
    if (currentItems.length === 1) {
      clearCart();
      return;
    }

    const {
      qty,
      lastPrice,
      selectedVariation: { size, color }
    } = item;

    setCart({
      items: currentItems.filter(
        (_item: CartItem) =>
          (_item.id === item.id &&
            (item.selectedVariation.size !== size ||
              item.selectedVariation.color?.name !== color?.name)) ||
          _item.id !== item.id
      ),
      totalPrice: cart.totalPrice - qty * lastPrice
    });
  };

  const adjustAmount = (params: any) => {
    const { itemAdjust, type: adjustType } = params;

    const {
      id,
      lastPrice,
      selectedVariation: { size, color },
      qty
    } = itemAdjust;

    if (adjustType === DECREASE_ONCE && qty === 1) return;

    const currentItems = cart.items;
    const totalPrice = cart.totalPrice;

    setCart({
      items: currentItems.map((item: CartItem) =>
        item.id === id &&
        item.selectedVariation.size === size &&
        item.selectedVariation.color?.name === color?.name
          ? { ...item, qty: item.qty + adjustType }
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

export const useCart = context(
  CartContext,
  "useCart must be used within a CartProvider"
);
