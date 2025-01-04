import { type ReactNode, NextImage } from "@/configs/imports-wrapper";
import { Skeleton as ProductSkeleton } from "@/components/molecules/product/template-p2d";
import { getOnSellProducts } from "@/lib/firebase/firestore/product";
import { useFirestoreServer } from "@/lib/firebase/configs/server";
import OnSellingProductsList from "./list";
import withSkeleton from "@/hocs/with-skeleton";
import styles from "./style.module.css";
import sharedStyles from "../../style.module.css";

function Container({ children }: { children: ReactNode }) {
  return (
    <section className="home-section nfu">
      <div className={`${styles.titleWrapper} d-flex jc-sb at-center`}>
        <h3 className={sharedStyles.title} style={{ margin: 0 }}>On Selling Products</h3>
        <a className={styles.seeAll} href="/catalog">
          See All Products
        </a>
      </div>
      <div className={`${styles.products} d-flex`}>
        <NextImage
          width={428}
          height={600}
          className={styles.image}
          src="/banner-sale-offer.webp"
          alt="selling"
        />
        <div className={styles.list}>{children}</div>
      </div>
    </section>
  );
}

async function List() {
  const firestoreServer = useFirestoreServer();
  const products = await getOnSellProducts(firestoreServer);
  return <OnSellingProductsList initialProducts={products} />;
}

export default function OnSellingProducts() {
  return (
    <Container>
      {withSkeleton(List, () =>
        Array.from({ length: 9 }).map((_, i) => (
          <ProductSkeleton key={i} imageStyle={styles.itemImage} />
        ))
      )()}
    </Container>
  );
}
