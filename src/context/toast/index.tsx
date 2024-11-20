"use client";

import { type ReactNode, useState, createContext, useContext } from "react";

import { constants } from "@/configs";
import Toast from "@/shared/components/toast";

type MessageType = "success" | "error" | "warning";

export type Message = {
   type: MessageType;
   message: string;
   duration?: number;
};

type ToastContextType = (type?: MessageType, message?: string) => void;

const ToastContext = createContext<ToastContextType | null>(null);

export default function ToastProvider({ children }: { children: ReactNode }) {
   const [_toast, setToast] = useState<Message | null>();

   const toast = (type?: MessageType, message?: string) => {
      if (!type || !message) {
         setToast(null);
         return;
      }
      setToast({
         type,
         message,
         duration: constants.TOAST_DURATION || 5000 // default duration is 5 seconds
      });
   };

   return (
      <ToastContext.Provider value={toast}>
         {children}
         {_toast && <Toast {..._toast} />}
      </ToastContext.Provider>
   );
}

export const useToast = () => useContext(ToastContext);
