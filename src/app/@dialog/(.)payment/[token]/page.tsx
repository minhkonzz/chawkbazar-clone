"use client";

import {
  useState,
  useEffect,
  forwardRef,
  type ForwardedRef
} from "@/configs/imports-wrapper";

import type { DialogProps } from "@/types/ui";
import { getPaymentPayload } from "@/lib/stripe/actions";
import { CheckoutDetail } from "@/types";
import withDialog from "@/hocs/with-dialog";
import StripeElementsProvider from "@/lib/stripe/stripe-elements-provider";
import StripePaymentForm from "./form";
import CloseButton from "../../close-button";
import styles from "./style.module.css";

type Props = DialogProps & { params: { token: string } };

export type PaymentPayload = {
  userId: string;
  billingDetails: CheckoutDetail;
  clientSecret: string;
};

export default withDialog(
  forwardRef(function PaymentDialog(
    { onClose, closeModal, params: { token } }: Props,
    ref: ForwardedRef<HTMLDialogElement | null>
  ) {
    const [paymentPayload, setPaymentPayload] = useState<PaymentPayload>();

    useEffect(() => {
      getPaymentPayload(decodeURIComponent(token)).then(
        (payload: PaymentPayload) => {
          setPaymentPayload(payload);
        }
      );
    }, [token]);

    return (
      <dialog
        ref={ref}
        className={`${styles.wrapper} pos-center bg-white`}
        onClose={onClose}>
        <CloseButton onClick={closeModal} />
        {(!!paymentPayload && (
          <StripeElementsProvider clientSecret={paymentPayload.clientSecret}>
            <StripePaymentForm
              userId={paymentPayload.userId}
              billingDetails={paymentPayload.billingDetails}
            />
          </StripeElementsProvider>
        )) ||
          null}
      </dialog>
    );
  })
);
