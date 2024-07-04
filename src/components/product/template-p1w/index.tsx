"use client";

import { env } from "@/configs";
import { fixDecimal } from "@/shared/helpers/number";
import styles from "./styles.module.css";
import Image from "next/image";
import useProductView from "@/shared/hooks/useProductView";

export interface Props {
   wImage?: number;
   hImage?: number;
   imagePath?: string
   product: any
};

export default function Product({ 
   wImage, 
   hImage,
   imagePath,
   product
}: Props) {
   const { name, price, description } = product;
   const onClick = useProductView(product);

   return (
      <div className={styles.container} {...{ onClick }}>
         <div className={styles.imageContainer}>
            <Image 
               width={wImage || 322} 
               height={hImage || 322} 
               src={env.PRODUCT_IMAGE_STORAGE! + imagePath}
               alt="product-image" 
            /> 
         </div>
         <div className={styles.detail}>
            <h2 className={styles.name}>{name}</h2>
            <p className={styles.desc}>{description}</p>
            <div className={styles.prices}>
               <span className={styles.lastPrice}>{`$${fixDecimal(price, 2)}`}</span>
            </div>
         </div>
      </div>
   )
}