"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getFilteredProducts } from "@/lib/firebase/firestore/product";
import { transformFilterOptions } from "@/shared/helpers/global";
import { isEmptyArray } from "@/shared/helpers/array";
import type { Product as SerializedProduct } from "@/shared/types/entities";
import { Skeleton as ProductSkeleton } from "../../product/template-p1w";
import SkeletonLoader from "@/shared/components/skeleton";
import SortingOptions from "./sorting-options";
import Product from "../../product/template-p1w";
import styles from "./styles.module.css";
import Button from "@/shared/components/button";

function Skeleton() {
   return (
      <>
         <div className={`${styles.itemsHeader} d-flex jc-sb at-center`}>
            <SkeletonLoader width={150} height={40} />
            <div className="d-flex at-center jc-end">
               <SkeletonLoader
                  width={80}
                  height={28}
                  className={styles.itemsCountSkeleton}
               />
               <SkeletonLoader width={180} height={42} />
            </div>
         </div>
         <div className={styles.list}>
            {Array.from({ length: 10 }).map((_, i) => (
               <ProductSkeleton key={i} hImage={432} />
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
         const _products = await getFilteredProducts(filter);
         setProducts(_products);
      })();
   }, [searchParams]);

   return (
      (!isEmptyArray(products) && (
         <>
            <div className={`${styles.itemsHeader} d-flex jc-sb at-center`}>
               <h1 className={styles.itemsTitle}>Casual wear</h1>
               <div className="d-flex at-center jc-end">
                  <span className={styles.itemsCount}>
                     {products.length} items
                  </span>
                  <SortingOptions />
               </div>
            </div>
            <div className={styles.list}>
               {products.map((product: SerializedProduct, i: number) => {
                  if (!product.image.p) return null;
                  return (
                     <div
                        key={product?.id}
                        style={{ animationDelay: `${i * 0.1}s` }}
                        className={`${styles.item} item-fadein`}>
                        <Product
                           {...{
                              id: product.id,
                              wImage: 334,
                              hImage: 432,
                              product,
                              imagePath: product.image.p
                           }}
                        />
                     </div>
                  );
               })}
            </div>
            <div className={`${styles.loadMore} text-center`}>
               <Button className={styles.btn}>Load more</Button>
            </div>
         </>
      )) || <Skeleton />
   );
}
