"use client";

import {
   useState,
   forwardRef,
   type ForwardedRef,
   type ChangeEvent,
   type FormEventHandler
} from "react";

import {
   PaymentElement,
   useElements,
   useStripe
} from "@stripe/react-stripe-js";

import { useRouter } from "next/navigation";
import { useToast } from "@/context";
import { createOrder } from "@/lib/firebase/firestore/order";
import { CheckoutDetail } from "../form/types";
import type { OnCloseModal } from "@/shared/types/ui";
import Button from "@/shared/components/button";
import styles from "./styles.module.css";

type Props = {
   userId: string;
   billingDetails: CheckoutDetail;
} & OnCloseModal;

export default forwardRef(function StripePayment({
   userId,
   billingDetails,
   onClose
}: Props, 
   ref: ForwardedRef<HTMLFormElement | null>
) {
   const toast = useToast()!;
   const stripe = useStripe();
   const router = useRouter();
   const elements = useElements();
   const [processing, setProcessing] = useState(false);

   const onSubmit: FormEventHandler<HTMLFormElement> = async (
      e: ChangeEvent<HTMLFormElement>
   ) => {
      e.preventDefault();
      if (!stripe || !elements) {
         console.warn("Stripe or Elements not ready");
         return;
      }

      const res = await stripe.confirmPayment({
         elements,
         redirect: "if_required",
         confirmParams: {
            return_url: `${window.location.origin}/order-success`,
            payment_method_data: {
               billing_details: {
                  email: billingDetails.email!,
                  phone: billingDetails.phone!,
                  name: billingDetails.firstName! + billingDetails.lastName!,
                  address: {
                     city: billingDetails.city!,
                     postal_code: billingDetails.postCode!,
                     line1: billingDetails.address!
                  }
               }
            },
            shipping: {
               name: billingDetails.firstName! + billingDetails.lastName!,
               address: {
                  city: billingDetails.city!,
                  line1: billingDetails.address!,
                  postal_code: billingDetails.postCode!
               }
            }
         }
      });

      if (res.error) {
         toast("error", "Failed to create order");
         setProcessing(false);
         return;
      }
      
      billingDetails.isPaid = true;
      const orderId = await createOrder(billingDetails, userId);

      if (!orderId) {
         toast("error", "Failed to create order");
         setProcessing(false);
         return;
      } 

      const params = new URLSearchParams({
         id: orderId,
         payment_intent: res.paymentIntent.id,
         payment_intent_client_secret: res.paymentIntent.client_secret ?? ""
      });
      setProcessing(false);
      router.push("/order-success?" + params.toString());
      return;
   };

   return (
      <form
         ref={ref}
         onSubmit={onSubmit}
         className={`${styles.form} h-auto posab pos-center bg-white`}>
         <button
            className={`${styles.close} circle-bd-r posab bg-white`}
            type="button"
            onClick={(e) => onClose(e, true)}>
            <svg
               stroke="currentColor"
               fill="currentColor"
               strokeWidth="0"
               viewBox="0 0 512 512"
               className={styles.ic}
               height="1em"
               width="1em">
               <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path>
            </svg>
         </button>
         <PaymentElement />
         <Button className={`${styles.button} w-100pc`} disabled={processing} type="submit">Pay</Button>
      </form>
   );
});
