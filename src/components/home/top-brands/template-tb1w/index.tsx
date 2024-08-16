import { getFirestore } from "firebase/firestore";
import { getBrands } from "@/lib/firebase/firestore/product";
import { Brand } from "@/shared/types/entities";
import { env } from "@/configs";
import getAuthenticatedAppForUser from "@/lib/firebase/server";
import styles from "./styles.module.css";
import Image from "next/image";

const {
   BRAND_IMAGE_STORAGE,
   BRAND_LOGO_STORAGE
} = env;

export default async function TopBrands() {

   const { firebaseServerApp } = await getAuthenticatedAppForUser();
   const brands = await getBrands(getFirestore(firebaseServerApp));

   if (!brands) return <></>;

   return (
      <section className="home-section nfu">
         <h3>Top brands</h3>
         <div className={styles.brands}> 
            { brands.map((e: Brand, i: number) => 
               <a key={i} className={`${styles.brandWrapper} posrel o-h`} href="#">
                  <Image 
                     className={styles.image}
                     width={428} 
                     height={428} 
                     src={`${BRAND_IMAGE_STORAGE + e.image}`}
                     alt="brand" 
                  />
                  <span className={`${styles.backface} posab w-100pc h-100pc`}></span>
                  <Image 
                     className="posab pos-center"
                     width={200}
                     height={94} 
                     src={`${BRAND_LOGO_STORAGE + e.logo}`}
                     alt="brand-logo" 
                  />
               </a>
            ) }
         </div>
      </section>
   );
};