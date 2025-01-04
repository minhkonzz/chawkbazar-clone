"use client";

import { NextImage, memo, useRouter } from "@/configs/imports-wrapper";
import { fixDecimal } from "@/helpers/number";
import { useCountdownTimer } from "@/hooks";
import { Lightning } from "@/components/atoms/svgs";
import { SkeletonLoader } from "@/components/atoms";
import styles from "./style.module.css";

import type { FlashSale, Product as SerializedProduct } from "@/types/entities";

interface Props {
  imageStyle: string;
  product: SerializedProduct;
  sale?: FlashSale;
}

const SaleBackdrop = memo(({ sale }: { sale: FlashSale }) => {
  const { end } = sale;
  const time = useCountdownTimer(new Date(end).getTime());
  return (
    !!time && (
      <div className={`${styles.sale} posab d-flex fd-col jc-center at-center`}>
        <span className={`${styles.saleText} text-white`}>Sale ends after</span>
        <span className={`${styles.saleTimeLeft} bg-white`}>{time}</span>
      </div>
    )
  );
});

SaleBackdrop.displayName = "SaleBackdrop";

export default function Product({ imageStyle, product, sale }: Props) {
  const router = useRouter();
  return (
    <div
      className={`${styles.wrapper} cp posrel`}
      onClick={() => router.push(`/product/${product.id}`, { scroll: false })}>
      <div className={`${styles.image} ${imageStyle} posrel o-h`}>
        <NextImage fill src={product.images.pm!} alt={product.name} />
        {!!sale && (
          <span
            className={`${styles.saleNoti} fw-600 d-flex at-center dark-v posab top-0 right-0`}>
            <Lightning className={styles.saleIc} />
            {sale.quantity} SALES LEFT
          </span>
        )}
      </div>
      <div className={styles.detail}>
        <h2 className={`${styles.name} w-cut-text fw-600`}>{product?.name}</h2>
        <p className={`${styles.desc} w-cut-text`}>{product?.description}</p>
        <div className={`${styles.prices} d-flex wrap fw-600`}>
          <span>{`$${fixDecimal(product?.price, 2)}`}</span>
        </div>
      </div>
      {!!sale && <SaleBackdrop sale={sale} />}
    </div>
  );
}

export function Skeleton({ imageStyle }: Pick<Props, "imageStyle">) {
  return (
    <div className={styles.wrapperSkeleton}>
      <SkeletonLoader className={styles.image + " " + imageStyle} />
      <div className={styles.detailSkeleton}>
        <SkeletonLoader className={styles.nameSkeleton} />
        <SkeletonLoader className={styles.descSkeleton} />
        <SkeletonLoader className={styles.pricesSkeleton} />
      </div>
    </div>
  );
}