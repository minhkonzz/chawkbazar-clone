"use client";

import { type ReactNode, useState, createContext } from "react";
import context from "../use-context-wrapper";
import AuthModal from "@/components/@modals/auth";
import Cart from "@/components/@modals/cart";
import SideNav from "@/components/nav/aside";

export const MODALS: Readonly<
   Record<"none" | "auth" | "product" | "payment" | "cart" | "sidenav", any>
> = {
   none: null,
   auth: { component: AuthModal },
   product: { component: null },
   payment: { component: null },
   cart: { component: Cart },
   sidenav: { component: SideNav }
};

type ModalType = keyof typeof MODALS;

export type ModalContextType = {
   modal: ModalType;
   setCurrentModal: (type: ModalType, CustomComponent?: any) => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export default function PopupProvider({ children }: { children: ReactNode }) {
   const [modal, setModal] = useState<ModalType>("none");

   const setCurrentModal = (type: ModalType, customPopup?: any) => {
      if (customPopup && ["product", "payment"].includes(type)) {
         MODALS[type].component = customPopup;
      }
      setModal(type);
   };

   return (
      <ModalContext.Provider value={{ modal, setCurrentModal }}>
         {children}
      </ModalContext.Provider>
   );
}

export const useModal = context(ModalContext, "useModal must be used within a ModalProvider");
