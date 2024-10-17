import { ReactNode } from "react";
import { getBrands } from "@/lib/firebase/firestore/product";
import { Brand } from "@/shared/types/entities";
import { env } from "@/configs";
import { delay } from "@/shared/helpers/global";
import withSkeleton from "@/shared/hocs/withSkeleton";
import SkeletonLoader from "@/shared/components/skeleton";
import styles from "./styles.module.css";
import Image from "next/image";
import useFirestoreServer from "@/lib/firebase/firestore/hooks/useFirestoreServer";

const {
   BRAND_IMAGE_STORAGE,
   BRAND_LOGO_STORAGE
} = env;

function Container({ children }: { children: ReactNode }) {
   return (
      <section className="home-section nfu">
         <h3>Top Brands</h3>
         <div className={styles.brands}>{children}</div>
      </section>
   );
};

async function List() {
   const firestoreServer = await useFirestoreServer();
   const brands = await getBrands(firestoreServer);
   return (
      brands.map((e: Brand, i: number) => 
         <a 
            style={{ animationDelay: `${i * .1}s` }}
            key={e?.id} 
            className={`${styles.brand} posrel o-h`} href="#">
            <Image 
               className={styles.image}
               width={428} 
               height={428} 
               style={{ maxWidth: 428, maxHeight: 428, width: "100%", height: "auto" }}
               src={`${BRAND_IMAGE_STORAGE + e.image}`}
               alt="brand" 
            />
            <span className={`${styles.backface} posab w-100pc h-100pc`}></span>
            <Image 
               className="posab pos-center"
               width={200}
               height={94}
               style={{ height: "auto", width: "auto" }}
               src={`${BRAND_LOGO_STORAGE + e.logo}`}
               alt="brand-logo" 
            />
         </a>
      )
   );
};

export default function TopBrands() {
   return (
      <Container>
         {withSkeleton(List, () =>
            Array.from({ length: 10 }).map((_, i) =>
               <SkeletonLoader 
                  width={428} 
                  height={428} 
                  borderRadius=".375rem" 
               />
            )
         )()}
      </Container>
   );
};