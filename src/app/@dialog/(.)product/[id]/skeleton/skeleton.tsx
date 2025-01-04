import { SkeletonLoader } from "@/components/atoms"
import styles from "./style.module.css";

export default function ProductDetailSkeleton() {
  return (
    <>
      <SkeletonLoader className={styles.imageSkeleton} />
      <div className={styles.wrapper}>
        <SkeletonLoader className={styles.nameSkeleton} />
        <div className={`${styles.descSkeletonWrapper} d-flex fd-col`}>
          <SkeletonLoader className={styles.descSkeleton} />
          <SkeletonLoader className={styles.descSkeleton} />
          <SkeletonLoader className={styles.descSkeleton} />
        </div>
        <SkeletonLoader className={styles.priceSkeleton} />
        <SkeletonLoader className={styles.inStockSkeleton} />
        <div className={`${styles.addons} d-flex at-center`}>
          <SkeletonLoader className={styles.addonSkeleton} />
          <SkeletonLoader className={styles.addonSkeleton} />
        </div>
        <div className="d-flex at-center">
          <SkeletonLoader className={styles.quantitySkeleton} />
          <SkeletonLoader className={styles.addCartSkeleton} />
        </div>
      </div>
    </>
    
  )
}