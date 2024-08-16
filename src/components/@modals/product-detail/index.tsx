"use client";

import { ForwardedRef, forwardRef } from "react";
import { env } from "@/configs";
import { fixDecimal } from "@/shared/helpers/number";
import { useProductOptions } from "@/shared/hooks";
import Image from "next/image";
import styles from "./styles.module.css";

interface Props {
   item: any;
   onClose: (e: any, isClickCloseButton: boolean) => void;
}

export default forwardRef(function ProductDetail({ item, onClose }: Props, ref: ForwardedRef<HTMLDivElement | null>) {

   const {
      product,
      amount, 
      color, 
      size,
      errors,
      inDecreaseAmount, 
      onModifyingAmount, 
      isEnteredAmount,
      onSelectAddon,
      handleAddToCart
   } = useProductOptions(item);

   return (
      <div {...{ref}} className={`${styles.container} d-flex posab pos-center`}>
         <Image 
            width={430}
            height={558}
            alt="product-image"
            src={`${env.PRODUCT_IMAGE_STORAGE}${product.image.pm}`}
         />
         <div className={`${styles.about} posrel`}>
            <button className={`${styles.close} circle-bd-r posab right-1d5pc top-n2pc`} onClick={e => onClose(e, true)}>x</button>
            <h2 className={styles.name}>{product?.name}</h2>
            <p className={styles.desc}>{product?.description}</p>
            <div className={`${styles.prices} d-flex`}>
               { product.sale_price && <h2>{`$${fixDecimal(product?.sale_price, 2)}`}</h2> }
               <h2>{`$${fixDecimal(product?.price, 2)}`}</h2>
            </div>
            <span className="d-b">Size</span>
            <div className={`${styles.addons} d-flex`}> {
               product?.variations
               .filter((variation: any) => variation.attribute.slug === "size")
               .map((addon: any, index: number) => (
                  <span 
                     style={{ border: !!size && index === size.sizeSelectedIndex ? "1px solid black" : "0.5px solid rgb(212, 212, 212)"}}
                     key={index} 
                     className={`${addon.attribute.slug} ${styles.addon} d-flex jc-center at-center`}
                     onClick={() => onSelectAddon(addon, index)}>
                     {addon.value}
                  </span>
               ))}
            </div>
            <span className="d-b">Color</span>
            <div className={`${styles.addons} d-flex`}> {
               product?.variations
               .filter((variation: any) => variation.attribute.slug === "color")
               .map((addon: any, index: number) => (
                  <span 
                     style={{ border: !!color && index === color.colorSelectedIndex ? "1px solid black" : "0.5px solid rgb(212, 212, 212)"}}
                     key={index} 
                     className={`${addon.attribute.slug} ${styles.addon} d-flex jc-center at-center`}
                     onClick={() => onSelectAddon(addon, index)}>
                     <span className="thin-bd-r" style={{ backgroundColor: addon.meta }}/>
                  </span>
               )) }
            </div>
            <div className="d-flex jc-sb w-100pc">
               <div className={`${styles.qty} d-flex thin-bd-r`}>
                  <button 
                     className={`${styles.qtyBtn} increase h-100pc fw-600`} 
                     onClick={() => inDecreaseAmount("DECREASE")}>
                     <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="10px" 
                        height="2px" 
                        viewBox="0 0 12 1.5">
                        <rect data-name="Rectangle 970" width="10px" height="2px" fill="currentColor"></rect>
                     </svg>
                  </button>
                  <input 
                     className={`${styles.qtyValue} fw-600`} 
                     onKeyDown={(e) => isEnteredAmount(e)} 
                     value={amount} 
                     onChange={(e) => onModifyingAmount(e.target.value) } 
                  />
                  <button 
                     className={`${styles.qtyBtn} decrease h-100pc fw-600`} 
                     onClick={() => inDecreaseAmount("INCREASE")}>
                     <svg 
                        data-name="plus (2)" 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="10px" 
                        height="10px" 
                        viewBox="0 0 12 12">
                        <g data-name="Group 5367">
                           <path data-name="Path 17138" d="M6.749,5.251V0h-1.5V5.251H0v1.5H5.251V12h1.5V6.749H12v-1.5Z" fill="currentColor"></path>
                        </g>
                     </svg>
                  </button>
               </div>
               <button 
                  className={`${styles.addCart} thin-bd-r fw-600`} 
                  onClick={handleAddToCart}>
                  Add to cart
               </button>
            </div>
            { !!errors && !!errors.amountError && <p className={styles.errorMessage}>{errors.amountError}</p> }
            <button className={`${styles.viewBtn} dark-v d-flex jc-center w-100pc thin-bd-r`}>View details</button>
         </div>
      </div>
   );
});