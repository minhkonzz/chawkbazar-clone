import { getFlashSale } from "@/lib/firebase/firestore/product";
import { useFirestoreServer } from "@/lib/firebase/configs/server";
import { Skeleton as ProductSkeleton } from "@/components/product/template-p1w";
import dynamic from "next/dynamic";
import withSkeleton from "@/shared/hocs/withSkeleton";
import sharedStyles from "../../styles.module.css";
import styles from "./styles.module.css";

const FlashSaleList = dynamic(() => import("./list"), { ssr: false });

export default async function FlashSale() {
   const firestoreServer = useFirestoreServer();
   const flashSales = await getFlashSale(firestoreServer);

   return (
      flashSales.length > 0 && 
      <section className={`${styles.wrapper} home-section nfu`}>
         <h3 className={sharedStyles.title}>Flash Sale</h3>
         <div className={styles.items}>
            {withSkeleton(FlashSaleList, () =>
               flashSales.map((e: any, i: number) => (
                  <ProductSkeleton key={`fs${i}`} wImage={324} hImage={324} />
               ))
            )()}
         </div>
      </section>
   );
}
