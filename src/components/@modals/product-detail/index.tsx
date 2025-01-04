"use client";

import {
   type ForwardedRef,
   forwardRef,
   useState,
   useCallback,
   useMemo
} from "react";

import { fixDecimal } from "@/shared/helpers/number";
import type { Product } from "@/shared/types/entities";
import type { OnCloseModal } from "@/shared/types/ui";
import type { SelectedProduct } from "@/shared/types";
import { useProductOptions } from "@/shared/hooks";
import CloseButton from "../close-button";
import DropdownMenu from "@/shared/components/dropdown-menu";
import Button from "@/shared/components/button";
import styles from "./styles.module.css";

type Props = { item: Product } & OnCloseModal;

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

   const selectAddon = (addon: string | { hex_code: string; name: string }) => {
      if (productAddCart) setProductAddCart(undefined);
      onSelectAddon(addon);
   };

   const changeAmount = useCallback((act: "INCREASE" | "DECREASE") => () => {
      clickChangeAmount(act);
   }, [amount]);
   
   const variation = useMemo(() => 
      product?.variations.reduce((acc: any, cur) => {
         const size = cur.size;
         const color = cur.color;

         const ks = `s-${size}`;
         if (!acc.sizes[ks]) {
            acc.sizes[ks] = {
               id: ks,
               label: `Size - ${size}`,
               value: size
            }
         }
         const kc = `color-${color.name}`;
         if (!acc.colors[kc]) {
            acc.colors[kc] = {
               id: kc,
               label: `Color - ${color.name}`,
               value: JSON.stringify(color)
            }
         }
         
         return acc;
      }, { sizes: {}, colors: {} })
   , []);

   const errorMessage: string =
      (errors && (errors.amountErr || "" + errors.addonsErr || "")) || "";

   return (
      <div
         ref={ref}
         className={`${styles.wrapper} w-auto h-auto d-flex posab pos-center bg-white`}>
         <div className={`${styles.about} d-flex w-100pc`}>
            <CloseButton 
               className={styles.close}
               onClick={e => onClose(e, true)}
            />
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
                  {`Added ${productAddCart.qty} * ${productAddCart.name} - ${productAddCart.selectedVariation.size}, ${productAddCart.selectedVariation.color?.name} to cart`}
               </div>
            )}
            <h2 className={styles.name}>{product?.name}</h2>
            <p className={styles.desc}>{product?.description}</p>
            <div className={`${styles.prices} d-flex`}>
               {product.sale?.lastPrice && (
                  <h2>{`$${fixDecimal(product.sale.lastPrice, 2)}`}</h2>
               )}
               <h2>{`$${fixDecimal(product?.price, 2)}`}</h2>
            </div>
            <div className={`${styles.addons} d-flex at-center`}>
               <DropdownMenu 
                  className={styles.addon}
                  title="Select size" 
                  data={Object.values(variation.sizes)} 
                  onChange={selected => selectAddon(selected.value)} 
               />
               <DropdownMenu 
                  className={styles.addon}
                  title="Select color" 
                  data={Object.values(variation.colors)} 
                  onChange={selected => selectAddon(JSON.parse(selected.value))} 
               />
            </div>
            <div className="d-flex at-center">
               <div className={`${styles.qty} d-flex thin-bd-r`}>
                  <button
                     className={`${styles.qtyBtn} increase h-100pc fw-600`}
                     onClick={changeAmount("DECREASE")}>
                     <svg width="10px" height="2px" viewBox="0 0 12 1.5">
                        <rect
                           data-name="Rectangle 970"
                           width="10px"
                           height="2px"
                           fill="currentColor">   
                        </rect>
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
                     onClick={changeAmount("INCREASE")}>
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
               <Button
                  onClick={addProductToCart}
                  className={`${styles.btn} dark-v d-flex jc-center w-100pc thin-bd-r`}>
                  Add to cart
               </Button>
            </div>            
            {/* {!!errorMessage && (
               <p className={styles.errorMessage}>{errorMessage}</p>
            )}
             */}
         </div>
      </div>
   );
});
