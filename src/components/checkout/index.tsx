"use client";

import CheckoutForm from "@/components/checkout/form";
import CheckoutOrder from "@/components/checkout/order";

export default function Checkout() {
   return (
      <>
         <CheckoutForm />
         <CheckoutOrder />
      </>
   );
}
