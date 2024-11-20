import type { ReactNode } from "react";
import type { Brand } from "@/shared/types/entities";
import { getBrands } from "@/lib/firebase/firestore/product";
import { useFirestoreServer } from "@/lib/firebase/configs/server";
import { constants } from "@/configs";
import { env } from "@/configs";
import withSkeleton from "@/shared/hocs/withSkeleton";
import SkeletonLoader from "@/shared/components/skeleton";
import styles from "./styles.module.css";
import Image from "next/image";

const { brandLogos, brands } = constants.storageEndpoints;

function Container({ children }: { children: ReactNode }) {
   return (
      <section className="home-section nfu">
         <h3>Top Brands</h3>
         <div className={styles.brands}>{children}</div>
      </section>
   );
}

async function List() {
   const firestoreServer = useFirestoreServer();
   const _brands = await getBrands(firestoreServer);
   return _brands.map((e: Brand, i: number) => (
      <a
         style={{ animationDelay: `${i * .1}s` }}
         key={e?.id}
         className={`${styles.brand} posrel o-h item-fadein`}
         href="#">
         <Image
            className={styles.image}
            width={428}
            height={428}
            style={{
               maxWidth: 428,
               maxHeight: 428,
               width: "100%",
               height: "auto"
            }}
            src={`${env.FIREBASE_STORAGE_URL! + brands + e.image}`}
            alt="brand"
         />
         <span className={`${styles.backface} posab w-100pc h-100pc`}></span>
         <Image
            className="posab pos-center"
            width={200}
            height={94}
            style={{ height: "auto", width: "auto" }}
            src={`${env.FIREBASE_STORAGE_URL + brandLogos + e.logo}`}
            alt="brand-logo"
         />
      </a>
   ));
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
