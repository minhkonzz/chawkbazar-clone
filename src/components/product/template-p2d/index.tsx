"use client"

import { Props as ProductProps } from "../template-p1w";
import { fixDecimal } from "@/shared/helpers/number";
import { env } from "@/configs";
import styles from "./styles.module.css";
import Image from "next/image";
import useProductView from "@/shared/hooks/useProductView";

interface Props {
   wImage?: number | string,
   hImage?: number | string,
   product: any
}

export default function Product({
   wImage, 
   hImage, 
   product 
}: Props) {
   
   const [w, h] = [wImage || 176, hImage || 176];
   const { name, description, price, sale_price, image } = product;
   const onClick = useProductView(product);

   return (
      <div className={`${styles.container} d-flex at-center cp`} {...{onClick}}>
         <Image 
            width={176} 
            height={176} 
            style={{ height: "100%", width: "auto", maxWidth: w, maxHeight: h }}
            src={env.PRODUCT_IMAGE_STORAGE! + image.pxs}
            alt="product" 
            priority 
         />
         <div className={styles.detail}>
            <h2 className={styles.name}>{name}</h2>
            <p className={styles.desc}>{`${description.slice(0, 35)}...`}</p>
            <div className={`${styles.prices} d-flex at-center wrap`}>
               <span>${fixDecimal(sale_price, 2)}</span>
               <del className={styles.firstPrice}>${fixDecimal(price, 2)}</del>
            </div>
         </div>
      </div>
   )
}