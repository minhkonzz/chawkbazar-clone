import type { ReactNode } from "react";
import { getFlashSale } from "@/lib/firebase/firestore/product";
import { useFirestoreServer } from "@/lib/firebase/configs/server";
import { Skeleton as ProductSkeleton } from "@/components/product/template-p1w";
import dynamic from "next/dynamic";
// import FlashSaleList from "./list";
import withSkeleton from "@/shared/hocs/withSkeleton";
import styles from "./styles.module.css";

const FlashSaleList = dynamic(() => import("./list"), { ssr: false });

function Container({ children }: { children: ReactNode }) {
   return (
      <section className={`${styles.wrapper} home-section nfu`}>
         <h3>Flash Sale</h3>
         <div className={styles.items}>{children}</div>
      </section>
   );
};

async function List() {
   const firestoreServer = useFirestoreServer();
   const flashSales = await getFlashSale(firestoreServer);
   return <FlashSaleList initialSales={flashSales} />
};

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
};
