import { getNewArrivalProducts } from "@/lib/firebase/firestore/product";
import { Product as SerializedProduct } from "@/shared/types";
import { delay } from "@/shared/helpers/global";
import withSkeleton from "@/shared/hocs/withSkeleton";
import styles from "./styles.module.css";
import Product, { Skeleton as ProductSkeleton } from "@/components/product/template-p1w";
import useFirestoreServer from "@/lib/firebase/firestore/hooks/useFirestoreServer";

const title: string = "New Arrivals";

async function NewArrivals() {
   const firestoreServer = await useFirestoreServer();
   const products = await getNewArrivalProducts(firestoreServer);
   return (
      <section className="home-section nfu">
         <h3 className={styles.title}>{title}</h3>
         <div className={styles.items}>
            {products.map((item: SerializedProduct, i: number) => 
               <div 
                  style={{ animationDelay: `${i * .1}s` }}
                  className={styles.item}>
                  <Product 
                     key={item?.id} 
                     wImage={352} 
                     hImage={452} 
                     product={item}
                     imagePath={item?.image?.pm}
                  />
               </div>
            )}
         </div>
      </section>
   );
};

export default withSkeleton(
   NewArrivals, 
   () => (
      <section className="home-section nfu">
         <h3 className={styles.title}>{title}</h3>
         <div className={styles.items}>
            {Array.from({ length: 10 }).map((_: unknown) => 
               <ProductSkeleton wImage={352} hImage={452} />
            )}
         </div>
      </section>
   )
);