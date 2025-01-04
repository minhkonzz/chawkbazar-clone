"use client"

import { useRouter } from "@/configs/imports-wrapper";
import { useCart } from "@/context";
import Banner from "@/components/organisms/banner";
import CheckoutForm from "./form";
import CheckoutOrder from "./order";
import styles from "./page.module.css";

export default function CheckoutMain() {
  const router = useRouter();
  const { cart: { totalPrice } } = useCart();
  
  if (!totalPrice) {
    // user didn't add products to cart
    router.replace("/checkout-unavaliable");
    return; // still need return here to prevent flash content because checkout page is still rendered before actually redirect
  }

  return (
    <Banner title="Checkout">
      <div className={`${styles.wrapper} d-flex mx-auto`}>
        <CheckoutForm />
        <CheckoutOrder />
      </div>
    </Banner>
  );
}