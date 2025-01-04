"use client";

import { useMemo } from "react";
import { fixDecimal } from "@/shared/helpers/number";
import type { Product as SerializedProduct } from "@/shared/types/entities";
import SkeletonLoader from "@/shared/components/skeleton";
import styles from "./styles.module.css";
import Image from "next/image";
import useProductView from "@/shared/hooks/useProductView";

interface Props {
   wImage?: number;
   hImage?: number;
   product: SerializedProduct;
}

export function Skeleton({ wImage, hImage }: Omit<Props, "product">) {
   const [w, h] = [wImage || 176, hImage || 176];
   return (
      <div className={`${styles.wrapper} d-flex at-center`}>
         <SkeletonLoader width={w} height={h} />
         <div className={`${styles.detail} o-h`}>
            <div className={styles.nameSkeleton}></div>
            <div className={styles.descSkeleton}></div>
            <div className={styles.pricesSkeleton}></div>
         </div>
      </div>
   );
}

export default function Product({ wImage, hImage, product }: Props) {
   const [w, h] = [wImage || 176, hImage || 176];
   const onClick = useProductView(product);

   const imgStyles = useMemo(
      () => ({
         container: {
            maxWidth: w, 
            maxHeight: h
         },
         inner: {
            maxWidth: w,
            height: "auto"
         }
      }),
      [w, h]
   );

   return (
      <div className={`${styles.wrapper} w-100pc d-flex at-center cp`} onClick={onClick}>
         <div className="posrel o-h" style={imgStyles.container}>
            <Image
               width={w}
               height={h}
               style={imgStyles.inner}
               src={product?.images.pm!}
               alt="product"
               priority
            />
         </div>
         <div className={`${styles.detail} o-h`}>
            <h2 className={`${styles.name} fw-600`}>{product?.name}</h2>
            <p className={`${styles.desc} o-h`}>{`${product?.description.slice(0, 35)}...`}</p>
            <div className={`${styles.prices} d-flex at-center wrap fw-600`}>
               <span>${fixDecimal(product?.sale?.lastPrice || product?.price, 2)}</span>
               {product?.sale?.lastPrice && (
                  <del className={styles.firstPrice}>
                     ${fixDecimal(product?.price, 2)}
                  </del>
               )}
            </div>
         </div>
      </div>
   );
}
