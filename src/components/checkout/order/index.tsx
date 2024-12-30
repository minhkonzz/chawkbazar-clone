"use client"

import { fixDecimal } from "@/shared/helpers/number";
import type { SelectedProduct } from "@/shared/types";
import { useCartContext } from "@/context/cart";
import { env } from "@/configs";
import { constants } from "@/configs";
import styles from "./styles.module.css";
import Image from "next/image";

const { products } = constants.storageEndpoints;

export default function CheckoutOrderDetail() {
   const { cart: { items, totalPrice }} = useCartContext()!;
   const shipFee: number = 2.99;

   return (
      <div className={styles.wrapper}>
         <h2 className={styles.title}>Your order</h2>
         <div className={`${styles.header} d-flex jc-sb fw-600`}>
            <span>Product</span>
            <span>Subtotals</span>
         </div>
         {items.map((item: SelectedProduct, index: number) => (
            <div
               className={`${styles.product} d-flex at-center jc-sb`}
               key={index}>
               <div className="d-flex at-center">
                  <Image
                     width={62}
                     height={62}
                     src={`${env.FIREBASE_STORAGE_URL + products}${item.image.p}`}
                     alt="order-product"
                  />
                  <h6
                     className={
                        styles.productText
                     }>{`${item?.name} - ${item?.selectedVariation.size}, ${item?.selectedVariation.color?.name}`}</h6>
               </div>
               <span className={styles.productText}>
                  ${`${fixDecimal(item?.lastPrice, 2)}`}
               </span>
            </div>
         ))}
         <div className={styles.ck}>
            <span>Shipping</span>
            <span>Free</span>
         </div>
         <div className={styles.ck}>
            <span>Total</span>
            <span>${`${fixDecimal(totalPrice + shipFee, 2)}`}</span>
         </div>
      </div>
   );
}
