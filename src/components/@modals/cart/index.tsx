"use client"

import { type ForwardedRef, useCallback, forwardRef } from "react";
import { fixDecimal } from "@/shared/helpers/number";
import { useCartContext, useModalContext } from "@/context";
import { useRouter } from "next/navigation";
import { Bag } from "@/components/@svgs";
import type { OnCloseModal } from "@/shared/types/ui";
import CartItem from "./item";
import styles from "./styles.module.css";

export default forwardRef(function Cart(
   { onClose }: OnCloseModal,
   ref: ForwardedRef<HTMLDivElement | null>
) {
   const router = useRouter();
   const { setCurrentModal } = useModalContext()!;
   const { cart: { items, totalPrice }} = useCartContext()!;

   const toCheckout = useCallback(() => {
      setCurrentModal("none");
      router.push("/checkout");
   }, []);

   return (
      <div
         ref={ref}
         className={`${styles.wrapper} d-flex fd-col jc-sb posab right-0 top-0 bottom-0 bg-white`}>
         <header className={`${styles.header} d-flex jc-sb at-center`}>
            <h2 className={`${styles.heading} fw-700`}>Shopping cart</h2>
            <button
               className={`${styles.closeButton} d-flex jc-center at-center`}
               aria-label="close"
               onClick={e => onClose(e, true)}>
               <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  className="text-black mt-1 md:mt-0.5"
                  height="1em"
                  width="1em">
                  <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path>
               </svg>
            </button>
         </header>
         <main className={`${styles.items} h-100pc`}>
            {(items.length > 0 &&
               items.map((item, i: number) => (
                  <CartItem key={i} cartItem={item} />
               ))) || (
               <div className="d-flex fd-col w-100pc h-100pc jc-sa at-center">
                  <Bag />
                  <p className="blur fw-600">
                     {"You don't have any product in cart"}
                  </p>
               </div>
            )}
         </main>
         <div className={styles.bottom}>
            <button
               onClick={toCheckout}
               className={`
                  ${styles.checkoutButton} 
                  d-flex w-100pc jc-sb at-center dark-v
                  ${items.length > 0 ? "" : ` ${styles.disabled}`}
               `}>
               <span className={styles.checkoutButtonText}>
                  Proceed to checkout
               </span>
               <span className={`${styles.totalValue} d-flex at-center`}>
                  <span className={styles.vline}></span>$
                  {items.length === 0 ? 0 : fixDecimal(totalPrice, 2)}
               </span>
            </button>
         </div>
      </div>
   );
});
