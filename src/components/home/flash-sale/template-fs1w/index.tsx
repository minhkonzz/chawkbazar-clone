import { ReactNode } from "react";
import { getFlashSaleProducts } from "@/lib/firebase/firestore/product";
import { Product as SerializedProduct } from "@/shared/types/entities";
import withSkeleton from "@/shared/hocs/withSkeleton";
import styles from "./styles.module.css";
import Product, { Skeleton as ProductSkeleton } from "@/components/product/template-p1w";
import useFirestoreServer from "@/lib/firebase/firestore/hooks/useFirestoreServer";

function Container({ children }: { children: ReactNode }) {
   return (
      <section className={`${styles.container} home-section nfu`}>
         <div className={styles.header}>
            <h3>Flash Sale</h3>
            <span>Time over!</span>
         </div>
         <div className={styles.items}>
            {children}      
         </div>
      </section>
   );
};

async function List() {
   const firestoreServer = await useFirestoreServer();
   const products = await getFlashSaleProducts(firestoreServer);
   return (
      products.map((e: SerializedProduct, i: number) => 
         <div 
            key={e?.id}
            className={styles.item}
            style={{ animationDelay: `${i * .1}s` }}>
            <Product 
               wImage={324}
               hImage={324}
               imagePath={e.image.pmd}
               product={e}
            />
         </div>   
      )
   );
};

export default function FlashSale() {
   return (
      <Container>
         {withSkeleton(List, () => 
            Array.from({ length: 10 }).map((_, i) => 
               <ProductSkeleton 
                  key={`fs${i}`}
                  wImage={324} 
                  hImage={324} 
               />
            )
         )()}
      </Container>
   );
};