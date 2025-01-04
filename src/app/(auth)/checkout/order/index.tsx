"use client";

import { NextImage } from "@/configs/imports-wrapper";
import { fixDecimal } from "@/helpers/number";
import type { CartItem } from "@/types";
import { useCart } from "@/context/cart";
import styles from "./style.module.css";

export default function CheckoutOrder() {
  const { cart: { items, totalPrice } } = useCart()!;
  const shipFee: number = 2.99;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Your order</h2>
      <div className={`${styles.header} d-flex jc-sb fw-600`}>
        <span>Product</span>
        <span>Subtotals</span>
      </div>
      {items.map((item: CartItem, index: number) => (
        <div className={`${styles.product} d-flex at-center jc-sb`} key={index}>
          <div className="d-flex at-center">
            <div className={`${styles.imgWrapper} o-h`}>
              <NextImage
                width={62}
                height={62}
                className={styles.img}
                src={item.images.pm!}
                alt="order-product"
              />
            </div>
            <h6 className={styles.productText}>
              {`${item?.name} - ${item?.selectedVariation.size}, ${item?.selectedVariation.color?.name}`}
            </h6>
          </div>
          <span className={styles.productText}>
            ${`${fixDecimal(item?.lastPrice, 2)}`}
          </span>
        </div>
      ))}
      <div className={styles.ck}>
        <span>Shipping</span>
        <span>${shipFee}</span>
      </div>
      <div className={styles.ck}>
        <span>Total</span>
        <span>${`${fixDecimal(totalPrice + shipFee, 2)}`}</span>
      </div>
    </div>
  );
}
