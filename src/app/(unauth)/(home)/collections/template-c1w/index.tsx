import { NextImage } from "@/configs/imports-wrapper";
import { getCollectionBanners } from "@/lib/firebase/firestore/banner";
import { useFirestoreServer } from "@/lib/firebase/configs/server";
import { mergeStyles } from "@/helpers/global";
import { SkeletonLoader } from "@/components/atoms";
import withSkeleton from "@/hocs/with-skeleton";
import styles from "./style.module.css";

const bannerStyles = (i: number, maxLen: number) =>
  i === 0 || i === maxLen - 1 ? mergeStyles(styles, ["collection", "prime"]) : styles.collection

async function Collections() {
  const firestoreServer = useFirestoreServer();
  const _banners = await getCollectionBanners(firestoreServer);

  return (
    <section className={`${styles.wrapper} home-section`}>
      {_banners.map((url: string, i: number) => {
        const className = bannerStyles(i, _banners.length);
        return (
          <div
            className={`${className} ${styles.loaded} posrel o-h`}
            style={{ animationDelay: `${i * 0.1}s` }}
            key={i}>
            <NextImage
              fill
              src={url}
              alt={i + ""}
              priority
            />
            <div className={`${styles.decor} posab top-0 left-0`} />
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
        const className = bannerStyles(i, length);
        return <SkeletonLoader key={i} className={className} />;
      })}
    </section>
  );
});
