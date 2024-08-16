"use client";

import { useState } from "react";
import { createOrder } from "@/lib/firebase/firestore/order";
import { useToast, useCartContext, useFirebaseUserContext } from "@/context";
import CheckoutForm from "@/components/checkout/form";
import CheckoutOrder from "@/components/checkout/order";

type OrderMetaData = {
   cod?: boolean,
   firstName?: string,
   lastName?: string,
   address?: string,
   phone?: string, 
   email?: string,
   city?: string,
   postCode?: string
};

export default function Checkout() {

   const toast = useToast()!;
   const { cart } = useCartContext()!;
   const { currentUser } = useFirebaseUserContext()!;

   const [ orderMetadata, setOrderMetadata ] = useState<OrderMetaData>({
      cod: false, 
      firstName: "",
      lastName: "",
      address: "",
      phone: "",
      email: "",
      city: "",
      postCode: ""
   });

   const makeOrder = async (paymentInstance: any) => {

      if (!currentUser) {
         toast("warning", "Please login first");
         return;
      }

      const { items } = cart;
      if (items.length === 0) {
         toast("warning", "Please add some items");
         return;
      }

      const orderId: string = await createOrder({
         firstName: orderMetadata.firstName, 
         lastName: orderMetadata.lastName,
         address: orderMetadata.address,
         phone: orderMetadata.phone,
         email: orderMetadata.email,
         city: orderMetadata.city,
         postCode: orderMetadata.postCode, 
         note: "",
         cartItems: items,
         shipFee: 2.99,
         payment: {
            type: paymentInstance ? "pay_online" : "cash_on_delivery",
            isPaid: !!paymentInstance
         }
      }, currentUser?.user.uid);

      if (!orderId) {
         toast("error", "Failed to create order");
         return;
      }
   }

   return (
      <>
         <CheckoutForm {...{
            orderMetadata,
            setOrderMetadata,
            makeOrder
         }} />
         <CheckoutOrder {...{
            createOrder: makeOrder,
            isOnlinePaySelected: orderMetadata.cod,
            setIsOnlinePaySelected: setOrderMetadata,
            cart
         }} />
      </>
   );
}