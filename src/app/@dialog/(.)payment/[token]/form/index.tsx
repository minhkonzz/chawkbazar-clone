"use client";

import { 
  useState, 
  useRouter, 
  type ReactChangeEvent, 
  type ReactFormEventHandler 
} from "@/configs/imports-wrapper";

import {
  PaymentElement,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";

import { useToast } from "@/context";
import { createOrder } from "@/lib/firebase/firestore/order";
import type { CheckoutDetail } from "@/types";
import { Button } from "@/components/atoms";
import styles from "./style.module.css";

interface Props {
  userId: string;
  billingDetails: CheckoutDetail;
}

export default function PaymentForm(
  { userId, billingDetails }: Props
) {
  const toast = useToast()!;
  const stripe = useStripe();
  const router = useRouter();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const onSubmit: ReactFormEventHandler<HTMLFormElement> = async (
    e: ReactChangeEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setProcessing(true);
    
    if (!stripe || !elements) {
      console.warn("Stripe or Elements not ready");
      return;
    }

    const res = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        return_url: `${window.location.origin}/orders`,
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
      payment_intent: res.paymentIntent.id,
      payment_intent_client_secret: res.paymentIntent.client_secret ?? ""
    });

    setProcessing(false);
    router.replace(`/orders/${orderId}?` + params.toString());
    router.refresh();
    return;
  };

  return (
    <form onSubmit={onSubmit}>
      <PaymentElement />
      <Button
        className={`${styles.button} w-100pc`}
        disabled={processing}
        type="submit">
        Pay
      </Button>
    </form>
  );
};
