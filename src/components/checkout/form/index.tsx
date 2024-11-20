"use client";

import { constants } from "@/configs";
import { useInputsValidation } from "@/shared/hooks";
import type { OrderSubmitData } from "./types";
import { useState } from "react";
import { createOrder } from "@/lib/firebase/firestore/order";
import { useToast, useCartContext, useFirebaseUser } from "@/context";
import { useRouter } from "next/navigation";
import { AnimatedSpinnerIcon } from "@/shared/components/animated-icons";
import styles from "./styles.module.css";
import TextInput from "@/shared/components/text-input";
import Button from "@/shared/components/button";

const { regex } = constants;

export default function CheckoutForm() {
   const toast = useToast()!;
   const router = useRouter();
   const { cart } = useCartContext()!;
   const { user } = useFirebaseUser()!;
   const [processing, setProcessing] = useState<boolean>(false);

   const [orderMetadata, setOrderMetadata] = useState<OrderSubmitData>({
      cod: false,
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

      const orderId: string = await createOrder(
         {
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
               type: orderMetadata.cod ? "pay_online" : "cash_on_delivery",
               isPaid: false
            }
         },
         user.uid
      );

      if (!orderId) {
         toast("error", "Failed to create order");
         return;
      }

      router.push(`/orders/${orderId}?order_success=true`);
   };

   const { errors, handleAfterValidate: placeOrder } = useInputsValidation(
      [
         {
            title: "First name",
            value: orderMetadata.firstName,
            pattern: regex.NAME_REGEX,
            errorIdentifier: "firstNameError",
            errorMessage: "Chỉ được phép ký tự là chữ"
         },
         {
            title: "Last name",
            value: orderMetadata.lastName,
            pattern: regex.NAME_REGEX,
            errorIdentifier: "lastNameError",
            errorMessage: "Chỉ được phép ký tự là chữ"
         },
         {
            title: "Address",
            value: orderMetadata.address,
            pattern: regex.ALPHANUMERIC_REGEX,
            errorIdentifier: "addressError",
            errorMessage: "Chỉ được phép ký tự là chữ hoặc số"
         },
         {
            title: "Phone",
            value: orderMetadata.phone,
            pattern: regex.NUMERIC_REGEX,
            errorIdentifier: "phoneError",
            errorMessage: "Chỉ được phép ký tự là số"
         },
         {
            title: "Email",
            value: orderMetadata.email,
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
                        setOrderMetadata({
                           ...orderMetadata,
                           firstName: e.target.value
                        })
                     }
                     inputValue={orderMetadata.firstName}
                     errorMessage={(!!errors && errors["firstNameError"]) || ""}
                  />
               </div>
               <div className={styles.inpWrapper}>
                  <TextInput
                     label="Last Name *"
                     placeholder="Enter your last name"
                     inputValue={orderMetadata.lastName}
                     onChange={e =>
                        setOrderMetadata({
                           ...orderMetadata,
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
                  inputValue={orderMetadata.address}
                  onChange={e =>
                     setOrderMetadata({
                        ...orderMetadata,
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
                     inputValue={orderMetadata.phone}
                     onChange={e =>
                        setOrderMetadata({
                           ...orderMetadata,
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
                     inputValue={orderMetadata.email}
                     onChange={e =>
                        setOrderMetadata({
                           ...orderMetadata,
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
                     inputValue={orderMetadata.city}
                     onChange={e =>
                        setOrderMetadata({
                           ...orderMetadata,
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
                     inputValue={orderMetadata.postCode}
                     onChange={e =>
                        setOrderMetadata({
                           ...orderMetadata,
                           postCode: e.target.value
                        })
                     }
                     errorMessage=""
                  />
               </div>
            </div>
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
