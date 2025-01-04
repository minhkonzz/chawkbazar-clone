"use server";

import { stripe } from "./config";
import { buildJWE, decodeJWE } from "@/helpers/token";
import type { CheckoutDetail } from "@/types";
import type { PaymentPayload } from "@/app/@dialog/(.)payment/[token]/page";

export const createPaymentIntent = async ({
  amount,
  currency,
  userId,
  billingDetails
}: {
  amount: number;
  currency: string;
  userId: string;
  billingDetails: CheckoutDetail
}) => {
  const { client_secret } = await stripe.paymentIntents.create({
    amount,
    currency
    // payment_method_types: ["card"]
  });
  if (!client_secret) return "";
  
  return await buildJWE({
    userId,
    billingDetails,
    clientSecret: client_secret
  });
};

export const getPaymentPayload = async (paymentToken: string) => {
  return decodeJWE<PaymentPayload>(paymentToken);
}
