import { getFlashSale } from "@/lib/firebase/firestore/product";
import { useFirestoreServer } from "@/lib/firebase/configs/server";
import { Skeleton as ProductSkeleton } from "@/components/molecules/product/template-p1w";
import { _dynamic } from "@/configs/imports-wrapper";
import type { FlashSale } from "@/types/entities";
import withSkeleton from "@/hocs/with-skeleton";
import sharedStyles from "../../style.module.css";
import styles from "./style.module.css";

const FlashSaleList = _dynamic(() => import("./list"), { ssr: false });

export default async function FlashSale() {
  const firestoreServer = useFirestoreServer();
  const flashSales = await getFlashSale(firestoreServer);

  return (
    flashSales.length > 0 && (
      <section className={`${styles.wrapper} home-section nfu`}>
        <h3 className={sharedStyles.title}>Flash Sale</h3>
        <div className={styles.items}>
          {withSkeleton(FlashSaleList, () =>
            flashSales.map((e: FlashSale, i: number) => (
              <ProductSkeleton key={e.id} imageStyle={styles.itemImage} />
            ))
          )()}
        </div>
      </section>
    )
  );
}
