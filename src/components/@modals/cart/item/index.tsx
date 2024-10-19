"use client";

import { env } from "@/configs";
import { useCartContext } from "@/context";
import { constants } from "@/configs";
import { fixDecimal } from "@/shared/helpers/number";
import { SelectedProduct } from "@/shared/types";
import styles from "./styles.module.css";
import Image from "next/image";

const { INCREASE_ONCE, DECREASE_ONCE } = constants;

export default function CartItem({ cartItem }: { cartItem: SelectedProduct }) {

   const { 
      name, 
      qty,
      image,
      lastPrice,
      selectedSize, 
      selectedColor 
   } = cartItem;

   const { adjustAmount, removeFromCart } = useCartContext()!;

   const changeAmount = (type: number) => {
      adjustAmount({ itemAdjust: cartItem, type });
   };

   return (
      <div className={`${styles.container} d-flex at-center`}>
         <div className={`${styles.imageWrapper} o-h cp posrel`}>
            <Image 
               src={`${env.PRODUCT_IMAGE_STORAGE}${image.p}`}
               width={128}
               height={166}
               objectFit="cover"
               alt="product-image"
            />
            <span className={`${styles.imageBackdrop} d-flex jc-center at-center posab top-0 left-0 bottom-0 right-0`} onClick={() => removeFromCart(cartItem)}>
               <svg 
                  stroke="currentColor" 
                  fill="currentColor" 
                  strokeWidth="0" 
                  viewBox="0 0 512 512" 
                  className={styles.removeIc} height="1em" width="1em">
                  <path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm52.7 283.3L256 278.6l-52.7 52.7c-6.2 6.2-16.4 6.2-22.6 0-3.1-3.1-4.7-7.2-4.7-11.3 0-4.1 1.6-8.2 4.7-11.3l52.7-52.7-52.7-52.7c-3.1-3.1-4.7-7.2-4.7-11.3 0-4.1 1.6-8.2 4.7-11.3 6.2-6.2 16.4-6.2 22.6 0l52.7 52.7 52.7-52.7c6.2-6.2 16.4-6.2 22.6 0 6.2 6.2 6.2 16.4 0 22.6L278.6 256l52.7 52.7c6.2 6.2 6.2 16.4 0 22.6-6.2 6.3-16.4 6.3-22.6 0z"></path>
               </svg>
            </span>
         </div>
         <div className="d-flex fd-col">
            <a href="#" className={styles.name}>{`${name} - ${selectedSize.value}, ${selectedColor.value}`}</a>
            <span className={styles.unitPrice}>Unit price: ${fixDecimal(lastPrice, 2)}</span>
            <div className="d-flex jc-sb at-end">
               <div className={`${styles.quantityControl} d-flex at-center o-h`}>
                  <button 
                     onClick={() => changeAmount(DECREASE_ONCE)}
                     className={`${styles.quantityButton} d-flex jc-center at-center h-100pc text-white`}>
                     <svg 
                        width="10px" 
                        height="2px" 
                        viewBox="0 0 12 1.5">
                        <rect data-name="Rectangle 970" width="10px" height="2px" fill="currentColor"></rect>
                     </svg>
                  </button>
                  <span className={`${styles.quantityText} d-flex jc-center at-center h-100pc text-white fw-600`}>{qty}</span>
                  <button
                     onClick={() => changeAmount(INCREASE_ONCE)} 
                     className={`${styles.quantityButton} d-flex jc-center at-center h-100pc text-white`}>
                     <svg 
                        data-name="plus (2)" 
                        width="10px" 
                        height="10px" 
                        viewBox="0 0 12 12">
                        <g data-name="Group 5367">
                           <path data-name="Path 17138" d="M6.749,5.251V0h-1.5V5.251H0v1.5H5.251V12h1.5V6.749H12v-1.5Z" fill="currentColor"></path>
                        </g>
                     </svg>
                  </button>
               </div>
               <span className={`${styles.total} fw-600`}>${fixDecimal(lastPrice * qty, 2)}</span>
            </div>
         </div>
      </div>
   );
};