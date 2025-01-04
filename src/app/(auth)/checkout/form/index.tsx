"use client";

import { useState, useRouter } from "@/configs/imports-wrapper";
import { useToast, useCart, useFirebaseUser } from "@/context";
import { constants } from "@/configs";
import { useFormValidation } from "@/hooks";
import { createOrder } from "@/lib/firebase/firestore/order";
import { AnimatedSpinnerIcon } from "@/components/atoms/animated-icons";
import { TextInput, Button } from "@/components/atoms";
import type { OrderSubmitData } from "@/types";
import { createPaymentIntent } from "@/lib/stripe/actions";
import styles from "./style.module.css";
import PaymentOptions from "../payment-options";

const { regex } = constants;

export default function CheckoutForm() {
  const toast = useToast()!;
  const router = useRouter();
  const { cart: { items, totalPrice } } = useCart()!;
  const { user } = useFirebaseUser()!;
  const [processing, setProcessing] = useState<boolean>(false);
  const [cod, setCod] = useState<boolean>(true);

  const [checkoutFormData, setCheckoutFormData] = useState<OrderSubmitData>({
    firstName: user?.customClaims!.firstName || "",
    lastName: user?.customClaims!.lastName || "",
    address: "",
    phone: user?.customClaims!.phoneNumber || "",
    email: user?.customClaims!.email || "",
    city: "",
    postCode: ""
  });

  const makeOrder = async () => {
    if (!user) {
      toast("warning", "Please login first");
      return;
    }

    if (items.length === 0) {
      toast("warning", "Please add some items");
      return;
    }

    setProcessing(true);

    const billingDetails = {
      ...checkoutFormData,
      cod,
      cartItems: items,
      shipFee: 2.99,
      isPaid: false
    };

    if (!cod) {
      // user select online payment
      const paymentToken = await createPaymentIntent({
        amount: Math.round(totalPrice * 100),
        currency: "USD",
        userId: user.uid,
        billingDetails
      });
      if (!paymentToken) {
        toast("error", "Failed to create payment intent");
        setProcessing(false);
        return;
      }
      router.push(`/payment/${encodeURIComponent(paymentToken)}`, { scroll: false });
      return;
    }

    const orderId: string = await createOrder(billingDetails, user.uid);

    if (!orderId) {
      toast("error", "Failed to create order");
      return;
    }

    router.replace(`/orders/${orderId}`);
  };

  const { errors, handleAfterValidate: placeOrder } = useFormValidation(
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
      <div className={`${styles.form} d-flex fd-col`}>
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
          disabled={processing}
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
