"use client";

import { forwardRef, useState, type MouseEvent, ForwardedRef } from "react";
import { constants } from "@/configs";
import { useInputsValidation } from "@/shared/hooks";
import { createOrder } from "@/lib/firebase/firestore/order";
import { useRouter } from "next/navigation";
import { AnimatedSpinnerIcon } from "@/shared/components/animated-icons";
import type { OrderSubmitData } from "@/components/checkout/form/types";
import type { OnCloseModal } from "@/shared/types/ui";
import { createPaymentIntent } from "@/lib/stripe/actions";
import StripeElementsProvider from "@/lib/stripe/stripe-elements-provider";
import StripePaymentForm from "../stripe-payment";
import styles from "./styles.module.css";
import TextInput from "@/shared/components/text-input";
import Button from "@/shared/components/button";
import PaymentOptions from "../payment-options";

import {
   useToast,
   useCartContext,
   useFirebaseUser,
   useModalContext
} from "@/context";

const { regex } = constants;

export default function CheckoutForm() {
   const toast = useToast()!;
   const router = useRouter();
   const { setCurrentModal } = useModalContext()!;
   const { cart } = useCartContext()!;
   const { user } = useFirebaseUser()!;
   const [processing, setProcessing] = useState<boolean>(false);
   const [cod, setCod] = useState<boolean>(true);

   const [checkoutFormData, setCheckoutFormData] = useState<OrderSubmitData>({
      firstName: "",
      lastName: "",
      address: "",
      phone: "",
      email: "",
      city: "",
      postCode: ""
   });

   const makeOrder = async () => {
      if (!user) {
         toast("warning", "Please login first");
         return;
      }

      const { items } = cart;
      if (items.length === 0) {
         toast("warning", "Please add some items");
         return;
      }

      setProcessing(true);

      const billingDetails = {
         firstName: checkoutFormData.firstName,
         lastName: checkoutFormData.lastName,
         address: checkoutFormData.address,
         phone: checkoutFormData.phone,
         email: checkoutFormData.email,
         city: checkoutFormData.city,
         postCode: checkoutFormData.postCode,
         cod,
         cartItems: items,
         shipFee: 2.99,
         isPaid: false
      };

      if (!cod) {
         // user select online payment
         const clientSecret = await createPaymentIntent({
            amount: cart.totalPrice * 100,
            currency: "USD"
         });
         if (!clientSecret) {
            toast("error", "Failed to create payment intent");
            setProcessing(false);
            return;
         }
         const _PaymentModal = forwardRef(function PaymentModal(
            { onClose }: OnCloseModal,
            ref: ForwardedRef<HTMLFormElement | null>
         ) {
            return (
               <StripeElementsProvider clientSecret={clientSecret}>
                  <StripePaymentForm
                     userId={user.uid}
                     billingDetails={billingDetails} 
                     onClose={onClose} 
                     ref={ref} />
               </StripeElementsProvider>
            );
         });
         setCurrentModal("payment", _PaymentModal);
         return;
      }

      const orderId: string = await createOrder(billingDetails, user.uid);

      if (!orderId) {
         toast("error", "Failed to create order");
         return;
      }

      router.push(`/order-success?id=${orderId}`);
   };

   const { errors, handleAfterValidate: placeOrder } = useInputsValidation(
      [
         {
            title: "First name",
            value: checkoutFormData.firstName,
            pattern: regex.NAME_REGEX,
            errorIdentifier: "firstNameError",
            errorMessage: "Chỉ được phép ký tự là chữ"
         },
         {
            title: "Last name",
            value: checkoutFormData.lastName,
            pattern: regex.NAME_REGEX,
            errorIdentifier: "lastNameError",
            errorMessage: "Chỉ được phép ký tự là chữ"
         },
         {
            title: "Address",
            value: checkoutFormData.address,
            pattern: regex.ALPHANUMERIC_REGEX,
            errorIdentifier: "addressError",
            errorMessage: "Chỉ được phép ký tự là chữ hoặc số"
         },
         {
            title: "Phone",
            value: checkoutFormData.phone,
            pattern: regex.NUMERIC_REGEX,
            errorIdentifier: "phoneError",
            errorMessage: "Chỉ được phép ký tự là số"
         },
         {
            title: "Email",
            value: checkoutFormData.email,
            pattern: regex.EMAIL_REGEX,
            errorIdentifier: "emailError",
            errorMessage: "Email không hợp lệ1"
         }
      ],
      makeOrder
   );

   return (
      <div className={styles.wrapper}>
         <h2 className={styles.heading}>Shipping Address</h2>
         <div>
            <div className={`${styles.dinp} d-flex`}>
               <div className={styles.inpWrapper}>
                  <TextInput
                     label="First Name *"
                     placeholder="Enter your first name"
                     onChange={e =>
                        setCheckoutFormData({
                           ...checkoutFormData,
                           firstName: e.target.value
                        })
                     }
                     inputValue={checkoutFormData.firstName}
                     errorMessage={(!!errors && errors["firstNameError"]) || ""}
                  />
               </div>
               <div className={styles.inpWrapper}>
                  <TextInput
                     label="Last Name *"
                     placeholder="Enter your last name"
                     inputValue={checkoutFormData.lastName}
                     onChange={e =>
                        setCheckoutFormData({
                           ...checkoutFormData,
                           lastName: e.target.value
                        })
                     }
                     errorMessage={(!!errors && errors["lastNameError"]) || ""}
                  />
               </div>
            </div>
            <div className={styles.dinp}>
               <TextInput
                  label="Address *"
                  placeholder="Enter your address"
                  inputValue={checkoutFormData.address}
                  onChange={e =>
                     setCheckoutFormData({
                        ...checkoutFormData,
                        address: e.target.value
                     })
                  }
                  errorMessage={(!!errors && errors["addressError"]) || ""}
               />
            </div>
            <div className={`${styles.dinp} d-flex`}>
               <div className={styles.inpWrapper}>
                  <TextInput
                     label="Phone / mobile *"
                     placeholder="Enter your phone"
                     inputValue={checkoutFormData.phone}
                     onChange={e =>
                        setCheckoutFormData({
                           ...checkoutFormData,
                           phone: e.target.value
                        })
                     }
                     errorMessage={(!!errors && errors["phoneError"]) || ""}
                  />
               </div>
               <div className={styles.inpWrapper}>
                  <TextInput
                     label="Email *"
                     placeholder="Enter your email"
                     inputValue={checkoutFormData.email}
                     onChange={e =>
                        setCheckoutFormData({
                           ...checkoutFormData,
                           email: e.target.value
                        })
                     }
                     errorMessage={(!!errors && errors["emailError"]) || ""}
                  />
               </div>
            </div>
            <div className={`${styles.dinp} d-flex`}>
               <div className={styles.inpWrapper}>
                  <TextInput
                     label="City / Town"
                     placeholder="Enter city / town"
                     inputValue={checkoutFormData.city}
                     onChange={e =>
                        setCheckoutFormData({
                           ...checkoutFormData,
                           city: e.target.value
                        })
                     }
                     errorMessage=""
                  />
               </div>
               <div className={styles.inpWrapper}>
                  <TextInput
                     label="Postcode"
                     placeholder="Enter postcode"
                     inputValue={checkoutFormData.postCode}
                     onChange={e =>
                        setCheckoutFormData({
                           ...checkoutFormData,
                           postCode: e.target.value
                        })
                     }
                     errorMessage=""
                  />
               </div>
            </div>
            <PaymentOptions cod={cod} setCod={setCod} />
            <Button
               type="submit"
               className={`${styles[(processing && "btnLoading") || "btn"]} fw-600 posrel`}
               onClick={placeOrder}>
               {(processing && (
                  <>
                     <div className="posab">
                        <AnimatedSpinnerIcon size={22} thickness={3} />
                     </div>
                     Placing order
                  </>
               )) || <>Place order</>}
            </Button>
         </div>
      </div>
   );
}
