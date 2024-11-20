"use client";

import { env } from "@/configs";
import { fixDecimal } from "@/shared/helpers/number";
import { Product as SerializedProduct } from "@/shared/types/entities";
import SkeletonLoader from "@/shared/components/skeleton";
import styles from "./styles.module.css";
import Image from "next/image";
import useProductView from "@/shared/hooks/useProductView";

const DEFAULT_SIZE: number = 322;

interface Props {
   wImage?: number;
   hImage?: number;
   imagePath?: string;
   product: SerializedProduct;
}

function Product({ wImage, hImage, imagePath, product }: Props) {
   const [w, h] = [wImage || DEFAULT_SIZE, hImage || DEFAULT_SIZE];
   const onClick = useProductView(product);

   return (
      <div className={styles.wrapper} onClick={onClick}>
         <Image
            width={w}
            height={h}
            style={{
               width: "100%",
               height: "auto"
            }}
            src={env.PRODUCT_IMAGE_STORAGE! + imagePath}
            alt="product-image"
         />
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
   const [width, height] = [wImage || DEFAULT_SIZE, hImage || DEFAULT_SIZE];
   return (
      <div className={styles.wrapperSkeleton}>
         <SkeletonLoader {...{ width, height }} />
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

export default Product;
