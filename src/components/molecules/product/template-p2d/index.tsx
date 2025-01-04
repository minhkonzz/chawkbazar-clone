"use client";

import { NextImage, useRouter } from "@/configs/imports-wrapper";
import { fixDecimal } from "@/helpers/number";
import type { Product as SerializedProduct } from "@/types/entities";
import { SkeletonLoader } from "@/components/atoms";
import styles from "./style.module.css";

interface Props {
  imageStyle: string;
  product: SerializedProduct;
}

export function Skeleton({ imageStyle }: Pick<Props, "imageStyle">) {
  return (
    <div className={`${styles.wrapper} d-flex at-center`}>
      <SkeletonLoader className={imageStyle} />
      <div className={`${styles.detail} o-h`}>
        <SkeletonLoader className={styles.nameSkeleton} /> 
        <SkeletonLoader className={styles.descSkeleton} />
        <SkeletonLoader className={styles.pricesSkeleton} />
      </div>
    </div>
  );
}

export default function Product({ imageStyle, product }: Props) {
  const router = useRouter();
  return (
    <div
      className={`${styles.wrapper} w-100pc d-flex at-center cp`}
      onClick={() => router.push(`/product/${product.id}`, { scroll: false })}>
      <div className={`${imageStyle} posrel o-h`}>
        <NextImage
          width={176}
          height={176}
          style={{ width: "100%", height: "auto" }}
          src={product?.images.pm!}
          alt={product?.name}
        />
      </div>
      <div className={`${styles.detail} o-h`}>
        <h2 className={`${styles.name} w-cut-text fw-600`}>{product?.name}</h2>
        <p className={`${styles.desc} w-cut-text`}>{product?.description}</p>
        <div className={`${styles.prices} d-flex at-center wrap fw-600`}>
          <span>
            ${fixDecimal(product?.sale?.lastPrice || product?.price, 2)}
          </span>
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
