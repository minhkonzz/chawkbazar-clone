"use client";

import { useState, useEffect } from "@/configs/imports-wrapper";
import type { Product as SerializedProduct } from "@/types/entities";
import { getNewArrivalProductsSnapShot } from "@/lib/firebase/firestore/product";
import Product from "@/components/molecules/product/template-p1w";
import styles from "./style.module.css";

export default function NewArrivalProductsList({
  initialProducts
}: {
  initialProducts: SerializedProduct[];
}) {
  const [products, setProducts] = useState<SerializedProduct[]>(initialProducts);

  useEffect(() => {
    const unsub = getNewArrivalProductsSnapShot(products => {
      setProducts(products);
    });
    return () => unsub();
  }, []);

  return products.map((item: SerializedProduct, i: number) => (
    <div
      key={item?.id}
      style={{ animationDelay: `${i * 0.1}s` }}
      className={`${styles.item} item-fadein`}>
      <Product imageStyle={styles.itemImage} product={item} />
    </div>
  ));
}
