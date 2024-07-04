import { getFirestore } from "firebase/firestore";
import { getCollectionBanners } from "@/lib/firebase/firestore/banner";
import { mergeStyles } from "@/shared/helpers/global";
import { env } from "@/configs";
import getAuthenticatedAppForUser from "@/lib/firebase/server";
import Image from "next/image";
import styles from "./styles.module.css";

export default async function Collections() {

   const { firebaseServerApp } = await getAuthenticatedAppForUser();
   const banners = await getCollectionBanners("c1w", getFirestore(firebaseServerApp));

   if (!banners) return <></>;

   return (
      <section className={`${styles.container} home-section`}>
         { banners.map((url: string, i: number) => {
            const meta = i === 0 || i === banners.length - 1 ? 
               { className: mergeStyles(styles, ["collection", "prime"]), w: 1030, h: 425 } : 
               { className: styles.collection, w: 425, h: 425 };
            
            return (
               <div className={meta.className} key={i}>
                  <Image 
                     className={styles.image} 
                     width={meta.w} 
                     height={meta.h} 
                     style={{ height: "auto" }}
                     src={`${env.BANNER_IMAGE_STORAGE + url}`} 
                     alt="logo_shop" 
                     priority 
                  />
               </div>
            );
         }) }
      </section>
   )
}