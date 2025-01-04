import {
  type Dispatch,
  type SetStateAction,
  useState,
  memo
} from "@/configs/imports-wrapper";

import { useIntersectionObserver } from "@/hooks";
import { getProducts } from "@/lib/firebase/firestore/product";
import type { Product as SerializedProduct } from "@/types/entities";
import { Skeleton as ProductSkeleton } from "@/components/molecules/product/template-p1w";
import Product from "@/components/molecules/product/template-p1w";
import styles from "./style.module.css";

const Products = memo(({
  products,
  setElement
}: {
  products: SerializedProduct[];
  setElement: Dispatch<SetStateAction<Element | null>>;
}) => (
  <>
    {products.map((product: SerializedProduct, i: number) => (
      <div
        ref={i == products.length - 1 ? setElement : null}
        key={product?.id}
        style={{ animationDelay: `${i * 0.1}s` }}
        className={`${styles.item} item-fadein`}>
        <Product imageStyle={styles.itemImage} product={product} />
      </div>
    ))}
  </>
));

export default function ProductList({
  products,
  setProducts
}: {
  products: SerializedProduct[];
  setProducts: Dispatch<SetStateAction<SerializedProduct[]>>;
}) {
  const [fetching, setFetching] = useState<boolean>(false);
  const [hasMoreProducts, setHasMoreProducts] = useState<boolean>(true);
  const { setElement } = useIntersectionObserver(async visible => {
    if (!visible || fetching) return;
    setFetching(true);
    const lastFetchedProductId = products.at(-1)?.id;
    const nextProducts = await getProducts({
      fromId: lastFetchedProductId,
      _limit: 10
    });
    if (!nextProducts.length) {
      setHasMoreProducts(false);
      return;
    };
    setProducts([...products, ...nextProducts]);
    setFetching(false);
  });

  return (
    <>
      <Products products={products} setElement={setElement} />
      {hasMoreProducts && Array.from({ length: 5 }).map((_, i) => (
        <ProductSkeleton key={i} imageStyle={styles.itemImage} />
      ))}
    </>
  );
}
