"use client";

import {
   type ForwardedRef,
   type MouseEvent,
   forwardRef,
   useState,
   useCallback,
   useMemo
} from "react";

import { fixDecimal } from "@/shared/helpers/number";
import type { Product } from "@/shared/types/entities";
import type { SelectedProduct } from "@/shared/types";
import type { ProductVariation } from "@/shared/types/entities";
import { useProductOptions } from "@/shared/hooks";
import Button from "@/shared/components/button";
import styles from "./styles.module.css";

interface Props {
   item: Product;
   onClose: (
      e: MouseEvent<HTMLButtonElement>,
      isClickCloseButton: boolean
   ) => void;
}

export default forwardRef(function ProductDetail(
   { item, onClose }: Props,
   ref: ForwardedRef<HTMLDivElement | null>
) {
   const {
      product,
      amount,
      color,
      size,
      errors,
      clickChangeAmount,
      onModifyingAmount,
      isEnteredAmount,
      onSelectAddon,
      handleAddToCart
   } = useProductOptions(item);

   const [productAddCart, setProductAddCart] = useState<SelectedProduct>();

   const addProductToCart = useCallback(() => {
      const addedProduct = handleAddToCart();
      setProductAddCart(addedProduct);
   }, [size, color, amount]);

   const selectAddon = (addon: ProductVariation, i: number) => {
      return () => {
         if (productAddCart) setProductAddCart(undefined);
         onSelectAddon(addon, i);
      };
   };

   const variation = useMemo(
      () =>
         product?.variations.reduce(
            (
               acc: { sizes: ProductVariation[]; colors: ProductVariation[] },
               cur: ProductVariation
            ) => {
               if (cur.attribute.slug === "color") acc.colors.push(cur);
               else if (cur.attribute.slug === "size") acc.sizes.push(cur);
               return acc;
            },
            { sizes: [], colors: [] }
         ),
      []
   );

   const errorMessage: string =
      (errors && (errors.amountErr || "" + errors.addonsErr || "")) || "";

   return (
      <div
         ref={ref}
         className={`${styles.wrapper} w-auto h-auto d-flex posab pos-center bg-white`}>
         <div className={`${styles.about} d-flex w-100pc`}>
            <button
               className={`${styles.close} circle-bd-r posab bg-white`}
               onClick={e => onClose(e, true)}>
               <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  className={styles.ic}
                  height="1em"
                  width="1em">
                  <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path>
               </svg>
            </button>
            {!!productAddCart && (
               <div className={`${styles.addedCartMessage} d-flex at-center`}>
                  <span
                     className={`${styles.addedCartIc} d-flex at-center jc-center`}>
                     <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                        className={styles.confirmIc}
                        height="1em"
                        width="1em">
                        <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm108.25 138.29l-134.4 160a16 16 0 01-12 5.71h-.27a16 16 0 01-11.89-5.3l-57.6-64a16 16 0 1123.78-21.4l45.29 50.32 122.59-145.91a16 16 0 0124.5 20.58z"></path>
                     </svg>
                  </span>
                  {`Added ${productAddCart.qty} * ${productAddCart.name} - ${productAddCart.selectedSize.value}, ${productAddCart.selectedColor.value} to cart`}
               </div>
            )}
            <h2 className={styles.name}>{product?.name}</h2>
            <p className={styles.desc}>{product?.description}</p>
            <div className={`${styles.prices} d-flex`}>
               {product.sale_price && (
                  <h2>{`$${fixDecimal(product?.sale_price, 2)}`}</h2>
               )}
               <h2>{`$${fixDecimal(product?.price, 2)}`}</h2>
            </div>
            <span className="d-b">Size</span>
            <div className={`${styles.addons} d-flex`}>
               {" "}
               {variation.sizes.map((addon: ProductVariation, i: number) => (
                  <span
                     key={i}
                     className={`
                           ${styles.addon} 
                           ${addon.attribute.slug} 
                           d-flex jc-center at-center cp
                           ${!!size && i === size.idx ? ` ${styles.selected}` : ""}`}
                     onClick={selectAddon(addon, i)}>
                     {addon.value}
                  </span>
               ))}
            </div>
            <span className="d-b">Color</span>
            <div className={`${styles.addons} d-flex`}>
               {" "}
               {variation.colors.map((addon: ProductVariation, i: number) => (
                  <span
                     key={i}
                     className={`
                           ${addon.attribute.slug} 
                           ${styles.addon} 
                           d-flex jc-center at-center cp
                           ${!!color && i === color.idx ? ` ${styles.selected}` : ""}`}
                     onClick={selectAddon(addon, i)}>
                     <span style={{ backgroundColor: addon.meta }} />
                  </span>
               ))}
            </div>
            <div className={`${styles.qty} d-flex thin-bd-r`}>
               <button
                  className={`${styles.qtyBtn} increase h-100pc fw-600`}
                  onClick={() => clickChangeAmount("DECREASE")}>
                  <svg width="10px" height="2px" viewBox="0 0 12 1.5">
                     <rect
                        data-name="Rectangle 970"
                        width="10px"
                        height="2px"
                        fill="currentColor"></rect>
                  </svg>
               </button>
               <input
                  className={`${styles.qtyValue} fw-600`}
                  onKeyDown={e => isEnteredAmount(e)}
                  value={amount}
                  onChange={e => onModifyingAmount(e.target.value)}
               />
               <button
                  className={`${styles.qtyBtn} decrease h-100pc fw-600`}
                  onClick={() => clickChangeAmount("INCREASE")}>
                  <svg
                     data-name="plus (2)"
                     width="10px"
                     height="10px"
                     viewBox="0 0 12 12">
                     <g data-name="Group 5367">
                        <path
                           data-name="Path 17138"
                           d="M6.749,5.251V0h-1.5V5.251H0v1.5H5.251V12h1.5V6.749H12v-1.5Z"
                           fill="currentColor"></path>
                     </g>
                  </svg>
               </button>
            </div>
            {!!errorMessage && (
               <p className={styles.errorMessage}>{errorMessage}</p>
            )}
            <Button
               onClick={addProductToCart}
               className={`${styles.btn} dark-v d-flex jc-center w-100pc thin-bd-r`}>
               Add to cart
            </Button>
         </div>
      </div>
   );
});
