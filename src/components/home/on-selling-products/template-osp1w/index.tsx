import { ReactNode } from "react";
import { getOnSellProducts } from "@/lib/firebase/firestore/product";
import { Product as SerializedProduct } from "@/shared/types/entities";
import withSkeleton from "@/shared/hocs/withSkeleton";
import styles from "./styles.module.css";
import Image from "next/image";
import Product, { Skeleton as ProductSkeleton } from "@/components/product/template-p2d";
import useFirestoreServer from "@/lib/firebase/firestore/hooks/useFirestoreServer";

function Container({ children }: { children: ReactNode }) {
   return (
      <section className="home-section nfu">
         <div className={`${styles.titleWrapper} d-flex jc-sb at-center`}>
            <h3>On Selling Products</h3>
            <a className={styles.seeAll} href="/search">See All Products</a>
         </div>
         <div className={styles.products}>
            <Image 
               width={428}
               height={600} 
               className={styles.image}
               src="/banner-sale-offer.webp" 
               alt="selling" 
            />   
            <div className={styles.list}>
               {children}
            </div>
         </div>
      </section>
   );
};

async function List() {
   const firestoreServer = await useFirestoreServer();
   const products = await getOnSellProducts(firestoreServer);
   return (
      products.map((product: SerializedProduct, i: number) => 
         <div 
            key={product?.id} 
            className={styles.item} 
            style={{ animationDelay: `${i * .1}s` }}>
            <Product product={product} />
         </div>
      )
   );
};

export default function OnSellingProducts() {
   return (
      <Container>
         {withSkeleton(List, () => 
            Array.from({ length: 9 }).map((_, i) => 
               <ProductSkeleton key={`os${i}`} />
            )
         )()}
      </Container>
   );
};