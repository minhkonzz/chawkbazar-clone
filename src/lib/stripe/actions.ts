"use server"

import { stripe } from "./config";

export const createPaymentIntent = async ({
   amount,
   currency
}: {
   amount: number,
   currency: string
}) => {
   const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      // payment_method_types: ["card"]
   });
   return paymentIntent.client_secret;
}