"use client";

import { ReactNode, useState, createContext, useContext } from "react";
import AuthModal from "@/components/@modals/auth";
import Cart from "@/components/@modals/cart";

export const MODALS: Readonly<
   Record<"none" | "auth" | "product" | "cart", any>
> = {
   "none": null,
   "auth": { component: AuthModal },
   "product": { component: null },
   "cart": { component: Cart }
}

type ModalType = keyof typeof MODALS;

export type ModalContextType = {
   modal: ModalType,
   setCurrentModal: (type: ModalType, CustomComponent?: any) => void 
}

const ModalContext = createContext<ModalContextType | null>(null);

export default function PopupProvider({ children }: { children: ReactNode }) {
   const [ modal, setModal ] = useState<ModalType>("none");

   const setCurrentModal = (type: ModalType, customPopup?: any) => {
      if (customPopup && ["product"].includes(type)) {
         MODALS[type].component = customPopup;
      }
      setModal(type);
   }

   return (
      <ModalContext.Provider value={{ modal, setCurrentModal }}>
         {children}
      </ModalContext.Provider>
   )
}

export const useModalContext = () => useContext(ModalContext);