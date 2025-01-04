"use client";

import { memo, useMemo } from "react";
import { fixDecimal } from "@/shared/helpers/number";
import { useCountdownTimer } from "@/shared/hooks";
import { Lightning } from "@/components/@svgs";
import SkeletonLoader from "@/shared/components/skeleton";
import styles from "./styles.module.css";
import Image from "next/image";
import useProductView from "@/shared/hooks/useProductView";

import type {
   FlashSale,
   Product as SerializedProduct
} from "@/shared/types/entities";

interface Props {
   wImage?: number;
   hImage?: number;
   product: SerializedProduct;
   sale?: FlashSale;
}

const SaleBackdrop = memo(({ sale }: { sale: FlashSale }) => {
   const { end } = sale;
   const time = useCountdownTimer(new Date(end).getTime());
   return (
      !!time && (
         <div
            className={`${styles.sale} posab d-flex fd-col jc-center at-center`}>
            <span className={`${styles.saleText} text-white`}>
               Sale ends after
            </span>
            <span className={`${styles.saleTimeLeft} bg-white`}>{time}</span>
         </div>
      )
   );
});

SaleBackdrop.displayName = "SaleBackdrop";

export default function Product({ wImage, hImage, product, sale }: Props) {
   const [w, h] = [wImage || 322, hImage || 322];
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
      <div className={`${styles.wrapper} cp posrel`} onClick={onClick}>
         <div className="posrel o-h" style={imgStyles.container}>
            <Image
               width={w}
               height={h}
               style={imgStyles.inner}
               src={product.images.pm!}
               alt="product-image"
            />
            {!!sale && (
               <span
                  className={`${styles.saleNoti} fw-600 d-flex at-center dark-v posab top-0 right-0`}>
                  <Lightning className={styles.saleIc} />
                  {sale.quantity} SALES LEFT
               </span>
            )}
         </div>
         <div className={styles.detail}>
            <h2 className={`${styles.name} fw-600`}>{product?.name}</h2>
            <p
               className={
                  styles.desc
               }>{`${product?.description.slice(0, 50)}...`}</p>
            <div className={`${styles.prices} d-flex wrap fw-600`}>
               <span>{`$${fixDecimal(product?.price, 2)}`}</span>
            </div>
         </div>
         {!!sale && <SaleBackdrop sale={sale} />}
      </div>
   );
}

export function Skeleton({
   wImage = "100%",
   hImage = 200
}: {
   wImage?: number | string;
   hImage?: number | string;
}) {
   const [width, height] = [wImage || 322, hImage || 322];
   return (
      <div className={styles.wrapperSkeleton}>
         <SkeletonLoader width={width} height={height} />
         <div className={styles.detailSkeleton}>
            <SkeletonLoader
               width="60%"
               height="1.75rem"
               className={styles.nameSkeleton}
            />
            <SkeletonLoader className={styles.descSkeleton} />
            <SkeletonLoader className={styles.pricesSkeleton} />
         </div>
      </div>
   );
}
