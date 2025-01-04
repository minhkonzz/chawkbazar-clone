import type { ReactNode } from "@/configs/imports-wrapper";
import { SkeletonLoader } from "@/components/atoms";
import { getBrands } from "@/lib/firebase/firestore/product";
import { useFirestoreServer } from "@/lib/firebase/configs/server";
import TopBrandsList from "./list";
import withSkeleton from "@/hocs/with-skeleton";
import styles from "./style.module.css";
import sharedStyles from "../../style.module.css";

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
  return <TopBrandsList initialBrands={_brands} />;
}

export default function TopBrands() {
  return (
    <Container>
      {withSkeleton(List, () =>
        Array.from({ length: 10 }).map((_, i) => (
          <SkeletonLoader
            key={i}
            className={styles.brandSkeleton}
            borderRadius=".375rem"
          />
        ))
      )()}
    </Container>
  );
}
