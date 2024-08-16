"use client"

import { Props as ProductProps } from "../template-p1w";
import { fixDecimal } from "@/shared/helpers/number";
import { env } from "@/configs";
import styles from "./styles.module.css";
import Image from "next/image";
import useProductView from "@/shared/hooks/useProductView";

export default function Product({
   wImage,
   hImage,
   imagePath,
   product
}: ProductProps) {
   
   const { name, description, price, sale_price } = product;
   const onClick = useProductView(product);

   return (
      <div className={`${styles.container} d-flex at-center cp`} {...{onClick}}>
         <div>
            <Image 
               width={wImage || 322} 
               height={hImage || 322} 
               src={env.PRODUCT_IMAGE_STORAGE! + imagePath}
               alt="product" 
               priority 
            />
         </div>
         <div className={styles.detail}>
            <h2 className={styles.name}>{name}</h2>
            <p className={styles.desc}>{description}</p>
            <div className={`${styles.prices} d-flex at-center wrap`}>
               <span>${fixDecimal(sale_price, 2)}</span>
               <del className={styles.firstPrice}>${fixDecimal(price, 2)}</del>
            </div>
         </div>
      </div>
   )
}