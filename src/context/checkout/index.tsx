"use client";

import {
   useState,
   type ReactNode,
   type Dispatch,
   type SetStateAction,
   createContext,
   useContext
} from "react";
import type { OrderSubmitData } from "@/components/checkout/form/types";

type CheckoutContextType = {
   stripePaymentFormId: string;
   checkoutFormData: OrderSubmitData;
   setCheckoutFormData: Dispatch<SetStateAction<OrderSubmitData>>;
} | null;

const CheckoutContext = createContext<CheckoutContextType>(null);

export default function CheckoutProvider({
   children
}: {
   children: ReactNode;
}) {
   const stripePaymentFormId = "stripe-payment";
   const [checkoutFormData, setCheckoutFormData] = useState<OrderSubmitData>({
      firstName: "",
      lastName: "",
      address: "",
      phone: "",
      email: "",
      city: "",
      postCode: ""
   });

   return (
      <CheckoutContext.Provider
         value={{ stripePaymentFormId, checkoutFormData, setCheckoutFormData }}>
         {children}
      </CheckoutContext.Provider>
   );
}

export const useCheckoutContext = () => {
   const ctx = useContext(CheckoutContext);
   if (ctx === undefined) {
      throw new Error(
         "useCheckoutContext must be used within a CheckoutProvider"
      );
   }
   return ctx;
};
