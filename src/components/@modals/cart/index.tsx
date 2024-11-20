"use client";

import { type ForwardedRef, type MouseEvent, forwardRef } from "react";
import { fixDecimal } from "@/shared/helpers/number";
import { useCartContext } from "@/context";
import Link from "next/link";
import CartItem from "./item";
import styles from "./styles.module.css";
import BagSvg from "../../bag";

interface Props {
   onClose: (
      e: MouseEvent<HTMLButtonElement>,
      isClickCloseButton: boolean
   ) => void;
}

export default forwardRef(function Cart(
   { onClose }: Props,
   ref: ForwardedRef<HTMLDivElement | null>
) {
   const { cart } = useCartContext()!;
   const { items, totalPrice } = cart;

   return (
      <div
         {...{ ref }}
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
                  <BagSvg />
                  <p className="blur fw-600">
                     Không có sản phẩm nào trong giỏ hàng
                  </p>
               </div>
            )}
         </main>
         <div className={styles.bottom}>
            <Link
               href="/checkout"
               className={`
                  ${styles.checkoutButton} 
                  d-flex jc-sb at-center dark-v
                  ${items.length > 0 ? "" : ` ${styles.disabled}`}
               `}>
               <span className={styles.checkoutButtonText}>
                  Proceed to checkout
               </span>
               <span className={`${styles.totalValue} d-flex at-center`}>
                  <span className={styles.vline}></span>$
                  {items.length === 0 ? 0 : fixDecimal(totalPrice, 2)}
               </span>
            </Link>
         </div>
      </div>
   );
});
