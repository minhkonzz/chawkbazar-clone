import type { ReactNode } from "react";
import { Skeleton as ProductSkeleton } from "@/components/product/template-p2d";
import { getOnSellProducts } from "@/lib/firebase/firestore/product";
import { useFirestoreServer } from "@/lib/firebase/configs/server";
import OnSellingProductsList from "./list";
import withSkeleton from "@/shared/hocs/withSkeleton";
import styles from "./styles.module.css";
import sharedStyles from "../../styles.module.css";
import Image from "next/image";

function Container({ children }: { children: ReactNode }) {
   return (
      <section className="home-section nfu">
         <div className={`${styles.titleWrapper} d-flex jc-sb at-center`}>
            <h3 className={sharedStyles.title}>On Selling Products</h3>
            <a className={styles.seeAll} href="/search">
               See All Products
            </a>
         </div>
         <div className={`${styles.products} d-flex`}>
            <Image
               width={428}
               height={600}
               className={styles.image}
               src="/banner-sale-offer.webp"
               alt="selling"
            />
            <div className={styles.list}>{children}</div>
         </div>
      </section>
   );
}

async function List() {
   const firestoreServer = useFirestoreServer();
   const products = await getOnSellProducts(firestoreServer);
   return <OnSellingProductsList initialProducts={products} />
}

export default function OnSellingProducts() {
   return (
      <Container>
         {withSkeleton(List, () =>
            Array.from({ length: 9 }).map((_, i) => (
               <ProductSkeleton key={`os${i}`} />
            ))
         )()}
      </Container>
   );
}
