import type { ReactNode } from "react";
import { getBrands } from "@/lib/firebase/firestore/product";
import { useFirestoreServer } from "@/lib/firebase/configs/server";
import TopBrandsList from "./list";
import withSkeleton from "@/shared/hocs/withSkeleton";
import SkeletonLoader from "@/shared/components/skeleton";
import styles from "./styles.module.css";
import sharedStyles from "../../styles.module.css";

function Container({ children }: { children: ReactNode }) {
   return (
      <section className="home-section nfu">
         <h3 className={sharedStyles.title}>Top Brands</h3>
         <div className={styles.brands}>{children}</div>
      </section>
   );
}

async function List() {
   const firestoreServer = useFirestoreServer();
   const _brands = await getBrands(firestoreServer);
   return <TopBrandsList initialBrands={_brands} />
}

export default function TopBrands() {
   return (
      <Container>
         {withSkeleton(List, () =>
            Array.from({ length: 10 }).map((_, i) => (
               <SkeletonLoader
                  key={i}
                  width={428}
                  height={428}
                  borderRadius=".375rem"
               />
            ))
         )()}
      </Container>
   );
}
