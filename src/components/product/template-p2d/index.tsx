"use client"

import { useMemo } from "react";
import { fixDecimal } from "@/shared/helpers/number";
import { env } from "@/configs";
import { Product as SerializedProduct } from "@/shared/types/entities";
import SkeletonLoader from "@/shared/components/skeleton";
import styles from "./styles.module.css";
import Image from "next/image";
import useProductView from "@/shared/hooks/useProductView";

const DEFAULT_SIZE: number = 176;

interface Props {
   wImage?: number,
   hImage?: number,
   product: SerializedProduct
};

export function Skeleton({
   wImage,
   hImage
}: Omit<Props, "product">) {
   const [w, h] = [wImage || DEFAULT_SIZE, hImage || DEFAULT_SIZE];
   return (
      <div className={`${styles.container} d-flex at-center`}>
         <SkeletonLoader width={w} height={h} />
         <div className={`${styles.detail} o-h`}>
            <div className={styles.nameSkeleton}></div>
            <div className={styles.descSkeleton}></div>
            <div className={styles.pricesSkeleton}></div>
         </div>
      </div>
   );
};

export default function Product({
   wImage, 
   hImage, 
   product 
}: Props) {
   const [w, h] = [wImage || DEFAULT_SIZE, hImage || DEFAULT_SIZE];
   const onClick = useProductView(product);

   const imgStyles = useMemo(() => ({
      width: "auto",
      height: "100%",
      maxWidth: w,
      maxHeight: h
   }), [w, h]);

   return (
      <div className={`${styles.container} d-flex at-center cp`} onClick={onClick}>
         <Image 
            width={w} 
            height={h} 
            style={imgStyles}
            src={env.PRODUCT_IMAGE_STORAGE! + product?.image.pxs}
            alt="product" 
            priority 
         />
         <div className={`${styles.detail} o-h`}>
            <h2 className={styles.name}>{product?.name}</h2>
            <p className={`${styles.desc} o-h`}>{`${product?.description.slice(0, 35)}...`}</p>
            <div className={`${styles.prices} d-flex at-center wrap`}>
               <span>${fixDecimal(product?.sale_price || product?.price, 2)}</span>
               { product?.sale_price && <del className={styles.firstPrice}>${fixDecimal(product?.price, 2)}</del> }
            </div>
         </div>
      </div>
   );
};