import { getNewArrivalProducts } from "@/lib/firebase/firestore/product";
import { useFirestoreServer } from "@/lib/firebase/configs/server";
import { Skeleton as ProductSkeleton } from "@/components/product/template-p1w";
import withSkeleton from "@/shared/hocs/withSkeleton";
import NewArrivalProductsList from "./list";
import styles from "./styles.module.css";

async function NewArrivals() {
   const firestoreServer = useFirestoreServer();
   const products = await getNewArrivalProducts(firestoreServer);
   return (
      <section className="home-section nfu">
         <h3 className={styles.title}>New Arrivals</h3>
         <div className={styles.items}>
            <NewArrivalProductsList initialProducts={products} />
         </div>
      </section>
   );
}

export default withSkeleton(NewArrivals, () => (
   <section className="home-section nfu">
      <h3 className={styles.title}>New Arrivals</h3>
      <div className={styles.items}>
         {Array.from({ length: 10 }).map((_: unknown, i: number) => (
            <ProductSkeleton key={i} wImage={352} hImage={452} />
         ))}
      </div>
   </section>
));
