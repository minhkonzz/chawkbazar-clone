import { getCollectionBanners } from "@/lib/firebase/firestore/banner";
import { mergeStyles } from "@/shared/helpers/global";
import { env } from "@/configs";
import SkeletonLoader from "@/shared/components/skeleton";
import withSkeleton from "@/shared/hocs/withSkeleton";
import Image from "next/image";
import styles from "./styles.module.css";
import useFirestoreServer from "@/lib/firebase/firestore/hooks/useFirestoreServer";

const bannerStyles = (i: number, maxLen: number) =>
   i === 0 || i === maxLen - 1
      ? {
           className: mergeStyles(styles, ["collection", "prime"]),
           w: 1030,
           h: 425
        }
      : { className: styles.collection, w: 425, h: 425 };

async function Collections() {
   const firestoreServer = await useFirestoreServer();
   const banners = await getCollectionBanners("c1w", firestoreServer);

   return (
      <section className={`${styles.wrapper} home-section`}>
         {banners.map((url: string, i: number) => {
            const _s = bannerStyles(i, banners.length);
            return (
               <div
                  className={`${_s.className} ${styles.loaded} posrel o-h`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                  key={i}>
                  <Image
                     className={styles.image}
                     width={_s.w}
                     height={_s.h}
                     src={`${env.BANNER_IMAGE_STORAGE + url}`}
                     alt="logo_shop"
                     priority
                  />
                  <div className={`${styles.decor} posab top-0 left-0`}></div>
               </div>
            );
         })}
      </section>
   );
}

export default withSkeleton(Collections, () => {
   const length: number = 6;
   return (
      <section className={`${styles.wrapper} home-section`}>
         {Array.from({ length }).map((_, i: number) => {
            const _s = bannerStyles(i, length);
            return (
               <div key={i} className={_s.className}>
                  <SkeletonLoader
                     width={_s.w}
                     height={_s.h}
                     borderRadius=".5rem"
                  />
               </div>
            );
         })}
      </section>
   );
});
