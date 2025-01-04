"use client"

import { forwardRef, useRouter, type ForwardedRef } from "@/configs/imports-wrapper";
import { fixDecimal } from "@/helpers/number";
import { useCart } from "@/context";
import { Bag } from "@/components/atoms/svgs";
import { Button } from "@/components/atoms";
import type { DialogProps } from "@/types/ui";
import CloseButton from "../close-button";
import withDialog from "@/hocs/with-dialog";
import CartItem from "./cart-item";
import styles from "./style.module.css";

export default withDialog(forwardRef(function CartDialog(
  { onClose, closeModal }: DialogProps,
  ref: ForwardedRef<HTMLDialogElement | null>
) {
  const router = useRouter();
  const { cart: { items, totalPrice } } = useCart()!;

  const toCheckout = () => {
    router.replace("/checkout");
    router.refresh();
  }

  return (
    <dialog
      onClose={onClose}
      ref={ref}
      className={`${styles.wrapper} top-0 bottom-0 d-flex fd-col jc-sb bg-white`}>
      <header className={`${styles.header} d-flex jc-sb at-center`}>
        <h2 className={`${styles.heading} fw-700`}>Shopping cart</h2>
        <button
          className={`${styles.closeButton} flex-center`}
          aria-label="close"
          onClick={closeModal}>
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
        <Button
          onClick={toCheckout}
          className={`
            ${styles.checkoutButton} 
            d-flex w-100pc jc-sb at-center dark-v fw-600
            ${items.length > 0 ? "" : ` ${styles.disabled}`}
        `}>
          <span className={styles.checkoutButtonText}>Proceed to checkout</span>
          <span className={`${styles.totalValue} d-flex at-center`}>
            <span className={styles.vline}></span>$
            {items.length == 0 ? 0 : fixDecimal(totalPrice, 2)}
          </span>
        </Button>
      </div>
    </dialog>
  );
}));