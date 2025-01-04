"use client";

import { useState, useEffect, useSearchParams } from "@/configs/imports-wrapper";
import { getProducts } from "@/lib/firebase/firestore/product";
import { transformFilterOptions } from "@/helpers/global";
import { isEmptyArray } from "@/helpers/array";
import type { Product as SerializedProduct } from "@/types/entities";
import { Skeleton as ProductSkeleton } from "@/components/molecules/product/template-p1w";
import { DropdownMenu, SkeletonLoader } from "@/components/atoms";
import type { Option } from "@/components/atoms/dropdown-menu";
import IntersectionProvider from "@/context/intersection-observer";
import ProductList from "./list";
import styles from "./style.module.css";

function Skeleton() {
  return (
    <>
      <div className={`${styles.itemsHeader} d-flex jc-sb at-center`}>
        <SkeletonLoader className={styles.itemsTitleSkeleton} />
        <div className="d-flex at-center jc-end">
          <SkeletonLoader className={styles.itemsCountSkeleton} />
          <SkeletonLoader className={styles.sortingOptionsSkeleton} />
        </div>
      </div>
      <div className={styles.list}>
        {Array.from({ length: 10 }).map((_, i) => (
          <ProductSkeleton key={i} imageStyle={styles.itemImage} />
        ))}
      </div>
    </>
  );
}

export default function CatalogProducts() {
  const [products, setProducts] = useState<SerializedProduct[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    (async () => {
      const filter = transformFilterOptions(searchParams);
      const _products = await getProducts({ _limit: 10 }, filter);
      setProducts(_products);
    })();
  }, [searchParams]);

  if (isEmptyArray(products)) return <Skeleton />;

  const sortingOptions = [
    { id: "so1", label: "Price: low to high", value: "price-low-to-high" },
    { id: "so2", label: "Price: high to low", value: "price-high-to-low" }
  ];

  const onSortingOptionChange = (selectedOption: Option) => {
    if (selectedOption.value == "price-low-to-high") {
      setProducts([
        ...products.sort(
          (a, b) =>
            (a.sale?.lastPrice || a.price) - (b.sale?.lastPrice || b.price)
        )
      ]);
      return;
    }
    if (selectedOption.value == "price-high-to-low") {
      setProducts([
        ...products.sort(
          (a, b) =>
            (b.sale?.lastPrice || b.price) - (a.sale?.lastPrice || a.price)
        )
      ]);
      return;
    }
  };

  return (
    <>
      <div className={`${styles.itemsHeader} d-flex jc-sb at-center`}>
        <h1 className={styles.itemsTitle}>Casual wear</h1>
        <div className="d-flex at-center">
          <span className={`${styles.itemsCount} d-ib`}>
            {products.length} items
          </span>
          <DropdownMenu
            title="Sorting Options"
            options={sortingOptions}
            onChange={onSortingOptionChange}
          />
        </div>
      </div>
      <div className={styles.list}>
        <IntersectionProvider>
          <ProductList products={products} setProducts={setProducts} />
        </IntersectionProvider>
      </div>
    </>
  );
}
