import type { ReactNode } from "react";
import { getFlashSale } from "@/lib/firebase/firestore/product";
import { useFirestoreServer } from "@/lib/firebase/configs/server";
import { Skeleton as ProductSkeleton } from "@/components/product/template-p1w";
import FlashSaleList from "./list";
import withSkeleton from "@/shared/hocs/withSkeleton";
import styles from "./styles.module.css";

function Container({ children }: { children: ReactNode }) {
   return (
      <section className={`${styles.wrapper} home-section nfu`}>
         {/* <div className={`${styles.header} d-flex wrap jc-sb at-center`}>
            <span>Time over!</span>
         </div> */}
         <h3>Flash Sale</h3>
         <div className={styles.items}>{children}</div>
      </section>
   );
}

async function List() {
   const firestoreServer = useFirestoreServer();
   const flashsales = await getFlashSale(firestoreServer);
   return <FlashSaleList initialProducts={flashsales.map(e => e.product)} />
}

export default function FlashSale() {
   return (
      <Container>
         {withSkeleton(List, () =>
            Array.from({ length: 10 }).map((_, i) => (
               <ProductSkeleton key={`fs${i}`} wImage={324} hImage={324} />
            ))
         )()}
      </Container>
   );
}
